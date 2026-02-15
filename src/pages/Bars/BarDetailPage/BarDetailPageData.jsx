import BeerTapIcon from "../../../assets/beer-tap-icon.svg?react";
import BeerCaseIcon from "../../../assets/beer-case-icon.svg?react";
import AlcoBottleIcon from "../../../assets/alco-bottle-icon.svg?react";
import CoctailIcon from "../../../assets/coctail-icon.svg?react";
import SausageIcon from "../../../assets/sausage-icon.svg?react";
import Bottle1 from "../../../assets/bottlesMock/bottle-1.svg";
import Bottle2 from "../../../assets/bottlesMock/bottle-2.svg";
import Bottle3 from "../../../assets/bottlesMock/bottle-3.svg";
import Bottle4 from "../../../assets/bottlesMock/bottle-4.svg";
import Bottle5 from "../../../assets/bottlesMock/bottle-5.svg";
import Strong1 from "../../../assets/bottlesMock/strong-1.svg";
import Strong2 from "../../../assets/bottlesMock/strong-2.svg";
import Strong3 from "../../../assets/bottlesMock/strong-3.svg";
import Strong4 from "../../../assets/bottlesMock/strong-4.svg";
import Strong5 from "../../../assets/bottlesMock/strong-5.svg";
import Burger1 from "../../../assets/bottlesMock/burger-1.svg";
import Burger2 from "../../../assets/bottlesMock/burger-2.svg";
import Burger3 from "../../../assets/bottlesMock/burger-3.svg";
import Burger4 from "../../../assets/bottlesMock/burger-4.svg";
import Burger5 from "../../../assets/bottlesMock/burger-5.svg";
import Drink1 from "../../../assets/bottlesMock/drink-1.svg";
import Drink2 from "../../../assets/bottlesMock/drink-2.svg";
import Drink3 from "../../../assets/bottlesMock/drink-3.svg";
import Drink4 from "../../../assets/bottlesMock/drink-4.svg";
import Drink5 from "../../../assets/bottlesMock/drink-5.svg";
import Drink6 from "../../../assets/bottlesMock/drink-6.svg";
import DraftBeerCard from "../../../components/Cards/DraftBeerCard/DraftBeerCard.jsx";
import BottledBeerCard from "../../../components/Cards/BottledBeerCard/BottledBeerCard.jsx";
import BottlesPairIcon from "../../../assets/bottles-pair-icon.svg?react";
import ProductCard from "../../../components/Cards/ProductCard/ProductCard.jsx";
import MeatIcon from "../../../assets/meat-icon.svg?react";
import StrongAlcoholCard from "../../../components/Cards/StrongAlcoCard/StrongAlcoholCard.jsx";
import TeaIcon from "../../../assets/tea-icon.svg?react";
import Review1 from "../../../assets/reviewsMocks/review-1.svg";
import Review2 from "../../../assets/reviewsMocks/review-2.svg";
import Review3 from "../../../assets/reviewsMocks/review-3.svg";
import Review4 from "../../../assets/reviewsMocks/review-4.svg";
import Review5 from "../../../assets/reviewsMocks/review-5.svg";
import Review6 from "../../../assets/reviewsMocks/review-6.svg";


// Navigation
const paths = [
    {title:"center.beer", path: "/"},
    {title:"Бары и магазины", path: "/bars"},
]


// Menu
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

const cardsDraft = [
    {title: "APA", manufacturer: "13 RULES, Россия", style: "APA", strength: 4.5, density: 12, bitterness: 32, price: 180},
    {title: "ДВА ПУТЯ", manufacturer: "Konix Brewery, Заречный, Россия и еще что то", style: "Lager - Helles", strength: 4.5, density: 12, bitterness: 32, price: 280},
    {title: "CZECH PILSNER", manufacturer: "Konix Brewery, Заречный, Россия", style: "Pilsner - Czech", strength: 4.5, density: 12, bitterness: 32, price: 310},
    {title: "APA", manufacturer: "13 RULES, Россия", style: "APA", strength: 4.5, density: 12, bitterness: 32, price: 180},
    {title: "ДВА ПУТЯ", manufacturer: "Konix Brewery, Заречный, Россия", style: "Lager - Helles", strength: 4.5, density: 12, bitterness: 32, price: 280},
    {title: "CZECH PILSNER", manufacturer: "Konix Brewery, Заречный, Россия", style: "Pilsner - Czech", strength: 4.5, density: 12, bitterness: 32, price: 310},
]

