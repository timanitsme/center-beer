import styles from "./Comment.module.scss"
import AvatarDefault from "../../../assets/avatar-default.svg";
import LikeIcon from "../../../assets/like-icon.svg?react";
import DislikeIcon from "../../../assets/dislike-icon.svg?react";
import {useEffect, useRef, useState} from "react";
import {getRatingIcons} from "../../../utils/getRatingIcons.jsx";
import {FaPaperclip, FaPaperPlane} from "react-icons/fa6";
import formatDateWithTextMonth from "../../../utils/DateFunctions/formatDateWithTextMonth.js";
import {useVoteCommentMutation} from "../../../store/services/centerBeer.js";
import IconButton from "../../Buttons/IconButton/IconButton.jsx";

export default function Comment({profile, data, alias, onShowPicture}){
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const [unlimitedText, setUnlimitedText] = useState(false);
    const [isLiked, setIsLiked] = useState(data?.is_liked || false)
    const [isDisliked, setIsDisliked] = useState(data?.is_disliked || false)
    const [replyMode, setReplyMode] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const comments = []
    const [vote, {isLoading}] = useVoteCommentMutation()

    // Проверка, обрезан ли текст
    useEffect(() => {
        if (textRef.current) {
            const isClamped =
                textRef.current.scrollHeight > textRef.current.clientHeight;
            setIsTextClamped(isClamped);
        }
    }, []);

    const handleLike = async () => {
        try{
            const response = await vote({commentId: data?.id, commentType: alias, action: "like"}).unwrap()
            if (response.error === false){
                if (isDisliked && !isLiked){
                    setIsDisliked(false)
                }
                setIsLiked(!isLiked)
            }
        }
        catch (err){

        }
    }

    const handleDislike = async () => {
        try{
            const response = await vote({commentId: data?.id, commentType: alias, action: "dislike"}).unwrap()
            if (response.error === false){
                if (isLiked && !isDisliked){
                    setIsLiked(false)
                }
                setIsDisliked(!isDisliked)
            }
        }
        catch (err){

        }
    }

    return(
        <>
            <div className={styles.comment}>
                <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                <div>
                    <div className={styles.commentHeader}>
                        <p className={`${styles.pHeader} ma-p`}>{data?.username || "Анонимный пользователь"}</p>
                        <div className={styles.dateAndBottles}>
                            <p className={`${styles.max450} ma-p`} >{formatDateWithTextMonth(data?.create_date)}</p>
                            <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                                {getRatingIcons(data?.rating)}
                            </div>
                        </div>
                    </div>
                    <p className={`${unlimitedText ? "" : "limited-text"} ma-p`} ref={textRef}>{data?.comment}</p>
                    {isTextClamped && <a onClick={() => setUnlimitedText(!unlimitedText)} className="ma-p">{unlimitedText? "Свернуть" : "Читать полностью"}</a>}

                    { data?.media?.length > 0 &&
                        <div className={styles.commentPhotos}>
                            {data?.media?.map((image, index) =>
                                <div key={index} className={styles.imageWrapper} onClick={() => onShowPicture(image)}>
                                    <img src={image} alt=""/>
                                </div>
                            )}
                        </div>
                    }
                    <div className={styles.commentButtons}>
                        <div className={styles.mark}>
                            <div onClick={handleLike} className={`${isLiked && styles.active}`}><a><LikeIcon/></a><p className="ma-p">{isLiked && !data.is_liked? Number(data?.liked) + 1: data?.liked}</p></div>
                            <div onClick={handleDislike} className={`${isDisliked && styles.active}`}><a><DislikeIcon/></a><p className="ma-p">{isDisliked && !data?.is_disliked ? Number(data?.disliked) + 1: data?.disliked}</p></div>
                        </div>
                        <div className={styles.markRight}>
                            <a className={`${styles.aComment} ma-p ${showComments || comments.length === 0 ? styles.secondary: ''}`} onClick={() => setShowComments(!showComments)}>{showComments && comments.length !== 0? "Скрыть комментарии":`${comments.length} Комментариев`}</a>
                            <a className={`${styles.aComment} ma-p ${replyMode === data?.id ? styles.secondary: ''}`} onClick={() => replyMode === data?.id? setReplyMode(null): setReplyMode(data?.id)}>Ответить</a>
                        </div>
                    </div>
                </div>
            </div>
            {showComments && comments.length !== 0 &&
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
                <form className={styles.reply}>
                    <img className={styles.avatar} src={AvatarDefault} alt=""></img>
                    <div className={styles.replyContent}>
                    <textarea className="ma-p" type="text" placeholder="Напишите сообщение...">

                    </textarea>
                        <div className={styles.replyButtons}>
                            <FaPaperclip></FaPaperclip>
                            <button type="submit" className={styles.sendButton}><FaPaperPlane/><p className="ma-p">Отправить</p></button>
                        </div>
                    </div>
                </form>
            }

        </>
    )
}