import styles from "./SimilarItems.module.css"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeerBottleIcon from "../../assets/label-bottle-icon.svg?react"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import SimilarBottledBeerCard from "../Cards/BottledBeerCard/SimilarBottledBeerCard.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {useNavigate} from "react-router-dom";

export default function SimilarItems({title, cards}){
    const navigate = useNavigate()
    if (cards.length <= 0){
        return null
    }
    return(
        <div className={styles.itemsContainer}>
            <div className={styles.similarDescriptionContainer}>
                <ComponentHeader HeaderIcon={BeerBottleIcon} title={"Похожее пиво"} description={`Если вы истинный поклонник пива и мечтаете попробовать настоящий ${title}, то этот раздел для вас. Мы составили список лучших баров, где подают этот великолепный напиток, чтобы вы могли насладиться его уникальным вкусом и ароматом в приятной атмосфере.`}/>
                <div className={styles.button}>
                    <RoundLinkButton onClick={() => navigate("/in-dev")} text="Все похожее пиво"/>
                </div>
            </div>
            <SimpleCatalogSection CardComponent={SimilarBottledBeerCard} wideColumns={false} cards={cards}></SimpleCatalogSection>
        </div>
    )
}