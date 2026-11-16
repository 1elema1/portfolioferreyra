import { useState } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { Terminal as TerminalIcon, Sparkles } from 'lucide-react';

export default function InteractiveTerminal() {
  const { personal, themeMode } = usePortfolio();
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
      {/* Decorative ambient glow */}
      <div 
        className="absolute -inset-1 rounded-2xl blur-xl opacity-70"
        style={{ background: 'var(--color-accent-glow)' }}
      ></div>

      {/* Terminal Card */}
      <div className="relative rounded-2xl border border-zinc-800 dark:border-zinc-800 light:border-zinc-200 bg-zinc-950/95 dark:bg-zinc-950/95 light:bg-white shadow-2xl overflow-hidden font-mono text-left transition-colors">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-zinc-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 inline-block"></span>
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block"></span>
            <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-400 light:text-zinc-600 font-medium">
              {personal.handle || 'user'}@dev ~
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-zinc-500">
            <TerminalIcon className="h-3.5 w-3.5 text-accent" />
            <span>bash</span>
          </div>
        </div>

        {/* Command tabs */}
        <div className="flex border-b border-zinc-800/80 dark:border-zinc-800/80 light:border-zinc-200 bg-zinc-950/60 dark:bg-zinc-950/60 light:bg-zinc-50 px-2 py-1.5 gap-1 text-xs">
          {['overview', 'skills', 'contact'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                activeTab === tab 
                  ? 'bg-accent-light text-accent font-semibold border border-accent' 
                  : 'text-zinc-400 light:text-zinc-600 hover:text-white light:hover:text-black hover:bg-zinc-800/40'
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
                <span className="text-zinc-500">▸</span>
                <span>{item.label}:</span>
              </div>
              <div className="pl-3 sm:pl-0 text-zinc-200 dark:text-zinc-200 light:text-zinc-800 font-sans font-normal">
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
          <div className="pt-3 border-t border-zinc-800/60 dark:border-zinc-800/60 light:border-zinc-200 flex items-center gap-2 text-zinc-400 font-mono text-xs">
            <span className="text-accent font-bold">$</span>
            <span className="text-zinc-300 dark:text-zinc-300 light:text-zinc-700">npm run build && vercel --prod</span>
            <span className="h-4 w-2 bg-accent animate-pulse inline-block"></span>
          </div>
        </div>

        {/* Quick status bar */}
        <div className="bg-zinc-950 dark:bg-zinc-950 light:bg-zinc-100 px-4 py-2 border-t border-zinc-800/60 dark:border-zinc-800/60 light:border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500 light:text-zinc-600">
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
