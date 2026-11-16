import { useState, useEffect } from 'react';
import { personalData } from '../data/portfolioData';
import { Menu, X, Terminal, ArrowRight, Lock } from 'lucide-react';

export default function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Sobre mí", href: "#about" },
    { name: "Habilidades", href: "#skills" },
    { name: "Proyectos", href: "#projects" },
    { name: "Trayectoria", href: "#experience" },
    { name: "Contacto", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 shadow-xl shadow-black/40' 
        : 'bg-transparent border-b border-transparent'
    }`}>
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo Terminal style */}
        <a 
          href="#" 
          className="group flex items-center gap-2 font-mono text-sm font-semibold tracking-tight text-white hover:text-blue-300 transition-colors"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-500/15 border border-blue-500/30 text-blue-400 group-hover:bg-blue-500/25 group-hover:border-blue-400 transition-colors">
            <Terminal className="h-4 w-4" />
          </span>
          <span>
            <span className="text-zinc-500">~/</span>{personalData.handle}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-lg px-3.5 py-1.5 text-zinc-400 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              {link.name}
            </a>
          ))}

          <div className="mx-2 h-4 w-px bg-zinc-800"></div>

          {/* Botón Discreto para Panel de Administración */}
          <button
            onClick={onOpenAdmin}
            className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900/60 px-2.5 py-1.5 text-xs text-zinc-400 hover:border-blue-500/40 hover:text-blue-300 hover:bg-zinc-800 transition-all cursor-pointer mr-1"
            title="Panel de Configuración de Proyectos (Acceso Privado)"
          >
            <Lock className="h-3 w-3 text-blue-400" />
            <span>Admin</span>
          </button>

          <a
            href="#contact"
            className="group flex items-center gap-1.5 rounded-lg border border-blue-500/40 bg-blue-500/10 px-3.5 py-1.5 text-xs font-semibold text-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-400 transition-all shadow-xs"
          >
            <span>Conectar</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenAdmin}
            className="p-2 text-zinc-400 hover:text-blue-300 hover:bg-zinc-900 rounded-lg transition-colors cursor-pointer"
            title="Panel de Administración"
          >
            <Lock className="h-4 w-4 text-blue-400" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors"
            aria-label="Abrir menú"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-zinc-800 bg-black/95 backdrop-blur-xl px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 transition-colors"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full flex items-center justify-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 py-2 text-xs font-medium text-zinc-300 hover:text-white"
            >
              <Lock className="h-3.5 w-3.5 text-blue-400" />
              <span>Panel de Administración</span>
            </button>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Contacto Directo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
