import { VoicePack, Mission } from '../types';

export const voicePacks: VoicePack[] = [
  {
    id: 'classic',
    name: 'Classic Hero',
    battleCries: ['For justice!', 'Never give up!', 'Hero time!'],
    victorySounds: ['Victory!', 'Justice prevails!', 'Well done!']
  },
  {
    id: 'tech',
    name: 'Tech Specialist',
    battleCries: ['Systems online!', 'Engaging protocols!', 'Technology activate!'],
    victorySounds: ['Mission complete!', 'Systems successful!', 'Protocol achieved!']
  },
  {
    id: 'mystic',
    name: 'Mystical Warrior',
    battleCries: ['By the ancient powers!', 'Magic flows through me!', 'Mystical forces unite!'],
    victorySounds: ['The prophecy is fulfilled!', 'Magic has triumphed!', 'Ancient wisdom wins!']
  }
];

export const dailyMissions: Mission[] = [
  {
    id: 'math-villain',
    title: 'Defeat the Calculator Crusher',
    description: 'Solve math problems to weaken this numerical nemesis',
    difficulty: 'Easy',
    rewards: { experience: 100, statBoosts: { intelligence: 5 } },
    isDaily: true,
    threatLevel: 3
  },
  {
    id: 'word-wizard',
    title: 'Stop the Word Wizard',
    description: 'Use vocabulary skills to counter his spelling spells',
    difficulty: 'Medium',
    rewards: { experience: 150, statBoosts: { confidence: 7 } },
    isDaily: true,
    threatLevel: 5
  },
  {
    id: 'science-serpent',
    title: 'Battle the Science Serpent',
    description: 'Apply scientific knowledge to neutralize toxic experiments',
    difficulty: 'Hard',
    rewards: { experience: 200, statBoosts: { intelligence: 10, strength: 5 } },
    isDaily: true,
    threatLevel: 7
  }
];