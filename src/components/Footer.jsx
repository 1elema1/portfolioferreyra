import { usePortfolio } from '../context/PortfolioContext';
import { ArrowUp, Terminal, Sun, Moon } from 'lucide-react';

export default function Footer() {
  const { personal, themeMode, toggleTheme } = usePortfolio();
  const isDark = themeMode === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#05070c] py-12 text-slate-600 dark:text-zinc-400 font-mono text-xs transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Brand */}
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4 text-accent" />
          <span className="text-slate-900 dark:text-white font-semibold">{personal.name}</span>
          <span className="text-slate-300 dark:text-zinc-700">·</span>
          <span className="text-slate-500 dark:text-zinc-400 font-normal font-sans">{personal.title}</span>
        </div>

        {/* Tech message */}
        <p className="text-slate-500 dark:text-zinc-400 text-center flex items-center gap-1 font-sans">
          {personal.footerText || "React 19 + Tailwind CSS · Deploy en Vercel"}
        </p>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Quick theme toggle in footer */}
          <button
            onClick={toggleTheme}
            className="inline-flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-400 hover:text-accent transition-colors cursor-pointer"
            title={isDark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
          >
            {isDark ? <Sun className="h-3 w-3 text-amber-400" /> : <Moon className="h-3 w-3 text-blue-600" />}
            <span>{isDark ? 'Tema Claro' : 'Tema Oscuro'}</span>
          </button>

          <span className="text-slate-200 dark:text-zinc-800">|</span>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900 px-3 py-1.5 text-slate-700 dark:text-zinc-300 hover:border-accent hover:text-accent transition-all cursor-pointer shadow-2xs"
          >
            <span>Inicio</span>
            <ArrowUp className="h-3 w-3 text-accent transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-100 dark:border-zinc-900/60 text-center text-[11px] text-slate-400 dark:text-zinc-500">
        © {new Date().getFullYear()} {personal.name}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
