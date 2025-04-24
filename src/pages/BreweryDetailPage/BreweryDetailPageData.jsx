import Review1 from "../../assets/reviewsMocks/beer-review-1.svg"
import Review2 from "../../assets/reviewsMocks/beer-review-2.svg"
import Review3 from "../../assets/reviewsMocks/beer-review-3.svg"
import Review4 from "../../assets/reviewsMocks/beer-review-4.svg"
import Review5 from "../../assets/reviewsMocks/beer-review-5.svg"
import Review6 from "../../assets/reviewsMocks/beer-review-6.svg"
import Bar1 from "../../assets/barsMocks/bar-1.svg";
import Bar2 from "../../assets/barsMocks/bar-2.svg";
import Bar3 from "../../assets/barsMocks/bar-3.svg";
import Bar4 from "../../assets/barsMocks/bar-4.svg";

const paths = [
    {title:"center.beer", path: "/"},
    {title:"Пивоварни", path: "/beer/"},
    {title: "Jaws Brewery", path: ""},
]

// Reviews
const reviewsHeader = {
    title: "отзывы о Jaws Brewery",
    description: "Отзывы любителей пива, которые уже успели попробовать продукцию Jaws Brewery. Поделитесь и вы своим впечатлением о пивоварне Jaws Brewery, чтобы помочь другим сделать правильный выбор и насладиться их напитками, как и вы."
}

const reviewsImages = [Review1, Review2, Review3, Review4, Review5, Review6, Review2, Review3, Review1, Review6, Review4, Review5]

const reviewsResume = {
    title: "Продукция нравится",
    rated: "Jaws Brewery оценило 344 посетителя.",
    rating: 4.9,
    description: "В среднем это на 15% выше, чем у других пивоварен в нашем рейтинге."
}

const cardsBars = [
    {title: "13 RULES (Народный бар)", img: Bar1, expensiveness: 3, address: "г. Москва, Сущевский вал, 41", metro: "Лубянка, Сретенский бульвар", rating: 5, comments: 116, closed: false},
    {title: "13 RULES (Народный бар)", img: Bar2, expensiveness: 2, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, comments: 116, closed: false},
    {title: "13 RULES (Народный бар)", img: Bar3, expensiveness: 1, address: "г. Москва, Сущевский вал, 41", metro: "Проспект Мира, Рижская", rating: 5, comments: 116, closed: true},
    {title: "13 RULES (Народный бар)", img: Bar4, expensiveness: 4, address: "г. Москва, Сущевский вал, 41", metro: "Александровский сад", rating: 5, comments: 116, closed: false},
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


export const getBreweryDetailPagePaths = () => paths;
export const getBreweryDetailReviewsHeader = () => reviewsHeader;
export const getBreweryDetailReviewsImages = () => reviewsImages;
export const getBreweryDetailReviewsResume = () => reviewsResume;
export const getBreweryDetailBarsCards = () => cardsBars;
export const getBreweryDetailFilters = () => filters;