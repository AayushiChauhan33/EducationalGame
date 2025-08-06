import React, { useState, useEffect, useRef } from 'react';
import { Clock, Users, Target, Award, Play, Lock, Pause, RotateCcw, Home, Trophy, Star, Zap, CheckCircle } from 'lucide-react';
interface ScienceGamesMenuProps {
  onBack: () => void;
}
interface GameData {
  components?: any[];
  circuitPower?: number;
  completedCircuits?: number;
  questionsCompleted?: number;
  musicNotes?: string[];
  lightShow?: any[];
  score?: number;
  timeRemaining?: number;
  gameState?: 'playing' | 'paused' | 'won' | 'lost' | 'completed';
  objectives?: { id: string; description: string; completed: boolean; }[];
}

interface ScienceGameProps {
  gameData: GameData;
  onAction: (action: string, data?: any) => void;
}

interface GameProgress {
  [gameId: string]: {
    completed: boolean;
    bestScore: number;
    timesPlayed: number;
    bestTime: number;
  };
}

const CircuitSymphonyGame = ({ onAction }: ScienceGameProps) => {
  const [draggedComponent, setDraggedComponent] = useState<any>(null);
  const [placedComponents, setPlacedComponents] = useState<any[]>([]);
  const [connections, setConnections] = useState<any[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(150);
  const [gameState, setGameState] = useState<'playing' | 'paused' | 'won' | 'lost'>('playing');
  const [completedCircuits, setCompletedCircuits] = useState<any[]>([]);
  const [objectives, setObjectives] = useState([
    { id: 'circuit1', description: 'Create a basic LED circuit (Battery + LED + Wire)', completed: false },
    { id: 'circuit2', description: 'Build a controlled circuit (Add Switch)', completed: false },
    { id: 'circuit3', description: 'Complete advanced circuit (Add Resistor for safety)', completed: false }
  ]);
  const [showResults, setShowResults] = useState(false);
  
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  const defaultComponents = [
    { id: 'battery', name: 'Battery', icon: '🔋', type: 'power', color: '#fbbf24' },
    { id: 'resistor', name: 'Resistor', icon: '⚡', type: 'resistor', color: '#84cc16' },
    { id: 'led', name: 'LED', icon: '💡', type: 'output', color: '#f87171' },
    { id: 'wire', name: 'Wire', icon: '━', type: 'connector', color: '#60a5fa' },
    { id: 'switch', name: 'Switch', icon: '🔘', type: 'control', color: '#a78bfa' }
  ];

  // Timer logic
  useEffect(() => {
    if (gameState === 'playing' && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            setGameState('lost');
            setShowResults(true);
            return 0;
          }
          return prev - 1;
        });
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
  }, [gameState, timeRemaining]);

  // Check for game completion
  useEffect(() => {
    const completedObjectives = objectives.filter(obj => obj.completed).length;
    if (completedObjectives >= 3 && gameState === 'playing') {
      setGameState('won');
      const finalScore = calculateFinalScore();
      setScore(finalScore);
      setTimeout(() => setShowResults(true), 1000);
    }
  }, [objectives, gameState]);

  const calculateFinalScore = () => {
    const baseScore = completedCircuits.length * 100;
    const timeBonus = timeRemaining * 2;
    const complexityBonus = placedComponents.length * 10;
    const connectionBonus = connections.length * 15;
    return baseScore + timeBonus + complexityBonus + connectionBonus;
  };

  // Enhanced circuit validation with proper electrical logic
  const validateCircuit = (newConnections: any[]) => {
    if (newConnections.length < 2) return { isValid: false, type: null };

    // Get all connected components
    const connectedComponents = new Set();
    newConnections.forEach(conn => {
      connectedComponents.add(conn.from.id);
      connectedComponents.add(conn.to.id);
    });

    // Check what types of components are connected
    const connectedTypes = new Set();
    placedComponents.forEach(comp => {
      if (connectedComponents.has(comp.id)) {
        connectedTypes.add(comp.type);
      }
    });

    const hasPower = connectedTypes.has('power');
    const hasOutput = connectedTypes.has('output');
    const hasControl = connectedTypes.has('control');
    const hasResistor = connectedTypes.has('resistor');

    // Circuit validation logic
    if (hasPower && hasOutput && newConnections.length >= 2) {
      if (hasControl && hasResistor) {
        return { isValid: true, type: 'advanced' }; // All components
      } else if (hasControl || hasResistor) {
        return { isValid: true, type: 'controlled' }; // Has switch or resistor
      } else {
        return { isValid: true, type: 'basic' }; // Basic LED circuit
      }
    }

    return { isValid: false, type: null };
  };

  const handleDragStart = (e: React.DragEvent, component: any) => {
    if (gameState !== 'playing') return;
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedComponent && gameAreaRef.current && gameState === 'playing') {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Ensure component is dropped within bounds
      if (x > 30 && x < rect.width - 30 && y > 30 && y < rect.height - 30) {
        const newComponent = {
          ...draggedComponent,
          position: { x, y },
          id: `${draggedComponent.id}-${Date.now()}`,
          placed: true
        };
        
        setPlacedComponents(prev => [...prev, newComponent]);
        setScore(prev => prev + 5); // Small points for placing components
      }
      setDraggedComponent(null);
    }
  };

  const connectComponents = (comp1: any, comp2: any) => {
    if (gameState !== 'playing') return;
    
    const connectionId = `${comp1.id}-${comp2.id}`;
    const reverseConnectionId = `${comp2.id}-${comp1.id}`;
    
    // Check if connection already exists
    if (connections.find(conn => conn.id === connectionId || conn.id === reverseConnectionId)) {
      return;
    }
    
    const newConnection = {
      id: connectionId,
      from: comp1,
      to: comp2,
      active: true
    };
    
    const newConnections = [...connections, newConnection];
    setConnections(newConnections);
    
    // Add small score for making connections
    setScore(prev => prev + 10);
    
    // Validate circuit after each connection
    const validation = validateCircuit(newConnections);
    
    if (validation.isValid) {
      const circuitId = `circuit-${Date.now()}`;
      const newCircuit = {
        id: circuitId,
        type: validation.type,
        components: [...placedComponents],
        connections: [...newConnections],
        completedAt: Date.now()
      };
      
      setCompletedCircuits(prev => {
        const updated = [...prev, newCircuit];
        
        // Update objectives based on circuit type
        setObjectives(prevObjectives => 
          prevObjectives.map(obj => {
            if (obj.id === 'circuit1' && validation.type === 'basic' && !obj.completed) {
              return { ...obj, completed: true };
            }
            if (obj.id === 'circuit2' && validation.type === 'controlled' && !obj.completed) {
              return { ...obj, completed: true };
            }
            if (obj.id === 'circuit3' && validation.type === 'advanced' && !obj.completed) {
              return { ...obj, completed: true };
            }
            return obj;
          })
        );
        
        // Add substantial score bonus based on circuit type
        let bonus = 100;
        if (validation.type === 'controlled') bonus = 150;
        if (validation.type === 'advanced') bonus = 200;
        
        setScore(prevScore => prevScore + bonus + (timeRemaining));
        
        // Create celebration effect
        createCelebrationEffect(comp1.position, validation.type!);
        
        return updated;
      });
      
      // Clear the board for next circuit after a delay
      setTimeout(() => {
        setPlacedComponents([]);
        setConnections([]);
        setSelectedComponent(null);
      }, 3000);
    }
  };

  const createCelebrationEffect = (position: { x: number; y: number }, circuitType: string) => {
    if (!gameAreaRef.current) return;
    
    // Create celebration particles
    const colors = circuitType === 'advanced' ? ['#fbbf24', '#f87171', '#84cc16'] : 
                   circuitType === 'controlled' ? ['#60a5fa', '#a78bfa'] : ['#fbbf24'];
    
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute w-4 h-4 rounded-full animate-ping pointer-events-none';
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      particle.style.left = `${position.x + (Math.random() - 0.5) * 150}px`;
      particle.style.top = `${position.y + (Math.random() - 0.5) * 150}px`;
      particle.style.zIndex = '1000';
      particle.style.animationDuration = `${0.5 + Math.random() * 1}s`;
      
      gameAreaRef.current.appendChild(particle);
      setTimeout(() => {
        if (gameAreaRef.current && gameAreaRef.current.contains(particle)) {
          gameAreaRef.current.removeChild(particle);
        }
      }, 1500);
    }

    // Show circuit completion message
    const message = document.createElement('div');
    message.className = 'absolute bg-green-600 text-white px-4 py-2 rounded-lg font-bold text-lg animate-bounce pointer-events-none';
    message.textContent = `${circuitType.toUpperCase()} CIRCUIT COMPLETE! 🎉`;
    message.style.left = `${position.x - 100}px`;
    message.style.top = `${position.y - 50}px`;
    message.style.zIndex = '1001';
    
    gameAreaRef.current.appendChild(message);
    setTimeout(() => {
      if (gameAreaRef.current && gameAreaRef.current.contains(message)) {
        gameAreaRef.current.removeChild(message);
      }
    }, 3000);
  };

  const handleComponentClick = (component: any) => {
    if (gameState !== 'playing') return;
    
    if (selectedComponent && selectedComponent.id !== component.id) {
      connectComponents(selectedComponent, component);
      setSelectedComponent(null);
    } else {
      setSelectedComponent(component);
    }
  };

  const pauseGame = () => {
    setGameState(gameState === 'paused' ? 'playing' : 'paused');
  };

  const restartGame = () => {
    setPlacedComponents([]);
    setConnections([]);
    setSelectedComponent(null);
    setScore(0);
    setTimeRemaining(150);
    setCompletedCircuits([]);
    setObjectives([
      { id: 'circuit1', description: 'Create a basic LED circuit (Battery + LED + Wire)', completed: false },
      { id: 'circuit2', description: 'Build a controlled circuit (Add Switch)', completed: false },
      { id: 'circuit3', description: 'Complete advanced circuit (Add Resistor for safety)', completed: false }
    ]);
    setGameState('playing');
    setShowResults(false);
  };

  const quitGame = () => {
    const gameData = {
      score: calculateFinalScore(),
      timeRemaining,
      completed: gameState === 'won'
    };
    onAction('quit-game', gameData);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Results Screen
  if (showResults) {
    const finalScore = calculateFinalScore();
    return (
      <div className="h-full bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="max-w-2xl mx-auto p-8">
          <div className="bg-black bg-opacity-90 rounded-2xl p-8 border-2 border-yellow-400 text-center">
            <div className="text-8xl mb-4">
              {gameState === 'won' ? '🏆' : '⏰'}
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              {gameState === 'won' ? 'Circuit Master!' : 'Time\'s Up!'}
            </h1>
            <h2 className="text-2xl text-yellow-400 mb-6">
              {gameState === 'won' ? 'All circuits completed successfully!' : 'Keep practicing to master circuits!'}
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-900 bg-opacity-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-blue-400">{finalScore}</div>
                <div className="text-sm text-gray-300">Final Score</div>
              </div>
              <div className="bg-green-900 bg-opacity-50 rounded-lg p-6">
                <div className="text-4xl font-bold text-green-400">{completedCircuits.length}/3</div>
                <div className="text-sm text-gray-300">Circuits Built</div>
              </div>
            </div>

            <div className="space-y-2 mb-8 text-left bg-gray-900 rounded-lg p-4">
              <h3 className="text-white font-bold mb-3 text-center">Score Breakdown</h3>
              <div className="flex justify-between text-yellow-400">
                <span>Completed Circuits ({completedCircuits.length} × 100):</span>
                <span>{completedCircuits.length * 100}</span>
              </div>
              <div className="flex justify-between text-blue-400">
                <span>Time Bonus ({timeRemaining} × 2):</span>
                <span>{timeRemaining * 2}</span>
              </div>
              <div className="flex justify-between text-purple-400">
                <span>Components Used ({placedComponents.length} × 10):</span>
                <span>{placedComponents.length * 10}</span>
              </div>
              <div className="flex justify-between text-green-400">
                <span>Connections Made ({connections.length} × 15):</span>
                <span>{connections.length * 15}</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-white font-bold text-lg">
                <span>Total Score:</span>
                <span>{finalScore}</span>
              </div>
            </div>

            <div className="flex space-x-4 justify-center">
              <button
                onClick={restartGame}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 font-semibold"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Play Again</span>
              </button>
              <button
                onClick={quitGame}
                className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2 font-semibold"
              >
                <Home className="w-6 h-6" />
                <span>Back to Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Pause Screen
  if (gameState === 'paused') {
    return (
      <div className="h-full bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 relative">
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-90 rounded-2xl p-8 border-2 border-blue-400 text-center">
            <Pause className="w-20 h-20 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-8">Game Paused</h2>
            <div className="flex space-x-4">
              <button
                onClick={pauseGame}
                className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Resume Game
              </button>
              <button
                onClick={restartGame}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Restart
              </button>
              <button
                onClick={quitGame}
                className="px-8 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Quit to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-gray-900 via-blue-900 to-purple-900 relative">
      {/* Game HUD */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-80 border-b-2 border-blue-500">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h2 className="text-2xl font-bold text-white">🎵 Circuit Symphony</h2>
              <div className="flex items-center space-x-2 bg-blue-900 px-3 py-1 rounded-lg">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className={`text-white font-bold text-lg ${timeRemaining < 30 ? 'text-red-400 animate-pulse' : ''}`}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 bg-yellow-900 px-3 py-1 rounded-lg">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-bold text-lg">{score}</span>
              </div>
              <div className="flex items-center space-x-2 bg-green-900 px-3 py-1 rounded-lg">
                <Target className="w-5 h-5 text-green-400" />
                <span className="text-white font-bold text-lg">{completedCircuits.length}/3</span>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={pauseGame}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Pause className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={quitGame}
                className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Home className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="pt-24 h-full flex">
        {/* Component Palette */}
        <div className="w-1/3 p-6 bg-black bg-opacity-40 border-r-2 border-gray-600">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🔧 Components</h3>
          
          <div className="space-y-4 mb-6">
            {defaultComponents.map((component: any) => (
              <div
                key={component.id}
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                className="bg-gray-800 rounded-xl p-4 border-2 border-blue-400 cursor-grab hover:bg-gray-700 hover:border-blue-300 transition-all active:cursor-grabbing transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{component.icon}</span>
                  <div>
                    <h4 className="text-white font-bold">{component.name}</h4>
                    <p className="text-gray-400 text-sm">Drag to circuit board</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Objectives */}
          <div className="bg-gray-900 rounded-xl p-6 mb-6 border border-gray-600">
            <h4 className="text-white font-bold mb-4 flex items-center text-lg">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              Mission Objectives
            </h4>
            <div className="space-y-3">
              {objectives.map((objective) => (
                <div key={objective.id} className="flex items-start space-x-3">
                  <CheckCircle className={`w-5 h-5 mt-0.5 ${objective.completed ? 'text-green-400' : 'text-gray-500'}`} />
                  <span className={`text-sm ${objective.completed ? 'text-green-300 line-through' : 'text-gray-300'}`}>
                    {objective.description}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Score Display */}
          <div className="bg-gray-900 rounded-xl p-6 border border-gray-600">
            <h4 className="text-white font-bold mb-3 flex items-center text-lg">
              <Trophy className="w-5 h-5 mr-2 text-yellow-400" />
              Score
            </h4>
            <div className="text-3xl font-bold text-yellow-400 mb-2">{score}</div>
            <div className="space-y-1 text-xs text-gray-400">
              <div>Circuits: +{completedCircuits.length * 100}</div>
              <div>Components: +{placedComponents.length * 10}</div>
              <div>Connections: +{connections.length * 15}</div>
            </div>
          </div>
        </div>

        {/* Circuit Board */}
        <div className="flex-1 p-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">🔌 Circuit Construction Board</h3>
          
          <div 
            ref={gameAreaRef}
            className="w-full h-5/6 bg-green-900 bg-opacity-20 border-4 border-dashed border-green-400 rounded-2xl relative overflow-hidden"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-30">
              {Array.from({ length: 25 }).map((_, i) => (
                <div key={`v-${i}`} className="absolute border-l border-gray-500" style={{ left: `${i * 4}%`, height: '100%' }} />
              ))}
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={`h-${i}`} className="absolute border-t border-gray-500" style={{ top: `${i * 5}%`, width: '100%' }} />
              ))}
            </div>

            {/* Placed Components */}
            {placedComponents.map((component) => (
              <div
                key={component.id}
                className={`absolute rounded-xl p-3 border-2 cursor-pointer transition-all duration-200 transform hover:scale-110 ${
                  selectedComponent?.id === component.id 
                    ? 'border-yellow-400 bg-yellow-900 shadow-lg shadow-yellow-400/50' 
                    : 'border-blue-400 bg-gray-800 hover:border-blue-300'
                }`}
                style={{ 
                  left: component.position.x - 40, 
                  top: component.position.y - 40,
                  width: '80px',
                  height: '80px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: selectedComponent?.id === component.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(31, 41, 55, 0.9)'
                }}
                onClick={() => handleComponentClick(component)}
              >
                <span className="text-3xl">{component.icon}</span>
              </div>
            ))}

            {/* Connections */}
            <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              {connections.map((connection) => (
                <g key={connection.id}>
                  <line
                    x1={connection.from.position.x}
                    y1={connection.from.position.y}
                    x2={connection.to.position.x}
                    y2={connection.to.position.y}
                    stroke={connection.active ? '#fbbf24' : '#6b7280'}
                    strokeWidth="6"
                    className={connection.active ? 'animate-pulse' : ''}
                  />
                  {/* Connection points */}
                  <circle
                    cx={connection.from.position.x}
                    cy={connection.from.position.y}
                    r="6"
                    fill="#fbbf24"
                    className="animate-pulse"
                  />
                  <circle
                    cx={connection.to.position.x}
                    cy={connection.to.position.y}
                    r="6"
                    fill="#fbbf24"
                    className="animate-pulse"
                  />
                </g>
              ))}
            </svg>

            {/* Instructions */}
            {placedComponents.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-black bg-opacity-70 rounded-2xl p-8 border border-blue-400">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-white text-2xl font-bold mb-2">Start Building!</p>
                  <p className="text-gray-300 text-lg mb-4">Drag components from the left panel</p>
                  <p className="text-cyan-300 text-sm">Click components to connect them</p>
                  <div className="mt-4 text-yellow-300 text-sm">
                    <p>💡 Basic Circuit: Battery + LED + connections</p>
                    <p>⚡ Advanced: Add Switch and Resistor!</p>
                  </div>
                </div>
              </div>
            )}

            {/* Circuit Completion Effects */}
            {completedCircuits.map((circuit, index) => (
              <div
                key={circuit.id}
                className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold animate-bounce border-2 border-green-400"
                style={{ top: `${20 + index * 50}px` }}
              >
                ✨ {circuit.type.toUpperCase()} Circuit Complete!
              </div>
            ))}
          </div>

          <div className="mt-6 text-center text-white">
            <p className="text-lg font-semibold">
              {selectedComponent ? 
                `🎯 Selected: ${selectedComponent.name} - Click another component to connect!` : 
                '👆 Click components to select and connect them'
              }
            </p>
            <p className="text-sm text-cyan-300 mt-2">
              🔌 Build circuits: Battery → LED (basic) → Add Switch/Resistor (advanced)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ScienceGamesMenu = ({ onBack }: ScienceGamesMenuProps) => {
  const [selectedGame, setSelectedGame] = useState<string>('');
  const [gameData, setGameData] = useState<GameData>({});
  const [gameProgress, setGameProgress] = useState<GameProgress>({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('scienceGameProgress');
    if (savedProgress) {
      try {
        setGameProgress(JSON.parse(savedProgress));
      } catch (error) {
        console.error('Failed to load game progress:', error);
        // Initialize with empty progress if loading fails
        setGameProgress({});
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = (gameId: string, data: any) => {
    const currentProgress = gameProgress[gameId] || { completed: false, bestScore: 0, timesPlayed: 0, bestTime: 0 };
    
    const updatedProgress = {
      ...gameProgress,
      [gameId]: {
        completed: data.completed || currentProgress.completed,
        bestScore: Math.max(currentProgress.bestScore, data.score || 0),
        timesPlayed: currentProgress.timesPlayed + 1,
        bestTime: data.timeRemaining ? Math.max(currentProgress.bestTime, data.timeRemaining) : currentProgress.bestTime
      }
    };
    
    setGameProgress(updatedProgress);
    localStorage.setItem('scienceGameProgress', JSON.stringify(updatedProgress));
  };

  const games = [
    {
      id: 'circuit-symphony',
      title: 'Circuit Symphony',
      icon: '🎵',
      description: 'Build electrical circuits with musical harmony',
      difficulty: 'Beginner',
      difficultyColor: 'bg-green-600',
      bestScore: gameProgress['circuit-symphony']?.bestScore || 0,
      timesPlayed: gameProgress['circuit-symphony']?.timesPlayed || 0,
      statReward: 10,
      duration: '150s',
      objectives: 3,
      unlocked: true,
      gradient: 'from-purple-600 to-blue-600',
      unlockRequirement: null
    },
    {
      id: 'chemistry-lab',
      title: 'Chemical Chaos Lab',
      icon: '🧪',
      description: 'Mix elements to solve environmental disasters',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-orange-600',
      bestScore: gameProgress['chemistry-lab']?.bestScore || 0,
      timesPlayed: gameProgress['chemistry-lab']?.timesPlayed || 0,
      statReward: 12,
      duration: '200s',
      objectives: 3,
      unlocked: (gameProgress['circuit-symphony']?.bestScore || 0) >= 200,
      multiplayer: true,
      gradient: 'from-green-600 to-teal-600',
      unlockRequirement: 'Score 200+ in Circuit Symphony'
    },
    {
      id: 'physics-flight',
      title: 'Physics Flight School',
      icon: '🚀',
      description: 'Navigate using physics calculations',
      difficulty: 'Advanced',
      difficultyColor: 'bg-red-600',
      bestScore: gameProgress['physics-flight']?.bestScore || 0,
      timesPlayed: gameProgress['physics-flight']?.timesPlayed || 0,
      statReward: 15,
      duration: '180s',
      objectives: 3,
      unlocked: (gameProgress['chemistry-lab']?.bestScore || 0) >= 300,
      gradient: 'from-blue-600 to-purple-600',
      unlockRequirement: 'Score 300+ in Chemical Chaos Lab'
    },
    {
      id: 'microscopic-mission',
      title: 'Microscopic Mission',
      icon: '🔬',
      description: 'Explore cellular environments and fight disease',
      difficulty: 'Intermediate',
      difficultyColor: 'bg-orange-600',
      bestScore: gameProgress['microscopic-mission']?.bestScore || 0,
      timesPlayed: gameProgress['microscopic-mission']?.timesPlayed || 0,
      statReward: 11,
      duration: '240s',
      objectives: 3,
      unlocked: (gameProgress['circuit-symphony']?.bestScore || 0) >= 150,
      gradient: 'from-indigo-600 to-purple-600',
      unlockRequirement: 'Score 150+ in Circuit Symphony'
    },
    {
      id: 'engineering-emergency',
      title: 'Engineering Emergency',
      icon: '🏗️',
      description: 'Design structures to solve crisis scenarios',
      difficulty: 'Expert',
      difficultyColor: 'bg-purple-600',
      bestScore: gameProgress['engineering-emergency']?.bestScore || 0,
      timesPlayed: gameProgress['engineering-emergency']?.timesPlayed || 0,
      statReward: 18,
      duration: '300s',
      objectives: 3,
      unlocked: (gameProgress['physics-flight']?.bestScore || 0) >= 400 && (gameProgress['microscopic-mission']?.bestScore || 0) >= 250,
      multiplayer: true,
      gradient: 'from-red-600 to-pink-600',
      unlockRequirement: 'Score 400+ in Physics Flight AND 250+ in Microscopic Mission'
    }
  ];

  const handleGameSelect = (gameId: string) => {
    const game = games.find(g => g.id === gameId);
    if (game && game.unlocked) {
      setSelectedGame(gameId);
      setGameData({
        score: 0,
        timeRemaining: parseInt(game.duration),
        gameState: 'playing',
        completedCircuits: 0,
        questionsCompleted: 0
      });
    }
  };

  const handleGameAction = (action: string, data?: any) => {
    if (action === 'quit-game') {
      // Save progress
      if (selectedGame && data) {
        saveProgress(selectedGame, data);
      }
      
      // Return to menu
      setSelectedGame('');
      setGameData({});
    }
  };

  const handleBackToMenu = () => {
    setSelectedGame('');
    setGameData({});
  };

  // Render specific game
  if (selectedGame === 'circuit-symphony') {
    return (
      <div className="h-screen bg-gray-900 relative">
        <CircuitSymphonyGame gameData={gameData} onAction={handleGameAction} />
      </div>
    );
  }

  // Render other games as coming soon
  if (selectedGame && selectedGame !== 'circuit-symphony') {
    return (
      <div className="h-screen bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center bg-black bg-opacity-80 rounded-2xl p-8 border-2 border-blue-400 max-w-md mx-auto">
          <div className="text-8xl mb-6">🚧</div>
          <h2 className="text-4xl font-bold text-white mb-4">Coming Soon!</h2>
          <p className="text-gray-300 text-lg mb-6">
            {games.find(g => g.id === selectedGame)?.title} is under development
          </p>
          <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4 mb-6">
            <p className="text-blue-300 text-sm">
              🔧 This game is being crafted with amazing features and will be available in a future update!
            </p>
          </div>
          <button
            onClick={handleBackToMenu}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            ← Back to Menu
          </button>
        </div>
      </div>
    );
  }

  // Main menu
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <button 
      onClick={onBack} 
      className="mb-4 px-4 py-2 bg-black bg-opacity-70 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center space-x-2"
      >
        <span>←</span>
        <span>Back to Academy</span>
      </button>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">🧬 Science Games Platform</h1>
          <p className="text-gray-300 text-xl">Learn science through interactive gaming experiences</p>
          <div className="mt-4 bg-blue-900 bg-opacity-30 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-blue-300">🎮 Master each game to unlock the next challenge!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((game) => (
            <div
              key={game.id}
              className={`relative bg-gradient-to-br ${game.gradient} rounded-2xl p-6 border-2 border-gray-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                game.unlocked ? 'cursor-pointer hover:border-blue-400' : 'opacity-60'
              }`}
              onClick={() => handleGameSelect(game.id)}
            >
              {!game.unlocked && (
                <div className="absolute top-4 right-4 bg-red-600 rounded-full p-2">
                  <Lock className="w-6 h-6 text-white" />
                </div>
              )}

              {game.unlocked && gameProgress[game.id]?.completed && (
                <div className="absolute top-4 right-4 bg-green-600 rounded-full p-2">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}

              <div className="flex items-center mb-6">
                <span className="text-5xl mr-4">{game.icon}</span>
                <div>
                  <h3 className="text-2xl font-bold text-white">{game.title}</h3>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm text-white font-semibold ${game.difficultyColor}`}>
                    {game.difficulty}
                  </span>
                </div>
              </div>

              <p className="text-gray-200 text-base mb-8">{game.description}</p>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-yellow-400">{game.bestScore}</div>
                    <div className="text-sm text-gray-300">Best Score</div>
                  </div>
                  <div className="bg-black bg-opacity-30 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-400">{game.timesPlayed}</div>
                    <div className="text-sm text-gray-300">Times Played</div>
                  </div>
                </div>

                <div className="space-y-3 text-gray-300 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="w-4 h-4 mr-2" />
                      <span>Stat Reward</span>
                    </div>
                    <span className="font-semibold">+{game.statReward}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Duration</span>
                    </div>
                    <span className="font-semibold">{game.duration}</span>
                  </div>
                  
                  {game.multiplayer && (
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-purple-300">Multiplayer Available</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      <span>Objectives</span>
                    </div>
                    <span className="font-semibold">{game.objectives}</span>
                  </div>
                </div>

                {/* Unlock Requirements */}
                {!game.unlocked && game.unlockRequirement && (
                  <div className="bg-red-900 bg-opacity-40 rounded-lg p-4 border border-red-600">
                    <div className="text-red-300 text-sm font-semibold mb-2 flex items-center">
                      <Lock className="w-4 h-4 mr-2" />
                      Unlock Requirement:
                    </div>
                    <div className="text-red-200 text-sm">{game.unlockRequirement}</div>
                  </div>
                )}

                <div className="mt-8">
                  {game.unlocked ? (
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors flex items-center justify-center text-lg">
                      <Play className="w-6 h-6 mr-2" />
                      {game.timesPlayed > 0 ? 'Play Again' : 'Start Game'}
                    </button>
                  ) : (
                    <button className="w-full bg-gray-600 text-gray-400 font-bold py-4 px-6 rounded-lg cursor-not-allowed">
                      🔒 Complete requirements to unlock
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-black bg-opacity-60 rounded-2xl p-8 border-2 border-blue-500">
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
            Your Scientific Journey
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center bg-green-900 bg-opacity-40 rounded-lg p-6">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {games.filter(g => g.unlocked).length}/{games.length}
              </div>
              <div className="text-gray-300 font-semibold">Games Unlocked</div>
            </div>
            
            <div className="text-center bg-blue-900 bg-opacity-40 rounded-lg p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                {Object.values(gameProgress).reduce((sum, progress) => sum + progress.bestScore, 0)}
              </div>
              <div className="text-gray-300 font-semibold">Total Score</div>
            </div>
            
            <div className="text-center bg-purple-900 bg-opacity-40 rounded-lg p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {Object.values(gameProgress).filter(progress => progress.completed).length}
              </div>
              <div className="text-gray-300 font-semibold">Games Mastered</div>
            </div>

            <div className="text-center bg-yellow-900 bg-opacity-40 rounded-lg p-6">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                {Object.values(gameProgress).reduce((sum, progress) => sum + progress.timesPlayed, 0)}
              </div>
              <div className="text-gray-300 font-semibold">Total Plays</div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 text-lg">
              🎯 Master each game with high scores to unlock the next scientific challenge!
            </p>
            <div className="mt-4 flex justify-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-600 rounded-full mr-2"></div>
                <span>Unlocked & Available</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-600 rounded-full mr-2"></div>
                <span>Locked - Complete Requirements</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                <span>Completed & Mastered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceGamesMenu;