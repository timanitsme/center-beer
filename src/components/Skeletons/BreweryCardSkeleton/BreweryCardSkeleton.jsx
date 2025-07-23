import styles from "./BreweryCardSkeleton.module.scss"

export default function BreweryCardSkeleton(){
    return(
        <div className={styles.card}>
            <div className={styles.productContainer}>
                <div className={styles.productCard}>
                    <div className={styles.imgContainer}/>
                    <div className={styles.cardContent}>
                        <div>
                            <div className={styles.skeletonTextPrimary}/>
                            <div className={styles.skeletonTextActive}/>
                        </div>
                        <div className={`${styles.cardBottom} ${styles.pc}`}>
                            <div className={styles.bigCircle}></div>
                        </div>
                    </div>
                </div>
                <div className={`${styles.cardBottom} ${styles.mobile}`}>
                    <div className={styles.bigCircle}></div>
                </div>
            </div>
        </div>
    )
}