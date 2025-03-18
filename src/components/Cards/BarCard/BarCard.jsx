import {useState} from "react";
import styles from "./BarCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import BottleIcon from "../../../assets/bottle-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";
import PropTypes from "prop-types";
import MetroIcon from "../../../assets/functionalIcons/MetroIcon.jsx";
import LocationIcon from "../../../assets/location-filled-icon.svg?react"
import CommentIcon from "../../../assets/comment-icon.svg?react"
import {useNavigate} from "react-router-dom";


export default function BarCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const navigate = useNavigate();

    const rating = 4.9

    const goToBeerPage = () => navigate(`/bar/${cardInfo.alias}`);

    const getExpensivenessIcons = (expensiveness) => {
        const icons = [];

        for (let i = 0; i < 4; i++) {
            if (i < expensiveness) {
                icons.push(<span key={i} style={{color: "var(--primary)"}}>₽</span>);
            }
            else {
                icons.push(<span key={i}>₽</span>);
            }
        }
        return icons;
    };

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div>
                        <a onClick={() => setCardBookmarked(!cardBookmarked)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                    {/*{cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}*/}
                </div>
                <div className={styles.imgContainer}>
                    <img src={cardInfo.preview} onClick={goToBeerPage} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{cardInfo.name}</p>
                    <p style={{whiteSpace: "nowrap"}}>{getExpensivenessIcons(cardInfo["average_bill_icon"])}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <LocationIcon/>
                    <p>{cardInfo.address}</p>
                </div>
                <div className={`${styles.iconText} ${styles.metro}`}>
                    <MetroIcon color={cardInfo.subway.color}/>
                    <p>{cardInfo.subway.name}</p>
                </div>

                <div className={styles.characteristics}>
                    <div>
                        {rating && <><BottleIcon/> <p className={styles.ratingText}> ({rating.toFixed(1)})</p></>}
                        <div className="circle"/>
                        <CommentIcon/><p>{0}</p>
                    </div>
                    <div>
                        <div className={`${styles.bigCircle} ${cardInfo.closed ? styles.red : styles.green}`}/>
                        <p>{cardInfo.closed? "закрыт":"открыт"}</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

BarCard.propTypes = {
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