import React, { useState } from 'react';
import { LayoutGrid, Copy, Check, Info } from 'lucide-react';

export const GridVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'tracks' | 'areas'>('tracks');
  const [colsPreset, setColsPreset] = useState<string>('repeat(3, 1fr)');
  const [gapPx, setGapPx] = useState<number>(16);
  const [firstItemColSpan, setFirstItemColSpan] = useState<number>(2);
  const [showGridLines, setShowGridLines] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const tracksCode = `.grille-conteneur {
  display: grid;
  grid-template-columns: ${colsPreset};
  gap: ${gapPx}px;
}
${
  firstItemColSpan > 1
    ? `\n/* Première boîte fusionnée */\n.item-1 {\n  grid-column: span ${firstItemColSpan};\n}`
    : ''
}`;

  const areasCode = `.page-layout {
  display: grid;
  grid-template-areas:
    "header  header"
    "sidebar main"
    "footer  footer";
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 50px;
  gap: ${gapPx}px;
  min-height: 280px;
}

.header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main    { grid-area: main; }
.footer  { grid-area: footer; }`;

  const currentCode = mode === 'tracks' ? tracksCode : areasCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <LayoutGrid className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Laboratoire Interactif CSS Grid (2D)</h4>
            <p className="text-xs text-slate-400">Maîtrisez les unités fr, minmax, auto-fit et grid-template-areas</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode switch */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setMode('tracks')}
              className={`px-2.5 py-1 rounded-md font-mono cursor-pointer transition-colors ${
                mode === 'tracks' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Pistes & Spans
            </button>
            <button
              type="button"
              onClick={() => setMode('areas')}
              className={`px-2.5 py-1 rounded-md font-mono cursor-pointer transition-colors ${
                mode === 'areas' ? 'bg-emerald-600 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              grid-template-areas
            </button>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-lg text-xs font-mono transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié' : 'Copier'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stage */}
        <div className="lg:col-span-7 flex flex-col justify-center min-h-[320px] p-4 bg-slate-900/40 rounded-xl border border-slate-800/80">
          {mode === 'tracks' ? (
            <div className="relative">
              {showGridLines && (
                <div className="absolute -top-5 left-0 right-0 flex justify-between text-[10px] font-mono text-emerald-400/80 px-4">
                  <span>Ligne 1</span>
                  <span>Ligne 2</span>
                  <span>Ligne 3</span>
                  <span>Ligne 4</span>
                </div>
              )}

              <div
                className="w-full min-h-[240px] p-4 bg-slate-950/80 border-2 border-dashed border-emerald-500/30 rounded-xl transition-all duration-200"
                style={{
                  display: 'grid',
                  gridTemplateColumns: colsPreset,
                  gap: `${gapPx}px`,
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => {
                  const isSpanned = i === 0 && firstItemColSpan > 1;
                  return (
                    <div
                      key={i}
                      className={`p-4 rounded-lg flex flex-col justify-center items-center font-mono text-xs shadow transition-all ${
                        isSpanned
                          ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold'
                          : 'bg-slate-800/90 text-slate-200 border border-slate-700/60'
                      }`}
                      style={{
                        gridColumn: isSpanned ? `span ${firstItemColSpan}` : undefined,
                      }}
                    >
                      <span className="font-bold">Boîte #{i + 1}</span>
                      {isSpanned && (
                        <span className="text-[10px] text-emerald-100 font-normal mt-0.5">
                          grid-column: span {firstItemColSpan}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div
              className="w-full min-h-[260px] p-3 bg-slate-950/80 border-2 border-dashed border-emerald-500/30 rounded-xl transition-all"
              style={{
                display: 'grid',
                gridTemplateAreas: '"header header" "sidebar main" "footer footer"',
                gridTemplateColumns: '160px 1fr',
                gridTemplateRows: '50px 1fr 45px',
                gap: `${gapPx}px`,
              }}
            >
              <div
                style={{ gridArea: 'header' }}
                className="bg-indigo-600 text-white font-mono text-xs font-bold rounded-lg flex items-center justify-center p-2 shadow"
              >
                HEADER (En-tête de page)
              </div>
              <div
                style={{ gridArea: 'sidebar' }}
                className="bg-slate-800 border border-slate-700 text-slate-200 font-mono text-xs font-semibold rounded-lg flex items-center justify-center p-2 shadow"
              >
                SIDEBAR (Menu)
              </div>
              <div
                style={{ gridArea: 'main' }}
                className="bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 font-mono text-xs font-semibold rounded-lg flex flex-col items-center justify-center p-4 shadow"
              >
                <span className="font-bold">MAIN (Contenu principal)</span>
                <span className="text-[10px] text-emerald-300 mt-1">grid-area: main</span>
              </div>
              <div
                style={{ gridArea: 'footer' }}
                className="bg-slate-900 border border-slate-800 text-slate-400 font-mono text-xs rounded-lg flex items-center justify-center p-2"
              >
                FOOTER (Pied de page)
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-[11px]">
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>{mode === 'tracks' ? 'Unité fr = fraction de l\'espace libre' : 'grid-template-areas associe des mots simples aux cellules'}</span>
            </span>
            {mode === 'tracks' && (
              <label className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-300">
                <input
                  type="checkbox"
                  checked={showGridLines}
                  onChange={(e) => setShowGridLines(e.target.checked)}
                  className="rounded text-emerald-500 focus:ring-0"
                />
                <span>Lignes de grille</span>
              </label>
            )}
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {mode === 'tracks' ? (
            <>
              {/* Columns Presets */}
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2">
                <span className="text-xs font-semibold text-slate-300 block">
                  1. grid-template-columns
                </span>
                <div className="space-y-1.5">
                  {[
                    { label: '3 colonnes égales (1fr 1fr 1fr)', val: 'repeat(3, 1fr)' },
                    { label: 'Responsive auto-fit minmax(130px, 1fr)', val: 'repeat(auto-fit, minmax(130px, 1fr))' },
                    { label: 'Mise en page asymétrique (1fr 2fr 1fr)', val: '1fr 2fr 1fr' },
                    { label: 'Sidebar fixe + reste fluide (180px 1fr)', val: '180px 1fr' },
                  ].map((preset) => (
                    <button
                      key={preset.val}
                      type="button"
                      onClick={() => setColsPreset(preset.val)}
                      className={`w-full text-left p-2 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                        colsPreset === preset.val
                          ? 'bg-emerald-600/20 border-emerald-400 text-emerald-300 font-semibold'
                          : 'bg-slate-800/40 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[11px] text-slate-300">{preset.label}</div>
                      <div className="text-[10px] text-emerald-400/90 mt-0.5">{preset.val}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Span control */}
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-emerald-400 font-semibold">Fusion Boîte #1 (grid-column: span X)</span>
                  <span className="font-mono text-slate-300">{firstItemColSpan} col(s)</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setFirstItemColSpan(s)}
                      className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                        firstItemColSpan === s
                          ? 'bg-emerald-600 border-emerald-400 text-white font-bold'
                          : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      span {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2 text-xs text-slate-300">
              <p className="font-semibold text-emerald-400">Pourquoi utiliser grid-template-areas ?</p>
              <p className="text-[11px] leading-relaxed text-slate-400">
                Vous dessinez visuellement le plan de votre page directement en texte ASCII.
                Chaque élément assigne ensuite sa zone avec <code className="text-emerald-300">grid-area: header;</code>.
              </p>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                &quot;header header&quot;<br />
                &quot;sidebar main&quot;<br />
                &quot;footer footer&quot;
              </div>
            </div>
          )}

          {/* Gap control */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-semibold">Espacement (gap)</span>
              <span className="font-mono text-slate-400">{gapPx}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="32"
              step="4"
              value={gapPx}
              onChange={(e) => setGapPx(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
