import styles from "./AuthSection.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";

export default function AuthSection(){
    return(
        <div className={styles.authSection}>
            <h1 className={styles.outlineTitle}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <p className={styles.title}>Вход в личный кабинет</p>
                <div className={styles.formRow}>
                    <p>Email</p>
                    <TextInput placeholder="Адрес электронной почты"></TextInput>
                </div>
                <div className={styles.formRow}>
                    <p>Пароль</p>
                    <PasswordInput placeholder="Пароль"></PasswordInput>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton text="Войти"></SimpleButton>
                        <a href="" className={styles.dottedA}>Напомнить пароль</a>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                      <p>Если вы еще не зарегистрированы в личном кабинете портала, <a className={styles.underline} href="">зарегистрируйтесь</a>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}