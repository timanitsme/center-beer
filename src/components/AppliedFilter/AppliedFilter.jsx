import styles from "./AppliedFilter.module.scss"
import CloseIcon from "../../assets/close-icon.svg?react"

export default function AppliedFilter({children, style="default", onClick = () => {}}){
    return(
        <div className={`${styles.filter} ${style === "secondary"? styles.secondary : ""}`} onClick={onClick}>
            {children}
            <CloseIcon/>
        </div>
    )
}