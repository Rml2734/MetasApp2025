import styles from "./Meta.module.css";

interface MetaProps {
    icono: string;
    eventos: number;
    periodo: string;
    detalles: string;
    meta: number;
    completado: number;
  }

function Meta({ icono, eventos, periodo, detalles, meta, completado }: MetaProps) {
    
    return (
        <div className={`${styles.meta} tarjeta`}>
            <div className={styles.correr}>
                <div className={styles.icono}>{icono}</div>
                <p className={styles.frecuencia}>{eventos}
                    <sub className={styles.sub}>/ {periodo}</sub></p>
                <p>{detalles}</p>
            </div>
            <div className={styles.completo}>
                <div className={styles.inicio}>
                    <p className={styles.completa}>{completado} de {meta}</p>
                    <div className={styles.barra1}>
                        <div 
                          style={{
                            width: `${Math.round((completado / meta ) * 100)}%`,
                          }}
                        className={styles.barra2}></div>
                    </div>
                </div>
                <button className="boton boton--gris">Completado</button>
            </div>
        </div>
    );
}

export default Meta;


