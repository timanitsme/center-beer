import styles from "./RegSection.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {Link} from "react-router-dom";
import CheckBoxChild from "../Inputs/CheckBox/CheckBoxChild.jsx";

export default function RegSection(){
    return(
        <div className={styles.authSection}>
            <h1 className={styles.outlineTitle}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <p className={styles.title}>Регистрация</p>
                <div className={styles.formRow}>
                    <p>Email</p>
                    <TextInput placeholder="Адрес электронной почты"></TextInput>
                </div>
                <div className={styles.formRow}>
                    <p>Пароль</p>
                    <PasswordInput placeholder="Пароль"></PasswordInput>
                </div>
                <div className={styles.formRow}>
                    <p>Повторите пароль</p>
                    <PasswordInput placeholder="Пароль"></PasswordInput>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <CheckBoxChild><p style={{color: "var(--txt-secondary)"}}>Я даю согласие на обработку <a href="" className={styles.underline}>персональных данных</a></p></CheckBoxChild>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton text="Регистрация"></SimpleButton>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                        <p>Уже зарегистрированы в личном кабинете портала? <Link to={"/login"} className={styles.underline}>Вход</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}