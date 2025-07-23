import styles from "./SingleImageModal.module.scss"
import SimpleModal from "../SimpleModal/SimpleModal.jsx";
import ImagePlaceholder from "../../../assets/placeholders/card-image-placeholder.svg"

export default function SingleImageModal({src, setSrc, show, setShow}){
    return(
        <SimpleModal show={show} setShow={setShow}>
            <div className={styles.imageWrapper}>
                <img onClick={() => setShow(false) } src={src} alt="" onError={() => setSrc(ImagePlaceholder)}/>
            </div>
        </SimpleModal>
    )
}
