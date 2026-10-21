import React, { useState } from 'react';
import {
  Compass,
  CheckCircle,
  Play,
  ChevronRight,
  Sparkles,
  Lock,
  Trophy,
  Swords,
  Layers,
  Palette,
  AlignCenter,
  LayoutGrid,
  Smartphone,
  SlidersHorizontal,
  Award,
  Sliders,
  Boxes,
  ShieldCheck,
} from 'lucide-react';
import { CURRICULUM_LEVELS } from '../../data/curriculum';
import { UserProgress, Level, Lesson } from '../../types';

interface CurriculumExplorerProps {
  progress: UserProgress;
  onNavigateLesson: (lessonId: string) => void;
  onOpenVoiceTutor: () => void;
}

export const CurriculumExplorer: React.FC<CurriculumExplorerProps> = ({
  progress,
  onNavigateLesson,
  onOpenVoiceTutor,
}) => {
  const [selectedWorldId, setSelectedWorldId] = useState<number>(1);

  const selectedWorld: Level =
    CURRICULUM_LEVELS.find((lvl) => lvl.id === selectedWorldId) || CURRICULUM_LEVELS[0];

  const getWorldIcon = (worldNum: number) => {
    switch (worldNum) {
      case 1: return <Sparkles className="w-4 h-4 text-indigo-400" />;
      case 2: return <Palette className="w-4 h-4 text-pink-400" />;
      case 3: return <Layers className="w-4 h-4 text-amber-400" />;
      case 4: return <AlignCenter className="w-4 h-4 text-blue-400" />;
      case 5: return <LayoutGrid className="w-4 h-4 text-emerald-400" />;
      case 6: return <Compass className="w-4 h-4 text-amber-300" />;
      case 7: return <Smartphone className="w-4 h-4 text-sky-400" />;
      case 8: return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 9: return <SlidersHorizontal className="w-4 h-4 text-teal-400" />;
      case 10: return <Award className="w-4 h-4 text-rose-400" />;
      case 11: return <Sliders className="w-4 h-4 text-cyan-400" />;
      case 12: return <Boxes className="w-4 h-4 text-violet-400" />;
      case 13: return <ShieldCheck className="w-4 h-4 text-emerald-300" />;
      case 14: return <Trophy className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Header banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Carte des 14 Mondes CSS Quest
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Une progression méthodique de zéro à expert. Chaque monde cible une compétence précise avec explications courtes, schémas animés et défis pratiques.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVoiceTutor}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Assistant Vocal & IA</span>
        </button>
      </div>

      {/* 14 Worlds Horizontal Scrollable Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CURRICULUM_LEVELS.map((world) => {
          const isSelected = world.id === selectedWorldId;
          const completedCount = world.lessons.filter((l) =>
            progress.completedLessonIds.includes(l.id)
          ).length;
          const isWorldCompleted = completedCount === world.lessons.length && world.lessons.length > 0;

          return (
            <button
              key={world.id}
              type="button"
              onClick={() => setSelectedWorldId(world.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-2.5 cursor-pointer shrink-0 ${
                isSelected
                  ? 'bg-indigo-600 border-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="shrink-0">{getWorldIcon(world.worldNumber)}</div>
              <span>M{world.worldNumber}</span>
              {isWorldCompleted ? (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              ) : completedCount > 0 ? (
                <span className="text-[10px] font-mono text-indigo-300">
                  {completedCount}/{world.lessons.length}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {/* Selected World Focus Section */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center">
              {getWorldIcon(selectedWorld.worldNumber)}
            </div>
            <div>
              <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                Monde {selectedWorld.worldNumber} &middot; {selectedWorld.lessons.length} Quêtes
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                {selectedWorld.title}
              </h3>
            </div>
          </div>

          <p className="text-xs text-slate-400 sm:max-w-md sm:text-right">
            {selectedWorld.tagline}
          </p>
        </div>

        {/* Missions List */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-semibold text-slate-400 uppercase tracking-wider">
            Missions disponibles dans ce monde :
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {selectedWorld.lessons.map((lesson, idx) => {
              const isDone = progress.completedLessonIds.includes(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => onNavigateLesson(lesson.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') onNavigateLesson(lesson.id); }}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 group ${
                    isDone
                      ? 'bg-slate-950/60 border-emerald-500/30 hover:border-emerald-500/60'
                      : 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/60 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono text-indigo-400 font-semibold uppercase">
                        Mission {idx + 1} &middot; {lesson.readingTimeMinutes} min
                      </span>
                      {isDone ? (
                        <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Validée</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-amber-400">
                          +{lesson.xpReward} XP
                        </span>
                      )}
                    </div>

                    <h5 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {lesson.title}
                    </h5>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                      {lesson.shortDescription}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs font-mono text-slate-400 group-hover:text-slate-200">
                    <span>{lesson.conceptName}</span>
                    <span className="flex items-center gap-1 text-indigo-400 group-hover:translate-x-1 transition-transform">
                      <span>Démarrer</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Boss Battle Banner */}
        {selectedWorld.bossBattle && (
          <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
                <Swords className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase">
                    Défi de fin de monde
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    +{selectedWorld.bossBattle.xpReward} XP
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mt-0.5">
                  {selectedWorld.bossBattle.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">
                  {selectedWorld.bossBattle.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLesson(selectedWorld.lessons[0]?.id || '1-1')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 shadow-lg shadow-amber-500/20"
            >
              Affronter le Défi &rarr;
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
