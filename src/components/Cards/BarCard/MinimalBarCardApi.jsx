import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./BarCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import {useLazyAddBarToCuddyQuery, useLazyAddBarToFavQuery} from "../../../store/services/centerBeer.js";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function MinimalBarCardApi({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBarToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBarToFavQuery();
    const [imageSrc, setImageSrc] = useState(cardInfo?.preview || cardImagePlaceholder)
    const goToBeerPage = () => navigate(`/bar/${cardInfo?.alias}`, {
        state: {from: location.pathname}
    });

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
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onClick={goToBeerPage} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={`${styles.cardTextPrimary} aa-p2`} onClick={goToBeerPage}>{cardInfo.name}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p className={`aa-p2`}>{cardInfo.city}</p>
                </div>
            </div>
        </div>
    )
}