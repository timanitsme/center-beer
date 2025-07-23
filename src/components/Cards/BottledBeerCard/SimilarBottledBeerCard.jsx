import {useState} from "react";
import styles from "./BottledBeerCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import BottleIcon from "../../../assets/bottle-icon.svg?react"
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"
import {useNavigate} from "react-router-dom";
import {useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery} from "../../../store/services/centerBeer.js";

export default function SimilarBottledBeerCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo?.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)
    const navigate = useNavigate()
    const goToBeerPage = (alias) => navigate(`/beer/${alias}/`, {
        state: {from: location.pathname}
    });
    const goToBreweryPage = (alias) => navigate(`/brewery/${alias}/`)
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

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <h6 className={`${styles.cardTextPrimary} ma-h6`} onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)}>{cardInfo?.name}</h6>
                        <p className={`${styles.textActive} ma-p ${styles.breweryAlias}`} onClick={() => goToBreweryPage(cardInfo?.brewery_alias)}>{[cardInfo?.brewery_name, cardInfo?.city, cardInfo?.country].join(", ")}</p>
                    </div>
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                        {cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}
                    </div>

                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                {cardInfo.style && <p className={styles.textActive}><span style={{color: "var(--txt-secondary)"}}>Стиль:</span> {cardInfo.style}</p>}
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Крепость:</p>
                        <p className={`${styles.textMedium} ma-p`}>{formatNumber(cardInfo?.abv)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Плотность:</p>
                        <p className={`${styles.textMedium} ma-p`}>{formatNumber(cardInfo?.og)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Горечь</p>
                        <p className={`${styles.textMedium} ma-p`}>{formatNumber(cardInfo?.ibu)}</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <p className={`${styles.textActive} ma-p`} style={{color: "var(--txt-secondary)"}}> Средняя цена:</p>
                <p className={styles.cardTextPrimary}>{Number(cardInfo?.price).toLocaleString("ru-Ru")}₽</p>
            </div>
        </div>
    )
}

SimilarBottledBeerCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            manufacturer: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            strength: PropTypes.number.isRequired,
            density: PropTypes.number.isRequired,
            bitterness: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number
        })
    ).isRequired
}