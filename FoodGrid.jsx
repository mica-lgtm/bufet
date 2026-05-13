"use client";

import FoodCard from "./FoodCard";

export default function FoodGrid({ comidas, selecciones, onSeleccion }) {
  // Agrupar por categoría
  const categorias = [...new Set(comidas.map((c) => c.categoria || "General"))];

  return (
    <div className="space-y-10">
      {categorias.map((cat) => {
        const platos = comidas.filter((c) => (c.categoria || "General") === cat);
        return (
          <div key={cat}>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="font-display text-2xl text-stone-800 capitalize">{cat}</h2>
              <div className="flex-1 h-px bg-amber-100" />
              <span className="text-xs text-stone-400 font-medium">{platos.length} opciones</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {platos.map((comida) => (
                <FoodCard
                  key={comida.id}
                  comida={comida}
                  cantidad={selecciones[comida.id] || 0}
                  onSeleccion={onSeleccion}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
