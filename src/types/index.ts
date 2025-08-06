export interface Hero {
  id: string;
  name: string;
  archetype: {
    id: string;
    name: string;
    icon: string;
    description: string;
    baseStats: { strength: number; intelligence: number; confidence: number };
    specialAbilities: string[];
    colors: string[];
  };
  appearance: {
    colorPrimary: string;
    colorSecondary: string;
    colorAccent: string;
  };
  stats: {
    strength: number;
    intelligence: number;
    confidence: number;
  };
  level: number;
  experience: number;
}

export interface HeroStats {
  strength: number;
  intelligence: number;
  confidence: number;
}

export interface VoicePack {
  id: string;
  name: string;
  battleCries: string[];
  victorySounds: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Epic';
  rewards: {
    experience: number;
    statBoosts: Partial<HeroStats>;
  };
  isDaily: boolean;
  threatLevel: number;
}

export type GameScreen = 'opening' | 'characterCreation' | 'headquarters' | 'academies' | 'game' | 'results' | 'villains' | 'villainEncounter';
