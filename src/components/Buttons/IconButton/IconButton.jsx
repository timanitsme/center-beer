import styles from "./IconButton.module.css"

export default function IconButton({text, children, style="default"}){
    return(
        <button className={`${styles.iconButton} ${style==="secondary"? styles.secondary : ''}`}>
            {children}
            <p>{text}</p>
        </button>
    )
}