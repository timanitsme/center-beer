import styles from "./NewProducts.module.css"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import FlagsIcon from "../../assets/flags-icon.svg?react"
import PicturesList from "../PicturesList/PicturesList.jsx";

export default function NewProducts({images}){
    return(
        <div className={styles.newProductsContainer}>
            <ComponentHeader HeaderIcon={FlagsIcon} title="Наши новинки" description={"Добро пожаловать в мир новых вкусов! Представляем уникальные сорта пива, созданные с вдохновением и мастерством. Экспериментальные рецепты, сезонные хиты и ограниченные выпуски, которые точно удивят вас своим характером и оригинальностью."}/>
            <PicturesList images={images} style="secondary"/>
        </div>
    )
}