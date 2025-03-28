import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import styles from "./WorktimeModal.module.css";

export default function WorktimeModal({workTimeList, show, setShow}){
    const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    const today = new Date()
    const dateToday = today.getDay()
    const getDayOfWeek = dateToday === 0? 6: dateToday-1

    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.listContainer}>
                <p className={`${styles.active} ${styles.title}`}>График работы бара</p>
                {workTimeList && weekdays.map((day, index) =>
                    <div key={index} className={styles.day}>
                        <p>{day}</p>
                        <p className={getDayOfWeek === index? styles.current : styles.active} >{workTimeList[index]?.interval}</p>
                    </div>
                )}
            </div>
        </SimpleModal>
    )
}