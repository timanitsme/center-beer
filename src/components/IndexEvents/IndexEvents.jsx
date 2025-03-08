import styles from "./IndexEvents.module.css"
import {useEffect, useRef, useState} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import EventPicture1 from "../../assets/eventsMocks/event-picture-1.svg"
import EventPicture2 from "../../assets/eventsMocks/event-picture-2.svg"
import EventPicture3 from "../../assets/eventsMocks/event-picture-3.svg"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import ArrowLeftIcon from "../../assets/arrow-left-icon.svg?react"
import ArrowRightIcon from "../../assets/arrow-right-icon.svg?react"


export default function IndexEvents(){
    const eventRef = useRef(null);
    const datesRef = useRef(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const events = [
        {date: "06-01-25", title: "CRAFT MAGIC NIGHT 2025 (Новосибирск)", image: EventPicture1, description: "6 января 2025 года в Новосибирском Академгородке, в ресторане GUSI, пройдёт 5-й, юбилейный фестиваль CRAFT MAGIC NIGHT — празднование Рождества в формате пивной безлимит."},
        {date: "18-01-25", title: "Craft Depot Winter Fest (Москва)", image: EventPicture2, description: "18 января 2025 года в Москве, в зале «Амбер Плаза» (Краснопролетарская улица, 36, м. Новослободская), пройдёт Craft Depot Winter Fest. Ожидается участие 40 пивоварен, которые представят 160 сортов."},
        {date: "06-01-25", title: "Конкурс красоты «Пивная краса России» (Москва)", image: EventPicture3, description: "1 февраля 2025 года в Москве, на теплоходе  River Palace, состоится конкурс красоты «Пивная краса России».\n\nГостей ждёт пятичасовая прогулка по Москве-реке (19:00-24:00), ужин,"}
    ]

    const generateDates = () => {
        const dates = [];
        const year = currentMonth.getFullYear();

        for (let month = 0; month < 12; month++) {
            const daysInMonth = new Date(year, month + 1, 0).getDate(); // Получаем количество дней в месяце
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(year, month, day);
                dates.push({
                    day: day,
                    weekday: getWeekdayName(date),
                    month: getMonthName(date),
                    fullDate: date
                });
            }
        }

        return dates;
    };

// Вспомогательная функция для получения названия дня недели
    const getWeekdayName = (date) => {
        const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        return weekdays[date.getDay()];
    };

// Вспомогательная функция для получения названия месяца
    const getMonthName = (date) => {
        const months = [
            'Январь',
            'Февраль',
            'Март',
            'Апрель',
            'Май',
            'Июнь',
            'Июль',
            'Август',
            'Сентябрь',
            'Октябрь',
            'Ноябрь',
            'Декабрь'
        ];
        return months[date.getMonth()];
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
        // Здесь можно добавить фильтрацию событий по дате
    };

    useEffect(() => {
        const handlePreventDefault = (e) => {
            if (datesRef.current && datesRef.current.contains(e.target)) {
                e.preventDefault();
            }
        };

        const container = datesRef.current;
        if (container) {
            container.addEventListener('wheel', handlePreventDefault, { passive: false });
        }

        return () => {
            if (container) {
                container.removeEventListener('wheel', handlePreventDefault);
            }
        };
    }, []);

    const handleWheelScroll = (e) => {
        if (datesRef.current && datesRef.current.contains(e.target)) {
            const container = datesRef.current;
            const delta = e.deltaY || e.deltaX;

            container.scrollBy({
                left: delta > 0 ? 100 : -100,
                behavior: 'instant',
            });

            e.preventDefault(); // Предотвращаем стандартное поведение
            e.stopPropagation(); // Останавливаем всплытие события
        }
    };

    const scrollDates = (direction) => {
        if (datesRef.current) {
            const container = datesRef.current;
            const monthWidth = container.offsetWidth - container.querySelector(`.${styles.day}`).offsetWidth || 0;

            const scrollAmount = direction === 'left'
                ? -monthWidth // Прокручиваем влево на ширину одного месяца
                : monthWidth; // Прокручиваем вправо на ширину одного месяца

            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    // Функция для прокрутки влево
    const scrollLeft = () => {
        if (eventRef.current) {
            const container = eventRef.current;
            const cardWidth = container.querySelector(`.${styles.eventCard}`).offsetWidth + 10;
            container.scrollBy({
                left: -cardWidth, // Прокручиваем на ширину одного события
                behavior: 'smooth',
            });
        }
    };

    // Функция для прокрутки вправо
    const scrollRight = () => {
        if (eventRef.current) {
            const container = eventRef.current;
            const cardWidth = container.querySelector(`.${styles.eventCard}`).offsetWidth + 10;
            container.scrollBy({
                left: cardWidth, // Прокручиваем на ширину одного изображения
                behavior: 'smooth',
            });
        }
    };

    return(
        <div className={styles.eventsSection}>
            <h1>Мероприятия</h1>
            <div className={styles.datesSection}>
                <div className={styles.scrollButton} onClick={() => scrollDates("left")}><ArrowLeftIcon/></div>
                <div className={styles.datesContainer} onWheel={handleWheelScroll} ref={datesRef}>
                    {Object.entries(
                        generateDates().reduce((acc, date) => {
                            if (!acc[date.month]) {
                                acc[date.month] = [];
                            }
                            acc[date.month].push(date);
                            return acc;
                        }, {})
                    ).map(([month, monthDates]) => (
                        <div key={month} className={styles.month}>
                            <p>{month}</p>
                            <div className={styles.days}>
                                {monthDates.map((date, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.day} ${
                                            selectedDate.getDate() === date.day &&
                                            selectedDate.getMonth() === date.fullDate.getMonth()
                                                ? styles.active
                                                : ''
                                        }`}
                                        onClick={() => handleDateClick(date.fullDate)}
                                    >
                                        <div className={styles.circle} />
                                        <p>{date.day}</p>
                                        <p>{date.weekday}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.scrollButton} onClick={() => scrollDates("right")}><ArrowRightIcon/></div>
            </div>
            <div className={styles.eventsContainer}>
                <div className={styles.eventsPictures} ref={eventRef}>
                    {events.map((event, index) =>
                        <div key={index} className={styles.eventCard}>
                            <p>{event.date}</p>
                            <h3>{event.title}</h3>
                            <img src={event.image} alt=''/>
                            <p>{event.description}</p>
                        </div>
                    )}

                </div>
                <div className={styles.buttonsRow}>
                    <div className={styles.eventsButtons}>
                        <ArrowButton direction="left" onClick={scrollLeft}></ArrowButton>
                        <ArrowButton direction="right" onClick={scrollRight}></ArrowButton>
                    </div>
                    <div><RoundLinkButton text="Все мероприятия"/></div>
                </div>

            </div>
        </div>
    )
}