import MathGameHub from './MathGameLogic';
import EnglishGamesSystem from './EnglishGameLogic';
import ScienceGamesMenu from './ScienceGameLogic';

import { useState } from 'react';
import { Hero } from '../types';
import { Academy, AcademyGame } from '../types/academy';
import { academies } from '../data/academyData';
import { 
  GraduationCap, 
  Trophy, 
  Star, 
  Lock, 
  Play, 
  Zap,
  Brain,
  Heart,
  ChevronRight} from 'lucide-react';

interface AcademyHubProps {
  hero: Hero;
  onGameSelect: (academy: Academy, game: AcademyGame) => void;
  onBackToHQ: () => void;
}

export default function AcademyHub({ hero, onGameSelect, onBackToHQ }: AcademyHubProps) {
  const [currentGame, setCurrentGame] = useState<{academy: Academy, game: AcademyGame} | null>(null);
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);

  const StatIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'strength': return <Zap className="w-5 h-5 text-red-400" />;
      case 'intelligence': return <Brain className="w-5 h-5 text-blue-400" />;
      case 'confidence': return <Heart className="w-5 h-5 text-purple-400" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
    const colors = {
      'Beginner': 'bg-green-600 text-white',
      'Intermediate': 'bg-yellow-600 text-white',
      'Advanced': 'bg-orange-600 text-white',
      'Expert': 'bg-red-600 text-white'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${colors[difficulty as keyof typeof colors] || 'bg-gray-600 text-white'}`}>
        {difficulty}
      </span>
    );
  };

  const GameTypeIcon = ({ type }: { type: string }) => {
    const icons = {
      'action': '⚡',
      'puzzle': '🧩',
      'strategy': '🎯',
      'adventure': '🗺️',
      'rhythm': '🎵'
    };
    return <span className="text-lg">{icons[type as keyof typeof icons] || '🎮'}</span>;
  };

  // Handle direct navigation to games
  const handleEnterAcademy = (academy: Academy) => {
    if (academy.statType === 'strength') {
      setCurrentGame({academy, game: academy.games[0]}); // Set dummy game for Math
    } else if (academy.statType === 'intelligence') {
      setCurrentGame({academy, game: academy.games[0]}); // Set dummy game for English
    } else if (academy.statType === 'confidence') {
      setCurrentGame({academy, game: academy.games[0]}); // Set dummy game for Science
    }
  };

  // Render games if currentGame is set
  if (currentGame) {
    const handleBackToAcademy = () => {
      setCurrentGame(null);
    };

    // Render the appropriate game based on academy type
    if (currentGame.academy.statType === 'strength') {
      return <MathGameHub onBack={handleBackToAcademy} />;
    }
    if (currentGame.academy.statType === 'confidence') {
      return <EnglishGamesSystem onBack={handleBackToAcademy} />;
    }
    if (currentGame.academy.statType === 'intelligence') {
      return <ScienceGamesMenu onBack={handleBackToAcademy} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <div className="bg-black bg-opacity-40 border-b border-blue-500">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHQ}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6 text-white rotate-180" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3" />
                  Training Academies
                </h1>
                <p className="text-blue-300">Choose your path to power enhancement</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-yellow-400 font-semibold">Hero Level</div>
                <div className="text-white">{hero.level}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academy Selection */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {academies.map((academy) => (
            <div
              key={academy.id}
              className={`bg-black bg-opacity-50 rounded-xl p-8 border-2 cursor-pointer transition-all duration-300 hover:shadow-2xl ${
                academy.unlocked 
                  ? 'border-gray-600 hover:border-yellow-400 hover:shadow-yellow-400/20' 
                  : 'border-gray-800 opacity-60'
              }`}
              onClick={() => academy.unlocked && handleEnterAcademy(academy)}
            >
              {/* Academy Header */}
              <div className="text-center mb-6">
                <div 
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center text-4xl border-4 border-yellow-400 bg-gradient-to-br ${academy.color} mb-4`}
                >
                  {academy.icon}
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">{academy.name}</h2>
                <p className="text-gray-300 text-sm">{academy.description}</p>
              </div>

              {/* Progress Ring */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - academy.progress / 100)}`}
                    className="text-yellow-400 transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{academy.progress}%</div>
                    <div className="text-xs text-gray-400">Complete</div>
                  </div>
                </div>
              </div>

              {/* Academy Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Level</span>
                  <span className="text-yellow-400 font-semibold">{academy.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Games Available</span>
                  <span className="text-blue-400 font-semibold">{academy.games.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300">Stat Boost</span>
                  <div className="flex items-center space-x-1">
                    <StatIcon type={academy.statType} />
                    <span className="text-green-400 font-semibold capitalize">{academy.statType}</span>
                  </div>
                </div>
              </div>

              {/* Games Preview */}
              <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6">
                <h4 className="text-white font-semibold mb-3">Featured Games:</h4>
                <div className="space-y-2">
                  {academy.games.slice(0, 3).map((game) => (
                    <div key={game.id} className="flex items-center space-x-3">
                      <span className="text-lg">{game.icon}</span>
                      <span className="text-gray-300 text-sm flex-1">{game.name}</span>
                      {game.unlocked ? (
                        <Play className="w-4 h-4 text-green-400" />
                      ) : (
                        <Lock className="w-4 h-4 text-gray-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Enter Button */}
              {academy.unlocked ? (
                <button 
                  onClick={() => handleEnterAcademy(academy)}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
                >
                  <GraduationCap className="w-5 h-5" />
                  <span>Enter Academy</span>
                </button>
              ) : (
                <div className="w-full py-3 bg-gray-700 text-gray-400 rounded-lg text-center font-semibold flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Academy Locked</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Global Leaderboard Preview */}
        <div className="mt-12 bg-black bg-opacity-50 rounded-xl p-6 border border-yellow-500">
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2" />
            Academy Champions
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-6xl mb-2">🥇</div>
              <div className="text-xl font-bold text-yellow-400">Math Master</div>
              <div className="text-gray-300">Lightning Calculator</div>
              <div className="text-sm text-gray-400">Score: 15,847</div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-2">🥈</div>
              <div className="text-xl font-bold text-gray-300">Science Sage</div>
              <div className="text-gray-300">Quantum Explorer</div>
              <div className="text-sm text-gray-400">Score: 14,203</div>
            </div>
            
            <div className="text-center">
              <div className="text-6xl mb-2">🥉</div>
              <div className="text-xl font-bold text-orange-400">Word Wizard</div>
              <div className="text-gray-300">Grammar Guardian</div>
              <div className="text-sm text-gray-400">Score: 13,956</div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <p className="text-gray-300">Complete academy games to join the leaderboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
}