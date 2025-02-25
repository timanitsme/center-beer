import styles from "./CheckBoxSection.module.css";
import CheckBox from "../CheckBox/CheckBox.jsx";

export default function CheckBoxSection({title, options}){
    return(
        <div className={styles.checkbox}>
            <p className={styles.checkboxHeader}>{title}</p>
            {options.map((option => (
                <CheckBox key={option} text={option}/>
            )))}
        </div>
    )
}