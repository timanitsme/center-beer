import styles from "./ImageVideoModal.module.css"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import ImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg";
import {useEffect, useRef} from "react";

export default function ImageVideoModal({src, setSrc, show, setShow}){
    const handleError = () => {
    }

    return(
        <SimpleModal show={show} setShow={setShow}>
            {src.type === "image" && <div className={styles.imageWrapper}>
                <img onClick={() => setShow(false) } src={src?.preview} alt="" onError={handleError}/>
            </div>}

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