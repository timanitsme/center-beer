import styles from "./LatestReviews.module.scss";
import LatestReviewCard from "../Cards/LatestReviewCard/LatestReviewCard.jsx";


export default function LatestReviews(){

    return(
        <div className={styles.ordersSection}>
            <div className={styles.headerRow}>
                <h3 className="ma-h3">Последние отзывы</h3>
                <a href="" className="ma-p"><p>Все отзывы (16)</p></a>
            </div>
            <LatestReviewCard></LatestReviewCard>
        </div>
    )
}