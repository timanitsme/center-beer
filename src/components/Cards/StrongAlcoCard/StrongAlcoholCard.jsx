import {useState} from "react";
import styles from "./StrongAlcoCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import PropTypes from "prop-types";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"


export default function StrongAlcoholCard ({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)

    return(
        <div className={styles.card}>
            <div className={styles.strongAlcoholCard}>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={`${styles.cardTextPrimary} ma-h6`}>{cardInfo?.name}</p>
                        <p className={`${styles.textActive} ma-p`}>{[cardInfo?.alc_type, cardInfo?.country].join(", ")}</p>
                    </div>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                        {cardInfo?.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo?.rating.toFixed(1)})</p>}
                    </div>

                </div>
                <div className={`${styles.imgContainer} ${imageSrc === cardImagePlaceholder? styles.third : ''}`}>
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Крепость:</p>
                        <p className={`${styles.textActive} ma-p`}>{formatNumber(cardInfo?.abv)}%</p>
                    </div>
                    {cardInfo.age && <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Выдержка:</p>
                        <p className={`${styles.textActive} ma-p`}>{cardInfo?.age}</p>
                    </div>}
                    <div>
                        <p className={`${styles.textActive} aa-p2 ${styles.secondary}`}>Объем:</p>
                        <p className={`${styles.textActive} ma-p`}>{cardInfo?.vol}</p>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <p className={styles.cardTextPrimary}>{Number(cardInfo.price).toLocaleString("ru-Ru")}₽</p>
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