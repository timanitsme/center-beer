import styles from "./BorderedGradientButton.module.scss"

export default function BorderedGradientButton({text, onClick = () => {}}){
    return (
        <button className={styles.gradientButton} onClick={onClick}>
            <p>{text}</p>
        </button>
    );
}
