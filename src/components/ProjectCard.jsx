import { useState } from 'react';
import { ExternalLink, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project }) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = (statusType, status) => {
    switch (statusType) {
      case 'production':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-emerald-300">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            {status}
          </span>
        );
      case 'beta':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-300">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 px-2.5 py-0.5 font-mono text-[11px] font-medium text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-400"></span>
            {status}
          </span>
        );
    }
  };

  return (
    <div className="group rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm p-6 flex flex-col justify-between transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/70 hover:shadow-xl hover:shadow-black/40">
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-400 font-medium">
              {project.category}
            </span>
            <h3 className="text-xl font-bold text-white mt-0.5 group-hover:text-emerald-300 transition-colors">
              {project.title}
            </h3>
          </div>
          <div>
            {getStatusBadge(project.statusType, project.status)}
          </div>
        </div>

        {/* Short Tagline */}
        <p className="text-xs font-mono text-zinc-400 mb-3">
          {project.tagline}
        </p>

        {/* Short Description */}
        <p className="text-sm text-zinc-300 leading-relaxed mb-5">
          {project.shortDescription}
        </p>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-md border border-zinc-800 bg-zinc-950/70 px-2 py-0.5 font-mono text-[11px] text-zinc-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand Details Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mb-4 flex w-full items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/50 px-3.5 py-2 text-xs font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:bg-zinc-800/60 hover:text-white cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>{expanded ? 'Ocultar detalles' : 'Ver arquitectura & detalles'}</span>
          </span>
          <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>

        {/* Accordion Content */}
        {expanded && (
          <div className="pt-2 pb-4 space-y-4 border-t border-zinc-800/80 transition-all">
            <div className="rounded-xl bg-zinc-950/60 p-4 border border-zinc-800/60 text-xs text-zinc-300 leading-relaxed">
              <p className="font-semibold text-emerald-300 mb-1 font-mono">Detalle técnico:</p>
              <p>{project.detailedDescription}</p>
            </div>

            <div>
              <p className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Puntos destacados:
              </p>
              <ul className="space-y-1.5">
                {project.highlights.map((point, index) => (
                  <li key={index} className="flex items-start gap-2 text-xs text-zinc-300">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Card Action Links */}
      <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-3">
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition-all hover:bg-emerald-500 hover:text-zinc-950"
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
