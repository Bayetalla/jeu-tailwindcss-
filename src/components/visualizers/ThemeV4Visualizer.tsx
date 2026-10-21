import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';

export const ThemeV4Visualizer: React.FC = () => {
  const [brandColor, setBrandColor] = useState<string>('#6366f1'); // indigo
  const [accentColor, setAccentColor] = useState<string>('#10b981'); // emerald
  const [borderRadius, setBorderRadius] = useState<string>('0.75rem'); // 12px

  const presets = [
    { name: 'Indigo & Emeraude', brand: '#6366f1', accent: '#10b981' },
    { name: 'Cyan & Ambre', brand: '#06b6d4', accent: '#f59e0b' },
    { name: 'Rose & Violet', brand: '#ec4899', accent: '#8b5cf6' },
  ];

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Démonstrateur de Thème Moderne Tailwind v4</h4>
            <p className="text-xs text-slate-400">La directive @theme génère directement vos classes à partir des variables CSS</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {presets.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setBrandColor(p.brand);
                setAccentColor(p.accent);
              }}
              className="px-2.5 py-1 text-[11px] rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.brand }}></span>
              <span>{p.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* CSS @theme declaration preview */}
        <div className="lg:col-span-6 p-4 bg-slate-900/80 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
          <div className="text-slate-500 mb-1">// Dans votre fichier CSS principal :</div>
          <div className="text-indigo-400">@import <span className="text-emerald-400">"tailwindcss"</span>;</div>
          <br />
          <div className="text-purple-400">@theme {'{'}</div>
          <div className="pl-4 text-slate-200">
            <span>--color-brand: </span>
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-4 h-4 rounded align-middle ml-1 cursor-pointer bg-transparent border-0 inline"
            />
            <span className="text-amber-300"> {brandColor}</span>;
          </div>
          <div className="pl-4 text-slate-200">
            <span>--color-accent: </span>
            <input
              type="color"
              value={accentColor}
              onChange={(e) => setAccentColor(e.target.value)}
              className="w-4 h-4 rounded align-middle ml-1 cursor-pointer bg-transparent border-0 inline"
            />
            <span className="text-amber-300"> {accentColor}</span>;
          </div>
          <div className="pl-4 text-slate-200">
            <span>--radius-card: </span>
            <span className="text-amber-300">{borderRadius}</span>;
          </div>
          <div className="text-purple-400">{'}'}</div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[11px] text-emerald-400">
            &rarr; Classes auto-générées : bg-brand, text-brand, border-brand, bg-accent...
          </div>
        </div>

        {/* Live Element Rendered With Theme Variables */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-slate-900/40 rounded-xl border border-slate-800/40">
          <div
            className="w-full max-w-sm p-5 border shadow-xl transition-all duration-300"
            style={{
              borderRadius: borderRadius,
              backgroundColor: '#0f172a',
              borderColor: `${brandColor}40`,
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-xs font-semibold px-2.5 py-1 rounded-md"
                style={{
                  backgroundColor: `${brandColor}20`,
                  color: brandColor,
                }}
              >
                bg-brand/20 · text-brand
              </span>
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: accentColor }}
              ></span>
            </div>

            <h4 className="text-sm font-bold text-white mt-3">Composant Stylisé par @theme</h4>
            <p className="text-xs text-slate-400 mt-1">
              Les propriétés CSS réagissent directement aux variables injectées sans redémarrer le serveur.
            </p>

            <button
              type="button"
              className="mt-4 w-full py-2 px-4 text-xs font-semibold rounded-lg text-slate-950 shadow-md transition-all hover:opacity-90 cursor-pointer"
              style={{
                backgroundColor: brandColor,
                color: '#ffffff',
              }}
            >
              Bouton Utilitaire bg-brand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
