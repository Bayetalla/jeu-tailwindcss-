import React, { useState } from 'react';
import { Award, Zap, HelpCircle } from 'lucide-react';

interface RuleItem {
  id: string;
  name: string;
  selector: string;
  property: string;
  value: string;
  // Specificity tuple [inline, id, class, element]
  specificity: [number, number, number, number];
  color: string;
}

export const SpecificityVisualizer: React.FC = () => {
  const [selectedRuleId, setSelectedRuleId] = useState<string>('rule-2');

  const rules: RuleItem[] = [
    {
      id: 'rule-1',
      name: 'Règle A (Sélecteur d\'élément)',
      selector: 'button',
      property: 'background-color',
      value: '#64748b', // Slate
      specificity: [0, 0, 0, 1],
      color: 'border-slate-500 bg-slate-500/10 text-slate-300',
    },
    {
      id: 'rule-2',
      name: 'Règle B (Classe + Pseudo-classe)',
      selector: '.btn.primary:hover',
      property: 'background-color',
      value: '#3b82f6', // Blue
      specificity: [0, 0, 3, 0],
      color: 'border-blue-500 bg-blue-500/10 text-blue-300',
    },
    {
      id: 'rule-3',
      name: 'Règle C (Identifiant unique #ID)',
      selector: '#submit-btn',
      property: 'background-color',
      value: '#8b5cf6', // Purple
      specificity: [0, 1, 0, 0],
      color: 'border-purple-500 bg-purple-500/10 text-purple-300',
    },
    {
      id: 'rule-4',
      name: 'Règle D (ID + Classe combinés)',
      selector: '#main-form #submit-btn.btn',
      property: 'background-color',
      value: '#10b981', // Emerald
      specificity: [0, 2, 1, 0],
      color: 'border-emerald-500 bg-emerald-500/10 text-emerald-300',
    },
  ];

  // Specificity score calculation: (inline * 1000) + (id * 100) + (class * 10) + element
  const getScore = (s: [number, number, number, number]) =>
    s[0] * 1000 + s[1] * 100 + s[2] * 10 + s[3];

  // Sort rules by score descending
  const sortedRules = [...rules].sort((a, b) => getScore(b.specificity) - getScore(a.specificity));
  const winningRule = sortedRules[0];

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Simulateur de Cascade & Spécificité CSS</h4>
            <p className="text-xs text-slate-400">Pourquoi une règle gagne-t-elle face à une autre ? Le calcul (0, 0, 0, 0) démystifié</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono rounded-lg">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Règle victorieuse : <strong>{winningRule.selector}</strong></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Competing Rules List */}
        <div className="lg:col-span-7 space-y-3">
          <span className="text-xs font-semibold text-slate-300 block">
            Règles concurrentes appliquées sur le même bouton :
          </span>

          <div className="space-y-2.5">
            {sortedRules.map((rule, idx) => {
              const isWinner = idx === 0;
              return (
                <div
                  key={rule.id}
                  className={`p-3.5 rounded-xl border transition-all ${
                    isWinner
                      ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-500/5'
                      : 'bg-slate-900/40 border-slate-800 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                          isWinner ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {isWinner ? 'GAGNANTE' : `#${idx + 1}`}
                      </span>
                      <code className="text-xs font-bold text-white font-mono">{rule.selector}</code>
                    </div>

                    {/* Specificity pills */}
                    <div className="flex items-center gap-1 text-[11px] font-mono">
                      <span className="text-slate-400 text-[10px] mr-1">Score :</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-amber-400" title="Styles inline">
                        {rule.specificity[0]}
                      </span>
                      <span className="text-slate-600">,</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-purple-400" title="IDs (#id)">
                        {rule.specificity[1]}
                      </span>
                      <span className="text-slate-600">,</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-400" title="Classes, pseudo-classes, attributs">
                        {rule.specificity[2]}
                      </span>
                      <span className="text-slate-600">,</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 rounded text-slate-300" title="Éléments et pseudo-éléments">
                        {rule.specificity[3]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-xs font-mono text-slate-400 flex items-center justify-between">
                    <span>
                      {rule.property}: <strong style={{ color: rule.value }}>{rule.value}</strong>;
                    </span>
                    <span className="text-[11px] text-slate-500">
                      {isWinner ? 'Couleur appliquée au bouton' : 'Écrasée par spécificité inférieure'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Preview Button & Specificity Chart */}
        <div className="lg:col-span-5 space-y-4">
          {/* Live render of element */}
          <div className="p-5 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 min-h-[160px]">
            <span className="text-xs text-slate-400 font-mono">Résultat visuel du bouton dans le navigateur :</span>
            <button
              type="button"
              id="submit-btn"
              className="px-6 py-3 rounded-xl font-bold text-white shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer font-mono text-xs"
              style={{ backgroundColor: winningRule.value }}
            >
              #submit-btn.btn (Couleur: {winningRule.value})
            </button>
            <p className="text-[11px] text-slate-400">
              Même si <code className="text-slate-300">button</code> est écrit en dernier dans le fichier CSS, l'ID <code className="text-purple-300">#main-form #submit-btn</code> l'emporte grâce à son score de spécificité supérieur !
            </p>
          </div>

          {/* Educational Formula Guide */}
          <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs space-y-2 text-slate-300">
            <span className="font-semibold text-slate-200 block">
              Comprendre le quadruplet (Inline, ID, Classe, Balise)
            </span>
            <ul className="space-y-1.5 text-[11px] text-slate-400">
              <li className="flex items-start gap-1.5">
                <strong className="text-amber-400 font-mono w-4">1.</strong>
                <span><strong>Inline :</strong> <code>style=&quot;...&quot;</code> direct sur la balise (Score : 1,0,0,0)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <strong className="text-purple-400 font-mono w-4">2.</strong>
                <span><strong>IDs :</strong> Sélecteurs avec dièse <code>#mon-id</code> (Score : 0,1,0,0)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <strong className="text-sky-400 font-mono w-4">3.</strong>
                <span><strong>Classes & Pseudos :</strong> <code>.classe</code>, <code>:hover</code>, <code>[type]</code> (Score : 0,0,1,0)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <strong className="text-slate-400 font-mono w-4">4.</strong>
                <span><strong>Balises :</strong> <code>p</code>, <code>div</code>, <code>h1</code>, <code>::before</code> (Score : 0,0,0,1)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
