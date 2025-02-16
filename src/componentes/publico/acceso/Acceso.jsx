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
    enviarAuth({ tipo: 'colocar', token });
    navegar('/lista');
  };

  return <Credenciales
    enviar={enviar}
    titulo="Registro"
    boton="Registrarme"
  ></Credenciales>

}

export default Acceso;
