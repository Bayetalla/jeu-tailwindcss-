import React, { useState } from 'react';
import { Palette, Copy, Check, SlidersHorizontal } from 'lucide-react';

export const VariablesVisualizer: React.FC = () => {
  const [primaryColor, setPrimaryColor] = useState<string>('#3b82f6');
  const [borderRadius, setBorderRadius] = useState<number>(12);
  const [padding, setPadding] = useState<number>(20);
  const [fontSize, setFontSize] = useState<number>(15);
  const [copied, setCopied] = useState<boolean>(false);

  const generatedCss = `:root {
  --theme-primary: ${primaryColor};
  --theme-radius: ${borderRadius}px;
  --theme-padding: ${padding}px;
  --theme-font-size: ${fontSize}px;
}

/* Les composants héritent instantanément sans changer leur CSS interne ! */
.carte-profil {
  padding: var(--theme-padding);
  border-radius: var(--theme-radius);
  font-size: var(--theme-font-size);
  border: 1px solid var(--theme-primary);
}

.bouton-action {
  background-color: var(--theme-primary);
  border-radius: calc(var(--theme-radius) / 2);
  padding: 8px 16px;
}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Laboratoire des Variables CSS (:root & var())</h4>
            <p className="text-xs text-slate-400">Modifiez un token et observez la propagation immédiate sur l'interface</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Live UI Card Propagating CSS Variables */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[300px] p-6 bg-slate-900/40 rounded-xl border border-slate-800/80">
          <div
            className="w-full max-w-sm bg-slate-900 transition-all duration-150 shadow-2xl border"
            style={{
              padding: `${padding}px`,
              borderRadius: `${borderRadius}px`,
              borderColor: primaryColor,
              boxShadow: `0 10px 30px -10px ${primaryColor}40`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                style={{
                  color: primaryColor,
                  backgroundColor: `${primaryColor}20`,
                }}
              >
                Design System Token
              </span>
              <span className="text-xs text-slate-400 font-mono">var(--theme-*)</span>
            </div>

            <h5
              className="font-bold text-white mb-2 transition-all"
              style={{ fontSize: `${fontSize * 1.25}px` }}
            >
              Composant Réactif
            </h5>

            <p
              className="text-slate-300 mb-4 transition-all leading-relaxed"
              style={{ fontSize: `${fontSize}px` }}
            >
              Toutes les dimensions et couleurs proviennent des variables globales définies dans <code className="text-slate-200">:root</code>.
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <span className="font-mono text-xs text-slate-400">
                radius: {borderRadius}px
              </span>
              <button
                type="button"
                className="px-4 py-2 font-bold text-white transition-all hover:opacity-90 active:scale-95 shadow cursor-pointer text-xs"
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: `${Math.max(4, borderRadius / 2)}px`,
                }}
              >
                Bouton Stylisé
              </button>
            </div>
          </div>
        </div>

        {/* Sliders Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Color palette options */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2">
            <span className="text-xs font-semibold text-slate-200 block">
              1. --theme-primary <span className="text-slate-500 font-mono">({primaryColor})</span>
            </span>
            <div className="grid grid-cols-5 gap-2">
              {[
                { label: 'Bleu', hex: '#3b82f6' },
                { label: 'Émeraude', hex: '#10b981' },
                { label: 'Violet', hex: '#8b5cf6' },
                { label: 'Ambre', hex: '#f59e0b' },
                { label: 'Rose', hex: '#ec4899' },
              ].map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setPrimaryColor(c.hex)}
                  className={`h-8 rounded-lg transition-transform cursor-pointer border ${
                    primaryColor === c.hex ? 'ring-2 ring-white scale-110' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: c.hex, borderColor: `${c.hex}80` }}
                  title={c.label}
                />
              ))}
            </div>
          </div>

          {/* Border radius slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">--theme-radius (Arrondi)</span>
              <span className="font-mono text-teal-400">{borderRadius}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="28"
              step="2"
              value={borderRadius}
              onChange={(e) => setBorderRadius(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Padding slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">--theme-padding (Espacement)</span>
              <span className="font-mono text-teal-400">{padding}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="36"
              step="4"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Font size slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">--theme-font-size (Typographie)</span>
              <span className="font-mono text-teal-400">{fontSize}px</span>
            </div>
            <input
              type="range"
              min="12"
              max="20"
              step="1"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
