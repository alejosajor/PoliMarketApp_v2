import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";

export default function Bodega() {
  const [stock, setStock] = useState({});

  useEffect(() => {
    fetch("/data/bodega.json")
      .then((res) => res.json())
      .then((data) => setStock(data.stock));
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-lg font-semibold">Bodega</h2>
        <ul>
          {Object.entries(stock).map(([producto, cantidad]) => (
            <li key={producto}>
              {producto}: {cantidad} unidades
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
