import { usePortfolio } from '../context/PortfolioContext';
import InteractiveTerminal from './InteractiveTerminal';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';

export default function Hero() {
  const { personal } = usePortfolio();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-tech">
      {/* Ambient Spotlight - Lightweight & GPU-Safe (prevents mobile black screen glitch) */}
      <div 
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-30 ambient-glow"
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/90 px-3.5 py-1 text-xs text-slate-600 dark:text-zinc-400 w-fit mb-5 shadow-2xs backdrop-blur-xs">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin className="h-3 w-3 text-accent" />
                {personal.location}
              </span>
              <span className="text-slate-300 dark:text-zinc-700">|</span>
              <span className="text-accent font-medium">{personal.status || 'Disponible Full-Time'}</span>
            </div>

            {/* Name with Glitch/Highlight Hover Effect */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
              <span className="glitch-hover inline-block cursor-default">
                {personal.name}
              </span>
            </h1>

            {/* Professional Title */}
            <p className="font-mono text-base sm:text-xl font-semibold text-accent mb-4">
              {personal.title}
            </p>

            {/* Bio description */}
            <p className="text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300 max-w-xl mb-8 font-normal">
              {personal.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg active:scale-95 shadow-sm"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-5 py-3 text-sm font-medium text-slate-800 dark:text-white transition-all duration-200 hover:border-accent active:scale-95 shadow-2xs"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>Contactar</span>
              </a>

              <a
                href={`/${personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}`}
                download={personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/40 px-4 py-3 text-sm font-medium text-slate-600 dark:text-zinc-400 transition-all duration-200 hover:border-slate-300 dark:hover:border-zinc-700 hover:text-slate-900 dark:hover:text-white"
                title="Descargar Curriculum Vitae en PDF"
              >
                <Download className="h-4 w-4 text-slate-500 dark:text-zinc-500" />
                <span>Descargar CV</span>
              </a>
            </div>

            {/* Quick Metrics from CV */}
            {personal.stats && personal.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-zinc-800 max-w-lg">
                {personal.stats.map((stat, i) => (
                  <div key={i} className="rounded-xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/60 p-2.5 text-center shadow-2xs">
                    <p className="text-xl font-bold font-mono text-accent">{stat.value}</p>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Terminal */}
          <div className="lg:col-span-5 flex justify-center items-center w-full">
            <InteractiveTerminal />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity pointer-events-none">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400 dark:text-zinc-500">Scroll</span>
        <div className="h-4 w-px bg-accent animate-bounce"></div>
      </div>
    </section>
  );
}
