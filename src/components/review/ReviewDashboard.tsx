import React, { useState } from 'react';
import { RotateCw, CheckCircle2, AlertCircle, BookOpen, Sparkles, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserProgress, ReviewItem, SkillStatus } from '../../types';
import { recordReviewSuccess, addReviewMistake } from '../../services/storage';

interface ReviewDashboardProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onNavigateLesson: (lessonId: string) => void;
}

export const ReviewDashboard: React.FC<ReviewDashboardProps> = ({
  progress,
  onProgressUpdate,
  onNavigateLesson,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const reviewItems = progress.reviewDeck || [];
  const currentCard = reviewItems[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleValidateAnswer = () => {
    if (selectedOption === null || !currentCard) return;
    setIsSubmitted(true);
    setShowExplanation(true);

    const isCorrect = selectedOption === currentCard.correctIndex;
    if (isCorrect) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
      });
      const updated = recordReviewSuccess(currentCard.id);
      onProgressUpdate(updated);
    } else {
      const updated = addReviewMistake({
        lessonId: currentCard.lessonId,
        conceptTitle: currentCard.conceptTitle,
        question: currentCard.question,
        options: currentCard.options,
        correctIndex: currentCard.correctIndex,
        explanation: currentCard.explanation,
      });
      onProgressUpdate(updated);
    }
  };

  const handleNextCard = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowExplanation(false);
    setCurrentIndex((prev) => (prev + 1 < reviewItems.length ? prev + 1 : 0));
  };

  // Status badge styling helper
  const renderStatusBadge = (status: SkillStatus) => {
    switch (status) {
      case 'mastered':
        return <span className="text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded text-[11px]">Maîtrisé</span>;
      case 'learning':
        return <span className="text-sky-400 font-semibold bg-sky-500/10 px-2 py-0.5 rounded text-[11px]">En cours</span>;
      case 'to_review':
        return <span className="text-amber-400 font-semibold bg-amber-500/10 px-2 py-0.5 rounded text-[11px]">À réviser</span>;
      default:
        return <span className="text-slate-400 font-semibold bg-slate-800 px-2 py-0.5 rounded text-[11px]">À découvrir</span>;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 bg-slate-900 border border-slate-800 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <RotateCw className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white tracking-tight">Système de Révision Espacée</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Ancrez durablement les notions en mémoire grâce à la répétition progressive selon la courbe de l'oubli.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
            <span className="text-slate-400">Cartes à réviser : </span>
            <strong className="text-indigo-400 font-mono">{reviewItems.length}</strong>
          </div>
        </div>
      </div>

      {/* Flashcard Quiz Studio */}
      {reviewItems.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-2xl">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-white">Votre paquet de révision est à jour !</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
            Complétez des leçons et des quiz : si vous hésitez ou faites une erreur, les notions seront automatiquement ajoutées ici pour être révisées au moment opportun.
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-200">{currentCard.conceptTitle}</span>
              {renderStatusBadge(currentCard.status)}
            </div>
            <span className="font-mono text-slate-400">
              Carte {currentIndex + 1} / {reviewItems.length}
            </span>
          </div>

          <div>
            <h4 className="text-base font-semibold text-white leading-relaxed">
              {currentCard.question}
            </h4>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentCard.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrect = idx === currentCard.correctIndex;
              let btnClass = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

              if (isSubmitted) {
                if (isCorrect) {
                  btnClass = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnClass = 'bg-rose-950/60 border-rose-500 text-rose-200';
                } else {
                  btnClass = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-50';
                }
              } else if (isSelected) {
                btnClass = 'bg-indigo-950/70 border-indigo-500 text-white shadow-md';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3.5 text-left text-xs rounded-xl border transition-all cursor-pointer flex items-center justify-between ${btnClass}`}
                >
                  <span>{opt}</span>
                  {isSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />}
                  {isSubmitted && isSelected && !isCorrect && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="pt-2 flex items-center justify-between">
            {!isSubmitted ? (
              <button
                type="button"
                disabled={selectedOption === null}
                onClick={handleValidateAnswer}
                className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl transition-all disabled:opacity-40 cursor-pointer shadow-lg"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNextCard}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-lg"
              >
                Passer à la carte suivante &rarr;
              </button>
            )}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-2 animate-in fade-in">
              <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Explication pédagogique :
              </span>
              <p className="text-slate-300 leading-relaxed">{currentCard.explanation}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-slate-500 text-[11px]">
                  Succès consécutifs : {currentCard.consecutiveSuccesses}/3
                </span>
                <button
                  type="button"
                  onClick={() => onNavigateLesson(currentCard.lessonId)}
                  className="text-indigo-400 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Revoir la leçon complète</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Competency Mastery Matrix */}
      <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Tableau de Maîtrise des Compétences
          </h3>
          <span className="text-xs text-slate-400">Progression globale</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'utilitarian-css', title: 'Classes Utilitaires v4', desc: '@import "tailwindcss", Lightning CSS' },
            { id: 'colors-backgrounds', title: 'Couleurs & Opacités', desc: 'Nuances 50-950, notation /{alpha}' },
            { id: 'box-model', title: 'Modèle de Boîte', desc: 'p-*, m-*, border-*, box-sizing' },
            { id: 'flexbox', title: 'Flexbox Dynamique', desc: 'flex-row, justify, items, gap' },
            { id: 'grid', title: 'CSS Grid 2D', desc: 'grid-cols-*, col-span-*' },
            { id: 'responsive-design', title: 'Mobile-First', desc: 'sm:, md:, lg:, container queries' },
            { id: 'dark-mode', title: 'Mode Sombre & États', desc: 'dark:*, hover:*, focus-visible:*' },
            { id: 'theme-v4', title: 'Design System @theme', desc: 'Variables CSS, valeurs arbitraires' },
          ].map((skill) => {
            const status: SkillStatus = progress.skillsMastery[skill.id] || 'to_discover';
            return (
              <div key={skill.id} className="p-3.5 bg-slate-950 rounded-xl border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-slate-200">{skill.title}</span>
                    {renderStatusBadge(status)}
                  </div>
                  <p className="text-[11px] text-slate-400">{skill.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
