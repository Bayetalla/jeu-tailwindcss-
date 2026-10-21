import React, { useState } from 'react';
import { Play, RotateCcw, Sparkles, Copy, Check } from 'lucide-react';

export const AnimationVisualizer: React.FC = () => {
  const [animationType, setAnimationType] = useState<'pulse' | 'bounce' | 'spin' | 'slide' | 'glow'>('bounce');
  const [duration, setDuration] = useState<number>(1.2);
  const [delay, setDelay] = useState<number>(0);
  const [timingFunction, setTimingFunction] = useState<string>('cubic-bezier(0.34, 1.56, 0.64, 1)');
  const [iterationCount, setIterationCount] = useState<'infinite' | '1' | '3'>('infinite');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const timingPresets = [
    { label: 'Spring Bounce (Cubic)', val: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
    { label: 'Ease (Fluide)', val: 'ease' },
    { label: 'Ease-in-out', val: 'ease-in-out' },
    { label: 'Linear (Constant)', val: 'linear' },
  ];

  const keyframesDefs = `/* Définition des keyframes CSS */
@keyframes quest-${animationType} {
  ${
    animationType === 'bounce'
      ? `0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-40px); }`
      : animationType === 'pulse'
      ? `0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.8; }`
      : animationType === 'spin'
      ? `0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }`
      : animationType === 'slide'
      ? `0% { transform: translateX(-60px); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(60px); opacity: 0; }`
      : `0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
  50% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.8), 0 0 60px rgba(59, 130, 246, 0.5); }`
  }
}

.element-anime {
  animation-name: quest-${animationType};
  animation-duration: ${duration}s;
  animation-timing-function: ${timingFunction};
  animation-delay: ${delay}s;
  animation-iteration-count: ${iterationCount};
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(keyframesDefs);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const restartAnimation = () => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 50);
  };

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <style>{`
        @keyframes custom-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-40px); }
        }
        @keyframes custom-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.25); opacity: 0.85; }
        }
        @keyframes custom-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes custom-slide {
          0% { transform: translateX(-60px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(60px); opacity: 0; }
        }
        @keyframes custom-glow {
          0%, 100% { box-shadow: 0 0 10px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 35px rgba(168, 85, 247, 0.8), 0 0 60px rgba(59, 130, 246, 0.5); }
        }
      `}</style>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Laboratoire de Transitions & Animations (@keyframes)</h4>
            <p className="text-xs text-slate-400">Courbes de Bézier, timing functions, durées et images clés en direct</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-lg text-xs font-mono transition-colors cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copié !' : 'Copier le CSS'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Stage */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center min-h-[300px] p-6 bg-slate-900/40 rounded-xl border border-slate-800/80 relative">
          <div className="flex items-center justify-center h-48 w-full">
            {isPlaying && (
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white font-mono text-xs font-bold shadow-2xl"
                style={{
                  animationName: `custom-${animationType}`,
                  animationDuration: `${duration}s`,
                  animationTimingFunction: timingFunction,
                  animationDelay: `${delay}s`,
                  animationIterationCount: iterationCount,
                }}
              >
                <Sparkles className="w-6 h-6 mb-1 text-white" />
                <span>{animationType}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              type="button"
              onClick={restartAnimation}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-mono transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Relancer l'animation</span>
            </button>
            <span className="text-xs text-slate-400 font-mono">
              Durée : {duration}s · Timing : {timingFunction.split('(')[0]}
            </span>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Keyframes Selector */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2">
            <span className="text-xs font-semibold text-slate-200 block">
              1. Choisir le type d'@keyframes
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {(['bounce', 'pulse', 'spin', 'slide', 'glow'] as const).map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAnimationType(type)}
                  className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    animationType === type
                      ? 'bg-pink-600 border-pink-400 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Timing function presets */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
            <span className="text-xs font-semibold text-slate-200 block">
              2. Courbe d'accélération (timing-function)
            </span>
            <div className="space-y-1">
              {timingPresets.map((t) => (
                <button
                  key={t.val}
                  type="button"
                  onClick={() => setTimingFunction(t.val)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    timingFunction === t.val
                      ? 'bg-pink-500/20 border-pink-400 text-pink-300 font-bold'
                      : 'bg-slate-800/40 border-slate-700 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[11px] text-slate-200">{t.label}</div>
                  <div className="text-[10px] text-pink-400/80 truncate">{t.val}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders duration and delay */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Durée</span>
                <span className="font-mono text-pink-400">{duration}s</span>
              </div>
              <input
                type="range"
                min="0.4"
                max="3.0"
                step="0.2"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Délai</span>
                <span className="font-mono text-pink-400">{delay}s</span>
              </div>
              <input
                type="range"
                min="0"
                max="2.0"
                step="0.2"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
