import styles from "./CustomEventCaseReview.module.scss"
import UsersIcon from "../../assets/lucide/users-lucide-icon.svg?react"
import CalendarIcon from "../../assets/lucide/calendar-lucide-icon.svg?react"
import StarIcon from "../../assets/lucide/star-lucide-icon.svg?react"
import CaseReview1 from "../../assets/customEventsPictures/case-review-1.webp"
import CaseReview2 from "../../assets/customEventsPictures/case-review-2.webp"
import CaseReview3 from "../../assets/customEventsPictures/case-review-3.webp"
import CasePicture from "../../assets/customEventsPictures/case-picture.webp"

export default function CustomEventCaseReview(){
    return(
        <section className={styles.case}>
            <div className={styles.badge}><p className="ma-p">Кейс: история успеха</p></div>
            <div>
                <h2 className="ma-h3">Корпоратив на 30 гостей</h2>
                <p style={{textAlign: "center", alignSelf: "center", fontWeight: 300}} className="ma-p">Как мы организовали идеальный корпоратив с полным циклом услуг</p>
            </div>
            <div className={styles.caseGrid}>
                <div className={styles.caseBlock}>
                    <div className={styles.title}>
                        <UsersIcon/>
                        <p className="ma-p">Детали проекта</p>
                    </div>
                    <div className={styles.caseTable}>
                        <div className={styles.caseTableRow}>
                            <p className="ma-p">Бюджет:</p>
                            <p className="ma-p">100 000 ₽</p>
                        </div>
                        <div className={styles.caseTableRow}>
                            <p className="ma-p">Длительность:</p>
                            <p className="ma-p">5 часов</p>
                        </div>
                        <div className={styles.caseTableRow}>
                            <p className="ma-p">Формат:</p>
                            <p className="ma-p">Все включено</p>
                        </div>
                    </div>
                </div>
                <div className={styles.caseBlock}>
                    <div className={styles.title}>
                        <CalendarIcon/>
                        <p className="ma-p">Программа мероприятия</p>
                    </div>
                    <div className={styles.caseTable}>
                        <li className="ma-p">Интерактивы</li>
                        <li className="ma-p">Квизы</li>
                        <li className="ma-p">Мастер-класс от шефа</li>
                    </div>
                </div>
                <div className={styles.caseBlock}>
                    <div className={styles.title}>
                        <StarIcon/>
                        <p className="ma-p">Отзывы гостей</p>
                    </div>
                    <div className={styles.reviews}>
                        <div className={styles.review}>
                            <img className={styles.avatar} src={CaseReview1} alt=""/>
                            <p className="ma-p"><b>«Отличная атмосфера, все довольны!»</b> — Елена</p>
                        </div>
                        <div className={styles.review}>
                            <img className={styles.avatar} src={CaseReview2} alt=""/>
                            <p className="ma-p"><b>«Бармены настоящие мастера, напитки на высоте!»</b> — Олег</p>
                        </div>
                        <div className={styles.review}>
                            <img className={styles.avatar} src={CaseReview3} alt=""/>
                            <p className="ma-p"><b>«Провели незабываемый вечер с коллегами»</b> — Светлана</p>
                        </div>
                    </div>
                </div>
                <div className={styles.caseSummary}>
                    <h3 className="ma-h4">Результат</h3>
                    <div className={styles.results}>
                        <div className={styles.result}>
                            <h3 className="ma-h3">100%</h3>
                            <p className="ma-p">довольных гостей</p>
                        </div>
                        <div className={styles.result}>
                            <h3 className="ma-h3">30</h3>
                            <p className="ma-p">участников</p>
                        </div>
                        <div className={styles.result}>
                            <h3 className="ma-h3">5</h3>
                            <p className="ma-p">часов веселья</p>
                        </div>
                    </div>
                    <div className={`${styles.badge} ${styles.green}`}>
                        <p className="ma-p">Экономия 30 000 ₽ благодаря пакету «Все включено»</p>
                    </div>
                    <img src={CasePicture} className={styles.casePicture} alt=""/>
                    <div className={styles.quote}>
                        <p className="ma-p">«Все прошло идеально, гости в восторге, организация на высшем уровне»</p>
                        <p className="ma-p"><b>Ирина, HR-директор</b></p>
                    </div>
                </div>
            </div>
        </section>
    )
}
