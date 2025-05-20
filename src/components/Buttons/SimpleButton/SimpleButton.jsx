import styles from "./SimpleButton.module.css"

export default function SimpleButton({text, style="default", textStyle="", onClick=() => {}, withBg=true}){
    return(
        <button className={`${styles.simpleButton} ${style === "secondary"? styles.secondary: ""} ${style === "third"? styles.third: ""} ${!withBg? styles.wthBg: ''}`} onClick={onClick}>
            <p className={textStyle === "black"? styles.black: ""}>{text}</p>
        </button>
    )
}