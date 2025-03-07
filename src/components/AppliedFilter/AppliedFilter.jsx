import styles from "./AppliedFilter.module.css"
import CloseIcon from "../../assets/close-icon.svg?react"
import LocationFilledIcon from "../../assets/location-filled-icon.svg?react"

export default function AppliedFilter({children, style="default", onClick = () => {}}){
    return(
        <div className={`${styles.filter} ${style === "secondary"? styles.secondary : ""}`} onClick={onClick}>
            {children}
            <CloseIcon/>
        </div>
    )
}