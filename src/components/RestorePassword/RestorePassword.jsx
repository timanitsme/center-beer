import styles from "./RestorePassword.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function RestorePassword(){
    return(
        <div className={styles.authSection}>
            <h1 className={styles.outlineTitle}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <p className={styles.title}>Восстановление пароля</p>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                        <p className={styles.primary}>Указанный адрес электронной почты не найден в системе. Попробуйте еще раз.</p>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <p>Email</p>
                    <TextInput placeholder="Адрес электронной почты"></TextInput>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                        <p>Если адрес электронной почты зарегистрирован в системе, мы вышлем на него ссылку для восстановления пароля.</p>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton text="Сбросить пароль"></SimpleButton>
                        <a href="" className={styles.dottedA}>Войти</a>
                    </div>
                </div>
            </div>
        </div>
    )
}