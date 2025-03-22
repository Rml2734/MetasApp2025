// src/componentes/compartidos/Encabezamiento.jsx
import { usarTema } from "../../memoria/ContextoTema";

import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./Encabezado.module.css";
import { ReactComponent as LogoSVG } from "./logo.svg";
import { ReactComponent as PerfilSVG } from "./perfil.svg";
import { cerrarSesion } from "../../servicios/Auth";
import { ContextoAuth } from "../../memoria/ContextoAuth"; // Importa el contexto de autenticación

function Encabezamiento({ toggleMenu, privado }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [auth] = useContext(ContextoAuth); // Obtén el estado de autenticación
  const menuRef = useRef(null); // Referencia al menú desplegable
  const { temaOscuro, toggleTema } = usarTema(); //TRABAJANDO EN TEMA CLARO/OSCURO

  const toggleMenuPerfil = () => {
    setMostrarMenu(!mostrarMenu);
  };

  const enCerrarSesion = () => {
    cerrarSesion(); // Limpia el localStorage y redirige
  };

  // Efecto para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMostrarMenu(false); // Cierra el menú si el clic ocurre fuera
      }
    };

    // Agregar el listener al montar el componente
    document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el listener al desmontar el componente
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className={styles.encabezado} style={{
      backgroundColor: 'var(--color-encabezado)',
      color: 'var(--color-texto)'
    }}>
      <div className={styles.contenedor}>
        {privado && (
          <button className={styles.menuButton} onClick={toggleMenu}>
            ☰
          </button>
        )}
        <LogoSVG className={styles.logo} />
        <a className={styles.titulo} href="/">Metas App</a>
      </div>

      <div className={styles.contenedorTema}>
        <button 
          onClick={toggleTema}
          className={styles.botonTema}
          aria-label="Cambiar tema"
        >
          {temaOscuro ? '🌞' : '🌙'}
        </button>

      {/* Mostrar el botón de perfil solo si el usuario está autenticado */}
      {auth.autenticado && (
        <nav className={styles.perfilContainer} ref={menuRef}>
          <button className={styles.perfilBoton} onClick={toggleMenuPerfil}>
            <PerfilSVG className={styles.perfilIcono} />
          </button>

          {mostrarMenu && (
            <div className={styles.menuDesplegable}>
              <button onClick={enCerrarSesion} className={styles.cerrarSesion}>
                Cerrar Sesión
              </button>
            </div>
          )}
        </nav>
      )}
      </div>
    </header>
  );
}

export default Encabezamiento;