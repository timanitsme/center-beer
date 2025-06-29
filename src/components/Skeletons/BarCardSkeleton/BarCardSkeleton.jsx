import styles from "./BarCardSkeleton.module.scss"

export default function BarCardSkeleton(){
    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.skeletonImage}/>
                <div className={styles.characteristics}>
                    <div className={styles.skeletonTextPrimary}/>
                    <div className={styles.skeletonBill}/>
                </div>
                <div className={styles.skeletonTextSecondary}/>
                <div className={styles.skeletonTextSecondary}/>
                <div className={styles.characteristics}>
                    <div>
                        <div className={styles.skeletonRating}/>
                        <div className={styles.bigCircle}/>
                        <div className={styles.skeletonComment}/>
                    </div>
                    <div>
                        <div className={styles.bigCircle}/>
                    </div>
                </div>

            </div>
        </div>
    )
}