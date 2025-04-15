import styles from "./ContactsSection.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import {TgIcon} from "../../assets/TgIcon.jsx";

export default function ContactsSection(){
    return(
        <div className={styles.contactsSection}>
            <h1 className={styles.outlineTitle}>Контакты</h1>
            <div className={styles.contactsRow}>
                <div className={styles.contactsCol}>
                    <h2>+7 (499) 938-46-71</h2>
                    <p>Отвечаем на звонки с 8 до 22 без выходных</p>
                </div>
                <div className={styles.contactsCol}>
                    <h2>hello@center.beer</h2>
                    <p>Для вопросов и предложений</p>
                </div>
                <div className={styles.contactsCol}>
                    <h2>@Alexomel81</h2>
                    <p>Для сообщений в Telegram</p>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.formRow}>
                    <div className={styles.col}>
                        <h2>Напишите нам</h2>
                        <p>Воспользуйтесь формой обратной связи либо с помощью электронной почты, написав письмо на адрес hello@center.beer</p>
                    </div>
                    <div className={styles.col}>
                        <TextInput placeholder="Ваше имя"></TextInput>
                        <TextInput placeholder="Ваш email"></TextInput>
                        <textarea placeholder={"Текст сообщения"} className={styles.area}></textarea>
                        <SimpleButton text="Отправить сообщение"></SimpleButton>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={`${styles.formRow} ${styles.socials}`}>
                    <div className={`${styles.col} ${styles.center}`}>
                        <h2>Мы в социальных сетях</h2>
                    </div>
                    <div className={styles.row}>
                        <IconButton style="third" onClick={() => window.location.href="https://t.me/Alexomel81"} text={"Telegram"}><TgIcon/></IconButton>
                        <IconButton style="third" text={"Почта"} onClick={() => window.location.href="mailto:hello@center.beer"}><MailIcon/></IconButton>
                        <IconButton style="third" onClick={() => window.location.href="https://vk.com/center.beer"} text={"Вконтакте"}><VkIcon/></IconButton>
                    </div>
                </div>
            </div>
        </div>
    )
}