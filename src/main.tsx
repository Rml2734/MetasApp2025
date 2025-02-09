import './App.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Memoria from './componentes/servicios/Memoria.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Memoria> 
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Memoria>
  </StrictMode>
);
