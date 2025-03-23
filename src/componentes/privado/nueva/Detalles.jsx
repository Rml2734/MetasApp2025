import React from "react";
import { useContext, useEffect, useState } from "react";
import styles from "./Detalles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { actualizarMeta, borrarMeta, crearMeta } from "../../../servicios/Metas";
import { ContextoMetas } from "../../../memoria/ContextoMetas";
import { motion } from "framer-motion";
import { Howl } from 'howler';

function Detalles() {
    const { id } = useParams(); // ID será `undefined` en creación
    
    // Estado del formulario
    const [form, setForm] = useState({
        detalles: "",
        eventos: 1,
        periodo: "semana",
        icono: "🏃‍♂️",
        meta: 52,
        plazo: "2030-01-01",
        completado: 0,
      });

    const [estado, enviar] = useContext(ContextoMetas); // Obtener estado global

    const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

    // 🛑 Manejar cambios en los inputs (incluyendo conversión de tipos)
    const onChange = (event, prop) => {
        setForm((estado) => ({ ...estado, [prop]: event.target.value }));
      };
    const navegar = useNavigate();

    

    const metaMemoria = estado.objetos[id];

     // 🔄 Inicializar el formulario al cargar el componente
    useEffect(() => {
       if (!id) return;
       if (!metaMemoria) {
           return navegar('/lista');
       }
       setForm(metaMemoria);
    }, [id, metaMemoria, navegar]);


    // 🚀 Crear nueva meta
    const enCrear = async () => {
        const nuevaMeta = await crearMeta(form);
        enviar({ tipo: 'crear', meta: nuevaMeta });
        new Howl({ src: ['https://assets.mixkit.co/sfx/418/418-preview.mp3'] }).play();
        navegar('/lista');
    }

    // 🔄 Actualizar meta existente
    const enActualizar = async () => {
        if (!form.id) return; // 👈 Asegúrate de que exista form.id
        const metaActualizada = await actualizarMeta(form);
        enviar({ tipo: 'actualizar', meta: metaActualizada });
        new Howl({ src: ['https://assets.mixkit.co/sfx/2570/2570-preview.mp3'] }).play();
        navegar('/lista');
    } 

    // 🗑️ Borrar meta
    const enBorrar = async () => {
        //const id = form.id;
        await borrarMeta(form.id);
        enviar({ tipo: 'borrar', id: form.id });
        navegar('/lista');
      };
    
    const regresar = () => {
        navegar('/lista')
    }

    const Frecuencias = ["día", "semana", "mes", "año"];
    const iconos = ["💻", "🏃‍♂️", "📚", "✈️", "💵"];

    // 🎨 Componente visual
    return(
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="tarjeta"
        >
            <form className={styles.formu}>
                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    Describe tu meta
                    <input 
                        className="input"
                        placeholder="ej. 52 caminatas"
                        value={form.detalles}
                        onChange={(e) => onChange(e, "detalles")}
                    />
                </motion.label>

                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    ¿Con qué seguimiento deseas cumplir tu meta?
                    <span>(ej. 1 vez a la semana)</span>
                    <div className={styles.semana}>
                        <input
                            className={`input ${styles.semana1}`}
                            type="number"
                            value={form.eventos}
                            onChange={(e) => onChange(e, "eventos")}
                        />
                        <select
                            className="input"
                            value={form.periodo}
                            onChange={(e) => onChange(e, "periodo")}
                        >
                            {["día", "semana", "mes", "año"].map(opcion => (
                                <option key={opcion} value={opcion}>{opcion}</option>
                            ))}
                        </select>
                    </div>
                </motion.label>

                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    ¿Cuántas veces deseas completar esta meta?
                    <input
                        className="input"
                        type="number"
                        value={form.meta}
                        onChange={(e) => onChange(e, "meta")}
                    />
                </motion.label>

                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    ¿Tienes una fecha límite?
                    <input
                        className="input"
                        type="date"
                        value={form.plazo}
                        onChange={(e) => onChange(e, "plazo")}
                    />
                </motion.label>

                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    ¿Cuántas veces has completado esta meta?
                    <input
                        className="input"
                        type="number"
                        value={form.completado}
                        onChange={(e) => onChange(e, "completado")}
                    />
                </motion.label>

                <motion.label className="label" whileHover={{ scale: 1.02 }}>
                    Escoge el icono para la meta
                    <select
                        className="input"
                        value={form.icono}
                        onChange={(e) => onChange(e, "icono")}
                    >
                        {["💻", "🏃‍♂️", "📚", "✈️", "💵"].map(opcion => (
                            <option key={opcion} value={opcion}>{opcion}</option>
                        ))}
                    </select>
                </motion.label>
            </form>

            <motion.div className="botones" layout>
                {!id && (
                    <motion.button
                        className="boton boton--negro"
                        onClick={enCrear}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ✨ Crear Meta
                    </motion.button>
                )}

                {id && (
                    <motion.button
                        className="boton boton--negro"
                        onClick={enActualizar}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🚀 Actualizar
                    </motion.button>
                )}

                {id && (
                    <motion.button
                        className="boton boton--rojo"
                        onClick={enBorrar}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        🗑️ Borrar
                    </motion.button>
                )}

                <motion.button
                    className="boton boton--gris"
                    onClick={() => navegar('/lista')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    ✖️ Cancelar
                </motion.button>
            </motion.div>
        </motion.div>
    );
}

export default Detalles;