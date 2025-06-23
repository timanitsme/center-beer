import styles from "./PostCard.module.css"
import PostImage1 from "../../../assets/postsMocks/post-image-1.svg";
import DiagonalArrow from "../../../assets/arrow-diagonal-icon.svg?react"
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function PostCard({title, image, description}){
    const [imageSrc, setImageSrc] = useState(image || cardImagePlaceholder)

    return(
        <div className={styles.postCard}>
            <h3>{title}</h3>
            <div className={styles.imgContainer}><img src={imageSrc} onError={() => setImageSrc(cardImagePlaceholder)}/></div>
            <p>{description}</p>
            <a href="">Открыть статью<DiagonalArrow/></a>
        </div>
    )
}