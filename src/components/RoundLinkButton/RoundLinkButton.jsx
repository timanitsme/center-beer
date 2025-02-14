import RoundLinkIcon from "../../assets/round-link-icon.svg?react"
import styles from "./RoundLinkButton.module.css"

export default function RoundLinkButton({text="Кнопка"}){
    return(
        <a className={styles.buttonContainer}>
            <p>{text}</p>
            <RoundLinkIcon/>
        </a>
    )
}