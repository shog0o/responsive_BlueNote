$(document).ready(function() {
    var speed = 1; // 1회 이동 거리 설정함. 값을 높이면 빨라짐
    var delay = 20; // 이동 간격을 밀리초로 설정함
    var paused = false;
    var hovering = false;

    // 원본 목록을 복제해 끝에서도 끊김 없이 이어지게 함
    $('.artist_row').each(function() {
        var row = $(this);
        var track = row.find('.artist_track');
        var list = row.find('.artist_list').first();
        var distance = list.outerWidth();
        var position = -100;

        // 넓은 모니터에서도 빈 공간이 없도록 필요한 만큼 복제함
        var copies = Math.ceil($(window).width() / distance) + 1;
        for (var i = 0; i < copies; i++) {
            var copy = list.clone();
            copy.attr('aria-hidden', 'true'); // 복제 목록은 스크린리더에서 제외함
            track.append(copy);
        }

        if (row.hasClass('artist_row_right')) {
            position = -distance + 100;
        }
        track.css('left', position);

        setInterval(function() {
            if (paused || hovering || document.hidden) return;

            if (row.hasClass('artist_row_left')) {
                position -= speed;
                if (position <= -distance) position += distance;
            } else {
                position += speed;
                if (position >= 0) position -= distance;
            }
            track.css('left', position);
        }, delay);
    });

    // // 카드 위에 마우스를 올리면 두 줄 모두 일시정지함
    // $('.artist_row').mouseenter(function() {
    //     hovering = true;
    // });
    // $('.artist_row').mouseleave(function() {
    //     hovering = false;
    // });

    // 버튼으로 자동 이동을 멈추거나 다시 시작함
    $('.artists_pause').click(function() {
        paused = !paused;
        $(this).attr('aria-pressed', paused);
        var label = $(this).find('span');
        if (paused) {
            label.attr('data-en', 'PLAY').attr('data-ko', '재생');
        } else {
            label.attr('data-en', 'PAUSE').attr('data-ko', '멈춤');
        }
        label.text(label.attr('data-' + $('html').attr('lang')));
    });
});
