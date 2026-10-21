import React, { useState } from 'react';
import { Layers, HelpCircle, CheckCircle2 } from 'lucide-react';

export const BoxModelVisualizer: React.FC = () => {
  const [padding, setPadding] = useState<number>(24);
  const [margin, setMargin] = useState<number>(24);
  const [borderWidth, setBorderWidth] = useState<number>(4);
  const [contentWidth, setContentWidth] = useState<number>(220);
  const [contentHeight, setContentHeight] = useState<number>(90);
  const [boxSizing, setBoxSizing] = useState<'border-box' | 'content-box'>('border-box');
  const [activeLayer, setActiveLayer] = useState<'content' | 'padding' | 'border' | 'margin' | null>(null);

  // Total width calculation
  const totalWidth =
    boxSizing === 'border-box'
      ? contentWidth + margin * 2
      : contentWidth + (padding + borderWidth + margin) * 2;

  const totalHeight =
    boxSizing === 'border-box'
      ? contentHeight + margin * 2
      : contentHeight + (padding + borderWidth + margin) * 2;

  const renderedContentW = boxSizing === 'border-box'
    ? Math.max(80, contentWidth - (padding + borderWidth) * 2)
    : contentWidth;

  const renderedContentH = boxSizing === 'border-box'
    ? Math.max(40, contentHeight - (padding + borderWidth) * 2)
    : contentHeight;

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Simulateur Interactif : Le Box Model CSS</h4>
            <p className="text-xs text-slate-400">Comprendre le rôle de chaque couche et l'impact décisif de box-sizing</p>
          </div>
        </div>

        {/* Box sizing toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setBoxSizing('border-box')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
              boxSizing === 'border-box'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            box-sizing: border-box (Recommandé)
          </button>
          <button
            type="button"
            onClick={() => setBoxSizing('content-box')}
            className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
              boxSizing === 'content-box'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            box-sizing: content-box (Défaut)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Visual Box Layers Stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center py-6 px-4 bg-slate-900/60 rounded-xl border border-slate-800/40 min-h-[340px]">
          {/* MARGIN LAYER */}
          <div
            onMouseEnter={() => setActiveLayer('margin')}
            onMouseLeave={() => setActiveLayer(null)}
            className={`transition-all duration-150 rounded-xl border-2 border-dashed ${
              activeLayer === 'margin' ? 'bg-amber-500/25 border-amber-400 shadow-lg' : 'bg-amber-500/10 border-amber-500/30'
            }`}
            style={{ padding: `${Math.max(12, margin / 2)}px` }}
          >
            <div className="text-[10px] font-mono text-amber-300 font-bold mb-1 flex items-center justify-between">
              <span>MARGIN (Marge externe)</span>
              <span>{margin}px</span>
            </div>

            {/* BORDER LAYER */}
            <div
              onMouseEnter={() => setActiveLayer('border')}
              onMouseLeave={() => setActiveLayer(null)}
              className={`transition-all duration-150 rounded-lg ${
                activeLayer === 'border' ? 'bg-sky-500/30 border-sky-400 shadow-md' : 'bg-sky-500/15 border-sky-500/40'
              }`}
              style={{
                borderWidth: `${borderWidth}px`,
                borderColor: '#38bdf8',
                borderStyle: 'solid',
                padding: '4px',
              }}
            >
              <div className="text-[10px] font-mono text-sky-300 font-bold mb-1 flex items-center justify-between">
                <span>BORDER (Bordure)</span>
                <span>{borderWidth}px</span>
              </div>

              {/* PADDING LAYER */}
              <div
                onMouseEnter={() => setActiveLayer('padding')}
                onMouseLeave={() => setActiveLayer(null)}
                className={`transition-all duration-150 rounded-md ${
                  activeLayer === 'padding' ? 'bg-emerald-500/30 border border-emerald-400' : 'bg-emerald-500/10 border border-emerald-500/30'
                }`}
                style={{ padding: `${Math.max(12, padding / 2)}px` }}
              >
                <div className="text-[10px] font-mono text-emerald-300 font-bold mb-1 flex items-center justify-between">
                  <span>PADDING (Coussin interne)</span>
                  <span>{padding}px</span>
                </div>

                {/* CONTENT LAYER */}
                <div
                  onMouseEnter={() => setActiveLayer('content')}
                  onMouseLeave={() => setActiveLayer(null)}
                  className={`transition-all duration-150 bg-indigo-600/90 text-white rounded p-3 text-center shadow-md flex flex-col items-center justify-center ${
                    activeLayer === 'content' ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900' : ''
                  }`}
                  style={{
                    width: `${Math.min(260, Math.max(110, renderedContentW))}px`,
                    minHeight: `${Math.max(45, renderedContentH)}px`,
                  }}
                >
                  <p className="text-xs font-bold font-mono tracking-tight">CONTENT</p>
                  <p className="text-[11px] text-indigo-200 mt-0.5 font-mono">
                    {Math.round(renderedContentW)} &times; {Math.round(renderedContentH)}px
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Mathematical breakdown */}
          <div className="mt-4 pt-3 border-t border-slate-800/80 w-full flex flex-wrap items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              Largeur occupée totale : <strong className="text-slate-100 font-mono">{totalWidth}px</strong>
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              {boxSizing === 'border-box'
                ? `width (${contentWidth}px) + marges (${margin * 2}px)`
                : `width (${contentWidth}px) + padding (${padding * 2}px) + bordures (${borderWidth * 2}px) + marges (${margin * 2}px)`}
            </span>
          </div>
        </div>

        {/* Sliders & Controls Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Content width slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-indigo-400 font-medium">Largeur déclarée (width)</span>
              <span className="font-mono text-slate-300">{contentWidth}px</span>
            </div>
            <input
              type="range"
              min="140"
              max="280"
              step="10"
              value={contentWidth}
              onChange={(e) => setContentWidth(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          {/* Padding slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-emerald-400 font-medium">Padding intérieur</span>
              <span className="font-mono text-slate-300">{padding}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="4"
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400">Écarte le texte des parois intérieures.</p>
          </div>

          {/* Margin slider */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-amber-400 font-medium">Marge extérieure (margin)</span>
              <span className="font-mono text-slate-300">{margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              step="4"
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
            <p className="text-[11px] text-slate-400">Crée du vide autour du composant pour repousser ses voisins.</p>
          </div>

          {/* Border buttons */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-sky-400 font-medium">Épaisseur de bordure (border-width)</span>
              <span className="font-mono text-slate-300">{borderWidth}px</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[0, 2, 4, 8].map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBorderWidth(b)}
                  className={`py-1 text-xs font-mono font-medium rounded-lg border transition-all cursor-pointer ${
                    borderWidth === b
                      ? 'bg-sky-500/20 border-sky-400 text-sky-300'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {b}px
                </button>
              ))}
            </div>
          </div>

          {/* Real-world takeaway */}
          <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30 text-xs text-slate-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed">
              <strong className="text-white">Règle d'or :</strong> Définir <code className="text-indigo-300 font-mono">* &#123; box-sizing: border-box; &#125;</code> en début de projet évite que les paddings et les bordures n'élargissent vos boîtes à votre insu.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
