import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../BarCard/BarCard.module.scss";
import BookMarkIcon from "../../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../../assets/fav-unfill-icon.svg?react";
import LocationIcon from "../../../../assets/location-filled-icon.svg?react";
import MetroIcon from "../../../../assets/functionalIcons/MetroIcon.jsx";
import BottleIcon from "../../../../assets/bottle-icon.svg?react";
import CommentIcon from "../../../../assets/comment-icon.svg?react";
import PropTypes from "prop-types";
import Bar1 from "../../../../assets/barsMocks/bar-1.svg"
import CalendarIcon from "../../../../assets/calendar-icon.svg?react"
import cardImagePlaceholder from "../../../../assets/placeholders/card-image-placeholder.svg"

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

export default function BarCheckInCardApi({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const navigate = useNavigate();
    const today = new Date()
    const dayOfWeek = today.getDay()

    const [imageSrc, setImageSrc] = useState(cardInfo?.photo || cardImagePlaceholder)
    /*const goToBeerPage = () => navigate(`/bar/${cardInfo.alias}`);*/

    const getExpensivenessIcons = (expensiveness) => {
        const icons = [];

        for (let i = 0; i < 4; i++) {
            if (i < expensiveness) {
                icons.push(<span key={i} className="aa-p2" style={{color: "var(--primary)"}}>₽</span>);
            }
            else {
                icons.push(<span key={i} className="aa-p2">₽</span>);
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
                    <img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={`${styles.cardTextPrimary} aa-p2`}>{cardInfo?.name}</p>
                    <p style={{whiteSpace: "nowrap"}} className="aa-p2">{getExpensivenessIcons(cardInfo?.average_bill)}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <LocationIcon/>
                    <p className="aa-p2">{cardInfo?.address}</p>
                </div>
                <div className={`${styles.iconText} ${styles.metro}`}>
                    <MetroIcon color="var(--txt-active)"/>
                    <p className="aa-p2">{cardInfo?.nearest_subway}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <CalendarIcon/>
                    <p className="aa-p2">Первое посещение: <span className="aa-p2" style={{color: "var(--txt-active)"}}>{formatDate(cardInfo?.first_checkin_at)}</span></p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p className="aa-p2">Количество чек-инов: <span className="aa-p2" style={{color: "var(--txt-active)"}}>{cardInfo?.user_checkins_count}</span></p>
                </div>

                <div className={styles.characteristics}>
                    <div>
                        {cardInfo?.rating && <><BottleIcon/> <p className={`${styles.ratingText} aa-p2`}> ({cardInfo.rating.toFixed(1)})</p></>}
                        <div className="circle"/>
                        <CommentIcon/><p className="aa-p2">{cardInfo?.comments_count || 0}</p>
                    </div>
                    <div style={{width: "5px"}}></div>
                    <div>
                        {cardInfo?.is_open?
                        <>
                            <div className={`${styles.bigCircle} ${styles.green}`}/>
                            <p className="aa-p2">открыт</p>
                        </>:
                        <>
                            <div className={`${styles.bigCircle} ${styles.red}`}/>
                            <p className="aa-p2">закрыт</p>
                        </>
                        }

                    </div>
                </div>

            </div>
        </div>
    )
}

BarCheckInCardApi.propTypes = {
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