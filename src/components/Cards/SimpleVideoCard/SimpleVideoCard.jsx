import {useNavigate} from "react-router-dom";
import styles from "./SimpleVideoCard.module.scss";
import PlayButtonIcon from "../../../assets/play-button-icon.svg?react"
import SingleVideoModal from "../../Modals/SingleVideoModal/SingleVideoModal.jsx";
import {useEffect, useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function SimpleVideoCard({cardInfo}){
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [src, setSrc] = useState(cardInfo.video)
    const [imageSrc, setImageSrc] = useState(cardInfo?.preview || cardImagePlaceholder)

    useEffect(() => {
        setSrc(cardInfo.video);
    }, [cardInfo.video]);

    return(
        <>
            <div className={styles.blogCard}>
                <p className={styles.cardTextPrimary}>{cardInfo.title}</p>
                <div className={styles.imageContainer} onClick={() => setShow(true)}>
                    <img className={styles.cardImg} src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
                    <PlayButtonIcon/>
                </div>
            </div>
            <SingleVideoModal show={show} setShow={setShow} src={src} setSrc={setSrc}/>
        </>
    )
}
