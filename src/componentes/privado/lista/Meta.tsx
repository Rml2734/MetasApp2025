
import { MetaTipo } from "../../../tipos/MetaTipo";
import styles from "./Meta.module.css";
import { Link } from "react-router-dom";


type MetaProps = MetaTipo

function Meta({ id, icono, eventos, periodo, detalles, meta, completado }: MetaProps) {
    
    return (
        <Link to={`/lista/${id}`} className={`${styles.meta} tarjeta`} >
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
        </Link>
    );
}

export default Meta;


