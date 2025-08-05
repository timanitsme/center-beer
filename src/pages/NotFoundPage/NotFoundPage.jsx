import {useEffect} from "react";
import ChildrenTitle from "../../components/ChildrenTitle/ChildrenTitle.jsx";
import {FaTools} from "react-icons/fa";

export default function NotFoundPage(){
    const paths = [
        {title: "center.beer", path: "/"},
        {title: "Страница не найдена", path: ""},
    ]

    useEffect(() => {
        document.title = `center.beer | Страница не найдена`
    }, []);

    return(<ChildrenTitle title="404" description="Страница не найдена" paths={paths}><FaTools/></ChildrenTitle>)
}