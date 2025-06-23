import {
    useGetBarMenuAlcFiltersQuery,
    useGetBarMenuAlcQuery,
    useGetBarMenuBeerFiltersQuery,
    useGetBarMenuBeerQuery,
    useGetBarMenuBottleFiltersQuery,
    useGetBarMenuBottleQuery,
    useGetBarMenuCocktailsFiltersQuery,
    useGetBarMenuCocktailsQuery,
    useGetBarMenuFoodFiltersQuery,
    useGetBarMenuFoodQuery
} from "../../store/services/centerBeer.js";
import BeerTapIcon from "../../assets/beer-tap-icon.svg?react";
import DraftBeerCard from "../Cards/DraftBeerCard/DraftBeerCard.jsx";
import DraftBeerCardSkeleton from "../Skeletons/DraftBeerCardSkeleton/DraftBeerCardSkeleton.jsx";
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react";
import BottledBeerCard from "../Cards/BottledBeerCard/BottledBeerCard.jsx";
import BottledBeerCardSkeleton from "../Skeletons/BottledBeerCardSkeleton/BottledBeerCardSkeleton.jsx";
import AlcoBottleIcon from "../../assets/alco-bottle-icon.svg?react";
import StrongAlcoholCard from "../Cards/StrongAlcoCard/StrongAlcoholCard.jsx";
import CoctailIcon from "../../assets/coctail-icon.svg?react";
import ProductCard from "../Cards/ProductCard/ProductCard.jsx";
import ProductCardSkeleton from "../Skeletons/ProductCardSkeleton/ProductCardSkeleton.jsx";
import MeatIcon from "../../assets/meat-icon.svg?react";
import {useEffect} from "react";

export function getBarMenuFilterSpec(alias){

    const filterSpecs = {
        beer: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "rangeRadio", id: "abv"},
            abv_from: {title: "Алкоголь от", id: "abv_from"},
            abv_to: {title: "Алкоголь до", id: "abv_to"},
            og: {title: "Плотность", component: "rangeRadio", id: "og"},
            og_from: {title: "Плотность от", id: "og_from"},
            og_to: {title: "Плотность до", id: "og_to"},
            ibu: {title: "Горечь", component: "rangeRadio", id: "ibu"},
            ibu_from: {title: "Горечь от", id: "ibu_from"},
            ibu_to: {title: "Горечь до", id: "ibu_to"},

        },
        beer_bottle: {
            colors: {title: "Цвет", component: "checkboxSection", id: "color_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
            abv: {title: "Алкоголь", component: "rangeRadio", id: "abv"},
            og: {title: "Плотность", component: "rangeRadio", id: "og"},
            ibu: {title: "Горечь", component: "rangeRadio", id: "ibu"},
            /*pack_vol: {title: "Объём", component: "", id: "ibu_id"},*/
            pack_type: {title: "Тара", component: "checkboxSection", id: "pack_ids"},
        },
        alc: {
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        },
        cocktails: {
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        },
        food: {
            kitchen: {title: "Кухня", component: "combobox", id: "kitchen_ids"},
            prices: {title: "Цена", component: "radio", id: "price_ids"},
        }
    }
    return filterSpecs[alias]
}

export function getBarMenuInitialState(alias, barId){
    const initialStates = {
        beer: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', brew_ids: [], price_ids: ''},
        beer_bottle: { bar_id: barId, lim: 24, offset: 0, color_ids: [], abv_id: '', abv_from: '', abv_to: '', og_id: '', og_from: '', og_to: '', ibu_id: '', ibu_from: '', ibu_to: '', pack_ids: [], brew_ids: [], price_ids: ''},
        alc: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        cocktails: {bar_id: barId, lim: 24, offset: 0, abv_id: '', abv_from: '', abv_to: '', price_ids: ''},
        food: {bar_id: barId, lim: 24, offset: 0, kitchen_ids: [], price_ids: ''}
    }
    return initialStates[alias]
}


export function useGetBarMenuData(alias, params = {}, options = {}) {
    const queries = {
        beer: () => useGetBarMenuBeerQuery(params, options),
        beer_bottle: () => useGetBarMenuBottleQuery(params, options),
        alc: () => useGetBarMenuAlcQuery(params, options),
        cocktails: () => useGetBarMenuCocktailsQuery(params, options),
        food: () => useGetBarMenuFoodQuery(params, options),
    };

    if (!queries[alias]) {
        throw new Error(`Запрос с alias "${alias}" не найден.`);
    }

    return queries[alias]();
}

export function useGetBarMenuFilters(alias, barId, options = {}) {
    const queries = {
        beer: () => useGetBarMenuBeerFiltersQuery(barId, options),
        beer_bottle: () => useGetBarMenuBottleFiltersQuery(barId, options),
        alc: () => useGetBarMenuAlcFiltersQuery(barId, options),
        cocktails: () => useGetBarMenuCocktailsFiltersQuery(barId, options),
        food: () => useGetBarMenuFoodFiltersQuery(barId, options),
    };

    if (!queries[alias]) {
        throw new Error(`Запрос с alias "${alias}" не найден.`);
    }

    return queries[alias]();
}

export function getBarMenuTabSpec(alias){
    const specs = {
        beer: {Icon: BeerTapIcon, wideColumns: false, filterTitle: "На кранах", CardComponent: DraftBeerCard, SkeletonCard: DraftBeerCardSkeleton },
        beer_bottle: {Icon: BottlesPairIcon, wideColumns: false, filterTitle: "Фасованное пиво", CardComponent: BottledBeerCard, SkeletonCard: BottledBeerCardSkeleton},
        alc: {Icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Крепкий алкоголь", CardComponent: StrongAlcoholCard, SkeletonCard: BottledBeerCardSkeleton},
        cocktails: {Icon: CoctailIcon, wideColumns: true, filterTitle: "Безалкогольные напитки", CardComponent: ProductCard, SkeletonCard: ProductCardSkeleton},
        food: {Icon: MeatIcon, wideColumns: true, filterTitle: "Еда", CardComponent: ProductCard, SkeletonCard: ProductCardSkeleton},
        //tincture: {Icon: AlcoBottleIcon, wideColumns: false, filterTitle: "Настойки", CardComponent: ProductCard}
    }
    return specs[alias]
}

