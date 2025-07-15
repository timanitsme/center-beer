import styles from "./MinimalBottledBeerCardSkeleton.module.scss"

export default function MinimalBottledBeerCardSkeleton(){
    return (
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div className={`${styles.skeletonImage}`}/>
                <div>
                    <div className={styles.skeletonTextPrimary}></div>
                    <div className={styles.skeletonTextSecondary}></div>
                </div>
            </div>

        </div>
    );
}