import styles from "./SimpleButton.module.css"

export default function SimpleButton({text, style="default", textStyle="", onClick=() => {}}){
    return(
        <button className={`${styles.simpleButton} ${style === "secondary"? styles.secondary: ""}`} onClick={onClick}>
            <p className={textStyle === "black"? styles.black: ""}>{text}</p>

        </button>
    )
}