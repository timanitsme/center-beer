import styles from "./DraftBeerCard.module.scss"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import {useState} from "react";
import PropTypes from "prop-types"
import {useLazyAddBeerToCuddyQuery, useLazyAddBeerToFavQuery} from "../../../store/services/centerBeer.js";
import {useNavigate} from "react-router-dom";

export default function DraftBeerCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);

    const formatNumber = (num) => Number(num).toString()
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

    return(
        <div className={styles.card}>
            <div className={styles.draftBeerCard}>
                <div className={styles.cardTop}>
                    <div onClick={() => goToBeerPage(cardInfo?.alias || cardInfo?.beer_alias)} style={{cursor: "pointer"}}>
                        <p className={`${styles.cardTextPrimary} ma-h6`}>{cardInfo?.name}</p>
                        <p className={`${styles.textActive} ma-p ${styles.breweryAlias}`}  onClick={() => goToBreweryPage(cardInfo?.brewery_alias)}>{cardInfo?.brewery}{cardInfo?.brewery && cardInfo?.country && ","} {cardInfo?.country}</p>
                        <p className={`${styles.textMedium} ma-p`}><span style={{color: "var(--txt-secondary)"}} className="ma-p">Стиль:</span> {cardInfo?.style}</p>
                    </div>
                    <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                </div>
                <div className={styles.hrtLine}/>
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Крепость:</p>
                        <p className={`${styles.textActive} ma-p`}>{formatNumber(cardInfo?.abv)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Плотность:</p>
                        <p className={`${styles.textActive} ma-p`}>{formatNumber(cardInfo?.og)}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Горечь</p>
                        <p className={`${styles.textActive} ma-p`}>{formatNumber(cardInfo?.ibu)}</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <p className={`${styles.cardTextPrimary} ma-p`}>{Number(cardInfo.price).toLocaleString("ru-Ru")}₽</p>
                <IconButton text="Купить"><BottlesPairIcon/></IconButton>
                <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
            </div>
        </div>
    )
}

DraftBeerCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            manufacturer: PropTypes.string.isRequired,
            style: PropTypes.string.isRequired,
            strength: PropTypes.number.isRequired,
            density: PropTypes.number.isRequired,
            bitterness: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired
        })
    ).isRequired
}