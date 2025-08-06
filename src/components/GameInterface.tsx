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
import { Hero } from '../types/index';
import { Academy, AcademyGame, GameSession } from '../types/academy';
// Mock types for the demo


interface GameInterfaceProps {
  hero: Hero;
  academy: Academy;
  game: AcademyGame;
  onGameComplete: (session: GameSession) => void;
  onBackToAcademy: () => void;
}

export default function GameInterface({ hero, academy, game, onGameComplete, onBackToAcademy }: GameInterfaceProps) {
  const [gameState, setGameState] = useState('intro');
  const [score, setScore] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameData, setGameData] = useState<any>(null);
  
  const timerRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const gameStartTimeRef = useRef<Date | null>(null);

  // Game timer with proper cleanup
  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  // Initialize game when loading state is set
  useEffect(() => {
    if (gameState === 'loading') {
      const timer = setTimeout(() => {
        initializeGame();
      }, 1500); // Show loading for 1.5 seconds

      return () => clearTimeout(timer);
    }
  }, [gameState]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const getGameIntro = () => {
    switch (game.id) {
      case 'numeric-ninja':
        return {
          title: "🥷 Welcome to Numeric Ninja Dojo!",
          description: "Master the ancient art of number slicing! Use your katana to slice through floating numbers and complete mathematical sequences.",
          hints: [
            "🎯 Numbers will float across the screen - slice them in the correct order",
            "⚡ Combo multipliers increase your score for consecutive correct slices",
            "🌟 Watch for golden numbers - they give bonus points!",
            "💨 The faster you slice, the higher your ninja rank!"
          ],
          controls: "Use your mouse to slice through numbers or tap on mobile!"
        };
      case 'algebra-adventure':
        return {
          title: "⚡ Welcome to Algebraic Arsenal!",
          description: "Solve equations to charge your weapons and blast through mathematical challenges!",
          hints: [
            "🎯 Solve algebraic equations to power up your weapons",
            "⚡ Faster solving means more powerful attacks",
            "🌟 Chain correct answers for combo bonuses",
            "💎 Master complex equations for epic rewards!"
          ],
          controls: "Type your answers and press Enter to fire!"
        };
      case 'geometry-gems':
        return {
          title: "💎 Welcome to Geometric Portal Defense!",
          description: "Use geometric knowledge to seal dimensional rifts and protect the realm!",
          hints: [
            "🎯 Calculate areas, perimeters, and volumes to seal portals",
            "⚡ Multiple choice answers - choose wisely!",
            "🌟 Perfect accuracy unlocks special geometric powers",
            "💎 Advanced shapes yield greater rewards!"
          ],
          controls: "Click on the correct answer to cast your geometric spell!"
        };
      default:
        return {
          title: `🎮 Welcome to ${game.name}!`,
          description: game.description || "An exciting mathematical training simulation awaits!",
          hints: [
            "🎯 Follow the on-screen instructions",
            "⚡ Quick reflexes will earn bonus points",
            "🌟 Look for special power-ups and bonuses"
          ],
          controls: "Use mouse and keyboard to interact with the game!"
        };
    }
  };

  const initializeGame = () => {
    gameStartTimeRef.current = new Date();
    
    switch (game.id) {
      case 'numeric-ninja':
        setGameData({
          floatingNumbers: [],
          currentSequence: { type: 'fibonacci', numbers: [1, 1, 2, 3, 5], nextNumber: 8 },
          slashTrail: [],
          combo: 0,
          level: 1,
          enemiesDefeated: 0,
          particles: [],
          targetNumber: 8,
          questionsCompleted: 0
        });
        break;
      case 'algebra-adventure':
        setGameData({
          currentProblem: generateAlgebraProblem(),
          answer: '',
          score: 0,
          combo: 0,
          questionsCompleted: 0,
          powerLevel: 0
        });
        break;
      case 'geometry-gems':
        setGameData({
          currentShape: generateGeometryProblem(),
          selectedAnswer: '',
          score: 0,
          combo: 0,
          questionsCompleted: 0,
          portalsSealed: 0
        });
        break;
      default:
        setGameData({ initialized: true, questionsCompleted: 0 });
    }
    setGameState('playing');
  };

  const generateAlgebraProblem = () => {
    const problems = [
      { equation: "2x + 5 = 13", answer: "4", hint: "Subtract 5 from both sides, then divide by 2" },
      { equation: "3x - 7 = 11", answer: "6", hint: "Add 7 to both sides, then divide by 3" },
      { equation: "x/2 + 3 = 8", answer: "10", hint: "Subtract 3, then multiply by 2" },
      { equation: "4x + 2 = 18", answer: "4", hint: "Subtract 2, then divide by 4" },
      { equation: "5x - 3 = 17", answer: "4", hint: "Add 3, then divide by 5" },
      { equation: "x + 7 = 15", answer: "8", hint: "Subtract 7 from both sides" }
    ];
    return problems[Math.floor(Math.random() * problems.length)];
  };

  const generateGeometryProblem = () => {
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
      }
    ];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const handleGameAction = (action: string, data?: any) => {
    switch (action) {
      case 'slice-number':
        handleNumberSlice(data);
        break;
      case 'solve-algebra':
        handleAlgebraSolve(data);
        break;
      case 'answer-geometry':
        handleGeometryAnswer(data);
        break;
      case 'complete':
        completeGame();
        break;
    }
  };

  const handleNumberSlice = (data: any) => {
    setQuestionsAnswered(prev => prev + 1);
    const isCorrect = data.correct;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      const comboBonus = (gameData?.combo || 0) * 10;
      const points = data.points + comboBonus;
      setScore(prev => prev + points);
      setGameData((prev: any) => ({ 
        ...prev, 
        combo: (prev?.combo || 0) + 1,
        questionsCompleted: (prev?.questionsCompleted || 0) + 1
      }));
      
      // Generate next target number
      const nextTarget = Math.floor(Math.random() * 20) + 1;
      setGameData((prev: any) => ({ ...prev, targetNumber: nextTarget }));
      
    } else {
      setGameData((prev: any) => ({ ...prev, combo: 0 }));
    }
    
    // Check for game completion
    if (gameData?.questionsCompleted >= 9 && isCorrect) {
      setTimeout(() => completeGame(), 1000);
    }
  };

  const handleAlgebraSolve = (data: any) => {
    setQuestionsAnswered(prev => prev + 1);
    const isCorrect = data.answer === gameData?.currentProblem?.answer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 200);
      setGameData((prev: any) => ({
        ...prev,
        combo: (prev.combo || 0) + 1,
        questionsCompleted: (prev.questionsCompleted || 0) + 1,
        currentProblem: generateAlgebraProblem(),
        answer: '',
        powerLevel: Math.min(100, (prev.powerLevel || 0) + 10)
      }));
    } else {
      setGameData((prev: any) => ({ ...prev, combo: 0, answer: '' }));
    }
    
    if (gameData?.questionsCompleted >= 9 && isCorrect) {
      setTimeout(() => completeGame(), 1000);
    }
  };

  const handleGeometryAnswer = (data: any) => {
    setQuestionsAnswered(prev => prev + 1);
    const isCorrect = data.answer === gameData?.currentShape?.answer;
    
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setScore(prev => prev + 150);
      setGameData((prev: any) => ({
        ...prev,
        combo: (prev.combo || 0) + 1,
        questionsCompleted: (prev.questionsCompleted || 0) + 1,
        currentShape: generateGeometryProblem(),
        selectedAnswer: '',
        portalsSealed: (prev.portalsSealed || 0) + 1
      }));
    } else {
      setGameData((prev: any) => ({ ...prev, combo: 0, selectedAnswer: '' }));
    }
    
    if (gameData?.questionsCompleted >= 9 && isCorrect) {
      setTimeout(() => completeGame(), 1000);
    }
  };

  const completeGame = () => {
    const session: GameSession = {
      gameId: game.id,
      startTime: gameStartTimeRef.current || new Date(),
      score,
      accuracy,
      timeElapsed,
      questionsAnswered,
      powerUpsUsed: [],
      achievements: []
    };
    
    setGameState('completed');
    setTimeout(() => onGameComplete(session), 3000);
  };

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  const restartGame = () => {
    setScore(0);
    setTimeElapsed(0);
    setAccuracy(100);
    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setGameData(null);
    setGameState('loading');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Update accuracy whenever correctAnswers or questionsAnswered changes
  useEffect(() => {
    if (questionsAnswered > 0) {
      const newAccuracy = Math.round((correctAnswers / questionsAnswered) * 100);
      setAccuracy(newAccuracy);
    }
  }, [correctAnswers, questionsAnswered]);

  const renderGameIntro = () => {
    const intro = getGameIntro();
    
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        <div className="max-w-4xl mx-auto p-8">
          <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-purple-400 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">{intro.title}</h1>
              <p className="text-xl text-purple-200">{intro.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">💡 Game Hints:</h3>
                <ul className="space-y-3">
                  {intro.hints.map((hint, index) => (
                    <li key={index} className="text-gray-300 flex items-start">
                      <span className="text-green-400 mr-2">✓</span>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold text-cyan-400 mb-4">🎮 Controls:</h3>
                <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4">
                  <p className="text-gray-300">{intro.controls}</p>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-lg font-semibold text-white mb-2">Scoring System:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-yellow-400">Base Points: 100</div>
                    <div className="text-green-400">Combo Bonus: +10 per combo</div>
                    <div className="text-purple-400">Speed Bonus: Up to +50</div>
                    <div className="text-red-400">Perfect Round: x2 multiplier</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button
                onClick={() => setGameState('loading')}
                className="px-12 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🚀 Start Adventure!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderGameContent = () => {
    if (gameState === 'intro') {
      return renderGameIntro();
    }

    if (gameState === 'loading') {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="animate-spin w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-white text-xl">Initializing {game.name}...</p>
            <p className="text-gray-400 text-sm mt-2">Preparing your adventure...</p>
          </div>
        </div>
      );
    }

    if (gameState === 'completed') {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center bg-black bg-opacity-70 rounded-xl p-8 border border-yellow-400">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Epic Victory!</h2>
            <div className="grid grid-cols-2 gap-6 text-white mb-6">
              <div className="bg-gradient-to-b from-yellow-600 to-yellow-700 rounded-lg p-4">
                <div className="text-3xl font-bold">{score.toLocaleString()}</div>
                <div className="text-sm text-yellow-200">Final Score</div>
              </div>
              <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg p-4">
                <div className="text-3xl font-bold">{accuracy}%</div>
                <div className="text-sm text-green-200">Accuracy</div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-2xl text-blue-400 font-bold">+{game.statReward} {academy.statType}</div>
              <div className="text-sm text-gray-300">Hero Enhancement Unlocked!</div>
            </div>
            <div className="text-yellow-300 animate-pulse">
              ⭐ Returning to Academy... ⭐
            </div>
          </div>
        </div>
      );
    }

    // Render specific game based on type
    switch (game.id) {
      case 'numeric-ninja':
        return <NumericNinjaGame gameData={gameData} onAction={handleGameAction} />;
      case 'algebra-adventure':
        return <AlgebraAdventureGame gameData={gameData} onAction={handleGameAction} />;
      case 'geometry-gems':
        return <GeometryGemsGame gameData={gameData} onAction={handleGameAction} />;
      default:
        return <GenericGameDemo game={game} onAction={handleGameAction} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative">
      {/* Game HUD - Only show during gameplay */}
      {gameState === 'playing' && (
        <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-50 border-b border-gray-600">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              {/* Left side - Game info */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBackToAcademy}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Home className="w-5 h-5 text-white" />
                </button>
                <div>
                  <h1 className="text-xl font-bold text-white">{game.name}</h1>
                  <p className="text-sm text-gray-300">{academy.name}</p>
                </div>
              </div>

              {/* Center - Game stats */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{score.toLocaleString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-semibold">{formatTime(timeElapsed)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-green-400" />
                  <span className="text-white font-semibold">{accuracy}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-semibold">{gameData?.combo || 0}x</span>
                </div>
              </div>

              {/* Right side - Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {soundEnabled ? (
                    <Volume2 className="w-5 h-5 text-white" />
                  ) : (
                    <VolumeX className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={pauseGame}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {gameState as any === 'paused' ? (
                    <Play className="w-5 h-5 text-white" />
                  ) : (
                    <Pause className="w-5 h-5 text-white" />
                  )}
                </button>
                <button
                  onClick={restartGame}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <RotateCcw className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Game Content */}
      <div className={gameState === 'playing' ? 'pt-20 h-screen' : 'h-screen'}>
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-20">
            <div className="text-center">
              <Pause className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Adventure Paused</h2>
              <button
                onClick={pauseGame}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Resume Adventure
              </button>
            </div>
          </div>
        )}
        
        {renderGameContent()}
      </div>
    </div>
  );
}

// Enhanced Game Components with Fixed Mechanics

const NumericNinjaGame = ({ gameData, onAction }: any) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isSlashing, setIsSlashing] = useState(false);
  const [floatingNumbers, setFloatingNumbers] = useState<any[]>([]);
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Spawn floating numbers
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const newNumber = {
        id: Date.now() + Math.random(),
        value: Math.floor(Math.random() * 20) + 1,
        x: Math.random() * 500 + 50,
        y: 500,
        velocity: -1.5 - Math.random() * 2,
        isTarget: Math.random() > 0.6
      };
      
      setFloatingNumbers(prev => [...prev, newNumber]);
    }, 2000);

    return () => clearInterval(spawnInterval);
  }, []);

  // Animate floating numbers
  useEffect(() => {
    const animate = () => {
      setFloatingNumbers(prev => 
        prev.map(num => ({
          ...num,
          y: num.y + num.velocity
        })).filter(num => num.y > -100)
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
    setTimeout(() => setIsSlashing(false), 300);
    
    const isCorrect = number.value === gameData?.targetNumber || number.isTarget;
    const points = isCorrect ? (100 + (number.isTarget ? 50 : 0)) : 0;
    
    onAction('slice-number', {
      correct: isCorrect,
      points,
      position: { x: number.x, y: number.y }
    });

    // Remove sliced number
    setFloatingNumbers(prev => prev.filter(n => n.id !== number.id));
  };

  return (
    <div 
      ref={gameAreaRef}
      className="h-full bg-gradient-to-b from-red-900 via-orange-900 to-yellow-900 relative overflow-hidden cursor-none"
      onMouseMove={handleMouseMove}
    >
      {/* Ninja Dojo Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-6xl">🏯</div>
        <div className="absolute top-40 right-20 text-4xl">🌸</div>
        <div className="absolute bottom-20 left-1/4 text-5xl">🎋</div>
        <div className="absolute bottom-40 right-1/3 text-6xl">⛩️</div>
      </div>

      {/* Floating Numbers */}
      {floatingNumbers.map(number => (
        <button
          key={number.id}
          onClick={() => sliceNumber(number)}
          className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-200 transform hover:scale-110 ${
            number.value === gameData?.targetNumber || number.isTarget
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg animate-pulse' 
              : 'bg-gradient-to-r from-blue-400 to-purple-500 text-white shadow-md'
          }`}
          style={{ 
            left: number.x, 
            top: number.y,
            transform: `translate(-50%, -50%) ${number.value === gameData?.targetNumber ? 'scale(1.1)' : 'scale(1)'}`
          }}
        >
          {number.value}
        </button>
      ))}

      {/* Ninja Cursor */}
      <div 
        className="absolute pointer-events-none z-50"
        style={{ left: mousePos.x - 20, top: mousePos.y - 20 }}
      >
        <div className={`text-4xl transition-transform duration-200 ${isSlashing ? 'scale-150 rotate-45' : ''}`}>
          ⚔️
        </div>
      </div>

      {/* Game Info Panel */}
      <div className="absolute top-4 left-4 bg-black bg-opacity-70 rounded-lg p-4 text-white">
        <h3 className="text-xl font-bold mb-2">🥷 Ninja Training</h3>
        <p className="text-sm mb-2">Target Number: <span className="text-yellow-300 font-bold">{gameData?.targetNumber}</span></p>
        <p className="text-xs text-orange-300">Combo: {gameData?.combo || 0}x</p>
        <p className="text-xs text-green-300">Progress: {gameData?.questionsCompleted || 0}/10</p>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p className="text-lg font-semibold">🎯 Slice the target number: {gameData?.targetNumber}!</p>
        <p className="text-sm text-yellow-300">Golden numbers = Bonus points!</p>
      </div>
    </div>
  );
};

const AlgebraAdventureGame = ({ gameData, onAction }: any) => {
  const [answer, setAnswer] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [gameData?.currentProblem]);

  const handleSubmit = () => {
    if (answer.trim()) {
      onAction('solve-algebra', { answer: answer.trim() });
      setAnswer('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Magic Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-16 text-6xl animate-pulse">⚡</div>
        <div className="absolute top-32 right-24 text-4xl animate-bounce">🔮</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-pulse">✨</div>
        <div className="absolute bottom-20 right-16 text-4xl animate-bounce">⭐</div>
      </div>

      <div className="flex items-center justify-center h-full p-8">
        <div className="max-w-2xl w-full">
          <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-blue-400">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">⚡ Algebraic Arsenal</h2>
            
            {/* Power Level Display */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-semibold">⚡ Weapon Power</span>
                <span className="text-blue-300">{gameData?.powerLevel || 0}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${gameData?.powerLevel || 0}%` }}
                ></div>
              </div>
            </div>
            
            {gameData?.currentProblem && (
              <>
                <div className="text-center mb-8">
                  <div className="text-4xl font-bold text-yellow-300 mb-4">
                    {gameData.currentProblem.equation}
                  </div>
                  <p className="text-gray-300">Solve for x to charge your weapon!</p>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="text-white text-xl">x = </span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="px-4 py-2 text-xl font-bold text-center bg-gray-800 text-white rounded-lg border-2 border-blue-400 focus:border-yellow-400 focus:outline-none w-24"
                    placeholder="?"
                  />
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors"
                  >
                    🔥 Fire!
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-400">💡 Hint: {gameData.currentProblem.hint}</p>
                </div>
              </>
            )}

            {/* Stats Display */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-yellow-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-yellow-300 font-bold">Combo</div>
                <div className="text-white text-lg">{gameData?.combo || 0}x</div>
              </div>
              <div className="bg-green-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-green-300 font-bold">Progress</div>
                <div className="text-white text-lg">{gameData?.questionsCompleted || 0}/10</div>
              </div>
              <div className="bg-purple-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-purple-300 font-bold">Score</div>
                <div className="text-white text-lg">{gameData?.score || 0}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p className="text-lg font-semibold">⚡ Solve equations to power up your weapons!</p>
        <p className="text-sm text-blue-300">Chain correct answers for massive damage!</p>
      </div>
    </div>
  );
};

const GeometryGemsGame = ({ gameData, onAction }: any) => {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
    setTimeout(() => {
      onAction('answer-geometry', { answer });
      setSelectedAnswer('');
    }, 1000);
  };

  const renderShape = (shape: any) => {
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
            <div className="w-0 h-0 border-l-[60px] border-r-[60px] border-b-[80px] border-l-transparent border-r-transparent border-b-red-400 animate-pulse"></div>
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
    <div className="h-full bg-gradient-to-b from-green-900 to-teal-900 relative overflow-hidden">
      {/* Crystal Cave Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-16 left-16 text-6xl animate-bounce">💎</div>
        <div className="absolute top-32 right-24 text-4xl animate-pulse">🔷</div>
        <div className="absolute bottom-32 left-20 text-5xl animate-bounce">💠</div>
        <div className="absolute bottom-20 right-16 text-4xl animate-pulse">🔶</div>
      </div>

      <div className="flex items-center justify-center h-full p-8">
        <div className="max-w-4xl w-full">
          <div className="bg-black bg-opacity-70 rounded-2xl p-8 border border-green-400">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">💎 Geometric Portal Defense</h2>
            
            {gameData?.currentShape && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Shape Display */}
                <div className="flex items-center justify-center">
                  <div className="bg-gray-800 rounded-lg p-8 w-64 h-64 flex items-center justify-center">
                    {renderShape(gameData.currentShape)}
                  </div>
                </div>

                {/* Question and Options */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl text-white mb-6">{gameData.currentShape.question}</h3>
                  <div className="space-y-3">
                    {gameData.currentShape.options.map((option: string) => (
                      <button
                        key={option}
                        onClick={() => handleAnswerSelect(option)}
                        disabled={!!selectedAnswer}
                        className={`w-full p-3 rounded-lg text-left transition-all duration-300 transform hover:scale-105 ${
                          selectedAnswer === option
                            ? option === gameData.currentShape.answer
                              ? 'bg-green-600 text-white scale-105'
                              : 'bg-red-600 text-white scale-95'
                            : 'bg-gray-700 text-white hover:bg-gray-600'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Stats Display */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div className="bg-green-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-green-300 font-bold">Portals Sealed</div>
                <div className="text-white text-lg">{gameData?.portalsSealed || 0}</div>
              </div>
              <div className="bg-blue-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-blue-300 font-bold">Progress</div>
                <div className="text-white text-lg">{gameData?.questionsCompleted || 0}/10</div>
              </div>
              <div className="bg-purple-900 bg-opacity-50 rounded-lg p-3">
                <div className="text-purple-300 font-bold">Combo</div>
                <div className="text-white text-lg">{gameData?.combo || 0}x</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center text-white">
        <p className="text-lg font-semibold">💎 Calculate geometry to seal dimensional rifts!</p>
        <p className="text-sm text-green-300">Perfect accuracy unlocks special powers!</p>
      </div>
    </div>
  );
};

const GenericGameDemo = ({ game, onAction }: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        if (newProgress >= 100) {
          onAction('complete');
          return 100;
        }
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onAction]);

  return (
    <div className="h-full bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center">
      <div className="text-center bg-black bg-opacity-70 rounded-2xl p-8 max-w-md">
        <h2 className="text-3xl font-bold text-white mb-6">{game.name}</h2>
        <p className="text-gray-300 mb-8">{game.description}</p>
        
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-white text-lg">
          Progress: {progress}%
        </p>
        
        <div className="mt-6">
          <p className="text-yellow-300 animate-pulse">🎮 Demo Mode Active</p>
        </div>
      </div>
    </div>
  );
};

// Demo wrapper with sample data
const GameDemo = () => {
  const [currentGame, setCurrentGame] = useState('numeric-ninja');
  
  const sampleHero: Hero = {
  name: "Alex the Adventurer",
  level: 5,
  id: "hero-1",
  archetype: "warrior",
  stats: {
    strength: 10,
    intelligence: 8,
    confidence: 7
  }as any,
  appearance: {
    hair: "brown",
    eyes: "blue"
  }as any,
}as any;

const sampleAcademy: Academy = {
  name: "Mystic Learning Academy",
  statType: "intelligence"
} as any;
  
  const games: AcademyGame[] = [
  {
    id: 'numeric-ninja',
    name: 'Numeric Ninja',
    description: 'Master mathematics through ninja combat!',
    statReward: 15,
    icon: '',
    difficulty: 'Beginner',
    gameType: 'action',
    unlocked: false,
    bestScore: 0,
    timesPlayed: 0,
    mechanics: {
      controls: ['mouse', 'touch'],
      objectives: ['slice-target-numbers', 'maintain-combo', 'complete-sequences'],
      powerUps: ['golden-numbers', 'combo-multiplier', 'time-bonus'],
      enemies: ['wrong-numbers', 'distractors'],
      timeLimit: 300,
      multiplayer: false
    }
  },
  {
    id: 'algebra-adventure',
    name: 'Algebraic Arsenal',
    description: 'Solve equations to charge weapons!',
    statReward: 12,
    icon: '',
    difficulty: 'Beginner',
    gameType: 'action',
    unlocked: false,
    bestScore: 0,
    timesPlayed: 0,
    mechanics: {
      controls: ['keyboard', 'mouse'],
      objectives: ['solve-equations', 'charge-weapons', 'defeat-enemies'],
      powerUps: ['weapon-boost', 'hint-crystal', 'equation-simplifier'],
      enemies: ['math-monsters', 'equation-blockers'],
      timeLimit: 600,
      multiplayer: false
    }
  },
  {
    id: 'geometry-gems',
    name: 'Geometric Portal Defense',
    description: 'Use geometry to seal dimensional rifts!',
    statReward: 18,
    icon: '',
    difficulty: 'Beginner',
    gameType: 'action',
    unlocked: false,
    bestScore: 0,
    timesPlayed: 0,
    mechanics: {
      controls: ['mouse', 'keyboard'],
      objectives: ['calculate-areas', 'seal-portals', 'defend-realm'],
      powerUps: ['geometry-compass', 'formula-book', 'precision-boost'],
      enemies: ['dimensional-rifts', 'chaos-shapes'],
      timeLimit: 480,
      multiplayer: false
    }
  }
];
  
  const currentGameData = games.find(g => g.id === currentGame) || games[0];
  
  return (
    <div className="min-h-screen">
      <div className="fixed top-4 left-4 z-50 bg-black bg-opacity-70 rounded-lg p-3">
        <h3 className="text-white font-bold mb-2">🎮 Game Selection</h3>
        <div className="space-y-2">
          {games.map(game => (
            <button
              key={game.id}
              onClick={() => setCurrentGame(game.id)}
              className={`block w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                currentGame === game.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {game.name}
            </button>
          ))}
        </div>
      </div>
      
      <GameInterface
        hero={sampleHero}
        academy={sampleAcademy}
        game={currentGameData}
        onGameComplete={(session) => {
          console.log('Game completed:', session);
          alert(`🎉 Game completed! Score: ${session.score}`);
        }}
        onBackToAcademy={() => {
          console.log('Back to academy');
          alert('🏠 Returning to academy...');
        }}
      />
    </div>
  );
};

export { GameDemo };