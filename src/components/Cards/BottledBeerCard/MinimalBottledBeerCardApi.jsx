import {useEffect, useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import styles from "./BottledBeerCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import {useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery} from "../../../store/services/centerBeer.js";
import {useNavigate} from "react-router-dom";

export default function MinimalBottledBeerCardApi({cardInfo}){
    console.log(JSON.stringify(cardInfo))
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo?.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBeerToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBeerToFavQuery();
    const navigate = useNavigate()
    const goToBeerPage = (alias) => navigate(`/beer/${alias}/`, {
        state: {from: location.pathname}
    })
    const goToBreweryPage = (alias) => navigate(`/brewery/${alias}/`)

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
        setImageSrc(cardInfo?.photo || cardImagePlaceholder);
    }, [cardInfo?.photo]);

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
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt="" onClick={() => goToBeerPage(cardInfo?.alias)}/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <div className={styles.primaryContainer}><h6 title={cardInfo?.name} className={`${styles.cardTextPrimary} ma-h6`} onClick={() => goToBeerPage(cardInfo?.alias)}>{cardInfo?.name}</h6></div>
                        <p className={`${styles.textActive} ma-p ${styles.breweryAlias}`} title={`${[cardInfo?.brewery?.name].join(", ")}`} onClick={() => goToBreweryPage(cardInfo?.brewery?.alias)}>{[cardInfo?.brewery?.name].join(", ")}</p>
                    </div>
                    <div>
                        <div style={{height: "25px"}}></div>
                        {cardInfo.rating && <p className={`${styles.ratingText} ma-p`}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}