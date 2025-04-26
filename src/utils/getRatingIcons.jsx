import BeerBottleIcon from "../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../assets/bottle-empty-icon.svg?react";

export const getRatingIcons = (rating) => {
    const icons = [];
    const fullBottles = Math.floor(rating); // Целая часть рейтинга
    const hasHalfBottle = rating - fullBottles >= 0.1; // Есть ли половина бутылки

    for (let i = 0; i < 5; i++) {
        if (i < fullBottles) {
            icons.push(<BeerBottleIcon key={i}/>);
        } else if (i === fullBottles && hasHalfBottle) {
            icons.push(<HalfBeerBottleIcon key={i}/>);
        } else {
            icons.push(<EmptyBeerBottleIcon key={i}/>);
        }
    }

    return icons;
};