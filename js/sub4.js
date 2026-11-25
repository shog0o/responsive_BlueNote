/* 플레이리스트 선택과 Spotify 재생 상태를 처리함 */
$(document).ready(function() {
    // 각 플레이리스트의 외부 링크를 여기에 넣음. Spotify는 전체 주소를 사용함
    var playlists = [
        {
            title: 'BLUE NOTE: CLASSIC HITS',
            cover: './images/main/playlist/playlist_01.jpg',
            descriptionEn: 'The recordings that made Blue Note a name synonymous with jazz. From unforgettable melodies to groundbreaking improvisations, these timeless classics capture the spirit of an era whose influence can still be heard today.',
            descriptionKo: "블루노트라는 이름을 재즈의 상징으로 만든 음악들입니다. 오랫동안 사랑받아 온 멜로디와 시대를 앞서간 즉흥연주에는 오늘날까지 이어지는 재즈의 깊은 매력이 담겨 있습니다.",
            subtitleEn: "THE SOUND THAT DEFINED AN ERA.",
            subtitleKo: "한 시대를 빛낸 사운드.",
            tabletEn: "The timeless recordings that defined Blue Note. Unforgettable melodies and groundbreaking improvisations capture the spirit of jazz\u0027s golden years.",
            tabletKo: "블루노트의 전성기를 빛낸 명연주들입니다. 잊을 수 없는 멜로디와 자유로운 즉흥연주 속에서 재즈의 깊은 매력을 느낄 수 있습니다.",
            mobileEn: "Timeless recordings that capture the unmistakable sound of Blue Note.",
            mobileKo: "블루노트만의 사운드를 만들어 온 시대의 명곡들.",
            spotifyUrl: 'https://open.spotify.com/playlist/03v08073YFtriJYto8uO1K',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeR-imfsTqEfKQ3ALVIPqbAe'
        },
        {
            title: 'HARD BOP',
            cover: './images/main/playlist/playlist_02.jpg',
            descriptionEn: 'Feel the vibrant energy of hard bop, where bebop meets the soulful spirit of blues and gospel. Discover powerful rhythms, bold improvisations, and unforgettable grooves.',
            descriptionKo: "블루스와 가스펠의 감성을 품은 하드밥은 재즈에 새로운 활력을 불어넣었습니다. 힘 있는 리듬과 자유로운 즉흥연주, 짙은 소울이 어우러진 블루노트의 가장 뜨거웠던 시절을 만나보세요.",
            subtitleEn: "WHERE JAZZ MEETS THE SOUL.",
            subtitleKo: "재즈에 깃든 소울.",
            tabletEn: "Rooted in blues and gospel, hard bop combines powerful rhythms with soulful melodies and fearless improvisation.",
            tabletKo: "블루스와 가스펠의 감성에 힘 있는 리듬과 자유로운 즉흥연주가 더해진 음악. 하드밥의 생동감 넘치는 매력을 담았습니다.",
            mobileEn: "Blues, gospel, and powerful grooves capture the soul of hard bop.",
            mobileKo: "블루스의 감성과 강렬한 그루브가 살아 있는 하드밥.",
            spotifyUrl: 'https://open.spotify.com/playlist/2CRiMisrl0oBZW3jzDRjKE',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeReL7wLTF4VGfARQeMDhY8G'
        },
        {
            title: 'JAZZ VOCALS',
            cover: './images/main/playlist/playlist_03.jpg',
            descriptionEn: "Discover the expressive voices that bring jazz to life, from intimate ballads to soulful performances. Experience the warmth, emotion, and storytelling of Blue Note's finest vocalists.",
            descriptionKo: "익숙한 멜로디도 누구의 목소리로 부르느냐에 따라 전혀 다른 이야기가 됩니다. 담백한 발라드부터 깊은 소울이 느껴지는 노래까지, 저마다의 방식으로 감정을 전하는 재즈 보컬의 매력을 담았습니다.",
            subtitleEn: "THE ART OF THE HUMAN VOICE.",
            subtitleKo: "목소리라는 악기.",
            tabletEn: "From intimate ballads to soulful interpretations, every voice brings its own character and emotion to the music.",
            tabletKo: "담백한 발라드부터 소울 가득한 노래까지. 저마다의 목소리로 음악에 새로운 감정을 더하는 재즈 보컬을 만나보세요.",
            mobileEn: "Intimate melodies and soulful voices bring jazz to life.",
            mobileKo: "저마다의 목소리로 전하는 재즈의 깊은 감성.",
            spotifyUrl: 'https://open.spotify.com/playlist/7jv9jGyaZfAx6DGn3NLqCg',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeS5NzTRvGaXfUM2SIiCaS3V'
        },
        {
            title: 'MOST SAMPLED',
            cover: './images/main/playlist/playlist_04.jpg',
            descriptionEn: 'Trace the connection between jazz and hip-hop through the iconic recordings of Blue Note. Discover the original grooves, rhythms, and melodies that inspired generations of producers and artists.',
            descriptionKo: "수십 년 전 블루노트의 음반에 담겼던 소리는 힙합을 통해 다시 태어났습니다. 인상적인 베이스라인과 리듬, 짧은 멜로디가 새로운 음악의 출발점이 되며 서로 다른 세대와 장르를 연결합니다.",
            subtitleEn: "OLD RECORDS. NEW RHYTHMS.",
            subtitleKo: "오래된 음반, 새로운 리듬.",
            tabletEn: "Blue Note\u0027s classic grooves and melodies found new life in hip-hop, connecting the sounds of the past with a new generation of music.",
            tabletKo: "블루노트의 오래된 음반은 힙합을 통해 새로운 생명력을 얻었습니다. 시대를 넘어 새로운 음악의 영감이 된 재즈를 만나보세요.",
            mobileEn: "Classic jazz grooves that found new life in hip-hop.",
            mobileKo: "힙합의 새로운 리듬으로 다시 태어난 재즈.",
            spotifyUrl: 'https://open.spotify.com/playlist/5hue1esB56zWscmaoubpwW',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeRB1uX-OEBdErd-B4NnIvOh'
        },
        {
            title: 'CALM',
            cover: './images/main/playlist/playlist_05.jpg',
            descriptionEn: 'Slow down and unwind with gentle jazz melodies and beautifully understated ballads. A soothing selection of Blue Note recordings for quiet evenings and peaceful moments.',
            descriptionKo: "빠른 연주와 화려한 기교만이 재즈의 매력은 아닙니다. 부드러운 피아노 선율과 따뜻한 화성, 여유로운 리듬 사이로 음악이 남기는 고요한 여운을 느껴보세요.",
            subtitleEn: "THE BEAUTY OF QUIET MOMENTS.",
            subtitleKo: "고요한 순간의 아름다움.",
            tabletEn: "Gentle melodies, warm harmonies, and relaxed rhythms reveal the quieter side of jazz, offering a moment of stillness.",
            tabletKo: "부드러운 선율과 따뜻한 화성, 여유로운 리듬이 어우러진 음악입니다. 일상의 속도를 잠시 늦추고 재즈의 잔잔한 매력을 느껴보세요.",
            mobileEn: "Gentle melodies and warm harmonies for life\u0027s quieter moments.",
            mobileKo: "일상의 고요한 순간을 채워주는 부드러운 재즈 선율.",
            spotifyUrl: 'https://open.spotify.com/playlist/52ut8xLsAA0VvSg5NFDYFW',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeQE-hK0UDerIRCXXse1tpdE'
        },
        {
            title: 'JAZZ NOW!',
            cover: './images/main/playlist/playlist_06.jpg',
            descriptionEn: "Experience the evolving sound of jazz through today's most creative voices. From fresh interpretations to boundary-pushing experiments, discover the artists shaping the future of the genre.",
            descriptionKo: "재즈는 여전히 새로운 모습으로 변화하고 있습니다. 전통에 뿌리를 두면서도 다양한 장르와 감각을 받아들이는 새로운 세대의 음악가들. 그들의 음악 속에서 오늘날의 블루노트를 만날 수 있습니다.",
            subtitleEn: "THE SOUND OF A NEW GENERATION.",
            subtitleKo: "새로운 세대의 재즈.",
            tabletEn: "A new generation of musicians blends jazz traditions with contemporary influences, creating fresh sounds and new possibilities.",
            tabletKo: "재즈의 전통에 현대적인 감각을 더하는 새로운 세대의 음악가들. 그들이 만들어가는 오늘날의 재즈를 만나보세요.",
            mobileEn: "New voices and fresh perspectives shaping the sound of jazz today.",
            mobileKo: "새로운 감각으로 오늘의 재즈를 만들어가는 음악가들.",
            spotifyUrl: 'https://open.spotify.com/playlist/5fYeyEuW0Z6K7plbxAvji7',
            youtubeUrl: 'https://www.youtube.com/playlist?list=PLEz_mLoNZMeRK4KBCSmMs77kCkkLNl0lo'
        }
    ];
    var currentIndex = 0;
    var spotifyApi;
    var player;
    var creatingPlayer = false;
    var loadedUrl = '';
    var playing = false;

    var equalizerBars = $('.listen_equalizer_bar');

    // 양끝의 메인 컬러가 중앙의 point 01로 점차 바뀌도록 함
    equalizerBars.each(function(index) {
        var mix = Math.min(index, equalizerBars.length - 1 - index) / Math.floor((equalizerBars.length - 1) / 2) * 100;
        this.style.setProperty('--bar-mix', mix + '%');
        $(this).css({

            'animation-duration': (1.8 + (index % 7) * .18) + 's',
            'animation-delay': -(index * .31) + 's'
        });
    });
    // 샘플의 LOADING 대신 제목을 한 글자씩 막대 위에 표시함
    function setEqualizerTitle(title) {
        $('.listen_equalizer_title').text(title);
        equalizerBars.removeAttr('data-letter');
        var start = Math.floor((equalizerBars.length - title.length) / 2);
        for (var i = 0; i < title.length; i++) {
            equalizerBars.eq(start + i).attr('data-letter', title.charAt(i));
        }
    }

    // 재생 중에만 움직이며 정지 상태에서는 CSS 기본 높이로 맞춤
    function updatePlayback(isPlaying) {
        playing = isPlaying;
        $('.listen_visualizer').toggleClass('is_playing', isPlaying);
    }
    $(window).on('pagehide', function() { updatePlayback(false); });
    // 링크가 없는 버튼은 이동하지 않음. 주소를 넣으면 정상 링크로 바뀜
    function updateLink(selector, url) {
        var link = $(selector);
        if (url) {
            link.attr('href', url).removeAttr('aria-disabled tabindex');
        } else {
            link.removeAttr('href').attr('aria-disabled', 'true').attr('tabindex', '-1');
        }
    }

    var readingTop = $(window).scrollTop();
    var lastScrollInput = 0;
    var scrollGuardUntil = 0;
    var readingTimer;

    // 직접 스크롤하거나 버튼을 누른 경우에는 위치 보정을 해제함
    $(window).on('wheel touchstart touchmove pointerdown keydown', function() {
        lastScrollInput = Date.now();
        scrollGuardUntil = 0;
    });
    $(window).on('scroll', function() {
        clearTimeout(readingTimer);
        if (Date.now() < scrollGuardUntil) {
            if (Math.abs($(window).scrollTop() - readingTop) > 1) window.scrollTo(0, readingTop);
            return;
        }
        // 곡 전환으로 발생한 이동인지 확인할 시간을 둔 뒤 읽던 위치를 저장함
        readingTimer = setTimeout(function() { readingTop = $(window).scrollTop(); }, 200);
    });
    $(window).on('resize', function() {
        scrollGuardUntil = 0;
        readingTop = $(window).scrollTop();
    });

    // 화면 밖의 Spotify가 다음 곡으로 넘어갈 때 페이지가 따라가지 않도록 함
    function keepReadingPosition() {
        var frame = $('.listen_player iframe');
        if (!frame.length || Date.now() - lastScrollInput < 1000) return;
        var top = frame.offset().top;
        var bottom = top + frame.outerHeight();
        if (bottom > readingTop && top < readingTop + $(window).height()) return;
        clearTimeout(readingTimer);
        scrollGuardUntil = Date.now() + 500;
        if (document.activeElement === frame[0]) frame[0].blur();
        window.scrollTo(0, readingTop);
    }
    function setPlayerTitle() {
        $('.listen_player iframe').attr('title', playlists[currentIndex].title + ' — Spotify player');
    }

    // 플레이어는 한 개만 만들고 선택할 때 콘텐츠만 교체함
    function loadPlaylist() {
        var url = playlists[currentIndex].spotifyUrl;
        if (!url) {
            if (player) player.pause();
            loadedUrl = '';
            $('.listen_player').prop('hidden', true);
            $('.listen_player_empty').prop('hidden', false);
            updatePlayback(false);
            return;
        }
        if (!spotifyApi || creatingPlayer) return;
        $('.listen_player').prop('hidden', false);
        $('.listen_player_empty').prop('hidden', true);
        if (player) {
            if (loadedUrl !== url) {
                player.pause();
                updatePlayback(false);
                loadedUrl = url;
                player.loadEntity(url);
            }
            setPlayerTitle();
            return;
        }
        creatingPlayer = true;
        spotifyApi.createController(document.getElementById('spotifyPlayer'), {
            url: url,
            width: '100%',
            height: 367
        }, function(controller) {
            player = controller;
            loadedUrl = url;
            creatingPlayer = false;
            player.addListener('playback_started', keepReadingPosition);
            player.addListener('playback_update', function(event) {
                var state = event.data;
                var selectedUrl = playlists[currentIndex].spotifyUrl;
                // 짧은 버퍼링에는 멈추지 않고 재생·일시정지 상태만 반영함
                updatePlayback(Boolean(selectedUrl) && !state.isPaused);
            });
            player.addListener('ready', setPlayerTitle);
            setPlayerTitle();
            // 로딩 중 다른 플레이리스트를 눌렀다면 마지막 선택을 반영함
            loadPlaylist();
        });
    }

    // 언어 전환용 영문과 한글을 함께 갱신함
    function setPlaylistText(selector, en, ko) {
        $(selector).attr('data-en', en).attr('data-ko', ko)
            .text($('html').attr('lang') === 'ko' ? ko : en);
    }
    function selectPlaylist(index) {
        currentIndex = index;
        var item = playlists[index];
        $('.listen_choice').removeClass('active').attr('aria-pressed', 'false')
            .eq(index).addClass('active').attr('aria-pressed', 'true');
        $('.listen_cover').attr('src', item.cover)
            .attr('data-en-alt', item.title + ' playlist cover')
            .attr('data-ko-alt', item.title + ' 플레이리스트 커버')
            .attr('alt', $('html').attr('lang') === 'ko' ? item.title + ' 플레이리스트 커버' : item.title + ' playlist cover');
        $('.listen_title').text(item.title);
        setEqualizerTitle(item.title);
        $('.listen_number').text(('0' + (index + 1)).slice(-2) + ' / 06');
        setPlaylistText('.listen_subtitle', item.subtitleEn, item.subtitleKo);
        setPlaylistText('.listen_description_pc', item.descriptionEn, item.descriptionKo);
        setPlaylistText('.listen_description_tablet', item.tabletEn, item.tabletKo);
        setPlaylistText('.listen_description_mobile', item.mobileEn, item.mobileKo);
        $('.listen_station').text('NOW LISTENING / ' + ('0' + (index + 1)).slice(-2));
        $('.listen_footer_title').text(item.title.replace('BLUE NOTE: ', ''));
        updateLink('.listen_spotify', item.spotifyUrl);
        updateLink('.listen_youtube', item.youtubeUrl);
        updatePlayback(false);
        loadPlaylist();
    }

    $('.listen_choice').on('click', function() {
        var index = $('.listen_choice').index(this);
        if (index !== currentIndex) selectPlaylist(index);
    });
    $('.listen_services').on('click', 'a[aria-disabled="true"]', function(event) {
        event.preventDefault();
    });
    $('.language_button').on('click', function() { updatePlayback(playing); });

    // 공식 API가 준비되면 현재 선택을 플레이어에 연결함
    window.onSpotifyIframeApiReady = function(api) {
        spotifyApi = api;
        loadPlaylist();
    };
    selectPlaylist(0);
    // 콜백과 화면을 준비한 다음 공식 API를 불러옴
    var apiScript = document.createElement('script');
    apiScript.src = 'https://open.spotify.com/embed/iframe-api/v1';
    apiScript.async = true;
    apiScript.onerror = function() {
        $('.listen_player').prop('hidden', true);
        $('.listen_player_empty').prop('hidden', false);
        updatePlayback(false);
    };
    document.body.appendChild(apiScript);
});
