import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TemaProvider } from "./contextos/TemaContext";

const elementoRaiz = document.getElementById("raiz");

ReactDOM.createRoot(elementoRaiz).render(
  <React.StrictMode>
    <TemaProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </TemaProvider>
  </React.StrictMode>
);
