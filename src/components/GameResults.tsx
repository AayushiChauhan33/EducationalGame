import React, { useState, useEffect } from 'react';
import { Hero } from '../types/index';
import { Academy, AcademyGame, GameSession, AcademyAchievement } from '../types/academy';
import { 
  Trophy, 
  Star, 
  Clock, 
  Target, 
  TrendingUp, 
  Award, 
  Sparkles,
  ChevronRight,
  RotateCcw,
  Home,
  Zap,
  Gauge,
  BarChart2
} from 'lucide-react';

interface GameResultsProps {
  hero: Hero;
  academy: Academy;
  game: AcademyGame;
  session: GameSession;
  newAchievements: AcademyAchievement[];
  onPlayAgain: () => void;
  onBackToAcademy: () => void;
  onBackToHQ: () => void;
}

const GameResults: React.FC<GameResultsProps> = ({ 
  hero, 
  academy, 
  game, 
  session, 
  newAchievements, 
  onPlayAgain, 
  onBackToAcademy, 
  onBackToHQ 
}) => {
  const [showStats, setShowStats] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [celebrationPhase, setCelebrationPhase] = useState(0);
  const [heroStatIncrease, setHeroStatIncrease] = useState(0);

  // Celebration sequence with staggered animations
  useEffect(() => {
    const timers = [
      setTimeout(() => setShowStats(true), 300),
      setTimeout(() => setShowAchievements(true), 900),
      setTimeout(() => setCelebrationPhase(1), 1200),
      setTimeout(() => setCelebrationPhase(2), 1800),
      setTimeout(() => {
        setCelebrationPhase(3);
        // Animate stat increase
        animateStatIncrease();
      }, 2200)
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  const animateStatIncrease = () => {
    const duration = 1500;
    const start = Date.now();
    const finalValue = game.statReward;
    
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * finalValue);
      
      setHeroStatIncrease(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const getPerformanceRating = () => {
    const avgScore = (session.score + session.accuracy) / 2;
    if (avgScore >= 90) return { rating: 'LEGENDARY', color: 'text-yellow-400', icon: '👑', bg: 'from-yellow-600 to-amber-600' };
    if (avgScore >= 80) return { rating: 'EXCELLENT', color: 'text-purple-400', icon: '⭐', bg: 'from-purple-600 to-indigo-600' };
    if (avgScore >= 70) return { rating: 'GREAT', color: 'text-blue-400', icon: '🎯', bg: 'from-blue-600 to-cyan-600' };
    if (avgScore >= 60) return { rating: 'GOOD', color: 'text-green-400', icon: '👍', bg: 'from-green-600 to-emerald-600' };
    return { rating: 'KEEP TRYING', color: 'text-orange-400', icon: '💪', bg: 'from-orange-600 to-red-600' };
  };

  const performance = getPerformanceRating();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateQuestionsPerMinute = () => {
  return session.timeElapsed > 0 
    ? Math.round((session.questionsAnswered / (session.timeElapsed / 60)) * 10) / 10
    : 0;
};

const calculateEfficiency = () => {
  return session.timeElapsed > 0 
    ? Math.round((session.score / session.timeElapsed) * 10) / 10
    : 0;
};

  interface StatCardProps {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    color: string;
    delay: number;
    description?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, color, delay, description }) => (
    <div 
      className={`bg-black/50 rounded-xl p-6 border border-gray-600 transition-all duration-700 ${
        showStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-center">
        <Icon className={`w-8 h-8 mx-auto mb-3 ${color}`} />
        <div className={`text-3xl font-bold mb-2 ${color}`}>{value}</div>
        <div className="text-gray-300 text-sm">{label}</div>
        {description && (
          <div className="text-xs text-gray-400 mt-2">{description}</div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Celebration particles */}
      {celebrationPhase > 0 && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: celebrationPhase >= 3 ? 80 : 50 }).map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                celebrationPhase >= 3 
                  ? 'w-3 h-3 bg-yellow-400 animate-bounce' 
                  : 'w-2 h-2 bg-white/70 animate-float'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Header */}
      <header className="bg-black/40 border-b border-purple-500 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-3xl border-2 border-yellow-400"
                style={{ 
                  background: `linear-gradient(135deg, var(--tw-gradient-from), var(--tw-gradient-to))`
                }}
              >
                {academy.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mission Complete!</h1>
                <p className="text-purple-300">{game.name} • {academy.name}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={onBackToHQ}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                aria-label="Return to HQ"
              >
                <Home className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {/* Performance Rating */}
        <section className="text-center mb-8">
          <div 
            className={`transition-all duration-1000 ${
              celebrationPhase >= 1 ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <div className="text-8xl mb-4 animate-bounce">{performance.icon}</div>
            <h2 className={`text-4xl font-bold mb-2 ${performance.color}`}>
              {performance.rating}
            </h2>
            <p className="text-gray-300 text-xl">Performance Rating</p>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Trophy}
            label="Final Score"
            value={session.score.toLocaleString()}
            color="text-yellow-400"
            delay={0}
            description={`${Math.floor(session.score / 1000)}K points`}
          />
          <StatCard
            icon={Target}
            label="Accuracy"
            value={`${session.accuracy}%`}
            color="text-green-400"
            delay={100}
            description={`${Math.round(session.accuracy * session.questionsAnswered / 100)} correct`}
          />
          <StatCard
            icon={Clock}
            label="Time"
            value={formatTime(session.timeElapsed)}
            color="text-blue-400"
            delay={200}
            description={`${calculateQuestionsPerMinute()} q/min`}
          />
          <StatCard
            icon={Star}
            label="Questions"
            value={session.questionsAnswered}
            color="text-purple-400"
            delay={300}
            description={`${game.difficulty} difficulty`}
          />
        </section>

        {/* Stat Boost Reward */}
        <section 
          className={`bg-gradient-to-r ${performance.bg} rounded-xl p-6 mb-8 transition-all duration-1000 ${
            showStats ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
          style={{ transitionDelay: '400ms' }}
        >
          <div className="text-center">
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold text-white mb-2">Power Enhanced!</h3>
            <div className="flex items-center justify-center space-x-4 mb-2">
              <div className="text-4xl font-bold text-white flex items-center">
                +{heroStatIncrease}
                {heroStatIncrease >= game.statReward && (
                  <Zap className="w-6 h-6 ml-2 text-yellow-300 animate-pulse" />
                )}
              </div>
              <div className="text-xl text-white capitalize">{academy.statType}</div>
            </div>
            <p className="text-gray-200">
              {hero.name} now has {(hero.stats as any)[academy.statType] + game.statReward} {academy.statType}!
            </p>
          </div>
        </section>

        {/* Achievements */}
        {newAchievements.length > 0 && (
          <section 
            className={`bg-black/50 rounded-xl p-6 border border-yellow-500 mb-8 transition-all duration-1000 ${
              showAchievements ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '500ms' }}
          >
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Award className="w-6 h-6 mr-2 text-yellow-400" />
              New Achievements Unlocked!
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {newAchievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className="bg-gray-800/50 rounded-lg p-4 flex items-center space-x-4 transition-all hover:bg-gray-700/50"
                >
                  <div className="text-3xl">{achievement.icon}</div>
                  <div>
                    <h4 className="text-lg font-bold text-yellow-400">{achievement.name}</h4>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Performance Analysis */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-black/50 rounded-xl p-6 border border-blue-500">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
              Performance Breakdown
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Speed</span>
                  <span className="text-gray-400">{calculateQuestionsPerMinute()} per min</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${Math.min(100, calculateQuestionsPerMinute() * 10)}%` 
                    }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Accuracy</span>
                  <span className="text-gray-400">{session.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-green-500 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ width: `${session.accuracy}%` }} 
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">Efficiency</span>
                  <span className="text-gray-400">{calculateEfficiency()} pts/sec</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-purple-500 h-2.5 rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${Math.min(100, calculateEfficiency() * 2)}%` 
                    }} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-black/50 rounded-xl p-6 border border-green-500">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <Gauge className="w-5 h-5 mr-2 text-green-400" />
              Next Steps
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-800/30 rounded-lg hover:bg-blue-800/40 transition-colors">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Improve Your Score
                </h4>
                <p className="text-gray-300 text-sm">
                  Focus on accuracy to maximize your points. Each correct answer builds your combo multiplier!
                </p>
              </div>
              
              <div className="p-4 bg-purple-800/30 rounded-lg hover:bg-purple-800/40 transition-colors">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Unlock New Games
                </h4>
                <p className="text-gray-300 text-sm">
                  Complete more games in this academy to unlock advanced challenges and face the mini-boss!
                </p>
              </div>
              
              <div className="p-4 bg-green-800/30 rounded-lg hover:bg-green-800/40 transition-colors">
                <h4 className="text-white font-semibold mb-2 flex items-center">
                  <Trophy className="w-4 h-4 mr-2" />
                  Compete with Friends
                </h4>
                <p className="text-gray-300 text-sm">
                  Challenge other heroes in multiplayer mode and climb the academy leaderboards!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <section className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 group"
          >
            <RotateCcw className="w-5 h-5 transition-transform group-hover:rotate-180" />
            <span>Play Again</span>
          </button>
          
          <button
            onClick={onBackToAcademy}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 group"
          >
            <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            <span>Next Game</span>
          </button>
          
          <button
            onClick={onBackToHQ}
            className="px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 font-semibold flex items-center justify-center space-x-2 group"
          >
            <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span>Return to HQ</span>
          </button>
        </section>
      </main>

      {/* Floating celebration effects */}
      {celebrationPhase >= 2 && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-bounce">
            <Sparkles className="w-8 h-8 text-yellow-400" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-pulse">
            <Star className="w-6 h-6 text-blue-400" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-spin">
            <Trophy className="w-7 h-7 text-purple-400" />
          </div>
        </div>
      )}
    </div>
  );
};

export default GameResults;