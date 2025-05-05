import {useNavigate} from "react-router-dom";
import styles from "./PartnerItem.module.css";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import PlayButtonIcon from "../../assets/play-button-icon.svg?react"
import MCE from "../../assets/partners/brewery-partner-preview.webp";
import {FaBullhorn, FaChartLine, FaGlobe, FaVideo} from "react-icons/fa6";
import {BsGear} from "react-icons/bs";
import {FaAd, FaBeer, FaMapMarkerAlt, FaSearch, FaShoppingCart} from "react-icons/fa";

export default function PartnerItem(){
    const navigate = useNavigate()

    const items = [
        { Icon: FaGlobe, text: 'Стильный сайт с SEO оптимизацией' },
        { Icon: BsGear, text: 'Интуитивно понятное управление' },
        { Icon: FaSearch, text: 'Удобный поиск(фильтры) по пиву' },
        { Icon: FaVideo, text: 'Видео-визитки вашего пива' },
        { Icon: FaMapMarkerAlt, text: 'Все видят в онлайне где ваше пиво продаётся' },
        { Icon: FaBullhorn, text: 'О ваших мероприятиях узнает вся аудитория' },
        { Icon: FaChartLine, text: 'Увеличение продаж за счет доступности' },
        { Icon: FaBeer, text: 'Заказы напрямую из бара' },
        { Icon: FaShoppingCart, text: 'Дополнительные продажи через функцию предзаказа в заведениях' },
        { Icon: FaAd, text: 'Увеличение узнаваемости за счет рекламы' },
    ];


    return(
        <div className={styles.itemContainer}>
            <h2>Современный сайт, с простым управлением, который приводит клиентов из всех регионов и позволяет в реальном времени видеть где продается ваше пиво – это еще не все что мы предлагаем пивоварням</h2>
            <div className={styles.videoContainer}>
                <PlayButtonIcon/>
                <img src={MCE} className={styles.mainImage} alt=""></img>
            </div>
            <div className={styles.iconRow}>
                {items.map((item, index) => (
                    <div key={index} className={styles.iconItem}>
                        <div className={styles.iconBox}><item.Icon/></div>
                        <p className={styles.iconText}>{item.text}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}