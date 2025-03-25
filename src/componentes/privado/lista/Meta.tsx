import { MetaTipo } from "../../../tipos/MetaTipo";
import styles from "./Meta.module.css";
import { Link } from "react-router-dom";
import confetti from 'canvas-confetti';
import { useEffect } from 'react'; // Importar useEffect
import { motion } from 'framer-motion';



type MetaProps = MetaTipo

function Meta({ id, icono, eventos, periodo, detalles, meta, completado }: MetaProps) {

    // Efecto para el confeti
    useEffect(() => {
        if (completado >= meta) {
            const count = 200;
            const defaults = {
                origin: { y: 0.7 },
                zIndex: 9999
            };

            const fire = (particleRatio: number, opts: any) => {
                confetti({
                    ...defaults,
                    ...opts,
                    particleCount: Math.floor(count * particleRatio)
                });
            };

            fire(0.25, { spread: 26, startVelocity: 55 });
            fire(0.2, { spread: 60 });
            fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
            fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
            fire(0.1, { spread: 120, startVelocity: 45 });
        }
    }, [completado, meta]); // Se ejecuta solo cuando cambia completado o meta
    
    return (
         <Link to={`/lista/${id}`} className={`${styles.meta} tarjeta`}>
            <div className={styles.correr}>
                <motion.div 
                    className={styles.icono}
                    whileHover={{ scale: 1.1 }}
                >
                    {icono}
                </motion.div>
                <p className={styles.frecuencia}>
                    {eventos}
                    <sub className={styles.sub}>/ {periodo}</sub>
                </p>
                <p className={styles.detalleTexto}>{detalles}</p>
            </div>
            <div className={styles.completo}>
                <div className={styles.inicio}>
                    <p className={styles.completa}>{completado} de {meta}</p>
                    <div className={styles.barra1}>
                        <motion.div 
                            className={styles.barra2}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((completado / meta ) * 100)}%` }}
                            transition={{ duration: 0.8 }}
                        />
                    </div>
                </div>
                <motion.button 
    className={`${styles.boton} ${completado >= meta ? styles.botonCompletado : styles.botonGris}`}
    whileHover={completado < meta ? { scale: 1.05 } : {}}
    whileTap={completado < meta ? { scale: 0.95 } : {}}
    disabled={completado >= meta}
>
    {completado >= meta ? '🎉 ¡Logrado!' : 'Completar'}
</motion.button>
            </div>
        </Link>
    );
}

export default Meta;


