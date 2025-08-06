import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Home, 
  Trophy, 
  Clock, 
  Target, 
  Zap,
  Heart,
  Star,
  Volume2,
  VolumeX,
  Settings,
  Sword,
  Shield,
  Flame
} from 'lucide-react';

interface MathGameHubProps {
  onBack: () => void;
}

// Game selection data
const gameData = [
  {
    id: 'numeric-ninja',
    title: 'Numeric Ninja Dojo',
    icon: '🥷',
    difficulty: 'Beginner',
    description: 'Slice through cascading numbers in mathematical sequences',
    duration: '60s', // Made much shorter and faster
    objectives: 3,
    multiplayer: true,
    statReward: '+10',
    unlocked: true
  },
  {
    id: 'geometry-gems',
    title: 'Geometric Portal Defense',
    icon: '💎',
    difficulty: 'Intermediate',
    description: 'Position 3D shapes to seal dimensional rifts',
    duration: '180s',
    objectives: 3,
    multiplayer: false,
    statReward: '+12',
    unlocked: true
  },
  {
    id: 'algebra-adventure',
    title: 'Algebraic Arsenal',
    icon: '⚡',
    difficulty: 'Advanced',
    description: 'Solve equations to charge weapons and blast enemies',
    duration: '300s',
    objectives: 3,
    multiplayer: true,
    statReward: '+15',
    unlocked: true
  },
  {
    id: 'fraction-fracture',
    title: 'Fraction Fracture',
    icon: '🧩',
    difficulty: 'Intermediate',
    description: 'Combine fraction pieces to build bridges across chasms',
    duration: '90s',
    objectives: 3,
    multiplayer: false,
    statReward: '+8',
    unlocked: false
  },
  {
    id: 'statistics-stadium',
    title: 'Statistics Stadium',
    icon: '🏆',
    difficulty: 'Advanced',
    description: 'Win sports competitions using data analysis',
    duration: '240s',
    objectives: 3,
    multiplayer: true,
    statReward: '+13',
    unlocked: false
  }
];

