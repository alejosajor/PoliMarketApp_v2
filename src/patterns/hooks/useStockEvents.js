// src/patterns/hooks/useStockEvents.js
import { useEffect } from "react";
import { usePatterns } from "../PatternsProvider.jsx";

// Hook para suscribirse fácilmente a eventos de stock desde React
export function useStockEvents(onEvent) {
    const { subject } = usePatterns();
    useEffect(() => {
        const obs = { update: onEvent };
        subject.attach(obs);
        return () => subject.detach(obs);
    }, [subject, onEvent]);
}
