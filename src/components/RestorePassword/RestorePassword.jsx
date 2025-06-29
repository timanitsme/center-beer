import styles from "./RestorePassword.module.scss"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";

export default function RestorePassword(){
    return(
        <div className={styles.authSection}>
            <h1 className={`${styles.outlineTitle} text-large`}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <h5 className={styles.title}>Восстановление пароля</h5>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                        <p className={`${styles.primary} ma-p1`}>Указанный адрес электронной почты не найден в системе. Попробуйте еще раз.</p>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <p className="ma-p1">Email</p>
                    <TextInput placeholder="Адрес электронной почты"></TextInput>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                        <p className="ma-p">Если адрес электронной почты зарегистрирован в системе, мы вышлем на него ссылку для восстановления пароля.</p>
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton text="Сбросить пароль"></SimpleButton>
                        <a href="" className={`${styles.dottedA} ma-p1`}>Войти</a>
                    </div>
                </div>
            </div>
        </div>
    )
}