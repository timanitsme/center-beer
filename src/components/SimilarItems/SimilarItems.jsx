import styles from "./SimilarItems.module.scss"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeerBottleIcon from "../../assets/label-bottle-icon.svg?react"
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import SimilarBottledBeerCard from "../Cards/BottledBeerCard/SimilarBottledBeerCard.jsx";
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import {useNavigate} from "react-router-dom";
import ShortenedRowSection from "../ShortenedRowSection/ShortenedRowSection.jsx";
import RowSection from "../RowSection/RowSection.jsx";

export default function SimilarItems({alias, title, cards}){
    const navigate = useNavigate()
    if (cards.length <= 0){
        return null
    }
    return(
        <div className={styles.itemsContainer}>
            <div className={styles.similarDescriptionContainer}>
                <ComponentHeader HeaderIcon={BeerBottleIcon} title={"Похожее пиво"} description={`Если вы истинный поклонник пива и мечтаете попробовать настоящий ${title}, то этот раздел для вас. Мы составили список лучших баров, где подают этот великолепный напиток, чтобы вы могли насладиться его уникальным вкусом и ароматом в приятной атмосфере.`}>
                    <div className={styles.button}>
                        <RoundLinkButton onClick={() => navigate(`/beer/${alias}/similar`)} text="Все похожее пиво"/>
                    </div>
                </ComponentHeader>
            </div>
            <RowSection cards={cards} CardComponent={SimilarBottledBeerCard} maxCards={6}/>
        </div>
    )
}