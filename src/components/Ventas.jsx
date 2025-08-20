// src/components/Ventas.jsx
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { usePatterns } from "../patterns/PatternsProvider.jsx";

export default function Ventas() {
  const [data, setData] = useState({ clientes: [], productos: [] });
  const { facade } = usePatterns();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/data/ventas.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  const reservar = (sku) => {
    const pedido = facade.crearPedidoYReservar("CLI-001", [{ sku, cantidad: 1 }], "online");
    setMsg(
      pedido.estado === "RESERVADO"
        ? `✅ Pedido ${pedido.id} reservado (${sku})`
        : `❌ No hay stock para ${sku}`
    );
  };

  return (
    <Card>
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold">Ventas</h2>
        <p><strong>Clientes asignados:</strong> {data.clientes.join(", ")}</p>

        <div className="space-y-2">
          <strong>Productos:</strong>
          <ul className="space-y-1">
            {data.productos.map((sku) => (
              <li key={sku} className="flex items-center gap-3">
                <span>{sku}</span>
                <span className="text-xs opacity-70">Disp.: {facade.consultarDisponibilidad(sku)}</span>
                <button
                  className="border px-2 py-1 rounded"
                  onClick={() => reservar(sku)}
                >
                  Reservar 1
                </button>
              </li>
            ))}
          </ul>
        </div>

        {msg && <p>{msg}</p>}
      </CardContent>
    </Card>
  );
}
