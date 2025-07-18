import styles from "./AssetCard.module.scss"
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import SimpleButton from "../../Buttons/SimpleButton/SimpleButton.jsx";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function AssetCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardImagePlaceholder)
    const goToBreweryPage = () => navigate("/brewery/1");

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
                                <p className={styles.cardTextPrimary} onClick={goToBreweryPage}>{cardInfo.title}</p>
                                <p className={styles.textActive}>{cardInfo.address}</p>
                            </div>
                            <div>
                                <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                            </div>
                        </div>
                        <div className={`${styles.cardBottom} ${styles.pc}`}>
                            <SimpleButton style="secondary" text="Описание"></SimpleButton>
                            <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBottom} ${styles.mobile}`}>
                    <SimpleButton style="secondary" text="Описание"></SimpleButton>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>


            </div>


        </div>
    )
}

/*AssetCard.propTypes = {
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
}*/