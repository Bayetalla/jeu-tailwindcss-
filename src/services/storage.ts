import { UserProgress, ReviewItem } from '../types';

const STORAGE_KEY = 'css_quest_progress_v2';

const getTodayString = (): string => {
  const now = new Date();
  return now.toISOString().split('T')[0];
};

export const calculateRank = (xp: number): string => {
  if (xp >= 2200) return 'Grand Architecte CSS';
  if (xp >= 1400) return 'Alchimiste du Responsive';
  if (xp >= 800) return 'Seigneur de CSS Grid';
  if (xp >= 400) return 'Maître Flexbox';
  if (xp >= 150) return 'Styliste des Boîtes';
  return 'Apprenti CSS';
};

export const INITIAL_PROGRESS: UserProgress = {
  xp: 120,
  levelRank: 'Apprenti CSS',
  streakDays: 3,
  lastActiveDate: getTodayString(),
  dailyGoalXp: 100,
  dailyXpEarned: 60,
  diagnosticCompleted: false,
  completedLessonIds: ['1-1'],
  unlockedBadgeIds: ['first_selector'],
  currentLessonId: '1-2',
  completedProjectIds: [],
  skillsMastery: {
    'css-syntax': 'mastered',
    'box-model': 'learning',
    'colors-oklch': 'to_discover',
    'flexbox': 'to_discover',
    'grid': 'to_discover',
    'positioning': 'to_discover',
    'responsive-design': 'to_discover',
    'animations': 'to_discover',
    'custom-properties': 'to_discover',
    'advanced-selectors': 'to_discover',
    'modern-functions': 'to_discover',
    'container-queries': 'to_discover',
    'accessibility': 'to_discover',
  },
  reviewDeck: [
    {
      id: 'rev-1',
      lessonId: '1-1',
      conceptTitle: 'Anatomie d\'une règle CSS',
      question: 'Dans la règle `h1 { color: royalblue; }`, que représente `color` ?',
      options: [
        'Le sélecteur',
        'La propriété CSS',
        'La valeur',
        'La pseudo-classe',
      ],
      correctIndex: 1,
      explanation: 'Dans une déclaration CSS, la propriété est le paramètre à modifier (ici `color`), et `royalblue` est sa valeur.',
      reviewCount: 1,
      consecutiveSuccesses: 1,
      status: 'learning',
    },
    {
      id: 'rev-2',
      lessonId: '3-1',
      conceptTitle: 'Box Model & box-sizing',
      question: 'Pourquoi recommande-t-on d\'utiliser `box-sizing: border-box;` ?',
      options: [
        'Pour supprimer automatiquement les marges',
        'Pour inclure le padding et la bordure dans la largeur définie de l\'élément',
        'Pour convertir l\'élément en Flexbox',
        'Pour désactiver les animations',
      ],
      correctIndex: 1,
      explanation: 'Avec `border-box`, `width: 300px` garantit que la boîte fera exactement 300px, même si vous ajoutez 20px de padding et 2px de bordure.',
      reviewCount: 1,
      consecutiveSuccesses: 1,
      status: 'learning',
    },
  ],
  savedSnippets: [
    {
      id: 'snip-1',
      title: 'Centrage Parfait Flexbox',
      html: '<div class="card">\n  <h2>Centré à la perfection !</h2>\n  <p>Flexbox rend le centrage horizontal et vertical instantané.</p>\n</div>',
      css: '.parent-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 200px;\n  background: #0f172a;\n  border-radius: 12px;\n  padding: 24px;\n}\n\n.card {\n  background: #1e293b;\n  color: #f8fafc;\n  padding: 20px 24px;\n  border-radius: 8px;\n  border: 1px solid #334155;\n  text-align: center;\n}',
      date: getTodayString(),
    },
  ],
};

export const loadUserProgress = (): UserProgress => {
  try {
    let raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Try migrating from legacy key if present
      raw = localStorage.getItem('tailwind_quest_progress_v1');
    }
    if (!raw) {
      saveUserProgress(INITIAL_PROGRESS);
      return INITIAL_PROGRESS;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      saveUserProgress(INITIAL_PROGRESS);
      return INITIAL_PROGRESS;
    }

    const today = getTodayString();
    let streak = typeof parsed.streakDays === 'number' && !isNaN(parsed.streakDays) ? parsed.streakDays : 1;
    let dailyXp = typeof parsed.dailyXpEarned === 'number' && !isNaN(parsed.dailyXpEarned) ? parsed.dailyXpEarned : 0;

    // Check streak safely
    if (parsed.lastActiveDate && typeof parsed.lastActiveDate === 'string') {
      if (parsed.lastActiveDate !== today) {
        const lastDate = new Date(parsed.lastActiveDate);
        const currentDate = new Date(today);
        if (!isNaN(lastDate.getTime())) {
          const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

          if (diffDays === 1) {
            streak += 1;
          } else if (diffDays > 1) {
            streak = 1;
          }
        }
        dailyXp = 0;
      }
    }

    const currentXp = typeof parsed.xp === 'number' && !isNaN(parsed.xp) ? parsed.xp : 120;

    const safeProgress: UserProgress = {
      ...INITIAL_PROGRESS,
      ...parsed,
      xp: currentXp,
      levelRank: calculateRank(currentXp),
      streakDays: streak,
      lastActiveDate: today,
      dailyGoalXp: typeof parsed.dailyGoalXp === 'number' && !isNaN(parsed.dailyGoalXp) ? parsed.dailyGoalXp : 100,
      dailyXpEarned: dailyXp,
      diagnosticCompleted: Boolean(parsed.diagnosticCompleted),
      completedLessonIds: Array.isArray(parsed.completedLessonIds) ? parsed.completedLessonIds : ['1-1'],
      unlockedBadgeIds: Array.isArray(parsed.unlockedBadgeIds) ? parsed.unlockedBadgeIds : ['first_selector'],
      completedProjectIds: Array.isArray(parsed.completedProjectIds) ? parsed.completedProjectIds : [],
      currentLessonId: typeof parsed.currentLessonId === 'string' ? parsed.currentLessonId : '1-1',
      skillsMastery: parsed.skillsMastery && typeof parsed.skillsMastery === 'object' ? parsed.skillsMastery : INITIAL_PROGRESS.skillsMastery,
      reviewDeck: Array.isArray(parsed.reviewDeck) ? parsed.reviewDeck : INITIAL_PROGRESS.reviewDeck,
      savedSnippets: Array.isArray(parsed.savedSnippets) ? parsed.savedSnippets : INITIAL_PROGRESS.savedSnippets,
    };

    saveUserProgress(safeProgress);
    return safeProgress;
  } catch (err) {
    console.error('Erreur chargement progression:', err);
    saveUserProgress(INITIAL_PROGRESS);
    return INITIAL_PROGRESS;
  }
};

