// Navigation
import Review1 from "../../assets/reviewsMocks/beer-review-1.svg";
import Review2 from "../../assets/reviewsMocks/beer-review-2.svg";
import Review3 from "../../assets/reviewsMocks/beer-review-3.svg";
import Review4 from "../../assets/reviewsMocks/beer-review-4.svg";
import Review5 from "../../assets/reviewsMocks/beer-review-5.svg";
import Review6 from "../../assets/reviewsMocks/beer-review-6.svg";

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

export const getBeerDetailPaths = () => paths;
export const getBeerDetailReviewsHeader = () => reviewsHeader;
export const getBeerDetailReviewsImages = () => reviewsImages;
export const getBeerDetailReviewsResume = () => reviewsResume;
