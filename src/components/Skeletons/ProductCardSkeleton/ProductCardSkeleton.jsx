import styles from "./ProductCardSkeleton.module.css"

export default function ProductCardSkeleton(){
    return(
        <div className={styles.card}>
            <div className={styles.productCard}>
                <div className={styles.imgContainer}></div>
                <div className={styles.cardTop}>
                    <div className={styles.skeletonTextPrimary}></div>
                    <div className={styles.skeletonTextActive}></div>
                    <div className={styles.skeletonTextActive}></div>
                    <div className={styles.skeletonTextActive}></div>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.skeletonTextSecondary}></div>
                <div className={styles.cardFooterLeft}>
                    <div className={styles.skeletonPrice}></div>
                    <div className={styles.skeletonBuyButton}></div>
                    <div className={styles.bigCircle}></div>
                </div>
            </div>
        </div>
    )
}