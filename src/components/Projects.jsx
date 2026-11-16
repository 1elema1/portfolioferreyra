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
    <section id="projects" className="relative py-24 border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-black dark:bg-black light:bg-zinc-50/50 transition-colors">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4 text-left">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
              / proyectos destacados
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white dark:text-white light:text-zinc-900">
              Soluciones & Software Desarrollado
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 dark:text-zinc-400 light:text-zinc-600 max-w-2xl font-light">
              Proyectos reales y académicos desarrollados con React, Node.js, Express, Java y bases de datos.
            </p>
          </div>

          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-white px-4 py-2 text-xs font-mono text-zinc-300 dark:text-zinc-300 light:text-zinc-700 hover:border-accent hover:text-accent transition-all w-fit shrink-0 shadow-xs"
          >
            <GithubIcon className="h-4 w-4 text-accent" />
            <span>github.com/{personal.githubUsername}</span>
          </a>
        </div>

        {/* Featured Project Showcase */}
        {featuredProject && (
          <div className="mb-14 rounded-3xl border border-accent bg-gradient-to-br from-zinc-900/90 via-zinc-950 to-black dark:from-zinc-900/90 dark:via-zinc-950 dark:to-black light:from-white light:via-zinc-50 light:to-zinc-100 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl transition-all">
            <div 
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full blur-[120px] opacity-20"
              style={{ background: 'var(--color-accent)' }}
            ></div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-3 py-1 font-mono text-xs font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    Proyecto Insignia
                  </span>
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-400 light:text-zinc-500">
                    {featuredProject.category}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white dark:text-white light:text-zinc-900">
                  {featuredProject.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-300 dark:text-zinc-300 light:text-zinc-600 leading-relaxed font-light">
                  {featuredProject.detailedDescription}
                </p>

                {/* Highlights */}
                {featuredProject.highlights && featuredProject.highlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <p className="font-mono text-xs uppercase tracking-wider text-accent font-medium">
                      Características de alto impacto:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
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
                        className="rounded-lg border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-900/90 dark:bg-zinc-900/90 light:bg-white px-2.5 py-1 font-mono text-xs text-zinc-300 dark:text-zinc-300 light:text-zinc-700"
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
                    className="inline-flex items-center gap-2 rounded-xl bg-accent bg-accent-hover px-5 py-2.5 text-xs font-semibold text-white transition-all shadow-md"
                  >
                    <span>Explorar Proyecto</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 dark:border-zinc-700 light:border-zinc-300 bg-zinc-900 dark:bg-zinc-900 light:bg-white px-4 py-2.5 text-xs font-medium text-zinc-300 dark:text-zinc-300 light:text-zinc-700 transition-all hover:border-accent hover:text-accent"
                  >
                    <GithubIcon className="h-4 w-4" />
                    <span>Ver Repositorio</span>
                  </a>
                </div>
              </div>

              {/* Right side: Project Image or Interactive Architecture Mock */}
              <div className="lg:col-span-5 flex justify-center">
                {featuredProject.image ? (
                  <div className="w-full rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 overflow-hidden shadow-2xl bg-zinc-900">
                    <img 
                      src={featuredProject.image} 
                      alt={featuredProject.title} 
                      className="w-full h-auto object-cover max-h-80"
                    />
                  </div>
                ) : (
                  <div className="w-full max-w-sm rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-black/80 dark:bg-black/80 light:bg-white p-6 font-mono text-xs shadow-2xl backdrop-blur-sm">
                    <div className="flex items-center justify-between pb-3 border-b border-zinc-800 dark:border-zinc-800 light:border-zinc-200 text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <FolderGit2 className="h-4 w-4 text-accent" />
                        <span>project-arch.git</span>
                      </div>
                      <span className="text-[11px] text-accent font-medium">main branch</span>
                    </div>

                    <div className="pt-4 space-y-2.5 text-zinc-300 dark:text-zinc-300 light:text-zinc-700">
                      <p className="text-zinc-500">// Arquitectura del sistema:</p>
                      <p className="text-accent">├── frontend/ (React 19 + Tailwind v4)</p>
                      <p className="text-accent">├── backend/ (Node.js REST API)</p>
                      <p className="text-accent">├── database/ (SQL Schema)</p>
                      <p className="text-accent">└── vercel.json (Deploy config)</p>
                      
                      <div className="mt-4 pt-3 border-t border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 text-[11px] text-zinc-500 flex items-center justify-between">
                        <span>Status: {featuredProject.status}</span>
                        <span className="text-accent">Full Stack</span>
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
