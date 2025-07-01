import styles from "./RelatedNewsCard.module.scss"
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import {useNavigate} from "react-router-dom";

export default function RelatedNewsCard({cardInfo}){
    const [imageSrc, setImageSrc] = useState(cardInfo?.preview || cardImagePlaceholder)
    const navigate = useNavigate()
    const goToNewsPage = () => navigate(`/news/${cardInfo.id}`)

    return(
        <div className={styles.blogCard}>
            <p className={`${styles.cardTextPrimary} ma-p1`} onClick={goToNewsPage}>{cardInfo.title}</p>
            <img className={styles.cardImg} src={imageSrc} onClick={goToNewsPage} onError={() => setImageSrc(cardImagePlaceholder)} alt=""/>
            <p className={`${styles.cardDescription} ma-p`}>{cardInfo.description}</p>
        </div>
    )
}