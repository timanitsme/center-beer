import {useState} from "react";
import styles from "./BreweryCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function BreweryCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.logo || cardImagePlaceholder)

    const goToBreweryPage = () => navigate(`/brewery/${cardInfo?.alias}`);

    return(
        <div className={styles.card}>
            <div className={styles.productContainer}>
                <div className={styles.productCard}>
                    <div className={styles.imgContainer} onClick={goToBreweryPage}>
                        <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.cardTop}>
                            <div className={styles.textContainer}>
                                <p className={styles.cardTextPrimary} onClick={goToBreweryPage}>{cardInfo?.name}</p>
                                <p className={styles.textActive}>{cardInfo?.country}</p>
                            </div>
                            <div>
                                <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                            </div>
                        </div>
                        <div className={`${styles.cardBottom} ${styles.pc}`}>
                            <div className={styles.productsRow}>
                                {cardInfo?.options?.length > 0 && cardInfo?.options.map((option, index) =>
                                    <div key={index} className={styles.product}><p>{option}</p></div>
                                )}
                            </div>
                            <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBottom} ${styles.mobile}`}>
                    <div className={styles.productsRow}>
                        {cardInfo?.options?.length > 0 && cardInfo?.options.map((option, index) =>
                            <div key={index} className={styles.product}><p>{option}</p></div>
                        )}
                    </div>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>


            </div>


        </div>
    )
}

BreweryCard.propTypes = {
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