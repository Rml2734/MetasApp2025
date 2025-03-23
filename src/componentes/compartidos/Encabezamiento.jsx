// src/componentes/compartidos/Encabezamiento.jsx
import { usarTema } from "../../memoria/ContextoTema";
import { useNavigate } from "react-router-dom";
import { eliminarUsuario } from "../../servicios/Auth"; // Nueva función
import React, { useState, useContext, useEffect, useRef } from "react";
import styles from "./Encabezado.module.css";
import { ReactComponent as LogoSVG } from "./logo.svg";
import { ReactComponent as PerfilSVG } from "./perfil.svg";
import { cerrarSesion } from "../../servicios/Auth";
import { ContextoAuth } from "../../memoria/ContextoAuth"; // Importa el contexto de autenticación


/**
 * Componente de encabezado con menú de usuario y control de tema
 * @param {Function} toggleMenu - Función para alternar menú lateral en móvil
 * @param {Boolean} privado - Indica si debe mostrar elementos de usuario autenticado
 */
function Encabezamiento({ toggleMenu, privado }) {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [auth] = useContext(ContextoAuth); // Obtén el estado de autenticación
  const menuRef = useRef(null); // Referencia al menú desplegable
  const { temaOscuro, toggleTema } = usarTema(); //TRABAJANDO EN TEMA CLARO/OSCURO
  const navegar = useNavigate(); // <-- Añadir esto

  // Alternar visibilidad del menú de perfil
  const toggleMenuPerfil = () => {
    setMostrarMenu(!mostrarMenu);
  };

  // Cerrar sesión y redirigir
  const enCerrarSesion = () => {
    cerrarSesion(); // Limpia el localStorage y redirige
    navegar("/inicio");
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

  // Eliminar cuenta de usuario
  const enEliminarUsuario = async () => {
    console.log("🔍 Estado actual de auth:", auth); // 👀 Ver qué tiene auth en consola

    if (!auth.usuario || !auth.usuario.id) {
      // 🔥 Validar que haya usuario autenticado
      alert("Error: No hay usuario autenticado.");
      return;
    }

    if (
      window.confirm(
        "¿Estás seguro de eliminar tu cuenta? Esta acción es irreversible"
      )
    ) {
      try {
        console.log("🗑 Eliminando usuario con ID:", auth.usuario.id); // 👈 Verificar el ID en la consola

        await eliminarUsuario(auth.token, auth.usuario.id);
        cerrarSesion();
        navegar("/inicio");
      } catch (error) {
        console.error("Error eliminando usuario:", error);
        alert("Error al eliminar la cuenta: " + error.message);
      }
    }
  };

  return (
    <header
      className={styles.encabezado}
      style={{
        backgroundColor: "var(--color-encabezado)",
        color: "var(--color-texto)",
      }}
    >
      <div className={styles.contenedor}>
        {privado && (
          <button className={styles.menuButton} onClick={toggleMenu} aria-label="Menú principal">
            ☰
          </button>
        )}
        <LogoSVG className={styles.logo} aria-hidden="true"  />
        <a className={styles.titulo} href="/">
          Metas App
        </a>
      </div>

      <div className={styles.contenedorTema}>
        <button
          onClick={toggleTema}
          className={styles.botonTema}
          aria-label={`Cambiar a tema ${temaOscuro ? 'claro' : 'oscuro'}`}
        >
          {temaOscuro ? '🌞' : '🌙'}
        </button>

        {/* Mostrar el botón de perfil solo si el usuario está autenticado */}
        {auth.autenticado && (
          <nav className={styles.perfilContainer} ref={menuRef}>
            <button 
              className={styles.perfilBoton} 
              onClick={toggleMenuPerfil}
              aria-label="Menú de usuario"
            >
              <PerfilSVG className={styles.perfilIcono} aria-hidden="true" />
            </button>

            <div className={`${styles.menuDesplegable} ${mostrarMenu ? styles.mostrar : ''}`}>
              <div className={styles.usuarioInfo}>
                <svg className={styles.opcionIcono} aria-hidden="true">
                  {/* Icono de perfil */}
                </svg>
                <div>
                  <div className={styles.nombreUsuario}>
                    {auth.usuario?.nombre || "Usuario"}
                  </div>
                  <div className={styles.emailUsuario}>
                    {auth.usuario?.email}
                  </div>
                </div>
              </div>

              <div className={styles.separador} />

              <button onClick={enCerrarSesion} className={styles.opcionMenu}>
                <svg className={styles.opcionIcono} aria-hidden="true">
                  {/* Icono de cerrar sesión */}
                </svg>
                Cerrar Sesión
              </button>

              <button
                onClick={enEliminarUsuario}
                className={`${styles.opcionMenu} ${styles.opcionPeligro}`}
              >
                <svg className={styles.opcionIcono} aria-hidden="true">
                  {/* Icono de eliminar cuenta */}
                </svg>
                Eliminar Cuenta
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Encabezamiento;
