import styles from "./ArrowButton.module.scss"
import ArrowLeftIcon from "../../../assets/arrow-left-icon.svg?react";
import ArrowRightIcon from "../../../assets/arrow-right-icon.svg?react"

export default function ArrowButton({onClick, direction = 'right', className='', withBg = false}){
    return(
        <button onClick={onClick} className={`${styles.arrowButton} ${className}`}>
            {withBg && <span className={styles.buttonBackground}/>}
            {direction === 'left'? <ArrowLeftIcon/> : <ArrowRightIcon/>}
        </button>

    )
}