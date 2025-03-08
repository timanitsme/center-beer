import styles from "./PostCard.module.css"
import PostImage1 from "../../../assets/postsMocks/post-image-1.svg";
import DiagonalArrow from "../../../assets/arrow-diagonal-icon.svg?react"

export default function PostCard({title, image, description}){
    return(
        <div className={styles.postCard}>
            <h3>{title}</h3>
            <div className={styles.imgContainer}><img src={image}/></div>
            <p>{description}</p>
            <a href="">Открыть статью<DiagonalArrow/></a>
        </div>
    )
}