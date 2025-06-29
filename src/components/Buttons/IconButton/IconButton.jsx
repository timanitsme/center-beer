import styles from "./IconButton.module.scss"

export default function IconButton({text, children, style="default", onClick = () => {}}){
    const buttonStyles = {"secondary": styles.secondary, "primary": styles.primary, "third": styles.third, "third-primary": styles.thirdPrimary, "primary-third": styles.primaryThird }

    return(
        <button className={`${styles.iconButton} ${buttonStyles[style]}`} onClick={onClick}>
            {children}
            <p className="ma-p">{text}</p>
        </button>
    )
}