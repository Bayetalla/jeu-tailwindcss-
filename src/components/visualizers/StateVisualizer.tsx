import React, { useState } from 'react';
import { MousePointer, Eye, CheckCircle2 } from 'lucide-react';

export const StateVisualizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'hover' | 'active' | 'focus' | 'group'>('hover');

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
            <MousePointer className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Simulateur d'États & Micro-Interactions</h4>
            <p className="text-xs text-slate-400">Testez le comportement réel des pseudo-classes au survol, clic et focus</p>
          </div>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {(['hover', 'active', 'focus', 'group'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Interactive preview stage */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center min-h-[220px] p-6 bg-slate-900/60 rounded-xl border border-slate-800/60">
          {activeTab === 'hover' && (
            <div className="text-center space-y-3">
              <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-xl shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                Survolez-moi avec votre souris
              </button>
              <p className="text-xs text-slate-400">Classes : <code>hover:bg-indigo-500 hover:scale-105</code></p>
            </div>
          )}

          {activeTab === 'active' && (
            <div className="text-center space-y-3">
              <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-90 active:bg-emerald-700 text-white font-medium rounded-xl shadow-lg transition-all cursor-pointer">
                Cliquez et maintenez enfoncé !
              </button>
              <p className="text-xs text-slate-400">Classes : <code>active:scale-90 active:bg-emerald-700</code></p>
            </div>
          )}

          {activeTab === 'focus' && (
            <div className="text-center space-y-3">
              <button className="px-6 py-3 bg-slate-800 text-white font-medium rounded-xl border border-slate-700 focus-visible:ring-4 focus-visible:ring-amber-400 focus-visible:outline-none transition-all cursor-pointer">
                Appuyez sur Tab ou cliquez pour focus
              </button>
              <p className="text-xs text-slate-400">Classes : <code>focus-visible:ring-4 focus-visible:ring-amber-400</code></p>
            </div>
          )}

          {activeTab === 'group' && (
            <div className="group p-5 bg-slate-900 border border-slate-800 hover:border-indigo-500/60 rounded-2xl transition-all duration-300 max-w-xs w-full cursor-pointer hover:shadow-xl hover:shadow-indigo-500/10">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Groupe Parent</span>
                <span className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-emerald-400 transition-colors"></span>
              </div>
              <h5 className="font-bold text-white mt-2 group-hover:text-indigo-400 transition-colors">
                Survol du Conteneur
              </h5>
              <p className="text-xs text-slate-400 mt-1 group-hover:text-slate-300 transition-colors">
                L'icône ci-dessous avance quand le groupe est survolé :
              </p>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-indigo-400 font-medium group-hover:translate-x-1.5 transition-transform duration-200">
                <span>Explorer le module</span>
                <span>&rarr;</span>
              </div>
            </div>
          )}
        </div>

        {/* Concept note */}
        <div className="lg:col-span-5 space-y-3 p-4 bg-slate-900/40 rounded-xl border border-slate-800/60 text-xs">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Pourquoi c'est fondamental :</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {activeTab === 'hover' && "Le survol (hover:) informe l'utilisateur qu'un élément est interactif. Combinez-le toujours avec une transition (transition-colors ou transition-transform) pour éviter des saccades brutales."}
            {activeTab === 'active' && "L'état actif (active:) simule la réaction physique d'un bouton quand on appuie dessus. Un léger active:scale-95 procure un retour tactile instantané extrêmement satisfaisant."}
            {activeTab === 'focus' && "L'état focus-visible: est le pilier de l'accessibilité. Il ne s'affiche qu'aux personnes qui naviguent au clavier (Tab), leur permettant de savoir exactement où ils se trouvent."}
            {activeTab === 'group' && "La variante group permet à un élément enfant de changer de style quand son conteneur parent est survolé. C'est idéal pour animer une flèche ou éclaircir un titre de carte."}
          </p>
        </div>
      </div>
    </div>
  );
};
