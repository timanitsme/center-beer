import styles from "./CustomEventRequestForm.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import PhoneInput from "../Inputs/PhoneInput/PhoneInput.jsx";
import {useState} from "react";
import DateField from "../Inputs/DateField/DateField.jsx";


export default function CustomEventRequestForm({orderRef}){
    const [phone, setPhone] = useState("")

    return(
        <section className={styles.formSection} ref={orderRef}>
            <div className={`${styles.gradient} ${styles.top}`}/>
            <form className={styles.requestForm}>
                <h2 className="ma-h3">Свяжитесь с нами - мы поможем все организовать</h2>
                <p className="ma-p" style={{fontWeight: 300}}>Оставьте заявку, и мы поможем воплотить вашу идею в жизнь. Удобно, быстро, без лишних забот.</p>
                <div className={styles.fieldCols}>
                    <div className={styles.fieldsRow}>
                        <div className={styles.field}>
                            <p className="ma-p">Имя:</p>
                            <TextInput placeholder="Ваше имя"></TextInput>
                        </div>
                        <div className={styles.field}>
                            <p className="ma-p">Дата:</p>
                            <DateField></DateField>
                        </div>
                        <div className={styles.field}>
                            <p className="ma-p">Количество гостей:</p>
                            <TextInput placeholder="0"></TextInput>
                        </div>
                    </div>
                    <div className={styles.fieldsRow}>
                        <div className={styles.field}>
                            <p className="ma-p">Телефон:</p>
                            <PhoneInput inputValue={phone} setInputValue={setPhone}/>
                        </div>
                        <div className={styles.field}>
                            <p className="ma-p">Тип мероприятия:</p>
                            <ComboBox options={["Частный праздник"]} ></ComboBox>
                        </div>
                        
                    </div>
                </div>
                <div className={`${styles.field} ${styles.comment}`}>
                    <p className="ma-p">Комментарий:</p>
                    <textarea name="" id="" rows="5" placeholder="Расскажите подробнее о мероприятии" className={`ma-p`}></textarea>
                </div>
                <SimpleButton text="Оставить заявку"></SimpleButton>
            </form>
            <div className={`${styles.gradient} ${styles.bottom}`}/>
        </section>
    )
}