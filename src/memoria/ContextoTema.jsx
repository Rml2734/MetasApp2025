import React, { createContext, useState, useContext, useEffect } from 'react';

const ContextoTema = createContext();

export function ProveedorTema({ children }) {
  const [temaOscuro, setTemaOscuro] = useState(false);

  // Cargar tema guardado al inicio
  useEffect(() => {
    const temaGuardado = localStorage.getItem('tema') === 'oscuro';
    setTemaOscuro(temaGuardado);
  }, []);

  const toggleTema = () => {
    const nuevoTema = !temaOscuro;
    setTemaOscuro(nuevoTema);
    localStorage.setItem('tema', nuevoTema ? 'oscuro' : 'claro');
  };

  return (
    <ContextoTema.Provider value={{ temaOscuro, toggleTema }}>
      <div className={temaOscuro ? 'tema-oscuro' : 'tema-claro'}>
        {children}
      </div>
    </ContextoTema.Provider>
  );
}

export const usarTema = () => useContext(ContextoTema);