import { projectsData, personalData } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import { FolderGit2, Sparkles, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const featuredProject = projectsData.find(p => p.featured) || projectsData[0];
  const regularProjects = projectsData.filter(p => p.id !== featuredProject.id);

  return (
    <section id="projects" className="relative py-24 border-t border-zinc-900 bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-blue-400 mb-2">
              / proyectos destacados
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Soluciones & Software Desarrollado
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl font-light">
              Proyectos reales y académicos desarrollados con React, Node.js, Express, Java y bases de datos.
            </p>
          </div>

          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2 text-xs font-mono text-zinc-300 hover:border-blue-500/40 hover:text-white transition-all w-fit shrink-0"
          >
            <GithubIcon className="h-4 w-4 text-blue-400" />
            <span>github.com/{personalData.githubUsername}</span>
          </a>
        </div>

        {/* Featured Project Showcase */}
        <div className="mb-14 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-zinc-900/90 via-slate-950 to-black p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl shadow-blue-950/20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-blue-600/15 blur-[120px]"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 font-mono text-xs font-semibold text-blue-300">
                  <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                  Proyecto Insignia
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {featuredProject.category}
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                {featuredProject.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
                {featuredProject.detailedDescription}
              </p>

              {/* Highlights */}
              <div className="space-y-2 pt-2">
                <p className="font-mono text-xs uppercase tracking-wider text-blue-400 font-medium">
                  Características de alto impacto:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {featuredProject.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shrink-0"></span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="pt-2 flex flex-wrap gap-2">
                {featuredProject.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-lg border border-zinc-800 bg-zinc-900/90 px-2.5 py-1 font-mono text-xs text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="pt-4 flex items-center gap-3">
                <a
                  href={featuredProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <span>Explorar Proyecto</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4" />
                  <span>Ver Repositorio</span>
                </a>
              </div>
            </div>

            {/* Right side: Project Image or Interactive Architecture Mock */}
            <div className="lg:col-span-5 flex justify-center">
              {featuredProject.image ? (
                <div className="w-full rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl bg-zinc-900">
                  <img 
                    src={featuredProject.image} 
                    alt={featuredProject.title} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              ) : (
                <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-black/80 p-6 font-mono text-xs shadow-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800 text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <FolderGit2 className="h-4 w-4 text-blue-400" />
                      <span>solem-app.git</span>
                    </div>
                    <span className="text-[11px] text-blue-400 font-medium">main branch</span>
                  </div>

                  <div className="pt-4 space-y-2.5 text-zinc-300">
                    <p className="text-zinc-500">// Estructura modular del proyecto:</p>
                    <p className="text-blue-300">├── frontend/ (React + Tailwind)</p>
                    <p className="text-blue-300">├── backend/ (Node.js REST API)</p>
                    <p className="text-blue-300">├── database/ (SQL Schema)</p>
                    <p className="text-blue-300">└── vercel.json (Deploy config)</p>
                    
                    <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-400 flex items-center justify-between">
                      <span>Status: Activo</span>
                      <span className="text-blue-400">Stack 100% JS/Node</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
