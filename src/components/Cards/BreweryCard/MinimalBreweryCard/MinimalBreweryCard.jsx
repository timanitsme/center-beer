import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../BarCard/BarCard.module.css";
import BookMarkIcon from "../../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../../assets/fav-unfill-icon.svg?react";
import LocationIcon from "../../../../assets/location-filled-icon.svg?react";
import cardImagePlaceholder from "../../../../assets/placeholders/card-image-placeholder.svg";

export default function MinimalBreweryCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardImagePlaceholder)

    const goToBeerPage = () => navigate("/brewery/1");

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onClick={goToBeerPage} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{cardInfo.title}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p>{cardInfo.address}</p>
                </div>
            </div>

        </div>
    )
}