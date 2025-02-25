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
        title: "Цвет",
        options: ["Темное", "Светлое", "Красное", "Белое", "Смешанное"],
        type: "checkboxSection"
    },
    {
        title: "Цена",
        options: ["Все", "до 1 000 ₽", "1 000 - 2 000 ₽", "2 000 - 3 000 ₽", "от 3 000 ₽"],
        type: "radio"
    },
    {
        title: "Алкоголь",
        options: ["Любой", "0 %", "3-5 %", "5-7 %", "7-11 %"],
        type: "rangeRadio"
    },
    {
        title: "Плотность",
        options: ["Любая", "5 %", "5-10 %", "10-15 %", "15-20 %"],
        type: "rangeRadio"
    },
    {
        title: "Горечь",
        options: ["Любая", "20-40", "40-60", "60-80", "Больше 80"],
        type: "rangeRadio"
    },
    {
        title: "Объём",
        options: ["0,18 л.", "0,33 л.", "0,5 л.", "0,75 л.", "1 л.", "1,5 л." ],
        type: "checkboxSection"
    },
    {
        title: "Тара",
        options: ["Бутылка", "Банка", "Розлив"],
        type: "checkboxSection"
    },
    {
        title: "Бренд",
        options: ["Corona Extra", "Brahma", "Harbin", "Heineken", "Yanjing", "Skol"],
        type: "combobox"
    }
]

export const getBeerPageFilterButtons = () => filterButtons;
export const getBeerPageFilters = () => filters;