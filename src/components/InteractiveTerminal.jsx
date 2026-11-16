import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function InteractiveTerminal() {
  const { personal } = usePortfolio();
  const [activeTab, setActiveTab] = useState('overview');

  const tabContent = {
    overview: [
      { label: 'role', value: personal.title },
      { label: 'stack', value: 'React · Node.js · Express · SQL/NoSQL' },
      { label: 'education', value: 'Analista en Sistemas (IES21)' },
      { label: 'availability', value: personal.status, isBadge: true },
      { label: 'location', value: personal.location }
    ],
    skills: [
      { label: 'frontend', value: 'React, Tailwind CSS, JavaScript (ES6+)' },
      { label: 'backend', value: 'Node.js, Express, REST APIs, Java' },
      { label: 'database', value: 'PostgreSQL, MySQL, MongoDB, Firebase' },
      { label: 'versioning', value: 'Git, GitHub (Ramas, PRs, Workflow)' }
    ],
    contact: [
      { label: 'email', value: personal.email },
      { label: 'github', value: `@${personal.githubUsername}` },
      { label: 'phone', value: personal.phone },
      { label: 'deploy', value: 'Vercel CI/CD' }
    ]
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Terminal Card - Clean shadow, zero blur lag */}
      <div className="relative rounded-2xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#0b0f17] shadow-xl overflow-hidden font-mono text-left transition-colors">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 bg-slate-100/90 dark:bg-zinc-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500 inline-block"></span>
            <span className="ml-2 text-xs text-slate-600 dark:text-zinc-400 font-medium">
              {personal.handle || 'user'}@dev ~
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-zinc-500">
            <TerminalIcon className="h-3.5 w-3.5 text-accent" />
            <span>bash</span>
          </div>
        </div>

        {/* Command tabs */}
        <div className="flex border-b border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-zinc-950/60 px-2 py-1.5 gap-1 text-xs">
          {['overview', 'skills', 'contact'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === tab 
                  ? 'bg-accent-light text-accent font-semibold border border-accent' 
                  : 'text-slate-600 dark:text-zinc-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-zinc-800/40'
              }`}
            >
              $ {tab}
            </button>
          ))}
        </div>

        {/* Terminal Body */}
        <div className="p-4 sm:p-5 space-y-3 text-xs sm:text-sm">
          {tabContent[activeTab].map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <div className="flex items-center gap-1.5 shrink-0 text-accent font-medium">
                <span className="text-slate-400 dark:text-zinc-600">▸</span>
                <span>{item.label}:</span>
              </div>
              <div className="pl-3 sm:pl-0 text-slate-800 dark:text-zinc-200 font-sans font-normal">
                {item.isBadge ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-accent bg-accent-light px-2.5 py-0.5 font-mono text-[11px] font-medium text-accent">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    {item.value}
                  </span>
                ) : (
                  item.value
                )}
              </div>
            </div>
          ))}

          {/* Prompt line */}
          <div className="pt-3 border-t border-slate-200 dark:border-zinc-800/60 flex items-center gap-2 text-slate-500 dark:text-zinc-400 font-mono text-xs">
            <span className="text-accent font-bold">$</span>
            <span className="text-slate-700 dark:text-zinc-300">npm run build && vercel --prod</span>
            <span className="h-4 w-2 bg-accent animate-pulse inline-block"></span>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="bg-slate-100 dark:bg-zinc-950 px-4 py-2 border-t border-slate-200 dark:border-zinc-800/60 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-accent" />
            <span>React 19 + Tailwind v4 + Vite</span>
          </div>
          <span className="font-medium">UTF-8</span>
        </div>
      </div>
    </div>
  );
}
