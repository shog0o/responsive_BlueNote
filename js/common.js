// QR 팝업을 닫을 때 선택한 기간만큼 쿠키 저장함
function setCookie(name, value, days) {
    var expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = name + '=' + value + '; expires=' + expires.toUTCString() + '; path=/; SameSite=Lax';
}

function getCookie(name) {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = $.trim(cookies[i]);
        if (cookie.indexOf(name + '=') === 0) return cookie.substring(name.length + 1);
    }
    return '';
}

$(document).ready(function() {
    var popup = $('#showimage');
    if (!popup.length) return;
    if ($(window).width() > 1024 && getCookie('Notice') !== 'done') popup.prop('hidden', false);

    popup.find('.notice_popup_close').click(function() {
        if ($('#noticeToday').prop('checked')) setCookie('Notice', 'done', 1);
        popup.prop('hidden', true);
        $('#headerArea .logo a').focus();
    });
});

$(window).on('scroll',function(){ //스크롤 시 실행함

    var scroll = $(window).scrollTop(); //스크롤 거리 확인함
    var win_height =$(window).height();
    var header_height =$('header').height();

   


    if(scroll>win_height-header_height){ // 헤더가 본문 영역에 진입했는지 확인함
        $('header').css('background','var(--color-background)'); // 본문 구간의 헤더 배경 적용함
    }else{
        $('header').css('background','');//기본 딤드 배경 유지함
    }
});



// 현재 섹션의 이퀄라이저만 활성화함
$(document).ready(function() {
    var buttons = $('.section_nav button');
    if (!buttons.length) return;

    function updateSectionNav() {
        var marker = $(window).scrollTop() + $('#headerArea').outerHeight() + 30;
        var active = 0;
        buttons.each(function(index) {
            var section = $($(this).attr('data-target'));
            if (section.length && section.offset().top <= marker) active = index;
        });
        buttons.parent().removeClass('active');
        buttons.removeAttr('aria-current');
        buttons.eq(active).attr('aria-current', 'location').parent().addClass('active');
    }

    buttons.click(function() {
        var section = $($(this).attr('data-target'));
        if (!section.length) return;
        var target = Math.max(0, section.offset().top - $('#headerArea').outerHeight());
        var duration = 700;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) duration = 0;
        $('html, body').stop().animate({ scrollTop: target }, duration, updateSectionNav);
    });

    $(window).on('scroll resize load', updateSectionNav);
    updateSectionNav();
});


// 태블릿·모바일(1024px 이하)에서는 화면을 채우는 큰 메뉴를 표시함
var onoff = false;
var menuBreakpoint = window.matchMedia('(max-width: 1024px)');
var menuPanel = $('#gnb');
var menuTrigger = $('.menu_open');
var menuInertState = [];

function setMobileMenu(open) {
    onoff = open;
    var duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 160;
    menuPanel.stop(true, true);
    $('#headerArea').toggleClass('mn_open', open);
    $('body').toggleClass('menu_on', open);
    menuTrigger.attr('aria-expanded', open);
    menuPanel.attr('aria-hidden', !open).prop('inert', !open);
    if (open) {
        menuInertState = [];
        $('main, #footerArea, .top_move, #showimage').each(function() {
            menuInertState.push({ element: this, inert: this.inert });
            this.inert = true;
        });
        menuPanel.scrollTop(0).fadeIn(duration);
    } else {
        menuPanel.fadeOut(duration);
        menuInertState.forEach(function(item) { item.element.inert = item.inert; });
        menuInertState = [];
    }
    updateSettingLabels();
}

menuTrigger.on('click', function(event) {
    event.preventDefault();
    if (menuBreakpoint.matches) setMobileMenu(!onoff);
});
menuPanel.on('click', 'a', function() {
    if (onoff) setMobileMenu(false);
});

// 화면 구간을 넘을 때 메뉴 상태만 초기화하고 높이는 CSS에서 관리함
function configureMenuLayout() {
    setMobileMenu(false);
    menuPanel.stop(true, true).css({ height: '', opacity: '' });
    if (menuBreakpoint.matches) {
        menuPanel.hide().attr('aria-hidden', 'true').prop('inert', true);
    } else {
        menuPanel.css('display', '').removeAttr('aria-hidden').prop('inert', false);
    }
}
menuBreakpoint.addEventListener('change', configureMenuLayout);
configureMenuLayout();

// 메뉴가 열려 있는 동안 키보드 초점이 헤더 밖으로 나가지 않도록 함
$(document).on('keydown', function(event) {
    if (!onoff || event.key !== 'Tab') return;
    var controls = $('#headerArea').find('a[href], button:not([disabled])').filter(':visible');
    var first = controls[0];
    var last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});
