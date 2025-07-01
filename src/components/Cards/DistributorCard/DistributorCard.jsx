import {useState} from "react";
import styles from "./DistributorCard.module.scss";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import {useNavigate} from "react-router-dom";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";


export default function DistributorCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardImagePlaceholder)

    const goToDistributorPage = () => navigate("/will-be-soon"); // distributor/1

    return(
        <div className={styles.card}>
            <div className={styles.productContainer}>
                <div className={styles.productCard}>
                    <div className={styles.imgContainer} onClick={goToDistributorPage}>
                        <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.cardTop}>
                            <div className={styles.textContainer}>
                                <h6 className={`${styles.cardTextPrimary} ma-h6`} onClick={goToDistributorPage}>{cardInfo.title}</h6>
                                <p className={`${styles.textActive} text-min`}>{cardInfo.address}</p>
                            </div>
                            <div>
                                <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                            </div>
                        </div>
                        <div className={`${styles.cardBottom} ${styles.pc}`}>
                            <div className={styles.productsRow}>
                                {cardInfo.options.map((option, index) =>
                                    <div key={index} className={styles.product}><p className="text-small">{option}</p></div>
                                )}
                            </div>
                            <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBottom} ${styles.mobile}`}>
                    <div className={styles.productsRow}>
                        {cardInfo.options.map((option, index) =>
                            <div key={index} className={styles.product}><p className="text-small">{option}</p></div>
                        )}
                    </div>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>


            </div>


        </div>
    )
}

DistributorCard.propTypes = {
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