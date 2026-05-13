"use client";

import { useState } from "react";
import Header from "@/components/Header";
import FoodGrid from "@/components/FoodGrid";
import OrderForm from "@/components/OrderForm";
import OrderSummary from "@/components/OrderSummary";
import ConfirmationScreen from "@/components/ConfirmationScreen";
import comidas from "@/data/comidas.json";

export default function Home() {
  const [selecciones, setSelecciones] = useState({});
  const [nombre, setNombre] = useState("");
  const [aclaracion, setAclaracion] = useState("");
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSeleccion = (id, cantidad) => {
    setSelecciones((prev) => {
      if (cantidad === 0) {
        const nuevo = { ...prev };
        delete nuevo[id];
        return nuevo;
      }
      return { ...prev, [id]: cantidad };
    });
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "Por favor ingresá tu nombre.";
    if (Object.keys(selecciones).length === 0)
      nuevosErrores.selecciones = "Seleccioná al menos una comida.";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async () => {
    if (!validar()) return;
    setEnviando(true);

    const pedido = {
      nombre,
      aclaracion,
      selecciones: Object.entries(selecciones).map(([id, cantidad]) => {
        const comida = comidas.find((c) => c.id === id);
        return { nombre: comida.nombre, cantidad, precio: comida.precio };
      }),
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pedido),
      });
      if (res.ok) {
        setEnviado(true);
      } else {
        setErrores({ submit: "Hubo un error al enviar. Intentá de nuevo." });
      }
    } catch {
      setErrores({ submit: "Hubo un error al enviar. Intentá de nuevo." });
    } finally {
      setEnviando(false);
    }
  };

  if (enviado) {
    return <ConfirmationScreen nombre={nombre} selecciones={selecciones} comidas={comidas} />;
  }

  return (
    <main className="min-h-screen bg-page">
      <Header />

      <div className="max-w-5xl mx-auto px-4 pb-20 space-y-12">
        {/* Grilla de comidas */}
        <section>
          <FoodGrid
            comidas={comidas}
            selecciones={selecciones}
            onSeleccion={handleSeleccion}
          />
          {errores.selecciones && (
            <p className="mt-4 text-center text-red-500 font-medium text-sm">
              ⚠ {errores.selecciones}
            </p>
          )}
        </section>

        {/* Formulario */}
        <OrderForm
          nombre={nombre}
          setNombre={setNombre}
          aclaracion={aclaracion}
          setAclaracion={setAclaracion}
          errores={errores}
        />

        {/* Resumen */}
        {Object.keys(selecciones).length > 0 && (
          <OrderSummary selecciones={selecciones} comidas={comidas} />
        )}

        {/* Error de submit */}
        {errores.submit && (
          <p className="text-center text-red-500 font-medium">{errores.submit}</p>
        )}

        {/* Botón enviar */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={enviando}
            className="btn-primary"
          >
            {enviando ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Enviando...
              </span>
            ) : (
              "Enviar pedido 🙌"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
