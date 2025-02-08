import styles from "./Meta.module.css"



function Meta() {
    return (
        <div className={`${styles.meta} tarjeta`}>
            <div className={styles.flex1}>
                <div className={styles.icono}>🏃</div>
                <p className={styles.frecuencia}>1
                    <sub className={styles.sub}>/ semana</sub></p>
                <p>detalles</p>
            </div>
            <div className={styles.flex2}>
                <div>
                    <p>4 de 5</p>
                    <div>
                        <div></div>
                    </div>
                </div>
                <button>Completado</button>
            </div>
        </div>
    );
}

export default Meta;