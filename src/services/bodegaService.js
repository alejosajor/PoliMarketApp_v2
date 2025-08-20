// src/services/bodegaService.js
// Servicio de Bodega — mock simple en memoria
const stock = new Map();
// Valor por defecto si no existe el SKU
const DEFAULT_STOCK = 50;

export const bodegaService = {
    consultarStock: (sku) => {
        return stock.has(sku) ? stock.get(sku) : DEFAULT_STOCK;
    },
    registrarSalida: ({ sku, cantidad }) => {
        const actual = stock.has(sku) ? stock.get(sku) : DEFAULT_STOCK;
        stock.set(sku, Math.max(0, actual - cantidad));
        return true;
    },
    registrarEntrada: ({ sku, cantidad }) => {
        const actual = stock.has(sku) ? stock.get(sku) : DEFAULT_STOCK;
        stock.set(sku, actual + cantidad);
        return true;
    },
    // Sembrar stock inicial desde JSON
    setStockBulk: (obj = {}) => {
        Object.entries(obj).forEach(([sku, cantidad]) => {
            stock.set(sku, Number(cantidad) || 0);
        });
    },
    // Listar todo el stock actual
    listAll: () => {
        const out = {};
        for (const [sku, cant] of stock.entries()) out[sku] = cant;
        return out;
    }
};
