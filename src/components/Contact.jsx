import { useState } from 'react';
import { personalData } from '../data/portfolioData';
import { Mail, Phone, MapPin, Copy, Check, Download, MessageSquare } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="relative py-28 border-t border-zinc-900 bg-zinc-950 overflow-hidden">
      {/* Background blue radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[480px] w-[480px] rounded-full bg-blue-600/15 blur-[140px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Badge status */}
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/40 px-4 py-1.5 text-xs font-mono text-blue-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Open to Work · Disponibilidad Inmediata Full Time</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
          ¿Listo para crear algo increíble juntos?
        </h2>

        <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Estoy disponible para sumarme a equipos de desarrollo como Full Stack Developer o colaborar en soluciones tecnológicas. Mi bandeja de entrada está siempre abierta.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <a
            href={`mailto:${personalData.email}`}
            className="group inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-blue-500 hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
          >
            <Mail className="h-4 w-4" />
            <span>Enviar Correo</span>
          </a>

          <a
            href={`https://wa.me/549${personalData.phoneRaw}?text=Hola%20Emanuel,%20vi%20tu%20portfolio%20y%20me%20gustar%C3%ADa%20contactarte.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-medium text-white transition-all hover:border-blue-500/50 hover:bg-zinc-800 hover:-translate-y-0.5"
          >
            <MessageSquare className="h-4 w-4 text-blue-400" />
            <span>WhatsApp Directo</span>
          </a>

          <a
            href={`/${personalData.cvFileName}`}
            download={personalData.cvFileName}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-black px-5 py-3.5 text-sm font-medium text-zinc-300 transition-all hover:border-zinc-700 hover:text-white hover:bg-zinc-900"
          >
            <Download className="h-4 w-4 text-zinc-400" />
            <span>Descargar CV</span>
          </a>
        </div>

        {/* Contact info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          
          {/* Email card */}
          <div className="rounded-2xl border border-zinc-800 bg-black/80 p-5 backdrop-blur-sm relative group">
            <div className="flex items-center justify-between mb-2">
              <Mail className="h-4 w-4 text-blue-400" />
              <button
                onClick={copyEmail}
                className="text-zinc-500 hover:text-blue-300 p-1 rounded-md transition-colors"
                title="Copiar correo al portapapeles"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-blue-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Email</p>
            <p className="text-xs font-semibold text-white truncate mt-0.5 font-mono">
              {personalData.email}
            </p>
          </div>

          {/* Phone card */}
          <div className="rounded-2xl border border-zinc-800 bg-black/80 p-5 backdrop-blur-sm">
            <Phone className="h-4 w-4 text-blue-400 mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Teléfono</p>
            <p className="text-xs font-semibold text-white mt-0.5 font-mono">
              {personalData.phone}
            </p>
          </div>

          {/* Location card */}
          <div className="rounded-2xl border border-zinc-800 bg-black/80 p-5 backdrop-blur-sm">
            <MapPin className="h-4 w-4 text-blue-400 mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">Ubicación</p>
            <p className="text-xs font-semibold text-white mt-0.5">
              {personalData.location}
            </p>
          </div>

          {/* GitHub card */}
          <a
            href={personalData.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-2xl border border-zinc-800 bg-black/80 p-5 backdrop-blur-sm transition-all hover:border-blue-500/40 hover:bg-slate-950 block"
          >
            <GithubIcon className="h-4 w-4 text-blue-400 mb-2" />
            <p className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">GitHub</p>
            <p className="text-xs font-semibold text-white mt-0.5 font-mono">
              @{personalData.githubUsername}
            </p>
          </a>

        </div>

      </div>
    </section>
  );
}
