import { useState } from 'react';
import  styles from "./FilterComboBox.module.scss"
import ArrowDownIcon from "../../../assets/arrow-down-icon.svg?react"
import SearchIcon from "../../../assets/search-icon.svg?react"
import CheckBox from "../CheckBox/CheckBox.jsx";

export default function FilterComboBox({ options, title, onChange }){
    const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия контейнера
    const [inputValue, setInputValue] = useState(''); // Значение поля поиска
    const [selectedOption, setSelectedOption] = useState(null); // Выбранная опция

    // Фильтруем опции на основе введенного текста
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(inputValue.toLowerCase())
    );

    // Обработчик изменения текстового поля
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    // Обработчик выбора опции
    const handleOptionSelect = (option) => {
        setSelectedOption(option); // Устанавливаем выбранную опцию
        setInputValue(option); // Обновляем поле поиска
        setIsOpen(false); // Закрываем контейнер
        if (onChange) {
            onChange(option); // Вызываем внешний обработчик, если он передан
        }
    };

    return (
        <div
            className={styles.comboBox}
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
        >
            {/* Блок с текстом и стрелкой */}
            <div
                className={`${styles.comboBoxHeader} ${!isOpen? styles.closed: ''}`}
                onClick={() => setIsOpen(!isOpen)} // Переключаем состояние isOpen
            >
                <p>{title}</p>
                <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}><ArrowDownIcon/></span>
            </div>

            {/* Раскрывающийся контейнер */}
            {isOpen && (
                <div className={styles.comboBoxContainer}>
                    {/* Поле поиска */}
                    <div className={styles.searchField}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Поиск по списку"
                            className={styles.searchInput}
                        />
                        <span className={styles.searchIcon}><SearchIcon/></span>
                    </div>

                    {/* Список опций */}
                    <ul className={styles.optionsList}>
                        {filteredOptions.map((option, index) => (
                            <li
                                key={index}
                                className={styles.optionItem}
                            >
                                <CheckBox text={option}/>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};