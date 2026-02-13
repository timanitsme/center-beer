import styles from "./Reviews.module.scss"
import ComponentHeader from "../ComponentHeader/ComponentHeader.jsx";
import BeardIcon from "../../assets/beard-icon.svg?react"
import {useEffect, useRef, useState} from "react";
import SimpleButton from "../Buttons/SimpleButton/SimpleButton.jsx";
import IconButton from "../Buttons/IconButton/IconButton.jsx";
import PropTypes from "prop-types";
import PicturesList from "../PicturesList/PicturesList.jsx";
import Comment from "../Comments/Comment/Comment.jsx";
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import {useSelector} from "react-redux";
import NewCommentForm from "../Comments/NewCommentForm/NewCommentForm.jsx";
import {useNavigate} from "react-router-dom";
import SimpleModal from "../Modals/SimpleModal/SimpleModal.jsx";
import {FaLock} from "react-icons/fa6";
import {
    useGetBarCommentsQuery,
    useGetBeerCommentsQuery,
    useGetBreweryCommentsQuery
} from "../../store/services/centerBeer.js";

export default function Reviews({header, images, resume, alias, id, contacts=null}){
    const { isAuthorized, userProfile, isLoading: profileIsLoading } = useSelector((state) => state.auth);
    const textRef = useRef(null);
    const [isTextClamped, setIsTextClamped] = useState(false);
    const commentRef = useRef(null)
    const navigate = useNavigate()
    const [showAuthModal, setShowAuthModal] = useState(false)
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [visibleReviews, setVisibleReviews] = useState({
        total_items: 0,
        data: [],
    });
    const [filters, setFilters] = useState({lim: 10, offset: 0, _ts: Date.now()})

    const {data: barReviews, isLoading: barReviewsIsLoading, isFetching: barReviewsIsFetching, error: barReviewsError, refetch: barReviewsRefetch} = useGetBarCommentsQuery({barId: id, ...filters}, {skip: alias !== "bar"})
    const {data: beerReviews, isLoading: beerReviewsIsLoading, isFetching: beerReviewsIsFetching, error: beerReviewsError, refetch: beerReviewsRefetch} = useGetBeerCommentsQuery({beerId: id, ...filters}, {skip: alias !== "beer"})
    const {data: breweryReviews, isLoading: breweryReviewsIsLoading, isFetching: breweryReviewsIsFetching, error: breweryReviewsError, refetch: breweryReviewsRefetch} = useGetBreweryCommentsQuery({brewId: id, ...filters}, {skip: alias !== "brewery"})

    const reviewsData = {
        bar: {data: barReviews, isLoading: barReviewsIsLoading, isFetching: barReviewsIsFetching, error: barReviewsError, refetch: barReviewsRefetch},
        beer: {data: beerReviews, isLoading: beerReviewsIsLoading, isFetching: beerReviewsIsFetching, error: beerReviewsError, refetch: beerReviewsRefetch},
        brewery: {data: breweryReviews, isLoading: breweryReviewsIsLoading, isFetching: breweryReviewsIsFetching, error: breweryReviewsError, refetch: breweryReviewsRefetch}
    }

    const handleNewComment = async () => {
        switch (alias) {
            case "bar":
                await barReviewsRefetch();
                break;
            case "beer":
                await beerReviewsRefetch();
                break;
            case "brewery":
                await breweryReviewsRefetch();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if (!reviewsData[alias].isFetching && reviewsData[alias].data && reviewsData[alias].data.data) {
            setVisibleReviews({
                ...reviewsData[alias].data,
                data: showAllReviews ? reviewsData[alias].data.data : reviewsData[alias].data.data.slice(0, 3),
            });
        }
    }, [reviewsData[alias].isFetching, alias, showAllReviews]);


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
        <div className={styles.reviews} id="reviews">
            <ComponentHeader HeaderIcon={BeardIcon} title={header.title} description={header.description}/>
            {images && images.length > 0 && <PicturesList images={images}></PicturesList>}
            <div className="hrtLine" style={{margin: "20px 0"}} />
            <div className={`${styles.assessmentContainer} ${styles.mobile}`}>
                <div className={styles.assessment}>
                    <p className={`${styles.pHeader} ma-p`} style={{textTransform: "uppercase"}}>{resume.title}</p>
                    <p className="ma-p">{resume.rated}</p>
                    <div className={styles.dateAndBottles}>
                        <p className="ma-p">Средняя оценка: </p>
                        <div className={`${styles.beerBottles} ${styles.minBottles}`}>
                            {getRatingIcons(resume.rating)}
                        </div>
                        <p style={{color: "var(--txt-active)"}} className="ma-p">({resume.rating})</p>
                    </div>
                    <p className="ma-p">{resume.description}</p>


                </div>
                <div className={styles.col}>
                    {alias === "bar" && <SimpleButton text="Забронировать стол" onClick={() => window.location.href = `tel:${contacts}`}/>}
                    <IconButton onClick={handleScrollToCommentForm} text="Оставить отзыв"><BeardIcon/></IconButton>
                </div>
            </div>
            <div className={styles.commentsSection}>
                <div className={styles.commentsContainer}>
                    {visibleReviews.data.map((review, index) => {
                       return <Comment key={index} data={review} alias={alias}/>
                    })}

                    {reviewsData[alias].data?.data?.length > 3 && !showAllReviews && (
                        <>
                            <div className={styles.showAllContainer}>
                                <div className={styles.gradient}></div>
                            </div>
                            <div className={styles.buttonRow}>
                                <SimpleButton text={"Показать еще"} onClick={() => {setShowAllReviews(true)}}></SimpleButton>
                            </div>
                        </>

                    )}
                    {reviewsData[alias].data?.data?.length > 3 && showAllReviews && (
                        <div className={styles.buttonRow}>
                            <SimpleButton text={"Скрыть отзывы"} onClick={() => setShowAllReviews(false)}></SimpleButton>
                        </div>
                    )}
                    {!profileIsLoading && isAuthorized &&
                        <NewCommentForm id={id} onSubmit={(newComment) => handleNewComment(newComment)} ref={commentRef} profile={userProfile}/>
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
                    {alias === "bar" && <SimpleButton text="Забронировать стол" onClick={() => window.location.href = `tel:${contacts}`}/>}
                    <IconButton onClick={handleScrollToCommentForm} text="Оставить отзыв"><BeardIcon/></IconButton>

                </div>
            </div>
            <SimpleModal show={showAuthModal} setShow={setShowAuthModal}>
                <div className={styles.accountModal}>
                    <h1 className={`${styles.outlineTitle} text-large`}>Войдите в аккаунт <br/> чтобы оставить отзыв</h1>
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