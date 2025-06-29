import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import styles from "./SingleVideoModal.module.scss";

export default function SingleVideoModal({src, setSrc, show, setShow}){
    const handleError = () => {

    }
    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.imageWrapper}>
                <iframe src={`${src}&muted=0`} width="853"
                        height="480"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                        frameBorder="0"
                        allowFullScreen></iframe>
            </div>
        </SimpleModal>
    )
}