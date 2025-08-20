// src/services/ventasService.js
// Servicio de Ventas — usa Factory Method opcionalmente
class PedidoBase {
    constructor({ clienteId, lineas, tipo = "online" }) {
        this.id = `PED-${Math.floor(Math.random() * 100000)}`;
        this.clienteId = clienteId;
        this.lineas = lineas;
        this.tipo = tipo;
        this.estado = "CREADO";
    }
}
class PedidoOnline extends PedidoBase { constructor(d) { super({ ...d, tipo: "online" }); } }
class PedidoMostrador extends PedidoBase { constructor(d) { super({ ...d, tipo: "mostrador" }); } }

class PedidoFactory {
    crearPedido(tipo, datos) {
        switch ((tipo || "").toLowerCase()) {
            case "online": return new PedidoOnline(datos);
            case "mostrador": return new PedidoMostrador(datos);
            default: return new PedidoBase({ ...datos, tipo: "online" });
        }
    }
}
const factory = new PedidoFactory();

export const ventasService = {
    crearPedido: ({ clienteId, lineas, tipo = "online" }) => {
        return factory.crearPedido(tipo, { clienteId, lineas });
    },
    consultarCatalogo: () => [],
};
