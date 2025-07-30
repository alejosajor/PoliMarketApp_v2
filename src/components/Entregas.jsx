import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export default function Entregas() {
  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    fetch("/data/entregas.json")
      .then((res) => res.json())
      .then((info) => setPendientes(info.pendientes));
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Entregas</h2>
        <ul>
          {pendientes.map((e, i) => (
            <li key={i}>
              Entregar {e.producto} a {e.cliente}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
