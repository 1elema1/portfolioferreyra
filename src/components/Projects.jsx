import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from './ProjectCard';
import { FolderGit2, ExternalLink } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const { projects, personal } = usePortfolio();
  
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const regularProjects = featuredProject ? projects.filter(p => p.id !== featuredProject.id) : [];

  if (!projects || projects.length === 0) {
    return null;
  }

  return (
    <section id="projects" className="relative py-24 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#07090e] transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 text-left">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              / proyectos destacados
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
              Soluciones & Software Desarrollado
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-zinc-400 max-w-2xl font-normal">
              Proyectos reales y académicos desarrollados con React, Node.js, Express, Java y bases de datos.
            </p>
          </div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-mono text-slate-700 dark:text-zinc-300 hover:border-accent hover:text-accent transition-all w-fit shrink-0 shadow-2xs"
          >
            <GithubIcon className="h-4 w-4 text-accent" />
            <span>github.com/{personal.githubUsername}</span>
          </a>
        </div>

        {/* Featured Project Showcase */}
        {featuredProject && (
          <div className="mb-14 rounded-3xl border border-accent bg-white dark:bg-[#0b0f17] p-6 sm:p-8 relative overflow-hidden shadow-lg transition-all">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-3 py-1 font-mono text-xs font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    Proyecto Insignia
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-zinc-400">
                    {featuredProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 dark:text-zinc-300 leading-relaxed font-normal">
                  {featuredProject.detailedDescription}
                </p>

                {/* Highlights */}
                {featuredProject.highlights && featuredProject.highlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                      Características de alto impacto:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-zinc-300">
                      {featuredProject.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0"></span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                {featuredProject.techStack && (
                  <div className="pt-2 flex flex-wrap gap-2">
                    {featuredProject.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="rounded-lg border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 font-mono text-xs text-slate-700 dark:text-zinc-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="pt-4 flex items-center gap-3">
                  <a
                    href={featuredProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-sm hover:opacity-95"
                  >
                    <span>Explorar Proyecto</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-300 transition-all hover:border-accent hover:text-accent shadow-2xs"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Ver Repositorio</span>
                  </a>
                </div>
              </div>

              {/* Right side: Project Image or Interactive Architecture Mock */}
              <div className="lg:col-span-5 flex justify-center">
                {featuredProject.image ? (
                  <div className="w-full rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-lg bg-slate-100 dark:bg-zinc-900">
                    <img 
                      src={featuredProject.image} 
                      alt={featuredProject.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-auto object-cover max-h-80"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-sm rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#07090e] p-6 font-mono text-xs shadow-md">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <FolderGit2 className="h-4 w-4 text-accent" />
                        <span>project-arch.git</span>
                      </div>
                      <span className="text-[11px] text-accent font-medium">main branch</span>
                    </div>

                    <div className="pt-4 space-y-2.5 text-slate-700 dark:text-zinc-300">
                      <p className="text-slate-400 dark:text-zinc-500">// Arquitectura del sistema:</p>
                      <p className="text-accent font-medium">├── frontend/ (React 19 + Tailwind v4)</p>
                      <p className="text-accent font-medium">├── backend/ (Node.js REST API)</p>
                      <p className="text-accent font-medium">├── database/ (SQL Schema)</p>
                      <p className="text-accent font-medium">└── vercel.json (Deploy config)</p>
                      
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 text-[11px] text-slate-500 dark:text-zinc-500 flex items-center justify-between">
                        <span>Status: {featuredProject.status}</span>
                        <span className="text-accent font-semibold">Full Stack</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

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
