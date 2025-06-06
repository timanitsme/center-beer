import styles from "./Reviews.module.css"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeardIcon from "../../assets/beard-icon.svg?react"
import AvatarDefault from "../../assets/avatar-default.svg"
import LikeIcon from "../../assets/like-icon.svg?react"
import DislikeIcon from "../../assets/dislike-icon.svg?react"
import {useEffect, useRef, useState} from "react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import BeerBottleIcon from "../../assets/bottle-icon.svg?react";
import HalfBeerBottleIcon from "../../assets/bottle-half-icon.svg?react";
import EmptyBeerBottleIcon from "../../assets/bottle-empty-icon.svg?react";
import PropTypes from "prop-types";
import PicturesList from "../PicturesList/PicturesList.jsx";
import Bottle1 from "../../assets/bottlesMock/bottle-1.svg"
import Comment from "../Comments/Comment/Comment.jsx";
import CommentSecondary from "../Comments/CommentSecondary/CommentSecondary.jsx";
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import {useSelector} from "react-redux";
import NewCommentForm from "../Comments/NewCommentForm/NewCommentForm.jsx";
import {useNavigate} from "react-router-dom";
import SimpleModal from "../Modals/SimpleModal/SimpleModal.jsx";
import {FaLock} from "react-icons/fa6";

export default function Reviews({header, images, resume}){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const [unlimitedText, setUnlimitedText] = useState(false);
    const commentRef = useRef(null)
    const navigate = useNavigate()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const reviews = {
        "total_items": 1,
        "data": [
            {
                "id": "1",
                "create_date": "2025-04-30 23:09:53",
                "user_guid": "b32d3968-0472-4560-a48e-bdaf60f6a8c8",
                "user_id": "1",
                "bar_id": "1",
                "comment": "Посещение этого пивного бара всегда оставляет только положительные эмоции! Здесь царит уютная и дружелюбная атмосфера, которая сразу создает ощущение, что ты попал в гости к старым друзьям. Интерьер бара оформлен со вкусом, каждая деталь подобрана с любовью к своему делу. Ассортимент пива впечатляет – от классических сортов до эксклюзивных крафтовых вариантов, каждый из которых имеет свою изюминку. Персонал всегда готов помочь с выбором напитка и дать рекомендации по закускам. Особенно понравились их фирменные колбаски – сочные и ароматные, идеально сочетающиеся с пивом.",
                "liked": "4",
                "disliked": "0",
                "parent_id": "0",
                "media": []
            },
            {
                "id": "1",
                "create_date": "2025-04-30 23:09:53",
                "user_guid": "b32d3968-0472-4560-a48e-bdaf60f6a8c8",
                "user_id": "1",
                "bar_id": "1",
                "comment": "Посещение этого пивного бара всегда оставляет только положительные эмоции! Здесь царит уютная и дружелюбная атмосфера, которая сразу создает ощущение, что ты попал в гости к старым друзьям. Интерьер бара оформлен со вкусом, каждая деталь подобрана с любовью к своему делу. Ассортимент пива впечатляет – от классических сортов до эксклюзивных крафтовых вариантов, каждый из которых имеет свою изюминку. Персонал всегда готов помочь с выбором напитка и дать рекомендации по закускам. Особенно понравились их фирменные колбаски – сочные и ароматные, идеально сочетающиеся с пивом.",
                "liked": "4",
                "disliked": "0",
                "parent_id": "0",
                "media": []
            },
            {
                "id": "1",
                "create_date": "2025-04-30 23:09:53",
                "user_guid": "b32d3968-0472-4560-a48e-bdaf60f6a8c8",
                "user_id": "1",
                "bar_id": "1",
                "comment": "Посещение этого пивного бара всегда оставляет только положительные эмоции! Здесь царит уютная и дружелюбная атмосфера, которая сразу создает ощущение, что ты попал в гости к старым друзьям. Интерьер бара оформлен со вкусом, каждая деталь подобрана с любовью к своему делу. Ассортимент пива впечатляет – от классических сортов до эксклюзивных крафтовых вариантов, каждый из которых имеет свою изюминку. Персонал всегда готов помочь с выбором напитка и дать рекомендации по закускам. Особенно понравились их фирменные колбаски – сочные и ароматные, идеально сочетающиеся с пивом.",
                "liked": "4",
                "disliked": "0",
                "parent_id": "0",
                "media": []
            },
        ]
    }

    // Проверка, обрезан ли текст
    useEffect(() => {
        if (textRef.current) {
            const isClamped =
                textRef.current.scrollHeight > textRef.current.clientHeight;
            setIsTextClamped(isClamped);
        }
    }, []);

    const handleScrollToCommentForm = () => {
        if (!profileIsLoading && isAuthorized){
            if (commentRef.current) {
                commentRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }
        }
        else{
            setShowAuthModal(true)
        }
    }

    return(
        <div className={styles.reviews}>
            <ComponentHeader HeaderIcon={BeardIcon} title={header.title} description={header.description}/>
            {images && images.length > 0 && <PicturesList images={images}></PicturesList>}
            <div className="hrtLine" style={{margin: "20px 0"}} />
            <div className={styles.commentsSection}>
                <div className={styles.commentsContainer}>
                    {reviews.data.map((review, index) => {
                       return <Comment key={index} data={review}/>
                    })}
                    <>
                        <div className={styles.showAllContainer}>
                            <div className={styles.gradient}></div>
                        </div>
                        <div className={styles.buttonRow}>
                            <SimpleButton text={"Показать еще"} onClick={() => {}}></SimpleButton>
                        </div>
                    </>
                    {!profileIsLoading && isAuthorized &&
                        <NewCommentForm ref={commentRef} profile={userProfile}/>
                    }
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
                    <SimpleButton text="Забронировать стол" onClick={() => navigate("/in-dev")}/>
                    <IconButton onClick={handleScrollToCommentForm} text="Оставить отзыв"><BeardIcon/></IconButton>

                </div>
            </div>
            <SimpleModal show={showAuthModal} setShow={setShowAuthModal}>
                <div className={styles.accountModal}>
                    <h2 className={styles.outlineTitle}>Войдите в аккаунт <br/> чтобы оставить отзыв</h2>
                    <FaLock/>
                    <SimpleButton text="Авторизация" onClick={() => navigate("/login")}></SimpleButton>
                </div>
            </SimpleModal>
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