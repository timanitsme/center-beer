import {useState} from "react";
import styles from "./BottledBeerCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import BottleIcon from "../../../assets/bottle-icon.svg?react"
import {useNavigate} from "react-router-dom";

export default function BottledBeerCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate()
    const goToBeerPage = () => navigate("/beer/1/")

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{cardInfo.title}</p>
                        <p className={styles.textActive}>{cardInfo.manufacturer}</p>
                    </div>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                        {cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}
                    </div>

                </div>
                <div className={styles.imgContainer}>
                    <img src={cardInfo.img} onClick={goToBeerPage} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                {cardInfo.style && <p className={styles.textActive}><span style={{color: "var(--txt-secondary)"}}>Стиль:</span> {cardInfo.style}</p>}
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Крепость:</p>
                        <p className={styles.textMedium}>{cardInfo.strength}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Плотность:</p>
                        <p className={styles.textMedium}>{cardInfo.density}%</p>
                    </div>
                    <div>
                        <p className={`${styles.textActive} ${styles.secondary}`}>Горечь</p>
                        <p className={styles.textMedium}>{cardInfo.bitterness}</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <p className={styles.cardTextPrimary}>{cardInfo.price}₽</p>
                <IconButton text="Купить"><BottlesPairIcon/></IconButton>
            </div>
        </div>
    )
}

BottledBeerCard.propTypes = {
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