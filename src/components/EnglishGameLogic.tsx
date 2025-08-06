import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Clock, Users, Target, Lock, Heart, ArrowLeft, Zap, Star, Trophy, BookOpen, Sword, Shield, Home } from 'lucide-react';
interface EnglishGamesSystemProps {
  onBack: () => void;
}
const EnglishGamesSystem = ({ onBack }: EnglishGamesSystemProps) => {
  const [currentScreen, setCurrentScreen] = useState('menu'); // 'menu' or game id
  const [gameProgress, setGameProgress] = useState(() => {
    return {
      'word-wizard': { unlocked: true, bestScore: 0, timesPlayed: 0, completed: false },
      'story-architect': { unlocked: false, bestScore: 0, timesPlayed: 0, completed: false },
      'grammar-guardian': { unlocked: false, bestScore: 0, timesPlayed: 0, completed: false },
      'vocabulary-venture': { unlocked: false, bestScore: 0, timesPlayed: 0, completed: false },
      'communication-commander': { unlocked: false, bestScore: 0, timesPlayed: 0, completed: false }
    };
  });

  const updateGameProgress = (gameId: string, score: number, completed = false) => {
    setGameProgress(prev => {
      const newProgress = {
        ...prev,
        [gameId]: {
          ...prev[gameId as keyof typeof prev],
          bestScore: Math.max(prev[gameId as keyof typeof prev].bestScore, score),
          timesPlayed: prev[gameId as keyof typeof prev].timesPlayed + 1,
          completed: completed || prev[gameId as keyof typeof prev].completed
        }
      };

      // Unlock next game if current one is completed
      if (completed) {
        const gameOrder = ['word-wizard', 'story-architect', 'grammar-guardian', 'vocabulary-venture', 'communication-commander'];
        const currentIndex = gameOrder.indexOf(gameId);
        if (currentIndex >= 0 && currentIndex < gameOrder.length - 1) {
          const nextGame = gameOrder[currentIndex + 1];
          newProgress[nextGame as keyof typeof gameProgress].unlocked = true;
        }
      }

      return newProgress;
    });
  };

  const games = [
    {
      id: 'word-wizard',
      title: 'Word Wizard Warfare',
      icon: '✨',
      difficulty: 'Beginner',
      difficultyColor: 'bg-green-500',
      description: 'Cast spells through fast-paced typing battles',
      statReward: '+10',
      duration: '120s',
      multiplayer: true,
      objectives: 3,
      rewardIcon: <Heart className="w-4 h-4" />
    },
    {
      id: 'story-architect',
      title: 'Story Architect',
      icon: '📚',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-yellow-500',
      description: 'Build interactive narratives with meaningful choices',
      statReward: '+12',
      duration: '300s',
      multiplayer: false,
      objectives: 3,
      rewardIcon: <Heart className="w-4 h-4" />
    },
    {
      id: 'grammar-guardian',
      title: 'Grammar Guardian Duty',
      icon: '🛠️',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-yellow-500',
      description: 'Fix grammar to rebuild damaged city infrastructure',
      statReward: '+9',
      duration: '180s',
      multiplayer: false,
      objectives: 3,
      rewardIcon: <Heart className="w-4 h-4" />
    },
    {
      id: 'vocabulary-venture',
      title: 'Vocabulary Venture',
      icon: '🗝️',
      difficulty: 'Advanced',
      difficultyColor: 'bg-red-500',
      description: 'Unlock paths using word knowledge in platformer adventure',
      statReward: '+14',
      duration: '240s',
      multiplayer: false,
      objectives: 3,
      rewardIcon: <Heart className="w-4 h-4" />
    },
    {
      id: 'communication-commander',
      title: 'Communication Commander',
      icon: '📢',
      difficulty: 'Expert',
      difficultyColor: 'bg-purple-500',
      description: 'Lead missions through persuasive writing and clear instructions',
      statReward: '+16',
      duration: '360s',
      multiplayer: true,
      objectives: 3,
      rewardIcon: <Heart className="w-4 h-4" />
    }
  ];

    const handlePlayGame = (gameId: string) => {
  if (gameProgress[gameId as keyof typeof gameProgress]?.unlocked) {
    setCurrentScreen(gameId);
  }
};

  const handleGameComplete = (gameId: string, score: number, completed = false) => {
    updateGameProgress(gameId, score, completed);
    setCurrentScreen('menu');
  };

  const renderMenu = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8">
    <button 
      onClick={onBack} 
      className="mb-4 px-4 py-2 bg-black bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
    >
      <span>←</span>
      <span>Back to Academy</span>
    </button>      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">English Learning Games</h1>
          <p className="text-blue-200 text-lg">Master English through interactive adventures</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const progress = gameProgress[game.id as keyof typeof gameProgress];
            return (
              <div
                key={game.id}
                className={`relative bg-slate-800 bg-opacity-80 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${
                  progress?.unlocked 
                    ? 'border-blue-500 hover:border-blue-400' 
                    : 'border-gray-600 opacity-75'
                }`}
              >
                {!progress?.unlocked && (
                  <div className="absolute top-4 right-4">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                )}

                {progress?.completed && (
                  <div className="absolute top-4 right-4">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">{game.title}</h3>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium text-white ${game.difficultyColor} mt-1`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {game.description}
                </p>

                <div className="flex justify-between mb-4">
                  <div className="text-center">
                    <p className="text-yellow-400 font-semibold text-sm">Best Score</p>
                    <p className="text-white text-lg font-bold">{progress?.bestScore || 0}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-400 font-semibold text-sm">Times Played</p>
                    <p className="text-white text-lg font-bold">{progress?.timesPlayed || 0}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400 text-sm">Stat Reward:</span>
                  <div className="flex items-center space-x-1 text-green-400">
                    {game.rewardIcon}
                    <span className="font-semibold">{game.statReward}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{game.duration}</span>
                  </div>
                  {game.multiplayer && (
                    <div className="flex items-center space-x-2 text-gray-300">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Multiplayer Available</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 text-gray-300">
                    <Target className="w-4 h-4" />
                    <span className="text-sm">{game.objectives} Objectives</span>
                  </div>
                </div>

                {progress?.unlocked ? (
                  <button
                    onClick={() => handlePlayGame(game.id)}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <Play className="w-5 h-5" />
                    <span>Play Game</span>
                  </button>
                ) : (
                  <div className="w-full bg-gray-700 text-gray-400 font-bold py-3 px-6 rounded-xl text-center">
                    Complete previous games to unlock
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-200 text-sm">
            Complete games to unlock new challenges and earn rewards!
          </p>
        </div>
      </div>
    </div>
  );

  // Game Component Router
  const renderGame = () => {
    switch (currentScreen) {
      case 'word-wizard':
        return <WordWizardGame onComplete={handleGameComplete} onBack={() => setCurrentScreen('menu')} />;
      case 'story-architect':
        return <StoryArchitectGame onComplete={handleGameComplete} onBack={() => setCurrentScreen('menu')} />;
      case 'grammar-guardian':
        return <GrammarGuardianGame onComplete={handleGameComplete} onBack={() => setCurrentScreen('menu')} />;
      case 'vocabulary-venture':
        return <VocabularyVentureGame onComplete={handleGameComplete} onBack={() => setCurrentScreen('menu')} />;
      case 'communication-commander':
        return <CommunicationCommanderGame onComplete={handleGameComplete} onBack={() => setCurrentScreen('menu')} />;
      default:
        return renderMenu();
    }
  };

  return renderGame();
};

// Word Wizard Warfare - Fast-paced typing battle
const WordWizardGame = ({ onComplete, onBack }: { onComplete: (gameId: string, score: number, completed?: boolean) => void; onBack: () => void }) => {
  const [gameState, setGameState] = useState({
  currentWord: '',
  typedWord: '',
  score: 0,
  timeLeft: 120,
  health: 100,
  mana: 100,
  combo: 0,
  level: 1,
  enemyHealth: 100,
  spellEffects: [] as Array<{ id: number; type: string }>,
  gameOver: false,
  wordsCompleted: 0
});
  const inputRef = useRef<HTMLInputElement>(null);
  const [words] = useState([
    'FIRE', 'ICE', 'THUNDER', 'HEAL', 'SHIELD', 'LIGHTNING', 'BLIZZARD', 'METEOR',
    'CURE', 'HASTE', 'SLOW', 'POISON', 'PROTECT', 'REFLECT', 'DRAIN', 'TORNADO',
    'QUAKE', 'FLARE', 'ULTIMA', 'HOLY', 'DEATH', 'STOP', 'SLEEP', 'BLIND'
  ]);

  const generateWord = useCallback(() => {
    const word = words[Math.floor(Math.random() * words.length)];
    setGameState(prev => ({ ...prev, currentWord: word }));
  }, [words]);

  useEffect(() => {
    generateWord();
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, gameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generateWord]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameState.currentWord]);

  const castSpell = () => {
    if (gameState.typedWord.toUpperCase() === gameState.currentWord) {
      const damage = 20 + (gameState.combo * 5);
      setGameState(prev => {
        const newEnemyHealth = Math.max(0, prev.enemyHealth - damage);
        const newScore = prev.score + (100 * (prev.combo + 1));
        const newCombo = prev.combo + 1;
        const levelUp = newEnemyHealth <= 0;
        
        return {
          ...prev,
          typedWord: '',
          score: newScore,
          combo: newCombo,
          enemyHealth: levelUp ? 100 : newEnemyHealth,
          level: levelUp ? prev.level + 1 : prev.level,
          mana: Math.min(100, prev.mana + 10),
          wordsCompleted: prev.wordsCompleted + 1,
          spellEffects: [...prev.spellEffects, { id: Date.now(), type: 'hit' }]
        };
      });
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          spellEffects: prev.spellEffects.filter(effect => effect.id !== prev.spellEffects[0]?.id)
        }));
      }, 1000);
      
      generateWord();
    } else {
      setGameState(prev => ({
        ...prev,
        typedWord: '',
        combo: 0,
        health: Math.max(0, prev.health - 10)
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      castSpell();
    }
  };

  useEffect(() => {
    if (gameState.gameOver || gameState.timeLeft <= 0) {
      const finalScore = gameState.score;
      const completed = gameState.wordsCompleted >= 15;
      onComplete('word-wizard', finalScore, completed);
    }
  }, [gameState.gameOver, gameState.timeLeft, gameState.score, gameState.wordsCompleted, onComplete]);

  if (gameState.gameOver || gameState.timeLeft <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-purple-400 text-center max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">🎯 Battle Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-yellow-300 text-xl">Final Score: {gameState.score}</p>
            <p className="text-blue-300">Words Completed: {gameState.wordsCompleted}</p>
            <p className="text-green-300">Level Reached: {gameState.level}</p>
            {gameState.wordsCompleted >= 15 && (
              <p className="text-purple-300 font-bold">🏆 GAME COMPLETED!</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 text-6xl animate-pulse">🏰</div>
        <div className="absolute top-32 right-16 text-4xl animate-bounce">⭐</div>
        <div className="absolute bottom-20 left-10 text-5xl animate-pulse">🌙</div>
        <div className="absolute bottom-40 right-20 text-4xl animate-bounce">✨</div>
      </div>

      {/* Header */}
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      {/* Game Stats */}
      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-white text-sm">
          <div>Score: <span className="text-yellow-300 font-bold">{gameState.score}</span></div>
          <div>Time: <span className="text-blue-300 font-bold">{gameState.timeLeft}s</span></div>
          <div>Level: <span className="text-purple-300 font-bold">{gameState.level}</span></div>
          <div>Combo: <span className="text-orange-300 font-bold">{gameState.combo}x</span></div>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Player Side */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="bg-black bg-opacity-70 rounded-2xl p-6 border border-purple-400">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">🧙‍♂️ Spell Casting</h3>
            
            <div className="text-center mb-6">
              <div className="inline-block px-6 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white text-4xl font-bold shadow-lg animate-pulse">
                ⚡ {gameState.currentWord}
              </div>
            </div>

            <input
              ref={inputRef}
              type="text"
              value={gameState.typedWord}
              onChange={(e) => setGameState(prev => ({ ...prev, typedWord: e.target.value.toUpperCase() }))}
              onKeyPress={handleKeyPress}
              placeholder="Type the spell word..."
              className="w-full p-4 text-2xl font-bold text-center bg-gray-800 text-white rounded-lg border-2 border-purple-400 focus:border-yellow-400 focus:outline-none mb-4"
              autoFocus
            />

            <button
              onClick={castSpell}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700"
            >
              🪄 Cast Spell
            </button>

            {/* Health and Mana */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-red-900 bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Heart className="w-5 h-5 text-red-400" />
                  <span className="text-white font-bold">{gameState.health}/100</span>
                </div>
                <div className="w-full bg-red-800 rounded-full h-2">
                  <div 
                    className="bg-red-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${gameState.health}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-blue-900 bg-opacity-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-bold">{gameState.mana}/100</span>
                </div>
                <div className="w-full bg-blue-800 rounded-full h-2">
                  <div 
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${gameState.mana}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enemy Side */}
        <div className="w-1/2 p-8 flex flex-col justify-center">
          <div className="bg-black bg-opacity-70 rounded-2xl p-6 border border-red-400">
            <h3 className="text-2xl font-bold text-white mb-4 text-center">👹 Shadow Enemy</h3>
            
            <div className="text-center mb-6">
              <div className="text-8xl animate-bounce">👹</div>
              <p className="text-red-300 text-xl font-bold">Dark Sorcerer Lv.{gameState.level}</p>
            </div>

            <div className="w-full bg-red-900 rounded-full h-6 mb-2">
              <div 
                className="bg-red-500 h-6 rounded-full transition-all duration-300" 
                style={{ width: `${gameState.enemyHealth}%` }}
              ></div>
            </div>
            <p className="text-center text-white font-bold">
              {gameState.enemyHealth}/100 HP
            </p>

            {/* Spell Effects */}
            {gameState.spellEffects.map((effect) => (
              <div key={effect.id} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-6xl animate-ping text-yellow-400">💥</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p className="text-lg font-semibold">🪄 Type the magic word to cast spells!</p>
        <p className="text-sm text-purple-300">Complete 15 words to finish the game!</p>
      </div>
    </div>
  );
};

// Story Architect Game - Interactive storytelling
const StoryArchitectGame = ({ onComplete, onBack }: { onComplete: (gameId: string, score: number, completed?: boolean) => void; onBack: () => void }) => {
  const [gameState, setGameState] = useState({
  currentScene: 0 as number | string,
  choices: [],
  storyPath: [] as Array<{ scene: number | string; choice: string }>,  score: 0,
  gameOver: false
});

  const story = {
    scenes: [
      {
        id: 0,
        title: "The Mysterious Library",
        text: "You discover an ancient library hidden beneath your school. Dusty books line towering shelves, and a strange blue glow emanates from the center of the room. As you step closer, you notice three books glowing brighter than the rest.",
        choices: [
          { text: "Pick up the red leather-bound book", points: 10, next: 1 },
          { text: "Examine the glowing blue tome", points: 15, next: 2 },
          { text: "Look for the exit immediately", points: 5, next: 3 }
        ]
      },
      {
        id: 1,
        title: "The Fire Chronicles",
        text: "The red book opens on its own, revealing pages that flicker like flames. Words begin to appear: 'Brave soul, you have chosen the path of courage. The fire within you burns bright, but beware - with great power comes great responsibility.'",
        choices: [
          { text: "Accept the fire magic", points: 20, next: 4 },
          { text: "Close the book gently", points: 10, next: 5 }
        ]
      },
      {
        id: 2,
        title: "The Ocean of Knowledge",
        text: "The blue tome feels cool to the touch. As you open it, water seems to flow from the pages, forming words in the air: 'Wisdom seeker, you have chosen well. The depths of knowledge are vast, but those who dive deep find the greatest treasures.'",
        choices: [
          { text: "Dive deeper into the knowledge", points: 25, next: 6 },
          { text: "Step back carefully", points: 15, next: 7 }
        ]
      },
      {
        id: 3,
        title: "The Safe Path",
        text: "You head for the exit, but the door has vanished! A gentle voice whispers: 'Fear is natural, but growth requires facing the unknown. Choose your path, for there is no going back now.'",
        choices: [
          { text: "Face your fears and return", points: 15, next: 1 },
          { text: "Search for another way out", points: 10, next: 8 }
        ]
      },
      {
        id: 4,
        title: "The Fire Guardian",
        text: "Flames surround you, but they don't burn. A majestic phoenix appears and speaks: 'You have accepted the gift of fire. Use it wisely to light the way for others and warm the hearts of those in need.'",
        choices: [
          { text: "Promise to help others", points: 30, next: 9 },
          { text: "Ask for more power", points: 10, next: 10 }
        ]
      },
      {
        id: 5,
        title: "Respectful Retreat",
        text: "You close the book respectfully. A warm voice says: 'Wisdom lies not just in seeking power, but in knowing when to step back. Your humility has been noted.'",
        choices: [
          { text: "Try the blue book now", points: 20, next: 2 },
          { text: "Leave the library", points: 15, next: 11 }
        ]
      },
      {
        id: 6,
        title: "The Deep Wisdom",
        text: "You're surrounded by swirling knowledge - mathematical equations, historical events, scientific discoveries, and literary masterpieces all dance around you. A wise voice speaks: 'True wisdom is using knowledge to make the world better.'",
        choices: [
          { text: "Vow to share knowledge", points: 35, next: 12 },
          { text: "Keep the knowledge secret", points: 5, next: 13 }
        ]
      },
      // ... more scenes continue with different paths
      {
        id: 9,
        title: "The Hero's Promise",
        text: "Your promise resonates through the library. The phoenix smiles: 'You have chosen the path of a true hero. Your fire will light the darkest places and your courage will inspire others to be brave.'",
        choices: [
          { text: "Accept your destiny", points: 50, next: 'end-hero' }
        ]
      },
      {
        id: 12,
        title: "The Teacher's Path",
        text: "The knowledge settles into your mind perfectly. The wise voice says: 'You have chosen to be a teacher, a guide for others. Your wisdom will help countless souls find their way.'",
        choices: [
          { text: "Embrace your role", points: 45, next: 'end-teacher' }
        ]
      }
    ],
    endings: {
      'end-hero': {
        title: "Hero's Journey Complete",
        text: "You emerge from the library transformed. The fire magic courses through you, but more importantly, you carry the responsibility to protect and inspire others. Your adventure is just beginning.",
        points: 100
      },
      'end-teacher': {
        title: "Master of Wisdom",
        text: "You leave the library with vast knowledge and the calling to share it. You understand that true power lies in empowering others through education and wisdom.",
        points: 90
      }
    }
  };

  const currentScene = story.scenes.find(scene => scene.id === gameState.currentScene);
  const currentEnding = typeof gameState.currentScene === 'string' 
  ? story.endings[gameState.currentScene as keyof typeof story.endings] 
  : null;

  const makeChoice = (choice: { text: string; points: number; next: number | string }) => {
    const newScore = gameState.score + choice.points;
    const newPath = [...gameState.storyPath, { scene: gameState.currentScene, choice: choice.text }];
    
    if (typeof choice.next === 'string') {
      // Ending reached
      const ending = story.endings[choice.next as keyof typeof story.endings];
      const finalScore = newScore + ending.points;
      setGameState({
        ...gameState,
        score: finalScore,
        storyPath: newPath,
        currentScene: choice.next as number | string,
        gameOver: true
      });
    } else {
      setGameState({
        ...gameState,
        score: newScore,
        storyPath: newPath,
        currentScene: choice.next
      });
    }
  };

  useEffect(() => {
    if (gameState.gameOver) {
      const completed = gameState.score >= 80; // Complete with good score
      onComplete('story-architect', gameState.score, completed);
    }
  }, [gameState.gameOver, gameState.score, onComplete]);

  if (currentEnding) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center p-8">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-purple-400 text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-white mb-4">📚 {currentEnding.title}</h2>
          <p className="text-gray-300 text-lg mb-6 leading-relaxed">{currentEnding.text}</p>
          <div className="space-y-2 mb-6">
            <p className="text-yellow-300 text-xl">Final Score: {gameState.score}</p>
            <p className="text-blue-300">Scenes Completed: {gameState.storyPath.length}</p>
            {gameState.score >= 80 && (
              <p className="text-purple-300 font-bold">🏆 STORY MASTERED!</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 p-8">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-4">
        <div className="text-white text-sm">
          <div>Score: <span className="text-yellow-300 font-bold">{gameState.score}</span></div>
          <div>Scene: <span className="text-blue-300 font-bold">{typeof gameState.currentScene === 'number' ? gameState.currentScene + 1 : gameState.currentScene}</span></div>        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-purple-400">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 text-center">{currentScene?.title}</h2>
          
          <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 mb-6">
            <p className="text-white text-lg leading-relaxed">{currentScene?.text}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">Choose your path:</h3>
            {currentScene?.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => makeChoice(choice)}
                className="w-full p-4 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-left transition-all duration-300 hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{choice.text}</span>
                  <span className="text-yellow-300 font-bold">+{choice.points}</span>
                </div>
              </button>
            ))}
          </div>

          {gameState.storyPath.length > 0 && (
            <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Your Journey:</h4>
              <div className="text-xs text-gray-400 space-y-1">
                {gameState.storyPath.slice(-3).map((step, index) => (
                  <div key={index}>• {step.choice}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Grammar Guardian Game - City building through grammar
const GrammarGuardianGame = ({ onComplete, onBack }: { onComplete: (gameId: string, score: number, completed?: boolean) => void; onBack: () => void }) => {
  const [gameState, setGameState] = useState({
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    cityProgress: 0,
    currentQuestion: null as any,
    showResult: false,
    selectedAnswer: '',
    timeLeft: 180,
    gameOver: false,
    usedQuestions: [] as number[]
  });

  const [questions] = useState([
    {
      sentence: "The cat ___ on the windowsill every morning.",
      options: ["sits", "sit", "sitting", "sat"],
      correct: "sits",
      explanation: "Present tense third person singular requires 's'",
      points: 20
    },
    {
      sentence: "If I ___ you, I would study harder.",
      options: ["was", "were", "am", "be"],
      correct: "were",
      explanation: "Subjunctive mood uses 'were' for all persons",
      points: 25
    },
    {
      sentence: "She has ___ to the store already.",
      options: ["went", "gone", "go", "going"],
      correct: "gone",
      explanation: "Present perfect tense requires past participle 'gone'",
      points: 20
    },
    {
      sentence: "Neither the teacher ___ the students were ready.",
      options: ["nor", "or", "and", "but"],
      correct: "nor",
      explanation: "'Neither' is always paired with 'nor'",
      points: 25
    },
    {
      sentence: "The book, ___ I bought yesterday, is fascinating.",
      options: ["which", "that", "who", "whom"],
      correct: "which",
      explanation: "Use 'which' for non-restrictive clauses with commas",
      points: 30
    },
    {
      sentence: "Everyone should bring ___ own lunch.",
      options: ["their", "his", "her", "its"],
      correct: "their",
      explanation: "Modern English accepts 'their' as singular for inclusivity",
      points: 25
    },
    {
      sentence: "The children were playing ___ in the park.",
      options: ["happy", "happily", "happiness", "happier"],
      correct: "happily",
      explanation: "Use adverb 'happily' to modify the verb 'playing'",
      points: 20
    },
    {
      sentence: "Who did you give the book ___?",
      options: ["to", "for", "with", "at"],
      correct: "to",
      explanation: "The verb 'give' requires the preposition 'to'",
      points: 15
    }
  ]);

  const generateQuestion = useCallback(() => {
    const availableQuestions = questions.filter((_, index) => 
      !gameState.usedQuestions?.includes(index)
    );
    
    if (availableQuestions.length === 0) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      return;
    }
    
    const question = availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
    const questionIndex = questions.indexOf(question);
    
    setGameState(prev => ({
      ...prev,
      currentQuestion: question,
      usedQuestions: [...prev.usedQuestions, questionIndex],
      showResult: false,
      selectedAnswer: ''
    }));
  }, [questions, gameState.usedQuestions]);

  useEffect(() => {
    generateQuestion();
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, gameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

const checkAnswer = (answer: string) => {
      if (gameState.showResult) return;

    const isCorrect = answer === gameState.currentQuestion?.correct;
    const points = isCorrect ? gameState.currentQuestion.points : 0;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      showResult: true,
      score: prev.score + points,
      questionsAnswered: prev.questionsAnswered + 1,
      correctAnswers: prev.correctAnswers + (isCorrect ? 1 : 0),
      cityProgress: Math.min(100, prev.cityProgress + (isCorrect ? 15 : 5))
    }));

    setTimeout(() => {
      if (gameState.questionsAnswered >= 7) {
        setGameState(prev => ({ ...prev, gameOver: true }));
      } else {
        generateQuestion();
      }
    }, 2500);
  };

  useEffect(() => {
    if (gameState.gameOver || gameState.timeLeft <= 0) {
      const completed = gameState.correctAnswers >= 6; // Complete with 6+ correct answers
      onComplete('grammar-guardian', gameState.score, completed);
    }
  }, [gameState.gameOver, gameState.timeLeft, gameState.score, gameState.correctAnswers, onComplete]);

  if (gameState.gameOver || gameState.timeLeft <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-800 to-emerald-900 flex items-center justify-center p-8">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-green-400 text-center max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">🏗️ City Construction Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-yellow-300 text-xl">Final Score: {gameState.score}</p>
            <p className="text-blue-300">Correct Answers: {gameState.correctAnswers}/{gameState.questionsAnswered}</p>
            <p className="text-green-300">City Progress: {gameState.cityProgress}%</p>
            {gameState.correctAnswers >= 6 && (
              <p className="text-purple-300 font-bold">🏆 CITY REBUILT!</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-lg font-bold hover:from-green-700 hover:to-emerald-700"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-800 to-emerald-900 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-white text-sm">
          <div>Score: <span className="text-yellow-300 font-bold">{gameState.score}</span></div>
          <div>Time: <span className="text-blue-300 font-bold">{gameState.timeLeft}s</span></div>
          <div>Progress: <span className="text-green-300 font-bold">{gameState.cityProgress}%</span></div>
          <div>Correct: <span className="text-purple-300 font-bold">{gameState.correctAnswers}</span></div>
        </div>
      </div>

      {/* City Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-800 to-transparent">
          {/* City Buildings */}
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className={`absolute bottom-0 bg-gray-700 transition-all duration-1000 ${
                gameState.cityProgress > i * 12.5 ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                left: `${i * 12}%`,
                width: '10%',
                height: `${20 + Math.random() * 15}%`
              }}
            >
              {gameState.cityProgress > i * 12.5 && (
                <div className="absolute top-2 left-2 right-2 space-y-1">
                  {Array.from({ length: 3 }, (_, j) => (
                    <div key={j} className="flex space-x-1">
                      <div className="w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-300 rounded-sm animate-pulse"></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-green-400">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">🛠️ Grammar Guardian Duty</h2>
            
            {gameState.currentQuestion && (
              <>
                <div className="text-center mb-8">
                  <div className="text-xl text-green-300 mb-4">
                    Fix the grammar to rebuild the city:
                  </div>
                  <div className="text-2xl font-bold text-white mb-6 p-6 bg-green-900 bg-opacity-50 rounded-lg">
                    {gameState.currentQuestion.sentence}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {gameState.currentQuestion.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => checkAnswer(option)}
                      disabled={gameState.showResult}
                      className={`p-4 rounded-lg text-xl font-semibold transition-colors ${
                        gameState.showResult && gameState.selectedAnswer === option
                          ? option === gameState.currentQuestion.correct
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      } ${gameState.showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {gameState.showResult && (
                  <div className="text-center space-y-2">
                    {gameState.selectedAnswer === gameState.currentQuestion.correct ? (
                      <>
                        <p className="text-green-400 text-2xl">🏗️ Correct! Building restored!</p>
                        <p className="text-green-300">{gameState.currentQuestion.explanation}</p>
                        <p className="text-yellow-300">+{gameState.currentQuestion.points} points</p>
                      </>
                    ) : (
                      <>
                        <p className="text-red-400 text-2xl">🔧 Not quite right!</p>
                        <p className="text-yellow-300">Correct answer: <strong>{gameState.currentQuestion.correct}</strong></p>
                        <p className="text-gray-300">{gameState.currentQuestion.explanation}</p>
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            <div className="mt-6 text-center">
              <div className="w-full bg-green-800 rounded-full h-4 mb-2">
                <div 
                  className="bg-green-400 h-4 rounded-full transition-all duration-1000" 
                  style={{ width: `${gameState.cityProgress}%` }}
                ></div>
              </div>
              <p className="text-green-300">
                City Reconstruction: {gameState.cityProgress}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Vocabulary Venture Game - Platformer adventure
const VocabularyVentureGame = ({ onComplete, onBack }: { onComplete: (gameId: string, score: number, completed?: boolean) => void; onBack: () => void }) => {  
  const [gameState, setGameState] = useState({
    playerX: 50,
    playerY: 350,
    score: 0,
    level: 1,
    currentWord: null as { word: string; definition: string; options: string[]; correct: string; } | null,
    selectedAnswer: '',
    showWordChallenge: false,
    keysCollected: 0,
    timeLeft: 240,
    gameOver: false,
    platformsUnlocked: 0
  });

  const [words] = useState([
    {
      word: "BENEVOLENT",
      definition: "Well meaning and kindly",
      options: ["Well meaning and kindly", "Cruel and harsh", "Indifferent", "Selfish"],
      correct: "Well meaning and kindly"
    },
    {
      word: "METICULOUS",
      definition: "Showing great attention to detail",
      options: ["Showing great attention to detail", "Careless", "Fast worker", "Lazy person"],
      correct: "Showing great attention to detail"
    },
    {
      word: "EPHEMERAL",
      definition: "Lasting for a very short time",
      options: ["Lasting for a very short time", "Permanent", "Yearly event", "Very important"],
      correct: "Lasting for a very short time"
    },
    {
      word: "UBIQUITOUS",
      definition: "Present everywhere",
      options: ["Present everywhere", "Very rare", "Ancient", "Modern"],
      correct: "Present everywhere"
    },
    {
      word: "SERENDIPITY",
      definition: "Pleasant surprise or fortunate accident",
      options: ["Pleasant surprise or fortunate accident", "Bad luck", "Hard work", "Careful planning"],
      correct: "Pleasant surprise or fortunate accident"
    }
  ]);

  const platforms = [
    { x: 0, y: 400, width: 200, unlocked: true },
    { x: 250, y: 350, width: 150, unlocked: gameState.platformsUnlocked >= 1 },
    { x: 450, y: 300, width: 150, unlocked: gameState.platformsUnlocked >= 2 },
    { x: 650, y: 250, width: 150, unlocked: gameState.platformsUnlocked >= 3 },
    { x: 850, y: 200, width: 200, unlocked: gameState.platformsUnlocked >= 4 }
  ];

  const keys = [
    { x: 300, y: 320, collected: gameState.keysCollected >= 1 },
    { x: 500, y: 270, collected: gameState.keysCollected >= 2 },
    { x: 700, y: 220, collected: gameState.keysCollected >= 3 },
    { x: 900, y: 170, collected: gameState.keysCollected >= 4 }
  ];

  const generateWordChallenge = () => {
    const word = words[Math.floor(Math.random() * words.length)];
    setGameState(prev => ({
      ...prev,
      currentWord: word,
      showWordChallenge: true,
      selectedAnswer: ''
    }));
  };

  const solveWord = (answer: string) => {    
    const isCorrect = answer === gameState.currentWord?.correct;
    
    if (isCorrect) {
      setGameState(prev => ({
        ...prev,
        showWordChallenge: false,
        score: prev.score + 100,
        keysCollected: prev.keysCollected + 1,
        platformsUnlocked: prev.platformsUnlocked + 1,
        currentWord: null
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        selectedAnswer: answer
      }));
      
      setTimeout(() => {
        setGameState(prev => ({
          ...prev,
          showWordChallenge: false,
          currentWord: null as any,
          selectedAnswer: ''
        }));
      }, 2000);
    }
  };

  const movePlayer = (direction: string) => {
    if (gameState.showWordChallenge) return;
    
    setGameState(prev => {
      let newX = prev.playerX;
      
      if (direction === 'left' && newX > 20) {
        newX -= 30;
      } else if (direction === 'right' && newX < 980) {
        newX += 30;
      }
      
      return { ...prev, playerX: newX };
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
          movePlayer('left');
          break;
        case 'ArrowRight':
        case 'd':
          movePlayer('right');
          break;
        case ' ':
          if (!gameState.showWordChallenge) {
            generateWordChallenge();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState.showWordChallenge]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, gameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (gameState.gameOver || gameState.timeLeft <= 0 || gameState.keysCollected >= 4) {
      const completed = gameState.keysCollected >= 4;
      onComplete('vocabulary-venture', gameState.score, completed);
    }
  }, [gameState.gameOver, gameState.timeLeft, gameState.keysCollected, gameState.score, onComplete]);

  if (gameState.gameOver || gameState.timeLeft <= 0 || gameState.keysCollected >= 4) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-900 to-orange-900 flex items-center justify-center p-8">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-amber-400 text-center max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">🗝️ Adventure Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-yellow-300 text-xl">Final Score: {gameState.score}</p>
            <p className="text-blue-300">Keys Collected: {gameState.keysCollected}/4</p>
            <p className="text-green-300">Platforms Unlocked: {gameState.platformsUnlocked}</p>
            {gameState.keysCollected >= 4 && (
              <p className="text-purple-300 font-bold">🏆 ALL KEYS FOUND!</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:from-amber-700 hover:to-orange-700"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-orange-900 relative overflow-hidden">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-white text-sm">
          <div>Score: <span className="text-yellow-300 font-bold">{gameState.score}</span></div>
          <div>Time: <span className="text-blue-300 font-bold">{gameState.timeLeft}s</span></div>
          <div>Keys: <span className="text-green-300 font-bold">{gameState.keysCollected}/4</span></div>
          <div>Level: <span className="text-purple-300 font-bold">{gameState.level}</span></div>
        </div>
      </div>

      {/* Game World */}
      <div className="relative w-full h-screen">
        {/* Platforms */}
        {platforms.map((platform, index) => (
          <div
            key={index}
            className={`absolute bg-gradient-to-r transition-all duration-1000 ${
              platform.unlocked 
                ? 'from-amber-600 to-yellow-600 opacity-100' 
                : 'from-gray-600 to-gray-700 opacity-50'
            }`}
            style={{
              left: `${platform.x}px`,
              top: `${platform.y}px`,
              width: `${platform.width}px`,
              height: '20px'
            }}
          />
        ))}

        {/* Keys */}
        {keys.map((key, index) => (
          !key.collected && (
            <div
              key={index}
              className="absolute text-4xl animate-bounce"
              style={{
                left: `${key.x}px`,
                top: `${key.y}px`
              }}
            >
              🗝️
            </div>
          )
        ))}

        {/* Player */}
        <div
          className="absolute text-6xl transition-all duration-300 z-10"
          style={{
            left: `${gameState.playerX}px`,
            top: `${gameState.playerY}px`
          }}
        >
          🧙‍♂️
        </div>

        {/* Word Challenge Modal */}
        {gameState.showWordChallenge && gameState.currentWord && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-20">
            <div className="bg-amber-900 bg-opacity-90 rounded-2xl p-8 border border-yellow-400 max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-4 text-center">🗝️ Word Challenge</h3>
              
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-yellow-300 mb-4">
                  {gameState.currentWord.word}
                </div>
                <p className="text-gray-300">What does this word mean?</p>
              </div>

              <div className="space-y-3">
                {gameState.currentWord.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => solveWord(option)}
                    className={`w-full p-3 rounded-lg text-left transition-colors ${
                      gameState.selectedAnswer === option
                        ? option === gameState.currentWord?.correct
                          ? 'bg-green-600 text-white'
                          : 'bg-red-600 text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {gameState.selectedAnswer && gameState.selectedAnswer !== gameState.currentWord.correct && (
                <div className="mt-4 text-center">
                  <p className="text-red-400">❌ Incorrect!</p>
                  <p className="text-yellow-300 text-sm">Correct: {gameState.currentWord.correct}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Controls Info */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white bg-black bg-opacity-50 rounded-lg p-4">
          <p className="text-lg font-semibold">🎮 Use Arrow Keys to Move • Space to Unlock Word Challenge</p>
          <p className="text-sm text-amber-300">Collect all 4 keys by solving vocabulary challenges!</p>
        </div>
      </div>
    </div>
  );
};

// Communication Commander Game - Leadership through clear communication
const CommunicationCommanderGame = ({ onComplete, onBack }: { onComplete: (gameId: string, score: number, completed?: boolean) => void; onBack: () => void }) => {
  const [gameState, setGameState] = useState({
    currentMission: 0,
    score: 0,
    teamMorale: 100,
    missionsCompleted: 0,
    currentTask: null as any,
    playerResponse: '',
    showResult: false,
    timeLeft: 360,
    gameOver: false
  });

  const missions = [
    {
      id: 0,
      title: "Emergency Evacuation",
      scenario: "A fire has broken out in the building. Your team is panicking and needs clear, calm instructions to evacuate safely.",
      challenge: "Write clear evacuation instructions for your team:",
      goodResponses: [
        "Everyone stay calm. Walk quickly to the nearest exit. Do not use elevators. Meet at the parking lot.",
        "Remain calm. Exit through the stairs only. Move quickly but don't run. Gather outside for headcount.",
        "Stay low if there's smoke. Use the emergency exits. Walk don't run. Meet at the assembly point."
      ],
      points: 50
    },
    {
      id: 1,
      title: "Project Deadline Crisis",
      scenario: "Your team has fallen behind on a critical project due tomorrow. Everyone is stressed and pointing fingers.",
      challenge: "Write a motivating message to get your team back on track:",
      goodResponses: [
        "We can do this together. Let's focus on solutions, not blame. Here's our action plan...",
        "I know we're under pressure, but we're a strong team. Let's prioritize tasks and work together.",
        "Mistakes happen, but we learn from them. Let's divide the remaining work and support each other."
      ],
      points: 60
    },
    {
      id: 2,
      title: "New Team Member",
      scenario: "A new person has joined your team and seems overwhelmed by all the information and processes.",
      challenge: "Write a welcoming message with clear guidance:",
      goodResponses: [
        "Welcome to the team! Don't worry about learning everything at once. I'll be your buddy this week.",
        "Great to have you here! Let's start with the basics today. Feel free to ask any questions.",
        "Welcome aboard! Everyone here is friendly and helpful. Let's take it step by step together."
      ],
      points: 45
    },
    {
      id: 3,
      title: "Customer Complaint",
      scenario: "An angry customer is complaining about a delayed order. Your team is getting defensive and the situation is escalating.",
      challenge: "Write instructions for handling this customer professionally:",
      goodResponses: [
        "Listen first, apologize for the inconvenience, then offer a solution. Stay calm and professional.",
        "Acknowledge their frustration. Take responsibility. Explain what we'll do to fix this immediately.",
        "Thank them for their patience. Apologize sincerely. Provide a clear timeline for resolution."
      ],
      points: 55
    },
    {
      id: 4,
      title: "Budget Cuts Announcement",
      scenario: "You need to announce budget cuts that will affect everyone's projects. The team is worried about job security.",
      challenge: "Write a transparent but reassuring announcement:",
      goodResponses: [
        "I want to be honest about our challenges while assuring you of our commitment to the team.",
        "These are temporary measures to keep our company strong. Your jobs are secure, but projects will change.",
        "We're facing tough times, but by working together and being smart about resources, we'll get through this."
      ],
      points: 70
    }
  ];

  const generateTask = useCallback(() => {
    if (gameState.currentMission >= missions.length) {
      setGameState(prev => ({ ...prev, gameOver: true }));
      return;
    }
    
    const mission = missions[gameState.currentMission];
    setGameState(prev => ({
      ...prev,
      currentTask: mission,
      playerResponse: '',
      showResult: false
    }));
  }, [gameState.currentMission, missions]);

  useEffect(() => {
    generateTask();
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer);
          return { ...prev, timeLeft: 0, gameOver: true };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [generateTask]);

  const evaluateResponse = () => {
    const response = gameState.playerResponse.trim();
    if (response.length < 20) {
      setGameState(prev => ({
        ...prev,
        showResult: true,
        teamMorale: Math.max(0, prev.teamMorale - 20)
      }));
      return;
    }

    // Simple scoring based on keywords and length
    const goodKeywords = ['calm', 'together', 'help', 'support', 'clear', 'professional', 'solution', 'team', 'understand', 'sorry', 'apologize'];
    const badKeywords = ['panic', 'blame', 'impossible', 'never', 'can\'t', 'won\'t'];
    
    let score = Math.min(gameState.currentTask.points, response.length * 0.5);
    
    goodKeywords.forEach(keyword => {
      if (response.toLowerCase().includes(keyword)) {
        score += 10;
      }
    });

    badKeywords.forEach(keyword => {
      if (response.toLowerCase().includes(keyword)) {
        score -= 15;
      }
    });

    const finalScore = Math.max(0, Math.min(gameState.currentTask?.points || 0, score));
    const moraleChange = finalScore >= (gameState.currentTask?.points || 0) * 0.7 ? 5 : -10;

    setGameState(prev => ({
      ...prev,
      showResult: true,
      score: prev.score + finalScore,
      teamMorale: Math.max(0, Math.min(100, prev.teamMorale + moraleChange)),
      missionsCompleted: prev.missionsCompleted + 1
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        currentMission: prev.currentMission + 1
      }));
      generateTask();
    }, 3000);
  };

  useEffect(() => {
    if (gameState.gameOver || gameState.timeLeft <= 0 || gameState.currentMission >= missions.length) {
      const completed = gameState.missionsCompleted >= 4 && gameState.teamMorale >= 60;
      onComplete('communication-commander', gameState.score, completed);
    }
  }, [gameState.gameOver, gameState.timeLeft, gameState.currentMission, gameState.score, gameState.missionsCompleted, gameState.teamMorale, onComplete, missions.length]);

  if (gameState.gameOver || gameState.timeLeft <= 0 || gameState.currentMission >= missions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 flex items-center justify-center p-8">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-purple-400 text-center max-w-md">
          <h2 className="text-3xl font-bold text-white mb-4">📢 Command Mission Complete!</h2>
          <div className="space-y-2 mb-6">
            <p className="text-yellow-300 text-xl">Final Score: {gameState.score}</p>
            <p className="text-blue-300">Missions Completed: {gameState.missionsCompleted}</p>
            <p className="text-green-300">Team Morale: {gameState.teamMorale}%</p>
            {gameState.missionsCompleted >= 4 && gameState.teamMorale >= 60 && (
              <p className="text-purple-300 font-bold">🏆 EXCELLENT LEADERSHIP!</p>
            )}
          </div>
          <button
            onClick={onBack}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700"
          >
            Return to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 p-8">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg hover:bg-opacity-70"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-black bg-opacity-70 rounded-lg p-4">
        <div className="grid grid-cols-2 gap-4 text-white text-sm">
          <div>Score: <span className="text-yellow-300 font-bold">{gameState.score}</span></div>
          <div>Time: <span className="text-blue-300 font-bold">{Math.floor(gameState.timeLeft / 60)}:{(gameState.timeLeft % 60).toString().padStart(2, '0')}</span></div>
          <div>Morale: <span className="text-green-300 font-bold">{gameState.teamMorale}%</span></div>
          <div>Mission: <span className="text-purple-300 font-bold">{gameState.currentMission + 1}/5</span></div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto pt-20">
        <div className="bg-black bg-opacity-80 rounded-2xl p-8 border border-purple-400">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">📢 Communication Commander</h2>
          
          {gameState.currentTask && (
            <>
              <div className="bg-red-900 bg-opacity-50 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-bold text-red-300 mb-3">{gameState.currentTask.title}</h3>
                <p className="text-white mb-4">{gameState.currentTask.scenario}</p>
                <p className="text-yellow-300 font-semibold">{gameState.currentTask.challenge}</p>
              </div>

              <div className="mb-6">
                <textarea
                  value={gameState.playerResponse}
                  onChange={(e) => setGameState(prev => ({ ...prev, playerResponse: e.target.value }))}
                  placeholder="Write your leadership response here..."
                  className="w-full h-32 p-4 bg-gray-800 text-white rounded-lg border-2 border-purple-400 focus:border-yellow-400 focus:outline-none resize-none"
                  disabled={gameState.showResult}
                />
                <div className="text-right mt-2">
                  <span className="text-sm text-gray-400">
                    {gameState.playerResponse.length} characters (minimum 20)
                  </span>
                </div>
              </div>

              <button
                onClick={evaluateResponse}
                disabled={gameState.playerResponse.length < 20 || gameState.showResult}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                📋 Submit Command
              </button>

              {gameState.showResult && (
                <div className="mt-6 p-4 bg-gray-800 bg-opacity-50 rounded-lg">
                  <h4 className="text-lg font-semibold text-white mb-2">Mission Evaluation:</h4>
                  <div className="space-y-2">
                    <p className="text-yellow-300">
                      Points Earned: +{Math.max(0, Math.min(gameState.currentTask.points, gameState.playerResponse.length * 0.5))}
                    </p>
                    {gameState.teamMorale >= 70 ? (
                      <p className="text-green-400">✅ Team morale is high! Excellent leadership!</p>
                    ) : gameState.teamMorale >= 40 ? (
                      <p className="text-yellow-300">⚠️ Team morale is okay. Keep improving!</p>
                    ) : (
                      <p className="text-red-400">❌ Team morale is low. Focus on clearer communication!</p>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <p className="text-sm text-gray-300 mb-2">Example of good response:</p>
                    <p className="text-green-300 text-sm italic">
                      "{gameState.currentTask.goodResponses[0]}"
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-semibold">Team Morale</span>
              <span className="text-white font-bold">{gameState.teamMorale}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div 
                className={`h-4 rounded-full transition-all duration-500 ${
                  gameState.teamMorale >= 70 ? 'bg-green-500' : 
                  gameState.teamMorale >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${gameState.teamMorale}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishGamesSystem;