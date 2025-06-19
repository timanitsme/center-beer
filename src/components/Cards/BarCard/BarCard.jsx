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
import {useLazyAddBarToCuddyQuery, useLazyAddBarToFavQuery} from "../../../store/services/centerBeer.js";
import BarMock1 from "../../../assets/barsMocks/bar-1.svg"
import BarMock2 from "../../../assets/barsMocks/bar-2.svg"
import BarMock3 from "../../../assets/barsMocks/bar-3.svg"
import BarMock4 from "../../../assets/barsMocks/bar-4.svg"
import BarMock5 from "../../../assets/barsMocks/bar-5.svg"


export default function BarCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(cardInfo.is_favor || false);
    const [cardFav, setCardFav] = useState(cardInfo?.is_liked || false);
    const navigate = useNavigate();
    const today = new Date()
    const dayOfWeek = today.getDay()
    const rating = 4.9
    const [triggerAddToCuddy, { isLoading: addToCuddyIsLoading }] = useLazyAddBarToCuddyQuery();
    const [triggerAddToFav, { isLoading: addToFavIsLoading }] = useLazyAddBarToFavQuery();

    const getDayOfWeek = () =>  dayOfWeek === 0? 6: dayOfWeek-1

    const goToBeerPage = () => navigate(`/bar/${cardInfo.alias}`, {
        state: {from: location.pathname}
    });

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

    const handleAddToCuddy = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToCuddy(id).unwrap();
            setCardBookmarked(!cardBookmarked)
        } catch (err) {
            console.log(`add to cuddy error: ${err}`)
        }
    }

    const handleAddToFav = async (event, id) => {
        event.preventDefault();
        try {
            await triggerAddToFav(id).unwrap();
            setCardFav(!cardFav)
        } catch (err) {
            console.log(`add to fav error: ${err}`)
        }
    }

    const imageMapping = {
        "13rules_nabereznie_chelny": BarMock1,
        "13rules_krasnodar_1_may_196": BarMock2,
        "13rules_zvezdniy_bulvar": BarMock3,
        "13rules_tula": BarMock4,
        "13rules_naberezhnie_chelny": BarMock5,
    }

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.cardTop}>
                    <div>
                        <a onClick={(e) => handleAddToCuddy(e, cardInfo?.id)} className={`${styles.bookMarkButton} ${cardBookmarked && styles.added}`}><BookMarkIcon/></a>
                    </div>
                    {/*{cardInfo.rating && <p className={styles.ratingText}><BottleIcon/> ({cardInfo.rating.toFixed(1)})</p>}*/}
                </div>
                <div className={styles.imgContainer}>
                    <img src={imageMapping[cardInfo.alias] || cardInfo.preview} onClick={goToBeerPage} alt=""/>
                    <a onClick={(e) => handleAddToFav(e, cardInfo?.id)} className={`${styles.favButton} ${cardFav? styles.added : ''}`}><FavIcon/></a>
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
                        <div className={`${styles.bigCircle} ${cardInfo?.work_time_list[getDayOfWeek()]?.active? styles.green : styles.red}`}/>
                        <p>{cardInfo?.work_time_list[getDayOfWeek()]?.active? "открыт":"закрыт"}</p>
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