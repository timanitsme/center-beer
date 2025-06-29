import styles from "./CheckBox.module.scss"
import CheckMarkIcon from "../../../assets/checkmark-icon.svg?react"

export default function CheckBox({text = "Пиво"}){
    return(
        <label className={styles.customCheckbox}>
            <input type="checkbox"/>
            <span className={styles.checkmark}>
                <CheckMarkIcon/>
            </span>
            <p>{text}</p>
        </label>
    );
}