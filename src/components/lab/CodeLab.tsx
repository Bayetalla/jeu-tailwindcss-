import React, { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  Copy,
  RotateCcw,
  Bookmark,
  Sparkles,
  Check,
  Maximize2,
  Minimize2,
  Play,
  Lightbulb,
  FileCode,
  Download,
} from 'lucide-react';
import { UserProgress } from '../../types';
import { saveUserProgress } from '../../services/storage';

interface CodeLabProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
}

const TEMPLATES = [
  {
    name: '1. Centrage Parfait Flexbox',
    html: `<div class="hero-card">
  <h2>Centrage Parfait</h2>
  <p>Flexbox aligne les enfants au pixel près sur les deux axes.</p>
  <button class="action-btn">Commencer l'Aventure</button>
</div>`,
    css: `.hero-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 16px;
  padding: 32px;
  text-align: center;
  max-width: 380px;
  margin: 0 auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6);
}

h2 {
  font-size: 20px;
  color: #f8fafc;
  margin: 0;
}

p {
  font-size: 13px;
  color: #94a3b8;
  line-height: 1.5;
  margin: 0;
}

.action-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms ease, background 150ms ease;
}

.action-btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}`,
  },
  {
    name: '2. Grille CSS 2D Métrique',
    html: `<div class="stats-grid">
  <div class="card">
    <span class="label">Revenu</span>
    <strong class="val">18 400 €</strong>
  </div>
  <div class="card">
    <span class="label">Utilisateurs</span>
    <strong class="val">4 290</strong>
  </div>
  <div class="card">
    <span class="label">Conversion</span>
    <strong class="val">14.8%</strong>
  </div>
</div>`,
    css: `.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  max-width: 480px;
  margin: 0 auto;
}

.card {
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.label {
  font-size: 11px;
  color: #94a3b8;
}

.val {
  font-size: 18px;
  color: #10b981;
  font-family: monospace;
}`,
  },
  {
    name: '3. Carte E-Commerce avec Badge Absolute',
    html: `<div class="product">
  <div class="img-box">
    <span class="badge">-30%</span>
    <span>Casque Audio Pro</span>
  </div>
  <div class="body">
    <h4>Noise Cancelling</h4>
    <p>Son immersif et 40h d'autonomie sans fil.</p>
    <div class="footer">
      <span class="price">199 €</span>
      <button class="buy">Acheter</button>
    </div>
  </div>
</div>`,
    css: `.product {
  max-width: 280px;
  margin: 0 auto;
  background: #0f172a;
  border: 1px solid #1e293b;
  border-radius: 14px;
  overflow: hidden;
  color: white;
}

.img-box {
  position: relative;
  height: 140px;
  background: linear-gradient(135deg, #312e81, #1e1b4b);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ef4444;
  color: white;
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 6px;
  font-weight: bold;
}

.body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.price {
  font-size: 18px;
  font-weight: bold;
  color: #38bdf8;
  font-family: monospace;
}

.buy {
  background: #2563eb;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 6px;
  cursor: pointer;
}`,
  },
];

