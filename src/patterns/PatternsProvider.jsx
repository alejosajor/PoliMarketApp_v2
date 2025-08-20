// src/patterns/PatternsProvider.jsx
import React from "react";
import { createContext, useContext, useMemo, useState } from "react";

import { ventasService } from "../services/ventasService.js";
import { bodegaService } from "../services/bodegaService.js";

import { StockFacade } from "./Facade_VentasBodega.js";
import { GreedyReservation, BalancedReservation } from "./Strategy_StockReservation.js";
import { StockSubject, EntregasObserver } from "./Observer_StockEventBus.js";

const PatternsContext = createContext(null);

export function PatternsProvider({ children, strategyName: initial = "greedy" }) {
  const [strategyName, setStrategyName] = useState(initial);

  const value = useMemo(() => {
    const subject = new StockSubject();
    subject.attach(new EntregasObserver());

    const strategy =
      strategyName === "balanced" ? new BalancedReservation() : new GreedyReservation();

    const facade = new StockFacade({
      ventasService,
      bodegaService,
      strategy,
      subject,
    });

    return { facade, subject, strategyName, setStrategy: setStrategyName };
  }, [strategyName]);

  return <PatternsContext.Provider value={value}>{children}</PatternsContext.Provider>;
}

export function usePatterns() {
  const ctx = useContext(PatternsContext);
  if (!ctx) throw new Error("usePatterns debe usarse dentro de <PatternsProvider>");
  return ctx;
}
