import {useEffect, useState} from "react";
import styles from "./Search.module.scss";
import SearchIcon from "../../../assets/search-icon.svg?react";
import CloseIcon from "../../../assets/close-icon.svg?react";

export default function SearchInput({title, onChange, reset}){
    const [inputValue, setInputValue] = useState(''); // Значение поля поиска
    const [debouncedInput, setDebouncedInput] = useState(inputValue);

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
        if (onChange){
            onChange(debouncedInput)
        }
    }, [debouncedInput]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    return(
        <div className={styles.searchField}>
            <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleInputChange}
                placeholder={title}
                className={styles.searchInput}
            />
            {inputValue?.length===0 ? <span className={styles.searchIcon}><SearchIcon/></span> : <span className={styles.searchIcon} onClick={() => setInputValue("")}><CloseIcon/></span>}
        </div>
    )
}