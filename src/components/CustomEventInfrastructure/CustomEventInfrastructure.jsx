import styles from "./CustomEventInfrastructure.module.scss"
import Infrastructure from "../../assets/infrastructure.svg?react"
import InfrastructureMobile from "../../assets/infra-mobile-alt.svg?react"

export default function CustomEventInfrastructure(){
    return(
        <section className={styles.infrastructureSection}>
            <div className={styles.defaultInfrastructure}><Infrastructure/></div>
            <div className={styles.mobileInfrastructure}><InfrastructureMobile/></div>
        </section>
    )
}