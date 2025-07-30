import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export default function Ventas() {
  const [data, setData] = useState({ clientes: [], productos: [] });

  useEffect(() => {
    fetch("/data/ventas.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  return (
    <Card>
      <CardContent className="space-y-2">
        <h2 className="text-lg font-semibold">Ventas</h2>
        <p>Clientes asignados: {data.clientes.join(", ")}</p>
        <p>Productos disponibles: {data.productos.join(", ")}</p>
      </CardContent>
    </Card>
  );
}
