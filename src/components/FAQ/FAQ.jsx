import styles from "./FAQ.module.scss"
import QuestionFAQ from "../QuestionFAQ/QuestionFAQ.jsx";

export default function FAQ({questions = []}){
    return(
        <section className={styles.faq} id="faq">
            <h2 className="ma-h2">Часто задаваемые вопросы</h2>
            <div className={styles.hrtLine}/>
            {questions.map((qa, index) =>
                <QuestionFAQ qa={qa} key={index}/>
            )}

        </section>
    )

}