import { personalData } from '../data/portfolioData';
import { ArrowUp, Terminal } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-900 bg-black py-12 text-zinc-400 font-mono text-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-blue-400" />
          <span className="text-white font-semibold">{personalData.name}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 font-light font-sans">{personalData.title}</span>
        </div>

        {/* Tech message */}
        <p className="text-zinc-400 text-center flex items-center gap-1 font-sans font-light">
          Desarrollado con React 19 + Tailwind v4 · Deploy en Vercel
        </p>

        {/* Back to top */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-zinc-300 hover:border-blue-500/40 hover:text-white transition-all cursor-pointer"
        >
          <span>Inicio</span>
          <ArrowUp className="h-3 w-3 text-blue-400 transition-transform group-hover:-translate-y-0.5" />
        </button>

      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-zinc-900/60 text-center text-[11px] text-zinc-500">
        © {new Date().getFullYear()} {personalData.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
