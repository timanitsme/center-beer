import styles from "./AuthSection.module.scss"
import TextInput from "../Inputs/TextInput/TextInput.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import PasswordInput from "../Inputs/PasswordInput/PasswordInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {centerBeerAuthApi, useLoginMutation} from "../../store/services/centerBeerAuth.js";
import {useDispatch} from "react-redux";
import {logout, setUserProfile} from "../../store/services/authSlice.js";
import {centerBeerApi} from "../../store/services/centerBeer.js";

export default function AuthSection(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [login, {isLoading}] = useLoginMutation()
    const [error, setError] = useState("")
    const  dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        console.log("whatsapp")
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
            const { accessToken } = response;
            const profileResponse = await dispatch(centerBeerAuthApi.endpoints.getUserProfile.initiate());
            if (profileResponse.data && response) {
                const { id: userId } = profileResponse.data;
                await dispatch(setUserProfile(profileResponse.data));
                await dispatch(
                    centerBeerApi.endpoints.refreshUserToken.initiate({
                        user_id: userId,
                        token: accessToken,
                    })
                );
                window.location.href = "/account/";
            }
        } catch (err) {
            setError('Неверный email или пароль');
            dispatch(logout());
        }
    }

    return(
        <div className={styles.authSection}>
            <h1 className={`${styles.outlineTitle} text-large`}>Личный кабинет</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.authContent}>
                    <h5 className={styles.title}>Вход в личный кабинет</h5>
                    <div className={styles.formRow}>
                        <p className="ma-p1">Email</p>
                        <TextInput
                            placeholder="Адрес электронной почты"
                            inputValue={email}
                            setInputValue={setEmail}
                        ></TextInput>
                    </div>
                    <div className={styles.formRow}>
                        <p className="ma-p1">Пароль</p>
                        <PasswordInput
                            placeholder="Пароль"
                            inputValue={password}
                            setInputValue={setPassword}
                        ></PasswordInput>
                    </div>
                    {error.length > 0 && (
                        <div className={styles.formRow}>
                            <p></p>
                            <p className={`${styles.error} ma-p1`}>{error}</p>
                        </div>
                    )}
                    <div className={styles.formRow}>
                        <div></div>
                        <div className={styles.innerRow}>
                            {/* Кнопка отправки формы */}
                            <SimpleButton buttonType="submit" text="Войти"></SimpleButton>
                            {/*<a href="" className={styles.dottedA}>Напомнить пароль</a>*/}
                        </div>
                    </div>
                    <div className={styles.formRow}>
                        <div></div>
                        <div>
                            <p className="ma-p">
                                Если вы еще не зарегистрированы в личном кабинете портала,{" "}
                                <Link to={"/signup"} className={styles.underline}>
                                    зарегистрируйтесь
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </form>

        </div>
    )
}