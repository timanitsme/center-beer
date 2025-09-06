import styles from "./CustomEventCostCalculator.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import DateField from "../Inputs/DateField/DateField.jsx";
import {useEffect, useState} from "react";


export default function CustomEventCostCalculator({calculatorRef}){
    const additionalOptions = [
        {id: 1, title: "Пиво + Закуски"},
        {id: 2, title: "Сет на 4-х"},
        {id: 3, title: "Мясное ассорти"},
    ]

    const [selectedOptions, setSelectedOptions] = useState([])

    const handleOptionClick = (optionId) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
        }
    };

    return(
        <section className={styles.calculatorSection} ref={calculatorRef}>
            <div className={styles.description}>
                <h2 className="ma-h2">Калькулятор стоимости</h2>
                <p className="ma-p">
                    Ответьте на несколько простых вопросов – и получите ориентировочную стоимость вашего мероприятия. Выберите дату, количество гостей, формат и дополнительные опции – мы всё учтём!
                </p>
            </div>
            <form className={styles.calculator}>
                <div className={styles.fieldsRow}>
                    <div className={styles.field}>
                        <p className="ma-p">Дата:</p>
                        <DateField options={[]}></DateField>
                    </div>

                    <div className={styles.field}>
                        <p className="ma-p">Количество гостей:</p>
                        <TextInput placeholder="0"></TextInput>
                    </div>

                    <div className={styles.field}>
                        <p className="ma-p">Формат:</p>
                        <ComboBox options={["Полная аренда", "Под ключ", "Частичная аренда"]}></ComboBox>
                    </div>
                </div>

                <div className={styles.additionalOptions}>
                    <p>Дополнительные опции:</p>
                    <div className={styles.options}>
                        {additionalOptions.map((option, index) =>
                            <div key={`option-${index}`} className={`${styles.option} ${selectedOptions.includes(option.id) ? styles.selected : ""}`} onClick={() => handleOptionClick(option.id)}><p className="ma-p noSelect">{option.title}</p></div>
                        )}
                    </div>
                </div>

                <div className={styles.priceAndSubmit}>
                    <h3 className="ma-h4" >Итого: 00,00 ₽</h3>
                    <SimpleButton text="Рассчитать стоимость"/>
                </div>

            </form>

        </section>
    )
}