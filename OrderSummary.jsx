"use client";

export default function OrderSummary({ selecciones, comidas }) {
  const items = Object.entries(selecciones).map(([id, cantidad]) => {
    const comida = comidas.find((c) => c.id === id);
    return { ...comida, cantidad };
  });

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-display text-lg text-amber-900 flex items-center gap-2">
          🧾 Tu selección
        </h3>

        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between text-sm">
              <span className="text-stone-700">
                <span className="font-semibold text-amber-700 mr-1.5">{item.cantidad}×</span>
                {item.nombre}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-amber-200">
          <p className="text-xs text-amber-700 text-center font-medium">
            ✅ Revisá tu pedido antes de enviar
          </p>
        </div>
      </div>
    </div>
  );
}
