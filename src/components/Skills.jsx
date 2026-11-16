import { skillsData } from '../data/portfolioData';
import { Layout, Server, Database, Wrench } from 'lucide-react';

export default function Skills() {
  const categories = [
    {
      key: 'frontend',
      title: 'Frontend & UI',
      icon: <Layout className="h-4 w-4 text-emerald-400" />,
      items: skillsData.frontend,
      description: 'Interfaces interactivas, responsivas y centradas en la experiencia del usuario.'
    },
    {
      key: 'backend',
      title: 'Backend & APIs',
      icon: <Server className="h-4 w-4 text-emerald-400" />,
      items: skillsData.backend,
      description: 'Arquitectura de servidores, desarrollo de APIs RESTful y lógica de negocio.'
    },
    {
      key: 'databases',
      title: 'Bases de Datos',
      icon: <Database className="h-4 w-4 text-emerald-400" />,
      items: skillsData.databases,
      description: 'Diseño relacional y NoSQL, integridad referencial y modelado eficiente.'
    },
    {
      key: 'toolsAndMethods',
      title: 'Herramientas & Entorno',
      icon: <Wrench className="h-4 w-4 text-emerald-400" />,
      items: skillsData.toolsAndMethods,
      description: 'Control de versiones en Git/GitHub, modelado UML y deploy continuo.'
    }
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="font-mono text-xs uppercase tracking-widest text-emerald-400 mb-2">
            / stack tecnológico
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Habilidades & Tecnologías
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-light">
            Conjunto de herramientas y metodologías aplicadas en proyectos reales y desarrollo continuo.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.key}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-sm flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70"
            >
              <div>
                {/* Header card */}
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="p-2 rounded-lg bg-zinc-800 border border-zinc-700/60">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-white text-base">
                    {category.title}
                  </h3>
                </div>

                <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Badges list */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill, index) => (
                    <span
                      key={index}
                      className="group inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs font-mono text-zinc-300 transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/10 hover:text-emerald-300 hover:scale-105 cursor-default"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/60 group-hover:bg-emerald-400"></span>
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Card footer indicator */}
              <div className="mt-6 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>{category.items.length} tecnologías</span>
                <span className="text-emerald-400 font-medium">Activo</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
