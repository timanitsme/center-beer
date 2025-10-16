import styles from "./OfferComparisonTable.module.scss"

export default function OfferComparisonTable(){
    return(
        <section className={styles.comparisonSection}>
            <h2 className="ma-h3">Сравнение: <span className={`${styles.accent} ma-h3`} style={{fontFamily: "Podkova"}}>пакет</span> vs по отдельности</h2>
            <div className={styles.tableContainer}>
                <table className={styles.compareTable}>
                    <thead>
                    <tr>
                        <th className="ma-p">Услуга</th>
                        <th className="ma-p">По отдельности</th>
                        <th className={`${styles.accent} ma-p`}>Пакет Всё включено</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="ma-p">Аренда зала</td>
                        <td className="ma-p">50 000 ₽</td>
                        <td className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p">Ведущий</td>
                        <td className="ma-p">15 000 ₽</td>
                        <td  className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p">Диджей</td>
                        <td className="ma-p">20 000 ₽</td>
                        <td className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p">Декор</td>
                        <td className="ma-p">10 000 ₽</td>
                        <td className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p">Фото/видео</td>
                        <td className="ma-p">15 000 ₽</td>
                        <td className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p">Welcome drink + комбо наборы</td>
                        <td className="ma-p">20 000 ₽</td>
                        <td className={`${styles.accent} ma-p`}>✓ Включено</td>
                    </tr>
                    <tr>
                        <td className="ma-p"><strong>Итого</strong></td>
                        <td className="ma-p"><strong>130 000 ₽</strong></td>
                        <td className={`${styles.accent} ma-p`}><strong>100 000 ₽</strong></td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}