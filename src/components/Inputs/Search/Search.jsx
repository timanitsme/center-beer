import styles from "./Search.module.scss"
import SearchIcon from "../../../assets/search-icon.svg?react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import {useState} from "react";

export default function Search({text = "Поиск", suggestions = ["Москва", "Нижний Новгород", "Санкт-Петербург"]}){
    const [inputValue, setInputValue] = useState(''); // Значение поля поиска
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    // Обработчик изменения текстового поля
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setFilteredSuggestions([]);
        } else {
            const filtered = suggestions.filter((suggestion) =>
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        }
    };

    // Обработчик выбора подсказки
    const handleSuggestionClick = (suggestion) => {
        setInputValue(suggestion); // Устанавливаем выбранную подсказку в поле ввода
        setFilteredSuggestions([]); // Очищаем список подсказок
    };

    return(
        <div className={styles.searchField}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputChange}
                onBlur={() => setFilteredSuggestions([])}
                placeholder={text}
                className={styles.searchInput}
            />
            {inputValue.length===0 ? <span className={styles.searchIcon}><SearchIcon/></span> : <span className={styles.searchIcon} onClick={() => handleSuggestionClick("")}><CloseIcon/></span>}
            {filteredSuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={styles.suggestionItem}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}