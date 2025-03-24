import {useState} from "react";
import styles from "./ProductCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import PropTypes from "prop-types";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function ProductCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo.is_liked || false);
    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)
    return(
        <div className={styles.card}>
            <div className={styles.productCard}>
                <div className={`${styles.imgContainer} ${imageSrc === cardImagePlaceholder? styles.third : ''}`}>
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                </div>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={`${styles.cardTextPrimary} ${styles.cardTitle}`}>{cardInfo?.name}</p>
                        <p className={`${styles.textActive} ${styles.description}`}>{cardInfo.description}</p>
                    </div>
                    <div className={styles.bookMarkContainer}>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>

                </div>


            </div>
            <div className={styles.cardFooter}>
                <p className={styles.textActive}><span style={{color: "var(--txt-secondary)"}}>Вес:</span> {cardInfo.vol}</p>
                <div className={styles.cardFooterLeft}>
                    <p className={styles.cardTextPrimary}>{Number(cardInfo.price).toLocaleString("ru-Ru")}₽</p>
                    <IconButton text="Купить"><BottlesPairIcon/></IconButton>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            weight: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            weightSpan: PropTypes.string
        })
    ).isRequired,
}