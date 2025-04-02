import styles from "./ImageVideoModal.module.css"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import ImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";

export default function ImageVideoModal({src, setSrc, show, setShow}){

    const handleError = () => {
    }

    return(
        <SimpleModal show={show} setShow={setShow}>
            {src.type === "image" && <div className={styles.imageWrapper}>
                <img onClick={() => setShow(false) } src={src?.preview} alt="" onError={handleError}/>
            </div>}

            {src.type === "video" && <div className={styles.imageWrapper}>
                 <div dangerouslySetInnerHTML={{__html: src?.iframe}}></div>
            </div>}

        </SimpleModal>
    )
}