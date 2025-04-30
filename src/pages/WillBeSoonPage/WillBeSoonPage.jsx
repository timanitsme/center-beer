import ChildrenTitle from "../../components/ChildrenTitle/ChildrenTitle.jsx";
import {FaTools} from "react-icons/fa";

export default function WillBeSoonPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "В разработке", path: ""},
    ]

    return(<ChildrenTitle title="Скоро здесь появится актуальная информация о компании" paths={paths}><FaTools/></ChildrenTitle>)
}