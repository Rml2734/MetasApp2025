import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ContextoAuth } from "../../memoria/ContextoAuth";

export function Autenticar() {
  const [auth] = useContext(ContextoAuth);

  if (!auth.autenticado) {
    console.log("🔒 Usuario no autenticado, redirigiendo a /acceso");
    return <Navigate to="/acceso" />;
  }

  return <Outlet />;
}



