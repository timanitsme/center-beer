import styles from "./EventCard.module.scss"
import {useNavigate} from "react-router-dom";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";

export default function EventCard({cardInfo}){
    const navigate = useNavigate()
    const goToEventPage = () => navigate("/events/1")
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo?.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardInfo?.preview || cardImagePlaceholder)

    function distillText(htmlText) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlText;
        return tempDiv.textContent || tempDiv.innerText || '';
    }

    return(
        <div className={styles.blogCard}>
            <div className={styles.cardTop}>
                <p className={`${styles.cardTextPrimary} ma-p`} onClick={goToEventPage}>{cardInfo?.title}</p>
                <div>
                    <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                </div>

            </div>




            <div className={`${styles.imgContainer} ${imageSrc === cardImagePlaceholder? styles.third : ''}`}>
                <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} onClick={() => goToEventPage()} alt=""/>
                <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
            </div>
            <p className={`${styles.date} ma-p2`}>{cardInfo?.date}</p>
            <p className={`${styles.cardDescription} ma-p`}>{cardInfo?.description || distillText(cardInfo?.text)}</p>

            <div className={styles.tagsRow}>
                {cardInfo?.tags.map((tag, index) =>
                    <div key={index} className={`${styles.tag} text-small`}><p>{tag}</p></div>
                )}
            </div>
        </div>
    )
}