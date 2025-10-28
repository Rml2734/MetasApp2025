/*
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { acceder } from "../../../servicios/Auth";
import Credenciales from "../../compartidos/Credenciales";
import { ContextoAuth } from "../../../memoria/ContextoAuth";


function Acceso() {

  const navegar = useNavigate();

  const [auth, enviarAuth] = useContext(ContextoAuth);
  const enviar = async (form) => {
    const token = await acceder(form);
    enviarAuth({ tipo: 'colocar', token }); // Actualizar el estado de autenticación
    navegar('/lista');
  };

  return <Credenciales
    enviar={enviar}
    titulo="Acceso"
    boton="Acceder"
    mostrarRegresarInicio={true} // Prop para mostrar el enlace
  ></Credenciales>

}

export default Acceso;
*/

import React, { useContext, useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; // Importar Link aquí
import { acceder } from "../../../servicios/Auth";
import Credenciales from "../../compartidos/Credenciales";
import { ContextoAuth } from "../../../memoria/ContextoAuth";
import estilos from "./Acceso.module.css"; // Se mantiene si lo usas para otros elementos

function Acceso() {

const navegar = useNavigate();
const [errorMensaje, setErrorMensaje] = useState(null); 
const [auth, enviarAuth] = useContext(ContextoAuth);

const enviar = async (form) => {
    setErrorMensaje(null); 
    try {
        const token = await acceder(form);
        enviarAuth({ tipo: 'colocar', token }); 
        navegar('/lista');
    } catch (error) {
        console.error("Error en el acceso:", error.message);
        setErrorMensaje(error.message); 
    }
};

return (
    <>
    {/* ⚠️ Mostrar el mensaje de error si existe ⚠️ */}
    {errorMensaje && (
    <div style={{ 
        color: 'white', 
        backgroundColor: '#dc3545', 
        textAlign: 'center', 
        padding: '0.75rem', 
        marginBottom: '1.5rem', 
        borderRadius: '0.5rem',
        fontWeight: 'bold'
    }}>
        {errorMensaje}
    </div>
    )}
    
    <Credenciales
        enviar={enviar}
        titulo="Acceso"
        boton="Acceder"
        mostrarRegresarInicio={true} // Prop para mostrar el enlace
    ></Credenciales>

    {/* 🔗 Enlace de Recuperación (estilos minimalistas) */}
    <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <Link 
            to="/recuperar-clave"
            style={{ 
                color: '#2980b9', // Un color azul que destaca
                textDecoration: 'none', 
                fontSize: '0.9rem'
            }} 
        >
            ¿Olvidaste tu contraseña?
        </Link>
    </div>
    </>
);

}

export default Acceso;