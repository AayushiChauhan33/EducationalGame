import { Villain, TeamUpAbility, CityArea } from '../types/villain';

export const villains: Villain[] = [
  // TIER 1 VILLAINS - Stat Specialists
  {
    id: 'dr-subtract',
    name: 'Dr. Subtract',
    title: 'The Number Destroyer',
    description: 'A mad mathematician who seeks to drain all numbers from the world, leaving only chaos and confusion.',
    tier: 1,
    avatar: '🧮',
    theme: 'mathematical-chaos',
    backstory: 'Once a brilliant professor, Dr. Subtract became obsessed with the idea that mathematics was too complex for ordinary minds. He now seeks to "simplify" the world by removing all numbers.',
    motivation: 'Believes mathematics should be eliminated to free humanity from numerical confusion',
    
    health: 1000,
    maxHealth: 1000,
    armor: 20,
    speed: 60,
    
    weaknesses: ['strength'],
    resistances: ['intelligence'],
    requiredStats: { strength: 50 },
    
    attacks: [
      {
        id: 'equation-bomb',
        name: 'Explosive Equation',
        description: 'Hurls a glowing mathematical equation that explodes on impact',
        damage: 150,
        type: 'physical',
        element: 'math',
        animation: 'equation-explosion',
        soundEffect: 'math-blast',
        cooldown: 3000,
        counterMethod: 'Solve the equation quickly to defuse',
        educationalHint: 'Use order of operations (PEMDAS) to solve complex equations'
      },
      {
        id: 'geometric-trap',
        name: 'Geometric Prison',
        description: 'Summons rotating geometric shapes that trap the hero',
        damage: 100,
        type: 'environmental',
        element: 'math',
        animation: 'shape-prison',
        soundEffect: 'geometric-lock',
        cooldown: 5000,
        counterMethod: 'Calculate angles to find the escape route',
        educationalHint: 'Remember that angles in a triangle always sum to 180 degrees'
      },
      {
        id: 'number-drain',
        name: 'Numerical Void',
        description: 'Creates a vortex that drains mathematical knowledge',
        damage: 80,
        type: 'mental',
        element: 'math',
        animation: 'number-vortex',
        soundEffect: 'void-drain',
        cooldown: 4000,
        counterMethod: 'Recite multiplication tables to resist',
        educationalHint: 'Strong foundational math skills provide mental resistance'
      }
    ],
    
    specialAbilities: [
      {
        id: 'calculation-chaos',
        name: 'Calculation Chaos',
        description: 'Scrambles all numbers on screen for 10 seconds',
        effect: 'debuff',
        duration: 10000,
        animation: 'number-scramble',
        trigger: 'health'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Arithmetic Assault',
        healthThreshold: 100,
        description: 'Dr. Subtract uses basic mathematical attacks',
        newAttacks: ['equation-bomb'],
        environmentChanges: [],
        dialogue: ['You cannot defeat the power of pure mathematics!', 'Numbers are the enemy of free thought!']
      },
      {
        id: 2,
        name: 'Geometric Fury',
        healthThreshold: 60,
        description: 'Geometric shapes begin appearing as obstacles',
        newAttacks: ['geometric-trap'],
        environmentChanges: [
          { type: 'obstacles', description: 'Rotating geometric shapes appear', effect: 'movement-restriction' }
        ],
        dialogue: ['Behold the beauty of geometric destruction!', 'Shapes shall be your downfall!']
      },
      {
        id: 3,
        name: 'Numerical Apocalypse',
        healthThreshold: 20,
        description: 'Final desperate assault with all mathematical powers',
        newAttacks: ['number-drain'],
        environmentChanges: [
          { type: 'lighting', description: 'Numbers rain from the sky', effect: 'visual-chaos' }
        ],
        dialogue: ['I will drain every number from existence!', 'Mathematics dies with me!']
      }
    ],
    
    rewards: {
      experience: 500,
      statBoosts: { strength: 25, intelligence: 10 },
      unlocks: ['Advanced Math Games', 'Calculator Crusher Costume', 'Number Ninja Title'],
      cityAreas: ['Mathematics District', 'Academy Plaza']
    },
    
    lair: {
      id: 'number-fortress',
      name: 'The Calculation Citadel',
      description: 'A twisted mathematical maze where equations float in the air and geometric shapes form deadly obstacles',
      theme: 'mathematical-nightmare',
      backgroundMusic: 'ominous-calculation',
      environmentalHazards: [
        {
          id: 'equation-mines',
          name: 'Equation Landmines',
          description: 'Unsolved equations that explode when stepped on',
          damage: 50,
          avoidanceMethod: 'Solve the equation to defuse',
          educationalTip: 'Practice mental math to quickly solve equations under pressure'
        }
      ],
      interactiveElements: [
        {
          id: 'formula-door',
          name: 'Formula-Locked Door',
          description: 'A door that only opens when the correct formula is entered',
          requiredStat: 'intelligence',
          requiredLevel: 30,
          effect: 'unlock-secret-area',
          educationalChallenge: 'Enter the quadratic formula to proceed'
        }
      ],
      hiddenSecrets: [
        {
          id: 'golden-calculator',
          name: 'Golden Calculator of Truth',
          description: 'An ancient calculator that reveals mathematical secrets',
          location: 'Behind the algebra waterfall',
          reward: '+50 Intelligence permanently',
          discoveryMethod: 'Solve three consecutive prime number sequences'
        }
      ],
      atmosphericEffects: [
        { type: 'particles', intensity: 70, color: '#FFD700', animation: 'floating-numbers' },
        { type: 'lighting', intensity: 50, animation: 'equation-glow' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  },

  {
    id: 'professor-pollution',
    name: 'Professor Pollution',
    title: 'The Science Saboteur',
    description: 'A corrupt scientist who uses his knowledge to create environmental disasters and mechanical monstrosities.',
    tier: 1,
    avatar: '🧪',
    theme: 'toxic-laboratory',
    backstory: 'Former environmental scientist who became bitter after his warnings about pollution were ignored. Now he creates the very disasters he once fought against.',
    motivation: 'Wants to show the world the consequences of ignoring environmental science',
    
    health: 1200,
    maxHealth: 1200,
    armor: 30,
    speed: 50,
    
    weaknesses: ['intelligence'],
    resistances: ['strength'],
    requiredStats: { intelligence: 50 },
    
    attacks: [
      {
        id: 'toxic-cloud',
        name: 'Poisonous Gas Cloud',
        description: 'Releases a cloud of toxic chemicals that damages over time',
        damage: 120,
        type: 'environmental',
        element: 'science',
        animation: 'green-gas-cloud',
        soundEffect: 'chemical-hiss',
        cooldown: 4000,
        counterMethod: 'Create a neutralizing compound',
        educationalHint: 'Acids and bases neutralize each other - use pH knowledge'
      },
      {
        id: 'robot-swarm',
        name: 'Mechanical Army',
        description: 'Summons a swarm of pollution-powered robots',
        damage: 100,
        type: 'physical',
        element: 'science',
        animation: 'robot-emergence',
        soundEffect: 'mechanical-whir',
        cooldown: 6000,
        counterMethod: 'Overload their circuits with electromagnetic pulse',
        educationalHint: 'Understanding electrical circuits helps disable mechanical enemies'
      },
      {
        id: 'acid-rain',
        name: 'Corrosive Downpour',
        description: 'Creates an acid rain storm across the battlefield',
        damage: 90,
        type: 'environmental',
        element: 'science',
        animation: 'acid-precipitation',
        soundEffect: 'sizzling-rain',
        cooldown: 5000,
        counterMethod: 'Use basic compounds to neutralize the acid',
        educationalHint: 'Baking soda (sodium bicarbonate) neutralizes acids'
      }
    ],
    
    specialAbilities: [
      {
        id: 'pollution-shield',
        name: 'Toxic Barrier',
        description: 'Surrounds himself with a protective pollution cloud',
        effect: 'buff',
        duration: 15000,
        animation: 'toxic-shield',
        trigger: 'damage'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Chemical Warfare',
        healthThreshold: 100,
        description: 'Uses basic chemical attacks and toxic clouds',
        newAttacks: ['toxic-cloud'],
        environmentChanges: [],
        dialogue: ['Science will show you the error of your ways!', 'Breathe deeply of my toxic wisdom!']
      },
      {
        id: 2,
        name: 'Mechanical Mayhem',
        healthThreshold: 60,
        description: 'Deploys robot armies and mechanical hazards',
        newAttacks: ['robot-swarm'],
        environmentChanges: [
          { type: 'hazards', description: 'Mechanical traps emerge from the floor', effect: 'movement-damage' }
        ],
        dialogue: ['My machines will inherit this polluted earth!', 'Technology serves pollution now!']
      },
      {
        id: 3,
        name: 'Environmental Apocalypse',
        healthThreshold: 20,
        description: 'Creates massive environmental disasters',
        newAttacks: ['acid-rain'],
        environmentChanges: [
          { type: 'weather', description: 'Acid rain begins falling', effect: 'continuous-damage' }
        ],
        dialogue: ['This is what you get for ignoring science!', 'Let the world burn in toxic flames!']
      }
    ],
    
    rewards: {
      experience: 600,
      statBoosts: { intelligence: 30, strength: 5 },
      unlocks: ['Advanced Science Games', 'Hazmat Hero Costume', 'Environmental Guardian Title'],
      cityAreas: ['Science District', 'Clean Energy Center']
    },
    
    lair: {
      id: 'toxic-laboratory',
      name: 'The Pollution Palace',
      description: 'A nightmarish laboratory filled with bubbling chemicals, mechanical contraptions, and toxic waste',
      theme: 'industrial-wasteland',
      backgroundMusic: 'mechanical-menace',
      environmentalHazards: [
        {
          id: 'chemical-spills',
          name: 'Toxic Puddles',
          description: 'Pools of dangerous chemicals that damage on contact',
          damage: 75,
          avoidanceMethod: 'Neutralize with proper chemical compounds',
          educationalTip: 'Learn about acids, bases, and pH levels to safely handle chemicals'
        }
      ],
      interactiveElements: [
        {
          id: 'periodic-table-lock',
          name: 'Elemental Security System',
          description: 'A lock requiring knowledge of the periodic table',
          requiredStat: 'intelligence',
          requiredLevel: 40,
          effect: 'disable-security',
          educationalChallenge: 'Arrange elements by atomic number to unlock'
        }
      ],
      hiddenSecrets: [
        {
          id: 'clean-energy-core',
          name: 'Prototype Clean Reactor',
          description: 'A hidden clean energy device that could power the city',
          location: 'Behind the chemical storage tanks',
          reward: 'Unlock renewable energy powers',
          discoveryMethod: 'Balance three chemical equations perfectly'
        }
      ],
      atmosphericEffects: [
        { type: 'particles', intensity: 80, color: '#00FF00', animation: 'toxic-bubbles' },
        { type: 'lighting', intensity: 60, color: '#FFFF00', animation: 'chemical-glow' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  },

  {
    id: 'grammar-goblin',
    name: 'Grammar Goblin',
    title: 'The Word Wrecker',
    description: 'A mischievous creature that delights in destroying proper language and spreading linguistic chaos.',
    tier: 1,
    avatar: '👹',
    theme: 'linguistic-nightmare',
    backstory: 'Born from the collective frustration of poorly written text messages and social media posts, this goblin feeds on grammatical errors and miscommunication.',
    motivation: 'Wants to eliminate proper grammar and spelling to create a world of confusion',
    
    health: 800,
    maxHealth: 800,
    armor: 15,
    speed: 80,
    
    weaknesses: ['confidence'],
    resistances: ['strength'],
    requiredStats: { confidence: 50 },
    
    attacks: [
      {
        id: 'confusion-spell',
        name: 'Bewilderment Hex',
        description: 'Casts a spell that scrambles text and confuses the mind',
        damage: 110,
        type: 'mental',
        element: 'english',
        animation: 'text-scramble',
        soundEffect: 'confusion-chime',
        cooldown: 3500,
        counterMethod: 'Unscramble the words to break the spell',
        educationalHint: 'Strong vocabulary helps resist confusion effects'
      },
      {
        id: 'text-tornado',
        name: 'Whirlwind of Words',
        description: 'Creates a tornado of jumbled letters and punctuation',
        damage: 95,
        type: 'physical',
        element: 'english',
        animation: 'letter-whirlwind',
        soundEffect: 'paper-storm',
        cooldown: 4500,
        counterMethod: 'Organize the letters into proper sentences',
        educationalHint: 'Understanding sentence structure helps navigate word chaos'
      },
      {
        id: 'grammar-trap',
        name: 'Syntax Snare',
        description: 'Creates invisible grammar traps that ensnare careless speakers',
        damage: 85,
        type: 'environmental',
        element: 'english',
        animation: 'invisible-web',
        soundEffect: 'grammar-snap',
        cooldown: 4000,
        counterMethod: 'Speak with perfect grammar to avoid traps',
        educationalHint: 'Proper subject-verb agreement prevents grammatical snares'
      }
    ],
    
    specialAbilities: [
      {
        id: 'language-barrier',
        name: 'Tower of Babel',
        description: 'Makes all text appear in different languages randomly',
        effect: 'debuff',
        duration: 12000,
        animation: 'language-chaos',
        trigger: 'health'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Spelling Sabotage',
        healthThreshold: 100,
        description: 'Focuses on spelling errors and word confusion',
        newAttacks: ['confusion-spell'],
        environmentChanges: [],
        dialogue: ['Ur grammer iz terible!', 'Words r dum anyway!']
      },
      {
        id: 2,
        name: 'Syntax Chaos',
        healthThreshold: 60,
        description: 'Attacks sentence structure and grammar rules',
        newAttacks: ['text-tornado'],
        environmentChanges: [
          { type: 'obstacles', description: 'Floating punctuation marks block paths', effect: 'navigation-puzzle' }
        ],
        dialogue: ['Grammar rules are for fools!', 'Let chaos reign over language!']
      },
      {
        id: 3,
        name: 'Linguistic Apocalypse',
        healthThreshold: 20,
        description: 'Attempts to destroy all meaningful communication',
        newAttacks: ['grammar-trap'],
        environmentChanges: [
          { type: 'distortion', description: 'All text becomes increasingly illegible', effect: 'communication-breakdown' }
        ],
        dialogue: ['No one will understand anything ever again!', 'Communication is overrated!']
      }
    ],
    
    rewards: {
      experience: 450,
      statBoosts: { confidence: 25, intelligence: 10 },
      unlocks: ['Advanced English Games', 'Grammar Guardian Costume', 'Word Warrior Title'],
      cityAreas: ['Literature District', 'Communication Center']
    },
    
    lair: {
      id: 'word-wasteland',
      name: 'The Syntax Swamp',
      description: 'A twisted realm where words float aimlessly, sentences are broken, and punctuation attacks unwary travelers',
      theme: 'linguistic-chaos',
      backgroundMusic: 'discordant-whispers',
      environmentalHazards: [
        {
          id: 'punctuation-projectiles',
          name: 'Flying Punctuation',
          description: 'Aggressive punctuation marks that attack proper grammar',
          damage: 60,
          avoidanceMethod: 'Use them correctly in sentences to pacify them',
          educationalTip: 'Understanding punctuation rules turns enemies into allies'
        }
      ],
      interactiveElements: [
        {
          id: 'poetry-portal',
          name: 'Rhyme Gate',
          description: 'A magical gate that opens only to perfect poetry',
          requiredStat: 'confidence',
          requiredLevel: 35,
          effect: 'unlock-treasure-room',
          educationalChallenge: 'Compose a haiku with proper syllable count'
        }
      ],
      hiddenSecrets: [
        {
          id: 'dictionary-of-power',
          name: 'The Ultimate Dictionary',
          description: 'A legendary book containing every word ever spoken',
          location: 'Atop the Tower of Babel',
          reward: '+100 Vocabulary permanently',
          discoveryMethod: 'Solve five word puzzles without making mistakes'
        }
      ],
      atmosphericEffects: [
        { type: 'particles', intensity: 60, color: '#FF69B4', animation: 'floating-letters' },
        { type: 'distortion', intensity: 40, animation: 'text-warp' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  },

  {
    id: 'calculator-king',
    name: 'Calculator King',
    title: 'The Logic Lord',
    description: 'A hybrid villain combining mathematical precision with scientific methodology, requiring both Strength and Intelligence to defeat.',
    tier: 1,
    avatar: '👑',
    theme: 'digital-dominion',
    backstory: 'Once the greatest computational mind in the academy, he became obsessed with reducing all human experience to cold calculations and logical formulas.',
    motivation: 'Believes emotion and creativity are inefficient and should be eliminated through pure logic',
    
    health: 1500,
    maxHealth: 1500,
    armor: 40,
    speed: 70,
    
    weaknesses: ['strength', 'intelligence'],
    resistances: ['confidence'],
    requiredStats: { strength: 40, intelligence: 40 },
    
    attacks: [
      {
        id: 'logic-bomb',
        name: 'Computational Overload',
        description: 'Fires a complex calculation that explodes into mathematical fragments',
        damage: 180,
        type: 'combo',
        element: 'math',
        animation: 'calculation-explosion',
        soundEffect: 'digital-blast',
        cooldown: 5000,
        counterMethod: 'Solve the equation while dodging fragments',
        educationalHint: 'Combine math skills with quick reflexes for maximum effectiveness'
      },
      {
        id: 'scientific-formula',
        name: 'Formula Fusion',
        description: 'Combines chemical and physical formulas into devastating attacks',
        damage: 160,
        type: 'combo',
        element: 'science',
        animation: 'formula-merge',
        soundEffect: 'scientific-synthesis',
        cooldown: 4500,
        counterMethod: 'Apply both chemistry and physics knowledge',
        educationalHint: 'Understanding multiple scientific disciplines provides the best defense'
      },
      {
        id: 'data-storm',
        name: 'Information Overload',
        description: 'Floods the battlefield with overwhelming data streams',
        damage: 140,
        type: 'mental',
        element: 'neutral',
        animation: 'data-flood',
        soundEffect: 'information-static',
        cooldown: 6000,
        counterMethod: 'Filter relevant information from noise',
        educationalHint: 'Critical thinking skills help process large amounts of information'
      }
    ],
    
    specialAbilities: [
      {
        id: 'logical-fortress',
        name: 'Impenetrable Logic',
        description: 'Creates a shield of pure logic that deflects emotional attacks',
        effect: 'buff',
        duration: 20000,
        animation: 'logic-barrier',
        trigger: 'phase'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Mathematical Supremacy',
        healthThreshold: 100,
        description: 'Focuses on mathematical attacks and logical puzzles',
        newAttacks: ['logic-bomb'],
        environmentChanges: [],
        dialogue: ['Logic is the only truth!', 'Emotions are computational errors!']
      },
      {
        id: 2,
        name: 'Scientific Synthesis',
        healthThreshold: 60,
        description: 'Combines math and science for more complex attacks',
        newAttacks: ['scientific-formula'],
        environmentChanges: [
          { type: 'platforms', description: 'Floating calculation platforms appear', effect: 'elevated-combat' }
        ],
        dialogue: ['Science and math unite under my rule!', 'Behold the power of pure knowledge!']
      },
      {
        id: 3,
        name: 'Digital Dominion',
        healthThreshold: 20,
        description: 'Unleashes overwhelming computational power',
        newAttacks: ['data-storm'],
        environmentChanges: [
          { type: 'distortion', description: 'Reality becomes digitized', effect: 'matrix-environment' }
        ],
        dialogue: ['I am the sum of all knowledge!', 'Prepare for total logical domination!']
      }
    ],
    
    rewards: {
      experience: 800,
      statBoosts: { strength: 20, intelligence: 20, confidence: 5 },
      unlocks: ['Hybrid Combat Techniques', 'Logic Lord Costume', 'Computational Master Title'],
      cityAreas: ['Technology Hub', 'Research Complex']
    },
    
    lair: {
      id: 'digital-fortress',
      name: 'The Calculation Cathedral',
      description: 'A massive digital construct where mathematics and science merge into a technological nightmare',
      theme: 'cyber-academic',
      backgroundMusic: 'digital-symphony',
      environmentalHazards: [
        {
          id: 'laser-equations',
          name: 'Computational Lasers',
          description: 'Laser beams that fire mathematical equations',
          damage: 100,
          avoidanceMethod: 'Solve equations to redirect lasers',
          educationalTip: 'Quick mental math can turn hazards into tools'
        }
      ],
      interactiveElements: [
        {
          id: 'quantum-computer',
          name: 'Quantum Calculation Engine',
          description: 'A supercomputer requiring advanced mathematical input',
          requiredStat: 'intelligence',
          requiredLevel: 60,
          effect: 'unlock-final-chamber',
          educationalChallenge: 'Input the solution to a complex calculus problem'
        }
      ],
      hiddenSecrets: [
        {
          id: 'knowledge-core',
          name: 'The Omniscience Engine',
          description: 'A device containing all mathematical and scientific knowledge',
          location: 'Center of the digital maze',
          reward: 'Unlock ultimate hybrid abilities',
          discoveryMethod: 'Demonstrate mastery of both math and science simultaneously'
        }
      ],
      atmosphericEffects: [
        { type: 'particles', intensity: 90, color: '#00FFFF', animation: 'digital-rain' },
        { type: 'lighting', intensity: 80, animation: 'circuit-pulse' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  },

  // TIER 2 VILLAINS - Advanced Challenges
  {
    id: 'ignorance-emperor',
    name: 'Ignorance Emperor',
    title: 'The Misinformation Master',
    description: 'The ultimate enemy of education, spreading false knowledge and requiring perfect balance of all three stats to defeat.',
    tier: 2,
    avatar: '👑',
    theme: 'darkness-and-lies',
    backstory: 'Born from the collective ignorance and misinformation of the digital age, this entity grows stronger with every false fact shared and every lesson ignored.',
    motivation: 'Seeks to plunge the world into an age of ignorance where truth cannot be distinguished from lies',
    
    health: 2500,
    maxHealth: 2500,
    armor: 60,
    speed: 90,
    
    weaknesses: ['strength', 'intelligence', 'confidence'],
    resistances: [],
    requiredStats: { strength: 60, intelligence: 60, confidence: 60 },
    
    attacks: [
      {
        id: 'false-facts',
        name: 'Misinformation Barrage',
        description: 'Fires a stream of false information that confuses and damages',
        damage: 200,
        type: 'mental',
        element: 'chaos',
        animation: 'lie-projectiles',
        soundEffect: 'deception-whisper',
        cooldown: 4000,
        counterMethod: 'Counter with correct facts from all subjects',
        educationalHint: 'Broad knowledge across all subjects provides the best defense against misinformation'
      },
      {
        id: 'doubt-aura',
        name: 'Aura of Uncertainty',
        description: 'Creates a field that makes heroes doubt their knowledge',
        damage: 150,
        type: 'emotional',
        element: 'chaos',
        animation: 'doubt-waves',
        soundEffect: 'uncertainty-hum',
        cooldown: 6000,
        counterMethod: 'Maintain confidence in your learning',
        educationalHint: 'Self-confidence in your abilities helps resist doubt-based attacks'
      },
      {
        id: 'knowledge-drain',
        name: 'Intellectual Vacuum',
        description: 'Attempts to drain all learned knowledge from the hero',
        damage: 180,
        type: 'mental',
        element: 'chaos',
        animation: 'knowledge-siphon',
        soundEffect: 'mind-drain',
        cooldown: 8000,
        counterMethod: 'Actively recall facts from all subjects',
        educationalHint: 'Regular review and practice makes knowledge more resistant to being forgotten'
      }
    ],
    
    specialAbilities: [
      {
        id: 'reality-distortion',
        name: 'Truth Inversion',
        description: 'Makes false appear true and true appear false',
        effect: 'debuff',
        duration: 30000,
        animation: 'reality-warp',
        trigger: 'health'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'Seeds of Doubt',
        healthThreshold: 100,
        description: 'Plants seeds of uncertainty and false information',
        newAttacks: ['false-facts'],
        environmentChanges: [],
        dialogue: ['Truth is whatever I say it is!', 'Knowledge is just opinion in disguise!']
      },
      {
        id: 2,
        name: 'Spreading Darkness',
        healthThreshold: 60,
        description: 'Amplifies doubt and confusion across the battlefield',
        newAttacks: ['doubt-aura'],
        environmentChanges: [
          { type: 'lighting', description: 'Darkness spreads, making it hard to see truth', effect: 'visibility-reduction' }
        ],
        dialogue: ['Let ignorance reign supreme!', 'Why learn when you can simply believe?']
      },
      {
        id: 3,
        name: 'Intellectual Apocalypse',
        healthThreshold: 20,
        description: 'Attempts to drain all knowledge from existence',
        newAttacks: ['knowledge-drain'],
        environmentChanges: [
          { type: 'distortion', description: 'Reality itself becomes questionable', effect: 'truth-uncertainty' }
        ],
        dialogue: ['I will unmake all learning!', 'In ignorance, there is blissful simplicity!']
      }
    ],
    
    rewards: {
      experience: 1500,
      statBoosts: { strength: 30, intelligence: 30, confidence: 30 },
      unlocks: ['Truth Seeker Powers', 'Enlightened Hero Costume', 'Guardian of Knowledge Title'],
      cityAreas: ['Hall of Truth', 'Knowledge Sanctuary', 'Wisdom Gardens']
    },
    
    lair: {
      id: 'palace-of-lies',
      name: 'The Misinformation Maze',
      description: 'A constantly shifting labyrinth where nothing is as it seems and every fact is questioned',
      theme: 'deceptive-reality',
      backgroundMusic: 'whispers-of-doubt',
      environmentalHazards: [
        {
          id: 'false-floors',
          name: 'Deceptive Platforms',
          description: 'Platforms that appear solid but may be illusions',
          damage: 120,
          avoidanceMethod: 'Test each platform with factual knowledge',
          educationalTip: 'Critical thinking helps distinguish reality from illusion'
        }
      ],
      interactiveElements: [
        {
          id: 'truth-detector',
          name: 'Veracity Engine',
          description: 'A device that can distinguish truth from lies',
          requiredStat: 'confidence',
          requiredLevel: 80,
          effect: 'reveal-true-path',
          educationalChallenge: 'Identify which of ten statements are factually correct'
        }
      ],
      hiddenSecrets: [
        {
          id: 'source-of-truth',
          name: 'The Eternal Library',
          description: 'A hidden repository of all true knowledge',
          location: 'Behind the mirror of self-doubt',
          reward: 'Immunity to misinformation attacks',
          discoveryMethod: 'Demonstrate perfect knowledge across all three subjects'
        }
      ],
      atmosphericEffects: [
        { type: 'distortion', intensity: 100, animation: 'reality-shift' },
        { type: 'particles', intensity: 70, color: '#800080', animation: 'doubt-motes' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  },

  {
    id: 'master-chaos',
    name: 'Master Chaos',
    title: 'The Final Boss',
    description: 'The ultimate embodiment of educational destruction, requiring mastery of all subjects and perfect stat balance to defeat.',
    tier: 2,
    avatar: '💀',
    theme: 'apocalyptic-chaos',
    backstory: 'The fusion of all defeated villains\' essences, Master Chaos represents the ultimate challenge to learning and growth. It adapts to every strategy and grows stronger with each failed attempt.',
    motivation: 'Seeks to return the world to a state of primordial ignorance where learning never existed',
    
    health: 5000,
    maxHealth: 5000,
    armor: 100,
    speed: 100,
    
    weaknesses: ['strength', 'intelligence', 'confidence'],
    resistances: [],
    requiredStats: { strength: 80, intelligence: 80, confidence: 80 },
    
    attacks: [
      {
        id: 'chaos-storm',
        name: 'Maelstrom of Madness',
        description: 'Unleashes a devastating storm combining all forms of educational destruction',
        damage: 300,
        type: 'combo',
        element: 'chaos',
        animation: 'ultimate-chaos',
        soundEffect: 'apocalyptic-roar',
        cooldown: 10000,
        counterMethod: 'Use perfect knowledge from all three subjects simultaneously',
        educationalHint: 'Only complete mastery of math, science, and English can withstand this attack'
      },
      {
        id: 'reality-unmaker',
        name: 'Existence Eraser',
        description: 'Attempts to unmake the very concept of learning from reality',
        damage: 250,
        type: 'mental',
        element: 'chaos',
        animation: 'reality-deletion',
        soundEffect: 'existence-void',
        cooldown: 12000,
        counterMethod: 'Prove the value of education through perfect demonstration',
        educationalHint: 'Show how learning improves life to resist this ultimate attack'
      },
      {
        id: 'despair-wave',
        name: 'Wave of Hopelessness',
        description: 'Sends out a wave that makes heroes believe learning is impossible',
        damage: 200,
        type: 'emotional',
        element: 'chaos',
        animation: 'despair-tsunami',
        soundEffect: 'hopelessness-wail',
        cooldown: 8000,
        counterMethod: 'Remember all your educational achievements',
        educationalHint: 'Reflecting on your learning journey provides strength against despair'
      }
    ],
    
    specialAbilities: [
      {
        id: 'adaptive-evolution',
        name: 'Chaos Evolution',
        description: 'Adapts to player strategies and becomes stronger',
        effect: 'buff',
        duration: 60000,
        animation: 'chaos-evolution',
        trigger: 'damage'
      }
    ],
    
    phases: [
      {
        id: 1,
        name: 'The Gathering Storm',
        healthThreshold: 100,
        description: 'Master Chaos begins with combined attacks from all previous villains',
        newAttacks: ['chaos-storm'],
        environmentChanges: [],
        dialogue: ['I am the end of all learning!', 'Witness the futility of knowledge!']
      },
      {
        id: 2,
        name: 'Reality Breakdown',
        healthThreshold: 60,
        description: 'The very fabric of educational reality begins to unravel',
        newAttacks: ['reality-unmaker'],
        environmentChanges: [
          { type: 'distortion', description: 'The battlefield becomes increasingly unstable', effect: 'reality-flux' }
        ],
        dialogue: ['Learning was always an illusion!', 'I will unmake the very concept of education!']
      },
      {
        id: 3,
        name: 'The Final Lesson',
        healthThreshold: 20,
        description: 'Master Chaos makes one last desperate attempt to destroy all hope of learning',
        newAttacks: ['despair-wave'],
        environmentChanges: [
          { type: 'lighting', description: 'All light begins to fade from existence', effect: 'approaching-void' }
        ],
        dialogue: ['This is the end of knowledge itself!', 'Let ignorance reign eternal!']
      }
    ],
    
    rewards: {
      experience: 5000,
      statBoosts: { strength: 50, intelligence: 50, confidence: 50 },
      unlocks: ['Master Hero Status', 'Chaos Conqueror Costume', 'Ultimate Champion Title', 'New Game Plus Mode'],
      cityAreas: ['Hero Monument', 'Academy of Excellence', 'Victory Plaza', 'Hall of Champions']
    },
    
    lair: {
      id: 'chaos-nexus',
      name: 'The Void of Unlearning',
      description: 'A realm beyond reality where the very concept of education is under assault',
      theme: 'cosmic-horror',
      backgroundMusic: 'final-confrontation',
      environmentalHazards: [
        {
          id: 'knowledge-voids',
          name: 'Pockets of Ignorance',
          description: 'Areas where knowledge simply ceases to exist',
          damage: 200,
          avoidanceMethod: 'Fill the void with perfect understanding',
          educationalTip: 'Complete mastery of all subjects can overcome any ignorance'
        }
      ],
      interactiveElements: [
        {
          id: 'final-test',
          name: 'The Ultimate Examination',
          description: 'A test that encompasses all of human knowledge',
          requiredStat: 'intelligence',
          requiredLevel: 100,
          effect: 'unlock-true-ending',
          educationalChallenge: 'Demonstrate perfect understanding of math, science, and English'
        }
      ],
      hiddenSecrets: [
        {
          id: 'heart-of-learning',
          name: 'The Eternal Flame of Knowledge',
          description: 'The source of all learning and growth in the universe',
          location: 'At the center of the chaos storm',
          reward: 'Become the ultimate guardian of education',
          discoveryMethod: 'Prove that learning is the most powerful force in existence'
        }
      ],
      atmosphericEffects: [
        { type: 'distortion', intensity: 100, animation: 'reality-collapse' },
        { type: 'particles', intensity: 100, color: '#000000', animation: 'void-energy' },
        { type: 'lighting', intensity: 10, animation: 'dying-light' }
      ]
    },
    
    defeated: false,
    timesDefeated: 0,
    bestDefeatTime: 0
  }
];

export const teamUpAbilities: TeamUpAbility[] = [
  {
    id: 'math-science-fusion',
    name: 'Calculation Catalyst',
    description: 'Combine mathematical precision with scientific method for devastating accuracy',
    requiredAllies: ['Math Academy Graduate', 'Science Academy Graduate'],
    damage: 500,
    animation: 'formula-explosion',
    educationalBonus: 'Demonstrates how math and science work together in real applications'
  },
  {
    id: 'english-confidence-boost',
    name: 'Inspiring Speech',
    description: 'Use powerful rhetoric to boost all allies and demoralize enemies',
    requiredAllies: ['English Academy Graduate', 'Confidence Master'],
    damage: 300,
    animation: 'golden-words',
    educationalBonus: 'Shows how effective communication can motivate and lead others'
  },
  {
    id: 'triple-mastery',
    name: 'Ultimate Knowledge Beam',
    description: 'The perfect fusion of all three educational disciplines',
    requiredAllies: ['Math Master', 'Science Expert', 'English Scholar'],
    damage: 1000,
    animation: 'rainbow-knowledge-beam',
    educationalBonus: 'Proves that well-rounded education is the most powerful tool of all'
  }
];

export const cityAreas: CityArea[] = [
  {
    id: 'mathematics-district',
    name: 'Mathematics District',
    description: 'A gleaming area where geometric buildings reach toward the sky and number-powered transportation flows smoothly',
    unlockedBy: 'dr-subtract',
    citizens: 15000,
    buildings: ['Calculator Tower', 'Geometry Gardens', 'Statistics Stadium', 'Algebra Arcade'],
    activities: ['Number Festivals', 'Math Olympics', 'Calculation Competitions'],
    threats: ['Equation Errors', 'Division by Zero Incidents', 'Negative Number Invasions']
  },
  {
    id: 'science-sector',
    name: 'Science Sector',
    description: 'A high-tech area powered by clean energy with laboratories and research facilities',
    unlockedBy: 'professor-pollution',
    citizens: 12000,
    buildings: ['Research Labs', 'Clean Energy Plant', 'Periodic Table Plaza', 'Innovation Institute'],
    activities: ['Science Fairs', 'Invention Showcases', 'Environmental Cleanups'],
    threats: ['Chemical Spills', 'Robot Malfunctions', 'Toxic Waste Leaks']
  },
  {
    id: 'literature-lane',
    name: 'Literature Lane',
    description: 'A charming area filled with libraries, theaters, and storytelling venues',
    unlockedBy: 'grammar-goblin',
    citizens: 10000,
    buildings: ['Grand Library', 'Poetry Theater', 'Grammar School', 'Communication Center'],
    activities: ['Reading Festivals', 'Poetry Slams', 'Storytelling Circles'],
    threats: ['Misspelling Monsters', 'Plot Hole Portals', 'Punctuation Pandemonium']
  },
  {
    id: 'knowledge-nexus',
    name: 'Knowledge Nexus',
    description: 'The central hub where all educational disciplines meet and collaborate',
    unlockedBy: 'master-chaos',
    citizens: 50000,
    buildings: ['Academy Central', 'Wisdom Tower', 'Learning Lighthouse', 'Education Embassy'],
    activities: ['Interdisciplinary Conferences', 'Knowledge Sharing Festivals', 'Learning Celebrations'],
    threats: ['Ignorance Invasions', 'Misinformation Attacks', 'Apathy Outbreaks']
  }
];