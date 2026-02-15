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
import {useGetBeerCheckinsQuery} from "../../store/services/centerBeer.js";

export default function CheckInReviews({header, resume, id}){
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
    const {data: checkIns, isLoading: checkinsIsLoading, isFetching: checkinsIsFetching, refetch: checkinsRefetch, error: checkinsError} = useGetBeerCheckinsQuery({beerId: id})

    const handleNewCheckin = async () => {
        checkinsRefetch()
    };


    useEffect(() => {
        if (checkIns?.data) {
            setVisibleCheckIns({
                ...checkIns,
                data: showAllCheckIns ? checkIns.data : checkIns.data.slice(0, 3),
            });
        }
    }, [showAllCheckIns, checkinsIsFetching]);

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
                    {visibleCheckIns?.data.map((review, index) => {
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
                        <NewCheckInForm onSubmit={handleNewCheckin} id={id} ref={commentRef} profile={userProfile}/>
                    }
                </div>
                <div className={styles.assessmentContainer}>
                    <div className={styles.assessment}>
                        <p className={styles.pHeader} style={{textTransform: "uppercase"}}>{resume.title}</p>
                        <p>{resume.rated(checkIns?.rating_info?.rated_visitors || 0)}</p>
                        <div className={styles.dateAndBottles}>
                            <p>Средняя оценка: </p>
                            <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                                {getRatingIcons(checkIns?.rating_info?.average_rating || 0)}
                            </div>
                            <p style={{color: "var(--txt-active)"}}>({checkIns?.rating_info?.average_rating || 0})</p>
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