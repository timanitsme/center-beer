import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import styles from "./WorktimeModal.module.scss";

export default function WorktimeModal({workTimeList, show, setShow}){
    const weekdays = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    const today = new Date()
    const dateToday = today.getDay()
    const getDayOfWeek = dateToday === 0? 6: dateToday-1

    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.listContainer}>
                <h6 className={`${styles.active} ${styles.title}`}>График работы бара</h6>
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