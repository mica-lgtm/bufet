"use client";

export default function FoodCard({ comida, cantidad, onSeleccion }) {
  const seleccionada = cantidad > 0;

  const incrementar = () => onSeleccion(comida.id, (cantidad || 0) + 1);
  const decrementar = () => onSeleccion(comida.id, Math.max(0, (cantidad || 0) - 1));

  return (
    <div className={`card-food flex flex-col ${seleccionada ? "selected" : ""}`}>
      {/* Imagen */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-amber-50">
        <img
          src={comida.imagen}
          alt={comida.nombre}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = `https://placehold.co/400x300/fef3c7/d97706?text=${encodeURIComponent(comida.nombre)}`;
          }}
        />

        {/* Categoria badge */}
        {comida.categoria && (
          <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-semibold px-3 py-1 rounded-full capitalize shadow-sm">
            {comida.categoria}
          </span>
        )}

        {/* Check de selección */}
        {seleccionada && (
          <div className="absolute top-3 right-3 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* No disponible overlay */}
        {!comida.disponible && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="bg-stone-700 text-white text-sm font-semibold px-4 py-1.5 rounded-full">
              No disponible
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg text-stone-900 leading-snug">{comida.nombre}</h3>
        </div>

        <p className="text-stone-500 text-sm leading-relaxed flex-1">{comida.descripcion}</p>

        {/* Selector de cantidad */}
        {comida.disponible && (
          <div className="mt-3 pt-3 border-t border-stone-100">
            {!seleccionada ? (
              <button
                onClick={incrementar}
                className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 font-semibold text-sm transition-colors duration-150 border border-amber-200"
              >
                + Agregar
              </button>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-500 font-medium">Cantidad</span>
                <div className="flex items-center gap-3">
                  <button className="qty-btn" onClick={decrementar}>−</button>
                  <span className="text-stone-900 font-bold text-base w-5 text-center">{cantidad}</span>
                  <button className="qty-btn" onClick={incrementar}>+</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
