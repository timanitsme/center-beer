
export default function formatDateTimeWithTextMonth(inputDate){
    const date = new Date(inputDate);
    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = date.getHours()
    const minutes = date.getMinutes()
    return `${day} ${month} ${year}, ${hours}:${minutes}`;
}