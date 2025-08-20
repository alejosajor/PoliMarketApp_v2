/**
 * Adapter | adapta formatos de proveedores diferentes al formato interno.
 */
export class ProveedorAdapter {
  constructor(apiProveedor){ this.apiProveedor = apiProveedor; }
  async listarProductos(){
    const raw = await this.apiProveedor.fetchItems(); // p.ej. [{code,name,unitPrice,qty}, ...]
    return raw.map(r => ({ sku: r.code, nombre: r.name, costo: r.unitPrice, cantidad: r.qty }));
  }
  async registrarCompra(lineas){
    const payload = lineas.map(l => ({ code: l.sku, qty: l.cantidad, unitPrice: l.costo }));
    return this.apiProveedor.submitPurchase(payload);
  }
}
