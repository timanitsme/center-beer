import styles from "./PartnerCard.module.css"
import RightArrow from "../../../assets/arrow-right-icon.svg?react";

export default function PartnerCard({title, image, description}){
    return(
        <div className={styles.postCard}>
            <div className={styles.imgContainer}><img src={image}/></div>
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