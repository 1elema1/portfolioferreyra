import { personalData } from '../data/portfolioData';
import InteractiveTerminal from './InteractiveTerminal';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-20 pb-16 overflow-hidden bg-grid-pattern">
      {/* Spotlight & Radial gradients */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-[130px] -translate-y-12"></div>
        <div className="h-[400px] w-[400px] rounded-full bg-teal-500/10 blur-[140px] translate-x-48 translate-y-24"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Intro & Info */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Location & Status Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-3.5 py-1 text-xs text-zinc-400 w-fit mb-6 shadow-xs backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="flex items-center gap-1 font-mono">
                <MapPin className="h-3 w-3 text-zinc-500" />
                {personalData.location}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-emerald-400 font-medium">Disponible Full-Time</span>
            </div>

            {/* Name with Glitch Hover Effect */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-3">
              <span className="glitch-hover inline-block cursor-default">
                {personalData.name}
              </span>
            </h1>

            {/* Professional Title */}
            <p className="font-mono text-lg sm:text-xl font-semibold text-emerald-400 mb-5">
              {personalData.title}
            </p>

            {/* Bio description */}
            <p className="text-base sm:text-lg leading-relaxed text-zinc-300 max-w-xl mb-8 font-light">
              {personalData.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-zinc-950 transition-all duration-300 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Ver Proyectos</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/80 px-5 py-3 text-sm font-medium text-zinc-200 transition-all duration-300 hover:border-emerald-500/50 hover:bg-zinc-800 hover:text-white hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                <span>Contactar</span>
              </a>

              <a
                href={`/${personalData.cvFileName}`}
                download={personalData.cvFileName}
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-sm font-medium text-zinc-400 transition-all duration-300 hover:border-zinc-700 hover:text-zinc-200 hover:bg-zinc-900"
                title="Descargar Curriculum Vitae en PDF"
              >
                <Download className="h-4 w-4 text-zinc-500" />
                <span>Descargar CV</span>
              </a>
            </div>

            {/* Quick Metrics from CV */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/80 max-w-lg">
              {personalData.stats.map((stat, i) => (
                <div key={i} className="rounded-lg border border-zinc-800/60 bg-zinc-900/40 p-2.5 text-center">
                  <p className="text-xl font-bold font-mono text-emerald-400">{stat.value}</p>
                  <p className="text-[11px] text-zinc-400 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
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
        <div className="h-4 w-px bg-gradient-to-b from-emerald-500 to-transparent animate-bounce"></div>
      </div>
    </section>
  );
}
