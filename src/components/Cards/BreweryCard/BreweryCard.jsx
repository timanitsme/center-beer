import {useState} from "react";
import styles from "./BreweryCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"
import BottleIcon from "../../../assets/bottle-icon.svg?react";

export default function BreweryCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.logo || cardImagePlaceholder)
    const rating = cardInfo?.cb_rating === 0? Number(cardInfo?.untappd_rating): cardInfo.cb_rating;

    const goToBreweryPage = () => navigate(`/brewery/${cardInfo?.alias}`);

    const options = [
        "smthn", "smthn","smthn","smthn","smthn","smthn",
    ]

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
                                <p className={`${styles.cardTextPrimary} ma-h6`} onClick={goToBreweryPage}>{cardInfo?.name}</p>
                                <p className={`${styles.textActive} ma-p`}>{[cardInfo?.country, cardInfo?.city].join(", ")}</p>
                            </div>
                            <div>
                                <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                            </div>
                        </div>
                        <div className={`${styles.cardBottom} ${styles.pc}`}>
                            <div className={styles.productsRow}>
                                {cardInfo?.options?.length > 0 && cardInfo?.options.map((option, index) =>
                                    <div key={index} className={styles.product}><p className="text-small">{option}</p></div>
                                )}
                            </div>
                            <div className={styles.rating}>{<><BottleIcon/> <p className={`${styles.ratingText} aa-p2`} > ({rating?.toFixed(1)})</p></>}</div>
                            <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBottom} ${styles.mobile}`}>
                    <div className={styles.productsRow}>
                        {cardInfo?.options?.length > 0 && cardInfo?.options.map((option, index) =>
                            <div key={index} className={styles.product}><p className="text-small">{option}</p></div>
                        )}
                    </div>
                    <div className={styles.rating}>{<><BottleIcon/> <p className={`${styles.ratingText} aa-p2`} > ({rating?.toFixed(1)})</p></>}</div>
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