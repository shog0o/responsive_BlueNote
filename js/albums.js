$(document).ready(function() {
    var dots = $('.album_dot');
    // 현재 앨범의 표시점만 길게 표시함
    function updateAlbumDots(swiper) {
        dots.removeClass('active').attr('aria-pressed', 'false');
        dots.eq(swiper.realIndex).addClass('active').attr('aria-pressed', 'true');
    }

    // PC는 양옆 3장, 태블릿은 양옆 2장까지만 표시함
    function updateVisibleAlbums(swiper) {
        var limit = 3.5;
        if ($(window).width() <= 1024) limit = 2.5;
        if ($(window).width() <= 768) limit = 100;
        $(swiper.slides).each(function() {
            $(this).toggleClass('album_outside', Math.abs(this.progress) > limit);
        });
    }

    // 선택한 슬라이드에 맞춰 제목·아티스트·표시점 갱신함
    function updateAlbum(swiper) {
        var activeCard = $(swiper.slides[swiper.activeIndex]).find('.album_card');
        $('.album_title').text(activeCard.attr('data-title'));
        $('.album_artist').text(activeCard.attr('data-artist'));
        updateAlbumDots(swiper);

        // 키보드 초점은 가운데 커버에만 둠. 화면 밖 슬라이드는 읽기에서 제외함
        $(swiper.slides).each(function(index) {
            var active = index === swiper.activeIndex;
            var visible = $(this).hasClass('swiper-slide-visible') && !$(this).hasClass('album_outside');
            var duplicate = $(this).hasClass('swiper-slide-duplicate');
            $(this).attr('aria-hidden', !active && (!visible || duplicate));
            $(this).find('.album_card').attr('aria-pressed', active).attr('tabindex', active ? '0' : '-1');
        });
    }

    var albumSwiper = new Swiper('.album_stage', {
        initialSlide: 3, // MOANIN'을 처음 표시함
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 24,
        centeredSlides: true,
        loop: true,
        loopedSlides: 14,
        effect: 'coverflow',
        grabCursor: true,
        watchSlidesVisibility: true,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: false
        },
        navigation: {
            prevEl: '.album_prev',
            nextEl: '.album_next'
        },
        // 버튼의 기존 한영 설명을 사용함
        a11y: { enabled: false },
        // Swiper 구간은 해당 너비 이상부터 적용함
        // rotate는 기울기, stretch는 겹침, depth는 뒤로 물러나는 거리 설정함
        breakpoints: {
            769: {
                slidesPerView: 'auto',
                spaceBetween: -80,
                coverflowEffect: { rotate: 20, stretch: 40, depth: 180, modifier: 1, slideShadows: false }
            },
            1025: {
                slidesPerView: 'auto',
                spaceBetween: -130,
                coverflowEffect: { rotate: 20, stretch: 70, depth: 220, modifier: 1, slideShadows: false }
            },
            1281: {
                slidesPerView: 'auto',
                spaceBetween: -180,
                coverflowEffect: { rotate: 20, stretch: 70, depth: 220, modifier: 1, slideShadows: false }
            }
        },
        on: {
            setTranslate: function() { updateVisibleAlbums(this); },
            init: function() { updateAlbum(this); },
            slideChange: function() { updateAlbum(this); },
            transitionEnd: function() { updateAlbum(this); },
            resize: function() { updateAlbum(this); }
        }
    });

    // 표시점을 누르면 원본 앨범 번호로 이동함
    dots.click(function() {
        albumSwiper.slideToLoop(dots.index(this));
    });

    // 드래그가 아닌 클릭일 때 해당 커버로 이동함
    $('.album_stage').on('click', '.album_card', function() {
        if (!albumSwiper.allowClick) return;
        var number = Number($(this).closest('.swiper-slide').attr('data-swiper-slide-index'));
        albumSwiper.slideToLoop(number);
    });

    // 이미지 자체의 브라우저 드래그 막음
    $('.album_stage img').attr('draggable', 'false');

    // 앨범 영역에 초점이 있을 때 방향키로 Swiper 이동함
    $('.albums').keydown(function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            if (e.key === 'ArrowLeft') albumSwiper.slidePrev();
            if (e.key === 'ArrowRight') albumSwiper.slideNext();
            $(albumSwiper.slides[albumSwiper.activeIndex]).find('.album_card').focus();
        }
    });
});
