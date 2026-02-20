import styles from "./BeerCheckInCard.module.scss"
import Bottle1 from "../../../../assets/bottlesMock/bottle-1.svg";
import Review1 from "../../../../assets/reviewsMocks/beer-review-1.svg";
import Review2 from "../../../../assets/reviewsMocks/beer-review-2.svg";
import Review3 from "../../../../assets/reviewsMocks/beer-review-3.svg";
import {HiDotsVertical} from "react-icons/hi";
import {getRatingIcons} from "../../../../utils/getRatingIcons.jsx";
import {useState} from "react";
import cardImagePlaceholder from "../../../../assets/placeholders/card-image-placeholder.svg"

function formatDate(dateString) {
    const months = [
        "янв.",
        "февр.",
        "мар.",
        "апр.",
        "мая",
        "июн.",
        "июл.",
        "авг.",
        "сен.",
        "окт.",
        "нояб.",
        "дек."
    ];
    const date = new Date(dateString);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
}

export default function BeerCheckInCardApi({cardInfo}){
    /*const cardInfo = {img: Bottle1, title: "Terra Firma", status: "published", rating: 5, comment: "Это классика, которая никогда не подводит! Легкий, освежающий вкус с мягкой горчинкой идеально подходит для жаркого летнего дня. Пью его много лет, и до сих пор это один из моих любимых вариантов. А еще отлично сочетается с соленой рыбкой или чипсами. Рекомендую всем, кто ценит простоту и качество!",
        photos: [Review1, Review2, Review3]}*/
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)

    const formatNumber = (num) => Number(num).toString()

    return(
        <div className={styles.card}>
            <div className={styles.headerRow}>
                <div className={styles.flexRow}>
                    <div className={styles.imageWrapper}>
                        <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    </div>
                    <div className={styles.flexCol}>
                        <h3 className="ma-h4">{cardInfo?.name}</h3>
                        <p className="ma-p"><span className={`${styles.active} ma-p`}>Производитель:</span> {cardInfo?.brewery?.name}</p>
                        <p className="ma-p"><span className={`${styles.active} ma-p`}>Стиль:</span> {cardInfo?.style_name}</p>
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <HiDotsVertical/>
                </div>
            </div>
            <div className={styles.characteristics}>
                <div>
                    <p className="aa-p2">Крепость:</p>
                    <p className={`${styles.active} ma-p`}>{formatNumber(cardInfo?.abv)}%</p>
                </div>
                <div>
                    <p className="aa-p2">Плотность:</p>
                    <p className={`${styles.active} ma-p`}>{formatNumber(cardInfo?.og)}%</p>
                </div>
                <div>
                    <p className="aa-p2">Горечь</p>
                    <p className={`${styles.active} ma-p`}>{formatNumber(cardInfo?.ibu)}</p>
                </div>
            </div>
            <div className={styles.description}>
                <p className="ma-p">Оценка:</p>
                <div style={{display: "flex", alignItems: "center", gap: "5px"}}>
                    <div className={styles.beerBottles}>
                        {getRatingIcons(cardInfo?.rating)}
                    </div>
                    <p className={`${styles.active} ma-p`}>({cardInfo?.rating})</p>
                </div>
            </div>
            <div className={styles.description}>
                <p className="ma-p">Число дегустаций:</p>
                <p className={`${styles.active} ma-p`}>{cardInfo.user_checkins_count}</p>
            </div>
            <div className={styles.description}>
                <p className="ma-p">Первая проба:</p>
                <p className={`${styles.active} ma-p`}>{formatDate(cardInfo.first_checkin_at)}</p>
            </div>
        </div>
    )
}