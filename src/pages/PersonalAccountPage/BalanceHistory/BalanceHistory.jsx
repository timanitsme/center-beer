import styles from "./BalanceHistory.module.scss"
import {useEffect, useState} from "react";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import ButtonSwitch from "../../../components/ButtonSwitch/ButtonSwitch.jsx";
import {useNavigate} from "react-router-dom";
import BalanceOperation from "../../../components/BalanceOperation/BalanceOperation.jsx";
import {useSelector} from "react-redux";
import {useGetUsersBalanceHistoryQuery} from "../../../store/services/centerBeer.js";
import PersonalAccountMobile from "../../../components/PersonalAccount/PersonalAccountMobile.jsx";

export default function BalanceHistory(){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const {data: balanceHistory, isLoading: balanceHistoryIsLoading, error: balanceError} = useGetUsersBalanceHistoryQuery({user_id: userProfile?.id}, {skip: !userProfile})
    const navigate = useNavigate()
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Личный кабинет", path: "/account/"},
        {title: "История операций", path: ""}
    ]
    const [expanded, setExpanded] = useState(false)
    useEffect(() => {
        document.title = `center.beer | История операций`
    }, []);

    const options = [
        {title: "Заработать CB Coin"},
        {title: "История операций"}
    ]

    const operations = [
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
        {event: "Выполнение задания", description: 'Выполнение задания "Заполни все графы своего профиля"', date: "17 мая 2025, 23:00", is_profit: true, amount: 100},
        {event: "Пополнение баланса", description: null, date: "17 мая 2025, 17:33", is_profit: true, amount: 1500},
        {event: "Покупка мерча", description: "Покупка футболки center.beer", date: "19 мая 2025, 23:00", is_profit: false, amount: 1300},
    ]

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount profile={userProfile}/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccountMobile alias="other" profile={userProfile}/>}
                    <ButtonSwitch options={options} selectedOption={options[1]} onClick={(option) => option.title !== options[1].title? navigate("/account/earn-cb"): navigate("")}/>
                    <div className={`${styles.sectionHeader} ${isMobile? styles.mobile: ""}`}>
                        <h2 className={`${styles.title} ma-h2`}>История операций</h2>
                        <p className={`${styles.description} ma-p`}> Отслеживайте все ваши транзакции и операции с CBcoin в одном месте. Здесь вы найдете детальную информацию о каждом начислении, списании и обмене ваших монет. Контролируйте свои финансы и планируйте будущие траты, имея полный доступ к истории вашего счета.</p>
                    </div>
                    <div className={styles.tasksCol}>
                        <div className={styles.operation}>
                            <p className="ma-p">Дата</p>
                            <p className="ma-p">Сумма</p>
                            <p className="ma-p">Событие</p>
                        </div>
                        {isAuthorized && !profileIsLoading && !balanceHistoryIsLoading && balanceHistory?.data?.length > 0 &&
                            <div className={styles.tasksCol} style={{margin: 0, overflowY: "auto"}}>
                                {balanceHistory?.data?.map((operation, index) =>
                                    <BalanceOperation key={index} operation={operation}/>
                                )}
                            </div>
                        }
                        {isAuthorized && !profileIsLoading && !balanceHistoryIsLoading && balanceHistory?.data?.length === 0 &&
                            <div className={styles.noData}>
                                <p className="ma-p">Нет данных</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}