const cardsBottled = [
    {title:"Terra Firma", manufacturer: "Чаща, Москва, Россия", img: Bottle1,strength: 6.5, density: 12, bitterness: 32, price: 380, rating: 5},
    {title:"Der Stern", manufacturer: "Чаща, Москва, Россия", img: Bottle2,strength: 6.5, density: 12, bitterness: 32, price: 280, rating: 4.5},
    {title:"Headline", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle3,strength: 6.5, density: 12, bitterness: 32, price: 380},
    {title:"Небо над Тагилом", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle4,strength: 6.5, density: 12, bitterness: 32, price: 480},
    {title:"Terra Firma", manufacturer: "Чаща, Москва, Россия", img: Bottle5,strength: 6.5, density: 12, bitterness: 32, price: 180, rating: 4.7},
]

const cardsStrong = [
    {title:"ХЕННЕССИ", description: "Коньяк ординарный", img: Strong1, strength: 40, exposure: "VS", volume: 1, price: 8500, rating: 5},
    {title:"ТОРРЕС 5 СОЛЕРА РЕЗЕРВА", description: "Бренди, Испания", img: Strong2, strength: 38, volume: 0.5, price: 1500, rating: 5},
    {title:"ГРИНДЖИН КЛАССИК", description: "Джин, Беларусь", img: Strong3, strength: 40, volume: 0.5, price: 500, rating: 5},
    {title:"БЭЛЛС ОРИДЖИНАЛ", description: "Виски шотландский, Великобритания", img: Strong4, strength: 40, volume: 0.5, price: 800, rating: 5},
    {title:"ФЕЛВУД", description: "Виски купажированный, Россия", img: Strong5, strength: 40, exposure: "VS", volume: 0.5, price: 500, rating: 5},
]

const cardsBurgers = [
    {title:"13 Rules", description: "Булочка, говяжья котлета, томат, огурец маринованный, бекон, сыр чеддер, салат айсберг, луковые кольца, картошка фри, соус кетчуп", img: Burger1, weight: 280, price: 525, rating: 5},
    {title:"Бургер с ананасом", description: "Булочка, говяжья котлета, соус майонез-кетчуп, картошка фри, соус кетчуп", img: Burger2, weight: 280, price: 380, rating: 5},
    {title:"Диабло (с халапенью", description: "Булочка, говяжья котлета, томат, огурец маринованный, лук, сыр чеддер, картошка фри, соус кетчуп", img: Burger3, weight: 280, price: 460, rating: 5},
    {title:"Гамбургер", description: "Булочка, говяжья котлета, бекон, томат, лук, салат латук, соус сырный, соус блю чиз, картошка фри, соус кетчуп", img: Burger4, weight: 280, price: 430, rating: 5},
    {title:"Чизбургер", description: "Булочка, говяжья котлета, томат, огурец маринованный, бекон, сыр чеддер, салат айсберг, луковые кольца, картошка фри, соус кетчуп", img: Burger5, weight: 280, price: 550, rating: 5},
]

const cardsDrinks = [
    {title:"RICH БИТТЕР ГРЕЙПФРУТ", description: "Напиток безалкогольный сильногазированный со вкусом греупфрута Rich", img: Drink1, weight: 1, price: 100, weightSpan: "л."},
    {title:"ДОБРЫЙ КОЛА", description: "Напиток безалкогольный, сильногазированный, ароматизированный, вкус \"Кола\"", img: Drink2, weight: 0.5, price: 100, weightSpan: "л."},
    {title:"ЗЕМЛЯНИЧНОЕ ЛЕТО", description: "Напиток сокосодержащий с ярким вкусом и ароматом спелой земляники. Для всей семьи", img: Drink3, weight: 1.93, price: 200, weightSpan: "л."},
    {title:"ДОБРЫЙ PULPY АПЕЛЬСИН", description: "Сокосодержащий напиток с цельной мякотью — это микс апельсинового сока, артезианской воды и «палпинок» — натуральной мякоти цитрусовых", img: Drink4, weight: 1, price: 100, weightSpan: "л."},
    {title:"EVERVESS ТОНИК ЛИМОН", description: "Газированный напиток «Тоник горький лимон» марки Evervess обладает ярким ароматом и насыщенным цитрусовым вкусом приятной горчинкой.", img: Drink5, weight: 1, price: 100, weightSpan: "л."},
    {title:"Вода ГОРНАЯ", description: "Вода негазированная, питьевая, первой категории.", img: Drink6, weight: 0.5, price: 30, weightSpan: "л."},

]

