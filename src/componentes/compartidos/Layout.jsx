import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Encabezamiento from "./Encabezamiento";
import Pie from "./Pie";
import styles from "./Layout.module.css";
import Aside from "./Aside";

function Layout({ privado = false }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <>
      <Encabezamiento 
        toggleMenu={() => setMenuAbierto(!menuAbierto)} 
        privado={privado} 
      />

      <main className={styles.main}>
        {privado && <Aside menuAbierto={menuAbierto} />}
        <section className={styles.section}>
          <Outlet context={{ cerrarMenu: () => setMenuAbierto(false) }} />
        </section>
      </main>

      <Pie />

      {/* Overlay para móviles */}
      {menuAbierto && (
        <div 
          className={styles.overlay} 
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}
    </>
  );
}

export default Layout;