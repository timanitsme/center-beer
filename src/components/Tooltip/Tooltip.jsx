import styles from "./Tooltip.module.scss"

export default function Tooltip({text, children}){
    return (
        <div className={styles.tooltipContainer}>
            {children}
            <span className={styles.tooltipText}>{text}</span>
        </div>
    );
}