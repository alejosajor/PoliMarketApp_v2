/**
 * Facade | simplifica coordinación entre Ventas y Bodega.
 */
export class StockFacade {
  constructor({ ventasService, bodegaService, strategy, subject }){
    this.ventas = ventasService;
    this.bodega = bodegaService;
    this.strategy = strategy;
    this.subject = subject;
  }
  consultarDisponibilidad(sku){
    return this.bodega.consultarStock(sku);
  }
  crearPedidoYReservar(clienteId, lineas){
    const pedido = this.ventas.crearPedido({ clienteId, lineas });
    const ok = this.strategy.reservar(pedido, this.bodega);
    if(!ok){ pedido.estado = 'RECHAZADO'; return pedido; }
    pedido.estado = 'RESERVADO';
    // notificar salida por cada línea
    for(const l of lineas){
      this.subject?.notify({ type: 'SalidaRegistrada', sku: l.sku, cantidad: l.cantidad, pedidoId: pedido.id || 'N/A' });
    }
    return pedido;
  }
}
