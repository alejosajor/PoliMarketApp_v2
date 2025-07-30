# 🧾 PoliMarketApp

Aplicación web que simula la operación de una empresa con múltiples áreas de negocio (bodega, ventas, recursos humanos, proveedores y entregas) usando React y datos simulados en JSON.

---

## 🚀 Instrucciones para ejecutar el proyecto

### ✅ Requisitos previos

- Node.js (recomendado v18+)
- npm (v9+)
- Navegador web moderno (Chrome, Firefox, Edge)

---

### 🔧 Instalación

1. Clona o descomprime este proyecto.
2. Abre una terminal en la raíz del proyecto.
3. Ejecuta:

```bash
npm install
npm run dev
```

4. Abre en el navegador la dirección que aparece (por ejemplo: `http://localhost:5173`)

---

### 🧩 Funcionalidades principales

- ✅ Autenticación de vendedores autorizados por Recursos Humanos.
- ✅ Visualización de clientes y productos por el área de Ventas.
- ✅ Consulta de stock disponible desde Bodega.
- ✅ Consulta de proveedores para productos agotados.
- ✅ Gestión de entregas pendientes y registro de salida de productos.

---

### 🖥️ Estructura del proyecto

- `/src/components/`: componentes por área de negocio.
- `/public/data/`: backend simulado (archivos JSON).
- `/src/components/ui/`: componentes reutilizables (`card`, `button`).

---

### 🌐 Clientes externos

#### Cliente Web (`cliente_web.html`)
- Abre directamente en el navegador.
- Consulta productos y entregas usando `fetch`.

#### Cliente Node (`cliente_node.js`)
- Ejecutar desde consola:

```bash
node cliente_node.js
```

- Lee y muestra información desde archivos JSON (`ventas.json` y `entregas.json`).

---

### 📄 Conclusiones

Revisa el archivo `conclusiones.txt` incluido para ver el análisis final del proyecto.

---

### ⚙️ Tecnologías usadas

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- Node.js (cliente adicional)

---

### 📝 Autor

Desarrollado como solución académica para el modelo distribuido de información en la empresa PoliMarket.
