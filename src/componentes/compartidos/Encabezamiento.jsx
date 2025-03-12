import React from "react";
import styles from "./Encabezado.module.css";
import { ReactComponent as LogoSVG } from "./logo.svg";
import { ReactComponent as PerfilSVG } from "./perfil.svg";
import Vinculo from "./Vinculo";

function Encabezamiento({ toggleMenu, privado }) {
  return (
      <header className={styles.encabezado}>
          <div className={styles.contenedor}>
              {/* Mostrar el botón solo si es una página privada */}
              {privado && (
                  <button className={styles.menuButton} onClick={toggleMenu}>
                      ☰
                  </button>
              )}
              <LogoSVG className={styles.logo} />
              <a className={styles.titulo} href="/">Metas App</a>
          </div>
          <nav>
              <Vinculo to="/perfil" Icono={PerfilSVG} />
          </nav>
      </header>
  );
}


export default Encabezamiento;
