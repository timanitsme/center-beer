import styles from "./Radio.module.css"
import {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function RangeRadio({title, options, onChange, reset, defaultOption, filterKey=""}){
    const getDefaultOption = () => {
        // Если передан defaultOption, используем его
        if (defaultOption) {
            return defaultOption;
        }
        // Иначе берем первый элемент из options
        return options && options.length !== 0 && options[0];
    };

    const [selectedOption, setSelectedOption] = useState(getDefaultOption() || { name: "все", id: 0 });
    const [range, setRange] = useState({ from: "", to: "" }); // Состояние для значений "от" и "до"

    useEffect(() => {
        if (reset){
            setSelectedOption(getDefaultOption())
        }
    }, [reset, options, defaultOption]);

    const handleFromChange = (event) => {
        const value = event.target.value;
        setRange((prev) => ({ ...prev, from: value.replace(/\D/, "") })); // Разрешаем только числа
    };

    const handleToChange = (event) => {
        const value = event.target.value;
        setRange((prev) => ({ ...prev, to: value.replace(/\D/, "") })); // Разрешаем только числа
    };

    const handleRadioChange = (option) =>{
        setSelectedOption(option)
        if (onChange){
            onChange({options: {id: option.id, from: range.from, to: range.to}, names: option.name});
        }
    }

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
            {defaultOption && !options.some(opt => opt.id === defaultOption.id) && (
                <div className={styles.option} onClick={() => setSelectedOption(getDefaultOption())}>
                    <input
                        type="radio"
                        value={defaultOption?.id || title}
                        name={`${filterKey}-${title}`}
                        checked={selectedOption.id === defaultOption.id} // Сравниваем по id
                        onChange={() => handleRadioChange(defaultOption)}
                    />
                    <span className={styles.radioButton}></span>
                    <p>{defaultOption.name}</p>
                </div>
            )}
            {options.map((option, index) => {
                return(
                    <div key={index} className={styles.option}
                         onClick={() => handleRadioChange(option)}>
                        <input type="radio" value={option?.id || title} name={title} checked={selectedOption === option}
                               onChange={() => handleRadioChange(option)}/>
                        <span className={styles.radioButton}></span>
                        <p>{option.name}</p>
                    </div>
                )
            })}
        </div>
    )
}

RangeRadio.propTypes = {
    options: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    reset: PropTypes.bool,
    filterKey: PropTypes.string,
    defaultOption: PropTypes.objectOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
    })),
    onChange: PropTypes.func
}