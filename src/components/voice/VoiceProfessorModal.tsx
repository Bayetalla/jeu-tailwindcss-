import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Send,
  X,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  Gauge,
  Code,
} from 'lucide-react';
import { useVoiceAssistant } from './useVoiceAssistant';

interface VoiceProfessorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLessonTitle?: string;
  currentCode?: string;
}

export const VoiceProfessorModal: React.FC<VoiceProfessorModalProps> = ({
  isOpen,
  onClose,
  currentLessonTitle,
  currentCode,
}) => {
  const {
    isListening,
    isSpeaking,
    isPaused,
    isThinking,
    speechRate,
    setSpeechRate,
    transcript,
    lastResponse,
    hasSpeechRecognition,
    error,
    startListening,
    stopListening,
    speakText,
    stopSpeaking,
    pauseSpeaking,
    resumeSpeaking,
    repeatLastMessage,
    askProfessor,
  } = useVoiceAssistant({ currentLessonTitle, currentCode });

  const [inputMessage, setInputMessage] = useState<string>('');

  if (!isOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isThinking) return;
    askProfessor(inputMessage, 'chat');
    setInputMessage('');
  };

  const predefinedPrompts = [
    {
      label: 'Pourquoi cette propriété ?',
      action: () =>
        askProfessor(
          'Pourquoi cette propriété CSS fonctionne-t-elle ainsi ? Quel problème résout-elle en profondeur ?',
          'why'
        ),
    },
    {
      label: 'Explique pour débutant',
      action: () =>
        askProfessor(
          'Explique-moi cette notion comme si j\'étais un débutant complet avec une analogie simple.',
          'beginner'
        ),
    },
    {
      label: 'Donne-moi un indice',
      action: () =>
        askProfessor(
          'Donne-moi un indice pédagogique pour m\'aider à résoudre le défi sans révéler la solution.',
          'hint'
        ),
    },
    {
      label: 'Montre un exemple concret',
      action: () =>
        askProfessor(
          'Montre-moi un exemple concret d\'utilisation de cette notion dans une vraie application.',
          'example'
        ),
    },
    {
      label: 'Explique le code ligne par ligne',
      action: () =>
        askProfessor(
          'Explique ce code CSS ligne par ligne en détaillant chaque déclaration.',
          'explain_code'
        ),
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-emerald-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Professeur CSS Quest</span>
                <span className="text-[10px] font-mono font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  Assistant Vocal & IA
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                {currentLessonTitle ? `Contexte : ${currentLessonTitle}` : 'Posez vos questions sur le CSS moderne'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Professor Speech bubble */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-indigo-400">
                {isThinking ? 'Le Professeur réfléchit...' : 'Réponse du Professeur :'}
              </span>

              {/* Audio controls strip */}
              <div className="flex items-center gap-2">
                {isSpeaking && (
                  <button
                    type="button"
                    onClick={isPaused ? resumeSpeaking : pauseSpeaking}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                    title={isPaused ? 'Reprendre la lecture' : 'Mettre en pause'}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                )}

                <button
                  type="button"
                  onClick={repeatLastMessage}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors cursor-pointer"
                  title="Répéter la réponse à voix haute"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                {isSpeaking && (
                  <button
                    type="button"
                    onClick={stopSpeaking}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-rose-400 text-xs transition-colors cursor-pointer"
                    title="Arrêter la lecture"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            <p className="text-sm text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
              {lastResponse}
            </p>

            {/* Audio speed buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Gauge className="w-3.5 h-3.5 text-indigo-400" />
                <span>Débit vocal :</span>
              </span>
              <div className="flex gap-1.5">
                {[
                  { label: '0.8x (Ralenti)', val: 0.8 },
                  { label: '1.0x (Normal)', val: 1.0 },
                  { label: '1.2x (Rapide)', val: 1.2 },
                ].map((s) => (
                  <button
                    key={s.val}
                    type="button"
                    onClick={() => setSpeechRate(s.val)}
                    className={`px-2 py-0.5 rounded cursor-pointer transition-colors ${
                      speechRate === s.val
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Predefined Questions */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-medium text-slate-400">
              Questions suggérées en un clic :
            </span>
            <div className="flex flex-wrap gap-2">
              {predefinedPrompts.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  disabled={isThinking}
                  onClick={q.action}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer text-left"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* Error notice if speech recognition unavail */}
          {error && (
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
              {error}
            </div>
          )}

          {/* Live speech recognition transcription indicator */}
          {isListening && (
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <span>Écoute en cours... &ldquo;{transcript || 'Parlez maintenant...'}&rdquo;</span>
            </div>
          )}
        </div>

        {/* Footer input form */}
        <div className="p-4 bg-slate-900/60 border-t border-slate-800/80">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            {/* Microphone button (Never activated without explicit user action) */}
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isListening
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title={
                hasSpeechRecognition
                  ? isListening
                    ? 'Arrêter l\'écoute'
                    : 'Dicter une question au micro'
                  : 'Reconnaissance vocale non disponible'
              }
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Posez votre question sur une règle ou un concept CSS..."
              disabled={isThinking}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() || isThinking}
              className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
            Commandes vocales reconnues : &quot;répéter&quot;, &quot;ralentir&quot;, &quot;plus vite&quot;, &quot;pause&quot;, &quot;reprendre&quot;.
          </p>
        </div>
      </div>
    </div>
  );
};
