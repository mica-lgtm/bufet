import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { nombre, aclaracion, selecciones } = body;

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      return NextResponse.json(
        { error: "Faltan las variables de entorno de Notion." },
        { status: 500 }
      );
    }

    // Armar el texto del pedido
    const pedidoTexto = selecciones
      .map((s) => `${s.cantidad}× ${s.nombre} ($${s.precio.toLocaleString("es-AR")})`)
      .join("\n");

    const totalPrecio = selecciones.reduce(
      (acc, s) => acc + s.precio * s.cantidad,
      0
    );

    // Crear entrada en Notion
    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties: {
          // Nombre del pedido (título obligatorio en Notion)
          Nombre: {
            title: [{ text: { content: nombre } }],
          },
          // Platos elegidos
          Pedido: {
            rich_text: [{ text: { content: pedidoTexto } }],
          },
          // Aclaración
          Aclaración: {
            rich_text: [{ text: { content: aclaracion || "" } }],
          },
          // Total
          Total: {
            number: totalPrecio,
          },
          // Fecha del pedido
          Fecha: {
            date: { start: new Date().toISOString() },
          },
        },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error de Notion:", error);
      return NextResponse.json(
        { error: "Error al guardar en Notion." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Error inesperado." }, { status: 500 });
  }
}
