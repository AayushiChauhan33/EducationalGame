import { AcademyAchievement } from '../types/academy';
// First, let's define the missing types that your existing data needs
export interface Academy {
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
  gameType: 'action' | 'strategy' | 'puzzle' | 'rhythm' | 'adventure';
  unlocked: boolean;
  bestScore: number;
  timesPlayed: number;
  statReward: number;
  mechanics: {
    controls: string[];
    objectives: string[];
    powerUps: string[];
    enemies?: string[];
    timeLimit: number;
    multiplayer: boolean;
  };
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
    statBoost: Record<string, number>;
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

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
  reward: {
    costume?: string;
    title?: string;
    badge?: string;
    statBoost?: Record<string, number>;
  };
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

// Add GameSession interface here for compatibility
export interface GameSession {
  id: string;
  gameId: string;
  heroId: string;
  startTime: Date;
  endTime: Date;
  score: number;
  accuracy: number;
  questionsAnswered: number;
  timeElapsed: number;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
  statGains: {
    strength?: number;
    intelligence?: number;
    confidence?: number;
  };
}

// Your existing academy data (keeping it exactly as is)
export const academies: Academy[] = [
  {
    id: 'math',
    name: 'Math Academy - Strength Forge',
    description: 'Master mathematical powers to enhance your physical strength',
    icon: '🔥',
    color: 'from-red-600 to-orange-600',
    statType: 'strength',
    unlocked: true,
    progress: 0,
    level: 1,
    games: [
      {
        id: 'numeric-ninja',
        name: 'Numeric Ninja Dojo',
        description: 'Slice through cascading numbers in mathematical sequences',
        icon: '🥷',
        difficulty: 'Beginner',
        gameType: 'action',
        unlocked: true,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 10,
        mechanics: {
          controls: ['Mouse/Touch Gestures', 'Keyboard Arrows'],
          objectives: ['Slice correct sequence numbers', 'Avoid wrong numbers', 'Build combo chains'],
          powerUps: ['Time Freeze', 'Double Points', 'Sequence Hint'],
          enemies: ['Number Bombs', 'Sequence Breakers'],
          timeLimit: 120,
          multiplayer: true
        }
      },
      {
        id: 'geometric-portal',
        name: 'Geometric Portal Defense',
        description: 'Position 3D shapes to seal dimensional rifts',
        icon: '🔷',
        difficulty: 'Intermediate',
        gameType: 'strategy',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 12,
        mechanics: {
          controls: ['Drag & Drop', 'Rotation Controls', 'Zoom'],
          objectives: ['Seal all portals', 'Prevent monster escapes', 'Optimize shape placement'],
          powerUps: ['Shape Morph', 'Portal Slow', 'Monster Freeze'],
          enemies: ['Shadow Creatures', 'Portal Guardians'],
          timeLimit: 180,
          multiplayer: false
        }
      },
      {
        id: 'algebraic-arsenal',
        name: 'Algebraic Arsenal',
        description: 'Solve equations to charge weapons and blast enemies',
        icon: '⚡',
        difficulty: 'Advanced',
        gameType: 'action',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 15,
        mechanics: {
          controls: ['WASD Movement', 'Mouse Aim', 'Number Keys'],
          objectives: ['Solve equations quickly', 'Defeat robot enemies', 'Survive waves'],
          powerUps: ['Rapid Fire', 'Shield Generator', 'Equation Solver'],
          enemies: ['Math Bots', 'Equation Scramblers', 'Variable Viruses'],
          timeLimit: 300,
          multiplayer: true
        }
      },
      {
        id: 'fraction-fracture',
        name: 'Fraction Fracture',
        description: 'Combine fraction pieces to build bridges across chasms',
        icon: '🌉',
        difficulty: 'Intermediate',
        gameType: 'puzzle',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 8,
        mechanics: {
          controls: ['Click & Drag', 'Rotation', 'Zoom'],
          objectives: ['Build complete bridges', 'Use all fraction pieces', 'Minimize time'],
          powerUps: ['Fraction Hint', 'Auto-Align', 'Time Bonus'],
          timeLimit: 90,
          multiplayer: false
        }
      },
      {
        id: 'statistics-stadium',
        name: 'Statistics Stadium',
        description: 'Win sports competitions using data analysis',
        icon: '🏆',
        difficulty: 'Advanced',
        gameType: 'strategy',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 13,
        mechanics: {
          controls: ['Point & Click', 'Data Input', 'Chart Interaction'],
          objectives: ['Analyze player stats', 'Predict outcomes', 'Win championships'],
          powerUps: ['Data Boost', 'Probability Lens', 'Stat Multiplier'],
          timeLimit: 240,
          multiplayer: true
        }
      }
    ]
  },
  {
    id: 'science',
    name: 'Science Laboratory - Intelligence Core',
    description: 'Conduct experiments to boost your intellectual powers',
    icon: '🧪',
    color: 'from-blue-600 to-cyan-600',
    statType: 'intelligence',
    unlocked: true,
    progress: 0,
    level: 1,
    games: [
      {
        id: 'circuit-symphony',
        name: 'Circuit Symphony',
        description: 'Build electrical circuits with musical harmony',
        icon: '🎵',
        difficulty: 'Beginner',
        gameType: 'rhythm',
        unlocked: true,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 10,
        mechanics: {
          controls: ['Drag Components', 'Connect Wires', 'Rhythm Timing'],
          objectives: ['Complete circuits', 'Match musical beats', 'Power gadgets'],
          powerUps: ['Conductor Boost', 'Wire Glow', 'Beat Sync'],
          timeLimit: 150,
          multiplayer: false
        }
      },
      {
        id: 'chemical-chaos',
        name: 'Chemical Chaos Lab',
        description: 'Mix elements to solve environmental disasters',
        icon: '⚗️',
        difficulty: 'Intermediate',
        gameType: 'puzzle',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 12,
        mechanics: {
          controls: ['Drag Elements', 'Mix Controls', 'Temperature Adjust'],
          objectives: ['Create compounds', 'Neutralize toxins', 'Save ecosystems'],
          powerUps: ['Element Hint', 'Reaction Boost', 'Safety Shield'],
          enemies: ['Toxic Spills', 'Unstable Compounds'],
          timeLimit: 200,
          multiplayer: true
        }
      },
      {
        id: 'physics-flight',
        name: 'Physics Flight School',
        description: 'Navigate using physics calculations',
        icon: '🚀',
        difficulty: 'Advanced',
        gameType: 'action',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 15,
        mechanics: {
          controls: ['Arrow Keys', 'Physics Sliders', 'Calculation Input'],
          objectives: ['Navigate obstacles', 'Rescue civilians', 'Master physics'],
          powerUps: ['Gravity Control', 'Momentum Boost', 'Force Field'],
          enemies: ['Gravity Wells', 'Force Barriers'],
          timeLimit: 180,
          multiplayer: false
        }
      },
      {
        id: 'microscopic-mission',
        name: 'Microscopic Mission',
        description: 'Explore cellular environments and fight disease',
        icon: '🔬',
        difficulty: 'Intermediate',
        gameType: 'adventure',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 11,
        mechanics: {
          controls: ['WASD Movement', 'Zoom Controls', 'Tool Selection'],
          objectives: ['Identify pathogens', 'Repair cell damage', 'Navigate organelles'],
          powerUps: ['Cell Boost', 'Pathogen Scanner', 'Repair Kit'],
          enemies: ['Viruses', 'Bacteria', 'Toxins'],
          timeLimit: 240,
          multiplayer: false
        }
      },
      {
        id: 'engineering-emergency',
        name: 'Engineering Emergency',
        description: 'Design structures to solve crisis scenarios',
        icon: '🏗️',
        difficulty: 'Expert',
        gameType: 'strategy',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 18,
        mechanics: {
          controls: ['Build Tools', 'Material Selection', 'Stress Testing'],
          objectives: ['Design stable structures', 'Pass safety tests', 'Save civilians'],
          powerUps: ['Material Boost', 'Stress Vision', 'Quick Build'],
          timeLimit: 300,
          multiplayer: true
        }
      }
    ]
  },
  {
    id: 'english',
    name: 'English Academy - Confidence Castle',
    description: 'Master language arts to build unshakeable confidence',
    icon: '📚',
    color: 'from-purple-600 to-pink-600',
    statType: 'confidence',
    unlocked: true,
    progress: 0,
    level: 1,
    games: [
      {
        id: 'word-wizard-warfare',
        name: 'Word Wizard Warfare',
        description: 'Cast spells through fast-paced typing battles',
        icon: '🪄',
        difficulty: 'Beginner',
        gameType: 'action',
        unlocked: true,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 10,
        mechanics: {
          controls: ['Keyboard Typing', 'Spell Selection', 'Target Aiming'],
          objectives: ['Type words correctly', 'Cast powerful spells', 'Defeat shadow creatures'],
          powerUps: ['Speed Boost', 'Spell Amplifier', 'Word Shield'],
          enemies: ['Shadow Wraiths', 'Silence Spirits', 'Confusion Demons'],
          timeLimit: 120,
          multiplayer: true
        }
      },
      {
        id: 'story-architect',
        name: 'Story Architect',
        description: 'Build interactive narratives with meaningful choices',
        icon: '📖',
        difficulty: 'Intermediate',
        gameType: 'adventure',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 12,
        mechanics: {
          controls: ['Choice Selection', 'Text Input', 'Character Interaction'],
          objectives: ['Create compelling stories', 'Develop characters', 'Engage readers'],
          powerUps: ['Plot Twist', 'Character Depth', 'Reader Engagement'],
          timeLimit: 300,
          multiplayer: false
        }
      },
      {
        id: 'grammar-guardian',
        name: 'Grammar Guardian Duty',
        description: 'Fix grammar to rebuild damaged city infrastructure',
        icon: '🛠️',
        difficulty: 'Intermediate',
        gameType: 'puzzle',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 9,
        mechanics: {
          controls: ['Click & Edit', 'Drag Corrections', 'Rule Selection'],
          objectives: ['Fix grammar errors', 'Rebuild structures', 'Restore city'],
          powerUps: ['Grammar Guide', 'Auto-Correct', 'Structure Boost'],
          timeLimit: 180,
          multiplayer: false
        }
      },
      {
        id: 'vocabulary-venture',
        name: 'Vocabulary Venture',
        description: 'Unlock paths using word knowledge in platformer adventure',
        icon: '🗝️',
        difficulty: 'Advanced',
        gameType: 'adventure',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 14,
        mechanics: {
          controls: ['WASD Movement', 'Jump', 'Word Selection'],
          objectives: ['Navigate platforms', 'Unlock word doors', 'Find treasures'],
          powerUps: ['Word Hint', 'Double Jump', 'Treasure Radar'],
          enemies: ['Word Blockers', 'Definition Thieves'],
          timeLimit: 240,
          multiplayer: false
        }
      },
      {
        id: 'communication-commander',
        name: 'Communication Commander',
        description: 'Lead missions through persuasive writing and clear instructions',
        icon: '📢',
        difficulty: 'Expert',
        gameType: 'strategy',
        unlocked: false,
        bestScore: 0,
        timesPlayed: 0,
        statReward: 16,
        mechanics: {
          controls: ['Text Input', 'Team Commands', 'Strategy Selection'],
          objectives: ['Write clear instructions', 'Persuade team members', 'Complete missions'],
          powerUps: ['Clarity Boost', 'Persuasion Power', 'Team Sync'],
          timeLimit: 360,
          multiplayer: true
        }
      }
    ]
  }
];

export const miniBosses: MiniBoss[] = [
  {
    id: 'calculator-crusher',
    name: 'Calculator Crusher',
    description: 'A mechanical monster that scrambles mathematical operations',
    academy: 'math',
    health: 100,
    maxHealth: 100,
    attacks: [
      {
        name: 'Number Scramble',
        damage: 15,
        type: 'confusion',
        description: 'Scrambles displayed numbers',
        counterMethod: 'Solve equations quickly'
      },
      {
        name: 'Division Divide',
        damage: 20,
        type: 'split',
        description: 'Splits the screen into fractions',
        counterMethod: 'Combine fractions correctly'
      }
    ],
    weaknesses: ['Perfect calculations', 'Speed solving', 'Pattern recognition'],
    rewards: {
      experience: 500,
      statBoost: { strength: 25 },
      unlocks: ['Advanced Math Games', 'Calculator Crusher Costume']
    },
    defeated: false
  },
  {
    id: 'science-serpent',
    name: 'Science Serpent',
    description: 'A toxic creature that corrupts scientific experiments',
    academy: 'science',
    health: 120,
    maxHealth: 120,
    attacks: [
      {
        name: 'Toxic Cloud',
        damage: 18,
        type: 'poison',
        description: 'Releases poisonous gas',
        counterMethod: 'Create neutralizing compounds'
      },
      {
        name: 'Circuit Overload',
        damage: 22,
        type: 'electric',
        description: 'Overloads electrical systems',
        counterMethod: 'Build proper circuit protection'
      }
    ],
    weaknesses: ['Chemical knowledge', 'Circuit mastery', 'Environmental solutions'],
    rewards: {
      experience: 600,
      statBoost: { intelligence: 30 },
      unlocks: ['Expert Science Games', 'Lab Coat Costume']
    },
    defeated: false
  },
  {
    id: 'word-wraith',
    name: 'Word Wraith',
    description: 'A shadowy being that steals words and scrambles sentences',
    academy: 'english',
    health: 90,
    maxHealth: 90,
    attacks: [
      {
        name: 'Word Steal',
        damage: 12,
        type: 'drain',
        description: 'Removes words from vocabulary',
        counterMethod: 'Type replacement words quickly'
      },
      {
        name: 'Grammar Chaos',
        damage: 16,
        type: 'confusion',
        description: 'Scrambles sentence structure',
        counterMethod: 'Fix grammar errors rapidly'
      }
    ],
    weaknesses: ['Vocabulary mastery', 'Grammar expertise', 'Speed typing'],
    rewards: {
      experience: 450,
      statBoost: { confidence: 28 },
      unlocks: ['Master English Games', 'Scholar Robes Costume']
    },
    defeated: false
  }
];

export const academyAchievements: AcademyAchievement[] = [
  {
    id: 'first-steps',
    name: 'First Steps',
    description: 'Complete your first academy game',
    icon: '👶',
    category: 'general',
    requirement: 'Complete any academy game',
    reward: { statBoost: { strength: 5, intelligence: 5, confidence: 5 } },
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'math-master',
    name: 'Math Master',
    description: 'Complete all Math Academy games',
    icon: '🧮',
    category: 'math',
    requirement: 'Complete all 5 Math Academy games',
    reward: { costume: 'Mathematical Wizard', title: 'Number Ninja' },
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'science-scholar',
    name: 'Science Scholar',
    description: 'Complete all Science Laboratory games',
    icon: '🔬',
    category: 'science',
    requirement: 'Complete all 5 Science Laboratory games',
    reward: { costume: 'Lab Genius', title: 'Experiment Expert' },
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'word-warrior',
    name: 'Word Warrior',
    description: 'Complete all English Academy games',
    icon: '⚔️',
    category: 'english',
    requirement: 'Complete all 5 English Academy games',
    reward: { costume: 'Literary Legend', title: 'Grammar Guardian' },
    unlocked: false,
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'speed-demon',
    name: 'Speed Demon',
    description: 'Complete any game in under 30 seconds',
    icon: '⚡',
    category: 'general',
    requirement: 'Finish a game in less than 30 seconds',
    reward: { badge: 'Lightning Bolt', statBoost: { confidence: 10 } },
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 100% accuracy in any game',
    icon: '💯',
    category: 'general',
    requirement: 'Complete a game with perfect accuracy',
    reward: { badge: 'Perfect Score', statBoost: { intelligence: 15 } },
    unlocked: false,
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'boss-slayer',
    name: 'Boss Slayer',
    description: 'Defeat all three academy mini-bosses',
    icon: '🏆',
    category: 'general',
    requirement: 'Defeat Calculator Crusher, Science Serpent, and Word Wraith',
    reward: { costume: 'Champion Armor', title: 'Academy Champion' },
    unlocked: false,
    progress: 0,
    maxProgress: 3
  }
];

// Helper functions for working with academy data
export const getAcademyById = (id: string): Academy | undefined => {
  return academies.find(academy => academy.id === id);
};

export const getAcademyByName = (name: string): Academy | undefined => {
  return academies.find(academy => 
    academy.name.toLowerCase().includes(name.toLowerCase()) ||
    academy.statType.toLowerCase() === name.toLowerCase()
  );
};

export const getGameById = (gameId: string): AcademyGame | undefined => {
  for (const academy of academies) {
    const game = academy.games.find(game => game.id === gameId);
    if (game) return game;
  }
  return undefined;
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return academyAchievements.find(achievement => achievement.id === id);
};

export const getMiniBossById = (id: string): MiniBoss | undefined => {
  return miniBosses.find(boss => boss.id === id);
};

// Map game IDs to subject types for compatibility
export const mapGameToSubject = (gameId: string): 'Math' | 'Science' | 'English' => {
  const game = getGameById(gameId);
  if (!game) return 'Math';
  
  const academy = academies.find(a => a.games.some(g => g.id === gameId));
  if (!academy) return 'Math';
  
  switch (academy.statType) {
    case 'strength': return 'Math';
    case 'intelligence': return 'Science';
    case 'confidence': return 'English';
    default: return 'Math';
  }
};

// Convert difficulty formats
export const convertDifficulty = (academyDifficulty: string): 'easy' | 'medium' | 'hard' => {
  switch (academyDifficulty.toLowerCase()) {
    case 'beginner': return 'easy';
    case 'intermediate': return 'medium';
    case 'advanced':
    case 'expert': return 'hard';
    default: return 'medium';
  }
};

// Check if academy is unlocked based on hero progress
export const isAcademyUnlocked = (academy: Academy, heroLevel: number, completedAcademies: string[]): boolean => {
  // Basic unlock logic - you can enhance this
  if (academy.id === 'math') return true; // Math always unlocked
  if (academy.id === 'science') return heroLevel >= 3;
  if (academy.id === 'english') return heroLevel >= 5;
  return false;
};

// Get unlocked games in an academy
export const getUnlockedGames = (academy: Academy, completedGames: string[]): AcademyGame[] => {
  return academy.games.filter((game, index) => {
    if (index === 0) return true; // First game always unlocked
    const previousGame = academy.games[index - 1];
    return completedGames.includes(previousGame.id);
  });
};