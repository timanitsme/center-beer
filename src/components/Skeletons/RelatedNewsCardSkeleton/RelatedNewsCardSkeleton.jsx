import styles from "./RelatedNewsCardSkeleton.module.scss"

export default function RelatedNewsCardSkeleton(){

    return(
        <div className={styles.blogCard}>
            <div className={styles.skeletonTextPrimary} />
            <div className={styles.skeletonImage}/>
            <div className={styles.skeletonTextSecondary}/>
        </div>
    )
}