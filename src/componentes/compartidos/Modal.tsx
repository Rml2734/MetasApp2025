import { useContext } from "react";
import { useParams } from "react-router-dom";
import { Contexto } from "../servicios/Memoria";
import styles from "./Modal.module.css"
import Detalles from "../nueva/Detalles";

function Modal() {
    const { id } = useParams();
    const [estado, enviar] = useContext(Contexto);
    return (
        <div className={styles.fixed}>
            {JSON.stringify(estado.objetos[id])}
            <Detalles />
        </div>
    );
}

export default Modal;