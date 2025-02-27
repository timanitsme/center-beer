import {useState} from "react";
import styles from "./BarCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";


export default function MinimalBarCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();

    const goToBeerPage = () => navigate("/bar/1");

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                </div>
                <div className={styles.imgContainer}>
                    <img src={cardInfo.img} onClick={goToBeerPage} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{cardInfo.title}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p>{cardInfo.address}</p>
                </div>
            </div>

        </div>
    )
}

MinimalBarCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            expensiveness: PropTypes.number.isRequired,
            address: PropTypes.string.isRequired,
            metro: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            comments: PropTypes.number.isRequired,
            closed: PropTypes.bool.isRequired
        })
    ).isRequired
}