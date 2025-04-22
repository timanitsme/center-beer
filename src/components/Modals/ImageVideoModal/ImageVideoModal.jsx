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
                 <iframe style={{width: "50vw", aspectRatio: "16/9"}} src={src?.iframe || src?.url} frameBorder="0" allowFullScreen></iframe>
            </div>}

        </SimpleModal>
    )
}