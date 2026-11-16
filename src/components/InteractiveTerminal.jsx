import { useState } from 'react';
import { personalData } from '../data/portfolioData';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function InteractiveTerminal() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabContent = {
    overview: [
      { label: 'role', value: personalData.title },
      { label: 'stack', value: 'React · Node.js · Express · SQL/NoSQL' },
      { label: 'education', value: 'Analista en Sistemas (IES21)' },
      { label: 'availability', value: personalData.status, isBadge: true },
      { label: 'location', value: personalData.location }
    ],
    skills: [
      { label: 'frontend', value: 'React, Tailwind CSS, JavaScript (ES6+)' },
      { label: 'backend', value: 'Node.js, Express, REST APIs, Java' },
      { label: 'database', value: 'PostgreSQL, MySQL, MongoDB, Firebase' },
      { label: 'versioning', value: 'Git, GitHub (Ramas, PRs, Workflow)' }
    ],
    contact: [
      { label: 'email', value: personalData.email },
      { label: 'github', value: `@${personalData.githubUsername}` },
      { label: 'phone', value: personalData.phone },
      { label: 'deploy', value: 'Vercel CI/CD' }
    ]
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Decorative ambient blue glow */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/30 via-indigo-500/20 to-cyan-500/25 blur-xl opacity-80"></div>

      {/* Terminal Card */}
      <div className="relative rounded-2xl border border-zinc-800 bg-black/90 backdrop-blur-xl shadow-2xl shadow-blue-950/50 overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-950/90 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-blue-500/80 inline-block"></span>
            <span className="ml-2 text-xs text-zinc-300 font-medium">emanuel@dev ~</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <TerminalIcon className="h-3.5 w-3.5 text-blue-400" />
            <span>bash</span>
          </div>
        </div>

        {/* Command tabs */}
        <div className="flex border-b border-zinc-800/80 bg-zinc-950/60 px-2 py-1.5 gap-1 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'overview' 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            }`}
          >
            $ overview
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'skills' 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            }`}
          >
            $ tech-stack
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-1 rounded-md transition-colors ${
              activeTab === 'contact' 
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
            }`}
          >
            $ contact
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-5 space-y-3.5 text-xs sm:text-sm">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <div className="flex items-center gap-1.5 shrink-0 text-blue-400">
                <span className="text-zinc-600">▸</span>
                <span className="text-zinc-400">{item.label}:</span>
              </div>
              <div className="pl-3 sm:pl-0 text-zinc-100 font-sans">
                {item.isBadge ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/15 px-2.5 py-0.5 font-mono text-[11px] font-medium text-blue-300">
                    <span className="h-2 w-2 rounded-full bg-blue-400 animate-pulse"></span>
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}

          {/* Prompt line */}
          <div className="pt-3 border-t border-zinc-800/60 flex items-center gap-2 text-zinc-400 font-mono text-xs">
            <span className="text-blue-400 font-bold">$</span>
            <span className="text-zinc-200">npm run deploy --prod</span>
            <span className="h-4 w-2 bg-blue-400 animate-pulse inline-block"></span>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="bg-zinc-950 px-4 py-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-blue-400" />
            <span className="text-zinc-400">React 19 + Tailwind v4 + Vite</span>
          </div>
          <span className="text-zinc-400 font-medium">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