// 영어는 HTML 본문, 한글은 data-ko에서 관리함
// 예: <span data-ko="블루노트 이야기">DISCOVER OUR STORY</span>
// 번역 문구 추가 시 HTML에 data-ko 작성함
// data-ko는 자식 태그 없이 문구만 있는 태그에 사용함
// 영어 복원용 원문을 data-en에 보관함
$('[data-ko]').each(function() {
    $(this).attr('data-en', $(this).text());
});
// 이미지 설명은 alt에 영어, data-ko-alt에 한글 작성함
$('[data-ko-alt]').each(function() {
    $(this).attr('data-en-alt', $(this).attr('alt'));
});

// 현재 언어와 테마에 맞춰 버튼의 접근성 설명 갱신함
// aria-pressed는 라이트 모드 여부, 메뉴 설명은 열림 상태 반영함
function updateSettingLabels() {
    var korean = $('html').attr('lang') === 'ko';
    var light = $('html').attr('data-theme') === 'light';
    $('.theme_toggle').attr('aria-pressed', light ? 'true' : 'false');
    $('.theme_toggle').attr('aria-label', korean ? (light ? '다크 모드로 전환' : '라이트 모드로 전환') : (light ? 'Switch to dark mode' : 'Switch to light mode'));
    // EN·KR 버튼 중 현재 언어만 선택 상태로 표시함
    $('.language_button').each(function() {
        $(this).attr('aria-pressed', $(this).attr('data-language') === $('html').attr('lang'));
    });
    $('.language_options').attr('aria-label', korean ? '언어 선택' : 'Language');
    $('.menu_open').attr('aria-label', korean ? (onoff ? '메뉴 닫기' : '메뉴 열기') : (onoff ? 'Close menu' : 'Open menu'));
    $('.header_options').attr('aria-label', korean ? '테마와 언어 설정' : 'Theme and language settings');
}

// 언어만 변경하고 현재 테마 유지함
// html의 lang에 따라 common.css의 언어별 폰트 적용함
function changeLanguage(language) {
    $('html').attr('lang', language);
    $('[data-ko]').each(function() {
        $(this).text($(this).attr('data-' + language));
    });
    // 이미지 대체 텍스트도 함께 전환함
    $('[data-ko-alt]').each(function() {
        $(this).attr('alt', $(this).attr('data-' + language + '-alt'));
    });
    updateSettingLabels();
}

// 새로고침·페이지 이동 후에도 설정을 쓰도록 브라우저에 저장함
// 테마와 언어는 별도 키로 저장함
function saveSetting(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (e) {
        // 저장이 차단돼도 현재 페이지 전환 유지함
    }
}

// dark ↔ light 전환함. 색상은 common.css 변수에서 수정함
$('.theme_toggle').on('click', function() {
    var theme = $('html').attr('data-theme') === 'dark' ? 'light' : 'dark';
    $('html').attr('data-theme', theme);
    saveSetting('blueNoteTheme', theme);
    updateSettingLabels();
});

// 선택한 언어 적용함. 번역 문구는 HTML의 data-ko에서 수정함
$('.language_button').on('click', function() {
    var language = $(this).attr('data-language');
    changeLanguage(language);
    saveSetting('blueNoteLanguage', language);
});

// 첫 방문은 다크·영어, 이후에는 저장된 설정 적용함
// 기본값 변경 시 아래 값과 HTML의 lang·data-theme도 맞춤
var savedTheme = 'dark';
var savedLanguage = 'en';
try {
    if (localStorage.getItem('blueNoteTheme') === 'light') savedTheme = 'light';
    if (localStorage.getItem('blueNoteLanguage') === 'ko') savedLanguage = 'ko';
} catch (e) {
    // 저장된 설정을 읽지 못하면 기본값 사용함
}
// 저장된 테마·언어 적용 후 버튼 설명 갱신함
$('html').attr('data-theme', savedTheme);
changeLanguage(savedLanguage);

$(document).on('keydown', function(e) {
    if (e.key === 'Escape' && onoff) {
        $('.menu_open').trigger('click').trigger('focus');
    }
});

