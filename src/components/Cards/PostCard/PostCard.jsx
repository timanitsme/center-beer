import styles from "./PostCard.module.scss"
import DiagonalArrow from "../../../assets/arrow-diagonal-icon.svg?react"
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function PostCard({title, image, description}){
    const [imageSrc, setImageSrc] = useState(image || cardImagePlaceholder)

    return(
        <div className={styles.postCard}>
            <h3 className="ma-h3-small">{title}</h3>
            <div className={styles.imgContainer}><img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)}/></div>
            <p className="ma-p">{description}</p>
            <a href="" className="ma-p">Открыть статью<DiagonalArrow/></a>
        </div>
    )
}