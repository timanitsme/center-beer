import BeerTapIcon from "../../assets/beer-tap-icon.svg?react";
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg?react";
import CoctailIcon from "../../assets/coctail-icon.svg?react";
import SausageIcon from "../../assets/sausage-icon.svg?react";

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
        title: "Страна производства",
        options: ["Абхазия", "Австралия", "Азербайджан", "Албания", "Алжир", "Россия"],
        type: "combobox"
    },
    {
        title: "Стиль пива",
        options: ["Светлый лагер", "Пиланер", "Пшеничный эль", "Темный лагер", "Бок", "Биттер"],
        type: "combobox"
    },
    {
        title: "Цена",
        options: ["Все", "до 1 000 ₽", "1 000 - 2 000 ₽", "2 000 - 3 000 ₽", "от 3 000 ₽"],
        type: "radio"
    },
    {
        title: "Бренд",
        options: ["Corona Extra", "Brahma", "Harbin", "Heineken", "Yanjing", "Skol"],
        type: "combobox"
    }
]

export const getBeerPageFilterButtons = () => filterButtons;
export const getBeerPageFilters = () => filters;