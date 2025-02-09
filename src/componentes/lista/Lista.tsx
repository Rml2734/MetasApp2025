import Meta from "./Meta";


const listaMock = [
  {
    "id":"1",
    "detalles": "Correr por 30 minutos",
    "periodo": "semana",
    "eventos": 1,
    "icono": "🏃‍♂️",
    "meta": 365,
    "plazo": "2030-01-01",
    "completado": 175,
  },
  {
    "id":"2",
    "detalles": "Leer libros",
    "periodo": "año",
    "eventos": 6,
    "icono": "📚",
    "meta": 12,
    "plazo": "2030-01-01",
    "completado": 6,
  },
  {
    "id":"3",
    "detalles": "Viajar a parque nacionales",
    "periodo": "mes",
    "eventos": 1,
    "icono": "✈️",
    "meta": 60,
    "plazo": "2030-01-01",
    "completado": 30,
  },
];


function Lista() {
    return (
        <>
        {listaMock.map((meta) => (
          <Meta key={meta.id} {...meta} />
        ))}
      </>
    );
}

export default Lista;
