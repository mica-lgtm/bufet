export default function Header() {
  const domingo = proximoDomingo();

  return (
    <header className="relative overflow-hidden pt-14 pb-12 px-4 mb-6 text-center">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-4 left-8 text-6xl opacity-10 rotate-[-15deg]">🍽️</div>
        <div className="absolute top-8 right-10 text-5xl opacity-10 rotate-[12deg]">🥘</div>
        <div className="absolute bottom-2 left-1/3 text-4xl opacity-10 rotate-[8deg]">✨</div>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
        <span>🌟</span>
        <span>Bufet ERJ — Congreso de la Familia</span>
      </div>

      {/* Título principal */}
      <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-stone-900 leading-tight mb-4">
        ¿Qué vas a comer
        <br />
        <em className="not-italic text-amber-500">el domingo?</em>
      </h1>

      {/* Subtítulo */}
      <p className="text-stone-500 text-base sm:text-lg max-w-md mx-auto font-body">
        Elegí tus platos, indicá la cantidad y enviá tu pedido antes del evento.
      </p>

      {/* Fecha y horario */}
      <div className="mt-3 flex flex-wrap justify-center gap-4 text-sm text-stone-400 font-medium">
        <span>📅 Domingo 17 de mayo</span>
        <span>🕙 10:00 a 16:00 hs</span>
      </div>

      <p className="mt-2 text-xs text-amber-600 font-medium">
        Todos los menús principales incluyen 1 vasito de bebida
      </p>

      {/* Línea decorativa */}
      <div className="mt-8 flex items-center justify-center gap-3">
        <div className="h-px w-16 bg-amber-200" />
        <div className="w-2 h-2 rounded-full bg-amber-300" />
        <div className="h-px w-16 bg-amber-200" />
      </div>
    </header>
  );
}

function proximoDomingo() {
  const hoy = new Date();
  const diasHastaDomingo = (7 - hoy.getDay()) % 7 || 7;
  const domingo = new Date(hoy);
  domingo.setDate(hoy.getDate() + diasHastaDomingo);
  return domingo.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
