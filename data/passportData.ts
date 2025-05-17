import { Adventure } from '@/types/adventure';
import { mockAdventures } from './mockData';

// For demo purposes, we'll use the mock adventures as completed adventures
export const completedAdventures: Adventure[] = mockAdventures.slice(0, 3);

export const passportStatistics = {
  totalDistance: 14.2,
  totalTime: 12.5,
  locationsVisited: 15,
  citiesExplored: 2,
  adventuresCompleted: 5
};

export const achievements = [
  {
    id: 'ach1',
    name: 'First Step',
    description: 'Complete your first adventure',
    icon: '🏆',
    dateEarned: '2025-02-15'
  },
  {
    id: 'ach2',
    name: 'History Buff',
    description: 'Complete 3 historical adventures',
    icon: '🏛️',
    dateEarned: '2025-02-28'
  },
  {
    id: 'ach3',
    name: 'Urban Explorer',
    description: 'Visit 10 different locations',
    icon: '🔍',
    dateEarned: '2025-03-10'
  },
  {
    id: 'ach4',
    name: 'Foodie',
    description: 'Visit 5 culinary spots',
    icon: '🍽️',
    dateEarned: '2025-03-15'
  }
];

export const exploredCities = [
  {
    name: 'Seattle',
    adventuresCompleted: 4,
    totalAdventures: 8
  },
  {
    name: 'Portland',
    adventuresCompleted: 1,
    totalAdventures: 6
  }
];