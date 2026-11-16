import { useState } from 'react';
import { ExternalLink, ChevronDown, CheckCircle2, Sparkles, FolderCode } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (statusType, status) => {
    switch (statusType) {
      case 'production':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-blue-300">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"></span>
            {status}
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/40 bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="group rounded-2xl border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-blue-500/40 hover:bg-slate-950 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1">
      <div>
        {/* Project Image Banner or Tech Fallback */}
        {project.image ? (
          <div className="relative w-full h-44 overflow-hidden border-b border-zinc-800/80 bg-zinc-900">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
          </div>
        ) : (
          <div className="relative w-full h-28 border-b border-zinc-800/80 bg-gradient-to-br from-blue-950/40 via-zinc-950 to-black p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-zinc-500 font-mono text-xs">
              <FolderCode className="h-4 w-4 text-blue-400" />
              <span>{project.category}</span>
            </div>
            <div className="h-2 w-2 rounded-full bg-blue-500/40"></div>
          </div>
        )}

        {/* Card Content Body */}
        <div className="p-6">
          {/* Card Header */}
          <div className="flex items-start justify-between gap-3 mb-2.5">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-blue-400 font-medium">
                {project.category}
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
            </div>
            <div className="shrink-0">
              {getStatusBadge(project.statusType, project.status)}
            </div>
          </div>

          {/* Short Tagline */}
          <p className="text-xs font-mono text-zinc-400 mb-3">
            {project.tagline}
          </p>

          {/* Short Description */}
          <p className="text-sm text-zinc-300 leading-relaxed mb-5 font-light">
            {project.shortDescription}
          </p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.techStack.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-900/90 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expand Details Button */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="mb-2 flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-blue-500/40 hover:bg-zinc-800/60 hover:text-white cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span>{expanded ? 'Ocultar detalles' : 'Ver arquitectura & detalles'}</span>
            </span>
            <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
          </button>

          {/* Accordion Content */}
          {expanded && (
            <div className="pt-3 pb-2 space-y-3.5 border-t border-zinc-800/80 transition-all">
              <div className="rounded-xl bg-zinc-900/70 p-3.5 border border-zinc-800 text-xs text-zinc-300 leading-relaxed font-light">
                <p className="font-semibold text-blue-300 mb-1 font-mono">Detalle técnico:</p>
                <p>{project.detailedDescription}</p>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-blue-400 mb-2 font-medium">
                  Puntos destacados:
                </p>
                <ul className="space-y-1.5">
                  {project.highlights.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
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
      <div className="px-6 py-4 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center justify-between gap-3">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/15 border border-blue-500/40 px-3.5 py-1.5 text-xs font-semibold text-blue-300 transition-all hover:bg-blue-600 hover:text-white"
        >
          <span>Demo / Sitio</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </a>

        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-900 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:text-white"
        >
          <GithubIcon className="h-3.5 w-3.5 text-zinc-400" />
          <span>Código</span>
        </a>
      </div>
    </div>
  );
}
