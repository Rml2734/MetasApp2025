import { MetaTipo } from "../tipos/MetaTipo";
const token = localStorage.getItem("token"); // 🔥 Obtiene el token del almacenamiento
console.log("Token recuperado:", token); // 👈 Verifica que no sea null/undefined

export async function pedirMetas(): Promise<MetaTipo[]> {
  //const response = await fetch('/metas.json');
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  const response = await fetch("/api/metas", {
    headers: {
      "Authorization": `Bearer ${token}`, // 👈 Incluir token
    },
  });
  if (!response.ok) throw new Error("Error al obtener metas");
  return await response.json();
}


export async function pedirMeta(id: number): Promise<MetaTipo> {
  // const response = await fetch('/meta.json');
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  const response = await fetch(`/api/metas/${id}`, {
    headers: {
      "Authorization": `Bearer ${token}`, // 👈 Incluir token
    },
  });
  if (!response.ok) throw new Error("Meta no encontrada");
  return await response.json();
}

export async function crearMeta(meta: MetaTipo): Promise<MetaTipo> {
  // const response = await fetch('/meta.json');
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  const response = await fetch("/api/metas", {
    method: "POST",
    body: JSON.stringify(meta),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`, // 🔥 Agrega esta línea
    },
  });
  const metaCreada: MetaTipo = await response.json();
  console.log("Meta creada!", metaCreada);
  return metaCreada;
}

export async function actualizarMeta(meta: MetaTipo): Promise<MetaTipo> {
  // const response = await fetch('/meta.json');
  const token = localStorage.getItem("token"); // 👈 Obtén el token aquí
  if (!token) throw new Error("No hay token de autenticación"); // 👈 Validación
  const response = await fetch(`/api/metas/${meta.id}`, {
    method: "PUT",
    body: JSON.stringify(meta),
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${token}`, // 🔥 Agrega esta línea
    },
  });
  const metaActualizada: MetaTipo = await response.json();
  console.log("Meta actualizada!", metaActualizada);
  return metaActualizada;
}

export async function borrarMeta(id: number): Promise<void> {
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  // const response = await fetch('/meta.json');
  await fetch(`/api/metas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 Agrega esta línea
    },
  });
  console.log("Meta borrada!", id);
}
