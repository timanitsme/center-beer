import BeerTapIcon from "../../../assets/beer-tap-icon.svg?react";
import BeerCaseIcon from "../../../assets/beer-case-icon.svg?react";
import AlcoBottleIcon from "../../../assets/alco-bottle-icon.svg?react";
import CoctailIcon from "../../../assets/coctail-icon.svg?react";
import SausageIcon from "../../../assets/sausage-icon.svg?react";

const filterButtons = [
    {text: "на кранах", icon: <BeerTapIcon/>},
    {text: "фасованное пиво", icon: <BeerCaseIcon/>},
    {text: "крепкий алкоголь", icon: <AlcoBottleIcon/>},
    {text: "коктейли", icon: <CoctailIcon/>},
    {text: "настойки", icon: <AlcoBottleIcon/>},
    {text: "еда", icon: <SausageIcon/>},
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

export const getBarsPageFilterButtons = () => filterButtons;
export const getBarsPageFilters = () => filters;