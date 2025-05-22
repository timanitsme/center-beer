import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {GetNewsPagePaths} from "./NewsPageData.jsx";
import NewsItem from "../../../components/NewsItem/NewsItem.jsx";
import NewsDetailSection from "../../../components/NewsDetailSection/NewsDetailSection.jsx";
import ComponentHeader from "../../../components/ComponentHeader/ComponentHeader.jsx";
import SectionHeader from "../../../components/SectionHeader/SectionHeader.jsx";
import NewsCatalog from "../../../components/Catalogs/NewsCatalog/NewsCatalog.jsx";


export default function NewsPage(){
    return(
        <div className="content">
            <NavChain paths={GetNewsPagePaths()}/>
            <SectionHeader title="Новости" description={"Свежие и интересные события из мира пивоварения и пивной культуры. Мы следим за новинками, тенденциями и правовыми изменениями, чтобы держать вас в курсе всего, что происходит в этой увлекательной и разнообразной отрасли."}></SectionHeader>
            <NewsDetailSection style="regular"><NewsCatalog/></NewsDetailSection>
        </div>
    )
}