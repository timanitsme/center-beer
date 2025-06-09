import styles from "./BottledBeerCardSkeleton.module.css"

export default function BottledBeerCardSkeleton() {
    return (
        <div className={styles.card}>
            <div className={styles.bottledBeerCard}>
                <div>
                    <div className={styles.skeletonTextPrimary}></div>
                    <div className={styles.skeletonTextSecondary}></div>
                </div>
                <div className={`${styles.skeletonImage}`}/>
                <div className={styles.characteristics}>
                    <div className={styles.skeletonCharacteristic}></div>
                    <div className={styles.skeletonCharacteristic}></div>
                    <div className={styles.skeletonCharacteristic}></div>
                </div>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.skeletonPrice}></div>
                <div className={styles.skeletonBuyButton}></div>
            </div>
        </div>
    );
}