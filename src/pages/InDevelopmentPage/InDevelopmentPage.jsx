import {FaTools} from "react-icons/fa";
import ChildrenTitle from "../../components/ChildrenTitle/ChildrenTitle.jsx";
import {useEffect} from "react";

export default function InDevelopmentPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "В разработке", path: ""},
    ]

    useEffect(() => {
        document.title = `center.beer | В разработке`
    }, []);

    return(<ChildrenTitle title="Страница находится в разработке" paths={paths}><FaTools/></ChildrenTitle>)
}