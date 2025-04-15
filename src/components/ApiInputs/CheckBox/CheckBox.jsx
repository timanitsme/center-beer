import styles from "./CheckBox.module.css"
import CheckMarkIcon from "../../../assets/checkmark-icon.svg?react"

export default function CheckBox({text = "Пиво", checked = false, onChange = () => {}}){
    return(
        <label className={styles.customCheckbox}>
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <span className={styles.checkmark}>
                <CheckMarkIcon/>
            </span>
            <p className="noSelect">{text}</p>
        </label>
    );
}