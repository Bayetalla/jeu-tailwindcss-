import React, { useState } from 'react';
import {
  Trophy,
  CheckCircle,
  Eye,
  RotateCcw,
  Sparkles,
  ArrowRight,
  Code2,
  ListChecks,
  Clock,
  Layers,
  Check,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FINAL_PROJECTS } from '../../data/projects';
import { FinalProject, UserProgress } from '../../types';
import { markProjectComplete } from '../../services/storage';

interface ProjectsViewProps {
  progress: UserProgress;
  onProgressUpdate: (updated: UserProgress) => void;
  onOpenVoiceTutor: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  progress,
  onProgressUpdate,
  onOpenVoiceTutor,
}) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(FINAL_PROJECTS[0].id);
  const selectedProject =
    FINAL_PROJECTS.find((p) => p.id === selectedProjectId) || FINAL_PROJECTS[0];

  const [userCss, setUserCss] = useState<string>(selectedProject.starterCss);
  const [activeTab, setActiveTab] = useState<'editor' | 'brief' | 'solution'>('editor');
  const [previewTab, setPreviewTab] = useState<'user' | 'solution'>('user');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [passed, setPassed] = useState<boolean>(false);

  const isCompleted = progress.completedProjectIds?.includes(selectedProject.id);

  const handleSelectProject = (proj: FinalProject) => {
    setSelectedProjectId(proj.id);
    setUserCss(proj.starterCss);
    setSubmitted(false);
    setPassed(false);
    setActiveTab('editor');
  };

  const handleValidate = () => {
    setSubmitted(true);
    const normalized = userCss.replace(/\s+/g, ' ').toLowerCase();
    const allMet = selectedProject.expectedCssRules.every((rule) =>
      normalized.includes(rule.toLowerCase().replace(/\s+/g, ' '))
    );

    if (allMet) {
      setPassed(true);
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
      const updated = markProjectComplete(selectedProject.id, 150);
      onProgressUpdate(updated);
    } else {
      setPassed(false);
    }
  };

  const handleReset = () => {
    setUserCss(selectedProject.starterCss);
    setSubmitted(false);
    setPassed(false);
  };

  const iframeDoc = (cssCode: string) => `
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
        ${selectedProject.starterHtml}
      </body>
    </html>
  `;

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              Projets Professionnels Finaux (Monde 14)
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Mettez vos compétences à l'épreuve sur des maquettes d'interfaces réelles : carte de profil, page de connexion, dashboards métriques et portfolios.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenVoiceTutor}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Conseil du Professeur</span>
        </button>
      </div>

      {/* Projects Horizontal Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {FINAL_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          const done = progress.completedProjectIds?.includes(proj.id);

          return (
            <button
              key={proj.id}
              type="button"
              onClick={() => handleSelectProject(proj)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-lg'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold">
                  {proj.difficulty}
                </span>
                {done && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
              </div>

              <h4 className="text-xs font-bold text-slate-200 line-clamp-2">
                {proj.title}
              </h4>

              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
                <Clock className="w-3 h-3" />
                <span>{proj.estimatedTime}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Project Workspace */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl space-y-6">
        {/* Project Header Info */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-indigo-400 font-bold uppercase">{selectedProject.difficulty}</span>
              <span>&middot;</span>
              <span>{selectedProject.estimatedTime}</span>
              {isCompleted && (
                <>
                  <span>&middot;</span>
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Projet Réussi</span>
                  </span>
                </>
              )}
            </div>
            <h3 className="text-lg font-bold text-white mt-1">{selectedProject.title}</h3>
            <p className="text-xs text-slate-300 mt-1">{selectedProject.brief}</p>
          </div>

          {/* Sub tabs (Editor vs Brief vs Solution) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-xl text-xs shrink-0 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg font-mono transition-colors cursor-pointer ${
                activeTab === 'editor' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Éditeur & Test
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('brief')}
              className={`px-3 py-1.5 rounded-lg font-mono transition-colors cursor-pointer ${
                activeTab === 'brief' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Critères ({selectedProject.criteria.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('solution')}
              className={`px-3 py-1.5 rounded-lg font-mono transition-colors cursor-pointer ${
                activeTab === 'solution' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Solution Pro
            </button>
          </div>
        </div>

        {/* Tab 1: Editor & Split Live Preview */}
        {activeTab === 'editor' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* CSS Code Editor */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Votre CSS</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="hover:text-slate-200 transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Réinitialiser</span>
                  </button>
                </div>

                <textarea
                  value={userCss}
                  onChange={(e) => {
                    setUserCss(e.target.value);
                    setSubmitted(false);
                  }}
                  rows={16}
                  spellCheck={false}
                  className="w-full p-3.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-indigo-300 focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed resize-y"
                />
              </div>

              {/* Sandboxed Preview */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-sky-400" />
                    <span>Aperçu de l'interface</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setPreviewTab('user')}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        previewTab === 'user' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      Votre résultat
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewTab('solution')}
                      className={`px-2.5 py-1 rounded cursor-pointer ${
                        previewTab === 'solution' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400'
                      }`}
                    >
                      Maquette Cible
                    </button>
                  </div>
                </div>

                <div className="h-[340px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
                  <iframe
                    title="Aperçu projet"
                    srcDoc={iframeDoc(
                      previewTab === 'user' ? userCss : selectedProject.solutionCss
                    )}
                    sandbox="allow-scripts"
                    className="w-full h-full border-0 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Validation bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div>
                {submitted && (
                  <div className="text-xs font-bold">
                    {passed ? (
                      <span className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Félicitations ! Le projet respecte toutes les spécifications CSS demandées (+150 XP).</span>
                      </span>
                    ) : (
                      <span className="text-amber-400">
                        Certains critères ne sont pas encore remplis. Consultez l'onglet Critères pour vérifier les règles attendues.
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleValidate}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                Vérifier le projet &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Criteria */}
        {activeTab === 'brief' && (
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-emerald-400" />
              <span>Cahier des charges et critères d'évaluation :</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {selectedProject.criteria.map((crit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{crit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tab 3: Pro Solution */}
        {activeTab === 'solution' && (
          <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-emerald-400 font-mono">
                Solution de référence commentée :
              </h4>
              <button
                type="button"
                onClick={() => setUserCss(selectedProject.solutionCss)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-mono cursor-pointer"
              >
                Copier dans mon éditeur
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed max-h-[380px]">
              <code>{selectedProject.solutionCss}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
