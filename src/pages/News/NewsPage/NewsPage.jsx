import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import {GetNewsPagePaths} from "./NewsPageData.jsx";
import NewsDetailSection from "../../../components/NewsDetailSection/NewsDetailSection.jsx";
import SectionHeader from "../../../components/SectionHeader/SectionHeader.jsx";
import NewsCatalog from "../../../components/Catalogs/NewsCatalog/NewsCatalog.jsx";
import {useEffect, useState} from "react";
import NewsMobileSection from "../../../components/NewsMobileSection/NewsMobileSection.jsx";


export default function NewsPage(){
    const [searchText, setSearchText] = useState("")

    useEffect(() => {
        document.title = `center.beer | Новости`
    }, []);

    return(
        <div className="content">
            <NavChain paths={GetNewsPagePaths()}/>
            <SectionHeader title="Новости" description={"Свежие и интересные события из мира пивоварения и пивной культуры. Мы следим за новинками, тенденциями и правовыми изменениями, чтобы держать вас в курсе всего, что происходит в этой увлекательной и разнообразной отрасли."}></SectionHeader>
            <NewsMobileSection onChange={(newSearch) => setSearchText(newSearch)} withInput={true}/>
            <NewsDetailSection style="regular" onChange={(newSearch) => setSearchText(newSearch)}><NewsCatalog searchText={searchText}/></NewsDetailSection>
        </div>
    )
}