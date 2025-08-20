# PoliMarketApp — Addendum U3/U4 (GoF + Integración completa)

> **Contexto**: Este README complementa la entrega previa (U2). Documenta los cambios de **U3/U4**, todos los **adicionales usados** (patrones GoF, provider, hooks, servicios, componentes actualizados), instrucciones de integración/ejecución, comparación U2→U3/U4, modelo de madurez, conclusiones y referencias APA.

---

## 1) Alcance del Addendum (U3/U4)

- **Patrones GoF aplicados (5)**: **Facade**, **Strategy**, **Observer**, **Adapter**, **Factory Method**.
- **UML 2.5** (clases y componentes) con estereotipos de patrones.
- **Integración real** en la app React: provider de patrones, hook de eventos, selector de estrategia, servicios en memoria.
- **Documentación**: tabla por patrón (problema → por qué → cómo → código), guía de integración detallada, troubleshooting.
- **Modelo de madurez** (CMMI) y **conclusiones**.
- **Lenguaje único**: JavaScript (ESM) + React.

---

## 2) Árbol de archivos (adiciones y cambios)

**Nuevos**:
src/patterns/PatternsProvider.jsx
src/patterns/Facade_VentasBodega.js
src/patterns/Strategy_StockReservation.js
src/patterns/Observer_StockEventBus.js
src/patterns/Adapter_ProveedorAdapter.js
src/patterns/hooks/useStockEvents.js
src/components/settings/EstrategiaSelector.jsx
src/services/ventasService.js
src/services/bodegaService.js


**Modificados**:
src/App.jsx
src/components/Ventas.jsx
src/components/Bodega.jsx
src/components/Proveedores.jsx
src/components/Entregas.jsx


> *Recurso no modificado*: `src/components/RecursosHumanos.jsx` (control de autorización).

---

## 3) Patrones GoF seleccionados y ubicación

| Patrón | Problema | Por qué ayuda | Cómo implementarlo | Código |
|---|---|---|---|---|
| **Facade** | Crear y reservar pedidos requiere coordinar múltiples servicios. | Simplifica el flujo y baja el acoplamiento. | `StockFacade.crearPedidoYReservar(clienteId, lineas, tipo)` orquesta Ventas↔Bodega y notifica eventos. | `src/patterns/Facade_VentasBodega.js` |
| **Strategy** | Políticas de reserva de stock cambiantes. | Permite intercambiar el algoritmo sin tocar el resto. | `GreedyReservation` / `BalancedReservation` inyectadas en `StockFacade`. | `src/patterns/Strategy_StockReservation.js` |
| **Observer** | Entregas y otras áreas deben reaccionar a salidas/entradas de stock. | Difusión por eventos con bajo acoplamiento. | `StockSubject` (Subject), `EntregasObserver` (Observer), hook `useStockEvents`. | `src/patterns/Observer_StockEventBus.js`, `src/patterns/hooks/useStockEvents.js` |
| **Adapter** | Proveedores con APIs heterogéneas. | Normaliza al modelo interno sin alterar el dominio. | `ProveedorAdapter` mapea `fetchItems/submitPurchase` → `{sku, nombre, costo, cantidad}`. | `src/patterns/Adapter_ProveedorAdapter.js` |
| **Factory Method** | Diferentes tipos de pedido (canal). | Centraliza la creación y facilita extensiones. | `PedidoFactory` devuelve `PedidoOnline`/`PedidoMostrador`. | `src/services/ventasService.js` |


---

## 4) Guía de integración (paso a paso)

### 4.1 Envolver la App con el Provider
```jsx
// src/App.jsx
import { PatternsProvider } from "./patterns/PatternsProvider.jsx";
...
<Router>
  <PatternsProvider strategyName="greedy">
    <AppContent />
  </PatternsProvider>
</Router>


### 4.2 Elegir estrategia desde la UI (opcional)
// src/components/settings/EstrategiaSelector.jsx
import { usePatterns } from "../../patterns/PatternsProvider.jsx";
// <EstrategiaSelector /> dentro de App cuando el usuario esté autorizado

