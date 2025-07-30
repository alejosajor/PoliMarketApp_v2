import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export default function Proveedores() {
  const [data, setData] = useState({ disponibles: {} });

  useEffect(() => {
    fetch("/data/proveedores.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Proveedores</h2>
        <ul>
          {Object.entries(data.disponibles).map(([producto, proveedor]) => (
            <li key={producto}>
              {producto}: {proveedor}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
