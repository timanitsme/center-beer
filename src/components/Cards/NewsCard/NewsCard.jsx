import styles from "./NewsCard.module.css"
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";

export default function NewsCard({cardInfo}){
    const navigate = useNavigate()
    const goToNewsPage = () => navigate(`/news/${cardInfo.id}`)


    const getFormattedDate = (create_date) => {
        const date = new Date(create_date);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    }



    return(
        <div className={styles.blogCard}>
            <p className={styles.cardTextPrimary} onClick={goToNewsPage}>{cardInfo.title}</p>
            <div className={styles.imageContainer}><img className={styles.cardImg} onClick={goToNewsPage} src={cardInfo.preview} alt=""/></div>
            <p>{cardInfo?.create_date && getFormattedDate(cardInfo.create_date)}</p>
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