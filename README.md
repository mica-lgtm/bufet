# 🍽️ Familias Bendecidas — ¿Qué vas a comer el domingo?

Aplicación web para que los comensales elijan su comida del domingo, con guardado automático en Notion.

---

## 🚀 Correr el proyecto localmente

### 1. Requisitos previos
- Node.js 18 o superior
- npm o yarn

### 2. Clonar e instalar

```bash
git clone https://github.com/TU_USUARIO/familias-bendecidas.git
cd familias-bendecidas
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.local.example .env.local
```

Editar `.env.local` con tus credenciales de Notion (ver sección abajo).

### 4. Correr en desarrollo

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

---

## 📋 Configurar Notion

### Paso 1 — Crear la integración

1. Ir a [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
2. Clic en **"New integration"**
3. Darle un nombre: `Familias Bendecidas`
4. Seleccionar el workspace
5. Guardar y copiar el **Internal Integration Token** → `NOTION_TOKEN`

### Paso 2 — Crear la base de datos en Notion

Crear una nueva página en Notion de tipo **Database (tabla)** con estas columnas:

| Nombre de columna | Tipo |
|---|---|
| `Nombre` | **Title** (obligatoria, ya existe) |
| `Pedido` | Text |
| `Aclaración` | Text |
| `Total` | Number (formato: Peso argentino o Number) |
| `Fecha` | Date |

### Paso 3 — Conectar la integración a la base de datos

1. Abrir la base de datos en Notion
2. Clic en los tres puntos `...` arriba a la derecha
3. Ir a **"Connections"** → **"Connect to"** → buscar tu integración
4. Confirmar

### Paso 4 — Obtener el Database ID

La URL de tu base de datos se ve así:
```
https://www.notion.so/mi-workspace/AbCd1234EfGh5678IjKl9012?v=...
```
El ID es la parte entre la última `/` y el `?`: `AbCd1234EfGh5678IjKl9012`

Copiarlo en `.env.local` como `NOTION_DATABASE_ID`.

---

## ✏️ Editar las comidas

Abrir el archivo:
```
src/data/comidas.json
```

Cada plato tiene esta estructura:
```json
{
  "id": "nombre-unico-sin-espacios",
  "nombre": "Nombre visible",
  "descripcion": "Descripción breve del plato",
  "precio": 4500,
  "imagen": "/images/foto.jpg",
  "disponible": true,
  "categoria": "Platos principales"
}
```

**Para agregar una comida:** copiar un bloque existente, cambiar los datos y guardar.

**Para quitar una comida:** eliminar el bloque o cambiar `"disponible": false`.

**Para cambiar categorías:** cambiar el campo `"categoria"`. Las categorías se agrupan automáticamente.

---

## 🖼️ Agregar fotos

1. Guardar la foto en la carpeta `public/images/`
2. Referenciarla en `comidas.json` como `"/images/nombre-foto.jpg"`

Si no tenés foto, podés dejar una URL de internet:
```json
"imagen": "https://ejemplo.com/foto.jpg"
```

---

## 📦 Subir a GitHub

```bash
# Inicializar git (solo la primera vez)
git init
git add .
git commit -m "primera versión"

# Crear repositorio en github.com y luego:
git remote add origin https://github.com/TU_USUARIO/familias-bendecidas.git
git branch -M main
git push -u origin main
```

---

## ▲ Deploy en Vercel

### Opción A — desde Vercel.com (recomendada)

1. Ir a [vercel.com](https://vercel.com) y loguearse con GitHub
2. Clic en **"Add New Project"**
3. Seleccionar el repositorio `familias-bendecidas`
4. En **Environment Variables**, agregar:
   - `NOTION_TOKEN` = tu token
   - `NOTION_DATABASE_ID` = tu database ID
5. Clic en **Deploy**

¡Listo! En 2 minutos tenés la app online.

### Opción B — desde la CLI

```bash
npm i -g vercel
vercel
```

Seguir las instrucciones. Recordá agregar las variables de entorno con:
```bash
vercel env add NOTION_TOKEN
vercel env add NOTION_DATABASE_ID
```

---

## 📁 Estructura del proyecto

```
familias-bendecidas/
├── public/
│   └── images/          ← fotos de los platos acá
├── src/
│   ├── app/
│   │   ├── page.jsx          ← página principal
│   │   ├── layout.jsx        ← layout global
│   │   ├── globals.css       ← estilos globales
│   │   └── api/submit/
│   │       └── route.js      ← guarda en Notion
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── FoodCard.jsx
│   │   ├── FoodGrid.jsx
│   │   ├── OrderForm.jsx
│   │   ├── OrderSummary.jsx
│   │   └── ConfirmationScreen.jsx
│   └── data/
│       └── comidas.json      ← editá las comidas acá
├── .env.local.example   ← plantilla de variables
├── .gitignore
├── package.json
└── README.md
```

---

## 🔒 Seguridad

**Nunca subas `.env.local` a GitHub.** Ya está incluido en el `.gitignore`.

Las credenciales de Notion van solo en:
- `.env.local` (local)
- Variables de entorno en Vercel (producción)

---

Hecho con ❤️ para Familias Bendecidas 🙏
