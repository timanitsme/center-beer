import styles from "./CustomEventRequestForm.module.scss"
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import PhoneInput from "../Inputs/PhoneInput/PhoneInput.jsx";
import {useEffect, useRef, useState} from "react";
import DateField from "../Inputs/DateField/DateField.jsx";


export default function CustomEventRequestForm({orderRef}){
    const [phone, setPhone] = useState("")
    const formRef = useRef(null)

    {/*useEffect(() => {
        if (!formRef.current) return;
        // Создаем первый скрипт
        const script1 = document.createElement('script');
        script1.innerHTML = `
            !function(a,m,o,c,r,m){a[o+c]=a[o+c]||{setMeta:function(p){this.params=(this.params||[]).concat([p])}},a[o+r]=a[o+r]||function(f){a[o+r].f=(a[o+r].f||[]).concat([f])},a[o+r]({id:"1603222",hash:"1827ed4e15bf268d9b84c7744a66759c",locale:"ru"}),a[o+m]=a[o+m]||function(f,k){a[o+m].f=(a[o+m].f||[]).concat([[f,k]])}}(window,0,"amo_forms_","params","load","loaded");
        `;
        formRef.current.appendChild(script1);

        // Создаем второй скрипт
        const script2 = document.createElement('script');
        script2.id = 'amoforms_script_1603222';
        script2.async = true;
        script2.charset = 'utf-8';
        script2.src = 'https://forms.amocrm.ru/forms/assets/js/amoforms.js?1758270469';
        formRef.current.appendChild(script2);

        // Очистка при размонтировании компонента
        return () => {
            formRef.current.removeChild(script1);
            formRef.current.removeChild(script2);
        };
    }, []);*/}

    return(
        <section className={styles.formSection} ref={orderRef}>
            <div className={`${styles.gradient} ${styles.top}`}/>

            <div id="amo-form-container" ref={formRef}></div>

            {/*<form className={styles.requestForm}>
                <h2 className="ma-h3">Свяжитесь с нами - мы поможем все организовать</h2>
                <p className="ma-p" style={{fontWeight: 300}}>Оставьте заявку, и мы поможем воплотить вашу идею в жизнь.
                    Удобно, быстро, без лишних забот.</p>
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
                            <ComboBox options={["Частный праздник"]}></ComboBox>
                        </div>

                    </div>
                </div>
                <div className={`${styles.field} ${styles.comment}`}>
                    <p className="ma-p">Комментарий:</p>
                    <textarea name="" id="" rows="5" placeholder="Расскажите подробнее о мероприятии"
                              className={`ma-p`}></textarea>
                </div>
                <SimpleButton text="Оставить заявку"></SimpleButton>
            </form>*/}
            <div className={`${styles.gradient} ${styles.bottom}`}/>
        </section>
    )
}