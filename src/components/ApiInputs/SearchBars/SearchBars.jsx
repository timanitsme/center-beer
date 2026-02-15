import {useEffect, useState} from "react";
import {useGetBarsQuery} from "../../../store/services/centerBeer.js";
import styles from "./SearchBars.module.scss";
import SearchIcon from "../../../assets/search-icon.svg?react";
import CloseIcon from "../../../assets/close-icon.svg?react";

export default function SearchBars({onSelect, reset}){
    const [inputValue, setInputValue] = useState('');
    const [debouncedInput, setDebouncedInput] = useState(inputValue);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [timestamp, setTimestamp] = useState(Date.now());
    const {data: bars , isLoading, error} = useGetBarsQuery({name: debouncedInput, lim: 5, ts: timestamp}, {skip: debouncedInput.length === 0})
    const [selectedBar, setSelectedBar] = useState(null)

    useEffect(() => {
        const handler = setTimeout(() => {
            if ((inputValue === '' || inputValue.length >= 2) && debouncedInput !== inputValue){
                setDebouncedInput(inputValue);
                setTimestamp(Date.now())
            }
        }, 700);

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
        if (inputValue.trim() !== '' && bars?.data) {
            setFilteredSuggestions(bars.data.slice(0, 5));
        }
    }, [bars, inputValue]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        if (value.trim() === '') {
            setFilteredSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setDebouncedInput(suggestion.name)
        setSelectedBar(suggestion)
        onSelect(suggestion)
        setInputValue("");
        setFilteredSuggestions([]);
    };

    if (error || isLoading) return null

    return(
        <div className={`${styles.searchField} ${selectedBar !== null? styles.selectedBar: ""}`} >
            {selectedBar === null ?
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
                    placeholder="Введите значение"
                    className={`${styles.searchInput} ma-p`}
                />:
                <p className="ma-p">{selectedBar.name}</p>
            }
            {inputValue?.length===0 ? <span className={styles.searchIcon}><SearchIcon/></span> : <span className={styles.searchIcon} onClick={() => handleSuggestionClick({id: 0, name: ""})}><CloseIcon/></span>}
            {selectedBar !== null && <span className={styles.selectedBarIcon} onClick={() => setSelectedBar(null)}><CloseIcon/></span>}
            {filteredSuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            onClick={(e) => {e.stopPropagation(); handleSuggestionClick({...suggestion})}}
                            className={`${styles.suggestionItem} ma-p`}
                        >
                            {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}