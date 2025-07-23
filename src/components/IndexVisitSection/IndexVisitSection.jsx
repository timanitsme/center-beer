import styles from "./IndexVisitSection.module.scss"
import BottleIcon from "../../assets/bottle-icon.svg?react"
import BottleHalfIcon from "../../assets/bottle-half-icon.svg?react"
import BottleEmptyIcon from "../../assets/bottle-empty-icon.svg?react"
import BarrelIcon from "../../assets/barrel-icon.svg?react"
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react"
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react"
import BeerPintIcon from "../../assets/beer-pint-icon.svg?react"

export default function IndexVisitSection(){

    const advantages = [
        {icon: <BarrelIcon/>, title: "356", description: "Пивоварен"},
        {icon: <BottlesPairIcon/>, title: "60", description: "Стилей пива"},
        {icon: <BeerCaseIcon/>, title: "1500", description: "Наименований"},
        {icon: <BeerPintIcon/>, title: "3489", description: "Пользователей"},
    ]

    return(
        <div className={styles.visitSection}>
            <div className={styles.bottlesContainer}>
                <BottleIcon/>
                <BottleHalfIcon/>
                <BottleEmptyIcon/>
            </div>
            <div className={styles.widthLimit}>
                <h3 className="ma-h3">Мы собрали вместе любителей пива, владельцев баров и мастеров-пивоваров.</h3>
                <h3 className="ma-h3" style={{color: "var(--txt-secondary)"}}>У вас будет возможность лично поблагодарить производителя отличного пива или предложить новую рецептуру.</h3>
            </div>
            <p className={styles.widthLimit}>Общение на одной волне, обмен интересами – всё это в огромном сообществе ценителей и производителей пива. От такого формата выигрывают все: пивовары понимают, что нравится покупателю, а потребители знают, что будут всегда услышаны. Начинающие пивных бизнесов найдут здесь надежных поставщиков и поддержку опытных коллег. Нетворкинг и партнерство в действии.</p>
            <div className={styles.advantagesRow}>
                {advantages.map((advantage, index) => {
                    return(
                        <div key={index} className={styles.advantage}>
                            {advantage.icon}
                            <h3 className="ma-h3">{advantage.title}</h3>
                            <p>{advantage.description}</p>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}