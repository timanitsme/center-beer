import {useEffect, useState} from "react";
import styles from "./FilterComboBox.module.css";
import ArrowDownIcon from "../../../assets/arrow-down-icon.svg?react";
import SearchIcon from "../../../assets/search-icon.svg?react";
import CheckBox from "../CheckBox/CheckBox.jsx";

export default function HookedFilterComboBox({ options, isLoading, error, title, onChange, reset, debouncedInput, setDebouncedInput}){
    const [isOpen, setIsOpen] = useState(false); // Состояние для открытия/закрытия контейнера
    const [inputValue, setInputValue] = useState(''); // Значение поля поиска
    const [selectedOptions, setSelectedOptions] = useState([]); // Выбранные опции
    // Используем переданный хук для получения данных

    // Обработчик изменения текстового поля
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    useEffect(() => {
        const handler = setTimeout(() => {
            if ((inputValue === '' || inputValue.length >= 2) && debouncedInput !== inputValue){
                setDebouncedInput(inputValue);
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue]);



    // Обработчик изменения чекбокса
    const handleCheckboxChange = (option) => {
        setSelectedOptions((prevSelected) => {
            const updatedOptions = prevSelected.some((item) => item.id === option.id)
                ? prevSelected.filter((item) => item.id !== option.id) // Удалить опцию
                : [...prevSelected, option]; // Добавить опцию

            if (onChange) {
                onChange({
                    options: updatedOptions.map(option => parseInt(option.id, 10)),
                    names: updatedOptions.map(option => option.name),
                });
            }

            return updatedOptions;
        });
    };

    // Сброс выбранных опций
    useEffect(() => {
        if (reset?.reset) {
            if (reset?.id !== 0) {
                setSelectedOptions((prev) => prev.filter(x => x.id.toString() !== reset?.id.toString()));
            } else {
                setSelectedOptions([]);
            }
        }
    }, [reset]);

    return (
        <div
            className={styles.comboBox}
            onClick={(e) => e.stopPropagation()} // Предотвращаем закрытие при клике внутри
        >
            {/* Блок с текстом и стрелкой */}
            <div
                className={`${styles.comboBoxHeader} ${!isOpen ? styles.closed : ''}`}
                onClick={() => setIsOpen(!isOpen)} // Переключаем состояние isOpen
            >
                <p className="noSelect">{title}</p>
                <span className={`${styles.arrow} ${isOpen ? styles.open : ''}`}><ArrowDownIcon /></span>
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
                        <span className={styles.searchIcon}><SearchIcon /></span>
                    </div>

                    {/* Список опций */}
                    {isLoading && <p>Загрузка...</p>}
                    {error && <p>Ошибка при загрузке данных</p>}
                    {!isLoading && !error && (
                        <ul className={styles.optionsList}>
                            {options.map((option, index) => (
                                <li
                                    key={index}
                                    className={`${styles.optionItem} noSelect`}
                                >
                                    <CheckBox
                                        text={option.name}
                                        checked={selectedOptions.some((item) => item.id === option.id)}
                                        onChange={() => handleCheckboxChange(option)}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};