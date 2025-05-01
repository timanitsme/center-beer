import styles from "./RegSection.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {Link, useNavigate} from "react-router-dom";
import CheckBoxChild from "../Inputs/CheckBox/CheckBoxChild.jsx";
import {useState} from "react";
import {centerBeerAuthApi, useLoginMutation, useRegisterMutation} from "../../store/services/centerBeerAuth.js";
import {useDispatch} from "react-redux";
import {logout, setUserProfile} from "../../store/services/authSlice.js";

export default function RegSection(){
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordRepeat, setPasswordRepeat] = useState("")
    const [register, {isLoading}] = useRegisterMutation()
    const [error, setError] = useState("")
    const  dispatch = useDispatch()
    const navigate = useNavigate()
    const [checked, setChecked] = useState(false)

    const handleSubmit = async (event) => {
        setError("");
        event.preventDefault();
        // Проверяем, что все поля заполнены
        if (!email || !password || !nickname || !passwordRepeat) {
            setError('Заполните все поля');
            return;
        }

        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            setError("Введен некорректный email")
            return;
        }

        if (password !== passwordRepeat){
            setError("Введенные пароли не совпадают")
            return;
        }

        if (!checked){
            setError("Необходимо дать согласие на обработку персональных данных")
            return;
        }

        try {
            const response = await register({nickname: nickname, email: email, password: password}).unwrap();
            if (response) {
                window.location.href = "/login/";
            }
        } catch (err) {
            setError('Неверные данные');
            dispatch(logout());
        }
    }

    return(
        <div className={styles.authSection}>
            <h1 className={styles.outlineTitle}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <p className={styles.title}>Регистрация</p>
                <div className={styles.formRow}>
                    <p>Никнейм</p>
                    <TextInput placeholder="Придумайте себе никнейм" maxLength={15} inputValue={nickname} setInputValue={setNickname}></TextInput>
                </div>
                <div className={styles.formRow}>
                    <p>Email</p>
                    <TextInput placeholder="Адрес электронной почты" inputValue={email} setInputValue={setEmail}></TextInput>
                </div>
                <div className={styles.formRow}>
                    <p>Пароль</p>
                    <PasswordInput placeholder="Пароль" inputValue={password} setInputValue={setPassword}></PasswordInput>
                </div>
                <div className={styles.formRow}>
                    <p>Повторите пароль</p>
                    <PasswordInput placeholder="Пароль" inputValue={passwordRepeat} setInputValue={setPasswordRepeat}></PasswordInput>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <CheckBoxChild checked={checked} setChecked={setChecked}><p style={{color: "var(--txt-secondary)"}}>Я даю согласие на обработку <a href="" className={styles.underline}>персональных данных</a></p></CheckBoxChild>
                </div>
                {error.length > 0 &&
                    <>
                        <div className={styles.formRow}>
                            <div></div>
                            <p className={styles.error}>{error}</p>
                        </div>
                    </>
                }
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton text="Регистрация" onClick={handleSubmit}></SimpleButton>
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