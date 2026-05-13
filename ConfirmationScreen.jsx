"use client";

export default function ConfirmationScreen({ nombre, selecciones, comidas }) {
  const items = Object.entries(selecciones).map(([id, cantidad]) => {
    const comida = comidas.find((c) => c.id === id);
    return { ...comida, cantidad };
  });

  return (
    <div className="min-h-screen bg-page flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        {/* Icono */}
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-4xl shadow-md animate-bounce-slow">
            🎉
          </div>
        </div>

        {/* Título */}
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-stone-900 mb-2">
            ¡Pedido enviado!
          </h1>
          <p className="text-stone-500 text-base">
            Gracias, <strong className="text-amber-600">{nombre}</strong>. Ya recibimos tu elección para el domingo.
          </p>
        </div>

        {/* Resumen */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 text-left space-y-2 shadow-sm">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-widest mb-3">Lo que pediste</p>
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 text-sm text-stone-700">
              <span className="text-amber-500 font-bold">{item.cantidad}×</span>
              <span>{item.nombre}</span>
            </div>
          ))}
        </div>

        {/* Mensaje final */}
        <p className="text-stone-400 text-sm">
          ¡Que Dios bendiga tu mesa este domingo! 🙏
        </p>

        {/* Botón para volver a empezar */}
        <button
          onClick={() => window.location.reload()}
          className="text-amber-600 font-semibold text-sm underline underline-offset-4 hover:text-amber-700 transition-colors"
        >
          Hacer otro pedido
        </button>
      </div>
    </div>
  );
}
