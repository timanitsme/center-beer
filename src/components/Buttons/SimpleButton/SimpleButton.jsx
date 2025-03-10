import styles from "./SimpleButton.module.css"

export default function SimpleButton({text, style="default" ,onClick=() => {}}){
    return(
        <button className={`${styles.simpleButton} ${style === "secondary"? styles.secondary: ""}`} onClick={onClick}>
            <p>{text}</p>
        </button>
    )
}