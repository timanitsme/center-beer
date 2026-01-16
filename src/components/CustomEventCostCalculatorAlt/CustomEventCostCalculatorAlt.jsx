import styles from "./CustomEventCostCalculatorAlt.module.scss"
import {useState} from "react";
import ComboBox from "../ApiInputs/ComboBox/ComboBox.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {BiCalculator} from "react-icons/bi";
import {motion} from "motion/react"


export default function CustomEventCostCalculatorAlt({calculatorRef=null, setIsExpanded}){
    const additionalOptions = [
        {id: 1, title: "Ведущий", price: 15000},
        {id: 2, title: "Диджей", price: 20000},
        {id: 3, title: "Декор", price: 7000},
        {id: 4, title: "Фото и видео", price: 10000},
        {id: 5, title: "Квизы и тематические сеты", price: 5000},
    ]

    const totalPriceVariants = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const [selectedOptions, setSelectedOptions] = useState([])
    const [selectedFormat, setSelectedFormat] = useState({id:1, name: "Полная аренда", price: 50000})
    const [basePrice, setBasePrice] = useState(0)
    const [additionalPrice, setAdditionalPrice] = useState(0)

    const handleOptionClick = (optionId) => {
        if (selectedOptions.includes(optionId)) {
            setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
        } else {
            setSelectedOptions([...selectedOptions, optionId]);
        }
    };

    const calculate = (e) => {
        e.preventDefault();
        setBasePrice(selectedFormat.price);

        const selectedAdditionalOptions = additionalOptions.filter((option) =>
            selectedOptions.includes(option.id)
        );
        const sum = selectedAdditionalOptions.reduce((total, option) => total + option.price, 0);
        setAdditionalPrice(sum)
    }

    return(
        <section className={styles.calculatorSection} ref={calculatorRef} id="custom-event-cost-calculator-alt">
            <div className={styles.description}>
                <h2 className="ma-h2">Калькулятор стоимости</h2>
                <p className="ma-p">
                    Ответьте на несколько простых вопросов – и получите ориентировочную стоимость вашего мероприятия. Выберите дату, количество гостей, формат и дополнительные опции – мы всё учтём!
                </p>
            </div>
            <form action="" className={styles.calculator}>
                <div className={styles.data}>
                    <div className={styles.field}>
                        <p className="ma-p">Формат:</p>
                        <ComboBox options={[{id:1, name: "Полная аренда", price: 50000}, {id: 2, name: "Частичная аренда", price: 30000},{id: 3, name: "Все включено", price: 100000},{id: 4, name: "Гибрид", price: 30000}]} onChange={(newFormat) => setSelectedFormat(newFormat)}></ComboBox>
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
                    <motion.p
                        className={`ma-h4 ${styles.totalPrice}`}
                        style={{ color: "var(--primary)", fontWeight: 500 }}
                        variants={totalPriceVariants}
                        initial="initial"
                        animate="animate"
                        key={basePrice + additionalPrice} // Перезапускает анимацию при изменении цены
                    >
                        {(basePrice + additionalPrice).toLocaleString('ru-RU')} ₽
                    </motion.p>
                    <div className={styles.stat}>
                        <p className="ma-p">Базовая аренда:</p>
                        <p className="ma-p">{basePrice.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <div className={styles.stat}>
                        <p className="ma-p">Доп. услуги:</p>
                        <p className="ma-p">{additionalPrice.toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <div className={styles.stat}>
                        <p className="ma-p">Хорошее настроение:</p>
                        <p className="ma-p">0 ₽</p>
                    </div>
                    <div className={styles.hrtLine}/>
                    <div className={styles.stat}>
                        <p className="ma-p" style={{color: "var(--txt-active)"}}>Итого:</p>
                        <p className="ma-p" style={{color: "var(--txt-active)"}}>{(basePrice+additionalPrice).toLocaleString('ru-RU')} ₽</p>
                    </div>
                    <div>
                        <IconButton style="primary" text="Рассчитать стоимость " onClick={calculate}><BiCalculator/></IconButton>
                        <IconButton text="Забронировать дату" onClick={(e) => {e.preventDefault();setIsExpanded(true)}}></IconButton>
                    </div>
                    <p style={{fontWeight: 200}} className="ma-p">*Итоговая стоимость может отличаться в зависимости от даты и дополнительных услуг</p>
                </div>
            </form>
        </section>
    )
}

// Календарь максимум 680