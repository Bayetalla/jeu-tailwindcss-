import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = () => {
    localStorage.removeItem('css_quest_progress_v2');
    localStorage.removeItem('tailwind_quest_progress_v1');
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-slate-900 border border-rose-500/30 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h2 className="text-lg font-bold">Une erreur est survenue</h2>
            </div>
            <p className="text-sm text-slate-300">
              L'application a rencontré un problème inattendu lors de l'affichage. Vous pouvez recharger la page ou réinitialiser les données locales si nécessaire.
            </p>
            {this.state.error && (
              <div className="p-3 rounded-lg bg-black/60 border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto">
                {this.state.error.toString()}
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Recharger l'application
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Réinitialiser les données
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
