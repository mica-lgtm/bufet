import "./globals.css";

export const metadata = {
  title: "Bufet ERJ — Congreso de la Familia",
  description: "Elegí tu comida para el Congreso de la Familia, domingo 17 de mayo, 10:00 a 16:00 hs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