// 스플래시 전체 약 2.4초: 낙하 → 잠시 멈춤 → 원 확대 → 메인 표시함
$(document).ready(function() {
    var splash = $('#splashScreen');
    if (!splash.length) return;
    // 모바일·태블릿에서 탭 세션당 최초 한 번만 실행함
    if ($(window).width() > 1024) {
        $('html').removeClass('splash_pending');
        return;
    }
    // 움직임 줄이기 설정에서는 스플래시 생략함
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        $('html').removeClass('splash_pending');
        return;
    }

    try {
        if (sessionStorage.getItem('blueNoteSplashSeen') === 'done') {
            splash.hide().prop('hidden', true);
            $('html').removeClass('splash_pending');
            return;
        }
        // 애니메이션 도중 이동해도 다시 표시되지 않도록 시작할 때 기록함
        sessionStorage.setItem('blueNoteSplashSeen', 'done');
    } catch (e) {
        // 저장소를 사용할 수 없어도 페이지는 정상 표시함
    }
    var logo = splash.find('.splash_logo');
    var circle = splash.find('.splash_circle');
    var content = $('#wrap');
    var original_inert = content.prop('inert');
    var finished = false;

    function finishSplash() {
        if (finished) return;
        finished = true;
        splash.stop(true).hide().prop('hidden', true);
        logo.stop(true);
        $('body').removeClass('splash_on');
        content.prop('inert', original_inert);
    }

    // 뒤로 가기로 복원된 화면에 스플래시와 초점 잠금이 남지 않도록 함
    window.addEventListener('pageshow', function(event) {
        if (event.persisted) finishSplash();
    });
    $('body').addClass('splash_on');
    content.prop('inert', true);
    splash.prop('hidden', false).show();
    $('html').removeClass('splash_pending');
    // 화면을 표시한 뒤 실제 로고 높이로 착지 위치 계산함
    var center_top = (splash.height() - logo.height()) / 2;
    logo.css('top', -logo.height());

    // 0~0.6초: 위에서 떨어져 살짝 튕긴 뒤 중앙에 착지함
    logo.animate({ top: center_top + 12 }, 350)
        .animate({ top: center_top - 6 }, 150)
        .animate({ top: center_top }, 100);

    // 0.95~1.95초: 로고의 원을 확대해 화면 끝까지 덮음
    setTimeout(function() {
        if (finished) return;
        var scale = Math.ceil(($(window).width() + $(window).height()) / circle.height()) * 2;
        circle.css('transform', 'scale(' + scale + ')');
    }, 950);

    // 2.05~2.4초: 확대된 화면을 걷어 내고 메인 표시함
    setTimeout(function() {
        if (!finished) splash.fadeOut(350, finishSplash);
    }, 2050);

    // 탭 전환 등으로 애니메이션이 늦어져도 화면 가림 해제함
    setTimeout(finishSplash, 2800);
});

// 서브페이지에서 히어로를 지난 뒤 PC 전용 TOP 버튼을 표시함
$(document).ready(function() {
    var topButton = $('.top_move');
    if (!topButton.length) return;
    var scrollingTop = false;

    function updateTopButton() {
        var scroll = $(window).scrollTop();
        var desktop = $(window).width() > 1024;
        topButton.prop('hidden', !desktop);
        topButton.toggleClass('is_visible', desktop && (scroll > $('.sub_hero').outerHeight() || scrollingTop));
    }

    topButton.on('click', function() {
        if (scrollingTop) return;
        scrollingTop = true;
        topButton.addClass('is_spinning');
        var duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 900;
        $('html, body').stop().animate({ scrollTop: 0 }, duration).promise().done(function() {
            scrollingTop = false;
            topButton.removeClass('is_spinning');
            if (document.activeElement === topButton[0]) {
                var logo = document.querySelector('#headerArea .logo a');
                if (logo) logo.focus({ preventScroll: true });
            }
            updateTopButton();
        });
    });
    $(window).on('scroll resize load', updateTopButton);
    updateTopButton();
});
// 자체 이동이 있는 휠·슬라이더·팝업을 제외하고 스크롤 등장 효과를 초기화함.
$(function() {
    if (!window.AOS || !document.querySelector('[data-aos]')) return;
    var motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    function syncScrollMotion() {
        document.documentElement.classList.toggle('aos_enabled', !motionPreference.matches);
    }
    try {
        syncScrollMotion();
        AOS.init({ duration: 700, easing: 'ease-out-cubic', offset: 100, once: true, mirror: false, disable: function() { return motionPreference.matches; } });
        motionPreference.addEventListener('change', function() {
            syncScrollMotion();
            AOS.refreshHard();
        });
        $(window).on('load.aosPage', function() { AOS.refresh(); });
        document.addEventListener('load', function(event) {
            if (event.target.tagName === 'IMG') AOS.refresh();
        }, true);
        $(document).on('focusin.aosPage', '[data-aos], [data-aos] a, [data-aos] button', function() {
            $(this).closest('[data-aos]').addClass('aos-animate');
        });
    } catch (error) {
        document.documentElement.classList.remove('aos_enabled');
    }
});