import React from 'react';
import { Volume2, Flame, Trophy, Sparkles } from 'lucide-react';
import { UserProgress } from '../../types';

interface NavbarProps {
  currentTab: 'dashboard' | 'curriculum' | 'lab' | 'review' | 'dictionary' | 'projects';
  onSelectTab: (tab: 'dashboard' | 'curriculum' | 'lab' | 'review' | 'dictionary' | 'projects') => void;
  onOpenVoiceTutor: () => void;
  progress: UserProgress;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenVoiceTutor,
  progress,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/95 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className="text-lg font-extrabold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-sm shadow-indigo-500/50"></span>
          <span>CSS Quest</span>
        </button>

        {/* Zone 2: 4–6 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          <button
            type="button"
            onClick={() => onSelectTab('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'dashboard' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Accueil
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('curriculum')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'curriculum' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            14 Mondes
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('lab')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'lab' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Laboratoire
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('dictionary')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'dictionary' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Dictionnaire
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('review')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'review' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Révisions
          </button>
          <button
            type="button"
            onClick={() => onSelectTab('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              currentTab === 'projects' ? 'text-indigo-400 font-semibold' : 'hover:text-slate-200'
            }`}
          >
            Projets Pro
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-slate-400 mr-1">
            <span className="flex items-center gap-1 text-amber-400">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{progress.streakDays}j</span>
            </span>
            <span className="text-slate-300 font-bold">
              {progress.xp} XP
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenVoiceTutor}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all hover:scale-105 active:scale-95 whitespace-nowrap shrink-0 cursor-pointer shadow-md shadow-indigo-600/25"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>Professeur Vocal</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 bg-slate-900/90 border-t border-slate-800 text-[10px] font-medium text-slate-400 overflow-x-auto">
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'dashboard' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Accueil
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('curriculum')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'curriculum' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Mondes
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('lab')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'lab' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Labo
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('dictionary')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'dictionary' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Dico
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('review')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'review' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Réviser
        </button>
        <button
          type="button"
          onClick={() => onSelectTab('projects')}
          className={`py-1 px-1.5 whitespace-nowrap ${currentTab === 'projects' ? 'text-indigo-400 font-bold' : ''}`}
        >
          Projets
        </button>
      </div>
    </header>
  );
};
