import React, { useState } from 'react';
import { AlignCenter, Plus, Minus, ArrowRight, ArrowDown, Copy, Check } from 'lucide-react';

interface FlexItem {
  id: number;
  label: string;
  grow: number;
  shrink: number;
  alignSelf: 'auto' | 'flex-start' | 'center' | 'flex-end' | 'stretch';
}

export const FlexboxVisualizer: React.FC = () => {
  const [direction, setDirection] = useState<'row' | 'column' | 'row-reverse' | 'column-reverse'>('row');
  const [justifyContent, setJustifyContent] = useState<string>('center');
  const [alignItems, setAlignItems] = useState<string>('center');
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap');
  const [gapPx, setGapPx] = useState<number>(16);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const [items, setItems] = useState<FlexItem[]>([
    { id: 1, label: 'Boîte 1', grow: 0, shrink: 1, alignSelf: 'auto' },
    { id: 2, label: 'Boîte 2', grow: 0, shrink: 1, alignSelf: 'auto' },
    { id: 3, label: 'Boîte 3', grow: 0, shrink: 1, alignSelf: 'auto' },
  ]);

  const handleAddItem = () => {
    if (items.length < 6) {
      setItems((prev) => [
        ...prev,
        { id: prev.length + 1, label: `Boîte ${prev.length + 1}`, grow: 0, shrink: 1, alignSelf: 'auto' },
      ]);
    }
  };

  const handleRemoveItem = () => {
    if (items.length > 2) {
      setItems((prev) => prev.slice(0, prev.length - 1));
      if (selectedItemIndex >= items.length - 1) {
        setSelectedItemIndex(0);
      }
    }
  };

  const updateSelectedItem = (key: keyof FlexItem, val: any) => {
    setItems((prev) => {
      const copy = [...prev];
      copy[selectedItemIndex] = { ...copy[selectedItemIndex], [key]: val };
      return copy;
    });
  };

  const activeItem = items[selectedItemIndex] || items[0];

  const generatedCss = `.conteneur {
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  flex-wrap: ${flexWrap};
  gap: ${gapPx}px;
}
${
  activeItem.grow > 0 || activeItem.alignSelf !== 'auto'
    ? `\n/* Enfant #${activeItem.id} */\n.item-${activeItem.id} {\n  flex-grow: ${activeItem.grow};\n  align-self: ${activeItem.alignSelf};\n}`
    : ''
}`;

  const handleCopyCss = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isCol = direction.includes('column');

  return (
    <div className="w-full bg-slate-950/80 rounded-2xl border border-slate-800/80 p-5 backdrop-blur-sm">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/60 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <AlignCenter className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-100">Laboratoire Interactif Flexbox</h4>
            <p className="text-xs text-slate-400">Manipulez l'axe principal, l'axe secondaire et le comportement de chaque boîte</p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopyCss}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 rounded-lg text-xs font-mono transition-colors cursor-pointer self-start sm:self-auto"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copié !' : 'Copier le CSS'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual Stage & Axis Indicators */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          {/* Axis indicators */}
          <div className="flex items-center justify-between text-[11px] font-mono px-3 py-2 bg-slate-900/60 rounded-xl border border-slate-800/60 text-slate-400">
            <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
              {isCol ? <ArrowDown className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              <span>Axe principal (justify-content) : {isCol ? 'Vertical' : 'Horizontal'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              {isCol ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowDown className="w-3.5 h-3.5" />}
              <span>Axe secondaire (align-items) : {isCol ? 'Horizontal' : 'Vertical'}</span>
            </span>
          </div>

          {/* Interactive stage */}
          <div className="relative flex flex-col justify-center min-h-[320px] p-4 bg-slate-900/40 rounded-xl border border-slate-800/80 overflow-hidden">
            <div
              className="w-full min-h-[260px] p-4 bg-slate-950/70 border-2 border-dashed border-indigo-500/30 rounded-xl transition-all duration-200"
              style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent,
                alignItems,
                flexWrap,
                gap: `${gapPx}px`,
              }}
            >
              {items.map((item, idx) => {
                const isSelected = selectedItemIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItemIndex(idx)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setSelectedItemIndex(idx); }}
                    className={`cursor-pointer px-4 py-3 rounded-lg text-white font-mono text-xs font-semibold shadow-md transition-all flex flex-col items-center justify-center min-w-[75px] min-h-[55px] ${
                      isSelected
                        ? 'bg-indigo-600 ring-2 ring-white ring-offset-2 ring-offset-slate-950 scale-105'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                    }`}
                    style={{
                      flexGrow: item.grow,
                      flexShrink: item.shrink,
                      alignSelf: item.alignSelf !== 'auto' ? item.alignSelf : undefined,
                    }}
                  >
                    <span>{item.label}</span>
                    {item.grow > 0 && <span className="text-[10px] text-indigo-200">grow: {item.grow}</span>}
                    {item.alignSelf !== 'auto' && <span className="text-[10px] text-emerald-300">{item.alignSelf}</span>}
                  </div>
                );
              })}
            </div>

            {/* Stage bottom actions */}
            <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
              <span className="text-[11px]">Cliquez sur un élément pour personnaliser son propre <code>flex-grow</code> ou <code>align-self</code>.</span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleRemoveItem}
                  disabled={items.length <= 2}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 cursor-pointer"
                  title="Retirer une boîte"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-slate-300 text-xs">{items.length} boîtes</span>
                <button
                  type="button"
                  onClick={handleAddItem}
                  disabled={items.length >= 6}
                  className="p-1 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 cursor-pointer"
                  title="Ajouter une boîte"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Deck */}
        <div className="lg:col-span-5 space-y-3.5">
          {/* flex-direction */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 block">
              1. flex-direction <span className="text-slate-500 font-normal">(Sens de l'axe principal)</span>
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(['row', 'column', 'row-reverse', 'column-reverse'] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDirection(d)}
                  className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                    direction === d
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* justify-content */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 block">
              2. justify-content <span className="text-slate-500 font-normal">(Alignement axe principal)</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {['flex-start', 'center', 'flex-end', 'space-between', 'space-around', 'space-evenly'].map((j) => (
                <button
                  key={j}
                  type="button"
                  onClick={() => setJustifyContent(j)}
                  className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer truncate ${
                    justifyContent === j
                      ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                  title={j}
                >
                  {j.replace('flex-', '')}
                </button>
              ))}
            </div>
          </div>

          {/* align-items */}
          <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1.5">
            <span className="text-xs font-semibold text-slate-300 block">
              3. align-items <span className="text-slate-500 font-normal">(Alignement axe secondaire)</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {['stretch', 'flex-start', 'center', 'flex-end', 'baseline'].map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAlignItems(a)}
                  className={`py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer truncate ${
                    alignItems === a
                      ? 'bg-emerald-600 border-emerald-500 text-white font-bold'
                      : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                  }`}
                  title={a}
                >
                  {a.replace('flex-', '')}
                </button>
              ))}
            </div>
          </div>

          {/* gap & flex-wrap */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">gap</span>
                <span className="font-mono text-slate-400">{gapPx}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="32"
                step="4"
                value={gapPx}
                onChange={(e) => setGapPx(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800/60 space-y-1">
              <span className="text-xs font-semibold text-slate-300 block">flex-wrap</span>
              <div className="flex gap-1">
                {(['nowrap', 'wrap'] as const).map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setFlexWrap(w)}
                    className={`flex-1 py-1 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      flexWrap === w
                        ? 'bg-indigo-600 border-indigo-500 text-white font-bold'
                        : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Item Child Controls */}
          {activeItem && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-indigo-500/30 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-indigo-300">
                  Propriétés enfant : #{activeItem.id} ({activeItem.label})
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Boîte sélectionnée</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">flex-grow</span>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => updateSelectedItem('grow', g)}
                        className={`flex-1 py-1 font-mono rounded border transition-all cursor-pointer ${
                          activeItem.grow === g
                            ? 'bg-indigo-600 border-indigo-400 text-white font-bold'
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">align-self</span>
                  <select
                    value={activeItem.alignSelf}
                    onChange={(e) => updateSelectedItem('alignSelf', e.target.value)}
                    className="w-full py-1 px-2 bg-slate-800 border border-slate-700 rounded text-xs text-slate-200 font-mono cursor-pointer"
                  >
                    <option value="auto">auto</option>
                    <option value="flex-start">flex-start</option>
                    <option value="center">center</option>
                    <option value="flex-end">flex-end</option>
                    <option value="stretch">stretch</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
