import {useEffect, useState} from "react";
import styles from "./SortDirection.module.css";
import Tooltip from "../../Tooltip/Tooltip.jsx";

export default function SortDirection({options, onChange}){
    const [selectedOption, setSelectedOption] = useState(options[0]);

    // Обработчик выбора опции
    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        if (onChange) {
            onChange(option);
        }
    };

    useEffect(() => {
        console.log(JSON.stringify(selectedOption))
    }, []);

    return (
        <Tooltip text={selectedOption?.name}>
            <div className={styles.box}>
                <div onClick={() => handleOptionSelect(selectedOption.id === options[0].id ? options[1] : options[0])}>
                    <selectedOption.Icon/>
                </div>
            </div>
        </Tooltip>
    );
}