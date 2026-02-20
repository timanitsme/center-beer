import styles from "./NewsDetailSection.module.scss"
import ArrowBackIcon from "../../assets/arrow-left-icon.svg?react"
import LightNavChain from "../Navigation/LightNavChain/LightNavChain.jsx";
import FavsIcon from "../../assets/fav-unfill-icon.svg?react";
import BookMarkIcon from "../../assets/bookmark-unfill-icon.svg?react";
import Ad1 from "../../assets/adsMocks/ad-banner-1.webp"
import Ad2 from "../../assets/adsMocks/ad-banner-2.webp"
import {useState} from "react";
import RoundLinkButton from "../Buttons/RoundLinkButton/RoundLinkButton.jsx";
import BlogImage1 from "../../assets/newsMocks/blog-image-1.svg"
import BlogImage2 from "../../assets/newsMocks/blog-image-2.svg"
import BlogImage3 from "../../assets/newsMocks/blog-image-3.svg"
import ComboBox from "../Inputs/ComboBox/ComboBox.jsx";
import {Link, useNavigate} from "react-router-dom";
import {useGetNewsCategoriesQuery, useGetNewsRelatedQuery} from "../../store/services/centerBeer.js";
import RelatedNewsCard from "../Cards/RelatedNewsCard/RelatedNewsCard.jsx";
import RelatedNewsCardSkeleton from "../Skeletons/RelatedNewsCardSkeleton/RelatedNewsCardSkeleton.jsx";
import SearchInput from "../ApiInputs/Search/SearchInput.jsx";


export default function NewsDetailSection({style = "detail", children, postId=null, onChange}){
    const [isFavourite, setIsFavourite] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const {data: relatedNews, isFetching: relatedNewsIsFetching} = useGetNewsRelatedQuery(postId, {skip: postId === null})
    const {data: categories, isFetching: categoriesIsFetching} =  useGetNewsCategoriesQuery()

    const sectionMenuMainItems = [
        {title: "Новости и комментарии", path: "/in-dev"},
        {title: "Статьи и интервью", path: "/in-dev"},
        {title: "Переводы", path: "/in-dev"},
        {title: "Новинки недели", path: "/in-dev"}
    ]
    const sectionMenuSecondaryItems = [
        {title: "Пиво Pro", path: "/in-dev"},
        {title: "Пиво Life", path: "/in-dev"},
        {title: "Сидр, пуаре, медовуха", path: "/in-dev"},
        {title: "Законы", path: "/in-dev"},
        {title: "Технологии", path: "/in-dev"},
        {title: "Вино и крепкий алкоголь", path: "/in-dev"},
        {title: "Трезвость", path: "/in-dev"},
        {title: "Видеоканал", path: "/in-dev"}]

    const paths = [
        {title: "Новости", path: "/news"},
        {title: "Бары и магазины"}
    ]

    const cards = [
        {title: "Крупнейшие российские производители пива предупреждают", description: "Крупнейшие производители пива и безалкогольных напитков предупредили розницу о предстоящем подорожании своей продукции с 1 апреля.", img: BlogImage1},
        {title: "Производитель сигарет Altria Group продаст акции AB InBev", description: "Табачный гигант Altria Group сообщил о планах продать акции компании AB InBev более чем на 2,2 млрд долларов.", img: BlogImage2},
        {title: "Глава Чувашии: включение других регионов в хмелеводство даст нам максимальный экономический эффект", description: "Глава Чувашии Олег Николаев провёл ежегодную пресс-конференцию, на которой ответил на вопросы представителей СМИ, в том числе и о развитии хмелеводства в республике.", img: BlogImage3},
    ]
    const navigate = useNavigate()

    return(
        <div className={styles.sectionContainer}>
            <div className={styles.sectionMenu}>
                {style !== "detail" && <SearchInput title="Поиск по статьям" onChange={(newSearch) => onChange(newSearch)}/>}
                { !categoriesIsFetching &&
                    <div className={styles.menuItemsContainer}>
                        <Link to="/news" className={style === "detail"? styles.primary: ""}>Все новости</Link>
                        {categories?.map((item, index) =>
                            <a href="" key={index}>{item.name}</a>

                        )}
                        <div className={styles.secondBanner}>
                            <img src={Ad1} alt=""></img>
                            <img src={Ad2} alt=""></img>
                        </div>
                    </div>
                }
            </div>
            <div className={styles.section}>
                { style === "detail" && <div className={styles.sectionHeader}>
                    <div className={styles.sectionNav}>
                        <Link to={"/news"}><ArrowBackIcon/></Link>
                        <LightNavChain paths={paths}/>
                    </div>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>}
                { style === "regular" && <div className={styles.sectionHeader}>
                    <ComboBox options={["По умолчанию"]}></ComboBox>
                    <div className={styles.sectionButtons}>
                        <a className={`${styles.aIconButton} ${isFavourite ? styles.added : ''}`} onClick={() => setIsFavourite(!isFavourite)}><FavsIcon/><span>{isFavourite? "Убрать из любимых": "Добавить в любимые"}</span></a>
                        <a className={`${styles.aIconButton} ${isBookmarked ? styles.added : ''}`} onClick={() => setIsBookmarked(!isBookmarked)}><BookMarkIcon/><span>{isBookmarked? "Убрать из кладовки": "Добавить в кладовку"}</span></a>
                    </div>
                </div>}
                <div className={styles.sectionContent}>
                    <div className={styles.contentMain}>
                        {children}
                    </div>
                    <div className={`${styles.contentSide} ${style !== "detail"? styles.banner : ""}`}>
                        <img src={Ad1} alt=""></img>
                        <img src={Ad2} alt=""></img>
                        {style === "detail" &&
                            <>
                                <h3>Похожие статьи</h3>
                                {relatedNewsIsFetching? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                       <RelatedNewsCardSkeleton key={index}/>
                                    ))
                                ):
                                (
                                    relatedNews?.data?.map((card, index) =>
                                        <RelatedNewsCard cardInfo={card} key={index}/>
                                    )
                                )
                                }

                            </>
                        }
                        {style === "detail" && <div className={styles.sideButtons}><RoundLinkButton onClick={() => navigate("/news")} text="Все статьи"/></div>}


                    </div>
                </div>
            </div>
        </div>
    )
}