import styles from "./DistributorPortfolio.module.scss"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeerCaseIcon from "../../assets/beer-case-icon.svg?react"
import AssetImage1 from "../../assets/breweryMocks/brewery-logo-1.svg"
import AssetImage2 from "../../assets/breweryMocks/brewery-logo-2.svg"
import AssetImage3 from "../../assets/breweryMocks/brewery-logo-3.svg"
import AssetImage4 from "../../assets/breweryMocks/brewery-logo-4.svg"
import AssetImage5 from "../../assets/breweryMocks/brewery-logo-5.svg"
import AssetImage6 from "../../assets/breweryMocks/brewery-logo-6.svg"
import SimpleCatalogSection from "../CatalogSections/SimpleCatalogSection/SimpleCatalogSection.jsx";
import AssetCard from "../Cards/AssetCard/AssetCard.jsx";

export default function DistributorPortfolio(){
    const assetsCards = [
        {title: "Бакунин", address: "Солигорск, Беларусь", img: AssetImage1},
        {title: "Konix Brewery", address: "Заречный, Россия", img: AssetImage2},
        {title: "Бакунин", address: "Солигорск, Беларусь", img: AssetImage3},
        {title: "Brauning Bier", address: "Солигорск, Беларусь", img: AssetImage4},
        {title: "Wild Lab", address: "Москва, Россия", img: AssetImage5},
        {title: "4IT 6r3w3ry", address: "Минск, Беларусь", img: AssetImage6},
    ]
    return(
        <div className={styles.portfolioSection}>
            <ComponentHeader title="Наш портфель" HeaderIcon={BeerCaseIcon} description="Мы собрали лучшие сорта пива от проверенных пивоварен и уникальных крафтовых производителей. Мы предлагаем широкий выбор напитков — от классических лагеров до экспериментальных IPA, чтобы удовлетворить вкусы даже самых искушенных ценителей пива. Наш ассортимент — это гарантия качества, разнообразия и свежести каждой партии."/>
            <div className={styles.cardsContainer}>
                { assetsCards.map((card, index) => (
                    <AssetCard key={index} cardInfo={card}></AssetCard>
                ))
                }
            </div>
        </div>
    )
}