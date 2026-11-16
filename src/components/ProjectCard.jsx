import { useState } from 'react';
import { ExternalLink, ChevronDown, CheckCircle2, Sparkles, FolderCode, Calendar, Maximize2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import ImageModal from './ImageModal';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const getStatusBadge = (statusType, status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('producción') || statusType === 'production') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          {status || 'En Producción'}
        </span>
      );
    }
    if (s.includes('proceso') || s.includes('desarrollo') || s.includes('beta') || statusType === 'beta') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-600 dark:text-amber-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          {status || 'En Proceso'}
        </span>
      );
    }
    if (s.includes('académico') || s.includes('universidad') || statusType === 'academic') {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-purple-600 dark:text-purple-400">
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500"></span>
          {status || 'Académico'}
        </span>
      );
    }
    if (s.includes('actualidad')) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
          {status || 'Actualidad'}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:text-zinc-300">
        <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-zinc-400"></span>
        {status || 'Completado'}
      </span>
    );
  };

  return (
    <>
      <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl">
        <div>
          {/* Project Image Banner - Amplio, Dinámico e Interactivo */}
          {project.image ? (
            <div 
              onClick={() => setIsLightboxOpen(true)}
              className="relative w-full h-56 sm:h-64 overflow-hidden border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 cursor-pointer"
              title="Clic para ampliar captura a pantalla completa"
            >
              <img 
                src={project.image} 
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105"
              />
              
              {/* Dynamic Overlay con botón de zoom interactivo al hacer hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-900/90 text-slate-900 dark:text-white font-mono text-xs font-semibold shadow-lg backdrop-blur-xs scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 className="h-3.5 w-3.5 text-accent" />
                  <span>Ampliar captura</span>
                </span>
              </div>

              {/* Status Badge flotante sobre la imagen */}
              <div className="absolute top-3 right-3 z-10 pointer-events-none shadow-xs">
                {getStatusBadge(project.statusType, project.status)}
              </div>
            </div>
          ) : (
            <div className="relative w-full h-36 border-b border-slate-200 dark:border-zinc-800 bg-gradient-to-br from-slate-100 via-white to-slate-200 dark:from-zinc-900 dark:via-zinc-950 dark:to-black p-5 flex flex-col justify-between overflow-hidden">
              <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <FolderCode className="h-4 w-4 text-accent" />
                  <span>{project.category}</span>
                </div>
                {getStatusBadge(project.statusType, project.status)}
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 dark:text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-accent animate-ping"></span>
                  <span>Software Architecture</span>
                </span>
                <span className="text-accent font-semibold">{project.techStack?.[0] || 'Full Stack'}</span>
              </div>
            </div>
          )}

          {/* Card Content Body */}
          <div className="p-5 sm:p-6 text-left">
            {/* Meta row: Category & Period Timeline */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-semibold">
                {project.category}
              </span>

              {/* Periodo de tiempo dinámico (desde - hasta, actualidad, etc.) */}
              {project.period && (
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 font-mono text-[10px] text-slate-600 dark:text-zinc-400">
                  <Calendar className="h-3 w-3 text-accent" />
                  <span>{project.period}</span>
                </span>
              )}
            </div>

            {/* Project Title */}
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-accent transition-colors">
              {project.title}
            </h3>

            {/* Short Tagline */}
            <p className="text-xs font-mono text-slate-500 dark:text-zinc-400 mb-3">
              {project.tagline}
            </p>

            {/* Short Description */}
            <p className="text-sm text-slate-600 dark:text-zinc-300 leading-relaxed mb-5 font-normal">
              {project.shortDescription}
            </p>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {project.techStack?.map((tech, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 font-mono text-[11px] text-slate-700 dark:text-zinc-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Expand Details Button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="mb-2 flex w-full items-center justify-between rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-900/50 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-zinc-300 transition-all hover:border-accent hover:text-accent cursor-pointer"
            >
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
                <span>{expanded ? 'Ocultar detalles' : 'Ver arquitectura & detalles'}</span>
              </span>
              <ChevronDown className={`h-4 w-4 text-slate-400 dark:text-zinc-400 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
            </button>

            {/* Accordion Content */}
            {expanded && (
              <div className="pt-3 pb-2 space-y-3.5 border-t border-slate-200 dark:border-zinc-800 transition-all">
                <div className="rounded-xl bg-slate-50 dark:bg-zinc-900/70 p-3.5 border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-300 leading-relaxed">
                  <p className="font-semibold text-accent mb-1 font-mono">Detalle técnico:</p>
                  <p>{project.detailedDescription}</p>
                </div>

                {project.highlights && project.highlights.length > 0 && (
                  <div>
                    <p className="text-[11px] font-mono uppercase tracking-wider text-accent mb-2 font-medium">
                      Puntos destacados:
                    </p>
                    <ul className="space-y-1.5">
                      {project.highlights.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-slate-700 dark:text-zinc-300">
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Card Action Links */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50/80 dark:bg-zinc-950/40 flex items-center justify-between gap-3">
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-accent-light border border-accent px-3.5 py-1.5 text-xs font-semibold text-accent transition-all hover:bg-accent hover:text-white"
          >
            <span>Demo / Sitio</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-300 transition-all hover:border-accent hover:text-accent shadow-2xs"
          >
            <GithubIcon className="h-3.5 w-3.5 text-slate-500 dark:text-zinc-400" />
            <span>Código</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal para ver la imagen en alta resolución */}
      <ImageModal
        isOpen={isLightboxOpen}
        imageUrl={project.image}
        title={project.title}
        demoUrl={project.demoUrl}
        onClose={() => setIsLightboxOpen(false)}
      />
    </>
  );
}
