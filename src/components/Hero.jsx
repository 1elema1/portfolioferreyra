import { usePortfolio } from '../context/PortfolioContext';
import InteractiveTerminal from './InteractiveTerminal';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';

export default function Hero() {
  const { personal } = usePortfolio();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-grid-tech">
      {/* Ambient Spotlight */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div 
          className="h-[500px] w-[500px] rounded-full blur-[140px] opacity-25 -translate-y-12"
          style={{ background: 'var(--color-accent)' }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-white px-3.5 py-1 text-xs text-zinc-400 dark:text-zinc-400 light:text-zinc-600 w-fit mb-5 shadow-xs backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin className="h-3 w-3 text-accent" />
                {personal.location}
              </span>
              <span className="text-zinc-600 dark:text-zinc-600 light:text-zinc-300">|</span>
              <span className="text-accent font-medium">{personal.status || 'Disponible Full-Time'}</span>
            </div>

            {/* Name with Glitch Hover Effect */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white dark:text-white light:text-zinc-900 mb-3">
              <span className="glitch-hover inline-block cursor-default">
                {personal.name}
              </span>
            </h1>

            {/* Professional Title */}
            <p className="font-mono text-base sm:text-xl font-semibold text-accent mb-4">
              {personal.title}
            </p>

            {/* Bio description */}
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-600 max-w-xl mb-8 font-light">
              {personal.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-accent bg-accent-hover px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                style={{ boxShadow: '0 4px 20px -2px var(--color-accent-glow)' }}
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 bg-zinc-900/90 dark:bg-zinc-900/90 light:bg-white px-5 py-3 text-sm font-medium text-white dark:text-white light:text-zinc-800 transition-all duration-300 hover:border-accent hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4 text-accent" />
                <span>Contactar</span>
              </a>

              <a
                href={`/${personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}`}
                download={personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-300 bg-black/60 dark:bg-black/60 light:bg-zinc-100 px-4 py-3 text-sm font-medium text-zinc-400 dark:text-zinc-400 light:text-zinc-600 transition-all duration-300 hover:border-zinc-700 light:hover:border-zinc-400 hover:text-white light:hover:text-black"
                title="Descargar Curriculum Vitae en PDF"
              >
                <Download className="h-4 w-4 text-zinc-500" />
                <span>Descargar CV</span>
              </a>
            </div>

            {/* Quick Metrics from CV */}
            {personal.stats && personal.stats.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 max-w-lg">
                {personal.stats.map((stat, i) => (
                  <div key={i} className="rounded-xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-950/70 dark:bg-zinc-950/70 light:bg-white p-2.5 text-center shadow-xs">
                    <p className="text-xl font-bold font-mono text-accent">{stat.value}</p>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-400 light:text-zinc-500 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Terminal */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <InteractiveTerminal />
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">Scroll</span>
        <div className="h-4 w-px bg-accent animate-bounce"></div>
      </div>
    </section>
  );
}
