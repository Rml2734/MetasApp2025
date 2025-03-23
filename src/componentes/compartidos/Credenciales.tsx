import React, { ChangeEvent, useState } from "react";
import estilos from "./Credenciales.module.css";
import { Link } from "react-router-dom"; // Importamos Link si usas React Router

interface CredencialesProps {
  enviar: Function;
  titulo: string;
  boton: string;
  mostrarRegresarInicio?: boolean; // Nueva prop
}

function Credenciales({ enviar, titulo, boton,  mostrarRegresarInicio = false }: CredencialesProps) {

  const [mostrarClave, setMostrarClave] = useState(false); // Nuevo estado

  const [form, setForm] = useState({
    usuario: "",
    clave: "",
  });

  const { usuario, clave } = form;

  const onChange = (event: ChangeEvent, prop: string) => {
    const value = (event.target as HTMLInputElement).value;
    setForm((estado) => ({ ...estado, [prop]: value }));
  };

  const enAcceder = async (
    evento: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    evento.preventDefault();
    enviar(form);
  };

  return (
    <div className={'tarjeta ' + estilos.auth}>
      <h1 className={estilos.head}>{titulo}</h1>
      <form className={estilos.relleno}>
        <label className="label">
          usuario
          <input
            className="input"
            placeholder="Escribe tu email"
            value={usuario}
            onChange={(e) => onChange(e, "usuario")}
          />
        </label>
        <label className="label">
          Clave
          <div className={estilos.contenedorClave}>
          <input
            type={mostrarClave ? "text" : "password"} // Cambiar tipo dinámicamente
            className="input"
            placeholder="Escribe tu clave"
            value={clave}
            onChange={(e) => onChange(e, "clave")}
          />
          <button 
            type="button" 
            className={estilos.botonOjo}
            onClick={() => setMostrarClave(!mostrarClave)}
            aria-label={mostrarClave ? "Ocultar clave" : "Mostrar clave"}
          >
            {mostrarClave ? '👁️' : '👁️🗨️'}
          </button>
        </div>
        </label>

        {/* ESTILOS DE REGRESAR INICIO Y OLVIDAR CONTRASEÑA*/}
        <div className={estilos['credenciales-enlaces']}>
          {mostrarRegresarInicio && (
            <Link 
              to="/inicio" 
              className={`${estilos['regresar-inicio']} credenciales-enlace-regreso`}
             >
             Regresar al menú principal
            </Link>
          )}
  
          <Link 
            to="/recuperar-clave" 
            className={`${estilos['olvido-clave']} credenciales-enlace-olvido`}
            >
            ¿Has olvidado tu contraseña?
          </Link>
        </div>

      </form>
      <div className="botones">
        <button className="boton boton--negro" onClick={(e) => enAcceder(e)}>
          {boton}
        </button>
      </div>
    </div>
  );
}

export default Credenciales;
