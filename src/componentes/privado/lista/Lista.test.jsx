import { render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import { ContextoMetas } from '../../../memoria/ContextoMetas';
import Lista from "./Lista";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Link: ({ children, to }) => <a href={to}>{children}</a>,
    Outlet: () => null
}));

describe('Lista', () => {
    const estadoPrueba = {
        orden: ["1", "2"],
        objetos: {
            "1": {
                id: "1",
                detalles: "Meta 1",
                eventos: 3,
                periodo: "semana",
                icono: "🎯",
                meta: 52,
                completado: 0
            },
            "2": {
                id: "2",
                detalles: "Meta 2",
                eventos: 1,
                periodo: "día",
                icono: "📚",
                meta: 365,
                completado: 10
            }
        }
    };

    it('renderiza la lista de metas cuando hay metas', () => {
        render(
            <ContextoMetas.Provider value={[estadoPrueba, jest.fn()]}>
                <MemoryRouter>
                    <Lista />
                </MemoryRouter>
            </ContextoMetas.Provider>
        );
        
        expect(screen.getByText('Meta 1')).toBeInTheDocument();
        expect(screen.getByText('Meta 2')).toBeInTheDocument();
    });

    it('muestra mensaje cuando no hay metas', () => {
        const estadoVacio = { orden: [], objetos: {} };
        render(
            <ContextoMetas.Provider value={[estadoVacio, jest.fn()]}>
                <MemoryRouter>
                    <Lista />
                </MemoryRouter>
            </ContextoMetas.Provider>
        );
        
        expect(screen.getByText('No hay metas aún')).toBeInTheDocument();
    });
});