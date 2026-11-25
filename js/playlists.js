$(document).ready(function() {
    var buttons = $('.playlist_button');
    var details = $('.playlist_detail');

    // 보이는 목록 순서대로 번호를 1·2·3으로 표시함
    function updatePlaylistNumbers() {
        $('.playlist_list li').not('.active').each(function(index) {
            $(this).find('.playlist_number').text(index + 1);
        });
    }

    // 첫 화면에서도 선택한 항목을 목록에서 제외함
    buttons.parent().removeClass('active');
    buttons.filter('.active').parent().addClass('active');
    updatePlaylistNumbers();

    // 선택한 목록과 같은 순서의 이미지·설명 표시함
    buttons.click(function() {
        if ($(this).hasClass('active')) return;
        var number = buttons.index(this);
        var fade_time = 200;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) fade_time = 0;

        buttons.removeClass('active').attr('aria-pressed', 'false');
        $(this).addClass('active').attr('aria-pressed', 'true');
        // 왼쪽에 표시한 항목은 오른쪽 목록에서 제외함
        buttons.parent().removeClass('active');
        $(this).parent().addClass('active');
        updatePlaylistNumbers();
        details.stop(true, true).hide().removeClass('active').attr('aria-hidden', 'true');
        details.eq(number).addClass('active').attr('aria-hidden', 'false').fadeIn(fade_time);
    });
});
