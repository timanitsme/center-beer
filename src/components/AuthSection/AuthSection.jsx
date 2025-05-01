import styles from "./AuthSection.module.css"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {centerBeerAuthApi, useLoginMutation} from "../../store/services/centerBeerAuth.js";
import {useDispatch} from "react-redux";
import {logout, setUserProfile} from "../../store/services/authSlice.js";

export default function AuthSection(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, {isLoading}] = useLoginMutation()
    const [error, setError] = useState("")
    const  dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        setError("");
        event.preventDefault();
        // Проверяем, что все поля заполнены
        if (!email || !password) {
            setError('Заполните все поля');
            return;
        }

        if (!email.match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )){
            setError("Введен некорректный email")
            return;
        }

        try {
            const response = await login({email: email, password: password}).unwrap();
            const profileResponse = await dispatch(centerBeerAuthApi.endpoints.getUserProfile.initiate());
            if (profileResponse.data && response) {
                await dispatch(setUserProfile(profileResponse.data));
                window.location.href = "/account/";
            }
        } catch (err) {
            setError('Неверный email или пароль');
            dispatch(logout());
        }
    }

    return(
        <div className={styles.authSection}>
            <h1 className={styles.outlineTitle}>Личный кабинет</h1>
            <div className={styles.authContent}>
                <p className={styles.title}>Вход в личный кабинет</p>
                <div className={styles.formRow}>
                    <p>Email</p>
                    <TextInput placeholder="Адрес электронной почты" inputValue={email} setInputValue={setEmail}></TextInput>
                </div>
                <div className={styles.formRow}>
                    <p>Пароль</p>
                    <PasswordInput placeholder="Пароль" inputValue={password} setInputValue={setPassword}></PasswordInput>
                </div>
                {error.length > 0 &&<div className={styles.formRow}>
                    <p></p>
                    <p className={styles.error}>{error}</p>
                </div>}
                <div className={styles.formRow}>
                    <div></div>
                    <div className={styles.innerRow}>
                        <SimpleButton onClick={handleSubmit} text="Войти"></SimpleButton>
                        {/*<a href="" className={styles.dottedA}>Напомнить пароль</a>*/}
                    </div>
                </div>
                <div className={styles.formRow}>
                    <div></div>
                    <div>
                      <p>Если вы еще не зарегистрированы в личном кабинете портала, <Link to={"/signup"} className={styles.underline}>зарегистрируйтесь</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}