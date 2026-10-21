import React, { useState } from 'react';
import {
  Volume2,
  VolumeX,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  RotateCw,
  Code2,
  Eye,
  Check,
  Maximize2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Lesson, UserProgress } from '../../types';
import { markLessonComplete, addReviewMistake } from '../../services/storage';
import { VisualizerRenderer } from '../visualizers/VisualizerRenderer';

interface LessonViewProps {
  lesson: Lesson;
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onNavigateLesson: (lessonId: string) => void;
  onOpenVoiceTutor: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  lesson,
  progress,
  onProgressUpdate,
  onNavigateLesson,
  onOpenVoiceTutor,
}) => {
  // Voice Speech State
  const [isSpeakingSection, setIsSpeakingSection] = useState<string | null>(null);

  // Mini-Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Exercise State
  const [userCss, setUserCss] = useState<string>(lesson.interactiveExercise.starterCss);
  const [exerciseSubmitted, setExerciseSubmitted] = useState<boolean>(false);
  const [exercisePassed, setExercisePassed] = useState<boolean>(false);
  const [showHintIndex, setShowHintIndex] = useState<number>(-1);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [previewTab, setPreviewTab] = useState<'user' | 'solution'>('user');

  // Flashcard Flip State
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Check if completed
  const isCompleted = progress.completedLessonIds.includes(lesson.id);

  // TTS helper in French
  const speakFrench = (text: string, sectionKey: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeakingSection === sectionKey) {
      window.speechSynthesis.cancel();
      setIsSpeakingSection(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[{}`*#]/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'fr-FR';
    utterance.rate = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find((v) => v.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;

    utterance.onstart = () => setIsSpeakingSection(sectionKey);
    utterance.onend = () => setIsSpeakingSection(null);
    utterance.onerror = () => setIsSpeakingSection(null);

    window.speechSynthesis.speak(utterance);
  };

  // Handle Quiz Submission
  const handleValidateQuiz = () => {
    if (selectedQuizOption === null) return;
    setQuizSubmitted(true);
    const isCorrect = selectedQuizOption === lesson.miniQuiz.correctIndex;

    if (!isCorrect) {
      const updated = addReviewMistake({
        lessonId: lesson.id,
        conceptTitle: lesson.title,
        question: lesson.miniQuiz.question,
        options: lesson.miniQuiz.options,
        correctIndex: lesson.miniQuiz.correctIndex,
        explanation: lesson.miniQuiz.explanation,
      });
      onProgressUpdate(updated);
    }
  };

  // Validate exercise code
  const handleValidateExercise = () => {
    setExerciseSubmitted(true);

    // Normalize CSS for comparison
    const normalizedUserCss = userCss.replace(/\s+/g, ' ').toLowerCase();

    // Check if expected rules are included
    const allRulesMet = lesson.interactiveExercise.expectedCssRules.every((rule) =>
      normalizedUserCss.includes(rule.toLowerCase().replace(/\s+/g, ' '))
    );

    if (allRulesMet) {
      setExercisePassed(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
      const updated = markLessonComplete(lesson.id, lesson.xpReward);
      onProgressUpdate(updated);
    } else {
      setExercisePassed(false);
    }
  };

  const handleResetExercise = () => {
    setUserCss(lesson.interactiveExercise.starterCss);
    setExerciseSubmitted(false);
    setExercisePassed(false);
    setShowSolution(false);
  };

  // Secure HTML+CSS Sandboxed iframe srcdoc
  const generatePreviewDoc = (cssCode: string) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #0b0f17;
            color: #f8fafc;
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 16px;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${lesson.interactiveExercise.starterHtml}
      </body>
    </html>
  `;

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <button
            type="button"
            onClick={() => onNavigateLesson('dashboard')}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer mb-1.5 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Retour aux Mondes</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
              {lesson.levelTitle}
            </span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-xs text-slate-400 font-mono">{lesson.readingTimeMinutes} min de quête</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {isCompleted && (
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span>Complétée (+{lesson.xpReward} XP)</span>
            </span>
          )}

          <button
            type="button"
            onClick={() =>
              speakFrench(
                `${lesson.title}. Définition : ${lesson.simpleDefinition}. Analogie : ${lesson.beginnerAnalogy}`,
                'lesson-overview'
              )
            }
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
          >
            {isSpeakingSection === 'lesson-overview' ? (
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-indigo-400" />
            )}
            <span>{isSpeakingSection === 'lesson-overview' ? 'Arrêter' : 'Écouter'}</span>
          </button>
        </div>
      </div>

      {/* 1. ÉTAPE DÉCOUVRIR (Le problème concret) */}
      <section className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
            <span>Étape 1 &middot; Découvrir le problème concret</span>
          </div>
          <button
            type="button"
            onClick={() => speakFrench(lesson.problemContext, 'step-problem')}
            className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
            title="Écouter le problème"
          >
            <Volume2 className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed">
          {lesson.problemContext}
        </p>
      </section>

      {/* 2. ÉTAPE COMPRENDRE (Définition simple & analogie débutant) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Simple Definition */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Étape 2 &middot; Comprendre avec des mots simples
            </span>
            <button
              type="button"
              onClick={() => speakFrench(lesson.simpleDefinition, 'step-def')}
              className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h3 className="text-base font-bold text-white">{lesson.conceptName}</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {lesson.simpleDefinition}
          </p>
          <div className="pt-2">
            <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
              <code>{lesson.syntaxExample}</code>
            </pre>
          </div>
        </div>

        {/* Beginner Analogy */}
        <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/20 space-y-2 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400 uppercase">
                Analogie pour débutant
              </span>
              <button
                type="button"
                onClick={() => speakFrench(lesson.beginnerAnalogy, 'step-analogy')}
                className="text-slate-400 hover:text-indigo-400 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-start gap-3 mt-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed italic">
                &ldquo;{lesson.beginnerAnalogy}&rdquo;
              </p>
            </div>
          </div>

          {lesson.browserSupport && (
            <div className="pt-3 border-t border-indigo-500/10 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Compatibilité :</span>
              <span className="text-emerald-400">{lesson.browserSupport}</span>
            </div>
          )}
        </div>
      </section>

      {/* 3 & 4. ÉTAPES VISUALISER & MANIPULER (Schéma Interactif) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase">
            Étapes 3 & 4 &middot; Visualiser & Manipuler le concept
          </span>
          <span className="text-xs text-slate-500 font-mono">Modifiez les contrôles ci-dessous</span>
        </div>
        <VisualizerRenderer type={lesson.visualSchemaType} caption={lesson.visualSchemaCaption} />
      </section>

      {/* 5. ÉTAPE PRATIQUER (Défi interactif avec éditeur HTML/CSS) */}
      <section className="p-5 sm:p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Étape 5 &middot; Défi Pratique</h3>
              <p className="text-xs text-slate-400">{lesson.interactiveExercise.instruction}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetExercise}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
              title="Réinitialiser le code de départ"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                setShowHintIndex((prev) =>
                  prev < lesson.interactiveExercise.hints.length - 1 ? prev + 1 : 0
                );
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-mono transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Indice ({showHintIndex + 1}/{lesson.interactiveExercise.hints.length})</span>
            </button>
          </div>
        </div>

        {/* Display hint if active */}
        {showHintIndex >= 0 && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center justify-between">
            <span>💡 {lesson.interactiveExercise.hints[showHintIndex]}</span>
            <button
              type="button"
              onClick={() => speakFrench(lesson.interactiveExercise.hints[showHintIndex], 'hint-read')}
              className="text-amber-400 hover:text-amber-200 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Split Editor and Sandboxed Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* CSS Editor Panel */}
          <div className="lg:col-span-7 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Éditeur CSS (Modifiez les règles)</span>
              <span>{lesson.interactiveExercise.expectedCssRules.length} règles attendues</span>
            </div>
            <textarea
              value={userCss}
              onChange={(e) => {
                setUserCss(e.target.value);
                setExerciseSubmitted(false);
              }}
              rows={8}
              spellCheck={false}
              className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors resize-y leading-relaxed"
            />
            <div className="text-[11px] text-slate-500 font-mono">
              HTML sous-jacent : <code>{lesson.interactiveExercise.starterHtml.replace(/\n/g, ' ')}</code>
            </div>
          </div>

          {/* Sandboxed Live Preview Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <Eye className="w-3.5 h-3.5 text-sky-400" />
                <span>Prévisualisation isolée</span>
              </div>
              <div className="flex items-center gap-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => setPreviewTab('user')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    previewTab === 'user' ? 'bg-indigo-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Votre code
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTab('solution')}
                  className={`px-2 py-0.5 rounded cursor-pointer ${
                    previewTab === 'solution' ? 'bg-emerald-600 text-white' : 'text-slate-400'
                  }`}
                >
                  Cible
                </button>
              </div>
            </div>

            <div className="relative h-44 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-inner flex items-center justify-center">
              <iframe
                title="Prévisualisation isolée"
                srcDoc={generatePreviewDoc(
                  previewTab === 'user' ? userCss : lesson.interactiveExercise.solutionCss
                )}
                sandbox="allow-scripts"
                className="w-full h-full border-0 pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Exercise Action & Feedback Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
          <div>
            {exerciseSubmitted && (
              <div className="flex items-center gap-2 text-xs font-semibold">
                {exercisePassed ? (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" />
                    <span>Défi réussi ! Vos règles CSS sont valides.</span>
                  </span>
                ) : (
                  <span className="text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Presque ! Vérifiez les propriétés attendues ou consultez un indice.</span>
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSolution(!showSolution)}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
            >
              {showSolution ? 'Masquer la solution' : 'Voir la solution'}
            </button>

            <button
              type="button"
              onClick={handleValidateExercise}
              className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md shadow-emerald-500/20"
            >
              Vérifier ma réponse &rarr;
            </button>
          </div>
        </div>

        {/* 6. ÉTAPE CORRIGER (Solution commentée & erreurs fréquentes) */}
        {showSolution && (
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                Étape 6 &middot; Solution Commentée & Explication
              </span>
              <button
                type="button"
                onClick={() => speakFrench(lesson.detailedCorrection, 'solution-read')}
                className="text-slate-400 hover:text-emerald-400 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto">
              <code>{lesson.interactiveExercise.solutionCss}</code>
            </pre>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lesson.detailedCorrection}
            </p>

            {/* Common Mistakes */}
            {lesson.commonMistakes.length > 0 && (
              <div className="pt-2 border-t border-slate-900 space-y-2">
                <span className="text-[11px] font-mono text-amber-400 font-bold block">
                  Piège fréquent à éviter :
                </span>
                {lesson.commonMistakes.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-slate-900/60 text-xs space-y-1">
                    <p className="text-rose-400 font-medium font-mono text-[11px]">&times; {m.mistake}</p>
                    <p className="text-slate-400 text-[11px]">{m.why}</p>
                    <p className="text-emerald-400 text-[11px]">✓ <strong>Correction :</strong> {m.fix}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* 7. ÉTAPE RÉVISER (Mini-Quiz & Mémorisation Spacée) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mini Quiz */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase">
              Étape 7 &middot; Mini-Quiz de validation
            </span>
            <button
              type="button"
              onClick={() => speakFrench(lesson.miniQuiz.question, 'quiz-q')}
              className="text-slate-400 hover:text-indigo-400 cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="text-xs font-bold text-white">{lesson.miniQuiz.question}</h4>

          <div className="space-y-1.5">
            {lesson.miniQuiz.options.map((option, idx) => {
              const isSelected = selectedQuizOption === idx;
              const isCorrect = idx === lesson.miniQuiz.correctIndex;
              let btnClass = 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800';

              if (quizSubmitted) {
                if (isCorrect) btnClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
                else if (isSelected) btnClass = 'bg-rose-500/20 border-rose-500 text-rose-300';
              } else if (isSelected) {
                btnClass = 'bg-indigo-600/30 border-indigo-500 text-indigo-200';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={quizSubmitted}
                  onClick={() => setSelectedQuizOption(idx)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs transition-colors cursor-pointer ${btnClass}`}
                >
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={selectedQuizOption === null}
                onClick={handleValidateQuiz}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Valider mon choix
              </button>
            ) : (
              <p className="text-xs text-slate-400 italic">
                {lesson.miniQuiz.explanation}
              </p>
            )}
          </div>
        </div>

        {/* Memory Flashcard */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase">
                Flashcard Mémorisation
              </span>
              <span className="text-[11px] text-slate-500 font-mono">Cliquez pour retourner</span>
            </div>

            <div
              onClick={() => setIsFlipped(!isFlipped)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setIsFlipped(!isFlipped); }}
              className="mt-3 p-5 rounded-xl bg-slate-950 border border-indigo-500/30 min-h-[110px] flex flex-col items-center justify-center text-center cursor-pointer transition-transform hover:scale-[1.01]"
            >
              {!isFlipped ? (
                <>
                  <span className="text-xs font-bold text-indigo-300 font-mono mb-1">Question Flash :</span>
                  <p className="text-xs text-slate-200 font-medium">{lesson.memoryFlashcard.front}</p>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold text-emerald-400 font-mono mb-1">Réponse Clé :</span>
                  <p className="text-xs text-white font-mono">{lesson.memoryFlashcard.back}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{lesson.memoryFlashcard.keyRule}</p>
                </>
              )}
            </div>
          </div>

          {/* 3 Key Takeaways */}
          <div className="pt-3 border-t border-slate-800 space-y-1">
            <span className="text-[11px] font-mono text-slate-400 font-semibold block">
              3 points clés à retenir :
            </span>
            <ul className="text-[11px] text-slate-400 space-y-0.5 list-disc list-inside">
              {lesson.keyTakeaways.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Navigation Bar */}
      <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onNavigateLesson('dashboard')}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-mono transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Tableau de Bord</span>
        </button>

        <button
          type="button"
          onClick={onOpenVoiceTutor}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 text-xs font-mono transition-colors cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>Poser une question au Professeur</span>
        </button>
      </div>
    </div>
  );
};
