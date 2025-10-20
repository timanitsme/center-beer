import {useEffect, useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import styles from "./BottledBeerCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";

export default function MinimalBottledBeerCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo?.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)

    useEffect(() => {
        setImageSrc(cardInfo?.photo || cardImagePlaceholder);
    }, [cardInfo?.photo]);

    return(
        <div className={styles.card}>
            <div className={`${styles.bottledBeerCard} ${styles.round}`}>
                <div className={styles.cardTop}>
                    <div></div>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>

                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <div className={styles.primaryContainer}><h6 title={cardInfo?.name} className={styles.cardTextPrimary}>{cardInfo?.name}</h6></div>
                        <p className={styles.textActive} title={`${[cardInfo?.brewery_name, cardInfo?.city, cardInfo?.country].join(", ")}`}>{[cardInfo?.brewery_name, cardInfo?.city, cardInfo?.country].join(", ")}</p>
                    </div>
                    <div>
                        <div style={{height: "25px"}}></div>
                        {cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}