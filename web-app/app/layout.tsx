import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DSA Visualizer",
  description: "Plataforma Inteligente para dominar Estructuras de Datos y Algoritmos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex h-screen bg-slate-50 text-slate-900 overflow-hidden`}>
        
        {/* SIDEBAR LATERAL */}
        <aside className="w-64 bg-slate-900 text-white flex flex-col hidden md:flex">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-blue-400">DSA Visualizer</h1>
            <p className="text-xs text-slate-400 mt-1">AI-Powered Learning</p>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            <Link href="/" className="block px-4 py-3 rounded-md hover:bg-slate-800 transition-colors">
              📍 Roadmap
            </Link>
            <Link href="/dashboard" className="block px-4 py-3 rounded-md hover:bg-slate-800 transition-colors">
              👤 Mi Perfil
            </Link>
            <Link href="/workspace" className="block px-4 py-3 rounded-md hover:bg-slate-800 transition-colors">
              💻 Workspace (IDE)
            </Link>
          </nav>

          <div className="p-6 border-t border-slate-800">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
              Ask AI Tutor 🧠
            </button>
          </div>
        </aside>

        {/* ÁREA DE CONTENIDO PRINCIPAL */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-slate-50 text-slate-900">
          {/* Header superior (opcional para móviles o breadcrumbs) */}
          <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-700">Bienvenido de nuevo, Developer</h2>
          </header>
          
          {/* Aquí se inyectarán las demás páginas (page.tsx) */}
          <div className="p-8">
            {children}
          </div>
        </main>

      </body>
    </html>
  );
}