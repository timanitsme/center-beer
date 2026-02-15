import styles from "./PersonalInfoPage.module.scss"
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import {useSelector} from "react-redux";
import AvatarMock from "../../../assets/avatar-default.svg";
import {MdPhotoCamera} from "react-icons/md";
import {RiCopperCoinFill} from "react-icons/ri";
import {lazy, Suspense, useEffect, useState} from "react";
import TextConfirmInput from "../../../components/Inputs/TextConfirmInput/TextConfirmInput.jsx";
import PasswordInput from "../../../components/Inputs/PasswordInput/PasswordInput.jsx";
import SimpleButton from "../../../components/Buttons/SimpleButton/SimpleButton.jsx";
import {
    useConfirmEmailChangeMutation,
    useRequestEmailChangeMutation,
    useUpdateNicknameMutation
} from "../../../store/services/centerBeerAuth.js";
import CodeInput from "../../../components/Inputs/CodeInput/CodeInput.jsx";
import CountdownTimer from "../../../components/CountdownTimer/CountdownTimer.jsx";
import {useGetUserDashboardQuery} from "../../../store/services/centerBeer.js";
const PersonalAccountAlt = lazy(() => import("../../../components/PersonalAccount/PersonalAccountAlt/PersonalAccountAlt.jsx"));
const PersonalAccountMobile = lazy(() => import("../../../components/PersonalAccount/PersonalAccountMobileAlt/PersonalAccountMobileAlt.jsx"));

export default function PersonalInfoPage(){
    const { isAuthorized, userProfile, userDashboard, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const [nickname, setNickname] = useState("")
    const [nicknameError, setNicknameError] = useState("")
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [emailTimerIsRunning, setEmailTimerIsRunning] = useState(false);
    const [emailTimerReset, setEmailTimerReset] = useState(false);
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: "Личные данные", path: ""}
    ]
    const [code, setCode] = useState(Array(4).fill(""));
    const [changeNickname] = useUpdateNicknameMutation()
    const [changeEmail] = useRequestEmailChangeMutation()
    const [confirmEmailChange] = useConfirmEmailChangeMutation()

    useEffect(() => {
        document.title = `center.beer | Личные данные`
    }, []);

    useEffect(() => {
        if (!profileIsLoading){
            setNickname(userProfile?.nickname)
            setEmail(userProfile?.email)
        }
    }, [userProfile, profileIsLoading]);

    const handleNicknameChange = async () => {
        setNicknameError("")
        try {
            const response = await changeNickname(nickname).unwrap();
            if (response) {
                console.log("nickname changed successfully")
                window.location.reload()
            }
        } catch (err) {
            setNicknameError('Не получилось изменить никнейм');
            console.log("nickname didn't change")
        }
    }

    const handleRequestEmailChange = async () => {
        setEmailError("")
        try {
            const response = await changeEmail(email).unwrap();
            if (response) {
                setEmailTimerIsRunning(true)
            }
        } catch (err) {
            setEmailError('Не получилось изменить email');
            console.log("email didn't change")
        }
    }



    return(
        <div className="content">
            <div style={{display: "flex"}}>
                <Suspense>
                    {!isMobile && <PersonalAccountAlt profile={userProfile} dashboard={userDashboard} />}
                </Suspense>
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    <NavChain paths={paths} customStyle="nav-chain-no-margin"/>
                    <Suspense>
                        {isMobile && <PersonalAccountMobile dashboard={userDashboard} alias="data" profile={userProfile} withoutInfo={true}/>}
                    </Suspense>
                    <div className={styles.accountSection}>
                        <div className={`${styles.sideContent} ${styles.mobile}`}>
                            <div className={styles.profile}>
                                <div>

                                    <div className={styles.avatarWrapper}>
                                        <img className={styles.avatar} src={AvatarMock} alt=''></img>
                                        {isMobile?
                                        <div className={styles.updateAvatarMobile}>
                                            <div className={styles.container}>
                                                <MdPhotoCamera/>
                                            </div>
                                        </div>:
                                        <div className={styles.updateAvatar}>
                                            <MdPhotoCamera/>
                                        </div>
                                        }
                                    </div>
                                </div>
                                <div className={styles.profileForm}>
                                    <h3 className="ma-h3" style={{textAlign: "left"}}>Личные данные</h3>
                                    <div>
                                        <p>Никнейм</p>
                                        <TextConfirmInput placeholder="Никнейм" inputValue={nickname} setInputValue={setNickname} initialValue={userProfile?.nickname} onConfirm={handleNicknameChange}/>
                                        {nicknameError !== "" && <p className={styles.primary}>{nicknameError}</p>}
                                    </div>
                                    <div>
                                        <p>Email</p>
                                        <TextConfirmInput placeholder="Email" inputValue={email} setInputValue={setEmail} initialValue={userProfile?.email} onConfirm={handleRequestEmailChange}/>
                                        {emailError !== "" && <p className={styles.primary}>{emailError}</p>}
                                    </div>
                                    {emailTimerIsRunning &&
                                        <div className={styles.codeField}>
                                            <p>Введите код, отправленный на ваш Email:</p>
                                            <div className={styles.timerBox}>
                                                <div className={styles.flexButtons}>
                                                    <CodeInput inputValue={code} setInputValue={setCode}/>
                                                    <SimpleButton text="Подтвердить" onClick={() => setEmailTimerIsRunning(true)}></SimpleButton>
                                                </div>
                                                <CountdownTimer initialTime={20} styleClasses={`${styles.primary} ${styles.alignRight}`} isRunning={emailTimerIsRunning} reset={emailTimerReset} setReset={setEmailTimerReset} onExpire={() => console.log("onExpire")} onReset={handleRequestEmailChange}></CountdownTimer>
                                            </div>
                                        </div>
                                    }
                                    <div>
                                        <p><span className={styles.active}>Присоединился:</span> 24.04.2025</p>
                                        <div style={{display: "flex", alignItems: "flex-end", gap: "5px"}} className={styles.balance}><p className={styles.active}>На счету</p> <p>150</p> <p className={styles.active}>CB Coin</p> <RiCopperCoinFill color="var(--primary)"/></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className={`${styles.sideContent} ${styles.mobile} ${styles.addMargin}`}>
                            <div className={styles.profile}>
                                <div style={{width: "100%"}} className={styles.passwordChangeForm}>
                                    <h3>Сменить пароль</h3>
                                    <PasswordInput placeholder="Новый пароль"></PasswordInput>
                                    <PasswordInput placeholder="Повторите новый пароль"></PasswordInput>
                                    <div style={{alignSelf: "center"}}>
                                        <SimpleButton text="Подтвердить"></SimpleButton>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className={styles.accountSection}>

                    </div>

                </div>
            </div>
        </div>
    )
}