const specsDraft = {
    header: "Сегодня и завтра у нас на кранах",
    description: "Мы предлагаем широкий ассортимент пива на кранах, чтобы удовлетворить самые разные вкусы и предпочтения наших гостей. От классических светлых элей до насыщенных янтарных и плотных пшеничных сортов — каждый найдет напиток по душе.",
    cards: cardsDraft,
}

const specsBottled = {
    header: "СЕГОДНЯ У НАС НА ПОЛКАХ",
    description: "В нашем баре представлен богатый выбор пива на любой вкус, чтобы каждый посетитель мог насладиться уникальным и качественным напитком. От традиционных светлых лагеров до изысканных крафтовых элей — вас ждет разнообразие стилей и вкусов.",
    cards: cardsBottled,
}

const specsBurgers = {
    header: "ПИВО И БУРГЕРЫ КЛАССИЧЕСКАЯ ИСТОРИЯ ЛЮБВИ",
    description: "Рады предложить не только великолепный выбор пива, но и аппетитные закуски, идеально сочетающиеся с пенными напитками. Каждое блюдо в создано, чтобы подчеркнуть вкус любимого пива и доставить вам гастрономическое удовольствие.",
    cards: cardsBurgers,
}

const specsStrong = {
    header: "Крепкий алкоголь",
    description: "Приглашаем вас ознакомиться с ассортиментом крепкого алкоголя, который удовлетворит вкусы самых взыскательных гостей. Вы найдете лучшие образцы виски, водки, рома и других напитков, которые идеально подойдут для вашего вечера.",
    cards: cardsStrong,
}

const specsDrinks = {
    header: "Безалкогольные напитки",
    description: "Большой выбор безалкогольных напитков, которые порадуют как гостей, предпочитающих освежающие альтернативы, так и тех, кто придерживается здорового образа жизни. Соки, смузи, газированные напитки и многое другое.",
    cards: cardsDrinks,
}

const sections = [
    {specs: specsDraft, CardComponent: DraftBeerCard, IconComponent: BeerTapIcon, wideColumns: false},
    {specs: specsBottled, CardComponent: BottledBeerCard, IconComponent: BottlesPairIcon, wideColumns: false},
    {specs: specsBurgers, CardComponent: ProductCard, IconComponent: MeatIcon, wideColumns: true},
    {specs: specsStrong, CardComponent: StrongAlcoholCard, IconComponent: AlcoBottleIcon, wideColumns: false},
    {specs: specsDrinks, CardComponent: ProductCard, IconComponent: TeaIcon, wideColumns: true},
]

const barReviewsHeader = {
    title: "отзывы наших гостей",
    description: "Приглашаем вас ознакомиться с отзывами наших дорогих гостей, которые уже успели оценить атмосферу и вкусности нашего бара. Их слова и впечатления — лучшее доказательство того, что у нас вы проведете время незабываемо."
}

const barReviewsImages = [
    {preview: Review1, type: "image"},
    {preview: Review2, type: "image"},
    {preview: Review3, type: "image"},
    {preview: Review4, type: "image"},
    {preview: Review5, type: "image"},
    {preview: Review6, type: "image"},
]

const barReviewsResume = {
    title: "Гости довольны",
    rated: (number) => `Бар оценило ${number} посетителя.`,
    rating: 3.5,
    description: "В среднем это на 15% выше, чем у других баров в нашем рейтинге."
}

export const getBarPagePaths = () => paths;
export const getBarPageFilterButtons = () => filterButtons;
export const getBarPageFilters = () => filters;
export const getBarPageSections = () => sections;
export const getBarReviewsHeader = () => barReviewsHeader;
export const getBarReviewsImages = () => barReviewsImages;
export const getBarReviewsResume = () => barReviewsResume;