import styles from "./ContactsSection.module.scss"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import {VkIcon} from "../../assets/VkIcon.jsx";
import {MailIcon} from "../../assets/MailIcon.jsx";
import {TgIcon} from "../../assets/TgIcon.jsx";
import {useNavigate} from "react-router-dom";

export default function ContactsSection(){
    const navigate = useNavigate()

    return(
        <div className={styles.contactsSection}>
            <h1 className={`${styles.outlineTitle} text-large`}>Контакты</h1>
            <div className={styles.contactsRow}>
                <div className={styles.contactsCol}>
                    <h4 className="ma-h4-small">+7 (499) 938-46-71</h4>
                    <p className="ma-p">Отвечаем на звонки с 8 до 22 без выходных</p>
                </div>
                <div className={styles.contactsCol}>
                    <h4 className="ma-h4-small">hello@center.beer</h4>
                    <p className="ma-p">Для вопросов и предложений</p>
                </div>
                <div className={styles.contactsCol}>
                    <h4 className="ma-h4-small">@Alexomel81</h4>
                    <p className="ma-p">Для сообщений в Telegram</p>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.formRow}>
                    <div className={styles.col}>
                        <h2 className="ma-h2-small">Напишите нам</h2>
                        <p className="ma-p1">Воспользуйтесь формой обратной связи либо с помощью электронной почты, написав письмо на адрес hello@center.beer</p>
                    </div>
                    <div className={styles.col}>
                        <TextInput placeholder="Ваше имя"></TextInput>
                        <TextInput placeholder="Ваш email"></TextInput>
                        <textarea placeholder={"Текст сообщения"} className={`${styles.area} ma-p`}></textarea>
                        <SimpleButton onClick={() => navigate("/in-dev")} text="Отправить сообщение"></SimpleButton>
                    </div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={`${styles.formRow} ${styles.socials}`}>
                    <div className={`${styles.col} ${styles.center}`}>
                        <h2 className="ma-h3">Мы в социальных сетях</h2>
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