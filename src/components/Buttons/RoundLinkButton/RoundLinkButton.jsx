import RoundLinkIcon from "../../../assets/round-link-icon.svg?react"
import styles from "./RoundLinkButton.module.css"

export default function RoundLinkButton({text="Кнопка", onClick = () => {}}){
    return(
        <a className={styles.buttonContainer} onClick={onClick}>
            <p>{text}</p>
            <RoundLinkIcon/>
        </a>
    )
}