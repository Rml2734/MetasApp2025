import { render, screen } from "@testing-library/react";
import Meta from "./Meta";



jest.mock("react-router-dom", () => {
  const moduloOriginal = jest.requireActual('react-router-dom');
  return {
    ...moduloOriginal,
    Link: ({children}) => <div>{children}</div>
  };
});

describe("Componente Meta", () => {
  it("renderiza el botón", () => {
    render(<Meta />);
    const botón = screen.getByText('Completado');
    expect(botón).toBeInTheDocument();
  });
});