export const CodeLab: React.FC<CodeLabProps> = ({ progress, onProgressUpdate }) => {
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState<number>(0);
  const [htmlCode, setHtmlCode] = useState<string>(TEMPLATES[0].html);
  const [cssCode, setCssCode] = useState<string>(TEMPLATES[0].css);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [copied, setCopied] = useState<boolean>(false);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [autoRun, setAutoRun] = useState<boolean>(true);
  const [activeCodeKey, setActiveCodeKey] = useState<number>(0);

  const handleSelectTemplate = (idx: number) => {
    setSelectedTemplateIndex(idx);
    setHtmlCode(TEMPLATES[idx].html);
    setCssCode(TEMPLATES[idx].css);
    setActiveCodeKey((prev) => prev + 1);
  };

  const handleReset = () => {
    setHtmlCode(TEMPLATES[selectedTemplateIndex].html);
    setCssCode(TEMPLATES[selectedTemplateIndex].css);
    setActiveCodeKey((prev) => prev + 1);
  };

  const handleCopyCode = () => {
    const fullSnippet = `<!-- HTML -->\n${htmlCode}\n\n/* CSS */\n${cssCode}`;
    navigator.clipboard.writeText(fullSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveSnippet = () => {
    const newSnippet = {
      id: `snip-${Date.now()}`,
      title: `Création CSS Quest (${new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })})`,
      html: htmlCode,
      css: cssCode,
      date: new Date().toISOString().split('T')[0],
    };
    const updated = {
      ...progress,
      savedSnippets: [newSnippet, ...(progress.savedSnippets || [])],
    };
    saveUserProgress(updated);
    onProgressUpdate(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportFiles = () => {
    const fullFile = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Quest Export</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #0b0f17;
      color: #f8fafc;
      font-family: system-ui, sans-serif;
      padding: 24px;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ${cssCode}
  </style>
</head>
<body>
  ${htmlCode}
</body>
</html>`;

    const blob = new Blob([fullFile], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `css_quest_${Date.now()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewportWidths = {
    mobile: 'max-w-[360px]',
    tablet: 'max-w-[640px]',
    desktop: 'max-w-full',
  };

  const iframeContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            background-color: #0b0f17;
            color: #f8fafc;
            font-family: system-ui, -apple-system, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 16px;
          }
          ${cssCode}
        </style>
      </head>
      <body>
        ${htmlCode}
      </body>
    </html>
  `;

  return (
    <div className="space-y-6 pb-20">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Mode Libre & Expérimentation
            </span>
            <span className="text-slate-600">&middot;</span>
            <span className="text-xs text-slate-400 font-mono">Bac à sable sécurisé</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Laboratoire CSS
          </h1>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier'}</span>
          </button>

          <button
            type="button"
            onClick={handleSaveSnippet}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 transition-colors cursor-pointer"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{savedSuccess ? 'Sauvegardé !' : 'Sauvegarder'}</span>
          </button>

          <button
            type="button"
            onClick={handleExportFiles}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-emerald-600/20 border border-emerald-500/40 hover:bg-emerald-600/30 text-emerald-300 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter HTML/CSS</span>
          </button>
        </div>
      </div>

      {/* Templates Selector */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-mono shrink-0">Modèles :</span>
        {TEMPLATES.map((tpl, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSelectTemplate(i)}
            className={`px-3 py-1.5 rounded-lg font-mono whitespace-nowrap transition-colors cursor-pointer ${
              selectedTemplateIndex === i
                ? 'bg-indigo-600 text-white font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            {tpl.name}
          </button>
        ))}
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Code Editors (HTML & CSS) */}
        <div className="lg:col-span-6 space-y-4">
          {/* HTML Editor */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/70 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-sky-400 font-bold">
                <FileCode className="w-3.5 h-3.5" />
                <span>HTML Structure</span>
              </span>
              <span>Balises HTML</span>
            </div>
            <textarea
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
              rows={6}
              spellCheck={false}
              className="w-full p-3.5 bg-slate-950 font-mono text-xs text-slate-300 focus:outline-none resize-y leading-relaxed"
            />
          </div>

          {/* CSS Editor */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/70 border-b border-slate-800 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 text-indigo-400 font-bold">
                <FileCode className="w-3.5 h-3.5" />
                <span>CSS Styles</span>
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="hover:text-slate-200 transition-colors cursor-pointer"
                title="Réinitialiser"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
            <textarea
              value={cssCode}
              onChange={(e) => setCssCode(e.target.value)}
              rows={14}
              spellCheck={false}
              className="w-full p-3.5 bg-slate-950 font-mono text-xs text-indigo-300 focus:outline-none resize-y leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Live Sandboxed Preview */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-center justify-between bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded cursor-pointer ${
                  viewport === 'mobile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Mobile 360px"
              >
                <Smartphone className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded cursor-pointer ${
                  viewport === 'tablet' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Tablette 640px"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded cursor-pointer ${
                  viewport === 'desktop' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
                title="Desktop Pleine Largeur"
              >
                <Monitor className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">
                Aperçu instantané isolé
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Sandboxed iframe frame */}
          <div
            className={`w-full flex justify-center p-4 bg-slate-950/80 rounded-2xl border border-slate-800 min-h-[460px] shadow-2xl transition-all ${
              isFullscreen ? 'fixed inset-4 z-50 bg-slate-950 min-h-screen' : ''
            }`}
          >
            <div className={`w-full ${viewportWidths[viewport]} transition-all duration-200 h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-[#0b0f17]`}>
              <iframe
                key={activeCodeKey}
                title="Bac à sable CSS"
                srcDoc={iframeContent}
                sandbox="allow-scripts"
                className="w-full h-full min-h-[420px] border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
