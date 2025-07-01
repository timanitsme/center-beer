import styles from "./Excursions.module.scss"
import ExcursionPicture from "../../assets/excursion-picture.svg"

export default function Excursions({ref = null}){
    return(
        <div className={styles.excursionsContainer} ref={ref}>
            <div className={styles.imageContainer}>
                <img src={ExcursionPicture} alt=""/>
            </div>
            <div className={styles.description}>
                <h1>Экскурсии</h1>
                <div className={styles.descriptionContainer}>
                    <h3 className="ma-h3">Приглашаем к нам на экскурсию</h3>
                    <p className="ma-p">Добро пожаловать в нашу пивоварню, где традиции и мастерство сочетаются с инновациями и страстью к созданию настоящего пива! Мы приглашаем вас на увлекательную экскурсию, чтобы вы могли увидеть, как рождается ваш любимый напиток, и узнать все секреты его производства. Откройте для себя богатую историю нашего ремесла и насладитесь уникальной атмосферой нашего производства. Присоединяйтесь к нам и погрузитесь в мир настоящего пивоваренного искусства!</p>
                    <div className={styles.settings}>
                        <div>
                            <h3 className="ma-h3-small">Дни</h3>
                            <p className="ma-p">Вторник</p>
                            <p className="ma-p">Четверг</p>
                        </div>
                        <div>
                            <h3 className="ma-h3-small">Время</h3>
                            <p className="ma-p">16:00</p>
                        </div>
                        <div>
                            <h3 className="ma-h3-small">Цена</h3>
                            <p className="ma-p">400₽</p>
                        </div>
                        <div>
                            <h3 className="ma-h3-small">Контакты</h3>
                            <p className="ma-p">+79250003900</p>
                            <p className="ma-p">address@server.ru</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}