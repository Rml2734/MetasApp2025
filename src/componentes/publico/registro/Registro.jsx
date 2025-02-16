import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { registrarse } from "../../../servicios/Auth";
import Credenciales from "../../compartidos/Credenciales";
import { ContextoAuth } from "../../../memoria/ContextoAuth";


function Registro() {

  const navegar = useNavigate();

  const [auth, enviarAuth] = useContext(ContextoAuth);
  const enviar = async (form) => {
    const token = await registrarse(form);
    enviarAuth({ tipo: 'colocar', token });
    navegar('/lista');
  };

  return <Credenciales
    enviar={enviar}
    titulo="Registro"
    boton="Registrarme"
  ></Credenciales>

}

export default Registro;
