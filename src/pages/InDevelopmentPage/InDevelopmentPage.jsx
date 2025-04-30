import {FaTools} from "react-icons/fa";
import ChildrenTitle from "../../components/ChildrenTitle/ChildrenTitle.jsx";

export default function InDevelopmentPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "В разработке", path: ""},
    ]

    return(<ChildrenTitle title="Страница находится в разработке" paths={paths}><FaTools/></ChildrenTitle>)
}