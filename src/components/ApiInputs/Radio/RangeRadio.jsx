import styles from "./Radio.module.scss"
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

    const [selectedOption, setSelectedOption] = useState(getDefaultOption() || { name: "Все", id: 0 });
    const [range, setRange] = useState({ from: "", to: "" }); // Состояние для значений "от" и "до"

    useEffect(() => {
        if (reset?.reset){
            setSelectedOption(getDefaultOption())
            setRange({ from: "", to: "" })
        }
    }, [reset]);


    const handleFromChange = (event) => {
        const def = getDefaultOption()
        let newOption = selectedOption.id
        if (selectedOption !== def){
            setSelectedOption(def)
            newOption = def.id
        }
        const value = event.target.value;
        setRange((prev) => ({ ...prev, from: value.replace(/\D/, "") })); // Разрешаем только числа
        if (onChange){
            onChange({options: {id: newOption, from: value.replace(/\D/, ""), to: range.to}, names: selectedOption.name});
        }
    };

    const handleToChange = (event) => {
        const def = getDefaultOption()
        let newOption = selectedOption.id
        if (selectedOption !== def){
            setSelectedOption(def)
            newOption = def.id
        }
        const value = event.target.value;
        setRange((prev) => ({ ...prev, to: value.replace(/\D/, "") })); // Разрешаем только числа
        if (onChange){
            onChange({options: {id: newOption, from: range.from, to: value.replace(/\D/, "")}, names: selectedOption.name});
        }
    };

    const handleRadioChange = (option) =>{
        let newRange = { from: range.from, to: range.to }
        if (range.from !== "" || range.to !== ""){
            setRange({ from: "", to: "" })
            newRange = {from: "", to: ""}
        }
        setSelectedOption(option)
        if (onChange){
            onChange({options: {id: option.id, from: newRange.from, to: newRange.to}, names: option.name});
        }
    }

    return(
        <div className={styles.radio}>
            <p className={`${styles.radioHeader} noSelect`}>{title}</p>
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
                <div className={styles.option} onClick={() => handleRadioChange(defaultOption)}>
                    <input
                        type="radio"
                        value={defaultOption?.id || title}
                        name={`${filterKey}-${title}`}
                        checked={selectedOption.id === defaultOption.id} // Сравниваем по id
                        onChange={() => handleRadioChange(defaultOption)}
                    />
                    <span className={styles.radioButton}></span>
                    <p className="noSelect">{defaultOption.name}</p>
                </div>
            )}
            {options.map((option, index) => {
                return(
                    <div key={index} className={styles.option}
                         onClick={() => handleRadioChange(option)}>
                        <input type="radio" value={option?.id || title} name={title} checked={selectedOption === option}
                               onChange={() => handleRadioChange(option)}/>
                        <span className={styles.radioButton}></span>
                        <p className="noSelect">{option.name}</p>
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