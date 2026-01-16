import styles from "./CustomEventReviews.module.scss"
import SectionHeader from "../SectionHeader/SectionHeader.jsx";
import ArrowLeftIcon from "../../assets/arrow-left-icon.svg?react";
import ArrowRightIcon from "../../assets/arrow-right-icon.svg?react"
import {getRatingIcons} from "../../utils/getRatingIcons.jsx";
import {useState} from "react";
import {motion} from "motion/react"

export default function CustomEventReviews({reviews}){
    const [currentReview, setCurrentReview] = useState(reviews[0])

    return(
        <div id="custom-event-reviews">
            <SectionHeader title={"Отзывы"} description={"Наша команда стремится сделать каждое мероприятие уникальным и запоминающимся. Убедитесь сами: прочитайте отзывы наших гостей, которые доверили нам организацию своих праздников. Мы знаем, как важно превзойти ожидания!"}/>
            <section className={styles.reviews}>
                <div className={styles.imageContainer}>
                    <motion.img key={`reviewImage-${currentReview.id}`} src={currentReview.picture} alt="" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 1}}/>
                </div>
                <div className={styles.reviewContent}>
                    <motion.div className={styles.feedback}
                         key={currentReview.id}
                         initial={{ opacity: 0, x: 50 }}
                         animate={{ opacity: 1, x: 0 }}
                         exit={{ opacity: 0, x:  -50 }}
                         transition={{ duration: 0.5 }}
                    >
                        <div className={styles.bottles}>
                            {getRatingIcons(currentReview.rating)}
                        </div>
                        <h3 className="ma-h4" style={{textAlign: "left"}}>{currentReview.comment}</h3>
                    </motion.div>
                    <div>
                        <div className={styles.hrtLine}/>
                        <div className={styles.bottomPart}>
                            <motion.p className="ma-p"
                               key={currentReview.id}
                               initial={{ opacity: 0, x: 50 }}
                               animate={{ opacity: 1, x: 0 }}
                               exit={{ opacity: 0, x:  -50 }}
                               transition={{ duration: 0.5 }}
                            >{currentReview.author}</motion.p>
                            <div className={styles.buttons}>
                                <div onClick={() => currentReview.id > 0? setCurrentReview(reviews[currentReview.id-1]): setCurrentReview(reviews[reviews.length - 1])}><ArrowLeftIcon/></div>
                                <div onClick={() => currentReview.id < reviews.length - 1? setCurrentReview(reviews[currentReview.id+1]): setCurrentReview(reviews[0])}><ArrowRightIcon/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}