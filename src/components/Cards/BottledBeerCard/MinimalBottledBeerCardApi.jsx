import {useEffect, useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import styles from "./BottledBeerCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";

export default function MinimalBottledBeerCardApi({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo?.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.preview || cardImagePlaceholder)
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBeerToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBeerToFavQuery();

    const handleAddToCuddy = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToCuddy(id).unwrap();
            setCardBookmarked(!cardBookmarked)
        } catch (err) {
            console.log(`add to cuddy error: ${err}`)
        }
    }

    const handleAddToFav = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToFav(id).unwrap();
            setCardFav(!cardFav)
        } catch (err) {
            console.log(`add to fav error: ${err}`)
        }
    }

    useEffect(() => {
        setImageSrc(cardInfo?.preview || cardImagePlaceholder);
    }, [cardInfo?.preview]);

    return(
        <div className={styles.card}>
            <div className={`${styles.bottledBeerCard} ${styles.round}`}>
                <div className={styles.cardTop}>
                    <div></div>
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>

                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={styles.cardTextPrimary}>{cardInfo?.beer_name}</p>
                        <p className={styles.textActive}>{[cardInfo?.brewery_name].join(", ")}</p>
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