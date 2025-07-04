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
import BeerPartnerPreview from "../../assets/partners/beer-partner-preview.webp";
import BreweryPartnerPreview from "../../assets/partners/brewery-partner-preview.webp";
import BeerDuck from "../../assets/partners/beer-duck.webp";
import JawsIPA from "../../assets/partners/jaws-ipa.webp";
import CenterAndBeer from "../../assets/partners/center-and-beer.webp";
import BreweriesMeet from "../../assets/partners/breweries-meet.webp";
import SingleVideoModal from "../Modals/SingleVideoModal/SingleVideoModal.jsx";

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
        {title: "CENTER.BEER — портал нового пивного поколения", img: BeerPartnerPreview, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239048&hd=2&autoplay=1"},
        {title: "CENTER.BEER для пивоварен", img: BreweryPartnerPreview, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239049&hd=2&autoplay=1"},
        {title: "BUMBLE.BEER Ядерная утка", img: BeerDuck, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239046&hd=2&autoplay=1"},
        {title: "Jaws Атомная прачечная", img: JawsIPA, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239027&hd=2&autoplay=1"},
        {title: "Показываем инструменты", img: CenterAndBeer, video: "https://vkvideo.ru/video_ext.php?oid=-210836529&id=456239031&hd=2&autoplay=1"},
        {title: "Встреча с пивоварнями", img: BreweriesMeet, video: "https://vk.com/video_ext.php?oid=-210836529&id=456239047&hd=2&autoplay=1"},

    ]

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
                {!barsIsFetching && barsData?.data?.map((card, index) => (
                    <div className={styles.cardWrapper} key={index}><MinimalBarCard cardInfo={card}></MinimalBarCard></div>
                ))
                }
            </div>
            <SingleVideoModal show={show} setShow={setShow} src={src} setSrc={setSrc}/>
        </div>
    )
}