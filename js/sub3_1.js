/* SUB 03 / ALBUMS — 기존 jQuery + common.js의 다국어/테마 방식 재사용 */
$(document).ready(function() {
    var catalog = $('.rw_catalog_button');
    if (!catalog.length) return;
    var active = 3; // MOANIN'이 최초 선택 상태

    var trackModal = $('#trackModal');
    var returnFocus;
    var originalInert;
    var detailArea = $('.rw_detail_layout');
    var swipeStartX = 0;
    var swipeStartY = 0;
    var swiping = false;

    // 앨범명으로 곡 목록을 연결함. 카탈로그 순서가 달라도 같은 음반을 찾음
    var trackLists = {
        "GO!": [
            "Cheese Cake",
            "I Guess I'll Hang My Tears Out to Dry",
            "Second Balcony Jump",
            "Love for Sale",
            "Where Are You",
            "Three O'Clock in the Morning"
        ],
        "BLUE TRAIN": [
            "Blue Train",
            "Moment's Notice",
            "Locomotion",
            "I'm Old Fashioned",
            "Lazy Bird"
        ],
        "COME AWAY WITH ME": [
            "Don't Know Why",
            "Seven Years",
            "Cold Cold Heart",
            "Feelin' the Same Way",
            "Come Away with Me",
            "Shoot the Moon",
            "Turn Me On",
            "Lonestar",
            "I've Got to See You Again",
            "Painter Song",
            "One Flight Down",
            "Nightingale",
            "The Long Day Is Over",
            "The Nearness of You"
        ],
        "MOANIN'": [
            "Moanin'",
            "Are You Real",
            "Along Came Betty",
            "The Drum Thunder Suite",
            "Blues March",
            "Come Rain or Come Shine"
        ],
        "SOMETHIN' ELSE": [
            "Autumn Leaves",
            "Love for Sale",
            "Somethin' Else",
            "One for Daddy-O",
            "Dancing in the Dark"
        ],
        "COOL STRUTTIN'": [
            "Cool Struttin'",
            "Blue Minor",
            "Sippin' at Bells",
            "Deep Night"
        ],
        "LIQUID SPIRIT": [
            "No Love Dying",
            "Liquid Spirit",
            "Lonesome Lover",
            "Water Under Bridges",
            "Hey Laura",
            "Musical Genocide",
            "Wolfcry",
            "Free",
            "Brown Grass",
            "Wind Song",
            "The \"In\" Crowd",
            "Movin'",
            "When Love Was King",
            "I Fall in Love Too Easily"
        ],
        "VOLUME 1": [
            "Tempus Fugit",
            "Kelo",
            "Enigma",
            "Ray's Idea",
            "How Deep Is the Ocean",
            "C.T.A. (Alternate Master)",
            "Dear Old Stockholm",
            "Chance It",
            "Yesterdays",
            "Donna (Alternate Master)",
            "C.T.A.",
            "Woody'n You (Alternate Master)"
        ],
        "TIME WAITS": [
            "Buster Rides Again",
            "Sub City",
            "Time Waits",
            "Marmalade",
            "Monopoly",
            "John's Abbey",
            "Dry Soul",
            "Sub City (Alternate Take)"
        ],
        "THE SIDEWINDER": [
            "The Sidewinder",
            "Totem Pole",
            "Gary's Notebook",
            "Boy, What a Night",
            "Hocus-Pocus"
        ],
        "OUT TO LUNCH!": [
            "Hat and Beard",
            "Something Sweet, Something Tender",
            "Gazzelloni",
            "Out to Lunch",
            "Straight Up and Down"
        ],
        "MAIDEN VOYAGE": [
            "Maiden Voyage",
            "The Eye of the Hurricane",
            "Little One",
            "Survival of the Fittest",
            "Dolphin Dance"
        ],
        "HUB-TONES": [
            "You're My Everything",
            "Prophet Jennings",
            "Hub-Tones",
            "Lament for Booker",
            "For Spee's Sake",
            "You're My Everything (Alternate Take)",
            "Hub-Tones (Alternate Take)",
            "For Spee's Sake (Alternate Take)"
        ],
        "GENIUS OF MODERN MUSIC, VOL. 1": [
            "Humph",
            "Evonce",
            "Suburban Eyes",
            "Thelonious",
            "Evonce (Alternate Take)",
            "Suburban Eyes (Alternate Take)",
            "Nice Work If You Can Get It",
            "Ruby, My Dear",
            "Well, You Needn't",
            "April in Paris",
            "Off Minor",
            "Introspection",
            "Nice Work If You Can Get It (Alternate Take)",
            "Ruby, My Dear (Alternate Take)",
            "Well, You Needn't (Alternate Take)",
            "April in Paris (Alternate Take)",
            "In Walked Bud",
            "Monk's Mood",
            "Who Knows?",
            "'Round Midnight",
            "Who Knows? (Alternate Take)"
        ]
    };

    // 선택한 음반 정보와 곡 목록을 모달에 넣음. 곡명은 영문으로 유지함
    function openTrackModal(button) {
        var item = $(button);
        var title = item.attr('data-title');
        var tracks = trackLists[title];
        if (!tracks) return;
        var korean = $('html').attr('lang') === 'ko';
        selectAlbum(Number(item.attr('data-album')));
        trackModal.find('.rw_track_cover').attr('src', item.attr('data-file'));
        trackModal.find('.rw_track_title').text(title);
        trackModal.find('.rw_track_artist').text(item.attr('data-artist'));
        trackModal.find('.rw_track_catalog').text(item.attr('data-cat'));
        trackModal.find('.rw_track_year').text(item.attr('data-year') || '—');
        trackModal.find('.rw_track_count').text(('0' + tracks.length).slice(-2) + (korean ? '곡' : ' TRACKS'));
        trackModal.find('.rw_track_close').attr('aria-label', korean ? '곡 목록 닫기' : 'Close tracklist');
        trackModal.find('.rw_track_list').attr('aria-label', korean ? '수록곡 목록' : 'Album tracks').empty();
        $.each(tracks, function(index, name) {
            var row = $('<li>');
            $('<span class="rw_track_number" aria-hidden="true">').text(('0' + (index + 1)).slice(-2)).appendTo(row);
            $('<span class="rw_track_name" lang="en">').text(name).appendTo(row);
            row.appendTo(trackModal.find('.rw_track_list'));
        });
        returnFocus = button;
        originalInert = $('#wrap').prop('inert');
        $('#wrap').prop('inert', true);
        $('body').addClass('rw_modal_open');
        trackModal.prop('hidden', false);
        trackModal.find('.rw_track_list').scrollTop(0);
        trackModal.find('.rw_track_close').focus();
    }

    // 모달을 닫고 누른 앨범으로 초점을 돌림. 페이지 스크롤 위치는 유지함
    function closeTrackModal() {
        trackModal.prop('hidden', true);
        $('#wrap').prop('inert', originalInert);
        $('body').removeClass('rw_modal_open');
        if (returnFocus) returnFocus.focus({ preventScroll: true });
    }

    function selectAlbum(index) {
        index = (index + catalog.length) % catalog.length;
        active = index;
        var item = catalog.eq(index);
        var en = item.attr('data-description-en');
        var ko = item.attr('data-description-ko');
        var pcEn = item.attr('data-description-pc-en');
        var pcKo = item.attr('data-description-pc-ko');
        var mobileEn = item.attr('data-description-mobile-en');
        var mobileKo = item.attr('data-description-mobile-ko');
        var title = item.attr('data-title');
        var artist = item.attr('data-artist');
        var file = item.attr('data-file');
        var year = item.attr('data-year');
        var korean = $('html').attr('lang') === 'ko';

        $('.rw_catalog_button').attr('aria-pressed', 'false');
        item.attr('aria-pressed', 'true');
        $('.rw_detail_title').text(title);
        $('.rw_detail_artist').text(artist);
        $('.rw_detail_cat').text(item.attr('data-cat'));
        $('.rw_detail_year').text(year || '—');
        $('.rw_detail_position').text(('0' + (index + 1)).slice(-2) + ' / ' + catalog.length);
        // 한영 전환용 설명 데이터도 선택한 음반으로 갱신함
        $('.rw_detail_description_tablet').attr('data-en', en).attr('data-ko', ko).text(korean ? ko : en);
        $('.rw_detail_description_pc').attr('data-en', pcEn).attr('data-ko', pcKo).text(korean ? pcKo : pcEn);
        $('.rw_detail_description_mobile').attr('data-en', mobileEn).attr('data-ko', mobileKo).text(korean ? mobileKo : mobileEn);
        $('.rw_detail_label')
            .attr('data-en', 'SELECTED RECORD / ' + ('0' + (index + 1)).slice(-2) + ' OF 14')
            .attr('data-ko', '선택한 음반 / ' + ('0' + (index + 1)).slice(-2) + ' / 14')
            .text(korean ? '선택한 음반 / ' + ('0' + (index + 1)).slice(-2) + ' / 14' : 'SELECTED RECORD / ' + ('0' + (index + 1)).slice(-2) + ' OF 14');

        // LP 중앙 라벨도 선택한 앨범 이미지로 변경함
        $('.rw_vinyl_label img').attr('src', file);

        var cover = $('.rw_detail_cover');
        cover.attr('src', file)
            .attr('data-en-alt', title + ' album artwork')
            .attr('data-ko-alt', title + ' 앨범 커버')
            .attr('alt', korean ? title + ' 앨범 커버' : title + ' album artwork');

    }

    $('.rw_catalog_button').on('click', function() {
        openTrackModal(this);
    });
    trackModal.find('.rw_track_close').on('click', closeTrackModal);
    trackModal.on('click', function(event) {
        if (event.target === this) closeTrackModal();
    });
    // Esc로 닫음. Tab 초점은 닫기 버튼과 스크롤 목록 안에서 이동함
    $(document).on('keydown', function(event) {
        if (trackModal.prop('hidden')) return;
        if (event.key === 'Escape') closeTrackModal();
        if (event.key !== 'Tab') return;
        var close = trackModal.find('.rw_track_close')[0];
        var list = trackModal.find('.rw_track_list')[0];
        if (event.shiftKey && document.activeElement === close) {
            event.preventDefault();
            list.focus();
        } else if (!event.shiftKey && document.activeElement === list) {
            event.preventDefault();
            close.focus();
        }
    });
    $('.rw_detail_prev').on('click', function() { selectAlbum(active - 1); });
    $('.rw_detail_next').on('click', function() { selectAlbum(active + 1); });

    // 1024px 이하에서 상세 영역을 좌우로 밀어 음반을 넘김
    // 세로 이동과 버튼 터치는 기존 스크롤·클릭으로 유지함
    detailArea.on('touchstart', function(event) {
        swiping = false;
        if ($(window).width() > 1024 || !trackModal.prop('hidden')) return;
        if ($(event.target).closest('button, a').length) return;
        var points = event.originalEvent.touches;
        if (points.length !== 1) return;
        swipeStartX = points[0].clientX;
        swipeStartY = points[0].clientY;
        swiping = true;
    });
    detailArea.on('touchmove', function(event) {
        if (!swiping) return;
        var points = event.originalEvent.touches;
        if (points.length !== 1) {
            swiping = false;
            return;
        }
        var dx = points[0].clientX - swipeStartX;
        var dy = points[0].clientY - swipeStartY;
        if (Math.abs(dy) > 12 && Math.abs(dy) > Math.abs(dx)) swiping = false;
    });
    detailArea.on('touchend', function(event) {
        if (!swiping) return;
        swiping = false;
        if ($(window).width() > 1024 || !trackModal.prop('hidden')) return;
        var point = event.originalEvent.changedTouches[0];
        if (!point) return;
        var dx = point.clientX - swipeStartX;
        var dy = point.clientY - swipeStartY;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.25) {
            selectAlbum(active + (dx < 0 ? 1 : -1));
        }
    });
    detailArea.on('touchcancel', function() { swiping = false; });
    // 언어 전환 후 현재 선택한 음반 정보를 다시 맞춤
    $('.language_button').on('click', function() { selectAlbum(active); });
    selectAlbum(active);
});
