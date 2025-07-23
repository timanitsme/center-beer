import styles from "./BugReportSection.module.scss"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {useState} from "react";

export default function BugReportSection(){
    const {error, setError} = useState("")
    const {email, setEmail} = useState("")
    const {brief, setBrief} = useState("")


    return(
        <>
            <div className={styles.formSection}>
                <h1 className={`${styles.outlineTitle} text-large`}>Сообщите об ошибке</h1>
                <form onSubmit={() => {}}>
                    <div className={styles.authContent}>
                        <div className={styles.formRow}>
                            <p className="ma-p1">Email</p>
                            <TextInput
                                placeholder="Адрес электронной почты"
                                inputValue={email}
                                setInputValue={setEmail}
                            ></TextInput>
                        </div>
                        <div className={styles.formRow}>
                            <p className="ma-p1">Опишите найденную ошибку</p>
                            <TextInput
                                placeholder="Краткое описание проблемы"
                                inputValue={brief}
                                setInputValue={setBrief}
                            ></TextInput>
                        </div>
                        <div className={styles.formRow}>
                            <p className="ma-p1">Шаги</p>
                            <textarea type="text" className="ma-p" placeholder="Опишите шаги для воспроизведения проблемы">
                            </textarea>
                        </div>
                        <div className={styles.formRow}>
                            <p className="ma-p1">Скриншоты</p>
                            <div></div>
                        </div>

                        {error?.length > 0 && (
                            <div className={styles.formRow}>
                                <p></p>
                                <p className={styles.error}>{error}</p>
                            </div>
                        )}
                        <div className={styles.formRow}>
                            <div></div>
                            <div className={styles.innerRow}>
                                <SimpleButton type="submit" text="Отправить"></SimpleButton>
                            </div>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}