import styles from "./CheckBoxSection.module.css";
import CheckBox from "../CheckBox/CheckBox.jsx";
import {useEffect, useState} from "react";

export default function CheckBoxSection({title, options, onChange, reset}){
    const [selectedOptions, setSelectedOptions] = useState([]); // Выбранные опции

    const handleCheckboxChange = (option) => {
        setSelectedOptions((prevSelected) => {
            const updatedOptions = prevSelected.some((item) => item.id === option.id)
                ? prevSelected.filter((item) => item.id !== option.id) // Удалить опцию
                : [...prevSelected, option]; // Добавить опцию

            if (onChange) {
                onChange({options: updatedOptions.map(option => parseInt(option.id, 10)), names: updatedOptions.map(option => option.name)});
            }

            return updatedOptions;
        });
    };

    // Сброс выбранных опций
    useEffect(() => {
        if (reset) {
            setSelectedOptions([]);
        }
    }, [reset]);

    return(
        <div className={styles.checkbox}>
            <p className={styles.checkboxHeader}>{title}</p>
            {options.map((option, index) => (
                <CheckBox key={index} text={option.name} checked={selectedOptions.some((item) => item.id === option.id)} onChange={() => handleCheckboxChange(option)} />
            ))}
        </div>
    )
}