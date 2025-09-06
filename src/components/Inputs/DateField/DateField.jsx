import styles from "./DateField.module.scss"
import {useEffect, useRef, useState} from "react";
import {FaCalendarAlt} from "react-icons/fa";
import DatePicker from "../../DatePicker/DatePicker.jsx";

export default function DateField({onChange }){
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState("")
    const pickerRef = useRef(null);

    const handleInput = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (value.length > 0) {
            formattedValue += value.slice(0, 2);
        }
        if (value.length > 2) {
            formattedValue += `-${value.slice(2, 4)}`;
        }
        if (value.length > 4) {
            formattedValue += `-${value.slice(4, 8)}`;
        }

        if (formattedValue.length <= 10) {
            setInputValue(formattedValue);
        }
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target) &&
                !event.target.closest(`.${styles.comboBoxHeader}`)
            ) {
                setIsOpen(false); // Скрываем picker
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className={styles.comboBox}>
            <div
                className={`${styles.comboBoxHeader}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <input className={styles.textInput} value={inputValue} onChange={handleInput} type="text" placeholder="__-__-____"/>
                <span className={`${styles.icon}`} onClick={() => setIsOpen(!isOpen)}><FaCalendarAlt/></span>
            </div>
            { isOpen &&
                <div className={styles.picker} ref={pickerRef}>
                    <DatePicker onPick={(date) => {setInputValue(`${String(date.day).padStart(2, "0")}-${String(date.month).padStart(2, "0")}-${date.year}`); setIsOpen(!isOpen)}}></DatePicker>
                </div>
            }
        </div>
    );
};