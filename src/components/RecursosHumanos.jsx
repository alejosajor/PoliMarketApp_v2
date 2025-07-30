import React from "react";
import { useEffect, useState } from "react";

export default function RecursosHumanos({ usuario, onAutorizacion }) {
  const [autorizados, setAutorizados] = useState([]);

  useEffect(() => {
    fetch("/data/recursos_humanos.json")
      .then((res) => res.json())
      .then((data) => {
        setAutorizados(data.vendedoresAutorizados);
        onAutorizacion(data.vendedoresAutorizados.includes(usuario));
      });
  }, [usuario, onAutorizacion]);

  return (
    <div>
      <p>
        Estado: {autorizados.includes(usuario) ? "Autorizado ✅" : "No autorizado ❌"}
      </p>
    </div>
  );
}
