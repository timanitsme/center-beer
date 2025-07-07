import BeerBottleIcon from "../../assets/label-bottle-icon.svg?react";
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";

export default function NewsSimilarItems(){

    return(
        <>
            <ComponentHeader HeaderIcon={BeerBottleIcon} title={"Похожее пиво"} description={`Если вы истинный поклонник пива и мечтаете попробовать настоящий, то этот раздел для вас. Мы составили список лучших баров, где подают этот великолепный напиток, чтобы вы могли насладиться его уникальным вкусом и ароматом в приятной атмосфере.`}/>
        </>
    )

}
