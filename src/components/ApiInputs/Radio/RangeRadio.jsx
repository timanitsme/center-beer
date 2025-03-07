import styles from "./Radio.module.css"
import {useState} from "react";

export default function RangeRadio({title, options}){
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [range, setRange] = useState({ from: "", to: "" }); // Состояние для значений "от" и "до"

    const handleFromChange = (event) => {
        const value = event.target.value;
        setRange((prev) => ({ ...prev, from: value.replace(/\D/, "") })); // Разрешаем только числа
    };

    const handleToChange = (event) => {
        const value = event.target.value;
        setRange((prev) => ({ ...prev, to: value.replace(/\D/, "") })); // Разрешаем только числа
    };

    return(
        <div className={styles.radio}>
            <p className={styles.radioHeader}>{title}</p>
            <div className={styles.rangeContainer}>
                <input
                    type="text"
                    value={range.from}
                    onChange={handleFromChange}
                    placeholder="От"
                    className={styles.rangeInput}
                    inputMode="numeric" // Для мобильных устройств показывает цифровую клавиатуру
                />
                <input
                    type="text"
                    value={range.to}
                    onChange={handleToChange}
                    placeholder="До"
                    className={styles.rangeInput}
                    inputMode="numeric" // Для мобильных устройств показывает цифровую клавиатуру
                />
            </div>
            {options.map((option => {
                return(
                    <div key={option} className={styles.option}
                         onClick={() => setSelectedOption(option)}>
                        <input type="radio" value={option} checked={selectedOption === option} />
                        <span className={styles.radioButton}></span>
                        <p>{option}</p>
                    </div>
                )
            }))}
        </div>
    )
}