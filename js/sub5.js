/* PC에서만 Swiper 사용. 태블릿은 2열 × 4행, 모바일은 앞의 4개를 세로 배치함. */
$(document).ready(function() {
    var slider;
    var desktop = window.matchMedia('(min-width: 1025px)');
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function updateRange(swiper) {
        var start = swiper.activeIndex + 1;
        var end = Math.min(start + 2, 8);
        // 마지막 위치에서는 끝의 세 카드를 표시함.
        if (swiper.isEnd) { start = 6; end = 8; }
        $('.vc_range').text(('0' + start).slice(-2) + '—' + ('0' + end).slice(-2) + ' / 08');
        $('.vc_prev').prop('disabled', swiper.isBeginning);
        $('.vc_next').prop('disabled', swiper.isEnd);
        $('.vc_progress span').css('width', (37.5 + swiper.progress * 62.5) + '%');
    }
    function configureLayout() {
        if (desktop.matches && !slider) {
            slider = new Swiper('.vc_slider', {
                slidesPerView: 3.23,
                spaceBetween: 28,
                speed: reducedMotion.matches ? 0 : 450,
                grabCursor: true,
                watchOverflow: true,
                a11y: { enabled: false },
                on: {
                    init: function() { updateRange(this); },
                    slideChange: function() { updateRange(this); },
                    transitionEnd: function() { updateRange(this); }
                }
            });
        } else if (!desktop.matches && slider) {
            slider.destroy(true, true);
            slider = null;
        }
    }
    $('.vc_prev').on('click', function() { if (slider) slider.slidePrev(); });
    $('.vc_next').on('click', function() { if (slider) slider.slideNext(); });
    // 키보드로 화면 밖 영상에 접근할 때 해당 카드를 화면 안으로 이동함.
    $('.vc_video').on('focus', function() {
        if (slider) slider.slideTo($('.vc_video').index(this));
    });
    $('.vc_navigation').on('keydown', function(event) {
        if (!slider || (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight')) return;
        event.preventDefault();
        if (event.key === 'ArrowLeft') slider.slidePrev();
        else slider.slideNext();
    });
    var modal = document.getElementById('videoModal');
    var returnFocus;
    var selectedIndex = 0;
    var videoButtons = $('.vc_video');
    function visibleVideos() {
        return videoButtons.filter(function() { return $(this).closest('.vc_card').css('display') !== 'none'; });
    }
    function showModalVideo(button) {
        selectedIndex = videoButtons.index(button);
        var item = $(button);
        var id = item.attr('data-video-id');
        var title = item.attr('data-video-title');
        $('#videoModalTitle').text(title);
        var frame = $('<iframe allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>');
        frame.attr('title', title).attr('src', 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&controls=1&rel=0');
        $('.vc_modal_player').empty().append(frame);
        $('.vc_modal_youtube').attr('href', 'https://www.youtube.com/watch?v=' + id);
        var available = visibleVideos();
        var position = available.index(button);
        $('.vc_modal_count').text(('0' + (position + 1)).slice(-2) + ' / ' + ('0' + available.length).slice(-2));
    }
    function moveModalVideo(direction) {
        var available = visibleVideos();
        var position = available.index(videoButtons[selectedIndex]);
        var next = (position + direction + available.length) % available.length;
        showModalVideo(available[next]);
    }
    videoButtons.on('click', function() {
        if (slider && !slider.allowClick) return;
        returnFocus = this;
        showModalVideo(this);
        modal.showModal();
        $('body').addClass('vc_modal_open');
    });
    $('.vc_modal_prev').on('click', function() { moveModalVideo(-1); });
    $('.vc_modal_next').on('click', function() { moveModalVideo(1); });
    // 플레이어 내부 방향키는 유튜브 재생 조작에 그대로 사용함.
    $(modal).on('keydown', function(event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        moveModalVideo(event.key === 'ArrowLeft' ? -1 : 1);
    });
    $('.vc_modal_close').on('click', function() { modal.close(); });
    // 다이얼로그 바깥의 어두운 배경을 클릭했을 때 닫음.
    modal.addEventListener('click', function(event) {
        var bounds = modal.getBoundingClientRect();
        if (event.target === modal && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) modal.close();
    });
    // Esc 및 닫기 버튼 모두 플레이어 제거 후 원래 카드로 초점을 복원함.
    modal.addEventListener('close', function() {
        $('.vc_modal_player').empty();
        $('body').removeClass('vc_modal_open');
        if (returnFocus) returnFocus.focus({ preventScroll: true });
    });
    function updateLabels() {
        var ko = $('html').attr('lang') === 'ko';
        $('.vc_modal_close').attr('aria-label', ko ? '영상 닫기' : 'Close video');
        $('.vc_prev').attr('aria-label', ko ? '이전 영상' : 'Previous videos');
        $('.vc_next').attr('aria-label', ko ? '다음 영상' : 'Next videos');
    }
    $('.language_button').on('click', updateLabels);
    $(window).on('resize', configureLayout);
    // 슬라이더 자체의 transform과 충돌하지 않도록 내부 카드에만 등장 효과 적용함.
    if ('IntersectionObserver' in window && !reducedMotion.matches) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('vc_revealed');
                observer.unobserve(entry.target);
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.vc_intro, .vc_video').forEach(function(element) {
            element.classList.add('vc_reveal');
            observer.observe(element);
        });
    }
    updateLabels();
    configureLayout();
});
