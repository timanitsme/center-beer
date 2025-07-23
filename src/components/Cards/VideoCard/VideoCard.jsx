import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./VideoCard.module.scss";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import PlayButtonIcon from "../../../assets/play-button-icon.svg?react";


export default function VideoCard({cardInfo, onShow}){
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(cardInfo?.img || cardImagePlaceholder)
    const [show, setShow] = useState(false)
    const [src, setSrc] = useState(cardInfo.video)
    const goToBeerPage = () => navigate("/bar/1");

    useEffect(() => {
        setSrc(cardInfo.video);
    }, [cardInfo.video]);

    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard} >
                <div className={styles.imgContainer} onClick={() => onShow(src)}>
                    <img src={imageSrc} onError={() => setImageSrc(imageSrc)} alt=""/>
                    <PlayButtonIcon/>
                </div>
                <div className={styles.characteristics}>
                    <p className={`${styles.cardTextPrimary} aa-p2`}>{cardInfo.title}</p>
                </div>
            </div>
        </div>
    )
}