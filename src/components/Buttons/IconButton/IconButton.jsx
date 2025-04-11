import styles from "./IconButton.module.css"

export default function IconButton({text, children, style="default", onClick = () => {}}){
    return(
        <button className={`${styles.iconButton} ${style==="secondary"? styles.secondary : ''} ${style === "primary"? styles.primary: ""} ${style === "third"? styles.third: ""}`} onClick={onClick}>
            {children}
            <p>{text}</p>
        </button>
    )
}