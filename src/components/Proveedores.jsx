// src/components/Proveedores.jsx
import React from "react";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { ProveedorAdapter } from "../patterns/Adapter_ProveedorAdapter.js";

export default function Proveedores() {
  const [data, setData] = useState({ disponibles: {} });
  const [normalizados, setNormalizados] = useState([]);
  const [resp, setResp] = useState(null);

  useEffect(() => {
    fetch("/data/proveedores.json")
      .then((res) => res.json())
      .then((info) => setData(info));
  }, []);

  // API simulada de Proveedor X (formato heterogéneo)
  const proveedorXApi = {
    fetchItems: async () => [
      { code: "P-001", name: "Laptop", unitPrice: 2500, qty: 100 },
      { code: "P-002", name: "Mouse", unitPrice: 25, qty: 500 },
    ],
    submitPurchase: async (payload) => ({ ok: true, payload }),
  };

  const abastecer = async () => {
    const adapter = new ProveedorAdapter(proveedorXApi);
    const items = await adapter.listarProductos();
    setNormalizados(items);
    const r = await adapter.registrarCompra([{ sku: "P-001", cantidad: 10, costo: 2200 }]);
    setResp(r);
  };

  return (
    <Card>
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold">Proveedores</h2>
        <ul className="list-disc pl-6">
          {Object.entries(data.disponibles).map(([producto, proveedor]) => (
            <li key={producto}>
              {producto}: {proveedor}
            </li>
          ))}
        </ul>

        <div className="space-y-2">
          <button className="border px-2 py-1 rounded" onClick={abastecer}>
            Abastecer desde ProveedorX (Adapter)
          </button>

          {normalizados.length > 0 && (
            <pre className="text-xs bg-gray-50 p-2 rounded">
              {JSON.stringify(normalizados, null, 2)}
            </pre>
          )}
          {resp && (
            <pre className="text-xs bg-gray-50 p-2 rounded">
              {JSON.stringify(resp, null, 2)}
            </pre>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
