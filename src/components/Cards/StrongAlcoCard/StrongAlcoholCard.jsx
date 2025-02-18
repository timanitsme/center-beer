import {useState} from "react";
import styles from "./StrongAlcoCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import PropTypes from "prop-types";

export default function StrongAlcoholCard ({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    return(
        <div className={styles.card}>
            <div className={styles.strongAlcoholCard}>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={styles.cardTextPrimary}>{cardInfo.title}</p>
                        <p className={styles.textActive}>{cardInfo.description}</p>
                    </div>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                        {cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}
                    </div>

                </div>
                <div className={styles.imgContainer}>
                    <img src={cardInfo.img} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Крепость:</p>
                        <p className={styles.textMedium}>{cardInfo.strength}%</p>
                    </div>
                    {cardInfo.exposure && <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Выдержка:</p>
                        <p className={styles.textMedium}>{cardInfo.exposure}</p>
                    </div>}
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Объем:</p>
                        <p className={styles.textMedium}>{cardInfo.volume} л.</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <p className={styles.cardTextPrimary}>{cardInfo.price.toLocaleString("ru-Ru")}₽</p>
                <IconButton text="Купить"><BottlesPairIcon/></IconButton>
            </div>
        </div>
    )
}

StrongAlcoholCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            strength: PropTypes.number.isRequired,
            exposure: PropTypes.string,
            volume: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            rating: PropTypes.number
        })
    ).isRequired
}