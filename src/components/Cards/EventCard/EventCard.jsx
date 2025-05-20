import styles from "./EventCard.module.css"
import {useNavigate} from "react-router-dom";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";

export default function EventCard({cardInfo}){
    const navigate = useNavigate()
    const goToEventPage = () => navigate("/events/1")
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardImagePlaceholder)

    return(
        <div className={styles.blogCard}>
            <div className={styles.cardTop}>
                <p className={styles.cardTextPrimary} onClick={goToEventPage}>{cardInfo.title}</p>
                <div>
                    <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                </div>

            </div>




            <div className={`${styles.imgContainer} ${imageSrc === cardImagePlaceholder? styles.third : ''}`}>
                <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} onClick={() => goToEventPage()} alt=""/>
                <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
            </div>
            <p className={styles.date}>{cardInfo.date}</p>
            <p className={styles.cardDescription}>{cardInfo.description}</p>
            <div className={styles.tagsRow}>
                {cardInfo.tags.map((tag, index) =>
                    <div key={index} className={styles.tag}><p>{tag}</p></div>
                )}
            </div>
        </div>
    )
}