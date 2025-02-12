import styles from "./AdvantagesList.module.css"
import WalletIcon from "../../assets/advantages/WalletIcon.jsx";
import DeskIcon from "../../assets/advantages/DeskIcon.jsx";
import GlassesIcon from "../../assets/advantages/GlassesIcon.jsx";
import ShieldIcon from "../../assets/advantages/ShieldIcon.jsx";


export default function AdvantagesList(){
    const advantages = [
        {icon: <WalletIcon/>, title: "СРЕДНИЙ ЧЕК", description: ["2500 ₽"]},
        {icon: <DeskIcon/>, title: "КУХНЯ", description: ["Европейская", "Итальянская", "Русская", "Авторская", "Азиатская"]},
        {icon: <GlassesIcon/>, title: "ЦЕЛЬ ПОСЕЩЕНИЯ", description: ["Деловая встреча", "Романтическая встреча", "Семейный ужин", "Ужин с друзьями"]},
        {icon: <ShieldIcon/>, title: "ОСОБЕННОСТИ", description: ["WiFi","Летняя терраса","Принимаются карты"]},
    ]


    return(
        <div className={styles.advantagesListContainer}>
            {advantages.map((advantage) =>{
                return(
                    <div key={advantage.title} className={styles.advantagesListItem}>
                        {advantage.icon}
                        <div>
                            <h3>{advantage.title}</h3>
                            {advantage.description.map((item) => {
                                return(
                                    <p key={item}>{item}</p>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}