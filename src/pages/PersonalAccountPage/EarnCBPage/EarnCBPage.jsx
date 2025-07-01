import BarImage1 from "../../../assets/barsMocks/bar-3.svg";
import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {isMobile} from "react-device-detect";
import PersonalAccount from "../../../components/PersonalAccount/PersonalAccount.jsx";
import styles from "./EarnCBPage.module.scss";
import Task from "../../../components/Task/Task.jsx";
import {useEffect} from "react";
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

    const tasks = [
        {id: 1, title: "Профиль", description: "Заполни все графы своего профиля", requirement: null, reward: 100, path: "", complete: true},
        {id: 2, title: "Подпишись на ТГ", description: "Подпишись на наш Телеграмм канал", requirement: 1, reward: 100, path: "", complete: false},
        {id: 3, title: "Лайк", description: "Поставь первый лайк бару/пиву/пивоварне", requirement: null, reward: 100, path: "", complete: false},
        {id: 4, title: "Кладовка", description: "Отложи в кладовку понравившееся пиво, чтобы потом было легче его найти", requirement: null, reward: 100, path: "", complete: false},
        {id: 5, title: "Пригласи друга", description: "Пригласи друга", requirement: 2, reward: 100, path: "", complete: false},
        {id: 6, title: "Пригласи 3 друзей", description: "Пригласи 3 друзей", requirement: 2, reward: 500, path: "", complete: false},
        {id: 7, title: "Пригласи 5 друзей", description: "Пригласи 5 друзей", requirement: 2, reward: 500, path: "", complete: false},
        {id: 8, title: "Пригласи 7 друзей", description: "Пригласи 7 друзей", requirement: 2, reward: 1000, path: "", complete: false},
        {id: 9, title: "Пригласи 10 друзей", description: "Пригласи 10 друзей", requirement: 2, reward: 1500, path: "", complete: false},
        {id: 10, title: "Чек-ин", description: "Сделай чек-ин", requirement: 1, reward: 50, path: "", complete: false},
        {id: 11, title: "Сделать 5 чек-инов", description: "Сделай 5 чек-инов", requirement: 2, reward: 100, path: "", complete: false},
        {id: 12, title: "Сделать 10 чек-инов", description: "Сделай 10 чек-инов", requirement: 2, reward: 500, path: "", complete: false},
        {id: 13, title: "Сделать 20 чек-инов", description: "Сделай 20 чек-инов", requirement: 2, reward: 1000, path: "", complete: false},
        {id: 14, title: "Сделать 50 чек-инов", description: "Сделай 50 чек-инов", requirement: 2, reward: 2000, path: "", complete: false},
        {id: 15, title: "Найти баг", description: "Найти баг/ошибку и написать на специальную форму", requirement: null, reward: 1000, path: "", complete: false},
        {id: 16, title: "Привести заведение", description: "Сообщи координаты заведения и контакты заинтересованного лица готового подключиться к Center.beer", requirement: 2, reward: 5000, path: "", complete: false},
        {id: 17, title: "Оценка заведения", description: "Первый раз оцени заведение", requirement: 2, reward: 200, path: "", complete: false},
        {id: 18, title: "Оценка сотрудника", description: "Первый раз оцени сотрудника", requirement: 5, reward: 400, path: "", complete: false},
        {id: 19, title: "Такси", description: "Вызвать такси в заведение или из него", requirement: 2, reward: 50, path: "", complete: false},
        {id: 20, title: "Видео отзыв", description: "Запиши  видео отзыв про пиво", requirement: 2, reward: 100, path: "", complete: false},
    ]

    const tasksHash = tasks.reduce((acc, task) => {
        acc[task.id] = task;
        return acc;
    }, {});

    return(
        <div className="content">
            <NavChain paths={paths}></NavChain>
            <div style={{display: "flex"}}>
                {!isMobile && <PersonalAccount/>}
                <div style={{display: "flex", flexDirection: "column", width: "100%", gap: "25px"}}>
                    {isMobile && <PersonalAccount isMobile={true}/>}
                    <ButtonSwitch options={options} selectedOption={options[0]} onClick={(option) => option.title !== options[0].title? navigate("/account/balance-history"): navigate("")}/>
                    <div className={`${styles.sectionHeader} ${isMobile? styles.mobile: ""}`}>
                        <h2 className={`${styles.title} ma-h2`}>Заработать CB Coin</h2>
                        <p className={`${styles.description} ma-p`}> Зарабатывай CBcoin(наша валюта), выполняя различные задания. Увеличивай свое состояние, которое в скором времени можно будет потратить на различные приятные покупки. VIP доступ, скидочные купоны, бокалы, кепки, футболки, это то немногое на что вы сможете потратить ваши сбережения.</p>
                    </div>
                    <div className={styles.tasksCol}>
                        {tasks?.map((task, index) => <Task task={task} tasksHash={tasksHash} key={index}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}