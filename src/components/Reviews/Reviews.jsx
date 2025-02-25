import styles from "./Reviews.module.css"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeardIcon from "../../assets/beard-icon.svg?react"

import ReviewSection from "../../assets/reviewsMocks/review-section.svg"
import AvatarDefault from "../../assets/avatar-default.svg"
import LikeIcon from "../../assets/like-icon.svg?react"
import DislikeIcon from "../../assets/dislike-icon.svg?react"
import {useEffect, useRef, useState} from "react";
import ArrowButton from "../Buttons/ArrowButton/ArrowButton.jsx";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import BeerBottleIcon from "../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../assets/bottle-empty-icon.svg?react";
import PropTypes from "prop-types";


export default function Reviews({header, images, resume}){
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = window.innerWidth <= 600 ? 3 : 6;

    // Функция для переключения на следующую страницу
    const nextPage = () => {
        if (currentPage < Math.ceil(images.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Функция для переключения на предыдущую страницу
    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Вычисление текущего набора изображений (по 6 штук)
    const currentImages = images.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

    // Добавляем заполнители, если в последней группе меньше 6 картинок
    const filledImages = [...currentImages];
    while (filledImages.length < itemsPerPage) {
        filledImages.push(ReviewSection);
    }

    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const [unlimitedText, setUnlimitedText] = useState(false);

    // Проверка, обрезан ли текст
    useEffect(() => {
        if (textRef.current) {
            const isClamped =
                textRef.current.scrollHeight > textRef.current.clientHeight;
            setIsTextClamped(isClamped);
        }
    }, []);

    const getRatingIcons = (rating) => {
        const icons = [];
        const fullBottles = Math.floor(rating); // Целая часть рейтинга
        const hasHalfBottle = rating - fullBottles >= 0.1; // Есть ли половина бутылки

        for (let i = 0; i < 5; i++) {
            if (i < fullBottles) {
                icons.push(<BeerBottleIcon key={i}/>);
            } else if (i === fullBottles && hasHalfBottle) {
                icons.push(<HalfBeerBottleIcon key={i}/>);
            } else {
                icons.push(<EmptyBeerBottleIcon key={i}/>);
            }
        }

        return icons;
    };

    return(
        <div className={styles.reviews}>
            <ComponentHeader HeaderIcon={BeardIcon} title={header.title} description={header.description}/>
            <div className={styles.picturesListContainer}>
                <div className={styles.leftArrow}><ArrowButton direction="left"  onClick={prevPage} withBg={false}></ArrowButton></div>
                <div className={styles.picturesContainer}>
                    {filledImages.map((image, index) => (
                        <div key={index} className={styles.imageWrapper}>
                            {image && (
                                <img
                                    src={image}
                                    alt=""
                                    className={styles.image}
                                />
                            )}
                        </div>
                    ))}
                </div>
                <div className={styles.rightArrow}><ArrowButton direction="right"  onClick={nextPage} withBg={false}></ArrowButton></div>
            </div>
            <div className="hrtLine" style={{margin: "20px 0"}} />
            <div className={styles.commentsSection}>
                <div className={styles.commentsContainer}>
                    <div className={styles.comment}>
                        <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                        <div className={styles.commentContent}>
                            <div className={styles.commentHeader}>
                                <p className={styles.pHeader}>Николай Б.</p>
                                <div className={styles.dateAndBottles}>
                                    <p>12 июля 2024</p>
                                    <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                                        {getRatingIcons(resume.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className={unlimitedText ? "" : "limited-text"} ref={textRef}>Посещение этого пивного бара всегда оставляет только положительные эмоции! Здесь царит уютная и дружелюбная атмосфера, которая сразу создает ощущение, что ты попал в гости к старым друзьям. Интерьер бара оформлен со вкусом, каждая деталь подобрана с любовью к своему делу.
                                Ассортимент пива впечатляет – от классических сортов до эксклюзивных крафтовых вариантов, каждый из которых имеет свою изюминку. Персонал всегда готов помочь с выбором напитка и дать рекомендации по закускам. Особенно понравились их фирменные колбаски – сочные и ароматные, идеально сочетающиеся с пивом.</p>
                            {isTextClamped && <a onClick={() => setUnlimitedText(!unlimitedText)}>{unlimitedText? "Свернуть" : "Читать полностью"}</a>}
                            <div className={styles.commentButtons}>
                                <div className={styles.mark}>
                                    <div><a><LikeIcon/></a><p>13</p></div>
                                    <div><a><DislikeIcon/></a><p>11</p></div>
                                </div>
                                <div className={styles.markRight}>
                                    <a className={styles.aComment}>15 Комментариев</a>
                                    <a className={styles.aComment}>Ответить</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.assessmentContainer}>
                    <div className={styles.assessment}>
                        <p className={styles.pHeader} style={{textTransform: "uppercase"}}>{resume.title}</p>
                        <p>{resume.rated}</p>
                        <div className={styles.dateAndBottles}>
                            <p>Средняя оценка: </p>
                            <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                                {getRatingIcons(resume.rating)}
                            </div>
                            <p style={{color: "var(--txt-active)"}}>({resume.rating})</p>
                        </div>
                        <p>{resume.description}</p>


                    </div>
                    <SimpleButton text="Забронировать стол"/>
                    <IconButton text="Оставить отзыв"><BeardIcon/></IconButton>

                </div>
            </div>
        </div>
    )
}

Reviews.propTypes = {
    header: PropTypes.objectOf(
        PropTypes.shape({
          title: PropTypes.string,
          description: PropTypes.string
        })),
    images: PropTypes.arrayOf(PropTypes.node),
    resume: PropTypes.objectOf(
        PropTypes.shape({
            title: PropTypes.string,
            rated: PropTypes.string,
            rating: PropTypes.number,
            description: PropTypes.string
        })
    )
}