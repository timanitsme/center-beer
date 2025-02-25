import styles from "./SimilarItems.module.css"
import BeerMugsIcon from "../../assets/beer-mugs-icon.svg?react";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeerBottleIcon from "../../assets/label-bottle-icon.svg?react"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import Bottle1 from "../../assets/bottlesMock/bottle-1.svg";
import Bottle2 from "../../assets/bottlesMock/bottle-2.svg";
import Bottle3 from "../../assets/bottlesMock/bottle-3.svg";
import Bottle4 from "../../assets/bottlesMock/bottle-4.svg";
import Bottle5 from "../../assets/bottlesMock/bottle-5.svg";
import SimilarBottledBeerCard from "../Cards/BottledBeerCard/SimilarBottledBeerCard.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";

export default function SimilarItems(){
    const cardsBottled = [
        {title:"Terra Firma", manufacturer: "Чаща, Москва, Россия", img: Bottle1,strength: 6.5, density: 12, bitterness: 32, price: 380, rating: 5},
        {title:"Der Stern", manufacturer: "Чаща, Москва, Россия", img: Bottle2,strength: 6.5, density: 12, bitterness: 32, price: 280, rating: 4.5},
        {title:"Headline", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle3,strength: 6.5, density: 12, bitterness: 32, price: 380},
        {title:"Небо над Тагилом", manufacturer: "Бакунин, Санкт-Петербург, Россия", img: Bottle4,strength: 6.5, density: 12, bitterness: 32, price: 480},
    ]
    return(
        <div className={styles.itemsContainer}>
            <div className={styles.similarDescriptionContainer}>
                <ComponentHeader HeaderIcon={BeerBottleIcon} title={"Похожее пиво"} description={"Если вы истинный поклонник пива и мечтаете попробовать настоящий Czech Pilsner, то этот раздел для вас. Мы составили список лучших баров, где подают этот великолепный напиток, чтобы вы могли насладиться его уникальным вкусом и ароматом в приятной атмосфере."}/>
                <div className={styles.button}>
                    <RoundLinkButton text="Все похожее пиво"/>
                </div>
            </div>
            <SimpleCatalogSection CardComponent={SimilarBottledBeerCard} wideColumns={false} cards={cardsBottled}></SimpleCatalogSection>
        </div>
    )
}