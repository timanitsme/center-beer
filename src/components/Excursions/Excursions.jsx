import styles from "./Excursions.module.css"
import ExcursionPicture from "../../assets/excursion-picture.svg"

export default function Excursions(){
    return(
        <div className={styles.excursionsContainer}>
            <div className={styles.imageContainer}>
                <img src={ExcursionPicture} alt=""/>
            </div>
            <div className={styles.description}>
                <h1>Экскурсии</h1>
                <div className={styles.descriptionContainer}>
                    <h3>Приглашаем к нам на экскурсию</h3>
                    <p>Добро пожаловать в нашу пивоварню, где традиции и мастерство сочетаются с инновациями и страстью к созданию настоящего пива! Мы приглашаем вас на увлекательную экскурсию, чтобы вы могли увидеть, как рождается ваш любимый напиток, и узнать все секреты его производства. Откройте для себя богатую историю нашего ремесла и насладитесь уникальной атмосферой нашего производства. Присоединяйтесь к нам и погрузитесь в мир настоящего пивоваренного искусства!</p>
                    <div className={styles.settings}>
                        <div>
                            <h3>Дни</h3>
                            <p>Вторник</p>
                            <p>Четверг</p>
                        </div>
                        <div>
                            <h3>Время</h3>
                            <p>16:00</p>
                        </div>
                        <div>
                            <h3>Цена</h3>
                            <p>400₽</p>
                        </div>
                        <div>
                            <h3>Контакты</h3>
                            <p>+79250003900</p>
                            <p>address@server.ru</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}