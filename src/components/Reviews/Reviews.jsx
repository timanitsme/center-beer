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

export default function Reviews({header, images, resume}){

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

    return(
        <div className={styles.reviews}>
            <ComponentHeader HeaderIcon={BeardIcon} title={header.title} description={header.description}/>
            {images && images.length > 0 && <PicturesList images={images}></PicturesList>}
            <div className="hrtLine" style={{margin: "20px 0"}} />
            <div className={styles.commentsSection}>
                <div className={styles.commentsContainer}>
                    <Comment/>
                    {/*<CommentSecondary/>*/}
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