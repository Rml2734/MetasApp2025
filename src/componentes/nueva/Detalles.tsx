import { useContext, useEffect, useState } from "react";
import styles from "./Detalles.module.css";
import { Contexto } from "../servicios/Memoria";
import { useNavigate } from "react-router-dom";

function Detalles() {

    const [form, setForm] = useState({
        detalles: "",
        eventos: 1,
        periodo: "semana",
        icono: "🏃‍♂️",
        meta: 52,
        plazo: "2030-01-01",
        completado: 0,
      });

    const [estado, enviar] = useContext(Contexto);

    const { detalles, eventos, periodo, icono, meta, plazo, completado } = form;

    const onChange = (event, prop) => {
        setForm((estado) => ({ ...estado, [prop]: event.target.value }));
      };

    useEffect(() => {
       //console.log(form);
    }, [form])

    const navegar = useNavigate();

    const crear = async () => {
        //console.log(form);
        enviar({ tipo: 'crear', meta: form });
        navegar('/lista');
    }

    const Frecuencias = ["día", "semana", "mes", "año"];
    const iconos = ["💻", "🏃‍♂️", "📚", "✈️", "💵"];

    return(
        <div className="tarjeta">
            <form className={styles.formu}>
                <label className="label">
                    Describe tu meta
                    <input 
                        className="input"
                        placeholder="ej. 52 caminatas"
                        value={detalles}
                        onChange={(e) => onChange(e, "detalles")}
                    />
                </label>
                <label className="label">
                    ¿Con que frecuencia deseas cumplir tu meta?
                    <span>(ej. 1 vez a la semana)</span>
                    <div className={styles.semana}>
                        <input
                            className={`input ${styles.semana1}`} 
                            type="number" 
                            value={eventos}
                            onChange={(e) => onChange(e, "eventos")}
                        />
                        <select 
                            className="input"
                            value={periodo}
                            onChange={(e) => onChange(e, "periodo")}
                        >
                            {Frecuencias.map((opcion) => (
                            <option key={opcion} value={opcion}>
                            {opcion}</option>
                            ))}
                        </select>
                    </div>
                </label>
                <label className="label">
                    ¿Cuantas veces deseas completar esta meta?
                    <input
                        className="input" 
                        type="number" 
                        value={meta}
                        onChange={(e) => onChange(e, "meta")}
                    />
                </label>
                <label className="label">
                    ¿Tienes una fecha límite?
                    <input
                        className="input" 
                        type="date" 
                        value={plazo}
                        onChange={(e) => onChange(e, "plazo")}
                    />
                </label>
                <label className="label">
                   ¿Cuantas veces haz completado ya esta meta?
                   <input
                        className="input" 
                        type="number" 
                        value={completado}
                        onChange={(e) => onChange(e, "completado")}
                    />
                </label>
                <label className="label">
                    Escoge el icono para la meta 
                    <select 
                       className="input"
                       value={icono}
                       onChange={(e) => onChange(e, "icono")}
                    >
                       {iconos.map((opcion) => (
                       <option key={opcion} value={opcion}>
                       {opcion}
                       </option>
                       ))}
                    </select>
                </label>
            </form>
            <div className={styles.botones}>
                <button className="boton boton--negro" onClick={crear}>Crear</button>
                <button className="boton boton--gris">Cancelar</button>
            </div>
        </div>
    );
}

export default Detalles;