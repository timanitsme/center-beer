import NavChain from "../../../components/Navigation/NavChain/NavChain.jsx";
import AboutDetailSection from "../../../components/AboutDetailSection/AboutDetailSection.jsx";
import {useNavigate, useParams} from "react-router-dom";
import EventsItem from "../../Events/EventsItem/EventsItem.jsx";
import PartnerItem from "../../../components/PartnerItem/PartnerItem.jsx";

export default function AboutDetailPage(){
    const navigate = useNavigate()
    const {alias} = useParams();

    const specs = {
        breweries: {
            sectionMenuItems: [
                {title: "Письмо пивоварням", path: ""},
                {title: "Конкурс Народная пивоварня", path: ""},
                {title: "Чат для пивоварен", path: "https://t.me/+e2xLwW0fV2AxMmFi"},
                {title: "Заполнить анкету", path: "https://center.beer/contact-brew/"},
            ],
            paths: [
                {title: "Партнерам", path: "/about-us/"},
                {title: "Пивоварням"}
            ]
        }
    }

    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Партнерам", path: ""}
    ]

    if (!specs?.hasOwnProperty(alias)){
        navigate("/about-us")
    }
    else{
        return(
            <div className="content" style={{minHeight: "600px"}}>
                <NavChain paths={paths}/>
                <AboutDetailSection paths={specs[alias]?.paths} sectionMenuItems={specs[alias]?.sectionMenuItems}>
                    <PartnerItem/>
                </AboutDetailSection>
            </div>
        )
    }

}