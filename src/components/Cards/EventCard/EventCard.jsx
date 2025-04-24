import styles from "./EventCard.module.css"
import {useNavigate} from "react-router-dom";

export default function EventCard({cardInfo}){
    const navigate = useNavigate()
    const goToNewsPage = () => navigate("/news/1")

    return(
        <div className={styles.blogCard}>
            <p className={styles.cardTextPrimary} onClick={goToNewsPage}>{cardInfo.title}</p>
            <div className={styles.imageContainer}><img className={styles.cardImg} onClick={goToNewsPage} src={cardInfo.img} alt=""/></div>
            <p className={styles.date}>{cardInfo.date}</p>
            <p className={styles.cardDescription}>{cardInfo.description}</p>
            <div className={styles.tagsRow}>
                {cardInfo.tags.map((tag, index) =>
                    <div key={index} className={styles.tag}><p>{tag}</p></div>
                )}
            </div>
        </div>
    )
}