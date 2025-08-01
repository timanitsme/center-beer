import {useState} from "react";
import styles from "./BarCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {useLazyAddBarToCuddyQuery, useLazyAddBarToFavQuery} from "../../../store/services/centerBeer.js";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function LightBarCard({cardInfo, title}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);
    const navigate = useNavigate();
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBarToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBarToFavQuery();
    const goToBarPage = (alias) => navigate(`/bar/${alias}`);
    const [imageSrc, setImageSrc] = useState(cardInfo?.preview || cardImagePlaceholder)

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
            <div className={`${styles.bottledBeerCard} ${styles.regular}`}>
                <div className={styles.cardTop}>
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                    {/*{cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}*/}
                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onClick={() => goToBarPage(cardInfo?.alias)} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={`${styles.cardTextPrimary} aa-p2`} onClick={() => goToBarPage(cardInfo?.alias)}>{cardInfo?.name}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p className="aa-p2">{cardInfo?.address}</p>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.verticalFooter}>
                    <p className={`${styles.textActive} aa-p2`}>Стоимость {title} здесь:</p>
                    <p className={`${styles.cardTextPrimary} aa-p2`}>{Number(cardInfo?.price).toLocaleString("ru-Ru")}₽</p>
                </div>
            </div>
        </div>
    )
}

LightBarCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            expensiveness: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
            metro: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            comments: PropTypes.number.isRequired,
            closed: PropTypes.bool.isRequired
        })
    ).isRequired
}