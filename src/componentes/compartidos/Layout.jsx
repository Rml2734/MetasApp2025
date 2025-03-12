import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Encabezamiento from "./Encabezamiento";
import Pie from "./Pie";
import styles from "./Layout.module.css";
import Aside from "./Aside";

function Layout({ privado = false }) {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    const cerrarMenu = () => {
        setMenuAbierto(false);
    };

    return (
        <>
            <Encabezamiento toggleMenu={toggleMenu} privado={privado} />

            <main className={styles.main}>
                {privado && <Aside menuAbierto={menuAbierto} />}
                <section className={styles.section}>
                    <Outlet />
                </section>
            </main>
            <Pie />

            {/* Overlay para cerrar el menú al hacer clic fuera */}
            {menuAbierto && <div className={styles.overlay} onClick={cerrarMenu}></div>}
        </>
    );
}

export default Layout;
