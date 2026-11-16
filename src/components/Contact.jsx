import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Mail, Phone, MapPin, Copy, Check, Download, MessageSquare } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Contact() {
  const { personal } = usePortfolio();
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#07090e] overflow-hidden transition-colors">
      {/* Background ambient glow - GPU safe */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-25 ambient-glow" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge status */}
        <div className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent-light px-4 py-1.5 text-xs font-mono text-accent mb-6 shadow-2xs">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
          <span>{personal.contactBadge || personal.availability || 'Open to Work · Disponibilidad Inmediata'}</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
          {personal.contactTitle || '¿Listo para crear algo increíble juntos?'}
        </h2>

        <p className="text-base sm:text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
          {personal.contactSubtitle || 'Estoy disponible para sumarme a equipos de desarrollo como Full Stack Developer o colaborar en soluciones tecnológicas. Mi bandeja de entrada está siempre abierta.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${personal.email}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all shadow-sm hover:opacity-95 active:scale-95"
          >
            <Mail className="h-4 w-4" />
            <span>{personal.contactButtonEmail || 'Enviar Correo'}</span>
          </a>

          <a
            href={`https://wa.me/549${personal.phoneRaw || '3512890844'}?text=${encodeURIComponent(personal.whatsappMessage || 'Hola Emanuel, vi tu portfolio y me gustaría contactarte.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-6 py-3.5 text-sm font-medium text-slate-800 dark:text-white transition-all hover:border-accent shadow-2xs active:scale-95"
          >
            <MessageSquare className="h-4 w-4 text-accent" />
            <span>{personal.contactButtonWhatsapp || 'WhatsApp Directo'}</span>
          </a>

          <a
            href={`/${personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}`}
            download={personal.cvFileName || 'Emanuel_Ferreyra_CV.pdf'}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900/60 px-5 py-3.5 text-sm font-medium text-slate-700 dark:text-zinc-300 transition-all hover:border-slate-300 dark:hover:border-zinc-700"
          >
            <Download className="h-4 w-4 text-slate-500 dark:text-zinc-400" />
            <span>{personal.contactButtonCv || 'Descargar CV'}</span>
          </a>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* Email card */}
          <div className="glass-card rounded-2xl p-5 relative group">
            <div className="flex items-center justify-between mb-2">
              <Mail className="h-4 w-4 text-accent" />
              <button
                onClick={copyEmail}
                className="text-slate-400 hover:text-accent p-1 rounded-md transition-colors cursor-pointer"
                title="Copiar correo al portapapeles"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500">Email</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white truncate mt-0.5 font-mono">
              {personal.email}
            </p>
          </div>

          {/* Phone card */}
          <div className="glass-card rounded-2xl p-5">
            <Phone className="h-4 w-4 text-accent mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500">Teléfono</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 font-mono">
              {personal.phone}
            </p>
          </div>

          {/* Location card */}
          <div className="glass-card rounded-2xl p-5">
            <MapPin className="h-4 w-4 text-accent mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500">Ubicación</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
              {personal.location}
            </p>
          </div>

          {/* GitHub card */}
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-5 block transition-all hover:scale-[1.02]"
          >
            <GithubIcon className="h-4 w-4 text-accent mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-slate-500 dark:text-zinc-500">GitHub</p>
            <p className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 font-mono">
              @{personal.githubUsername}
            </p>
          </a>

        </div>

      </div>
    </section>
  );
}
