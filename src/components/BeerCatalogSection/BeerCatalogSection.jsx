import styles from "./BeerCatalogSection.module.css"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BottlesPairIcon from "../../assets/bottles-pair-icon.svg?react"
import BeerCatalog from "../Catalogs/BeerCatalog.jsx";

export default function BeerCatalogSection({filters, filterButtons, breweryId, withoutPrice=false, ref=null}){
    const header = {
        title: "наш ассортимент",
        description: "Погрузитесь в многообразие вкусов нашего крафтового пива! Здесь вы найдете как классические сорта, проверенные временем, так и уникальные рецепты, созданные для настоящих ценителей. Каждое пиво — это результат нашей страсти к пивоварению и стремления удивлять вас новыми оттенками.",
        icon: BottlesPairIcon
    }

    return(
        <div className={styles.sectionContainer} ref={ref}>
            <div className={styles.header}><ComponentHeader title={header.title} HeaderIcon={header.icon} description={header.description}></ComponentHeader></div>
            <BeerCatalog withHeader={false} withoutPrice={withoutPrice} filters={filters} filterButtons={filterButtons} breweryId={breweryId}></BeerCatalog>
        </div>
    )
}