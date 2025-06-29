import styles from "./AdvantagesList.module.scss"
import WalletIcon from "../../assets/advantages/WalletIcon.jsx";
import DeskIcon from "../../assets/advantages/DeskIcon.jsx";
import GlassesIcon from "../../assets/advantages/GlassesIcon.jsx";
import ShieldIcon from "../../assets/advantages/ShieldIcon.jsx";


export default function AdvantagesList({barInfo}){
    const advantages = [
        {icon: <WalletIcon/>, title: "СРЕДНИЙ ЧЕК", description: [`${barInfo["average_bill"]}₽`]},
        {icon: <DeskIcon/>, title: "КУХНЯ", description: barInfo["kitchen"]},
        {icon: <GlassesIcon/>, title: "ЦЕЛЬ ПОСЕЩЕНИЯ", description: barInfo["visit_types"]},
        {icon: <ShieldIcon/>, title: "ОСОБЕННОСТИ", description: barInfo["properties"]},
    ]


    return(
        <div className={styles.advantagesListContainer}>
            {advantages.map((advantage) =>{
                return(
                    <div key={advantage.title} className={styles.advantagesListItem}>
                        {advantage.icon}
                        <div>
                            <h5>{advantage.title}</h5>
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