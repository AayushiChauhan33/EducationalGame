export interface Villain {
  id: string;
  name: string;
  title: string;
  description: string;
  tier: 1 | 2;
  avatar: string;
  theme: string;
  backstory: string;
  motivation: string;
  
  // Combat Stats
  health: number;
  maxHealth: number;
  armor: number;
  speed: number;
  
  // Weaknesses and Resistances
  weaknesses: StatType[];
  resistances: StatType[];
  requiredStats: {
    strength?: number;
    intelligence?: number;
    confidence?: number;
  };
  
  // Combat Abilities
  attacks: VillainAttack[];
  specialAbilities: VillainAbility[];
  phases: BattlePhase[];
  
  // Rewards
  rewards: {
    experience: number;
    statBoosts: Partial<HeroStats>;
    unlocks: string[];
    cityAreas: string[];
  };
  
  // Battle Environment
  lair: VillainLair;
  defeated: boolean;
  timesDefeated: number;
  bestDefeatTime: number;
}

export interface VillainAttack {
  id: string;
  name: string;
  description: string;
  damage: number;
  type: AttackType;
  element: ElementType;
  animation: string;
  soundEffect: string;
  cooldown: number;
  requiredPhase?: number;
  counterMethod: string;
  educationalHint: string;
}

export interface VillainAbility {
  id: string;
  name: string;
  description: string;
  effect: AbilityEffect;
  duration: number;
  animation: string;
  trigger: AbilityTrigger;
}

export interface BattlePhase {
  id: number;
  name: string;
  healthThreshold: number;
  description: string;
  newAttacks: string[];
  environmentChanges: EnvironmentChange[];
  dialogue: string[];
}

export interface VillainLair {
  id: string;
  name: string;
  description: string;
  theme: string;
  backgroundMusic: string;
  environmentalHazards: EnvironmentalHazard[];
  interactiveElements: InteractiveElement[];
  hiddenSecrets: HiddenSecret[];
  atmosphericEffects: AtmosphericEffect[];
}

export interface CombatSession {
  villainId: string;
  startTime: Date;
  endTime?: Date;
  heroStats: HeroStats;
  damageDealt: number;
  damageTaken: number;
  attacksUsed: CombatAction[];
  educationalSkillsUsed: string[];
  comboCount: number;
  maxCombo: number;
  criticalHits: number;
  perfectDodges: number;
  environmentalInteractions: number;
  finalScore: number;
  victory: boolean;
  defeatMethod: string;
}

export interface CombatAction {
  id: string;
  type: 'attack' | 'defend' | 'special' | 'environmental';
  name: string;
  damage: number;
  statUsed: StatType;
  educationalConcept: string;
  timestamp: number;
  success: boolean;
  critical: boolean;
}

export type StatType = 'strength' | 'intelligence' | 'confidence';
export type AttackType = 'physical' | 'mental' | 'emotional' | 'environmental' | 'combo';
export type ElementType = 'math' | 'science' | 'english' | 'chaos' | 'neutral';
export type AbilityEffect = 'damage' | 'heal' | 'buff' | 'debuff' | 'environmental' | 'summon';
export type AbilityTrigger = 'health' | 'time' | 'damage' | 'phase' | 'random';

export interface EnvironmentChange {
  type: 'lighting' | 'obstacles' | 'hazards' | 'platforms' | 'weather';
  description: string;
  effect: string;
}

export interface EnvironmentalHazard {
  id: string;
  name: string;
  description: string;
  damage: number;
  avoidanceMethod: string;
  educationalTip: string;
}

export interface InteractiveElement {
  id: string;
  name: string;
  description: string;
  requiredStat: StatType;
  requiredLevel: number;
  effect: string;
  educationalChallenge: string;
}

export interface HiddenSecret {
  id: string;
  name: string;
  description: string;
  location: string;
  reward: string;
  discoveryMethod: string;
}

export interface AtmosphericEffect {
  type: 'particles' | 'lighting' | 'sound' | 'weather' | 'distortion';
  intensity: number;
  color?: string;
  animation: string;
}

export interface TeamUpAbility {
  id: string;
  name: string;
  description: string;
  requiredAllies: string[];
  damage: number;
  animation: string;
  educationalBonus: string;
}

export interface CityArea {
  id: string;
  name: string;
  description: string;
  unlockedBy: string;
  citizens: number;
  buildings: string[];
  activities: string[];
  threats: string[];
}