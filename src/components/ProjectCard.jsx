import { useState } from 'react';
import { ExternalLink, ChevronDown, CheckCircle2, Sparkles, FolderCode } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (statusType, status) => {
    switch (statusType) {
      case 'production':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse"></span>
            {status}
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500"></span>
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-zinc-700 bg-slate-100 dark:bg-zinc-800 px-2.5 py-0.5 font-mono text-[11px] font-medium text-slate-700 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-zinc-400"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="group glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1">
      <div>
        {/* Project Image Banner or Tech Fallback */}
        {project.image ? (
          <div className="relative w-full h-44 overflow-hidden border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900">
            <img 
              src={project.image} 
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative w-full h-28 border-b border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-[#07090e] p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 font-mono text-xs">
              <FolderCode className="h-4 w-4 text-accent" />
              <span>{project.category}</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-accent opacity-60"></div>
          </div>
        )}

        {/* Card Content Body */}
        <div className="p-5 sm:p-6 text-left">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-accent font-medium">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="shrink-0">
              {getStatusBadge(project.statusType, project.status)}
            </div>
          </div>

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
            {project.techStack.map((tech, i) => (
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
  );
}
