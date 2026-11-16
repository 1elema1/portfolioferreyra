import { experienceData, educationData } from '../data/portfolioData';
import { Briefcase, GraduationCap, Calendar, Building2 } from 'lucide-react';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">
            / trayectoria
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Experiencia & Formación Académica
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light">
            Recorrido profesional, emprendimientos y formación técnica en análisis y desarrollo de sistemas.
          </p>
        </div>

        {/* 2 Columns: Experiencia & Educación */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Column 1: Experiencia */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Experiencia & Proyectos
              </h3>
            </div>

            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                      <Calendar className="h-3 w-3 text-emerald-400" />
                      {exp.period}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-medium">
                      {exp.badge}
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-white mt-1">
                    {exp.role}
                  </h4>
                  
                  <p className="text-xs font-mono text-zinc-400 mb-3 flex items-center gap-1.5">
                    <Building2 className="h-3.5 w-3.5 text-zinc-500" />
                    {exp.company}
                  </p>

                  <p className="text-xs leading-relaxed text-zinc-300 font-light">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Educación */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Educación Formal
              </h3>
            </div>

            <div className="space-y-4">
              {educationData.map((edu, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm transition-all hover:border-zinc-700 hover:bg-zinc-900/60"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300">
                      <Calendar className="h-3 w-3 text-emerald-400" />
                      {edu.period}
                    </span>
                    <span className="font-mono text-xs text-emerald-400 font-medium">
                      Oficial
                    </span>
                  </div>

                  <h4 className="text-lg font-semibold text-white mt-1">
                    {edu.title}
                  </h4>
                  
                  <p className="text-xs font-mono text-emerald-400/90 mb-3 font-semibold">
                    {edu.institution}
                  </p>

                  <p className="text-xs leading-relaxed text-zinc-300 font-light">
                    {edu.details}
                  </p>
                </div>
              ))}

              {/* Languages Card from CV */}
              <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/30 p-5 font-mono text-xs text-zinc-400 space-y-2">
                <p className="font-semibold text-zinc-300">Idiomas:</p>
                <div className="flex gap-4">
                  <span className="text-zinc-300">Español: <span className="text-emerald-400">Nativo</span></span>
                  <span className="text-zinc-300">Inglés: <span className="text-emerald-400">A2</span></span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
