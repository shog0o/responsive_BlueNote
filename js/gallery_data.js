// 제공받은 갤러리 설명을 파일명으로 관리함. 확장자는 제외함.
var galleryDescriptions = {
    "gall_01":  {
                    "en":  "Lou Donaldson, known as Sweet Poppa Lou, holding his saxophone on stage",
                    "ko":  "스위트 파파 루라는 애칭으로 불리는 색소포니스트 루 도널드슨의 무대 위 모습"
                },
    "gall_02":  {
                    "en":  "Horace Silver receiving an award from Blue Note Records commemorating a decade with the label",
                    "ko":  "블루노트 레코드에서의 10년간의 활동을 기념하는 공로상을 수상하는 호레이스 실버"
                },
    "gall_03":  {
                    "en":  "A still from Norah Jones\u0027 Staring at the Wall music video",
                    "ko":  "노라 존스의 Staring at the Wall 뮤직비디오 스틸컷"
                },
    "gall_04":  {
                    "en":  "Album cover of Dexter Gordon\u0027s Go!",
                    "ko":  "덱스터 고든의 Go! 앨범 커버"
                },
    "gall_05":  {
                    "en":  "Herbie Hancock at Rudy Van Gelder Studio on 24 December 1964",
                    "ko":  "1964년 12월 24일, 루디 반 겔더 스튜디오에서 촬영한 허비 행콕"
                },
    "gall_06":  {
                    "en":  "Hank Mobley and Alfred Lion during the Soul Station recording session",
                    "ko":  "Soul Station 녹음 세션에서 함께한 행크 모블리와 알프레드 라이언"
                },
    "gall_07":  {
                    "en":  "Maya Delilah leaning against a pool table in promotional artwork for Been Here Before",
                    "ko":  "Been Here Before 홍보 이미지 속 당구대에 기대어 있는 마야 딜라일라"
                },
    "gall_08":  {
                    "en":  "Paul Chambers playing double bass at Van Gelder Studio in 1957",
                    "ko":  "1957년 반 겔더 스튜디오에서 더블베이스를 연주하는 폴 챔버스"
                },
    "gall_09":  {
                    "en":  "Cover of Blue Note: Uncompromising Expression, an illustrated history of the label",
                    "ko":  "블루노트 레코드의 역사를 담은 화보집 Blue Note: Uncompromising Expression의 표지"
                },
    "gall_10":  {
                    "en":  "A black-and-white portrait of jazz saxophonist and composer Wayne Shorter",
                    "ko":  "재즈 색소포니스트이자 작곡가인 웨인 쇼터의 흑백 초상"
                },
    "gall_11":  {
                    "en":  "Albert Ammons and Meade Lux Lewis at Blue Note Records\u0027 historic first recording session on 6 January 1939",
                    "ko":  "1939년 1월 6일, 블루노트 레코드의 역사적인 첫 녹음 세션에 참여한 앨버트 암몬스와 미드 럭스 루이스"
                },
    "gall_12":  {
                    "en":  "Album cover of Sonny Clark\u0027s Cool Struttin\u0027",
                    "ko":  "소니 클라크의 Cool Struttin\u0027 앨범 커버"
                },
    "gall_13":  {
                    "en":  "Grant Green playing his electric guitar in a black-and-white photograph",
                    "ko":  "일렉트릭 기타를 연주하는 그랜트 그린의 흑백 사진"
                },
    "gall_14":  {
                    "en":  "A Wayne Shorter vinyl record spinning on a turntable",
                    "ko":  "턴테이블 위에서 재생되는 웨인 쇼터의 바이닐 레코드"
                },
    "gall_15":  {
                    "en":  "Gregory Porter beside a swimming pool in artwork for his 2020 album All Rise",
                    "ko":  "그레고리 포터의 2020년 앨범 All Rise 아트워크 속 수영장을 배경으로 한 모습"
                },
    "gall_16":  {
                    "en":  "A close-up of jazz bassist Ron Carter playing his double bass",
                    "ko":  "더블베이스를 연주하는 재즈 베이시스트 론 카터의 클로즈업"
                },
    "gall_17":  {
                    "en":  "Miles Davis playing the trumpet in a sleeveless shirt",
                    "ko":  "민소매 차림으로 트럼펫을 연주하는 마일스 데이비스"
                },
    "gall_18":  {
                    "en":  "Freddie Hubbard playing the trumpet in a formal suit",
                    "ko":  "정장 차림으로 트럼펫을 연주하는 프레디 허바드"
                },
    "gall_19":  {
                    "en":  "Sonny Clark seated at a grand piano at Bell Sound Studios in January 1960",
                    "ko":  "1960년 1월, 벨 사운드 스튜디오에서 그랜드 피아노 앞에 앉은 소니 클라크"
                },
    "gall_20":  {
                    "en":  "Alfred Lion at the Blue Note Records office in New York in October 1956",
                    "ko":  "1956년 10월, 뉴욕 블루노트 레코드 사무실의 알프레드 라이언"
                },
    "gall_21":  {
                    "en":  "Art Blakey playing drums beneath a large cymbal",
                    "ko":  "커다란 심벌 아래에서 드럼을 연주하는 아트 블레이키"
                },
    "gall_22":  {
                    "en":  "Hank Mobley during a 1957 Blue Note recording session, photographed by Francis Wolff",
                    "ko":  "1957년 블루노트 녹음 세션에서 프랜시스 울프가 촬영한 행크 모블리"
                },
    "gall_23":  {
                    "en":  "Album cover of Herbie Hancock\u0027s Maiden Voyage",
                    "ko":  "허비 행콕의 Maiden Voyage 앨범 커버"
                },
    "gall_24":  {
                    "en":  "Herbie Hancock at Rudy Van Gelder Studio on 24 December 1964",
                    "ko":  "1964년 12월 24일, 루디 반 겔더 스튜디오에서 촬영한 허비 행콕"
                },
    "gall_26":  {
                    "en":  "Thelonious Monk in a 1957 photograph by Lee Friedlander",
                    "ko":  "1957년 사진작가 리 프리랜들러가 촬영한 텔로니어스 몽크"
                },
    "gall_27":  {
                    "en":  "Art Blakey playing drums with a cigarette, photographed by Francis Wolff",
                    "ko":  "담배를 문 채 드럼을 연주하는 아트 블레이키, 프랜시스 울프 촬영"
                },
    "gall_28":  {
                    "en":  "Album cover of Blue Note China\u0027s Now\u0027s The Time: An Anthology Of Contemporary Chinese Jazz, Vol. 1",
                    "ko":  "블루노트 차이나의 현대 중국 재즈 컴필레이션 Now\u0027s The Time, Vol. 1 앨범 커버"
                },
    "gall_29":  {
                    "en":  "Album cover of Blue Note China\u0027s Now\u0027s The Time: An Anthology Of Contemporary Chinese Jazz, Vol. 1",
                    "ko":  "블루노트 차이나의 현대 중국 재즈 컴필레이션 Now\u0027s The Time, Vol. 1 앨범 커버"
                },
    "gall_30":  {
                    "en":  "Maya Delilah leaning against a pool table in promotional artwork for Been Here Before",
                    "ko":  "Been Here Before 홍보 이미지 속 당구대에 기대어 있는 마야 딜라일라"
                },
    "gall_31":  {
                    "en":  "Album cover of Miles Davis\u0027 Volume 1",
                    "ko":  "마일스 데이비스의 Volume 1 앨범 커버"
                },
    "gall_32":  {
                    "en":  "Album cover of John Coltrane\u0027s Blue Train",
                    "ko":  "존 콜트레인의 Blue Train 앨범 커버"
                },
    "gall_33":  {
                    "en":  "Album cover of Cannonball Adderley\u0027s Somethin\u0027 Else",
                    "ko":  "캐논볼 애덜리의 Somethin\u0027 Else 앨범 커버"
                },
    "gall_34":  {
                    "en":  "Album cover of Bud Powell\u0027s Time Waits",
                    "ko":  "버드 파웰의 Time Waits 앨범 커버"
                },
    "gall_35":  {
                    "en":  "Album cover of Art Blakey \u0026 The Jazz Messengers\u0027 Moanin\u0027",
                    "ko":  "아트 블레이키 앤 더 재즈 메신저스의 Moanin\u0027 앨범 커버"
                },
    "gall_36":  {
                    "en":  "Album cover of Freddie Hubbard\u0027s Hub-Tones",
                    "ko":  "프레디 허바드의 Hub-Tones 앨범 커버"
                },
    "gall_37":  {
                    "en":  "Album cover of Lee Morgan\u0027s The Sidewinder",
                    "ko":  "리 모건의 The Sidewinder 앨범 커버"
                },
    "gall_38":  {
                    "en":  "Album cover of Eric Dolphy\u0027s Out to Lunch!",
                    "ko":  "에릭 돌피의 Out to Lunch! 앨범 커버"
                },
    "gall_39":  {
                    "en":  "Album cover of Thelonious Monk\u0027s Genius of Modern Music, Volume 1",
                    "ko":  "텔로니어스 몽크의 Genius of Modern Music, Volume 1 앨범 커버"
                },
    "gall_40":  {
                    "en":  "Bebop pioneer Bud Powell playing the piano",
                    "ko":  "피아노를 연주하는 비밥 재즈의 선구자 버드 파웰"
                },
    "gall_41":  {
                    "en":  "Dexter Gordon, known as Long Tall Dex, smiling beside his tenor saxophone",
                    "ko":  "롱 톨 덱스라는 애칭으로 불리는 덱스터 고든이 테너 색소폰 옆에서 미소 짓는 모습"
                },
    "gall_42":  {
                    "en":  "Horace Silver during the Horace Silver and the Jazz Messengers recording session in 1954",
                    "ko":  "1954년 Horace Silver and the Jazz Messengers 녹음 세션에서의 호레이스 실버"
                },
    "gall_43":  {
                    "en":  "Wynton Marsalis practising the trumpet backstage at Salle Pleyel in Paris in 1983",
                    "ko":  "1983년 파리 살 플레옐 공연을 앞두고 대기실에서 트럼펫을 연습하는 윈튼 마살리스"
                },
    "gall_44":  {
                    "en":  "Dizzy Gillespie explaining bebop notation on a blackboard in New York in 1947",
                    "ko":  "1947년 뉴욕에서 칠판에 비밥 악보를 작성하며 설명하는 디지 길레스피"
                },
    "gall_45":  {
                    "en":  "Jazz drummer Brian Blade playing the drums while wearing glasses",
                    "ko":  "안경을 쓰고 드럼을 연주하는 재즈 드러머 브라이언 블레이드"
                },
    "gall_46":  {
                    "en":  "Herbie Hancock performing with electric keyboards and synthesisers in the 1970s",
                    "ko":  "1970년대 무대에서 전자 피아노와 신디사이저를 연주하는 허비 행콕"
                },
    "gall_47":  {
                    "en":  "Recording engineer Rudy Van Gelder and Blue Note co-founder Alfred Lion in the studio",
                    "ko":  "녹음 스튜디오의 엔지니어 루디 반 겔더와 블루노트 공동 설립자 알프레드 라이언"
                },
    "gall_48":  {
                    "en":  "Art Blakey smiling as he plays the drums",
                    "ko":  "환하게 미소 지으며 드럼을 연주하는 아트 블레이키"
                },
    "gall_49":  {
                    "en":  "Hank Mobley framed by a circular structure for his 1963 album No Room for Squares",
                    "ko":  "1963년 앨범 No Room for Squares의 원형 구조물 사이로 보이는 행크 모블리"
                },
    "gall_50":  {
                    "en":  "Wayne Shorter sitting on a suitcase on a New York street at night in 1965",
                    "ko":  "1965년 뉴욕의 밤거리에서 여행 가방 위에 앉아 있는 웨인 쇼터"
                },
    "gall_51":  {
                    "en":  "Art Blakey playing drums with a cigarette, photographed by Francis Wolff",
                    "ko":  "담배를 문 채 드럼을 연주하는 아트 블레이키, 프랜시스 울프 촬영"
                },
    "gall_52":  {
                    "en":  "Album cover of Gregory Porter\u0027s Liquid Spirit",
                    "ko":  "그레고리 포터의 Liquid Spirit 앨범 커버"
                },
    "gall_53":  {
                    "en":  "Gregory Porter wearing a black dinner jacket and his signature flat cap",
                    "ko":  "검은색 턱시도와 특유의 플랫캡을 착용한 그레고리 포터"
                },
    "gall_54":  {
                    "en":  "Herbie Hancock looking back while seated at the piano",
                    "ko":  "피아노 앞에 앉아 뒤를 돌아보는 허비 행콕"
                },
    "gall_55":  {
                    "en":  "Hard bop pioneer Horace Silver smiling at the piano",
                    "ko":  "피아노 앞에서 미소 짓는 하드밥 재즈의 선구자 호레이스 실버"
                },
    "gall_56":  {
                    "en":  "Joe Henderson wearing glasses and playing the tenor saxophone",
                    "ko":  "안경을 쓰고 테너 색소폰을 연주하는 조 헨더슨"
                },
    "gall_57":  {
                    "en":  "Jazz guitarist Kenny Burrell seated with his guitar",
                    "ko":  "기타를 들고 앉아 있는 재즈 기타리스트 케니 버렐"
                },
    "gall_58":  {
                    "en":  "Lee Morgan playing the trumpet with his eyes closed",
                    "ko":  "눈을 감고 트럼펫 연주에 몰입한 리 모건"
                },
    "gall_59":  {
                    "en":  "Miles Davis playing the trumpet during a Blue Note recording session in March 1954",
                    "ko":  "1954년 3월, 블루노트 녹음 세션에서 트럼펫을 연주하는 마일스 데이비스"
                },
    "gall_60":  {
                    "en":  "Album cover of Norah Jones\u0027 Come Away with Me",
                    "ko":  "노라 존스의 Come Away with Me 앨범 커버"
                },
    "gall_61":  {
                    "en":  "Norah Jones smiling as she sings at the piano",
                    "ko":  "피아노 앞에서 미소 지으며 노래하는 노라 존스"
                },
    "gall_62":  {
                    "en":  "Jazz bassist Paul Chambers playing the double bass",
                    "ko":  "더블베이스를 연주하는 재즈 베이시스트 폴 챔버스"
                },
    "gall_63":  {
                    "en":  "Robert Glasper framing his face with both hands",
                    "ko":  "양손으로 얼굴 주변에 프레임을 만든 로버트 글래스퍼"
                },
    "gall_64":  {
                    "en":  "A black-and-white portrait of Blue Note co-founders Alfred Lion and Francis Wolff",
                    "ko":  "블루노트 공동 설립자 알프레드 라이언과 프랜시스 울프의 흑백 기념사진"
                },
    "gall_65":  {
                    "en":  "A portrait of Francis Wolff, Blue Note co-founder and jazz photographer",
                    "ko":  "블루노트 공동 설립자이자 재즈 사진작가인 프랜시스 울프의 초상"
                },
    "gall_66":  {
                    "en":  "Art Blakey smiling as he plays the drums",
                    "ko":  "환하게 미소 지으며 드럼을 연주하는 아트 블레이키"
                },
    "gall_67":  {
                    "en":  "Paul Chambers playing double bass at Van Gelder Studio in 1957",
                    "ko":  "1957년 반 겔더 스튜디오에서 더블베이스를 연주하는 폴 챔버스"
                },
    "gall_68":  {
                    "en":  "Donald Byrd holding his trumpet in a photograph used for the Kofi album cover",
                    "ko":  "Kofi 앨범 커버에 사용된 트럼펫을 들고 있는 도널드 버드의 사진"
                },
    "gall_69":  {
                    "en":  "Gregory Porter beside a swimming pool in artwork for his 2020 album All Rise",
                    "ko":  "그레고리 포터의 2020년 앨범 All Rise 아트워크 속 수영장을 배경으로 한 모습"
                },
    "gall_70":  {
                    "en":  "Alfred Lion and Francis Wolff at the Blue Note office surrounded by album covers",
                    "ko":  "앨범 커버가 걸린 블루노트 사무실의 알프레드 라이언과 프랜시스 울프"
                },
    "gall_71":  {
                    "en":  "An outdoor concert at the Blue Note Napa Summer Sessions in California",
                    "ko":  "미국 캘리포니아에서 열린 블루노트 나파 서머 세션의 야외 공연 현장"
                },
    "gall_72":  {
                    "en":  "Blue and red jazz portraits inspired by Blue Note\u0027s iconic album cover designs",
                    "ko":  "블루노트의 상징적인 앨범 디자인을 오마주한 블루와 레드 컬러의 재즈 아티스트 콜라주"
                },
    "gall_73":  {
                    "en":  "Album cover of Blue Note China\u0027s Now\u0027s The Time: An Anthology Of Contemporary Chinese Jazz, Vol. 1",
                    "ko":  "블루노트 차이나의 현대 중국 재즈 컴필레이션 Now\u0027s The Time, Vol. 1 앨범 커버"
                },
    "gall_74":  {
                    "en":  "Miles Davis and Bill Evans at the piano during the Kind of Blue recording session in 1959",
                    "ko":  "1959년 Kind of Blue 녹음 세션에서 피아노 앞에 함께한 마일스 데이비스와 빌 에반스"
                },
    "gall_75":  {
                    "en":  "Horace Silver immersed in playing the grand piano",
                    "ko":  "그랜드 피아노 연주에 몰입한 호레이스 실버"
                },
    "gall_76":  {
                    "en":  "A blue-toned portrait of jazz trumpeter Blue Mitchell",
                    "ko":  "블루 컬러로 표현한 재즈 트럼페터 블루 미첼의 초상"
                },
    "gall_78":  {
                    "en":  "Thelonious Monk gesturing beside a piano around 1951",
                    "ko":  "1951년경 피아노 옆에 앉아 손짓하는 텔로니어스 몽크"
                },
    "gall_79":  {
                    "en":  "Innovative jazz drummer Tony Williams playing drums in the recording studio",
                    "ko":  "녹음 스튜디오에서 드럼을 연주하는 혁신적인 재즈 드러머 토니 윌리엄스"
                },
    "gall_80":  {
                    "en":  "Brian Blade wearing glasses and concentrating on his drum performance",
                    "ko":  "안경을 쓰고 드럼 연주에 몰입한 브라이언 블레이드"
                }
};
