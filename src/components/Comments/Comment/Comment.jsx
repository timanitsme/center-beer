import styles from "./Comment.module.css"
import AvatarDefault from "../../../assets/avatar-default.svg";
import Bottle1 from "../../../assets/bottlesMock/bottle-1.svg";
import LikeIcon from "../../../assets/like-icon.svg?react";
import DislikeIcon from "../../../assets/dislike-icon.svg?react";
import {useEffect, useRef, useState} from "react";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";

export default function Comment(){
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const [unlimitedText, setUnlimitedText] = useState(false);
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)

    // Проверка, обрезан ли текст
    useEffect(() => {
        if (textRef.current) {
            const isClamped =
                textRef.current.scrollHeight > textRef.current.clientHeight;
            setIsTextClamped(isClamped);
        }
    }, []);

    const handleLike = () => {
        if (isDisliked && !isLiked){
            setIsDisliked(false)
        }
        setIsLiked(!isLiked)
    }

    const handleDislike = () => {
        if (isLiked && !isDisliked){
            setIsLiked(false)
        }
        setIsDisliked(!isDisliked)
    }

    return(
        <div className={styles.comment}>
            <img className={styles.avatar} src={AvatarDefault} alt=""></img>
            <div>
                <div className={styles.commentHeader}>
                    <p className={styles.pHeader}>Николай Б.</p>
                    <div className={styles.dateAndBottles}>
                        <p>12 июля 2024</p>
                        <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                            {getRatingIcons(4.2)}
                        </div>
                    </div>
                </div>
                <p className={unlimitedText ? "" : "limited-text"} ref={textRef}>Посещение этого пивного бара всегда оставляет только положительные эмоции! Здесь царит уютная и дружелюбная атмосфера, которая сразу создает ощущение, что ты попал в гости к старым друзьям. Интерьер бара оформлен со вкусом, каждая деталь подобрана с любовью к своему делу.
                    Ассортимент пива впечатляет – от классических сортов до эксклюзивных крафтовых вариантов, каждый из которых имеет свою изюминку. Персонал всегда готов помочь с выбором напитка и дать рекомендации по закускам. Особенно понравились их фирменные колбаски – сочные и ароматные, идеально сочетающиеся с пивом.</p>
                {isTextClamped && <a onClick={() => setUnlimitedText(!unlimitedText)}>{unlimitedText? "Свернуть" : "Читать полностью"}</a>}
                <div className={styles.commentPhotos}>
                    <div className={styles.imageWrapper}>
                        <img src={Bottle1} alt=""/>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={Bottle1} alt=""/>
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src={Bottle1} alt=""/>
                    </div>
                </div>
                <div className={styles.commentButtons}>
                    <div className={styles.mark}>
                        <div onClick={handleLike} className={`${isLiked && styles.active}`}><a><LikeIcon/></a><p>13</p></div>
                        <div onClick={handleDislike} className={`${isDisliked && styles.active}`}><a><DislikeIcon/></a><p>11</p></div>
                    </div>
                    <div className={styles.markRight}>
                        <a className={styles.aComment}>15 Комментариев</a>
                        <a className={styles.aComment}>Ответить</a>
                    </div>
                </div>
            </div>
        </div>
    )
}