/* 앨범 아트월: 선택한 LP를 확대하고 소개와 수록곡을 함께 보여줌 */
$(function() {
    var trackLists = {
        "IDLE MOMENTS": ["Idle Moments","Jean De Fleur","Django","Nomad","Jean De Fleur (Alternate Take)","Django (Alternate Take)"],
        "BLOWIN' THE BLUES AWAY": ["Blowin' the Blues Away","The St. Vitus Dance","Break City","Peace","Sister Sadie","Baghdad Blues","Melancholy Mood","How Did It Happen"],
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
    var albums = $('.rw_album_button');
    var modal = $('#trackModal');
    var active = null;
    var pointerInput = false;
    var moving = null;
    var motion = null;
    var coverMotion = null;
    var movingCover = null;
    var sourceCoverRect;
    var opening = false;
    var closing = false;
    var revealTimer;
    var inertState = [];
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

    var labelSerial = 0;

    // 사진 대신 파랑·흰색 종이 라벨을 만듦. 곡선 인쇄만 SVG로 처리함.
    // 200 단위 라벨 안에서 두 줄까지 들어갈 글자 크기를 계산함.
    var labelMeasure = document.createElement('canvas').getContext('2d');
    function labelFontSize(text, largest, height) {
        var words = text.toUpperCase().split(/\s+/);
        var size = largest;
        while (size > 4) {
            labelMeasure.font = size + 'px Arial';
            var lines = 1;
            var line = '';
            $.each(words, function(i, word) {
                var next = line ? line + ' ' + word : word;
                if (line && labelMeasure.measureText(next).width > 94) {
                    lines++;
                    line = word;
                } else {
                    line = next;
                }
            });
            var widestWord = Math.max.apply(null, words.map(function(word) { return labelMeasure.measureText(word).width; }));
            if (lines <= 2 && lines * size * 1.1 <= height && widestWord <= 94) break;
            size -= .2;
        }
        return (size / 2).toFixed(2) + 'cqw';
    }
    function makeLabel(item) {
        var key = 'rwLabelArc' + (++labelSerial);
        var label = $('<span class="rw_disc_label" lang="en">');
        label.html('<span class="rw_label_blue">BLUE</span><span class="rw_label_note">NOTE</span>' +
            '<svg class="rw_label_arc" viewBox="0 0 200 200" aria-hidden="true">' +
            '<defs><path id="' + key + '" d="M 58,40 C 104,3 183,35 178,140"/>' +
            '<path id="' + key + 'Inner" d="M 62,55 A 58,58 0 0,1 161,102"/></defs>' +
            '<text class="rw_label_micro" textLength="180" lengthAdjust="spacingAndGlyphs"><textPath href="#' + key + '" startOffset="1%">33⅓ MICROGROOVE LONG PLAYING</textPath></text>' +
            '<text class="rw_label_company"><textPath href="#' + key + 'Inner">BLUE NOTE RECORDS INC. · NEW YORK USA</textPath></text></svg>' +
            '<span class="rw_label_title"></span><span class="rw_label_artist"></span>' +
            '<span class="rw_label_catalog"></span><span class="rw_label_side">Side 1</span>' +
            '<span class="rw_label_tracks"></span><span class="rw_label_rim" aria-hidden="true"></span>');
        label.find('.rw_label_title').text(item.attr('data-title')).css('font-size', labelFontSize(item.attr('data-title'), 10.2, 18));
        label.find('.rw_label_artist').text(item.attr('data-artist')).css('font-size', labelFontSize(item.attr('data-artist'), 7, 12));
        label.find('.rw_label_catalog').text(item.attr('data-cat'));
        var names = trackLists[item.attr('data-title')] || [];
        $.each(names.slice(0, 3), function(i, name) {
            $('<span>').text((i + 1) + '. ' + name).appendTo(label.find('.rw_label_tracks'));
        });
        $('<span class="rw_label_credit">').text('BLUE NOTE RECORDS · ' + item.attr('data-year')).appendTo(label.find('.rw_label_tracks'));
        return label;
    }

    albums.each(function() {
        $(this).find('.rw_disc_label').replaceWith(makeLabel($(this)));
    });
    function fillAlbum() {
        if (!active) return;
        var item = $(active);
        var ko = $('html').attr('lang') === 'ko';
        var title = item.attr('data-title');
        var tracks = trackLists[title] || [];
        modal.find('.rw_album_title').text(title);
        modal.find('.rw_album_artist').text(item.attr('data-artist'));
        modal.find('.rw_album_year').text(item.attr('data-year'));
        modal.find('.rw_album_cat').text(item.attr('data-cat'));
        modal.find('.rw_selection_index').text('RECORD / ' + ('0' + (albums.index(active) + 1)).slice(-2) + ' OF ' + albums.length);
        modal.find('.rw_focus_cover').attr('src', item.attr('data-file')).attr('alt', title + (ko ? ' 앨범 커버' : ' album artwork'));
        modal.find('.rw_focus_disc .rw_disc_label').replaceWith(makeLabel(item));
        $.each(['pc', 'tablet', 'mobile'], function(i, size) {
            var prefix = size === 'tablet' ? 'data-description-' : 'data-description-' + size + '-';
            var en = item.attr(prefix + 'en');
            var kr = item.attr(prefix + 'ko');
            modal.find('.rw_detail_description_' + size).attr('data-en', en).attr('data-ko', kr).text(ko ? kr : en);
        });
        modal.find('.rw_album_count').text(('0' + tracks.length).slice(-2) + (ko ? '곡' : ' TRACKS'));
        modal.find('.rw_album_list').attr('aria-label', ko ? '수록곡 목록' : 'Album tracks').empty();
        $.each(tracks, function(index, name) {
            var row = $('<li>');
            $('<span aria-hidden="true">').text(('0' + (index + 1)).slice(-2)).appendTo(row);
            $('<span lang="en">').text(name).appendTo(row);
            row.appendTo(modal.find('.rw_album_list'));
        });
    }

    // 실제 진열 위치와 상세 위치의 차이만 transform으로 애니메이션함.
    function flyDisc(from, to, reverse, done) {
        var disc = reverse ? modal.find('.rw_focus_disc') : $(active).find('.rw_card_disc');
        var clone = disc.clone().removeClass('rw_card_disc rw_focus_disc').addClass('rw_moving_disc');
        // 이동용 복제본도 SVG 경로 ID를 따로 가져 중복 참조를 피함.
        clone.find('path[id]').each(function() {
            var oldId = this.id;
            var newId = oldId + 'Flight' + (++labelSerial);
            this.id = newId;
            clone.find('textPath').each(function() {
                if (this.getAttribute('href') === '#' + oldId) this.setAttribute('href', '#' + newId);
            });
        });
        clone.attr('aria-hidden', 'true').css({
            left: from.left, top: from.top, width: from.width, height: from.height
        }).appendTo('body');
        moving = clone;
        modal.find('.rw_focus_disc, .rw_focus_cover').css('visibility', 'hidden');
        if (reduced.matches || !clone[0].animate || from.width === 0 || to.width === 0) {
            clone.remove();
            moving = null;
            done();
            return;
        }
        flyCover(to, reverse);
        // 복귀 후반에는 커버 뒤로 숨겨 진열 앞에서 멈춰 보이지 않게 함.
        if (reverse) {
            clone[0].animate([
                { opacity: 1, offset: 0 },
                { opacity: 1, offset: .5 },
                { opacity: 0, offset: .88 },
                { opacity: 0, offset: 1 }
            ], { duration: 550, fill: 'forwards' });
        }
        motion = clone[0].animate([
            { transform: 'translate(0, 0) scale(1) rotate(0deg)' },
            { transform: 'translate(' + (to.left - from.left + (to.width - from.width) / 2) + 'px, ' + (to.top - from.top + (to.height - from.height) / 2) + 'px) scale(' + (to.width / from.width) + ') rotate(' + (reverse ? '-360' : '360') + 'deg)' }
        ], { duration: reverse ? 550 : 820, easing: reverse ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.2,.8,.2,1)', fill: 'forwards' });
        clone.css('transform-origin', 'center');
        motion.onfinish = function() {
            clearFlyingCover();
            clone.remove();
            moving = null;
            motion = null;
            done();
        };
    }

    function clearFlyingCover() {
        if (coverMotion) { coverMotion.cancel(); coverMotion = null; }
        if (movingCover) { movingCover.remove(); movingCover = null; }
    }

    // 커버도 처음부터 함께 이동하고, 도착 직전에 LP 뒤에서 아래로 빠져나옴.
    function flyCover(discTarget, reverse) {
        var cover = modal.find('.rw_focus_cover');
        var target = cover[0].getBoundingClientRect();
        var from = reverse ? target : sourceCoverRect;
        var to = reverse ? $(active).find('.rw_card_cover')[0].getBoundingClientRect() : target;
        var clone = cover.clone().removeClass('rw_focus_cover').addClass('rw_moving_cover');
        clone.css({ left: from.left, top: from.top, width: from.width, height: from.height, visibility: 'visible' }).appendTo('body');
        movingCover = clone;
        function pose(rect, rotation) {
            return 'translate(' + (rect.left - from.left + (rect.width - from.width) / 2) + 'px, ' +
                (rect.top - from.top + (rect.height - from.height) / 2) + 'px) scale(' + (rect.width / from.width) + ') rotate(' + rotation + 'deg)';
        }
        var frames;
        if (reverse) {
            frames = [{ transform: pose(from, 0), opacity: 1 }, { transform: pose(to, 0), opacity: 0 }];
        } else {
            var tucked = { left: discTarget.left + discTarget.width * .13, top: discTarget.top + discTarget.height * .28, width: to.width, height: to.height };
            frames = [
                { transform: pose(from, 0), offset: 0 },
                { transform: pose(tucked, -2), offset: .55 },
                { transform: pose(to, 0), offset: 1 }
            ];
        }
        coverMotion = clone[0].animate(frames, {
            duration: reverse ? 550 : 820,
            easing: reverse ? 'cubic-bezier(.4,0,.2,1)' : 'cubic-bezier(.2,.8,.2,1)',
            fill: 'forwards'
        });
    }
    function openAlbum(button) {
        if (active || opening || closing) return;
        active = button;
        opening = true;
        fillAlbum();
        var from = $(button).find('.rw_card_disc')[0].getBoundingClientRect();
        sourceCoverRect = $(button).find('.rw_card_cover')[0].getBoundingClientRect();
        $(button).attr('aria-expanded', 'true');
        inertState = [];
        $('#wrap, .top_move').each(function() {
            inertState.push({ node: this, value: this.inert });
            this.inert = true;
        });
        $('body').addClass('rw_record_open');
        modal.prop('hidden', false).scrollTop(0);
        modal[0].offsetWidth;
        modal.addClass('is_open');
        var to = modal.find('.rw_focus_disc')[0].getBoundingClientRect();
        modal.find('.rw_album_close')[0].focus({ preventScroll: true });
        flyDisc(from, to, false, function() {
            modal.find('.rw_focus_disc, .rw_focus_cover').css('visibility', '');
            opening = false;
        });
        revealTimer = setTimeout(function() { modal.addClass('is_revealed'); }, reduced.matches ? 0 : 420);
    }

    function finishClose() {
        modal.prop('hidden', true).removeClass('is_open is_revealed');
        modal.find('.rw_focus_disc, .rw_focus_cover').css('visibility', '');
        $('body').removeClass('rw_record_open');
        $.each(inertState, function(i, state) { state.node.inert = state.value; });
        $(active).attr('aria-expanded', 'false');
        $(active).toggleClass('rw_pointer_return', pointerInput);
        active.focus({ preventScroll: true });
        active = null;
        closing = false;
        opening = false;
    }

    function closeAlbum() {
        if (!active || closing) return;
        closing = true;
        clearTimeout(revealTimer);
        clearFlyingCover();
        if (motion) { motion.cancel(); motion = null; }
        if (moving) { moving.remove(); moving = null; }
        var from = modal.find('.rw_focus_disc')[0].getBoundingClientRect();
        var to = $(active).find('.rw_card_disc')[0].getBoundingClientRect();
        modal.removeClass('is_revealed is_open');
        flyDisc(from, to, true, finishClose);
    }

    $(document).on('pointerdown.rwWall', function() { pointerInput = true; });
    albums.on('click', function() { openAlbum(this); });
    modal.find('.rw_album_close').on('click', closeAlbum);
    modal.on('click', function(event) { if (event.target === this) closeAlbum(); });
    $(document).on('keydown.rwWall', function(event) {
        pointerInput = false;
        albums.removeClass('rw_pointer_return');
        if (!active) return;
        if (event.key === 'Escape') { event.preventDefault(); closeAlbum(); }
        if (event.key !== 'Tab') return;
        var first = modal.find('.rw_album_close')[0];
        var last = modal.find('.rw_album_list')[0];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault(); last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault(); first.focus();
        }
    });
    $('.language_button').on('click.rwWall', fillAlbum);
    $(window).on('resize.rwWall', function() {
        if (motion) {
            motion.finish();
        }
    });
});