import styles from "./NewsCardSkeleton.module.css"

export default function NewsCardSkeleton(){
    return(
        <div className={styles.blogCard}>
            <div className={styles.skeletonTextPrimary}/>
            <div className={styles.skeletonImage}></div>
            <div className={styles.skeletonTextSecondary}/>
            <div className={styles.tagsRow}>
                <div className={styles.tagSkeleton}></div>
                <div className={styles.tagSkeleton}></div>
            </div>
        </div>
    )
}