export const saveUserProgress = (progress: UserProgress): void => {
  try {
    if (!progress || typeof progress !== 'object') return;
    progress.levelRank = calculateRank(progress.xp || 0);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (err) {
    console.error('Erreur sauvegarde progression:', err);
  }
};

export const addXp = (amount: number): UserProgress => {
  const current = loadUserProgress();
  current.xp += amount;
  current.dailyXpEarned += amount;
  current.levelRank = calculateRank(current.xp);
  saveUserProgress(current);
  return current;
};

export const markLessonComplete = (lessonId: string, xpReward: number): UserProgress => {
  const current = loadUserProgress();
  if (!current.completedLessonIds.includes(lessonId)) {
    current.completedLessonIds.push(lessonId);
    current.xp += xpReward;
    current.dailyXpEarned += xpReward;
    current.levelRank = calculateRank(current.xp);
  }
  current.currentLessonId = lessonId;
  saveUserProgress(current);
  return current;
};

export const markProjectComplete = (projectId: string, xpReward: number): UserProgress => {
  const current = loadUserProgress();
  if (!current.completedProjectIds) {
    current.completedProjectIds = [];
  }
  if (!current.completedProjectIds.includes(projectId)) {
    current.completedProjectIds.push(projectId);
    current.xp += xpReward;
    current.dailyXpEarned += xpReward;
    current.levelRank = calculateRank(current.xp);
  }
  saveUserProgress(current);
  return current;
};

export const updateSkillStatus = (skillId: string, status: UserProgress['skillsMastery'][string]): UserProgress => {
  const current = loadUserProgress();
  current.skillsMastery[skillId] = status;
  saveUserProgress(current);
  return current;
};

export const addReviewMistake = (item: Omit<ReviewItem, 'id' | 'reviewCount' | 'consecutiveSuccesses' | 'status'>): UserProgress => {
  const current = loadUserProgress();
  const existingIndex = current.reviewDeck.findIndex((r) => r.question === item.question);

  if (existingIndex >= 0) {
    current.reviewDeck[existingIndex].status = 'to_review';
    current.reviewDeck[existingIndex].consecutiveSuccesses = 0;
  } else {
    current.reviewDeck.push({
      ...item,
      id: `rev-${Date.now()}`,
      reviewCount: 0,
      consecutiveSuccesses: 0,
      status: 'to_review',
    });
  }
  saveUserProgress(current);
  return current;
};

export const recordReviewSuccess = (reviewId: string): UserProgress => {
  const current = loadUserProgress();
  const item = current.reviewDeck.find((r) => r.id === reviewId);
  if (item) {
    item.reviewCount += 1;
    item.consecutiveSuccesses += 1;
    item.lastReviewedAt = new Date().toISOString();
    if (item.consecutiveSuccesses >= 3) {
      item.status = 'mastered';
    } else {
      item.status = 'learning';
    }
    current.xp += 15;
    current.dailyXpEarned += 15;
    current.levelRank = calculateRank(current.xp);
    saveUserProgress(current);
  }
  return current;
};

export const unlockBadge = (badgeId: string): UserProgress => {
  const current = loadUserProgress();
  if (!current.unlockedBadgeIds.includes(badgeId)) {
    current.unlockedBadgeIds.push(badgeId);
    current.xp += 50;
    current.levelRank = calculateRank(current.xp);
    saveUserProgress(current);
  }
  return current;
};

export const resetAllProgress = (): UserProgress => {
  const fresh: UserProgress = {
    ...INITIAL_PROGRESS,
    xp: 0,
    streakDays: 1,
    lastActiveDate: getTodayString(),
    dailyXpEarned: 0,
    completedLessonIds: [],
    unlockedBadgeIds: [],
    completedProjectIds: [],
    currentLessonId: '1-1',
    reviewDeck: [],
    diagnosticCompleted: false,
  };
  saveUserProgress(fresh);
  return fresh;
};
