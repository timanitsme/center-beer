import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "../../BarCard/BarCard.module.css";
import BookMarkIcon from "../../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../../assets/fav-unfill-icon.svg?react";
import LocationIcon from "../../../../assets/location-filled-icon.svg?react";
import MetroIcon from "../../../../assets/functionalIcons/MetroIcon.jsx";
import BottleIcon from "../../../../assets/bottle-icon.svg?react";
import CommentIcon from "../../../../assets/comment-icon.svg?react";
import PropTypes from "prop-types";
import Bar1 from "../../../../assets/barsMocks/bar-1.svg"
import CalendarIcon from "../../../../assets/calendar-icon.svg?react"
import BottlesPairIcon from "../../../../assets/bottles-pair-icon.svg?react"

export default function BarCheckInCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const navigate = useNavigate();
    const today = new Date()
    const dayOfWeek = today.getDay()
    const rating = 4.9

    const getDayOfWeek = () =>  dayOfWeek === 0? 6: dayOfWeek-1

    /*const goToBeerPage = () => navigate(`/bar/${cardInfo.alias}`);*/

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
                    <img src={Bar1} alt=""/>
                    <a onClick={() => setCardFav(!cardFav)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
                </div>
                <div className={styles.characteristics}>
                    <p className={styles.cardTextPrimary}>13 RULES (Народный бар)</p>
                    <p style={{whiteSpace: "nowrap"}}>{getExpensivenessIcons(4)}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <LocationIcon/>
                    <p>г.Москва, Сущевский вал, 41</p>
                </div>
                <div className={`${styles.iconText} ${styles.metro}`}>
                    <MetroIcon color="var(--txt-active)"/>
                    <p>Лубянка, Сретенский бульвар</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <CalendarIcon/>
                    <p>Первое посещение: <span style={{color: "var(--txt-active)"}}>24.04.2025</span></p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p>Количество посещений: <span style={{color: "var(--txt-active)"}}>21</span></p>
                </div>

                <div className={styles.characteristics}>
                    <div>
                        {rating && <><BottleIcon/> <p className={styles.ratingText}> ({rating.toFixed(1)})</p></>}
                        <div className="circle"/>
                        <CommentIcon/><p>{0}</p>
                    </div>
                    <div>
                        <div className={`${styles.bigCircle} ${styles.green}`}/>
                        <p>открыт</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

BarCheckInCard.propTypes = {
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