/// game 1: floating vadi
const NumericNinjaGame = ({ onGameAction, onBack }: any) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSlashing, setIsSlashing] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{
  id: number;
  value: number;
  x: number;
  y: number;
  velocity: number;
  isTarget: boolean;
  rotation: number;
  rotationSpeed: number;
}>>([]);
  const [targetNumber, setTargetNumber] = useState(7);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Spawn floating numbers - Much faster!
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const screenHeight = window.innerHeight || 600;
      const newNumber = {
        id: Date.now() + Math.random(),
        value: Math.floor(Math.random() * 20) + 1,
        x: Math.random() * 700 + 50,
        y: screenHeight - 50, // Start from bottom of screen
        velocity: -(3 + Math.random() * 4), // Positive velocity to move upward
        isTarget: Math.random() > 0.4, // More target numbers
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      };
      
      setFloatingNumbers(prev => [...prev, newNumber]);
    }, 800); // Spawn every 0.8 seconds instead of 2

    return () => clearInterval(spawnInterval);
  }, []);

  // Animate floating numbers - Much faster animation
  useEffect(() => {
    const animate = () => {
      setFloatingNumbers(prev => 
        prev.map(num => ({
          ...num,
          y: num.y + num.velocity,
          rotation: num.rotation + num.rotationSpeed
        })).filter(num => num.y > -150) // Remove numbers that fall off screen
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      setMousePos({ 
        x: e.clientX - rect.left, 
        y: e.clientY - rect.top 
      });
    }
  };

  const sliceNumber = (number: any) => {
    setIsSlashing(true);
    setTimeout(() => setIsSlashing(false), 200); // Faster slash animation
    
    const isCorrect = number.value === targetNumber || number.isTarget;
    const points = isCorrect ? (100 + (number.isTarget ? 50 : 0) + combo * 25) : 0; // Bigger combo bonus
    
    if (isCorrect) {
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      setQuestionsCompleted(prev => {
        const newCompleted = prev + 1;
        if (newCompleted >= 15) { // Increased to 15 for more action
          setTimeout(() => onGameAction('game-complete', { score: score + points, combo }), 1000);
        }
        return newCompleted;
      });
      
      // Generate new target faster
      setTargetNumber(Math.floor(Math.random() * 15) + 1); // Smaller range for faster gameplay
    } else {
      setCombo(0);
    }

    // Remove sliced number with explosion effect
    setFloatingNumbers(prev => prev.filter(n => n.id !== number.id));
    
    // Add screen shake effect
    if (isCorrect && combo > 5) {
      document.body.style.animation = 'shake 0.2s';
      setTimeout(() => document.body.style.animation = '', 200);
    }
  };

  return (
    <div 
      ref={gameAreaRef}
      className="h-screen bg-gradient-to-b from-red-900 via-orange-900 to-yellow-900 relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
      >
        ← Back
      </button>

      {/* Ninja Dojo Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-6xl">🏯</div>
        <div className="absolute top-40 right-20 text-4xl">🌸</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">🎋</div>
        <div className="absolute bottom-40 right-1/3 text-6xl">⛩️</div>
      </div>

      {/* Floating Numbers - Enhanced with rotation and faster movement */}
      {floatingNumbers.map(number => (
        <button
          key={number.id}
          onClick={() => sliceNumber(number)}
          className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-100 transform hover:scale-125 cursor-pointer shadow-2xl ${
            number.value === targetNumber || number.isTarget
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse border-2 border-yellow-300' 
              : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md border border-blue-300'
          }`}
          style={{ 
            left: number.x, 
            top: number.y,
            transform: `translate(-50%, -50%) rotate(${number.rotation}deg) ${number.value === targetNumber ? 'scale(1.2)' : 'scale(1)'}`,
            zIndex: number.value === targetNumber ? 100 : 10
          }}
        >
          {number.value}
        </button>
      ))}

      {/* Enhanced Ninja Cursor with trail effect */}
      <div 
        className="absolute pointer-events-none z-50"
        style={{ left: mousePos.x - 20, top: mousePos.y - 20 }}
      >
        <div className={`text-4xl transition-all duration-100 ${isSlashing ? 'scale-150 rotate-45' : ''}`}>
          ⚔️
        </div>
        {/* Mouse trail effect */}
        <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full animate-ping"></div>
      </div>

      {/* Enhanced Game Info Panel with combo effects */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-80 rounded-lg p-4 text-white border border-red-500">
        <h3 className="text-xl font-bold mb-2 text-red-400">🥷 Ninja Dojo</h3>
        <p className="text-sm mb-2">Target: <span className="text-yellow-300 font-bold text-lg animate-pulse">{targetNumber}</span></p>
        <p className="text-xs text-orange-300">Combo: <span className={`font-bold ${combo > 5 ? 'text-red-400 animate-bounce' : ''}`}>{combo}x</span></p>
        <p className="text-xs text-green-300">Progress: {questionsCompleted}/15 ⚡</p>
        <p className="text-xs text-blue-300">Score: <span className="font-bold">{score.toLocaleString()}</span></p>
        {combo > 10 && <p className="text-xs text-red-400 animate-pulse">🔥 ON FIRE! 🔥</p>}
      </div>

      {/* Enhanced Instructions with speed emphasis */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p className="text-xl font-bold animate-pulse">⚡ SLICE THE TARGET: <span className="text-yellow-300 text-2xl">{targetNumber}</span> ⚡</p>
        <p className="text-sm text-yellow-300">🌟 Golden numbers = MEGA BONUS! 🌟</p>
        <p className="text-xs text-red-400 mt-1">💨 Speed is everything, young ninja! 💨</p>
      </div>
    </div>
  );
};
/// game 2

const AlgebraAdventure = ({ onGameAction, onBack }: any) => {
  const [answer, setAnswer] = useState('');
  const [currentProblem, setCurrentProblem] = useState<{equation: string; answer: string; hint: string} | null>(null);
  const [score, setScore] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  useEffect(() => {
    generateProblem();
  }, []);

  const generateProblem = () => {
    const problems = [
      { equation: "2x + 5 = 13", answer: "4", hint: "Subtract 5 from both sides, then divide by 2" },
      { equation: "3x - 7 = 11", answer: "6", hint: "Add 7 to both sides, then divide by 3" },
      { equation: "x/2 + 3 = 8", answer: "10", hint: "Subtract 3, then multiply by 2" },
      { equation: "4x + 2 = 18", answer: "4", hint: "Subtract 2, then divide by 4" },
      { equation: "5x - 3 = 17", answer: "4", hint: "Add 3, then divide by 5" },
      { equation: "x + 7 = 15", answer: "8", hint: "Subtract 7 from both sides" }
    ];
    setCurrentProblem(problems[Math.floor(Math.random() * problems.length)]);
  };

  const checkAnswer = () => {
    if (!answer.trim()) return;
    
    const isCorrect = answer === currentProblem?.answer;
    
    if (isCorrect) {
      setScore(prev => {
        const newScore = prev + 200;
        setQuestionsCompleted(prevCompleted => {
          const newCompleted = prevCompleted + 1;
          if (newCompleted >= 10) {
            setTimeout(() => onGameAction('game-complete', { score: newScore }), 1000);
          }
          return newCompleted;
        });
        return newScore;
      });
      setAnswer('');
      generateProblem();
    } else {
      setAnswer('');
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
      >
        <span>←</span>
      <span>Back to Academy</span>
      </button>

      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-blue-400">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">⚡ Algebra Adventure</h2>
          
          {/* Score Display */}
          <div className="text-center mb-4">
            <p className="text-white">Score: {score} | Progress: {questionsCompleted}/10</p>
          </div>
          
          {currentProblem && (
            <>
              <div className="text-center mb-8">
                <div className="text-4xl font-bold text-yellow-300 mb-4">
                  {currentProblem.equation}
                </div>
                <p className="text-gray-300">Solve for x</p>
              </div>

              <div className="flex items-center justify-center space-x-4 mb-6">
                <span className="text-white text-xl">x = </span>
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="px-4 py-2 text-xl font-bold text-center bg-gray-800 text-white rounded-lg border-2 border-blue-400 focus:border-yellow-400 focus:outline-none w-24"
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                />
                <button
                  onClick={checkAnswer}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Check
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-400">💡 Hint: {currentProblem.hint}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
/// game 3
const GeometryGems = ({ onGameAction, onBack }: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [currentShape, setCurrentShape] = useState<{
  type: string;
  radius?: number;
  width?: number;
  height?: number;
  base?: number;
  question: string;
  answer: string;
  options: string[];
} | null>(null);
  const [score, setScore] = useState(0);
  const [questionsCompleted, setQuestionsCompleted] = useState(0);

  useEffect(() => {
    generateShape();
  }, []);

  const generateShape = () => {
    const shapes = [
      { 
        type: 'circle', 
        radius: 5, 
        question: 'What is the area of this circle? (π ≈ 3.14)',
        answer: '78.5',
        options: ['78.5', '31.4', '15.7', '157']
      },
      { 
        type: 'rectangle', 
        width: 8, 
        height: 6, 
        question: 'What is the perimeter of this rectangle?',
        answer: '28',
        options: ['28', '48', '14', '24']
      },
      { 
        type: 'triangle', 
        base: 10, 
        height: 8, 
        question: 'What is the area of this triangle?',
        answer: '40',
        options: ['40', '80', '18', '90']
      },
      { 
        type: 'circle', 
        radius: 3, 
        question: 'What is the circumference of this circle? (π ≈ 3.14)',
        answer: '18.8',
        options: ['18.8', '28.3', '9.4', '37.7']
      }
    ];
    setCurrentShape(shapes[Math.floor(Math.random() * shapes.length)]);
    setSelectedAnswer('');
  };

  const checkAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentShape?.answer;
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(prev => {
          const newScore = prev + 150;
          setQuestionsCompleted(prevCompleted => {
            const newCompleted = prevCompleted + 1;
            if (newCompleted >= 10) {
              setTimeout(() => onGameAction('game-complete', { score: newScore }), 1000);
            }
            return newCompleted;
          });
          return newScore;
        });
        generateShape();
      } else {
        setSelectedAnswer('');
      }
    }, 1000);
  };

  const renderShape = (shape : any) => {
    if (!shape) return null;
    
    switch (shape.type) {
      case 'circle':
        return (
          <div 
            className="border-4 border-blue-400 rounded-full flex items-center justify-center text-white font-bold animate-pulse"
            style={{ width: '120px', height: '120px' }}
          >
            r = {shape.radius}
          </div>
        );
      case 'rectangle':
        return (
          <div 
            className="border-4 border-yellow-400 flex items-center justify-center text-white font-bold relative"
            style={{ width: '120px', height: '90px' }}
          >
            <span className="absolute -top-6 text-sm">{shape.width}</span>
            <span className="absolute -left-8 text-sm transform -rotate-90">{shape.height}</span>
          </div>
        );
      case 'triangle':
        return (
          <div className="relative">
            <div 
              className="border-l-transparent border-r-transparent border-b-red-400"
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: '60px',
                borderRightWidth: '60px',
                borderBottomWidth: '80px',
                borderStyle: 'solid'
              }}
            ></div>
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-6 text-white text-sm">
              base: {shape.base}
            </span>
            <span className="absolute top-1/2 left-0 transform -translate-x-8 -translate-y-1/2 text-white text-sm -rotate-90">
              h: {shape.height}
            </span>
          </div>
        );
      default:
        return <div className="text-white">Unknown shape</div>;
    }
  };

  return (
    <div className="h-screen bg-gradient-to-b from-green-900 to-teal-900 flex items-center justify-center">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="absolute top-4 right-4 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
      >
        <span>←</span>
      <span>Back to Academy</span>
      </button>

      <div className="max-w-3xl mx-auto p-8">
        <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-green-400">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">💎 Geometry Gems</h2>
          
          {/* Score Display */}
          <div className="text-center mb-4">
            <p className="text-white">Score: {score} | Progress: {questionsCompleted}/10</p>
          </div>
          
          {currentShape && (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Shape Display */}
              <div className="flex items-center justify-center">
                <div className="bg-gray-800 rounded-lg p-8 w-64 h-64 flex items-center justify-center">
                  {renderShape(currentShape)}
                </div>
              </div>

              {/* Question and Options */}
              <div>
                <h3 className="text-xl text-white mb-6">{currentShape.question}</h3>
                <div className="space-y-3">
                  {currentShape.options.map((option) => (
                    <button
                      key={option}
                      onClick={() => checkAnswer(option)}
                      className={`w-full p-3 rounded-lg text-left transition-colors ${
                        selectedAnswer === option
                          ? option === currentShape.answer
                            ? 'bg-green-600 text-white'
                            : 'bg-red-600 text-white'
                          : 'bg-gray-700 text-white hover:bg-gray-600'
                      }`}
                      disabled={!!selectedAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component
const MathGameHub = ({ onBack }: MathGameHubProps) => {
  const [currentView, setCurrentView] = useState('selection');
  const [selectedGame, setSelectedGame] = useState<{
  id: string;
  title: string;
  icon: string;
  difficulty: string;
  description: string;
  duration: string;
  objectives: number;
  multiplayer: boolean;
  statReward: string;
  unlocked: boolean;
} | null>(null);
  const [playerStats, setPlayerStats] = useState<{
  [key: string]: { bestScore: number; timesPlayed: number };
}>({
    'numeric-ninja': { bestScore: 0, timesPlayed: 0 },
    'algebra-adventure': { bestScore: 0, timesPlayed: 0 },
    'geometry-gems': { bestScore: 0, timesPlayed: 0 }
  });

  const handleGameSelect = (gameId : string) => {
    const game = gameData.find(g => g.id === gameId);
    if (game && game.unlocked) {
      setSelectedGame(game);
      setCurrentView('game');
    }
  };

  const handleGameAction = (action: string, data: any) => {
      if (action === 'game-complete') {
      const gameId = selectedGame!.id;
      setPlayerStats(prev => ({
        ...prev,
        [gameId]: {
          bestScore: Math.max(prev[gameId].bestScore, data.score),
          timesPlayed: prev[gameId].timesPlayed + 1
        }
      }));
      
      // Show completion message
      alert(`🎉 Game Complete! Final Score: ${data.score}`);
      
      // Return to selection
      setCurrentView('selection');
      setSelectedGame(null);
    }
  };

  const handleBackToSelection = () => {
    setCurrentView('selection');
    setSelectedGame(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500';
      case 'Intermediate': return 'bg-yellow-500';
      case 'Advanced': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (currentView === 'game' && selectedGame) {
    switch (selectedGame.id) {
      case 'numeric-ninja':
        return <NumericNinjaGame onGameAction={handleGameAction} onBack={handleBackToSelection} />;
      case 'algebra-adventure':
        return <AlgebraAdventure onGameAction={handleGameAction} onBack={handleBackToSelection} />;
      case 'geometry-gems':
        return <GeometryGems onGameAction={handleGameAction} onBack={handleBackToSelection} />;
      default:
        return <div>Game not found</div>;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      {/* ADD THIS BACK BUTTON AT THE TOP */}
    <button 
      onClick={onBack} 
      className="mb-4 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
    >
      <span>←</span>
      <span>Back to Academy</span>
    </button>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Math Adventure Hub</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gameData.map((game) => {
            const stats = playerStats[game.id] || { bestScore: 0, timesPlayed: 0 };
            
            return (
              <div
                key={game.id}
                className={`bg-gray-900 bg-opacity-80 rounded-2xl p-6 border border-gray-700 transition-all duration-300 hover:scale-105 hover:border-blue-400 ${
                  game.unlocked ? 'cursor-pointer' : 'opacity-60'
                }`}
                onClick={() => handleGameSelect(game.id)}
              >
                {/* Game Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-4xl">{game.icon}</span>
                    <div>
                      <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                    </div>
                  </div>
                  {!game.unlocked && (
                    <div className="text-gray-400">
                      🔒
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{game.description}</p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-yellow-400 font-bold">Best Score</div>
                    <div className="text-white text-lg">{stats.bestScore}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold">Times Played</div>
                    <div className="text-white text-lg">{stats.timesPlayed}</div>
                  </div>
                </div>

                {/* Game Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="mr-2">⏱️</span>
                    <span>{game.duration}</span>
                  </div>
                  {game.multiplayer && (
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="mr-2">👥</span>
                      <span>Multiplayer Available</span>
                    </div>
                  )}
                  <div className="flex items-center text-gray-300 text-sm">
                    <span className="mr-2">🎯</span>
                    <span>{game.objectives} Objectives</span>
                  </div>
                </div>

                {/* Stat Reward */}
                <div className="text-center">
                  <span className="text-red-400">⚡</span>
                  <span className="text-green-400 font-bold ml-1">Stat Reward: {game.statReward}</span>
                </div>

                {/* Play Button or Lock Message */}
                {game.unlocked ? (
                  <div className="mt-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-center py-2 rounded-lg font-semibold">
                    ▶ Play Game
                  </div>
                ) : (
                  <div className="mt-4 bg-gray-600 text-gray-300 text-center py-2 rounded-lg text-sm">
                    Complete previous games to unlock
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MathGameHub;