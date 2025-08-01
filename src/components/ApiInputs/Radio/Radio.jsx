import styles from "./Radio.module.scss"
import {useEffect, useState} from "react";

export default function Radio({title, options, onChange, reset, defaultOption, filterKey=""}){

    const getDefaultOption = () => {
        // Если передан defaultOption, используем его
        if (defaultOption) {
            return defaultOption;
        }
        // Иначе берем первый элемент из options
        return options[0];
    };

    const [selectedOption, setSelectedOption] = useState(getDefaultOption());

    useEffect(() => {
        if (reset?.reset){
            setSelectedOption(getDefaultOption())
        }
    }, [reset]);


    const handleRadioChange = (option) =>{
        setSelectedOption(option)
        if (onChange){
            onChange({options: option.id, names: option.name});
        }
    }
    return(
        <div className={styles.radio}>
            <p className={`${styles.radioHeader} noSelect`}>{title}</p>
            {defaultOption && !options.some(opt => opt.id === defaultOption.id) && (
                <div className={styles.option} onClick={() => handleRadioChange(getDefaultOption())}>
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
                        <input type="radio" value={option?.id || title} name={title}
                               checked={selectedOption === option} onChange={() => handleRadioChange(option)}/>
                        <span className={styles.radioButton}></span>
                        <p className="noSelect">{option.name}</p>
                    </div>
                )
            })}
        </div>
    )
}