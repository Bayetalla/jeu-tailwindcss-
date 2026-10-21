import React, { useState } from 'react';
import {
  Flame,
  Trophy,
  ArrowRight,
  Play,
  RotateCw,
  Code,
  Volume2,
  CheckCircle2,
  Sparkles,
  Target,
  BookOpen,
  Award,
  Compass,
  Layers,
  HelpCircle,
  X,
} from 'lucide-react';
import { UserProgress, Level } from '../../types';
import { CURRICULUM_LEVELS } from '../../data/curriculum';
import { DAILY_QUESTS } from '../../data/dailyQuests';
import { BADGES } from '../../data/badges';
import { saveUserProgress } from '../../services/storage';

interface DashboardProps {
  progress: UserProgress;
  onNavigateLesson: (lessonId: string) => void;
  onNavigateTab: (tab: 'dashboard' | 'curriculum' | 'lab' | 'review' | 'dictionary' | 'projects') => void;
  onOpenVoiceTutor: () => void;
  onProgressUpdate: (updated: UserProgress) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  progress,
  onNavigateLesson,
  onNavigateTab,
  onOpenVoiceTutor,
  onProgressUpdate,
}) => {
  const [showDiagnosticModal, setShowDiagnosticModal] = useState<boolean>(false);
  const [diagnosticStep, setDiagnosticStep] = useState<number>(0);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(0);

  // Find active lesson
  const allLessons = CURRICULUM_LEVELS.flatMap((lvl) => lvl.lessons);
  const currentLesson =
    allLessons.find((l) => l.id === progress.currentLessonId) || allLessons[0];

  const totalLessonsCount = allLessons.length;
  const completedCount = progress.completedLessonIds.length;
  const overallPercent = Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));

  // Diagnostic questions
  const diagnosticQuestions = [
    {
      q: 'Comment centrez-vous le plus simplement une boîte au milieu de son conteneur ?',
      options: [
        { label: 'Avec float: center', score: 0 },
        { label: 'Avec display: flex; justify-content: center; align-items: center;', score: 2 },
        { label: 'Avec des balises <center>', score: 0 },
      ],
    },
    {
      q: 'Quelle est la différence entre box-sizing: content-box et border-box ?',
      options: [
        { label: 'Aucune, c\'est purement esthétique', score: 0 },
        { label: 'border-box inclut le padding et la bordure dans la largeur définie', score: 2 },
        { label: 'content-box supprime les marges', score: 0 },
      ],
    },
    {
      q: 'À quoi sert la pseudo-classe moderne :has() ?',
      options: [
        { label: 'À vérifier si l\'utilisateur est connecté', score: 0 },
        { label: 'À cibler un élément parent en fonction de ce qu\'il contient', score: 2 },
        { label: 'À importer une police d\'écriture', score: 0 },
      ],
    },
  ];

  const handleAnswerDiagnostic = (score: number) => {
    const newTotal = diagnosticScore + score;
    setDiagnosticScore(newTotal);

    if (diagnosticStep < diagnosticQuestions.length - 1) {
      setDiagnosticStep(diagnosticStep + 1);
    } else {
      // Diagnostic complete
      const assignedLevel =
        newTotal >= 5 ? 'advanced' : newTotal >= 3 ? 'intermediate' : 'beginner';
      const updated: UserProgress = {
        ...progress,
        diagnosticCompleted: true,
        diagnosticLevel: assignedLevel,
      };
      saveUserProgress(updated);
      onProgressUpdate(updated);
      setShowDiagnosticModal(false);
    }
  };

  return (
    <div className="w-full space-y-8 pb-16">
      {/* 1. Hero Banner: Next Quest & Progression Header */}
      <div className="relative overflow-hidden p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/50 border border-slate-800 rounded-3xl shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Rang actuel : {progress.levelRank || 'Apprenti CSS'}
              </span>
              <span className="text-slate-600">&middot;</span>
              <span className="text-xs font-mono text-slate-400">{progress.xp} XP accumulés</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Prêt pour votre prochaine quête CSS ?
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Continuez votre exploration méthodique des 14 mondes. Chaque notion comprise est une victoire définitive pour vos interfaces web.
            </p>

            {/* Diagnostic callout if not completed */}
            {!progress.diagnosticCompleted && (
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setDiagnosticStep(0);
                    setDiagnosticScore(0);
                    setShowDiagnosticModal(true);
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white underline cursor-pointer font-mono"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Passer le test de niveau facultatif (3 questions rapides)</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick resume card */}
          <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-5 sm:p-6 lg:min-w-[340px] shadow-xl backdrop-blur-sm flex flex-col justify-between space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Mission en cours
              </span>
              <h3 className="text-base font-bold text-white line-clamp-1">
                {currentLesson.title}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {currentLesson.shortDescription}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigateLesson(currentLesson.id)}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs shadow-lg shadow-indigo-600/25 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Reprendre la quête &rarr;</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Série active</span>
          <div className="flex items-center gap-2 mt-2">
            <Flame className="w-5 h-5 text-amber-400 fill-current" />
            <span className="text-2xl font-extrabold text-white font-mono">{progress.streakDays}j</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-mono">Discipline quotidienne</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Objectif Journalier</span>
          <div className="flex items-center gap-2 mt-2">
            <Target className="w-5 h-5 text-emerald-400" />
            <span className="text-2xl font-extrabold text-white font-mono">{progress.dailyXpEarned}/{progress.dailyGoalXp} XP</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (progress.dailyXpEarned / progress.dailyGoalXp) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Mondes Débloqués</span>
          <div className="flex items-center gap-2 mt-2">
            <Compass className="w-5 h-5 text-indigo-400" />
            <span className="text-2xl font-extrabold text-white font-mono">14 / 14</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-mono">Programme complet</span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <span className="text-xs text-slate-400 font-medium">Progrès Global</span>
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-2xl font-extrabold text-white font-mono">{overallPercent}%</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-1 font-mono">{completedCount} missions achevées</span>
        </div>
      </div>

      {/* 3. 14 Worlds Map Fast Navigation */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-indigo-400" />
              <span>Aperçu des 14 Mondes</span>
            </h3>
            <p className="text-xs text-slate-400">Cliquez sur un monde pour voir ses leçons et son défi de boss</p>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTab('curriculum')}
            className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
          >
            <span>Explorer la carte</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2.5">
          {CURRICULUM_LEVELS.map((w) => {
            const completedInWorld = w.lessons.filter((l) =>
              progress.completedLessonIds.includes(l.id)
            ).length;
            const isDone = completedInWorld === w.lessons.length && w.lessons.length > 0;

            return (
              <button
                key={w.id}
                type="button"
                onClick={() => onNavigateLesson(w.lessons[0]?.id || '1-1')}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[90px] ${
                  isDone
                    ? 'bg-slate-950 border-emerald-500/40 hover:border-emerald-500'
                    : 'bg-slate-950/80 border-slate-800 hover:border-indigo-500/60'
                }`}
              >
                <div className="flex items-center justify-between w-full text-[10px] font-mono text-indigo-400">
                  <span>M{w.worldNumber}</span>
                  {isDone && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                </div>
                <h5 className="text-[11px] font-bold text-slate-200 line-clamp-2 mt-1">
                  {w.title.split(':')[1]?.trim() || w.title}
                </h5>
                <span className="text-[10px] text-slate-500 font-mono mt-auto">
                  {completedInWorld}/{w.lessons.length}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Split: Daily Quests & Skills Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Quests */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <span>Quêtes du Jour</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Renouvelées à minuit</span>
          </div>

          <div className="space-y-2.5">
            {DAILY_QUESTS.map((quest) => (
              <div
                key={quest.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between gap-3"
              >
                <div>
                  <h4 className="text-xs font-semibold text-white">{quest.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{quest.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-amber-400">+{quest.xpReward} XP</span>
                  <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {quest.completed ? '✓ Fait' : 'En cours'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badges Mastery Showcase */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Badges de Maîtrise CSS</span>
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              {progress.unlockedBadgeIds.length} / {BADGES.length} débloqués
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {BADGES.slice(0, 6).map((badge) => {
              const unlocked = progress.unlockedBadgeIds.includes(badge.id);

              return (
                <div
                  key={badge.id}
                  className={`p-3 rounded-xl border flex flex-col items-center text-center space-y-1.5 transition-all ${
                    unlocked
                      ? 'bg-slate-950 border-amber-500/40 shadow-sm'
                      : 'bg-slate-950/40 border-slate-800 opacity-50'
                  }`}
                >
                  <Award className={`w-5 h-5 ${unlocked ? 'text-amber-400' : 'text-slate-600'}`} />
                  <span className="text-[11px] font-bold text-slate-200 line-clamp-1">
                    {badge.title}
                  </span>
                  <span className="text-[9px] text-slate-500 line-clamp-1">
                    {badge.description}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Diagnostic Modal */}
      {showDiagnosticModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Diagnostic de niveau ({diagnosticStep + 1}/3)
              </span>
              <button
                type="button"
                onClick={() => setShowDiagnosticModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-sm font-bold text-white">
              {diagnosticQuestions[diagnosticStep].q}
            </h4>

            <div className="space-y-2">
              {diagnosticQuestions[diagnosticStep].options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAnswerDiagnostic(opt.score)}
                  className="w-full text-left p-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500 text-xs text-slate-200 transition-colors cursor-pointer"
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
