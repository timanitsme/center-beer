// Navigation
import Review1 from "../../assets/reviewsMocks/beer-review-1.svg";
import Review2 from "../../assets/reviewsMocks/beer-review-2.svg";
import Review3 from "../../assets/reviewsMocks/beer-review-3.svg";
import Review4 from "../../assets/reviewsMocks/beer-review-4.svg";
import Review5 from "../../assets/reviewsMocks/beer-review-5.svg";
import Review6 from "../../assets/reviewsMocks/beer-review-6.svg";
import Bar1 from "../../assets/barsMocks/bar-1.svg";
import Bar2 from "../../assets/barsMocks/bar-2.svg";
import Bar3 from "../../assets/barsMocks/bar-3.svg";
import Bar4 from "../../assets/barsMocks/bar-4.svg";

const paths = [
    {title:"beer.center", path: "/"},
    {title:"Пиво", path: "/beer/"},
    {title:"Czech Pilsner", path: ""}
]

// Reviews
const reviewsHeader = {
    title: "отзывы о Czech Pilsner",
    description: "Отзывы любителей пива, которые уже успели попробовать и оценить Czech Pilsner. Поделитесь и вы своим впечатлением о пиве Czech Pilsner, чтобы помочь другим сделать правильный выбор и насладиться этим напитком так же, как и вы."
}

const reviewsImages = [Review1, Review2, Review3, Review4, Review5, Review6, Review2, Review3, Review1, Review6, Review4, Review5]

const reviewsResume = {
    title: "Пиво нравится",
    rated: "Czech Pilsner оценило 344 посетителя.",
    rating: 4.9,
    description: "В среднем это на 15% выше, чем у других сортов пива в нашем рейтинге."
}

const cardsBars = [
    {title: "13 RULES (Народный бар)", img: Bar1, expensiveness: 3, address: "г. Москва, Сущевский вал, 41", metro: "Лубянка, Сретенский бульвар", rating: 5, comments: 116, closed: false},
    {title: "13 RULES (Народный бар)", img: Bar2, expensiveness: 2, address: "г. Москва, Сущевский вал, 41", metro: "Новокузнецкая, Третьяковская", rating: 5, comments: 116, closed: false},
    {title: "13 RULES (Народный бар)", img: Bar3, expensiveness: 1, address: "г. Москва, Сущевский вал, 41", metro: "Проспект Мира, Рижская", rating: 5, comments: 116, closed: true},
    {title: "13 RULES (Народный бар)", img: Bar4, expensiveness: 4, address: "г. Москва, Сущевский вал, 41", metro: "Александровский сад", rating: 5, comments: 116, closed: false},
]

export const getBeerDetailPaths = () => paths;
export const getBeerDetailReviewsHeader = () => reviewsHeader;
export const getBeerDetailReviewsImages = () => reviewsImages;
export const getBeerDetailReviewsResume = () => reviewsResume;
export const getBeerDetailBarsRowCards = () => cardsBars;