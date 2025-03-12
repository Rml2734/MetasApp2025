import React from "react";
import styles from "./Aside.module.css";
import Vinculo from "./Vinculo";
import { ReactComponent as ListaSVG } from "./lista.svg";
import { ReactComponent as NuevaSVG } from "./nueva.svg";

function Aside({ menuAbierto }) {
    return (
        <aside className={`${styles.aside} ${menuAbierto ? styles.open : ""}`}>
            <Vinculo to="/lista" texto="Lista de Metas" Icono={ListaSVG} />
            <Vinculo to="/nueva" texto="Nueva Meta" Icono={NuevaSVG} />
        </aside>
    );
}

export default Aside;
