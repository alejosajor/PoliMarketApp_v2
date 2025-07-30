import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

import RecursosHumanos from './components/RecursosHumanos';
import Ventas from './components/Ventas';
import Bodega from './components/Bodega';
import Proveedores from './components/Proveedores';
import Entregas from './components/Entregas';

function Login({ onLogin }) {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (input.trim()) {
      onLogin(input.trim());
      navigate("/");
    }
  };

  return (
    <Card>
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold">Iniciar sesión</h2>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ingrese su nombre"
          className="border p-2 w-full"
        />
        <Button onClick={handleLogin}>Ingresar</Button>
      </CardContent>
    </Card>
  );
}

export default function PoliMarketApp() {
  const [usuario, setUsuario] = useState(null);
  const [autorizado, setAutorizado] = useState(false);

  return (
    <Router>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Sistema PoliMarket</h1>

        {!usuario ? (
          <Login onLogin={setUsuario} />
        ) : (
          <>
            <Card>
              <CardContent className="space-y-2">
                <div>Usuario actual: <strong>{usuario}</strong></div>
                <RecursosHumanos usuario={usuario} onAutorizacion={(aut) => setAutorizado(aut)} />
                <Button onClick={() => { setUsuario(null); setAutorizado(false); }} variant="outline">
                  Cerrar sesión
                </Button>
                {autorizado && (
                  <nav className="flex gap-4 pt-4">
                    <Link to="/ventas" className="underline">Ventas</Link>
                    <Link to="/bodega" className="underline">Bodega</Link>
                    <Link to="/proveedores" className="underline">Proveedores</Link>
                    <Link to="/entregas" className="underline">Entregas</Link>
                  </nav>
                )}
              </CardContent>
            </Card>

            <Routes>
              <Route path="/" element={<Navigate to={autorizado ? '/ventas' : '/'} />} />
              <Route path="/ventas" element={autorizado ? <Ventas /> : <Navigate to="/" />} />
              <Route path="/bodega" element={autorizado ? <Bodega /> : <Navigate to="/" />} />
              <Route path="/proveedores" element={autorizado ? <Proveedores /> : <Navigate to="/" />} />
              <Route path="/entregas" element={autorizado ? <Entregas /> : <Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}
