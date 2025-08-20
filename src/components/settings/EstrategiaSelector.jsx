// src/components/settings/EstrategiaSelector.jsx
import React from "react";
import { usePatterns } from "../../patterns/PatternsProvider.jsx";

export function EstrategiaSelector() {
    const { strategyName, setStrategy } = usePatterns();
    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">Estrategia:</span>
            <select
                className="border px-2 py-1 rounded"
                value={strategyName}
                onChange={(e) => setStrategy(e.target.value)}
            >
                <option value="greedy">GreedyReservation</option>
                <option value="balanced">BalancedReservation</option>
            </select>
        </div>
    );
}
