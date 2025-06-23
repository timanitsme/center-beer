import styles from "./PartnerCard.module.css"
import RightArrow from "../../../assets/arrow-right-icon.svg?react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function PartnerCard({title, image, description, path}){
    const navigate = useNavigate()
    const [imageSrc, setImageSrc] = useState(image || cardImagePlaceholder)

    return(
        <div className={styles.postCard} onClick={() => navigate(path || "/in-dev/")}>
            <div className={styles.imgContainer}><img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)}/></div>
            <div className={styles.postContent}>
                <h3>{title}</h3>
                <p>{description}</p>
                <div className={styles.flex}>
                    <a href="">Узнать больше</a>
                    <RightArrow/>
                </div>
            </div>

        </div>
    )
}