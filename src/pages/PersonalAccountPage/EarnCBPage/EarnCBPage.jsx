import BarImage1 from "../../../assets/barsMocks/bar-3.svg";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import styles from "./EarnCBPage.module.css";
import SimpleCatalogSection from "../../../components/CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import MinimalBarCard from "../../../components/Cards/BarCard/MinimalBarCard.jsx";
import Task from "../../../components/Task/Task.jsx";
import {useEffect} from "react";
import SimpleButton from "../../../components/Buttons/SimpleButton/SimpleButton.jsx";
import ButtonSwitch from "../../../components/ButtonSwitch/ButtonSwitch.jsx";
import {useNavigate} from "react-router-dom";

export default function EarnCBPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: "Заработать CB Coin", path: ""}
    ]
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `center.beer | Заработать CB Coin`
    }, []);

    const barsCards = [
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
        {is_favor: false, is_liked: false, title: "13 RULES (Народный бар)", img: BarImage1, address: "г.Москва, Сущевский вал, 41"},
    ]

    const options = [
        {title: "Заработать CB Coin"},
        {title: "История операций"}
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccount isMobile={true}/>}
                    <ButtonSwitch options={options} selectedOption={options[0]} onClick={(option) => option.title !== options[0].title? navigate("/account/balance-history"): navigate("")}/>
                    <div className={`${styles.sectionHeader} ${isMobile? styles.mobile: ""}`}>
                        <h2 className={styles.title}>Заработать CB Coin</h2>
                        <p className={styles.description}> Зарабатывай CBcoin(наша валюта), выполняя различные задания. Увеличивай свое состояние, которое в скором времени можно будет потратить на различные приятные покупки. VIP доступ, скидочные купоны, бокалы, кепки, футболки, это то немногое на что вы сможете потратить ваши сбережения.</p>
                    </div>
                    <div className={styles.tasksCol}>
                        <Task/>
                        <Task/>
                        <Task/>
                    </div>
                </div>
            </div>
        </div>
    )
}