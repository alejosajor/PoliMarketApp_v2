/**
 * Strategy | Stock Reservation
 * Context: StockFacade delegates reservation to a strategy.
 */
export class ReservaStrategy {
  reservar(pedido, bodegaSvc) { throw new Error("Not implemented"); }
}

export class GreedyReservation extends ReservaStrategy {
  /**
   * Reserva priorizando líneas con mayor cantidad primero.
   */
  reservar(pedido, bodegaSvc) {
    const lines = [...pedido.lineas].sort((a,b) => b.cantidad - a.cantidad);
    for (const l of lines) {
      const disponible = bodegaSvc.consultarStock(l.sku);
      if (disponible < l.cantidad) return false;
    }
    for (const l of lines) bodegaSvc.registrarSalida({ sku: l.sku, cantidad: l.cantidad });
    return true;
  }
}

export class BalancedReservation extends ReservaStrategy {
  /**
   * Reserva en orden original para balancear salidas.
   */
  reservar(pedido, bodegaSvc) {
    for (const l of pedido.lineas) {
      const disp = bodegaSvc.consultarStock(l.sku);
      if (disp < l.cantidad) return false;
    }
    for (const l of pedido.lineas) bodegaSvc.registrarSalida({ sku: l.sku, cantidad: l.cantidad });
    return true;
  }
}
