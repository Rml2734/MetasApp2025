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
