import styles from "./RelatedNewsCardSkeleton.module.scss"
import {useState} from "react";
import cardImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function RelatedNewsCardSkeleton(){

    return(
        <div className={styles.blogCard}>
            <div className={styles.skeletonTextPrimary} />
            <div className={styles.skeletonImage}/>
            <div className={styles.skeletonTextSecondary}/>
        </div>
    )
}