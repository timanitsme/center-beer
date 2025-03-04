import styles from "./NewsCard.module.css"
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

export default function NewsCard({cardInfo}){
    const navigate = useNavigate()
    const goToNewsPage = () => navigate("/news/1")

    return(
        <div className={styles.blogCard}>
            <p className={styles.cardTextPrimary} onClick={goToNewsPage}>{cardInfo.title}</p>
            <div className={styles.imageContainer}><img className={styles.cardImg} onClick={goToNewsPage} src={cardInfo.img} alt=""/></div>
            <p>{cardInfo.date}</p>
            <p className={styles.cardDescription}>{cardInfo.description}</p>
            <div className={styles.tagsRow}>
                {cardInfo.tags.map((tag, index) =>
                    <div key={index} className={styles.tag}><p>{tag}</p></div>
                )}
            </div>
        </div>
    )
}

NewsCard.propTypes = {
    cardInfo: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            img: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        })
    ).isRequired
}