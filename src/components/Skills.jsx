import { usePortfolio } from '../context/PortfolioContext';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const { skills } = usePortfolio();

  const categories = [
    {
      key: 'frontend',
      title: 'Frontend & UI',
      icon: <Layout className="h-4 w-4 text-accent" />,
      items: skills.frontend || [],
      description: 'Interfaces interactivas, responsivas y centradas en la experiencia del usuario.'
    },
    {
      key: 'backend',
      title: 'Backend & APIs',
      icon: <Server className="h-4 w-4 text-accent" />,
      items: skills.backend || [],
      description: 'Arquitectura de servidores, desarrollo de APIs RESTful y lógica de negocio.'
    },
    {
      key: 'databases',
      title: 'Bases de Datos',
      icon: <Database className="h-4 w-4 text-accent" />,
      items: skills.databases || [],
      description: 'Diseño relacional y NoSQL, integridad referencial y modelado eficiente.'
    },
    {
      key: 'toolsAndMethods',
      title: 'Herramientas & Entorno',
      icon: <Wrench className="h-4 w-4 text-accent" />,
      items: skills.toolsAndMethods || [],
      description: 'Control de versiones en Git/GitHub, modelado UML y deploy continuo.'
    }
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#05070c] transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
            / stack tecnológico
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Habilidades & Tecnologías
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400 font-normal">
            Conjunto de herramientas y metodologías aplicadas en proyectos reales y desarrollo continuo.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.key}
              className="glass-card rounded-2xl p-6 flex flex-col justify-between transition-all"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-accent-light border border-accent">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-600 dark:text-zinc-400 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Badges list */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, index) => (
                    <span
                      key={index}
                      className="group inline-flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 text-xs font-mono text-slate-700 dark:text-zinc-300 transition-all duration-150 hover:border-accent hover:bg-accent-light hover:text-accent cursor-default"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent opacity-75 group-hover:opacity-100"></span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer indicator */}
              <div className="mt-6 pt-3 border-t border-slate-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-zinc-500">
                <span>{category.items.length} tecnologías</span>
                <span className="text-accent font-medium">Activo</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
