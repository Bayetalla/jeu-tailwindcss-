import { DailyQuest } from '../types';

export const DAILY_QUESTS: DailyQuest[] = [
  {
    id: 'quest-lesson',
    title: 'Avancer sur le parcours',
    description: 'Compléter au moins une leçon pédagogique aujourd\'hui.',
    xpReward: 40,
    progress: 1,
    target: 1,
    completed: true,
    type: 'lesson',
  },
  {
    id: 'quest-quiz',
    title: 'Sans faute au Quiz',
    description: 'Répondre correctement à un mini-quiz du premier coup.',
    xpReward: 30,
    progress: 1,
    target: 1,
    completed: true,
    type: 'quiz',
  },
  {
    id: 'quest-review',
    title: 'Révision éclair',
    description: 'Réviser 2 notions dans votre paquet de répétition espacée.',
    xpReward: 35,
    progress: 1,
    target: 2,
    completed: false,
    type: 'review',
  },
  {
    id: 'quest-lab',
    title: 'Expérimenter dans le Labo',
    description: 'Tester et personnaliser un composant dans le Laboratoire en direct.',
    xpReward: 25,
    progress: 0,
    target: 1,
    completed: false,
    type: 'lab',
  },
];
