import styles from "./CheckBox.module.css"
import CheckMarkIcon from "../../../assets/checkmark-icon.svg?react"

export default function CheckBoxChild({children}){
    return(
        <label className={styles.customCheckbox}>
            <input type="checkbox"/>
            <span className={styles.checkmark}>
                <CheckMarkIcon/>
            </span>
            <p>{children}</p>
        </label>
    );
}