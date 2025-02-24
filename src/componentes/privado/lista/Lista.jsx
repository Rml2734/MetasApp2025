import React from "react";
import { useContext } from "react";
import Meta from "./Meta";
import { Outlet } from "react-router-dom";
import { ContextoMetas } from "../../../memoria/ContextoMetas";


function Lista() {
  const [metas] = useContext(ContextoMetas);

  return (
    <>
      {metas.orden.map((id) => (
        <Meta key={id} {...metas.objetos[id]}></Meta>
      ))}
      <Outlet />
    </>
  );
}

export default Lista;