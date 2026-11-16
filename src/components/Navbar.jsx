import { useState, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Menu, X, Terminal, ArrowRight, Sun, Moon } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { themeMode, toggleTheme, personal } = usePortfolio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre mí", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
    { name: "Trayectoria", href: "#experience" },
    { name: "Contacto", href: "#contact" },
  ];

  const isDark = themeMode === 'dark';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled 
        ? 'bg-white/90 dark:bg-[#07090e]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-zinc-800/80 shadow-xs' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand / Logo Terminal style */}
        <a 
          href="#" 
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-slate-900 dark:text-white hover:text-accent transition-colors"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent-light border border-accent text-accent transition-transform group-hover:scale-105">
            <Terminal className="h-4 w-4 text-accent" />
          </span>
          <span>
            <span className="text-slate-400 dark:text-zinc-500">~/</span>{personal.handle || 'emanuel'}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1.5 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-lg px-3 py-1.5 text-slate-600 hover:text-slate-950 hover:bg-slate-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800/60 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="mx-1.5 h-4 w-px bg-slate-200 dark:bg-zinc-800"></div>

          {/* Botón Público Modo Claro / Oscuro */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100/80 dark:bg-zinc-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-300 hover:border-accent hover:text-accent transition-all cursor-pointer shadow-2xs mr-1"
            title={isDark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
            aria-label="Alternar tema"
          >
            {isDark ? (
              <>
                <Sun className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-mono text-[11px]">Claro</span>
              </>
            ) : (
              <>
                <Moon className="h-3.5 w-3.5 text-blue-600" />
                <span className="font-mono text-[11px]">Oscuro</span>
              </>
            )}
          </button>

          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-all shadow-xs"
          >
            <span>Conectar</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* Mobile Header Actions */}
        <div className="flex md:hidden items-center gap-2">
          {/* Botón de Tema Móvil en la barra superior (1 toque) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 text-slate-700 dark:text-zinc-200 active:scale-95 transition-all cursor-pointer"
            aria-label={isDark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
            title={isDark ? "Cambiar a Tema Claro" : "Cambiar a Tema Oscuro"}
          >
            {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-zinc-300 hover:text-slate-900 dark:hover:text-white rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-zinc-800 bg-white/95 dark:bg-[#07090e]/95 backdrop-blur-xl px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-900 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2 flex flex-col gap-2 border-t border-slate-200 dark:border-zinc-800 mt-2">
            <button
              onClick={() => {
                toggleTheme();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-3 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-300"
            >
              <span className="flex items-center gap-2">
                {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-blue-600" />}
                <span>Modo de visualización</span>
              </span>
              <span className="font-semibold text-accent font-mono">
                {isDark ? 'Oscuro activo' : 'Claro activo'}
              </span>
            </button>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center rounded-lg bg-accent py-2.5 text-sm font-semibold text-white hover:opacity-95 transition-opacity"
            >
              Contacto Directo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
