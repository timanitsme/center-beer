import Bottle1 from "../../assets/bottlesMock/bottle-1.svg";
import styles from "./LatestReviews.module.scss";
import LatestReviewCard from "../Cards/LatestReviewCard/LatestReviewCard.jsx";


export default function LatestReviews(){

    return(
        <div className={styles.ordersSection}>
            <div className={styles.headerRow}>
                <h3>Последние отзывы</h3>
                <a href=""><p>Все отзывы (16)</p></a>
            </div>
            <LatestReviewCard></LatestReviewCard>
        </div>
    )
}