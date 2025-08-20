/**
 * Factory Method | para crear pedidos por canal.
 */
class PedidoBase {
  constructor({clienteId, lineas}){
    this.clienteId = clienteId;
    this.lineas = lineas;
    this.estado = 'CREADO';
  }
}

export class PedidoOnline extends PedidoBase {
  constructor(data){ super(data); this.canal = 'online'; }
}
export class PedidoMostrador extends PedidoBase {
  constructor(data){ super(data); this.canal = 'mostrador'; }
}

export class PedidoFactory {
  crearPedido(tipo, datos){
    switch((tipo||'').toLowerCase()){
      case 'online': return new PedidoOnline(datos);
      case 'mostrador': return new PedidoMostrador(datos);
      default: throw new Error('Tipo de pedido no soportado');
    }
  }
}
