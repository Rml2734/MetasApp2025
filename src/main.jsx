import React from "react";
import './App.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import MetasMemoria from './memoria/Metas.jsx';
import AuthMemoria from './memoria/Auth.jsx';
import reportWebVitals from "./reportWebVitals";


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

reportWebVitals();