import {useState} from "react";
import styles from "./ComboBox.module.scss";
import ArrowDownIcon from "../../../assets/arrow-down-icon.svg?react";
import CheckBox from "../CheckBox/CheckBox.jsx";

export default function ComboBox({ options, onChange }){
    const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия контейнера
    const [selectedOption, setSelectedOption] = useState(options[0]); // Выбранная опция

    // Обработчик выбора опции
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Устанавливаем выбранную опцию
        setIsOpen(false); // Закрываем контейнер
        if (onChange) {
            onChange(option); // Вызываем внешний обработчик, если он передан
        }
    };

    return (
        <div className={styles.comboBox}>
            <div
                className={`${styles.comboBoxHeader} ${!isOpen? styles.closed: ''}`}
                onClick={() => setIsOpen(!isOpen)} // Переключаем состояние isOpen
            >
                <p className="ma-p">{selectedOption}</p>
                <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}><ArrowDownIcon/></span>
            </div>
            {isOpen && (
                <ul className={styles.optionsList}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={() => handleOptionSelect(option)}
                            className={`${styles.optionItem} ma-p`}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
};