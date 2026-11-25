/* SUB 02 / ARTISTS — 기존 jQuery 방식. 스크롤과 관계없이 버튼/인디케이터로 카드 직접 전환. */
$(document).ready(function() {
    var section = $('#artist_wheel');
    if (!section.length) return;

    var cards = section.find('.aw_card');
    var progressButtons = section.find('.aw_progress_button');
    var jumpButtons = $('[data-artist-jump]');
    var total = cards.length;
    var currentIndex = 0;
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    var stage = section.find('.aw_wheel_stage');
    var swipeStartX = 0;
    var swipeStartY = 0;
    var swiping = false;
    var mouseDragging = false;
    var blockSwipeClick = false;

    if (!total) return;

    function clamp(number, min, max) {
        return Math.min(max, Math.max(min, number));
    }

    // 선택된 아티스트와 양옆의 카드만 보여줍니다.
    // 페이지의 세로 스크롤 위치와 카드 전환은 연결하지 않습니다.
    function showArtist(index) {
        index = clamp(index, 0, total - 1);
        currentIndex = index;

        var stageWidth = stage.width();
        var stageHeight = stage.height();
        var isMobile = window.matchMedia('(max-width: 640px)').matches;
        var spreadX = stageWidth * (isMobile ? 0.44 : 0.35);
        var spreadY = stageHeight * (isMobile ? 0.055 : 0.075);
        var angle = isMobile ? 4 : 7;

        cards.each(function(i) {
            var offset = i - currentIndex;
            var distance = Math.abs(offset);
            var shown = distance <= 1;
            var active = distance === 0;
            var direction = offset < 0 ? -1 : 1;
            var x = active ? 0 : direction * spreadX;
            var y = active ? 0 : spreadY;
            var rotate = active ? 0 : direction * angle;
            var scale = active ? 1 : 0.84;

            // 현재 카드보다 멀리 떨어진 카드는 뒤에 숨깁니다.
            // 클릭으로 바뀌는 카드만 짧게 움직이고, 스크롤은 정상 동작합니다.
            this.style.transform = 'translate(-50%, -50%) translate3d(' + x + 'px, ' + y + 'px, 0) rotate(' + rotate + 'deg) scale(' + scale + ')';
            this.style.opacity = shown ? '1' : '0';
            this.style.visibility = shown ? 'visible' : 'hidden';
            this.style.zIndex = active ? '3' : (shown ? '2' : '1');
            this.style.pointerEvents = active ? 'auto' : 'none';

            $(this).toggleClass('is-active', active)
                .toggleClass('is-adjacent', shown && !active)
                .attr('aria-hidden', active ? 'false' : 'true');
            $(this).find('a').attr('tabindex', active ? '0' : '-1');
        });

        progressButtons.attr('aria-pressed', 'false')
            .eq(currentIndex).attr('aria-pressed', 'true');
        section.find('.aw_current_name').text(cards.eq(currentIndex).find('.aw_artist_name').text());
        section.find('.aw_fraction').text(('0' + (currentIndex + 1)).slice(-2) + ' / ' + total);
        section.find('.aw_prev').prop('disabled', currentIndex === 0);
        section.find('.aw_next').prop('disabled', currentIndex === total - 1);
    }

    // 아티스트 명단에서 선택했을 때에만 해당 카드 섹션으로 이동합니다.
    // 이전/다음 버튼과 인디케이터는 페이지 스크롤을 움직이지 않습니다.
    function jumpTo(index, fromRoster) {
        if (!Number.isFinite(index)) return;
        showArtist(index);
        if (fromRoster) {
            var target = Math.max(0, section.offset().top - 110);
            if (reducedMotion.matches) {
                window.scrollTo(0, target);
            } else {
                $('html, body').stop(true).animate({ scrollTop: target }, 450);
            }
        }
    }

    jumpButtons.on('click', function() {
        jumpTo(Number($(this).attr('data-artist-jump')), $(this).closest('#artist_roster').length > 0);
    });
    section.find('.aw_prev').on('click', function() { jumpTo(currentIndex - 1, false); });
    section.find('.aw_next').on('click', function() { jumpTo(currentIndex + 1, false); });

    // 조작 버튼에 포커스가 있을 때 방향키로도 탐색할 수 있습니다.
    section.on('keydown', 'button, a', function(event) {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        event.preventDefault();
        jumpTo(currentIndex + (event.key === 'ArrowRight' ? 1 : -1), false);
    });

    // 좌우로 55px 이상 밀면 한 장 넘김. 세로 이동은 페이지 스크롤로 유지함
    function startSwipe(x, y) {
        swipeStartX = x;
        swipeStartY = y;
        swiping = true;
    }

    function finishSwipe(x, y) {
        if (!swiping) return;
        swiping = false;
        var dx = x - swipeStartX;
        var dy = y - swipeStartY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
            blockSwipeClick = true;
            jumpTo(currentIndex + (dx < 0 ? 1 : -1), false);
            setTimeout(function() { blockSwipeClick = false; }, 400);
        }
    }

    // 한 손가락 터치만 처리함. 여러 손가락 터치와 취소는 넘기지 않음
    stage.on('touchstart', function(event) {
        var points = event.originalEvent.touches;
        if (points.length !== 1) {
            swiping = false;
            return;
        }
        startSwipe(points[0].clientX, points[0].clientY);
    });
    stage.on('touchend', function(event) {
        var point = event.originalEvent.changedTouches[0];
        if (point) finishSwipe(point.clientX, point.clientY);
    });
    stage.on('touchcancel', function() { swiping = false; });

    // PC 마우스 드래그를 처리함. 카드 밖에서 놓아도 종료함
    stage.on('mousedown', function(event) {
        if (event.which !== 1) return;
        mouseDragging = true;
        stage.addClass('is_dragging');
        startSwipe(event.clientX, event.clientY);
    });
    $(document).on('mouseup.artistSwipe', function(event) {
        if (!mouseDragging) return;
        mouseDragging = false;
        stage.removeClass('is_dragging');
        finishSwipe(event.clientX, event.clientY);
    });
    $(window).on('blur.artistSwipe', function() {
        mouseDragging = false;
        swiping = false;
        stage.removeClass('is_dragging');
    });

    // 이미지 기본 드래그와 스와이프 직후 링크 이동을 막음
    stage.on('dragstart', function(event) { event.preventDefault(); });
    stage[0].addEventListener('click', function(event) {
        if (!blockSwipeClick) return;
        event.preventDefault();
        event.stopPropagation();
    }, true);
    $('.language_button').on('click', function() {
        var korean = $('html').attr('lang') === 'ko';
        section.find('.aw_prev').attr('aria-label', korean ? '이전 아티스트' : 'Previous artist');
        section.find('.aw_next').attr('aria-label', korean ? '다음 아티스트' : 'Next artist');
    });

    var resizeTimer;
    $(window).on('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() { showArtist(currentIndex); }, 100);
    });

    showArtist(0); // 알파벳순 첫 번째 아티스트부터 시작함
});
