// 메인과 VIDEOS 서브페이지에서 같은 영상 데이터 사용함
var blueNoteVideos = [
    {
        title: 'Norah Jones: Tiny Desk Concert',
        category: 'LIVE SESSION',
        descriptionLongEn: "An intimate performance featuring Norah Jones' warm vocals and soulful piano. Experience her timeless melodies in NPR's iconic Tiny Desk setting.",
        descriptionLongKo: '노라 존스의 따뜻한 목소리와 섬세한 피아노 연주가 어우러지는 특별한 무대. NPR Tiny Desk의 아늑한 공간에서 그녀의 음악을 가까이 만나보세요.',
        descriptionShortEn: "Norah Jones brings her soulful voice and piano to NPR's intimate Tiny Desk.",
        descriptionShortKo: 'NPR Tiny Desk에서 만나는 노라 존스의 따뜻한 목소리와 피아노 선율.',
        videoUrl: 'https://www.youtube.com/watch?v=6jYtRQ2tHGg'
    },
    {
        title: 'Donald Byrd — Black Byrd (Live at Montreux 1973)',
        category: 'ARCHIVE LIVE',
        descriptionLongEn: "Step back into 1973 with Donald Byrd's electrifying Montreux performance. Experience the irresistible fusion of jazz, funk, and soulful grooves that defined a new musical direction.",
        descriptionLongKo: '1973년 몽트뢰 무대에서 펼쳐진 도널드 버드의 강렬한 연주. 재즈와 펑크, 소울의 리듬이 만나 새로운 음악적 흐름을 만들어낸 순간을 경험해 보세요.',
        descriptionShortEn: 'A legendary 1973 performance blending jazz, funk, and irresistible grooves.',
        descriptionShortKo: '재즈와 펑크의 강렬한 그루브가 살아 있는 1973년 몽트뢰 공연.',
        videoUrl: 'https://www.youtube.com/watch?v=IMGfk83k9s4'
    },
    {
        title: 'Wayne Shorter Quartet — Smilin’ Through',
        category: 'LEGENDS LIVE',
        descriptionLongEn: "Enter the imaginative world of Wayne Shorter through an extraordinary quartet performance. Fluid improvisation and remarkable musical chemistry reveal the artistry of one of jazz's greatest innovators.",
        descriptionLongKo: '웨인 쇼터 쿼텟의 연주를 통해 끝없이 확장되는 재즈의 상상력을 만나보세요. 자유로운 즉흥연주와 멤버들 사이의 깊은 음악적 교감이 인상적인 무대입니다.',
        descriptionShortEn: "A captivating live performance showcasing Wayne Shorter's boundless musical imagination.",
        descriptionShortKo: '웨인 쇼터의 자유로운 음악적 상상력이 펼쳐지는 매혹적인 라이브 무대.',
        videoUrl: 'https://www.youtube.com/watch?v=GbZTPrndbMk'
    },
    {
        title: 'Julian Lage — Night Shade',
        category: 'LIVE PERFORMANCE',
        descriptionLongEn: 'Discover the inventive guitar work of Julian Lage in a performance full of energy and spontaneity. His expressive playing and dynamic interaction bring a fresh perspective to contemporary jazz.',
        descriptionLongKo: '줄리안 라쥬의 창의적인 기타 연주와 자유로운 음악적 표현을 만나보세요. 섬세하면서도 역동적인 앙상블을 통해 현대 재즈의 새로운 가능성을 보여줍니다.',
        descriptionShortEn: 'Inventive guitar work and dynamic interplay pushing the boundaries of modern jazz.',
        descriptionShortKo: '창의적인 기타 연주와 역동적인 앙상블로 현대 재즈의 경계를 넓히는 무대.',
        videoUrl: 'https://www.youtube.com/watch?v=sTnpqVbla50'
    },
    {
        title: 'Blue Note Records: Beyond The Notes',
        category: 'DOCUMENTARY',
        descriptionLongEn: "Go behind the music and explore the remarkable legacy of Blue Note Records. Through the voices of its artists, discover the creative freedom and artistic vision that shaped the label's history.",
        descriptionLongKo: '블루노트 레코드의 음악 뒤에 숨겨진 이야기들을 만나보세요. 아티스트들의 목소리를 통해 레이블의 역사를 만들어온 창작의 자유와 음악적 철학을 살펴봅니다.',
        descriptionShortEn: 'An intimate look at the artists, stories, and creative spirit behind Blue Note Records.',
        descriptionShortKo: '블루노트의 역사를 만들어온 아티스트들과 음악에 담긴 창작의 정신을 조명합니다.',
        videoUrl: 'https://www.youtube.com/watch?v=8NLVfptBURs'
    },
    {
        title: 'Blue Note At 75: McCoy Tyner & Bobby Hutcherson',
        category: 'LEGENDS LIVE',
        descriptionLongEn: "Celebrate Blue Note's 75th anniversary through a remarkable collaboration between McCoy Tyner and Bobby Hutcherson. Two legendary musicians share their mastery and deep musical connection on stage.",
        descriptionLongKo: '블루노트 75주년을 기념하는 맥코이 타이너와 바비 허처슨의 특별한 협연. 두 재즈 거장의 뛰어난 연주와 깊은 음악적 교감을 느낄 수 있는 무대입니다.',
        descriptionShortEn: "Two jazz legends come together in a celebration of Blue Note's musical legacy.",
        descriptionShortKo: '블루노트의 음악적 유산을 기념하며 두 재즈 거장이 선보이는 특별한 협연.',
        videoUrl: 'https://www.youtube.com/watch?v=nMYqiTqcZNc'
    },
    {
        title: 'Gregory Porter — Hey Laura (Live at the Royal Albert Hall)',
        category: 'LIVE PERFORMANCE',
        descriptionLongEn: "Experience Gregory Porter's rich, soulful voice in a moving performance at London's Royal Albert Hall. His heartfelt delivery and expressive storytelling bring every lyric to life.",
        descriptionLongKo: '런던 로열 앨버트 홀에서 펼쳐지는 그레고리 포터의 감동적인 라이브. 깊고 풍부한 목소리와 진솔한 표현으로 노래에 담긴 이야기를 생생하게 전합니다.',
        descriptionShortEn: "Gregory Porter's rich, soulful voice fills London's Royal Albert Hall with emotion.",
        descriptionShortKo: '런던 로열 앨버트 홀을 가득 채운 그레고리 포터의 깊고 소울풀한 목소리.',
        videoUrl: 'https://www.youtube.com/watch?v=59lgtgB2LAQ'
    },
    {
        title: 'Immanuel Wilkins Quartet — CHARANAM',
        category: 'CONTEMPORARY JAZZ',
        descriptionLongEn: 'Explore the expressive world of Immanuel Wilkins and his quartet. Rooted in jazz tradition yet open to new possibilities, their performance blends spiritual depth with bold contemporary ideas.',
        descriptionLongKo: '이마누엘 윌킨스 쿼텟이 선보이는 깊이 있고 창의적인 현대 재즈. 전통에 뿌리를 두면서도 새로운 표현을 탐구하며 재즈의 가능성을 확장합니다.',
        descriptionShortEn: 'A powerful performance bringing fresh expression to the spiritual roots of jazz.',
        descriptionShortKo: '재즈의 영적인 전통을 새로운 감각으로 풀어낸 이마누엘 윌킨스 쿼텟의 연주.',
        videoUrl: 'https://www.youtube.com/watch?v=0aU3cb7i3_I'
    }
];
