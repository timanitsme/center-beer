import styles from "./PartnerCard.module.scss"
import RightArrow from "../../../assets/arrow-right-icon.svg?react";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function PartnerCard({title, image, description, path}){
    const navigate = useNavigate()
    const [imageSrc, setImageSrc] = useState(image || cardImagePlaceholder)

    return(
        <div className={styles.postCard} onClick={() => navigate(path || "/in-dev/")}>
            <div className={styles.imgContainer}><img src={imageSrc} loading="lazy" onError={() => setImageSrc(cardImagePlaceholder)}/></div>
            <div className={styles.postContent}>
                <h3 className="ma-h3-small">{title}</h3>
                <p className="ma-p1">{description}</p>
                <div className={styles.flex}>
                    <a href="" className="ma-p">Узнать больше</a>
                    <RightArrow/>
                </div>
            </div>

        </div>
    )
}