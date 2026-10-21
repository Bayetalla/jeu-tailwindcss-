import React, { useState } from 'react';
import { UserProgress, Lesson } from './types';
import { loadUserProgress, saveUserProgress, resetAllProgress } from './services/storage';
import { CURRICULUM_LEVELS } from './data/curriculum';
import { Navbar } from './components/navigation/Navbar';
import { Dashboard } from './components/dashboard/Dashboard';
import { CurriculumExplorer } from './components/curriculum/CurriculumExplorer';
import { LessonView } from './components/lessons/LessonView';
import { CodeLab } from './components/lab/CodeLab';
import { ReviewDashboard } from './components/review/ReviewDashboard';
import { DictionaryView } from './components/dictionary/DictionaryView';
import { ProjectsView } from './components/projects/ProjectsView';
import { VoiceProfessorModal } from './components/voice/VoiceProfessorModal';

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => loadUserProgress());
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'curriculum' | 'lab' | 'review' | 'dictionary' | 'projects' | 'lesson'>('dashboard');
  const [activeLessonId, setActiveLessonId] = useState<string>('1-1');
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  // Sync progress changes to localStorage
  const handleProgressUpdate = (updated: UserProgress) => {
    setProgress(updated);
    saveUserProgress(updated);
  };

  // Navigate to a specific lesson
  const handleNavigateLesson = (lessonId: string) => {
    if (lessonId === 'dashboard') {
      setCurrentTab('dashboard');
      return;
    }
    setActiveLessonId(lessonId);
    setCurrentTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTab = (tab: 'dashboard' | 'curriculum' | 'lab' | 'review' | 'dictionary' | 'projects') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Find active lesson object
  const allLessons = CURRICULUM_LEVELS.flatMap((lvl) => lvl.lessons);
  const currentLesson: Lesson =
    allLessons.find((l) => l.id === activeLessonId) || allLessons[0];

  // Backup export / reset
  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(progress, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `css_quest_sauvegarde_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (window.confirm('Voulez-vous vraiment réinitialiser votre progression dans CSS Quest ? Vos points XP, quêtes et badges seront remis à zéro.')) {
      const fresh = resetAllProgress();
      setProgress(fresh);
      setCurrentTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Strict 3-zone Header */}
      <Navbar
        currentTab={currentTab === 'lesson' ? 'curriculum' : currentTab}
        onSelectTab={handleSelectTab}
        onOpenVoiceTutor={() => setIsVoiceModalOpen(true)}
        progress={progress}
      />

      {/* Main Content Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'dashboard' && (
          <Dashboard
            progress={progress}
            onNavigateLesson={handleNavigateLesson}
            onNavigateTab={handleSelectTab}
            onOpenVoiceTutor={() => setIsVoiceModalOpen(true)}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {currentTab === 'curriculum' && (
          <CurriculumExplorer
            progress={progress}
            onNavigateLesson={handleNavigateLesson}
            onOpenVoiceTutor={() => setIsVoiceModalOpen(true)}
          />
        )}

        {currentTab === 'lesson' && currentLesson && (
          <LessonView
            lesson={currentLesson}
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onNavigateLesson={handleNavigateLesson}
            onOpenVoiceTutor={() => setIsVoiceModalOpen(true)}
          />
        )}

        {currentTab === 'lab' && (
          <CodeLab
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
          />
        )}

        {currentTab === 'review' && (
          <ReviewDashboard
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onNavigateLesson={handleNavigateLesson}
          />
        )}

        {currentTab === 'dictionary' && (
          <DictionaryView />
        )}

        {currentTab === 'projects' && (
          <ProjectsView
            progress={progress}
            onProgressUpdate={handleProgressUpdate}
            onOpenVoiceTutor={() => setIsVoiceModalOpen(true)}
          />
        )}
      </main>

      {/* Intelligent Voice Professor Modal */}
      <VoiceProfessorModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
        currentLessonTitle={currentTab === 'lesson' ? currentLesson?.title : undefined}
        currentCode={currentTab === 'lesson' ? currentLesson?.syntaxExample : undefined}
      />

      {/* Quiet Professional Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-8 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">CSS Quest</span>
            <span>&middot;</span>
            <span>Maîtriser le CSS moderne de zéro à expert</span>
            <span>&middot;</span>
            <span className="text-[11px] font-mono text-slate-600">14 Mondes &middot; Assistant Vocal &middot; Labo 2D</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              type="button"
              onClick={handleExportData}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Exporter mes données
            </button>
            <span>&middot;</span>
            <button
              type="button"
              onClick={handleResetData}
              className="hover:text-rose-400 transition-colors cursor-pointer"
            >
              Réinitialiser
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
