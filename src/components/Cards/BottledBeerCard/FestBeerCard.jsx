import {useEffect, useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import styles from "./FestBeerCard.module.css";
import {useNavigate} from "react-router-dom";

export default function FestBeerCard({cardInfo}){
    const formatNumber = (num) => Number(num).toString()
    const [imageSrc, setImageSrc] = useState(cardInfo?.beer_logo || cardImagePlaceholder)
    const navigate = useNavigate()

    useEffect(() => {
        setImageSrc(cardInfo?.beer_logo || cardImagePlaceholder);
    }, [cardInfo?.beer_logo]);

    const goToBeerPage = () => navigate(`/beer/${cardInfo.beer_alias}`, {
        state: {from: location.pathname}
    })

    function decodeHtml(html) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = html;
        return textarea.value;
    }

    return(
        <div className={styles.card}>
            <div className={`${styles.bottledBeerCard} ${styles.round}`}>
                <div className={styles.imgContainer}>
                    <img src={imageSrc} onClick={goToBeerPage} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                </div>
                <div className={styles.cardTop}>
                    <div className={styles.textContainer}>
                        <p className={styles.cardTextPrimary} onClick={goToBeerPage}>{decodeHtml(cardInfo?.beer_name)}</p>
                        <div className={styles.characteristics}>
                            <div>
                                <p className={`${styles.textActive} ${styles.secondary}`}>Крепость:</p>
                                <p className={styles.textActive}>{formatNumber(cardInfo?.abv)}%</p>
                            </div>
                            <div>
                                <p className={`${styles.textActive} ${styles.secondary}`}>Плотность:</p>
                                <p className={styles.textActive}>{formatNumber(cardInfo?.og)}%</p>
                            </div>
                            <div>
                                <p className={`${styles.textActive} ${styles.secondary}`}>Горечь</p>
                                <p className={styles.textActive}>{formatNumber(cardInfo?.ibu)}</p>
                            </div>
                        </div>
                        {/*<p className={styles.textActive}>{[cardInfo?.brewery_name, cardInfo?.city, cardInfo?.country].join(", ")}</p>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}