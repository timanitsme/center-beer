import BeerTapIcon from "../../assets/beer-tap-icon.svg";
import BeerCaseIcon from "../../assets/beer-case-icon.svg";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg";
import CoctailIcon from "../../assets/coctail-icon.svg";
import SausageIcon from "../../assets/sausage-icon.svg";

const paths = [
    {title:"center.beer", path: "/"},
    {title:"Пивоварни", path: "/"},
]

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
        title: "Поиск пивоварни",
        options: ["Бакунин", "Konix brewery", "Brauning Bier", "Wild Lab"],
        type: "search"
    },
    {
        title: "Город",
        options: ["Усть-илимск", "Люберцы", "Электросталь", "Щёкино", "Орёл", "Нягань"],
        type: "combobox"
    },
    {
        title: "Продукция",
        options: ["Пиво", "Безалкагольные напитки", "Крепкий алкоголь", "Вино", "Закуски", "Еда"],
        type: "combobox"
    },
]

export const getBreweryPagePaths = () => paths;
export const getBreweryPageFilterButtons = () => filterButtons;
export const getBreweryPageFilters = () => filters;