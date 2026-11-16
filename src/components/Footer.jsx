import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Terminal, Lock } from 'lucide-react';

export default function Footer({ onOpenAdmin }) {
  const { personal } = usePortfolio();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-black dark:bg-black light:bg-white py-12 text-zinc-400 dark:text-zinc-400 light:text-zinc-600 font-mono text-xs transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-accent" />
          <span className="text-white dark:text-white light:text-zinc-900 font-semibold">{personal.name}</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400 dark:text-zinc-400 light:text-zinc-600 font-light font-sans">{personal.title}</span>
        </div>

        {/* Tech message */}
        <p className="text-zinc-400 dark:text-zinc-400 light:text-zinc-500 text-center flex items-center gap-1 font-sans font-light">
          React 19 + Tailwind CSS · Deploy en Vercel
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1 text-[11px] text-zinc-500 hover:text-accent transition-colors cursor-pointer"
            title="Acceso al panel de administración"
          >
            <Lock className="h-3 w-3 text-accent" />
            <span>Admin</span>
          </button>

          <span className="text-zinc-800 light:text-zinc-300">|</span>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-300 bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-100 px-3 py-1.5 text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:border-accent hover:text-accent transition-all cursor-pointer"
          >
            <span>Inicio</span>
            <ArrowUp className="h-3 w-3 text-accent transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-zinc-900/60 dark:border-zinc-900/60 light:border-zinc-100 text-center text-[11px] text-zinc-500 light:text-zinc-400">
        © {new Date().getFullYear()} {personal.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
