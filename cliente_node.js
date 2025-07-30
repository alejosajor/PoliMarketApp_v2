// Cliente Node.js - Consulta JSON desde servidor local
const fs = require('fs');

// Leer ventas.json
const ventas = JSON.parse(fs.readFileSync('./public/data/ventas.json', 'utf8'));
console.log('Clientes disponibles:', ventas.clientes);

// Leer entregas.json
const entregas = JSON.parse(fs.readFileSync('./public/data/entregas.json', 'utf8'));
console.log('Entregas pendientes:');
entregas.pendientes.forEach(e => {
  console.log(`- Entregar ${e.producto} a ${e.cliente}`);
});
