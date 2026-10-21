export type SkillStatus = 'to_discover' | 'learning' | 'to_review' | 'mastered';

export type MissionMode =
  | 'find_property'      // Mode 1 : Trouve la propriété
  | 'fix_css'            // Mode 2 : Répare le CSS
  | 'reproduce_design'   // Mode 3 : Reproduis le design
  | 'choose_value'       // Mode 4 : Choisis la bonne valeur
  | 'timed_challenge'    // Mode 5 : Défi chronométré
  | 'boss_battle'        // Mode 6 : Boss final
  | 'visual_debug'       // Mode 7 : Débogage visuel
  | 'free_mode';         // Mode 8 : Mode libre

export type VisualSchemaType =
  | 'box-model'
  | 'flexbox'
  | 'grid'
  | 'positioning'
  | 'responsive'
  | 'specificity'
  | 'animations'
  | 'variables';

export interface PropertyBreakdownItem {
  property: string;
  value: string;
  role: string;
  tip?: string;
}

export interface CommonMistake {
  mistake: string;
  why: string;
  fix: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface InteractiveExercise {
  instruction: string;
  starterHtml: string;
  starterCss: string;
  expectedCssRules: string[]; // e.g. ["display: flex", "justify-content: center"]
  hints: string[];
  solutionCss: string;
  explanation: string;
}

export interface MemoryFlashcard {
  front: string;
  back: string;
  keyRule: string;
}

export interface Lesson {
  id: string;
  levelId: number;
  levelTitle: string;
  title: string;
  slug: string;
  shortDescription: string;
  readingTimeMinutes: number;
  xpReward: number;
  mode: MissionMode;

  // 7-step pedagogical method
  conceptName: string;                     // 1. Découvrir: Nom de la notion
  problemContext: string;                  // 1. Problème concret
  simpleDefinition: string;                // 2. Comprendre: Définition simple en français
  beginnerAnalogy: string;                 // 2. Analogie pour débutant
  syntaxExample: string;                   // 2. Syntaxe correcte
  visualSchemaType: VisualSchemaType;      // 3. Visualiser: Schéma animé
  visualSchemaCaption?: string;
  interactiveExercise: InteractiveExercise;// 4 & 5. Manipuler & Pratiquer
  commonMistakes: CommonMistake[];         // 6. Corriger: Erreurs fréquentes
  detailedCorrection: string;              // 6. Solution expliquée
  keyTakeaways: [string, string, string];  // 7. Réviser: Résumé 3 points
  miniQuiz: QuizQuestion;                  // 7. Mini quiz
  memoryFlashcard: MemoryFlashcard;        // 7. Astuce de mémorisation
  browserSupport?: string;                 // Compatibilité navigateur
}

export interface Level {
  id: number;
  worldNumber: number;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  isUnlockedByDefault?: boolean;
  lessons: Lesson[];
  bossBattle?: {
    title: string;
    description: string;
    xpReward: number;
    challengeTask: string;
    starterHtml: string;
    starterCss: string;
    expectedCssRules: string[];
    solutionCss: string;
    hints: string[];
  };
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  category: 'progress' | 'mastery' | 'streak' | 'lab';
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  progress: number;
  target: number;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'lab' | 'review';
}

export interface ReviewItem {
  id: string;
  lessonId: string;
  conceptTitle: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  lastReviewedAt?: string;
  reviewCount: number;
  consecutiveSuccesses: number;
  status: SkillStatus;
}

export interface FinalProject {
  id: string;
  title: string;
  shortDescription: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  estimatedTime: string;
  brief: string;
  starterHtml: string;
  starterCss: string;
  solutionCss: string;
  criteria: string[];
  expectedCssRules: string[];
  targetPreviewDescription: string;
  completed?: boolean;
}

export interface DiagnosticQuestion {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

export interface UserProgress {
  xp: number;
  levelRank: string; // e.g. "Apprenti CSS", "Styliste des Boîtes", "Maître Flexbox", "Architecte CSS"
  streakDays: number;
  lastActiveDate: string; // YYYY-MM-DD
  dailyGoalXp: number;
  dailyXpEarned: number;
  diagnosticCompleted: boolean;
  diagnosticLevel?: 'beginner' | 'intermediate' | 'advanced';
  completedLessonIds: string[];
  unlockedBadgeIds: string[];
  currentLessonId: string;
  skillsMastery: Record<string, SkillStatus>;
  reviewDeck: ReviewItem[];
  completedProjectIds: string[];
  savedSnippets: Array<{ id: string; title: string; html: string; css: string; date: string }>;
}

export interface DictionaryEntry {
  propertyName: string;
  category:
    | 'Fondamentaux'
    | 'Couleurs & Arrière-plans'
    | 'Box Model & Dimensions'
    | 'Flexbox'
    | 'CSS Grid'
    | 'Positionnement'
    | 'Responsive'
    | 'Animations & Transitions'
    | 'Variables & Modernes'
    | 'Sélecteurs & Pseudo';
  frenchDefinition: string;
  concreteUtility: string;
  syntaxExample: string;
  commonValues: string[];
  commonTrap: string;
  comparisonWithSimilar: string;
  browserSupport: string;
  mnemonicTip: string;
  previewHtml: string;
  previewCss: string;
  isFavorite?: boolean;
}
