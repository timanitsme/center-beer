import styles from "./DatePicker.module.scss"
import {useEffect, useState} from "react";
import CaretDownBold from "../../assets/caret-down-bold-icon.svg?react"


export default function DatePicker({onPick}){
    const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
    const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
    const currentDate = new Date()
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth())
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear())
    const [fillersCount, setFillersCount] = useState(0)
    const [daysOfWeek, setDaysOfWeek] = useState([])

    function getDaysInMonth(year, month) {
        const nextMonth = new Date(year, month + 1, 1);
        const lastDayOfMonth = new Date(nextMonth.getTime() - 1).getDate();
        return  Array.from({ length: lastDayOfMonth }, (_, index) => index + 1);
    }

    function getFirstDayOfWeek(year, month) {
        const firstDayOfMonth = new Date(year, month, 1);
        const dayOfWeek = firstDayOfMonth.getDay();
        return (dayOfWeek + 6) % 7;
    }

    useEffect(() => {
        setFillersCount(getFirstDayOfWeek(selectedYear, selectedMonth))
        setDaysOfWeek(getDaysInMonth(selectedYear, selectedMonth))
    }, [])

    useEffect(() => {
        setFillersCount(getFirstDayOfWeek(selectedYear, selectedMonth))
        setDaysOfWeek(getDaysInMonth(selectedYear, selectedMonth))
    }, [selectedMonth]);

    const nextMonth = () => {
        if (selectedMonth === 11){
            setSelectedYear(selectedYear+1)
            setSelectedMonth(0)
        }
        else{
            setSelectedMonth(selectedMonth+1)
        }
    }

    const previousMonth = () => {
        if (selectedMonth === 0){
            setSelectedYear(selectedYear-1)
            setSelectedMonth(11)
        }
        else{
            setSelectedMonth(selectedMonth-1)
        }
    }

    const getDateStatus = (day, month, year) => {
        const targetDate = new Date(year, month, day);

        if (targetDate.getTime() === currentDate.setHours(0, 0, 0, 0)) {
            return 0;
        } else if (targetDate < currentDate) {
            return -1;
        } else {
            return 1;
        }
    }

    return(
        <section className={styles.datePicker}>
            <div className={styles.topBar}>
                <div className={styles.left} onClick={previousMonth}><CaretDownBold/></div>
                <p className={`ma-p ${styles.date} noSelect`}>{months[selectedMonth]}, {selectedYear}</p>
                <div className={styles.right} onClick={nextMonth}><CaretDownBold/></div>
            </div>
            <div className={styles.hrtLine}/>
            <div className={styles.daysGrid}>
                {weekdays.map((day, index) =>
                    <div key={index} className={`${styles.weekday} noSelect`}>{day}</div>
                )}
                {Array.from({ length: fillersCount }, (_, index) => (
                    <div key={`filler-${index}`}></div>
                ))}
                {daysOfWeek.map((day, index) =>{
                    switch (getDateStatus(day, selectedMonth, selectedYear)){
                        case -1:
                            return(<div key={`day-${index}`} className={`${styles.day} ${styles.past} noSelect`}><p>{day}</p></div>)
                        case 0:
                            return(<div key={`day-${index}`} className={`${styles.day} ${styles.current}`} onClick={() => onPick({day: day, month: selectedMonth+1, year: selectedYear})}><p>{day}</p></div>)
                        case 1:
                            return(<div key={`day-${index}`} className={`${styles.day} ${styles.next}`} onClick={() => onPick({day: day, month: selectedMonth+1, year: selectedYear})}><p>{day}</p></div>)
                        default:
                            break;
                    }
                })}
            </div>
        </section>
    )
}