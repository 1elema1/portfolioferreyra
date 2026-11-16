import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';

export default function Experience() {
  const { experience, education } = usePortfolio();

  return (
    <section id="experience" className="relative py-24 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#05070c] transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            / trayectoria
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Experiencia & Formación Académica
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-normal">
            Recorrido profesional, emprendimientos y formación técnica en análisis y desarrollo de sistemas.
          </p>
        </div>

        {/* 2 Columns: Experiencia & Educación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 text-left">
          
          {/* Column 1: Experiencia */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-accent-light border border-accent text-accent">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Experiencia & Proyectos
              </h3>
            </div>

            <div className="space-y-4">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                      <Calendar className="h-3 w-3 text-accent" />
                      {exp.period}
                    </span>
                    <span className="font-mono text-xs text-accent font-medium">
                      {exp.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {exp.role}
                  </h4>
                  
                  <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-slate-400 dark:text-zinc-500" />
                    {exp.company}
                  </p>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Educación */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-accent-light border border-accent text-accent">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Educación Formal
              </h3>
            </div>

            <div className="space-y-4">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 transition-all"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-900 px-2.5 py-0.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300">
                      <Calendar className="h-3 w-3 text-accent" />
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs text-accent font-medium">
                      Oficial
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {edu.title}
                  </h4>
                  
                  <p className="text-xs font-mono text-accent mb-3 font-semibold">
                    {edu.institution}
                  </p>

                  <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Languages Card from CV */}
              <div className="rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/50 p-5 font-mono text-xs text-slate-600 dark:text-zinc-400 space-y-2 shadow-2xs">
                <p className="font-semibold text-slate-900 dark:text-zinc-300">Idiomas:</p>
                <div className="flex gap-4">
                  <span>Español: <span className="text-accent font-semibold">Nativo</span></span>
                  <span>Inglés: <span className="text-accent font-semibold">A2</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
