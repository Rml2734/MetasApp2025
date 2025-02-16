import './App.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MetasMemoria from './memoria/Metas';
import AuthMemoria from './memoria/Auth';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthMemoria>
      <MetasMemoria> 
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MetasMemoria>
    </AuthMemoria>
  </StrictMode>
);
