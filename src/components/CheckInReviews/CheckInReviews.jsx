import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import styles from "./CheckInReviews.module.scss";
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeardIcon from "../../assets/beard-icon.svg?react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import SimpleModal from "../Modals/SimpleModal/SimpleModal.jsx";
import {FaLock} from "react-icons/fa6";
import CheckIn from "../CheckIn/CheckIn.jsx";
import NewCheckInForm from "../NewCheckInForm/NewCheckInForm.jsx";

export default function CheckInReviews({header, resume}){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const commentRef = useRef(null)
    const navigate = useNavigate()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showAllCheckIns, setShowAllCheckIns] = useState(false);
    const [visibleCheckIns, setVisibleCheckIns] = useState({
        total_items: 0,
        data: [],
    });

    const checkIns = {
        "total_items": 3,
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


    useEffect(() => {
        if (checkIns.data) {
            setVisibleCheckIns({
                ...checkIns,
                data: showAllCheckIns ? checkIns.data : checkIns.data.slice(0, 3),
            });
        }
    }, [showAllCheckIns]);

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
        <div className={styles.reviews} id="check-ins">
            <ComponentHeader HeaderIcon={BeardIcon} title={header.title} description={header.description}/>
            <div className="hrtLine" style={{margin: "20px 0"}} />
            <div className={styles.commentsSection}>
                <div className={styles.commentsContainer}>
                    {visibleCheckIns.data.map((review, index) => {
                        return <CheckIn key={index} data={review}/>
                    })}

                    {checkIns?.data?.length > 3 && !showAllCheckIns && (
                        <>
                            <div className={styles.showAllContainer}>
                                <div className={styles.gradient}></div>
                            </div>
                            <div className={styles.buttonRow}>
                                <SimpleButton text={"Показать еще"} onClick={() => {setShowAllCheckIns(true)}}></SimpleButton>
                            </div>
                        </>

                    )}
                    {checkIns?.data?.length > 3 && showAllCheckIns && (
                        <div className={styles.buttonRow}>
                            <SimpleButton text={"Скрыть чек-ины"} onClick={() => setShowAllCheckIns(false)}></SimpleButton>
                        </div>
                    )}
                    {!profileIsLoading && isAuthorized &&
                        <NewCheckInForm ref={commentRef} profile={userProfile}/>
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
                    {/*<SimpleButton text="Забронировать стол" onClick={() => navigate("/in-dev")}/>*/}
                    <IconButton onClick={handleScrollToCommentForm} text="Оставить чек-ин"><BeardIcon/></IconButton>

                </div>
            </div>
            <SimpleModal show={showAuthModal} setShow={setShowAuthModal}>
                <div className={styles.accountModal}>
                    <h1 className={`${styles.outlineTitle} text-large`}>Войдите в аккаунт <br/> чтобы оставить чек-ин</h1>
                    <FaLock/>
                    <SimpleButton text="Авторизация" onClick={() => navigate("/login")}></SimpleButton>
                </div>
            </SimpleModal>
        </div>
    )
}