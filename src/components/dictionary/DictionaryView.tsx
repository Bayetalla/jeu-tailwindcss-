import React, { useState, useMemo } from 'react';
import { Search, Book, Volume2, Copy, Check, Sparkles, AlertTriangle, Lightbulb, Compass, Globe } from 'lucide-react';
import { DICTIONARY_ENTRIES } from '../../data/dictionary';
import { DictionaryEntry } from '../../types';

export const DictionaryView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [copiedProp, setCopiedProp] = useState<string | null>(null);
  const [speakingProp, setSpeakingProp] = useState<string | null>(null);

  const categories = [
    'Toutes',
    'Flexbox',
    'CSS Grid',
    'Box Model & Dimensions',
    'Positionnement',
    'Sélecteurs & Pseudo',
    'Variables & Modernes',
  ];

  const handleCopy = (text: string, prop: string) => {
    navigator.clipboard.writeText(text);
    setCopiedProp(prop);
    setTimeout(() => setCopiedProp(null), 2000);
  };

  const handleSpeak = (entry: DictionaryEntry) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingProp === entry.propertyName) {
      window.speechSynthesis.cancel();
      setSpeakingProp(null);
      return;
    }

    window.speechSynthesis.cancel();
    const narration = `${entry.propertyName}. ${entry.frenchDefinition}. Utilité : ${entry.concreteUtility}. Astuce de mémorisation : ${entry.mnemonicTip}`;
    const utterance = new SpeechSynthesisUtterance(narration.replace(/[{}`*#_]/g, ' '));
    utterance.lang = 'fr-FR';

    const voices = window.speechSynthesis.getVoices();
    const frVoice = voices.find((v) => v.lang.startsWith('fr'));
    if (frVoice) utterance.voice = frVoice;

    utterance.onstart = () => setSpeakingProp(entry.propertyName);
    utterance.onend = () => setSpeakingProp(null);
    utterance.onerror = () => setSpeakingProp(null);

    window.speechSynthesis.speak(utterance);
  };

  const filteredEntries = useMemo(() => {
    return DICTIONARY_ENTRIES.filter((entry) => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        entry.propertyName.toLowerCase().includes(q) ||
        entry.frenchDefinition.toLowerCase().includes(q) ||
        entry.concreteUtility.toLowerCase().includes(q) ||
        entry.syntaxExample.toLowerCase().includes(q);

      const matchesCat =
        selectedCategory === 'Toutes' || entry.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Header & Search */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Book className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                Dictionnaire Intelligent du CSS Moderne
              </h2>
              <p className="text-xs text-slate-400">
                Fiches pédagogiques complètes, erreurs fréquentes, synthèses vocales et astuces de mémorisation
              </p>
            </div>
          </div>

          <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-lg border border-indigo-500/20 self-start sm:self-auto">
            {filteredEntries.length} notions répertoriées
          </span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher une propriété (ex: justify-content, box-sizing, :has, clamp...)"
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-mono rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/60'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dictionary Entries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.map((entry) => (
          <div
            key={entry.propertyName}
            className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-4 shadow-lg"
          >
            <div className="space-y-3">
              {/* Title & Category Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold text-indigo-300">
                    {entry.propertyName}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                    {entry.category}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleSpeak(entry)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      speakingProp === entry.propertyName
                        ? 'bg-indigo-600 border-indigo-500 text-white animate-pulse'
                        : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                    title="Écouter la définition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopy(entry.syntaxExample, entry.propertyName)}
                    className="p-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
                    title="Copier la syntaxe"
                  >
                    {copiedProp === entry.propertyName ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Definition & Utility */}
              <p className="text-xs text-slate-200 leading-relaxed">
                {entry.frenchDefinition}
              </p>

              <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                <span className="text-indigo-400 font-semibold block">Utilité concrète :</span>
                <p>{entry.concreteUtility}</p>
              </div>

              {/* Syntax Example */}
              <div>
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                  Syntaxe standard :
                </span>
                <pre className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs text-indigo-300 overflow-x-auto">
                  <code>{entry.syntaxExample}</code>
                </pre>
              </div>

              {/* Common Values */}
              {entry.commonValues.length > 0 && (
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[11px] font-mono text-slate-500">Valeurs :</span>
                  {entry.commonValues.map((v, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-mono bg-slate-800/80 text-slate-300 rounded border border-slate-700/60"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              )}

              {/* Common Trap */}
              {entry.commonTrap && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">Piège fréquent : </span>
                    <span>{entry.commonTrap}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Card Footer */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400 italic">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>&ldquo;{entry.mnemonicTip}&rdquo;</span>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3 text-emerald-400" />
                  <span>Support : {entry.browserSupport}</span>
                </span>
                <span className="text-slate-400">{entry.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
