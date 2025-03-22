import styles from "./SingleImageModal.module.css"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import ImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"
import {useState} from "react";

export default function SingleImageModal({src, show, setShow}){
    const[imageSrc, setImageSrc] = useState(src)

    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.imageWrapper}>
                <img src={imageSrc} alt="" onError={() => setImageSrc(ImagePlaceholder)}/>
            </div>
        </SimpleModal>
    )
}
