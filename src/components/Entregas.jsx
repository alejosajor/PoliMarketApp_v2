// src/components/Entregas.jsx
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import { useStockEvents } from "../patterns/hooks/useStockEvents.js";

export default function Entregas() {
  const [pendientes, setPendientes] = useState([]);
  const [log, setLog] = useState([]);

  useEffect(() => {
    fetch("/data/entregas.json")
      .then((res) => res.json())
      .then((info) => setPendientes(info.pendientes));
  }, []);

  const onEvt = useCallback((evt) => {
    if (evt?.type === "SalidaRegistrada") {
      setLog((l) => [
        { t: new Date(evt.ts).toLocaleTimeString(), msg: `Salida: ${evt.pedidoId} -> ${evt.sku} x${evt.cantidad}` },
        ...l,
      ]);
    }
  }, []);
  useStockEvents(onEvt);

  return (
    <Card>
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold">Entregas</h2>
        <ul className="list-disc pl-6">
          {pendientes.map((e, i) => (
            <li key={i}>
              Entregar {e.producto} a {e.cliente}
            </li>
          ))}
        </ul>

        {log.length > 0 && (
          <div>
            <strong>Eventos recientes:</strong>
            <ul className="list-disc pl-6 text-sm">
              {log.map((r, i) => (
                <li key={i}>[{r.t}] {r.msg}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
