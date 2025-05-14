import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery} from "../../../store/services/centerBeer.js";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import styles from "./BottledBeerCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";

export default function BottledBeerCardWithoutPrice({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);
    const navigate = useNavigate()
    const goToBeerPage = (alias) => navigate(`/beer/${alias}/`, {
        state: {from: location.pathname}
    })
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

    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={styles.cardTextPrimary} onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)}>{cardInfo?.name}</p>
                        <p className={styles.textActive}>{cardInfo?.brewery}{cardInfo?.brewery && cardInfo?.country && ","} {cardInfo?.country}</p>
                    </div>
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                        {cardInfo?.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo?.rating.toFixed(1)})</p>}
                    </div>

                </div>
                <div className={`${styles.imgContainer} ${imageSrc === cardImagePlaceholder? styles.third : ''}`}>
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                {cardInfo?.style && <p className={styles.textActive}><span style={{color: "var(--txt-secondary)"}}>Стиль:</span> {cardInfo?.style}</p>}
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Крепость:</p>
                        <p className={styles.textActive}>{formatNumber(cardInfo?.abv)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Плотность:</p>
                        <p className={styles.textActive}>{formatNumber(cardInfo?.og)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Горечь</p>
                        <p className={styles.textActive}>{formatNumber(cardInfo?.ibu)}</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter} style={{alignItems: "center"}}>
                <IconButton text="Подробнее" onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)}><BottlesPairIcon/></IconButton>
            </div>
        </div>
    )
}