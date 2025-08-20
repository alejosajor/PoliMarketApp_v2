/**
 * Observer | Event Bus para stock.
 * StockSubject = Subject; los servicios se suscriben como Observers.
 */
export class StockSubject {
  constructor(){ this._observers = new Set(); }
  attach(obs){ this._observers.add(obs); }
  detach(obs){ this._observers.delete(obs); }
  notify(evt){ for (const o of this._observers) o.update?.(evt); }
}

export class EntregasObserver {
  update(evt){
    // evt: { type: 'SalidaRegistrada', sku, cantidad, pedidoId }
    if(evt?.type === 'SalidaRegistrada'){
      console.log(`[Entregas] Registrar despacho para pedido ${evt.pedidoId}`);
    }
  }
}
