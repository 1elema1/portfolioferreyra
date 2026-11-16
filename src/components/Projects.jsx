import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import ProjectCard from './ProjectCard';
import ImageModal from './ImageModal';
import { FolderGit2, ExternalLink, Calendar, Maximize2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Projects() {
  const { projects, personal } = usePortfolio();
  const [featuredLightboxOpen, setFeaturedLightboxOpen] = useState(false);
  
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const regularProjects = featuredProject ? projects.filter(p => p.id !== featuredProject.id) : [];

  if (!projects || projects.length === 0) {
    return null;
  }

  const getStatusBadge = (statusType, status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('producción') || statusType === 'production') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          {status || 'En Producción'}
        </span>
      );
    }
    if (s.includes('proceso') || s.includes('desarrollo') || s.includes('beta') || statusType === 'beta') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-xs font-medium text-amber-600 dark:text-amber-400">
          <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
          {status || 'En Proceso'}
        </span>
      );
    }
    if (s.includes('actualidad')) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-3 py-1 font-mono text-xs font-medium text-accent">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          {status || 'Actualidad'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-3 py-1 font-mono text-xs font-medium text-slate-700 dark:text-zinc-300">
        <span className="h-2 w-2 rounded-full bg-slate-400 dark:bg-zinc-400"></span>
        {status || 'Completado'}
      </span>
    );
  };

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
          <div className="mb-14 rounded-3xl border border-accent/40 bg-white dark:bg-[#0b0f17] p-6 sm:p-8 relative overflow-hidden shadow-xl transition-all">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
              
              <div className="lg:col-span-6 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-3 py-1 font-mono text-xs font-semibold text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    Proyecto Insignia
                  </span>

                  {/* Estado dinámico */}
                  {getStatusBadge(featuredProject.statusType, featuredProject.status)}

                  {/* Periodo de tiempo */}
                  {featuredProject.period && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-3 py-1 font-mono text-xs text-slate-600 dark:text-zinc-400">
                      <Calendar className="h-3.5 w-3.5 text-accent" />
                      <span>{featuredProject.period}</span>
                    </span>
                  )}
                </div>

                <div className="pt-1">
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-400">
                    {featuredProject.category}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-0.5">
                    {featuredProject.title}
                  </h3>
                </div>

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

              {/* Right side: Project Image Grande & Dinámica or Mockup */}
              <div className="lg:col-span-6 flex justify-center w-full">
                {featuredProject.image ? (
                  <div 
                    onClick={() => setFeaturedLightboxOpen(true)}
                    className="group relative w-full h-72 sm:h-84 md:h-96 rounded-2xl border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xl bg-slate-100 dark:bg-zinc-900 cursor-pointer"
                    title="Clic para ampliar captura a pantalla completa"
                  >
                    <img 
                      src={featuredProject.image} 
                      alt={featuredProject.title} 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* Hover Dynamic Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white font-mono text-xs font-semibold shadow-xl backdrop-blur-xs scale-90 group-hover:scale-100 transition-transform duration-300">
                        <Maximize2 className="h-4 w-4 text-accent" />
                        <span>Ver captura completa en alta resolución</span>
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full max-w-md rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#07090e] p-6 font-mono text-xs shadow-md">
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
                        <span>Período: {featuredProject.period || 'Actualidad'}</span>
                        <span className="text-accent font-semibold">{featuredProject.status}</span>
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

      {/* Lightbox Modal para el proyecto insignia */}
      {featuredProject && (
        <ImageModal
          isOpen={featuredLightboxOpen}
          imageUrl={featuredProject.image}
          title={featuredProject.title}
          demoUrl={featuredProject.demoUrl}
          onClose={() => setFeaturedLightboxOpen(false)}
        />
      )}
    </section>
  );
}
