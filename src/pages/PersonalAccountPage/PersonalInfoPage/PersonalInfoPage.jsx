import styles from "./PersonalInfoPage.module.scss"
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import PersonalAccountMobile from "../../../components/PersonalAccount/PersonalAccountMobile.jsx";
import {useSelector} from "react-redux";
import AvatarMock from "../../../assets/avatar-default.svg";
import {MdPhotoCamera} from "react-icons/md";
import {RiCopperCoinFill} from "react-icons/ri";
import TextInput from "../../../components/Inputs/TextInput/TextInput.jsx";
import {useEffect, useState} from "react";
import TextConfirmInput from "../../../components/Inputs/TextConfirmInput/TextConfirmInput.jsx";
import PasswordInput from "../../../components/Inputs/PasswordInput/PasswordInput.jsx";
import SimpleButton from "../../../components/Buttons/SimpleButton/SimpleButton.jsx";
import {
    centerBeerAuthApi,
    useLoginMutation,
    useUpdateNicknameMutation
} from "../../../store/services/centerBeerAuth.js";
import {logout, setUserProfile} from "../../../store/services/authSlice.js";
import {centerBeerApi} from "../../../store/services/centerBeer.js";

export default function PersonalInfoPage(){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const [nickname, setNickname] = useState("")
    const [email, setEmail] = useState("")
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: "Личные данные", path: ""}
    ]

    const [changeNickname, {isLoading: changeNicknameIsLoading}] = useUpdateNicknameMutation()

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
        try {
            const response = await changeNickname(nickname).unwrap();
            if (response) {
                console.log("nickname changed successfully")
            }
        } catch (err) {
            /*setError('Неверный email или пароль');*/
            console.log("nickname didn't change")
        }
    }


    return(
        <div className="content">
            <NavChain paths={paths}/>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount profile={userProfile}/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccountMobile alias="data" profile={userProfile} withoutInfo={true}/>}
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
                                    </div>
                                    <div>
                                        <p>Email</p>
                                        <TextConfirmInput placeholder="Email" inputValue={email} setInputValue={setEmail} initialValue={userProfile?.email}/>
                                    </div>
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