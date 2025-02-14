import styles from "./ArrowButton.module.css"
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react";
import ArrowRightIcon from "../../../assets/arrow-right-icon.svg?react"

export default function ArrowButton({onClick, direction = 'right'}){
    return(
        <button onClick={onClick} className={styles.arrowButton}>{direction === 'left'? <ArrowLeftIcon/> : <ArrowRightIcon/>}</button>
    )
}