// Add this import at the top of academy.ts
import { HeroStats } from './index';

export interface Academy{
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  statType: 'strength' | 'intelligence' | 'confidence';
  unlocked: boolean;
  progress: number;
  level: number;
  games: AcademyGame[];
}

export interface AcademyGame {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  gameType: 'action' | 'puzzle' | 'strategy' | 'adventure' | 'rhythm';
  unlocked: boolean;
  bestScore: number;
  timesPlayed: number;
  statReward: number;
  mechanics: GameMechanics;
}

export interface GameMechanics {
  controls: string[];
  objectives: string[];
  powerUps: string[];
  enemies?: string[];
  timeLimit?: number;
  multiplayer?: boolean;
}

export interface GameSession {
  gameId: string;
  startTime: Date;
  score: number;
  accuracy: number;
  timeElapsed: number;
  questionsAnswered: number;
  powerUpsUsed: string[];
  achievements: string[];
}

export interface LeaderboardEntry {
  heroName: string;
  score: number;
  academy: string;
  game: string;
  timestamp: Date;
  rank: number;
}

export interface AcademyAchievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'math' | 'science' | 'english' | 'general';
  requirement: string;
  reward: {
    statBoost?: Partial<HeroStats>;
    costume?: string;
    title?: string;
    badge?: string;
  };
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export interface MiniBoss {
  id: string;
  name: string;
  description: string;
  academy: string;
  health: number;
  maxHealth: number;
  attacks: BossAttack[];
  weaknesses: string[];
  rewards: {
    experience: number;
    statBoost: Partial<HeroStats>;
    unlocks: string[];
  };
  defeated: boolean;
}

export interface BossAttack {
  name: string;
  damage: number;
  type: string;
  description: string;
  counterMethod: string;
}

export type GameScreen = 'opening' | 'characterCreation' | 'headquarters' | 'academies' | 'game' | 'results';