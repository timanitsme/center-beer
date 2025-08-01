import styles from "./SimpleButton.module.scss"

export default function SimpleButton({text, style="default", textStyle="", onClick=() => {}, withBg=true, disabled=false}){
    return(
        <button disabled={disabled} className={`${styles.simpleButton} ${style === "secondary"? styles.secondary: ""} ${style === "third"? styles.third: ""} ${!withBg? styles.wthBg: ''}`} onClick={onClick}>
            <p className={`${textStyle === "black"? styles.black: ""} ma-p`}>{text}</p>
        </button>
    )
}