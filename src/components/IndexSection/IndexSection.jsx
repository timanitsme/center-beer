import styles from "./IndexSection.module.css"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import Cap from "../../assets/cap.svg?react"
import NoCapBottle from "../../assets/bottle-no-cap.svg?react"
import IndexBackground from "../../assets/index-background.svg"
import {useEffect, useState} from "react";
import BarImage1 from "../../assets/barsMocks/bar-3.svg"
import BarImage2 from "../../assets/barsMocks/bar-2.svg"
import BarImage3 from "../../assets/barsMocks/bar-5.svg"
import BarImage4 from "../../assets/barsMocks/bar-4.svg"
import BarImage5 from "../../assets/barsMocks/bar-1.svg"
import CardGallery from "../CardGallery/CardGallery.jsx"
import MinimalBarCard from "../Cards/BarCard/MinimalBarCard.jsx";
import CardsList from "../CardsList/CardsList.jsx";
import VideoImage1 from "../../assets/videoMocks/video-image-1.svg"
import VideoImage2 from "../../assets/videoMocks/video-image-2.svg"
import VideoImage3 from "../../assets/videoMocks/video-image-3.svg"
import VideoImage4 from "../../assets/videoMocks/video-image-4.svg"
import VideoImage5 from "../../assets/videoMocks/video-image-5.svg"
import VideoImage6 from "../../assets/videoMocks/video-image-6.svg"
import VideoCard from "../Cards/VideoCard/VideoCard.jsx";
import {useNavigate} from "react-router-dom";

export default function IndexSection(){
    const [showTitle, setShowTitle] = useState(false);
    const [showCards, setShowCards] = useState(false)
    const navigate = useNavigate()

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

    const barCards = [
        {title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {title: "13 Rules (Котельники)", img: BarImage2, address: "Котельники, ул. Сосновая 1к.3"},
        {title: "13 Rules (Воронеж)", img: BarImage3, address: "ул. Ворошилова, 1Г"},
        {title: "13 Rules (Киров)", img: BarImage4, address: "г.Киров, Московская, 33"},
        {title: "13 Rules (Ковров)", img: BarImage5, address: "г.Ковров, проезд Брюсова д. 4/1"},
    ]

    const videoCards = [
        {title: "Пиво с другой планеты. Пробуем впервые.", img: VideoImage1, author: "Артем Иванов", date: "12 минут назад"},
        {title: "ПРОБУЕМ НОВОЕ ПИВО ИЗ  ПЯТЕРОЧКИ", img: VideoImage2, author: "Артем Иванов", date: "12 минут назад"},
        {title: "ПРОБУЕМ НЕ ДОРОГОЕ ПИВО ИЗ \"ЧИЖИК\"", img: VideoImage3, author: "Артем Иванов", date: "12 минут назад"},
        {title: "Как на самом деле немцы пьют пиво. Факты, о которых вы не знали - Meet The Germans на русском", img: VideoImage4, author: "Артем Иванов", date: "12 минут назад"},
        {title: "Как пили ПИВО в СССР? Легендарное ЖИГУЛЕВСКОЕ", img: VideoImage5, author: "Артем Иванов", date: "12 минут назад"},
        {title: "ПОСЛАЛИ ЗА ПИВОМ | АРОМАТНЫЙ МИР | АНЯ, ТЫ ЧТО КУПИЛА?!", img: VideoImage6, author: "Артем Иванов", date: "12 минут назад"},

    ]



    return(
        <div className={styles.sectionContainer}>

            <div className={`${styles.cap} ${showTitle? styles.show: ""}`}><Cap/></div>
            <div className={`${styles.titleContainer} ${showTitle? styles.show: ""}`} >
                <p className={styles.textPrimary}>Центральный портал о пиве</p>
                <div>
                    <h1 style={{color: "var(--txt-secondary)"}}>Для тех, кто его</h1>
                    <h1>Варит, любит и продаёт</h1>
                </div>
                <SimpleButton text="Подробнее о проекте" onClick={() => window.location.href="https://center.beer/about/"}></SimpleButton>
            </div>
            <div className={styles.bottle}><NoCapBottle/></div>
            <div className={`${styles.videoCardContainer} ${showTitle? styles.show: ""}`}>
                {videoCards.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}><VideoCard cardInfo={card}/></div>
                ))
                }
            </div>

            <div className={`${styles.cardContainer} ${showTitle? styles.show: ""}`}>
                {barCards.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}><MinimalBarCard cardInfo={card}></MinimalBarCard></div>
                ))
                }
            </div>
        </div>
    )
}