// src/components/Bodega.jsx
import React from "react";
import { useEffect, useMemo, useState, useCallback } from "react";
import { Card, CardContent } from "../components/ui/card";
import { usePatterns } from "../patterns/PatternsProvider.jsx";
import { useStockEvents } from "../patterns/hooks/useStockEvents.js";
import { bodegaService } from "../services/bodegaService.js";

export default function Bodega() {
  const { facade, subject } = usePatterns();
  const [seeded, setSeeded] = useState(false);
  const [baseSkus, setBaseSkus] = useState([]);
  const [version, setVersion] = useState(0);
  const [msg, setMsg] = useState("");

  // Sembrar el stock desde JSON una sola vez
  useEffect(() => {
    let mounted = true;
    fetch("/data/bodega.json")
      .then((res) => res.json())
      .then((data) => {
        if (!mounted) return;
        const obj = data?.stock || {};
        bodegaService.setStockBulk(obj);
        setBaseSkus(Object.keys(obj));
        setSeeded(true);
        setVersion((v) => v + 1);
      })
      .catch(() => setSeeded(true));
    return () => { mounted = false; };
  }, []);

  // Reactivo a eventos de stock
  const onEvt = useCallback((evt) => {
    if (evt?.type === "SalidaRegistrada" || evt?.type === "EntradaRegistrada") {
      setVersion((v) => v + 1);
    }
  }, []);
  useStockEvents(onEvt);

  // Conjunto de SKUs a mostrar
  const allSkus = useMemo(() => {
    const now = Object.keys(bodegaService.listAll());
    return Array.from(new Set([...baseSkus, ...now])).sort();
  }, [baseSkus, version]);

  // Acciones
  const entrada = (sku, cantidad = 5) => {
    bodegaService.registrarEntrada({ sku, cantidad });
    subject?.notify({ type: "EntradaRegistrada", sku, cantidad, ts: Date.now() });
    setMsg(`Entrada +${cantidad} en ${sku}`);
    setVersion((v) => v + 1);
  };
  const salida = (sku, cantidad = 1) => {
    bodegaService.registrarSalida({ sku, cantidad });
    subject?.notify({ type: "SalidaRegistrada", sku, cantidad, pedidoId: "MANUAL", ts: Date.now() });
    setMsg(`Salida -${cantidad} en ${sku}`);
    setVersion((v) => v + 1);
  };

  return (
    <Card>
      <CardContent className="space-y-3">
        <h2 className="text-lg font-semibold">Bodega</h2>
        {!seeded && <p>Cargando stock inicial…</p>}
        {msg && <p className="text-sm opacity-80">{msg}</p>}

        <ul className="space-y-2">
          {allSkus.map((sku) => {
            const disp = facade.consultarDisponibilidad(sku);
            return (
              <li key={sku} className="flex items-center gap-3">
                <span className="min-w-28 font-medium">{sku}</span>
                <span className="text-sm opacity-75">Disp.: {disp} unidades</span>
                <button className="border px-2 py-1 rounded" onClick={() => salida(sku, 1)}>-1 Salida</button>
                <button className="border px-2 py-1 rounded" onClick={() => entrada(sku, 5)}>+5 Entrada</button>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
