import { usePortfolio } from '../context/PortfolioContext';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';

export default function Experience() {
  const { experience, education } = usePortfolio();

  return (
    <section id="experience" className="relative py-24 border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-50 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            / trayectoria
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-zinc-900">
            Experiencia & Formación Académica
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 dark:text-zinc-400 light:text-zinc-600 font-light">
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
              <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-900">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
                      <Calendar className="h-3 w-3 text-accent" />
                      {exp.period}
                    </span>
                    <span className="font-mono text-xs text-accent font-medium">
                      {exp.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-white dark:text-white light:text-zinc-900 mt-1">
                    {exp.role}
                  </h4>
                  
                  <p className="text-xs font-mono text-zinc-400 dark:text-zinc-400 light:text-zinc-500 mb-3 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                    {exp.company}
                  </p>

                  <p className="text-xs leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-600 font-light">
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
              <h3 className="text-xl font-bold text-white dark:text-white light:text-zinc-900">
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
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 bg-zinc-900 dark:bg-zinc-900 light:bg-zinc-100 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
                      <Calendar className="h-3 w-3 text-accent" />
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs text-accent font-medium">
                      Oficial
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-white dark:text-white light:text-zinc-900 mt-1">
                    {edu.title}
                  </h4>
                  
                  <p className="text-xs font-mono text-accent mb-3 font-semibold">
                    {edu.institution}
                  </p>

                  <p className="text-xs leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-600 font-light">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Languages Card from CV */}
              <div className="rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-950/50 dark:bg-zinc-950/50 light:bg-white p-5 font-mono text-xs text-zinc-400 dark:text-zinc-400 light:text-zinc-600 space-y-2 shadow-xs">
                <p className="font-semibold text-zinc-300 dark:text-zinc-300 light:text-zinc-800">Idiomas:</p>
                <div className="flex gap-4">
                  <span>Español: <span className="text-accent">Nativo</span></span>
                  <span>Inglés: <span className="text-accent">A2</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
