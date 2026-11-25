/* 제공된 Masonry + imagesLoaded 예제를 기존 갤러리 구조에 적용함. */
$(document).ready(function() {
    var grid = document.querySelector('.ga_grid');
    if (!grid) return;
    var masonry;
    var modal = document.getElementById('galleryModal');
    var photos = $('.ga_photo');
    var active = 0;
    var returnFocus;
    var currentLayout = '';
    var tabletPhotos = {
        1: 'gall_64.jpg',
        2: 'gall_42.jpg',
        6: 'gall_53.jpg'
    };
    var mobilePhotos = {
        0: 'gall_56.jpg',
        1: 'gall_43.jpg',
        2: 'gall_61.jpg',
        4: 'gall_46.jpg',
        5: 'gall_59.jpg'
    };
    photos.find('img').each(function() {
        $(this).data('desktopPhoto', $(this).attr('src'));
    });
    function visiblePhotos() {
        return photos.filter(function() { return $(this).closest('.ga_item').css('display') !== 'none'; });
    }
    // 사진의 실제 열 위치를 기준으로 안쪽을 향해 짧게 모이도록 설정함.
    function updateGalleryMotion() {
        var mobile = window.matchMedia('(max-width: 640px)').matches;
        var bounds = grid.getBoundingClientRect();
        visiblePhotos().each(function() {
            var item = this.parentElement.getBoundingClientRect();
            var position = (item.left + item.width / 2 - bounds.left) / bounds.width;
            var direction = mobile ? 'fade-up' : position < .4 ? 'fade-right' : position > .6 ? 'fade-left' : 'fade-up';
            this.setAttribute('data-aos', direction);
            this.setAttribute('data-aos-delay', mobile ? '0' : Math.abs(position - .5) < .2 ? '50' : '0');
        });
        if (window.AOS) AOS.refresh();
    }
    function showPhoto(index) {
        var available = visiblePhotos();
        active = (index + available.length) % available.length;
        var image = available.eq(active).find('img');
        $('.ga_full_image').attr('src', image.attr('src')).attr('data-en-alt', image.attr('data-en-alt'))
            .attr('data-ko-alt', image.attr('data-ko-alt')).attr('alt', image.attr('alt'));
        $('.ga_caption').attr('data-en', image.attr('data-en-alt')).attr('data-ko', image.attr('data-ko-alt'))
            .text(image.attr('alt'));
        $('.ga_modal_count').text(('0' + (active + 1)).slice(-2) + ' / ' + available.length);
    }
    function updateCollection() {
        var width = $(window).width();
        var layout = width <= 640 ? 'mobile' : width <= 1024 ? 'tablet' : 'desktop';
        var ko = $('html').attr('lang') === 'ko';
        photos.find('img').each(function(index) {
            var original = $(this).data('desktopPhoto');
            var replacement = layout === 'mobile' ? (mobilePhotos[index] || tabletPhotos[index]) : layout === 'tablet' ? tabletPhotos[index] : null;
            var source = replacement ? './images/sub6/' + replacement : original;
            var key = source.split('/').pop().split('.')[0];
            var description = galleryDescriptions[key];
            var en = description.en;
            var korean = description.ko;
            if ($(this).attr('src') !== source) $(this).attr('src', source);
            $(this).attr('data-en-alt', en).attr('data-ko-alt', korean).attr('alt', ko ? korean : en);
        });
        var count = visiblePhotos().length;
        $('.ga_count').attr('data-en', count + ' / IMAGES').attr('data-ko', count + ' / 이미지').text(count + (ko ? ' / 이미지' : ' / IMAGES'));
        if (modal.open && currentLayout !== layout) modal.close();
        currentLayout = layout;
        if (masonry) {
            masonry.options.gutter = parseFloat(getComputedStyle(grid).getPropertyValue('--ga-gap')) || 20;
            masonry.layout();
        } else {
            updateGalleryMotion();
        }
    }
    updateCollection();
    if (typeof Masonry !== 'undefined') {
        grid.classList.add('is_masonry');
        masonry = new Masonry(grid, {
            itemSelector: '.ga_item',
            columnWidth: '.ga_sizer',
            gutter: parseFloat(getComputedStyle(grid).getPropertyValue('--ga-gap')) || 20,
            percentPosition: true,
            resize: false,
            transitionDuration: 0
        });
        masonry.on('layoutComplete', updateGalleryMotion);
        updateGalleryMotion();
        if (typeof imagesLoaded !== 'undefined') imagesLoaded(grid).on('progress', function() { masonry.layout(); });
    }
    // CSS 너비 변경과 같은 프레임에 재배치하여 경계 구간의 지연·겹침을 방지함.
    var resizeFrame;
    $(window).on('resize', function() {
        cancelAnimationFrame(resizeFrame);
        resizeFrame = requestAnimationFrame(updateCollection);
    });
    photos.on('click', function() {
        returnFocus = this;
        showPhoto(visiblePhotos().index(this));
        modal.showModal();
        $('body').addClass('ga_modal_open');
    });
    $('.ga_close').on('click', function() { modal.close(); });
    $('.ga_prev').on('click', function() { showPhoto(active - 1); });
    $('.ga_next').on('click', function() { showPhoto(active + 1); });
    $(modal).on('keydown', function(event) {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        showPhoto(active + (event.key === 'ArrowLeft' ? -1 : 1));
    });
    modal.addEventListener('click', function(event) {
        var rect = modal.getBoundingClientRect();
        if (event.target === modal && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) modal.close();
    });
    modal.addEventListener('close', function() {
        $('body').removeClass('ga_modal_open');
        if (returnFocus) returnFocus.focus({ preventScroll: true });
    });
    function updateLabels() {
        var ko = $('html').attr('lang') === 'ko';
        $(modal).attr('aria-label', ko ? '사진 크게 보기' : 'Photo viewer');
        $('.ga_close').attr('aria-label', ko ? '사진 닫기' : 'Close photograph');
        $('.ga_prev').attr('aria-label', ko ? '이전 사진' : 'Previous photograph');
        $('.ga_next').attr('aria-label', ko ? '다음 사진' : 'Next photograph');
        if (modal.open) showPhoto(active);
    }
    $('.language_button').on('click', function() { updateCollection(); updateLabels(); });
    updateLabels();
});
