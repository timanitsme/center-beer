import styles from "./Search.module.scss"
import SearchIcon from "../../../assets/search-icon.svg?react";
import CloseIcon from "../../../assets/close-icon.svg?react"
import {useEffect, useState} from "react";
import {useGetCitiesQuery} from "../../../store/services/centerBeer.js";

export default function SearchCities({title, onChange, reset}){
    const [inputValue, setInputValue] = useState(''); // Значение поля поиска
    const [debouncedInput, setDebouncedInput] = useState(inputValue);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const {data: cities = [], isLoading, error} = useGetCitiesQuery(debouncedInput)

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


    useEffect(() => {
        if (reset?.reset){
            setInputValue("")
        }
    }, [reset]);

    useEffect(() => {
        if (inputValue.trim() !== '') {
            setFilteredSuggestions(cities.slice(0, 5));
        }
    }, [cities, inputValue]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setFilteredSuggestions([]);
        }
    };

    // Обработчик выбора подсказки
    const handleSuggestionClick = (suggestion) => {
        setDebouncedInput(suggestion.name)
        setInputValue(suggestion.name); // Устанавливаем выбранную подсказку в поле ввода
        if (suggestion?.id !== undefined && suggestion.id !== 0) onChange(suggestion.id);
        setFilteredSuggestions([]);
    };

    if (error || isLoading) return null

    return(
        <div className={styles.searchField}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputChange}
                onBlur={(event) => {
                    setTimeout(() => {
                        if (!event.relatedTarget || !event.relatedTarget.closest(`.${styles.suggestionsList}`)) {
                            setFilteredSuggestions([]);
                        }
                    }, 250);
                }}
                placeholder={title}
                className={styles.searchInput}
            />
            {inputValue?.length===0 ? <span className={styles.searchIcon}><SearchIcon/></span> : <span className={styles.searchIcon} onClick={() => handleSuggestionClick({id: 0, name: ""})}><CloseIcon/></span>}
            {filteredSuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={(e) => {e.stopPropagation(); handleSuggestionClick({...suggestion})}}
                            className={styles.suggestionItem}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}