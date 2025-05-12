import styles from "./CheckBox.module.css";
import CheckMarkIcon from "../../../assets/checkmark-icon.svg?react";
import {useEffect, useState} from "react";

export default function SingleCheckBox({text = "Пиво",  onChange, reset}){
    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (reset?.reset){
            setChecked(false)
        }
    }, [reset]);


    const handleCheckboxChange = (option) =>{
        setChecked(option)
        if (onChange){
            onChange(option);
        }
    }

    return(
        <label className={styles.customCheckbox}>
            <input type="checkbox" checked={checked} onChange={() => handleCheckboxChange(!checked)}/>
            <span className={styles.checkmark}>
                <CheckMarkIcon/>
            </span>
            <p className="noSelect">{text}</p>
        </label>
    );
}