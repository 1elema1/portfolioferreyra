import { personalData } from '../data/portfolioData';
import { Layers, Database, Code2, Cpu, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: <Layers className="h-5 w-5 text-emerald-400" />,
      title: "Análisis & Requerimientos",
      description: "Relevamiento de necesidades del cliente, diseño de soluciones a medida, modelado de sistemas en diagramas UML (casos de uso, clases, secuencia)."
    },
    {
      icon: <Code2 className="h-5 w-5 text-emerald-400" />,
      title: "Desarrollo Frontend",
      description: "Creación de interfaces gráficas interactivas con React, JavaScript moderno y Tailwind CSS, garantizando experiencia de usuario intuitiva y 100% responsiva."
    },
    {
      icon: <Cpu className="h-5 w-5 text-emerald-400" />,
      title: "Backend & APIs REST",
      description: "Desarrollo de servicios robustos con Node.js, Express y Java. Endpoints seguros, validaciones estrictas y arquitectura modular limpia."
    },
    {
      icon: <Database className="h-5 w-5 text-emerald-400" />,
      title: "Bases de Datos & Deploy",
      description: "Modelado e implementación de bases de datos relacionales (SQL / PostgreSQL / MySQL) y NoSQL (MongoDB, Firebase). Despliegue ágil en Vercel."
    }
  ];

  const softSkills = [
    "Trabajo en equipo y colaboración ágil",
    "Comunicación clara y asertiva",
    "Capacidad de aprendizaje continuo",
    "Resolución analítica de problemas",
    "Adaptabilidad y proactividad constante",
    "Gestión organizada del tiempo"
  ];

  return (
    <section id="about" className="relative py-24 border-t border-zinc-900 bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">
            / sobre mí
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Desarrollo de Software End-to-End
          </h2>
          <p className="mt-3 text-base text-zinc-400 max-w-2xl font-light">
            Acompaño cada proyecto en todas sus fases: desde la concepción de la idea y el modelado técnico hasta el código en producción.
          </p>
        </div>

        {/* Grid 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Detailed Bio & Soft Skills */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                Perfil Profesional
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300">
                Soy estudiante avanzado de la <span className="text-emerald-400 font-medium">Tecnicatura en Analista en Sistemas (IES21)</span> con sólida base en programación, arquitectura de software y gestión de bases de datos.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Me apasiona transformar requerimientos de negocio en código limpio, mantenible y funcional. Valoro el trabajo en equipo, la comunicación transparente y la constante superación técnica.
              </p>
            </div>

            {/* Soft Skills Card */}
            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-4 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-emerald-400" />
                Habilidades Interpersonales
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {softSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
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
                className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 glass-panel-hover flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700/80">
                    {pillar.icon}
                  </div>
                  <h4 className="text-base font-semibold text-white mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 font-mono text-[11px] text-emerald-400 flex items-center justify-between">
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
