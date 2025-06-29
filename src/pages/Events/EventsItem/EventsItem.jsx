import styles from "./EventsItem.module.scss"
import MCE from "../../../assets/eventsMocks/MCE.webp";
import IconButton from "../../../components/Buttons/IconButton/IconButton.jsx";
import LocationIcon from "../../../assets/location-filled-icon.svg?react"
import {useNavigate} from "react-router-dom";

export default function EventsItem({tags}){
    const navigate = useNavigate()

    return(
        <div className={styles.itemContainer}>
            <h2 className="ma-h2">Крафт, еда и музыка: фестиваль Moscow Craft Event — снова в столице 1 мая на площадке VK Stadium!</h2>
            <p className="ma-p1">28 апреля 2025</p>
            <div className={styles.mapButtonContainer}>
                <IconButton text="Карта фестиваля" onClick={() => navigate("/event-map/")}><LocationIcon/></IconButton>
            </div>
            <img src={MCE} className={styles.mainImage} alt=""></img>
            <p>Фестиваль крафтовой культуры Craft Event проводится в Петербурге уже восемь лет. Он стал главным крафтовым событием города, а в прошлом году впервые состоялся в Москве, получив теплый прием и хвалебные отзывы посетителей — и снова возвращается в столицу в этом году!</p>
            <p>Moscow Craft Event — это крафтовые напитки от лучших пивоварен России, а также гастрономия, авторские товары, конкурсы и, конечно же, музыка. На фестивале выступят легендарная группа «Дюна», мультижанровый оркестр нового поколения ½ Orchestra.</p>
            <p>Для гостей Craft Event 2025 будут работать пять секций: Craft Music, Craft Drinks, Craft Food, Craft Fun и Craft Market, каждая из которых представит лучшее в своём жанре.</p>
            <div className={styles.tagsContainer}>
                {tags.map((tag, index) =>
                    <div key={index} className={styles.tag}><p>{tag}</p></div>
                )}
            </div>
            <div className={`${styles.source} ma-p1`}><p>Источник: </p><a href="https://mskcraftevent.ru/">Moscow Craft Event</a></div>
        </div>
    )
}