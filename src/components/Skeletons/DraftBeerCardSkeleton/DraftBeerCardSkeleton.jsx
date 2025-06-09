import styles from "./DraftBeerCardSkeleton.module.css"
import BookMarkIcon from "../../../assets/bookmark-unfill-icon.svg";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg";
import FavIcon from "../../../assets/fav-unfill-icon.svg";

export default function DraftBeerCardSkeleton(){
    return(
        <div className={styles.card}>
            <div className={styles.draftBeerCard}>
                <div className={styles.cardTop}>
                        <div className={styles.skeletonTextPrimary}/>
                        <div className={styles.skeletonTextActive}/>
                        <div className={styles.skeletonTextSecondary}/>
                </div>
                <div className={styles.hrtLine}/>
                <div className={styles.characteristics}>
                    <div>
                        <div className={styles.characteristicTitle}/>
                        <div className={styles.characteristicDescription}/>
                    </div>
                    <div>
                        <div className={styles.characteristicTitle}/>
                        <div className={styles.characteristicDescription}/>
                    </div>
                    <div>
                        <div className={styles.characteristicTitle}/>
                        <div className={styles.characteristicDescription}/>
                    </div>
                </div>

            </div>
            <div className={styles.cardFooter}>
                <div className={styles.skeletonPrice}/>
                <div className={styles.skeletonBuyButton}/>
                <div className={styles.bigCircle}/>
            </div>
        </div>
    )

}