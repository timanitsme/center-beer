import styles from "./PromotionCombinationRules.module.scss"
import ExclamationCircleIcon from "../../assets/exclamation-circle-icon.svg?react"

export default function PromotionCombinationRules(){

    return(
        <section className={styles.rulesSection}>
            <ExclamationCircleIcon/>
            <div className={styles.sectionContent}>
                <div className={styles.heading}>
                    <ExclamationCircleIcon/>
                    <h2 className="ma-h2" style={{color: "var(--txt-active)"}}>Правила сложения акций</h2>
                </div>
                <div className={styles.rule}>
                    <p className={`ma-p ${styles.title}`}>Базовый принцип</p>
                    <p className={`ma-p ${styles.description}`}>1 заказ = 1 пакет/спецпредложение + 1 скидка максимум</p>
                </div>
                <div className={styles.rule}>
                    <p className={`ma-p ${styles.title}`}>Особые условия для именинников</p>
                    <p className={`ma-p ${styles.description}`}>
                        Именинный сертификат действует с:<li className="ma-p">«Частичной арендой»</li><li className="ma-p">Стандартным меню</li>
                        Не действует с:<li className="ma-p">«Всё включено»</li><li className="ma-p">Корпоративными пакетами</li>

                    </p>
                </div>
                <div className={styles.rule}>
                    <p className={`ma-p ${styles.title}`}>Индивидуальные условия</p>
                    <p className={`ma-p ${styles.description}`}>Индивидуальные условия для крупных чеков/будних дат — по согласованию менеджера</p>
                </div>
            </div>
        </section>
    )
}