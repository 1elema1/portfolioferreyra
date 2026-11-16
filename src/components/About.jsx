import { usePortfolio } from '../context/PortfolioContext';
import { Layers, Database, Code2, Cpu, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function About() {
  const { personal } = usePortfolio();

  const pillars = personal.pillars ?? [];

  const softSkills = personal.softSkills ?? [];

  return (
    <section id="about" className="relative py-24 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#07090e] transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            / sobre mí
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Desarrollo de Software End-to-End
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl font-normal">
            Acompaño cada proyecto en todas sus fases: desde la concepción de la idea y el modelado técnico hasta el código en producción.
          </p>
        </div>

        {/* Grid 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Detailed Bio & Soft Skills */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 p-6 shadow-2xs">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent"></span>
                Perfil Profesional
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
                Soy estudiante de la <span className="text-accent font-medium">Tecnicatura en Analista en Sistemas (IES21)</span> con sólida base en programación, arquitectura de software y bases de datos.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
                {personal.bio}
              </p>
            </div>

            {/* Soft Skills Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/50 p-6 shadow-2xs">
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 mb-4 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-accent" />
                Habilidades Interpersonales
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {softSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-slate-700 dark:text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Technical Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-light border border-accent">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/60 font-mono text-[11px] text-accent flex items-center justify-between">
                  <span>Pilar #{index + 1}</span>
                  <span>100% comprometido</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
