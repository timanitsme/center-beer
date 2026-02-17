import styles from "./ImageVideoModal.module.scss"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";

export default function ImageVideoModal({src, setSrc, show, setShow, customType=null}){
    const handleError = () => {
    }

    return(
        <SimpleModal show={show} setShow={setShow}>
            {src.type === "image" && <div className={styles.imageWrapper}>
                <img onClick={() => setShow(false) } src={src?.preview} alt="" onError={handleError}/>
            </div>}
            {customType === "thumb" &&
                <div className={styles.imageWrapper}>
                    <img onClick={() => setShow(false) } src={src?.original} alt="" onError={handleError}/>
                </div>
            }
            {src.type === "video" && <div className={styles.imageWrapper}>
                <iframe src={src?.iframe || src?.url} width="853"
                        height="480"
                        allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;"
                        frameBorder="0"
                        allowFullScreen></iframe>
            </div>}

        </SimpleModal>
    )
}