import { MetaTipo } from "../tipos/MetaTipo";
const token = localStorage.getItem("token"); // 🔥 Obtiene el token del almacenamiento
console.log("Token recuperado:", token); // 👈 Verifica que no sea null/undefined
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:10000";

export async function pedirMetas(): Promise<MetaTipo[]> {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("⚠ No hay token, no se pedirán metas.");
    return [];
  }

  console.log("📡 Enviando petición con token:", token);

  const response = await fetch(`${apiUrl}/api/metas`, { // 🔥 URL completa
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    console.error("🚨 Error en la petición de metas:", response.status);
    throw new Error("Error al obtener metas");
  }

  return await response.json();
}

export async function pedirMeta(id: number): Promise<MetaTipo> {
  // const response = await fetch('/meta.json');
  const token = localStorage.getItem("token"); // 👈 Obtener token aquí
  const response = await fetch(`${apiUrl}/api/metas/${id}`, { // 🔥 URL completa
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
  const response = await fetch(`${apiUrl}/api/metas`, {
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
  const response = await fetch(`${apiUrl}/api/metas/${meta.id}`, {
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
  await fetch(`${apiUrl}/api/metas/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`, // 🔥 Agrega esta línea
    },
  });
  console.log("Meta borrada!", id);
}
