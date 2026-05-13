"use client";

export default function OrderForm({ nombre, setNombre, aclaracion, setAclaracion, errores }) {
  return (
    <div className="max-w-lg mx-auto bg-white/60 backdrop-blur-sm border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm">
      <div className="text-center mb-2">
        <h2 className="font-display text-2xl text-stone-900">Tu pedido</h2>
        <p className="text-stone-400 text-sm mt-1">Completá tus datos para confirmar</p>
      </div>

      {/* Nombre */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">
          Tu nombre <span className="text-amber-500">*</span>
        </label>
        <input
          type="text"
          placeholder="Ej: María García"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={`input-field ${errores.nombre ? "error" : ""}`}
        />
        {errores.nombre && (
          <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
            <span>⚠</span> {errores.nombre}
          </p>
        )}
      </div>

      {/* Aclaración */}
      <div>
        <label className="block text-sm font-semibold text-stone-700 mb-2">
          Aclaraciones <span className="text-stone-400 font-normal">(opcional)</span>
        </label>
        <textarea
          placeholder="Ej: sin cebolla, alergia al maní, porción para niño..."
          value={aclaracion}
          onChange={(e) => setAclaracion(e.target.value)}
          rows={3}
          className="input-field resize-none"
        />
      </div>
    </div>
  );
}
