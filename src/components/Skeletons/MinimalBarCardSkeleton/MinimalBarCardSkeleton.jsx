import styles from "./MinimalBarCardSkeleton.module.scss";

export default function MinimalBarCardSkeleton(){
    return(
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={styles.skeletonImage}/>
                <div className={styles.skeletonTextPrimary}/>
                <div className={styles.skeletonTextSecondary}/>
            </div>
        </div>
    )
}