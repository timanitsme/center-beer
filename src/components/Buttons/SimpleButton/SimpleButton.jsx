import styles from "./SimpleButton.module.css"

export default function SimpleButton({text, onClick=() => {}}){
    return(
        <button className={styles.simpleButton} onClick={onClick}>
            <p>{text}</p>
        </button>
    )
}