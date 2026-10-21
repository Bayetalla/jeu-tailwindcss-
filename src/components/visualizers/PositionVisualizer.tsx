import React, { useState } from 'react';
import { Compass, Copy, Check, AlertCircle } from 'lucide-react';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

export const PositionVisualizer: React.FC = () => {
  const [position, setPosition] = useState<PositionType>('relative');
  const [top, setTop] = useState<number>(20);
  const [left, setLeft] = useState<number>(20);
  const [zIndex, setZIndex] = useState<number>(10);
  const [copied, setCopied] = useState<boolean>(false);

  const explanations: Record<PositionType, { title: string; desc: string; flow: string }> = {
    static: {
      title: 'Flux normal (Par défaut)',
      desc: 'L\'élément se place naturellement selon le flux HTML. Les propriétés top, right, bottom, left et z-index n\'ont AUCUN effet.',
      flow: 'Occupe sa place normale dans le document.',
    },
    relative: {
      title: 'Position relative à soi-même',
      desc: 'L\'élément est décalé par rapport à sa position d\'origine. L\'espace initial qu\'il occupait reste réservé dans le flux !',
      flow: 'Laisse son trou vide dans le flux.',
    },
    absolute: {
      title: 'Sorti du flux normal',
      desc: 'L\'élément est retiré du flux et se positionne par rapport à son plus proche parent ayant position: relative/absolute/fixed/sticky.',
      flow: 'Ne réserve aucun espace dans le flux pour les autres éléments.',
    },
    fixed: {
      title: 'Fixé à la fenêtre (Viewport)',
      desc: 'L\'élément reste ancré à l\'écran au même endroit lors du défilement. Idéal pour les barres de navigation et les boutons de contact.',
      flow: 'Totalement indépendant du scroll du document.',
    },
    sticky: {
      title: 'Hybride : relatif puis collant',
      desc: 'L\'élément se comporte en position: relative jusqu\'à ce que le scroll atteigne le seuil (top: 0px), moment où il se fige au bord de son conteneur parent.',
      flow: 'Glisse avec le parent puis colle à l\'écran.',
    },
  };

  const generatedCss = `.boite-cible {
  position: ${position};${
    position !== 'static'
      ? `\n  top: ${top}px;\n  left: ${left}px;\n  z-index: ${zIndex};`
      : ' /* top & left ignorés en static */'
  }
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
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Laboratoire Interactif du Positionnement</h4>
            <p className="text-xs text-slate-400">Comprendre static, relative, absolute, fixed et sticky dans un bac scrollable</p>
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
        {/* Scrollable Stage */}
        <div className="lg:col-span-7 flex flex-col space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Conteneur parent simulé (avec scroll vertical)</span>
            <span className="font-mono text-amber-400">Faites défiler vers le bas &darr;</span>
          </div>

          <div className="relative h-[320px] bg-slate-900/60 border border-slate-800 rounded-xl overflow-y-auto p-4 space-y-3">
            <div className="p-3 bg-slate-800/70 border border-slate-700/50 rounded-lg text-xs text-slate-300">
              Bloc de texte introductif (flux normal A).
            </div>

            {/* Target Element Container */}
            <div className="relative p-4 bg-slate-950/80 border border-dashed border-slate-700 rounded-xl min-h-[140px]">
              <span className="absolute top-1 left-2 text-[10px] font-mono text-slate-500">
                Parent (position: relative)
              </span>

              {/* TARGET BOX */}
              <div
                className="p-3 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-mono text-xs font-bold shadow-xl transition-all duration-150 inline-block"
                style={{
                  position: position,
                  top: position !== 'static' ? `${top}px` : undefined,
                  left: position !== 'static' ? `${left}px` : undefined,
                  zIndex: zIndex,
                }}
              >
                <span>Boîte Cible : {position}</span>
                {position !== 'static' && (
                  <div className="text-[10px] font-normal opacity-90">
                    top: {top}px, left: {left}px
                  </div>
                )}
              </div>

              <div className="mt-2 text-[11px] text-slate-400">
                Élément voisin B (reste dans le flux).
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 border border-slate-700/30 rounded-lg text-xs text-slate-400">
              Bloc C (faites défiler pour observer l'effet sticky ou fixed !).
            </div>
            <div className="p-3 bg-slate-800/50 border border-slate-700/30 rounded-lg text-xs text-slate-400">
              Bloc D : Le défilement continue...
            </div>
            <div className="p-3 bg-slate-800/50 border border-slate-700/30 rounded-lg text-xs text-slate-400">
              Bloc E : Fin du conteneur parent.
            </div>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* Position Selector */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-2">
            <span className="text-xs font-semibold text-slate-200 block">
              1. Choisir la valeur de <code>position</code>
            </span>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {(['static', 'relative', 'absolute', 'fixed', 'sticky'] as PositionType[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPosition(p)}
                  className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    position === p
                      ? 'bg-amber-500 border-amber-400 text-slate-950 font-bold shadow'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Explanation Callout */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-amber-500/30 text-xs space-y-1.5">
            <p className="font-bold text-amber-300">{explanations[position].title}</p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {explanations[position].desc}
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400 border-t border-slate-800">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{explanations[position].flow}</span>
            </div>
          </div>

          {/* Offsets top and left */}
          {position !== 'static' && (
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Décalage top</span>
                  <span className="font-mono text-amber-400">{top}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={top}
                  onChange={(e) => setTop(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Décalage left</span>
                  <span className="font-mono text-amber-400">{left}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="120"
                  value={left}
                  onChange={(e) => setLeft(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              <div className="space-y-1 pt-1 border-t border-slate-800">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">z-index (Superposition)</span>
                  <span className="font-mono text-indigo-400">{zIndex}</span>
                </div>
                <div className="flex gap-2">
                  {[0, 1, 10, 99].map((z) => (
                    <button
                      key={z}
                      type="button"
                      onClick={() => setZIndex(z)}
                      className={`flex-1 py-1 text-xs font-mono rounded border cursor-pointer ${
                        zIndex === z
                          ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      {z}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
