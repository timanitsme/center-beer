import styles from "./Comment.module.scss"
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
    const [showComments, setShowComments] = useState(false)

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
                        <p className={`${styles.pHeader} ma-p`}>Анонимный пользователь</p>
                        <div className={styles.dateAndBottles}>
                            <p className="ma-p">{formatDateWithTextMonth(data?.create_date)}</p>
                            <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                                {getRatingIcons(4.2)}
                            </div>
                        </div>
                    </div>
                    <p className={`${unlimitedText ? "" : "limited-text"} ma-p`} ref={textRef}>{data?.comment}</p>
                    {isTextClamped && <a onClick={() => setUnlimitedText(!unlimitedText)} className="ma-p">{unlimitedText? "Свернуть" : "Читать полностью"}</a>}
                    {/* FIXME: Потом media сюда всунуть
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
                    */}
                    <div className={styles.commentButtons}>
                        <div className={styles.mark}>
                            <div onClick={handleLike} className={`${isLiked && styles.active}`}><a><LikeIcon/></a><p className="ma-p">{isLiked && !data.is_liked? Number(data?.liked) + 1: data?.liked}</p></div>
                            <div onClick={handleDislike} className={`${isDisliked && styles.active}`}><a><DislikeIcon/></a><p className="ma-p">{isDisliked && !data?.is_disliked ? Number(data?.disliked) + 1: data?.disliked}</p></div>
                        </div>
                        <div className={styles.markRight}>
                            <a className={`${styles.aComment} ma-p ${showComments ? styles.secondary: ''}`} onClick={() => setShowComments(!showComments)}>{showComments? "Скрыть комментарии":"1 Комментариев"}</a>
                            <a className={`${styles.aComment} ma-p ${replyMode === data?.id ? styles.secondary: ''}`} onClick={() => replyMode === data?.id? setReplyMode(null): setReplyMode(data?.id)}>Ответить</a>
                        </div>
                    </div>
                </div>
            </div>
            {showComments &&
                <div className={styles.reply}>
                    <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                    <div className={styles.replyContent}>

                        <div className={styles.commentHeader}>
                            <p className={`${styles.pHeader} ma-p`}>Администратор</p>
                            <div className={styles.dateAndBottles}>
                                <p className="ma-p">{formatDateWithTextMonth(data?.create_date)}</p>

                            </div>
                        </div>
                        <p className={`${unlimitedText ? "" : "limited-text"} ma-p`} ref={textRef}>Анонимный пользователь, большое спасибо за данный отзыв!</p>
                        {isTextClamped && <a onClick={() => setUnlimitedText(!unlimitedText)} className="ma-p">{unlimitedText? "Свернуть" : "Читать полностью"}</a>}
                        <div className={styles.commentButtons}>
                            <div className={styles.mark}>
                                <div onClick={handleLike} className={`${isLiked && styles.active}`}><a><LikeIcon/></a><p>{isLiked && !data.is_liked? Number(data?.liked) + 1: data?.liked}</p></div>
                                <div onClick={handleDislike} className={`${isDisliked && styles.active}`}><a><DislikeIcon/></a><p>{isDisliked && !data?.is_disliked ? Number(data?.disliked) + 1: data?.disliked}</p></div>
                            </div>

                        </div>

                    </div>
                </div>
            }
            {replyMode === data?.id &&
                <div className={styles.reply}>
                    <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                    <div className={styles.replyContent}>
                    <textarea className="ma-p" type="text" placeholder="Напишите сообщение...">

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