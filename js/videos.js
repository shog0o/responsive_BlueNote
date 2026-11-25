$(document).ready(function() {
    var selected_video = 0;

    // 새로 만든 설명도 기존 data-en·data-ko 방식으로 전환함
    function setVideoText(element, english, korean) {
        element.attr('data-en', english).attr('data-ko', korean);
        if ($('html').attr('lang') === 'ko') element.text(korean);
        else element.text(english);
    }

    function videoId(number) {
        return blueNoteVideos[number].videoUrl.split('v=')[1];
    }

    function videoThumbnail(number) {
        return './images/main/video/video_0' + (number + 1) + '.jpg';
    }

    // 카드의 이미지·제목·분류·짧은 설명을 함께 변경함
    function fillVideoCard(button, number) {
        var video = blueNoteVideos[number];
        button.attr('data-video-index', number).attr('data-video-id', videoId(number));
        button.find('img').attr('src', videoThumbnail(number));
        button.find('.video_category').text(video.category);
        button.find('.video_title').text(video.title);
        setVideoText(button.find('.video_description'), video.descriptionShortEn, video.descriptionShortKo);
    }

    function createVideoCard(number) {
        var card = $('<li class="video_card"></li>');
        var button = $('<button type="button">' +
            '<span class="video_media"><img alt="" width="640" height="360"></span>' +
            '<span class="video_action hidden"></span>' +
            '<span class="video_category" lang="en"></span>' +
            '<strong class="video_title" lang="en"></strong>' +
            '<span class="video_description"></span></button>');
        button.addClass('video_select').attr('aria-controls', 'videoStage');
        setVideoText(button.find('.video_action'), 'Select video: ', '영상 선택: ');
        fillVideoCard(button, number);
        card.append(button);
        return card;
    }

    // 큰 스테이지에는 선택 영상의 상세 설명 표시함
    function showVideoStage(number) {
        var video = blueNoteVideos[number];
        var stage = $('.video_stage');
        var player = stage.find('.video_player');
        player.attr('data-video-index', number).attr('data-video-id', videoId(number));
        // 유튜브 기본 재생 버튼 사용함. 선택만 했을 때는 자동 재생하지 않음
        var frame = $('<iframe allow="encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>');
        frame.attr('title', video.title);
        frame.attr('src', 'https://www.youtube-nocookie.com/embed/' + videoId(number) + '?autoplay=0&controls=1&rel=0');
        player.empty().append(frame);
        stage.find('.video_category').text(video.category);
        stage.find('.video_title').text(video.title);
        setVideoText(stage.find('.video_description'), video.descriptionLongEn, video.descriptionLongKo);
    }

    // 메인은 01~05번 중 선택 영상 1개와 작은 카드 4개만 표시함
    if ($('.video_stage').length) {
        showVideoStage(selected_video);
        for (var i = 1; i < 5; i++) $('.video_list').append(createVideoCard(i));
    }

    // 클릭한 작은 카드와 큰 영상의 자리를 교환함. 이때 재생하지 않음
    $('.video_list').on('click', '.video_select', function() {
        var number = Number($(this).attr('data-video-index'));
        var previous = selected_video;
        selected_video = number;
        showVideoStage(selected_video);
        fillVideoCard($(this), previous);
    });
});
