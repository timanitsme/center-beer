import RoundLinkIcon from "../../../assets/round-link-icon.svg?react"
import styles from "./RoundLinkButton.module.scss"

export default function RoundLinkButton({text="Кнопка", onClick = () => {}}){
    return(
        <a className={styles.buttonContainer} onClick={onClick}>
            <p className="ma-p">{text}</p>
            <RoundLinkIcon/>
        </a>
    )
}