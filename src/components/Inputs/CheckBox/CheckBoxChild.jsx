import styles from "./CheckBox.module.scss"
import CheckMarkIcon from "../../../assets/checkmark-icon.svg?react"

export default function CheckBoxChild({children, checked, setChecked}){
    return(
        <label className={styles.customCheckbox}>
            <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)}/>
            <span className={styles.checkmark}>
                <CheckMarkIcon/>
            </span>
            <>{children}</>
        </label>
    );
}