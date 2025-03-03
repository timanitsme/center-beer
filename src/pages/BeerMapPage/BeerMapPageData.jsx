import LabelBottleIcon from "../../assets/label-bottle-icon.svg?react"
import BarrelIcon from "../../assets/barrel-icon.svg?react"
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react"
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react"

const paths = [
    {title:"beer.center", path: "/"},
    {title:"Карта баров", path: "/"},
]

const filterButtons = [
    {text: "Бары", icon: <LabelBottleIcon/>},
    {text: "Пивоварни", icon: <BarrelIcon/>},
    {text: "Пиво", icon: <BottlesPairIcon/>},
    {text: "Мероприятия", icon: <BeerMugsIcon/>}
]

const filters = [
    {
        title: "Город",
        options: ["Москва", "Нижний Новгород", "Санкт-Петербург"],
        type: "search"
    },
    {
        title: "Открыто сейчас",
        type: "checkbox"
    },
    {
        title: "Онлайн бронь",
        type: "checkbox"
    },
    {
        title: "Метро",
        options: ["Сретненский бульвар", "Третьяковская", "Рижская", "Александровский сад"],
        type: "combobox"
    },
    {
        title: "Кухня",
        options: ["Австралийская", "Австрийская", "Авторская", "Азербайджанская", "Азиатская", "Американская"],
        type: "combobox"
    },
    {
        title: "Цель посещения",
        options: ["Бизнес-ланч", "Весело напиться", "Девичник", "Деловая встреча", "Мальчишник", "Познакомиться"],
        type: "combobox"
    },
    {
        title: "Цена",
        options: ["Все", "до 1 000 ₽", "1 000 - 2 000 ₽", "2 000 - 3 000 ₽", "от 3 000 ₽"],
        type: "radio"
    },
    {
        title: "Тип заведения",
        options: ["Банкетный зал", "Бар", "Бар-клуб", "Бургерная", "Винный бар", "Гастробар"],
        type: "combobox"
    },
    {
        title: "Особенности",
        options: ["After-party", "DJ", "Dog-friendly", "Pre-party", "Wi-Fi", "Бильярд"],
        type: "combobox"
    },
]

export const getBeerMapPageFilterButtons = () => filterButtons;
export const getBeerMapPageFilters = () => filters;
export const getBeerMapPagePaths = () => paths;


