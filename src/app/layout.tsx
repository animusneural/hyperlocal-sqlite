import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hyperlocal MVP",
  description: "Căutare gastronomie locală",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro">
      <body className="min-h-screen flex flex-col font-sans">
        {/* HEADER */}
        <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
          <h1 className="text-lg font-bold">
            <Link href="/">🍞 Hyperlocal</Link>
          </h1>
          <nav className="space-x-4">
            <Link href="/search">Căutare</Link>
            <Link href="/about">Despre</Link>
          </nav>
        </header>

        {/* MAIN */}
        <main className="flex-1 p-6">{children}</main>

        {/* FOOTER */}
        <footer className="bg-gray-100 text-gray-700 text-center p-4 text-sm">
          © {new Date().getFullYear()} Hyperlocal · Un prototip de Matei 🚀
        </footer>
      </body>
    </html>
  );
}