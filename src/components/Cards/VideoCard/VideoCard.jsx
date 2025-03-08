import {useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./VideoCard.module.css";
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg?react";
import FavIcon from "../../../assets/fav-unfill-icon.svg?react";


export default function VideoCard({cardInfo}){
    const [cardBookmarked, setCardBookmarked] = useState(false);
    const [cardFav, setCardFav] = useState(false);
    const navigate = useNavigate();

    const goToBeerPage = () => navigate("/bar/1");

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.imgContainer}>
                    <img src={cardInfo.img} onClick={goToBeerPage} alt=""/>
                </div>
                <div className={styles.characteristics}>
                    <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{cardInfo.title}</p>
                </div>
                <div className={`${styles.iconText} ${styles.loc}`}>
                    <p>{cardInfo.author}</p>
                    <div className={styles.bigCircle}/>
                    <p>{cardInfo.date}</p>
                </div>
            </div>

        </div>
    )
}