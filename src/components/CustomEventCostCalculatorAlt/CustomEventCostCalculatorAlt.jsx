import styles from "./CustomEventCostCalculatorAlt.module.scss"
import {useState} from "react";
import DateField from "../Inputs/DateField/DateField.jsx";
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {BiCalculator} from "react-icons/bi";

export default function CustomEventCostCalculatorAlt({calculatorRef=null}){
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
            <form action="" className={styles.calculator}>
                <div className={styles.data}>
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
                    <div className={styles.additionalOptions}>
                        <p className="ma-p">Дополнительные опции:</p>
                        <div className={styles.options}>
                            {additionalOptions.map((option, index) =>
                                <div key={`option-${index}`} className={`${styles.option} ${selectedOptions.includes(option.id) ? styles.selected : ""}`} onClick={() => handleOptionClick(option.id)}><p className="ma-p noSelect">{option.title}</p></div>
                            )}
                        </div>
                    </div>
                </div>
                <div className={styles.total}>
                    <p className="aa-h6" style={{color: "var(--txt-active)", fontWeight: 500}}>Предварительная стоимость</p>
                    <p className={`ma-h4 ${styles.totalPrice}`} style={{color: "var(--primary)", fontWeight: 500}}>50 000 ₽</p>
                    <div className={styles.stat}>
                        <p className="ma-p">Базовая аренда:</p>
                        <p className="ma-p">40 000 ₽</p>
                    </div>
                    <div className={styles.stat}>
                        <p className="ma-p">Доп. услуги:</p>
                        <p className="ma-p">10 000 ₽</p>
                    </div>
                    <div className={styles.hrtLine}/>
                    <div className={styles.stat}>
                        <p className="ma-p" style={{color: "var(--txt-active)"}}>Итого:</p>
                        <p className="ma-p" style={{color: "var(--txt-active)"}}>50 000 ₽</p>
                    </div>
                    <IconButton style="primary" text="Рассчитать стоимость "><BiCalculator/></IconButton>
                    <p style={{fontWeight: 200}} className="ma-p">*Итоговая стоимость может отличаться в зависимости от даты и дополнительных услуг</p>
                </div>
            </form>
        </section>
    )
}

// Календарь максимум 680