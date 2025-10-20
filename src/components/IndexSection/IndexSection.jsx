import styles from "./IndexSection.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import Cap from "../../assets/cap.svg?react"
import NoCapBottle from "../../assets/bottle-no-cap.svg?react"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import VideoCard from "../Cards/VideoCard/VideoCard.jsx";
import MinimalBarCard from "../Cards/BarCard/MinimalBarCard.jsx";
import {useGetBarsQuery} from "../../store/services/centerBeer.js";
import BarCardSkeleton from "../Skeletons/BarCardSkeleton/BarCardSkeleton.jsx";
import BeerDuck from "../../assets/partners/beer-duck.webp";
import JawsIPA from "../../assets/partners/jaws-ipa.webp";
import SingleVideoModal from "../Modals/SingleVideoModal/SingleVideoModal.jsx";
import CrazyScience from "../../assets/partners/crazy-science.webp";
import NewEngland from "../../assets/partners/new-england.webp";
import Yaga from "../../assets/partners/yaga.webp";
import Bar1 from "../../assets/barsMocks/bar-1.svg"
import Bar5 from "../../assets/barsMocks/bar-5.svg"

export default function IndexSection(){
    const [showTitle, setShowTitle] = useState(false);
    const [showCards, setShowCards] = useState(false)
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [src, setSrc] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTitle(true);
        }, 1000);
        const cardsTimer = setTimeout(() => {
            setShowCards(true);
        }, 1000);
        return () => {
            clearTimeout(timer)
            clearTimeout(cardsTimer)
        };
    }, []);

    const videoCards = [
        {title: "BUMBLE.BEER Ядерная утка", img: BeerDuck, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239046&hd=2&autoplay=1"},
        {title: "Jaws Атомная прачечная", img: JawsIPA, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239027&hd=2&autoplay=1"},
        {title: "BUMBLE.BEER New England IPA", img: NewEngland, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239044&hd=2&autoplay=1"},
        {title: "HOMOSAPIENS CRAZY SCIENCE", img: CrazyScience, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239025&hd=2&autoplay=1"},
        {title: "BREWLOK Баба Яга", img: Yaga, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239028&hd=2&autoplay=1"},

    ]

    const barCards = {
        data: [
            {
                "id": "1",
                "add_date": "2021-06-20 16:54:48",
                "alias": "13rules_suchevskiy_val",
                "name": "13 RULES (Народный бар)",
                "address": "г.Москва, Сущевский вал, 41",
                "preview": "https://img.center.beer/t/bar/c4/ca/42/1/350x350-13-rules-narodnyy-bar-preview.jpg",
                "logo": "https://img.center.beer/t/bar/c4/ca/42/1/350x350-13-rules-narodnyy-bar-logo.png",
                "contacts": "+7 (916) 298-06-14",
                "work_time": "",
                "email": "info@13rules.ru",
                "social_media": {
                    "vk": "https://vk.com/13rules_sushchevsky",
                    "fb": "https://www.facebook.com/13rules.official/",
                    "instagram": "https://www.instagram.com/13rules.official/",
                    "tg": "https://t.me/rules41",
                    "youtube": "https://www.youtube.com/channel/UCK2eLCxt9rb-ftDDG249S_Q"
                },
                "lat": "37.608607",
                "lon": "55.793288",
                "photo": [
                    "13-rules-narodnyy-bar-gallery-1.jpg",
                    "13-rules-narodnyy-bar-gallery-2.jpg",
                    "13-rules-narodnyy-bar-gallery-3.jpg",
                    "13-rules-narodnyy-bar-gallery-4.jpg",
                    "13-rules-narodnyy-bar-gallery-5.jpg",
                    "13-rules-narodnyy-bar-gallery-6.jpg",
                    "13-rules-narodnyy-bar-gallery-7.jpg",
                    "13-rules-narodnyy-bar-gallery-8.jpg",
                    "13-rules-narodnyy-bar-gallery-9.jpg",
                    "13-rules-narodnyy-bar-gallery-10.jpg",
                    "13-rules-narodnyy-bar-gallery-11.jpg",
                    "13-rules-narodnyy-bar-gallery-12.jpg",
                    "13-rules-narodnyy-bar-gallery-13.jpg",
                    "13-rules-narodnyy-bar-gallery-14.jpg",
                    "13-rules-narodnyy-bar-gallery-15.jpg",
                    "13-rules-narodnyy-bar-gallery-16.jpg",
                    "13-rules-narodnyy-bar-gallery-17.jpg",
                    "13-rules-narodnyy-bar-gallery-18.jpg",
                    "13-rules-narodnyy-bar-gallery-19.jpg",
                    "13-rules-narodnyy-bar-gallery-20.jpg",
                    "13-rules-narodnyy-bar-gallery-21.jpg"
                ],
                "type_id": "1",
                "bar_type": "Бар",
                "country": "Россия",
                "city": "Москва",
                "average_bill": "2500-3000",
                "kitchen": [
                    "Европейская",
                    "Итальянская",
                    "Русская",
                    "Авторская"
                ],
                "visit_types": [
                    "Деловая встреча",
                    "Романтическая встреча",
                    "Семейный ужин",
                    "Ужин с друзьями"
                ],
                "properties": [
                    "WiFi",
                    "Летняя терраса",
                    "Принимаются карты"
                ],
                "subway": {
                    "color": "#afafaf",
                    "name": "Лубянка, Сретенский бульвар"
                },
                "average_bill_icon": 4,
                "is_favor": false,
                "is_liked": false,
                "work_time_list": {
                    "0": {
                        "interval": "14:00 - 05:00",
                        "active": true
                    },
                    "1": {
                        "interval": "14:00 - 02:00",
                        "active": true
                    },
                    "2": {
                        "interval": "14:00 - 02:00",
                        "active": true
                    },
                    "3": {
                        "interval": "14:00 - 05:00",
                        "active": true
                    },
                    "4": {
                        "interval": "14:00 - 02:00",
                        "active": true
                    },
                    "5": {
                        "interval": "14:00 - 05:00",
                        "active": true
                    },
                    "6": {
                        "interval": "14:00 - 05:00",
                        "active": true
                    }
                },
                "url": "https://center.beer/bars/13rules_suchevskiy_val/",
                "gallery": [
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-1.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-2.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-3.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-4.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-5.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-6.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-7.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-8.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-9.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-10.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-11.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-12.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-13.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-14.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-15.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-16.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-17.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-18.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-19.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-20.jpg",
                    "https://img.center.beer/bar/c4/ca/42/1/13-rules-narodnyy-bar-gallery-21.jpg"
                ]
            },
            {
                "id": "178",
                "add_date": "2022-01-20 16:54:48",
                "alias": "13rules_kotelniky",
                "name": "13 Rules (Котельники)",
                "address": "Люберцы Новорязанское шоссе дом 1а ТЦ Колибри 3 этаж ",
                "preview": "https://img.center.beer/t/bar/8f/85/51/178/350x350-13-rules-kotelniki-preview.jpg",
                "logo": "https://img.center.beer/t/bar/8f/85/51/178/350x350-13-rules-kotelniki-logo.png",
                "contacts": "+7 (926) 397-79-40 ",
                "work_time": "",
                "email": "zombiebrew@mail.ru",
                "social_media": {
                    "vk": "https://vk.com/13rules_kotelniki",
                    "fb": "",
                    "instagram": "http://Instagram.com/13rules_kotelniki",
                    "tg": "https://t.me/kotelniki_13rules",
                    "youtube": ""
                },
                "lat": "37.855473",
                "lon": "55.670772",
                "photo": "",
                "type_id": "1",
                "bar_type": "Бар",
                "country": "Россия",
                "city": "Москва",
                "average_bill": "2500-3000",
                "kitchen": [
                    "Европейская",
                    "Итальянская",
                    "Русская",
                    "Авторская"
                ],
                "visit_types": [
                    "Деловая встреча",
                    "Романтическая встреча",
                    "Семейный ужин",
                    "Ужин с друзьями"
                ],
                "properties": [
                    "WiFi",
                    "Летняя терраса",
                    "Принимаются карты"
                ],
                "subway": {
                    "color": "#afafaf",
                    "name": "Лубянка, Сретенский бульвар"
                },
                "average_bill_icon": 3,
                "is_favor": false,
                "is_liked": false,
                "work_time_list": {
                    "0": {
                        "interval": "13:00 - 00:00",
                        "active": true
                    },
                    "1": {
                        "interval": "13:00 - 00:00",
                        "active": true
                    },
                    "2": {
                        "interval": "13:00 - 00:00",
                        "active": true
                    },
                    "3": {
                        "interval": "13:00 - 00:00",
                        "active": true
                    },
                    "4": {
                        "interval": "13:00 - 00:00",
                        "active": true
                    },
                    "5": {
                        "interval": "13:00 - 02:00",
                        "active": true
                    },
                    "6": {
                        "interval": "13:00 - 02:00",
                        "active": true
                    }
                },
                "url": "https://center.beer/bars/13rules_kotelniky/",
                "gallery": []
            },
            {
                "id": "328",
                "add_date": "2025-06-17 18:29:28",
                "alias": "rocket-city-bar",
                "name": "Rocket City Taproom",
                "address": "МО, г. Королёв, ул. Подмосковная д.7",
                "preview": "https://img.center.beer/t/bar/cd/00/69/328/350x350-rocket-city-taproom-preview.jpg",
                "logo": "https://img.center.beer/t/bar/cd/00/69/328/350x350-rocket-city-bar-logo.jpg",
                "contacts": "+7(901)-725-09-17",
                "work_time": "",
                "email": "rocketcitybar@yandex.ru",
                "social_media": {
                    "vk": "",
                    "fb": "",
                    "instagram": "",
                    "tg": "https://t.me/rocket_city_bar",
                    "youtube": ""
                },
                "lat": null,
                "lon": null,
                "photo": "",
                "type_id": "1",
                "bar_type": "Бар",
                "country": "Россия",
                "city": "Москва",
                "average_bill": "2500-3000",
                "kitchen": [
                    "Европейская",
                    "Итальянская",
                    "Русская",
                    "Авторская"
                ],
                "visit_types": [
                    "Деловая встреча",
                    "Романтическая встреча",
                    "Семейный ужин",
                    "Ужин с друзьями"
                ],
                "properties": [
                    "WiFi",
                    "Летняя терраса",
                    "Принимаются карты"
                ],
                "subway": {
                    "color": "#afafaf",
                    "name": "Лубянка, Сретенский бульвар"
                },
                "average_bill_icon": 0,
                "is_favor": false,
                "is_liked": false,
                "work_time_list": {
                    "0": {
                        "interval": "12:00 - 23:00",
                        "active": true
                    },
                    "1": {
                        "interval": "12:00 - 23:00",
                        "active": true
                    },
                    "2": {
                        "interval": "12:00 - 23:00",
                        "active": true
                    },
                    "3": {
                        "interval": "12:00 - 23:00",
                        "active": true
                    },
                    "4": {
                        "interval": "12:00 - 23:00",
                        "active": true
                    },
                    "5": {
                        "interval": "12:00 - 01:00",
                        "active": true
                    },
                    "6": {
                        "interval": "12:00 - 01:00",
                        "active": true
                    }
                },
                "url": "https://center.beer/bars/rocket-city-bar/",
                "gallery": []
            },
            {
                "id": "217",
                "add_date": "2024-05-17 16:54:48",
                "alias": "13rules_naberezhnie_chelny",
                "name": "13 Rules (Набережные челны)",
                "address": "",
                "preview": Bar5,
                "logo": "https://img.center.beer/t/bar/63/dc/7e/217/350x350-logo.png",
                "contacts": "",
                "work_time": "",
                "email": "info@13rules.ru",
                "social_media": [],
                "lat": "39.022676",
                "lon": "45.058784",
                "photo": null,
                "type_id": "1",
                "bar_type": "Бар",
                "country": "Россия",
                "city": "Тула",
                "average_bill": "2500-3000",
                "kitchen": [
                    "Европейская",
                    "Итальянская",
                    "Русская",
                    "Авторская"
                ],
                "visit_types": [
                    "Деловая встреча",
                    "Романтическая встреча",
                    "Семейный ужин",
                    "Ужин с друзьями"
                ],
                "properties": [
                    "WiFi",
                    "Летняя терраса",
                    "Принимаются карты"
                ],
                "subway": {
                    "color": "#afafaf",
                    "name": "Лубянка, Сретенский бульвар"
                },
                "average_bill_icon": 2,
                "is_favor": false,
                "is_liked": false,
                "work_time_list": {
                    "0": {
                        "interval": "14:00 - 06:00",
                        "active": false
                    },
                    "1": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "2": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "3": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "4": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "5": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "6": {
                        "interval": "14:00 - 06:00",
                        "active": false
                    }
                },
                "url": "https://center.beer/bars/13rules_naberezhnie_chelny/",
                "gallery": []
            },
            {
                "id": "214",
                "add_date": "2023-05-17 16:54:48",
                "alias": "13rules_nabereznie_chelny",
                "name": "13 Rules (Челны)",
                "address": "г.Набережные Челны, Сююмбике 21/33а",
                "preview": Bar1,
                "logo": "https://img.center.beer/t/bar/ca/46/c1/214/350x350-logo.png",
                "contacts": "+7 (905) 313-31-39",
                "work_time": "",
                "email": "info@13rules.ru",
                "social_media": [],
                "lat": "52.391796",
                "lon": "55.738090",
                "photo": [
                    "3.jpg",
                    "4.jpg",
                    "5.jpg"
                ],
                "type_id": "1",
                "bar_type": "Бар",
                "country": "Россия",
                "city": "Москва",
                "average_bill": "2500-3000",
                "kitchen": [
                    "Европейская",
                    "Итальянская",
                    "Русская",
                    "Авторская"
                ],
                "visit_types": [
                    "Деловая встреча",
                    "Романтическая встреча",
                    "Семейный ужин",
                    "Ужин с друзьями"
                ],
                "properties": [
                    "WiFi",
                    "Летняя терраса",
                    "Принимаются карты"
                ],
                "subway": {
                    "color": "#afafaf",
                    "name": "Лубянка, Сретенский бульвар"
                },
                "average_bill_icon": 4,
                "is_favor": false,
                "is_liked": false,
                "work_time_list": {
                    "0": {
                        "interval": "14:00 - 06:00",
                        "active": false
                    },
                    "1": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "2": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "3": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "4": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "5": {
                        "interval": "12:00 - 24:00",
                        "active": false
                    },
                    "6": {
                        "interval": "14:00 - 06:00",
                        "active": false
                    }
                },
                "url": "https://center.beer/bars/13rules_nabereznie_chelny/",
                "gallery": [
                    "https://img.center.beer/bar/ca/46/c1/214/3.jpg",
                    "https://img.center.beer/bar/ca/46/c1/214/4.jpg",
                    "https://img.center.beer/bar/ca/46/c1/214/5.jpg"
                ]
            },
        ]
    }

    const filterValues = {
        lim: 5,
        offset: 0,
        city_id: '',
        subways_ids: [],
        kitchen_ids: [],
        visit_type_ids: [],
        price_ids: [],
        type_ids: [],
        feature_ids: [],
        only_opened: false,
        online_booking: false,
        sort_by: "popular"
    };

    const {data: barsData, isFetching: barsIsFetching } = useGetBarsQuery(filterValues);

    return(
        <div className={styles.sectionContainer}>

            <div className={`${styles.cap} ${showTitle? styles.show: ""}`}><Cap/></div>
            <div className={`${styles.titleContainer} ${showTitle? styles.show: ""}`} >
                <p className={styles.textPrimary}>Центральный портал о пиве</p>
                <div>
                    <h1 style={{color: "var(--txt-secondary)"}}>Для тех, кто его</h1>
                    <h1>Варит, любит и продаёт</h1>
                </div>
                {/*<SimpleButton text="Подробнее о проекте" onClick={() => window.location.href="https://center.beer/about/"}></SimpleButton>*/}
                <SimpleButton text="Moscow Craft Event 2025" onClick={() => window.location.href="/event-map/"}></SimpleButton>
            </div>
            <div className={styles.bottle}><NoCapBottle/></div>
            <div className={`${styles.videoCardContainer} ${showTitle? styles.show: ""}`}>
                {videoCards.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}><VideoCard cardInfo={card} onShow={(video) => {setSrc(video); setShow(true)}}/></div>
                ))
                }
            </div>

            <div className={`${styles.cardContainer} ${showTitle? styles.show: ""}`}>
                {barsIsFetching && Array.from({ length: filterValues.lim }).map((_, index) => (
                    <BarCardSkeleton key={`skeleton-${index}`} />
                ))}
                {!barsIsFetching && barCards?.data?.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}><MinimalBarCard cardInfo={card}></MinimalBarCard></div>
                ))
                }
            </div>
            <SingleVideoModal show={show} setShow={setShow} src={src} setSrc={setSrc}/>
        </div>
    )
}