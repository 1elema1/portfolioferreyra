import { usePortfolio } from '../context/PortfolioContext';
import { Layers, Database, Code2, Cpu, CheckCircle2, HeartHandshake } from 'lucide-react';

export default function About() {
  const { personal } = usePortfolio();

  const pillars = [
    {
      icon: <Layers className="h-5 w-5 text-accent" />,
      title: "Análisis & Requerimientos",
      description: "Relevamiento de necesidades del cliente, diseño de soluciones a medida, modelado de sistemas en diagramas UML (casos de uso, clases, secuencia)."
    },
    {
      icon: <Code2 className="h-5 w-5 text-accent" />,
      title: "Desarrollo Frontend",
      description: "Creación de interfaces gráficas interactivas con React, JavaScript moderno y Tailwind CSS, garantizando experiencia de usuario intuitiva y 100% responsiva."
    },
    {
      icon: <Cpu className="h-5 w-5 text-accent" />,
      title: "Backend & APIs REST",
      description: "Desarrollo de servicios robustos con Node.js, Express y Java. Endpoints seguros, validaciones estrictas y arquitectura modular limpia."
    },
    {
      icon: <Database className="h-5 w-5 text-accent" />,
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
    <section id="about" className="relative py-24 border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-black dark:bg-black light:bg-zinc-50/50 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14 text-left">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            / sobre mí
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-zinc-900">
            Desarrollo de Software End-to-End
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 dark:text-zinc-400 light:text-zinc-600 max-w-2xl font-light">
            Acompaño cada proyecto en todas sus fases: desde la concepción de la idea y el modelado técnico hasta el código en producción.
          </p>
        </div>

        {/* Grid 2 cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Detailed Bio & Soft Skills */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-white p-6 backdrop-blur-sm shadow-xs">
              <h3 className="text-lg font-semibold text-white dark:text-white light:text-zinc-900 mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-accent"></span>
                Perfil Profesional
              </h3>
              <p className="text-sm leading-relaxed text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
                Soy estudiante de la <span className="text-accent font-medium">Tecnicatura en Analista en Sistemas (IES21)</span> con sólida base en programación, arquitectura de software y bases de datos.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400 dark:text-zinc-400 light:text-zinc-600">
                {personal.bio}
              </p>
            </div>

            {/* Soft Skills Card */}
            <div className="rounded-2xl border border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-zinc-950/50 dark:bg-zinc-950/50 light:bg-white p-6 shadow-xs">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-400 light:text-zinc-500 mb-4 flex items-center gap-2">
                <HeartHandshake className="h-4 w-4 text-accent" />
                Habilidades Interpersonales
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
                {softSkills.map((skill, index) => (
                  <li key={index} className="flex items-center gap-2 text-xs text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
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
                  <h4 className="text-base font-semibold text-white dark:text-white light:text-zinc-900 mb-2">
                    {pillar.title}
                  </h4>
                  <p className="text-xs leading-relaxed text-zinc-400 dark:text-zinc-400 light:text-zinc-600 font-light">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 dark:border-zinc-800/60 light:border-zinc-200 font-mono text-[11px] text-accent flex items-center justify-between">
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
