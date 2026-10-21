import React, { useState } from 'react';
import { Smartphone, Tablet, Monitor, Sliders, Copy, Check } from 'lucide-react';

export const ResponsiveVisualizer: React.FC = () => {
  const [containerWidth, setContainerWidth] = useState<number>(360);
  const [copied, setCopied] = useState<boolean>(false);

  // Breakpoints
  const isTablet = containerWidth >= 600;
  const isDesktop = containerWidth >= 850;

  const currentBreakpoint = isDesktop
    ? '@media (min-width: 850px) — Format Ordinateur'
    : isTablet
    ? '@media (min-width: 600px) — Format Tablette'
    : 'Mobile-first (Défaut sans media query)';

  const generatedCss = `/* 1. Mobile First par défaut (Largeur < 600px) */
.catalogue-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.titre-fluide {
  font-size: clamp(1.2rem, 3vw, 1.8rem);
}

/* 2. Tablette (Largeur >= 600px) */
@media (min-width: 600px) {
  .catalogue-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3. Ordinateur (Largeur >= 850px) */
@media (min-width: 850px) {
  .catalogue-grid {
    grid-template-columns: repeat(3, 1fr);
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
          <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Simulateur de Responsive Design & Media Queries</h4>
            <p className="text-xs text-slate-400">Ajustez la largeur au pixel près ou utilisez les boutons d'appareils</p>
          </div>
        </div>

        {/* Device presets */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setContainerWidth(360)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              containerWidth < 600
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (360px)</span>
          </button>
          <button
            type="button"
            onClick={() => setContainerWidth(680)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isTablet && !isDesktop
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablette (680px)</span>
          </button>
          <button
            type="button"
            onClick={() => setContainerWidth(920)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              isDesktop
                ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (920px)</span>
          </button>
        </div>
      </div>

      {/* Width slider */}
      <div className="p-3 mb-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Sliders className="w-4 h-4 text-sky-400" />
          <span>Curseur de largeur : <strong className="text-white font-mono">{containerWidth}px</strong></span>
        </div>
        <div className="flex-1 max-w-md mx-2">
          <input
            type="range"
            min="320"
            max="960"
            step="10"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="w-full accent-sky-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
          />
        </div>
        <span className="font-mono text-sky-400 text-[11px] truncate">{currentBreakpoint}</span>
      </div>

      {/* Simulated Device Frame */}
      <div className="w-full flex justify-center py-6 px-2 bg-slate-900/40 rounded-xl border border-slate-800/60 min-h-[300px] overflow-x-auto">
        <div
          className="transition-all duration-200 p-5 bg-slate-950 rounded-2xl border border-sky-500/30 shadow-2xl space-y-4"
          style={{ width: `${containerWidth}px`, maxWidth: '100%' }}
        >
          {/* Header of simulated card */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
            <div>
              <h5
                className="font-bold text-white transition-all"
                style={{ fontSize: `clamp(1rem, ${containerWidth / 35}px, 1.4rem)` }}
              >
                Atelier CSS Responsive
              </h5>
              <p className="text-[11px] text-slate-400">
                clamp(1rem, 2.5vw, 1.4rem) &middot; Typographie fluide
              </p>
            </div>
            <span className="text-[10px] font-mono text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
              {containerWidth}px
            </span>
          </div>

          {/* Responsive Layout Grid */}
          <div
            className="transition-all duration-200"
            style={{
              display: isTablet ? 'grid' : 'flex',
              flexDirection: isTablet ? undefined : 'column',
              gridTemplateColumns: isDesktop ? 'repeat(3, 1fr)' : isTablet ? 'repeat(2, 1fr)' : undefined,
              gap: '12px',
            }}
          >
            {[
              { title: 'Fondations CSS', badge: 'Monde 1', gradient: 'from-blue-600 to-indigo-700' },
              { title: 'Flexbox Dynamique', badge: 'Monde 4', gradient: 'from-indigo-600 to-purple-700' },
              { title: 'Grille 2D Moderne', badge: 'Monde 5', gradient: 'from-emerald-600 to-teal-700' },
            ].map((card, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-full h-16 rounded-lg bg-gradient-to-br ${card.gradient} mb-2.5 flex items-center justify-center font-bold text-white text-xs shadow`}>
                    {card.badge}
                  </div>
                  <h6 className="text-xs font-semibold text-slate-200">{card.title}</h6>
                  <p className="text-[11px] text-slate-400 mt-1">
                    S'adapte automatiquement selon la largeur disponible.
                  </p>
                </div>
                <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                  <span className="font-mono">
                    {isDesktop ? '33% largeur' : isTablet ? '50% largeur' : '100% pleine largeur'}
                  </span>
                  <span className="text-emerald-400 font-semibold">Adapté</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-900">
        <span>Règle d'or : Commencez toujours par la version mobile (sans media query), puis enrichissez avec <code>@media (min-width: ...)</code>.</span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-sky-400 hover:text-sky-300 font-mono cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Code copié' : 'Copier le CSS'}</span>
        </button>
      </div>
    </div>
  );
};
