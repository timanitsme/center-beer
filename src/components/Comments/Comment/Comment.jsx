import styles from "./Comment.module.css"
import AvatarDefault from "../../../assets/avatar-default.svg";
import Bottle1 from "../../../assets/bottlesMock/bottle-1.svg";
import LikeIcon from "../../../assets/like-icon.svg?react";
import DislikeIcon from "../../../assets/dislike-icon.svg?react";
import {useEffect, useRef, useState} from "react";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";
import {FaPaperclip, FaPaperPlane} from "react-icons/fa6";
import formatDateWithTextMonth from "../../../utils/DateFunctions/formatDateWithTextMonth.js";

export default function Comment({profile, data}){
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const [unlimitedText, setUnlimitedText] = useState(false);
    const [isLiked, setIsLiked] = useState(data?.is_liked || false)
    const [isDisliked, setIsDisliked] = useState(data?.is_disliked || false)
    const [replyMode, setReplyMode] = useState(null)

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
        <>
            <div className={styles.comment}>
                <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                <div>
                    <div className={styles.commentHeader}>
                        <p className={styles.pHeader}>Николай Б.</p>
                        <div className={styles.dateAndBottles}>
                            <p>{formatDateWithTextMonth(data?.create_date)}</p>
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
                            <div onClick={handleLike} className={`${isLiked && styles.active}`}><a><LikeIcon/></a><p>{isLiked && !data.is_liked? Number(data?.liked) + 1: data?.liked}</p></div>
                            <div onClick={handleDislike} className={`${isDisliked && styles.active}`}><a><DislikeIcon/></a><p>{isDisliked && !data?.is_disliked ? Number(data?.disliked) + 1: data?.disliked}</p></div>
                        </div>
                        <div className={styles.markRight}>
                            <a className={styles.aComment}>15 Комментариев</a>
                            <a className={`${styles.aComment} ${replyMode === data?.id ? styles.secondary: ''}`} onClick={() => replyMode === data?.id? setReplyMode(null): setReplyMode(data?.id)}>Ответить</a>
                        </div>
                    </div>
                </div>
            </div>
            {replyMode === data?.id &&
                <div className={styles.reply}>
                    <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                    <div className={styles.replyContent}>
                    <textarea type="text" placeholder="Напишите сообщение...">

                    </textarea>
                        <div className={styles.replyButtons}>
                            <FaPaperclip></FaPaperclip>
                            <FaPaperPlane></FaPaperPlane>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}