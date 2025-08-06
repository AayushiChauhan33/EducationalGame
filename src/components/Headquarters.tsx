import React, { useState } from 'react';
import { Hero, Mission } from '../types/index';
import { dailyMissions } from '../data/gameData';
import { 
  Zap, 
  Brain, 
  Star, 
  Trophy, 
  Target, 
  Calendar, 
  Shield, 
  Settings,
  Map,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';

interface HeadquartersProps {
  hero: Hero;
  onMissionSelect: (mission: Mission) => void;
  onTrainingSelect: () => void;
  onVillainsSelect: () => void;
}

export default function Headquarters({ hero, onMissionSelect, onTrainingSelect, onVillainsSelect }: HeadquartersProps) {
  const [activeTab, setActiveTab] = useState('overview');

  const StatCrystal = ({ 
    stat, 
    value, 
    color, 
    icon: Icon, 
    effect 
  }: { 
    stat: string; 
    value: number; 
    color: string; 
    icon: any; 
    effect: string; 
  }) => (
    <div className="relative">
      <div className={`w-32 h-40 mx-auto relative overflow-hidden rounded-lg border-2 ${color} bg-gradient-to-b from-transparent to-black bg-opacity-50`}>
        {/* Crystal base */}
        <div className={`absolute inset-2 rounded bg-gradient-to-t ${effect} opacity-60`} />
        
        {/* Pulsing energy */}
        <div className={`absolute inset-3 rounded animate-pulse ${effect} opacity-40`} />
        
        {/* Stat icon */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        {/* Stat value */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-xs text-gray-300">{stat}</div>
        </div>
        
        {/* Energy particles */}
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-bounce opacity-70"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random()}s`
            }}
          />
        ))}
      </div>
      
      {/* Stat label */}
      <h3 className="text-center text-white font-semibold mt-2">{stat}</h3>
    </div>
  );

  const ThreatLevel = ({ level }: { level: number }) => {
    const bars = Array.from({ length: 10 }, (_, i) => (
      <div
        key={i}
        className={`w-2 h-4 rounded ${
          i < level 
            ? level <= 3 
              ? 'bg-green-400' 
              : level <= 6 
                ? 'bg-yellow-400' 
                : 'bg-red-400'
            : 'bg-gray-600'
        }`}
      />
    ));
    
    return <div className="flex space-x-1">{bars}</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header with hero info */}
      <div className="bg-black bg-opacity-40 border-b border-blue-500">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 border-yellow-400"
                style={{
                  background: `linear-gradient(135deg, ${hero.appearance.colorPrimary}, ${hero.appearance.colorSecondary})`
                }}
              >
                {hero.archetype.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{hero.name}</h1>
                <p className="text-blue-300">{hero.archetype.name} • Level {hero.level}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-yellow-400 font-semibold">Experience</div>
                <div className="text-white">{hero.experience} XP</div>
              </div>
              <button className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                <Settings className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto p-6">
        {/* Navigation tabs */}
        <div className="flex space-x-1 mb-6 bg-black bg-opacity-30 rounded-lg p-1">
          {[
            { id: 'overview', label: 'Overview', icon: Map },
            { id: 'missions', label: 'Missions', icon: Target },
            { id: 'training', label: 'Training', icon: BookOpen },
            { id: 'villains', label: 'Villains', icon: Award },
            { id: 'achievements', label: 'Achievements', icon: Award }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stat Crystals */}
            <div className="lg:col-span-2">
              <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-purple-500">
                <h2 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center">
                  <Zap className="w-6 h-6 mr-2" />
                  Power Core Status
                </h2>
                
                <div className="grid grid-cols-3 gap-8">
                  <StatCrystal
                    stat="Strength"
                    value={hero.stats.strength}
                    color="border-red-500"
                    icon={Zap}
                    effect="from-red-600 to-red-800"
                  />
                  <StatCrystal
                    stat="Intelligence"
                    value={hero.stats.intelligence}
                    color="border-blue-500"
                    icon={Brain}
                    effect="from-blue-600 to-blue-800"
                  />
                  <StatCrystal
                    stat="Confidence"
                    value={hero.stats.confidence}
                    color="border-yellow-500"
                    icon={Star}
                    effect="from-yellow-600 to-yellow-800"
                  />
                </div>

                {/* Holographic city display */}
                <div className="mt-8 bg-gradient-to-t from-blue-900 to-transparent p-6 rounded-lg border border-blue-400">
                  <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    City Protection Status
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">87%</div>
                      <div className="text-gray-300">Safety Level</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">12</div>
                      <div className="text-gray-300">Active Missions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400">5</div>
                      <div className="text-gray-300">Urgent Threats</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right sidebar */}
            <div className="space-y-6">
              {/* Daily missions preview */}
              <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-green-500">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Today's Missions
                </h3>
                <div className="space-y-3">
                  {dailyMissions.slice(0, 2).map((mission) => (
                    <div key={mission.id} className="p-3 bg-gray-800 bg-opacity-50 rounded-lg">
                      <h4 className="font-semibold text-white text-sm">{mission.title}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <ThreatLevel level={mission.threatLevel} />
                        <span className="text-xs text-gray-400">{mission.difficulty}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setActiveTab('missions')}
                  className="w-full mt-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  View All Missions
                </button>
              </div>

              {/* News ticker */}
              <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-orange-500">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Hero News
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="p-2 bg-blue-800 bg-opacity-30 rounded">
                    <p className="text-blue-300">🦸‍♂️ New hero graduates showing 95% improvement in math skills!</p>
                  </div>
                  <div className="p-2 bg-purple-800 bg-opacity-30 rounded">
                    <p className="text-purple-300">🏆 Weekly challenge: Science Serpent defeated by 847 heroes!</p>
                  </div>
                  <div className="p-2 bg-green-800 bg-opacity-30 rounded">
                    <p className="text-green-300">⚡ Power crystal energy at all-time high across the academy!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Missions Tab */}
        {activeTab === 'missions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-500">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2" />
                Active Threats
              </h2>
              <div className="space-y-4">
                {dailyMissions.map((mission) => (
                  <div key={mission.id} className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-600 hover:border-gray-400 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white">{mission.title}</h3>
                        <p className="text-gray-300 text-sm mt-1">{mission.description}</p>
                        
                        <div className="flex items-center space-x-4 mt-3">
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-400">Threat Level:</span>
                            <ThreatLevel level={mission.threatLevel} />
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            mission.difficulty === 'Easy' ? 'bg-green-600 text-white' :
                            mission.difficulty === 'Medium' ? 'bg-yellow-600 text-white' :
                            mission.difficulty === 'Hard' ? 'bg-red-600 text-white' :
                            'bg-purple-600 text-white'
                          }`}>
                            {mission.difficulty}
                          </span>
                        </div>
                        
                        <div className="mt-3 text-sm">
                          <div className="text-yellow-400">Rewards: {mission.rewards.experience} XP</div>
                          {Object.entries(mission.rewards.statBoosts as any).map(([stat, boost]: any) => (
                            <div key={stat} className="text-green-400">
                              +{boost} {stat.charAt(0).toUpperCase() + stat.slice(1)}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => onMissionSelect(mission)}
                        className="ml-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Start Mission
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission briefing room */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-500">
              <h2 className="text-2xl font-bold text-white mb-6">Mission Briefing Room</h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-blue-800 bg-opacity-30 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">🦹‍♂️ Known Villains</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Calculator Crusher</span>
                      <span className="text-red-400">Math Nemesis</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Word Wizard</span>
                      <span className="text-purple-400">Language Villain</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Science Serpent</span>
                      <span className="text-green-400">Chemistry Chaos</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-800 bg-opacity-30 rounded-lg">
                  <h3 className="text-lg font-semibold text-white mb-2">📊 Your Mission Stats</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Missions Completed</span>
                      <span className="text-yellow-400">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Success Rate</span>
                      <span className="text-green-400">New Hero</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Favorite Subject</span>
                      <span className="text-blue-400">To Be Determined</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={onTrainingSelect}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold"
                >
                  Enter Training Facility
                </button>
                
                <button
                  onClick={onVillainsSelect}
                  className="w-full py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 font-semibold mt-4"
                >
                  Face the Villains
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Training Tab */}
        {activeTab === 'training' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Math Academy */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-500">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-3xl mb-4">
                  🔥
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Math Academy</h3>
                <p className="text-gray-300 text-sm">Strength Forge</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-red-400">🥷</span>
                  <span className="text-gray-300">Numeric Ninja Dojo</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-red-400">🔷</span>
                  <span className="text-gray-300">Geometric Portal Defense</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-red-400">⚡</span>
                  <span className="text-gray-300">Algebraic Arsenal</span>
                </div>
              </div>
              
              <button
                onClick={onTrainingSelect}
                className="w-full py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-semibold"
              >
                Enter Math Academy
              </button>
            </div>

            {/* Science Laboratory */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-500">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-3xl mb-4">
                  🧪
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Science Laboratory</h3>
                <p className="text-gray-300 text-sm">Intelligence Core</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-400">🎵</span>
                  <span className="text-gray-300">Circuit Symphony</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-400">⚗️</span>
                  <span className="text-gray-300">Chemical Chaos Lab</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-blue-400">🚀</span>
                  <span className="text-gray-300">Physics Flight School</span>
                </div>
              </div>
              
              <button
                onClick={onTrainingSelect}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold"
              >
                Enter Science Lab
              </button>
            </div>

            {/* English Academy */}
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-purple-500">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl mb-4">
                  📚
                </div>
                <h3 className="text-xl font-bold text-white mb-2">English Academy</h3>
                <p className="text-gray-300 text-sm">Confidence Castle</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-400">🪄</span>
                  <span className="text-gray-300">Word Wizard Warfare</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-400">📖</span>
                  <span className="text-gray-300">Story Architect</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="text-purple-400">🛠️</span>
                  <span className="text-gray-300">Grammar Guardian</span>
                </div>
              </div>
              
              <button
                onClick={onTrainingSelect}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold"
              >
                Enter English Academy
              </button>
            </div>
          </div>
        )}

        {/* Villains Tab */}
        {activeTab === 'villains' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-500">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2" />
                Villain Threats
              </h2>
              
              <div className="space-y-4">
                <div className="p-4 bg-red-900 bg-opacity-30 rounded-lg">
                  <h3 className="text-lg font-semibold text-red-300 mb-2">🧮 Dr. Subtract</h3>
                  <p className="text-gray-300 text-sm mb-2">The Number Destroyer threatens the Mathematics District</p>
                  <div className="text-xs text-yellow-400">Weakness: Strength-based attacks</div>
                </div>
                
                <div className="p-4 bg-green-900 bg-opacity-30 rounded-lg">
                  <h3 className="text-lg font-semibold text-green-300 mb-2">🧪 Professor Pollution</h3>
                  <p className="text-gray-300 text-sm mb-2">The Science Saboteur spreads toxic chaos</p>
                  <div className="text-xs text-blue-400">Weakness: Intelligence strategies</div>
                </div>
                
                <div className="p-4 bg-purple-900 bg-opacity-30 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-300 mb-2">👹 Grammar Goblin</h3>
                  <p className="text-gray-300 text-sm mb-2">The Word Wrecker destroys proper language</p>
                  <div className="text-xs text-yellow-400">Weakness: Confidence abilities</div>
                </div>
              </div>
              
              <button
                onClick={onVillainsSelect}
                className="w-full mt-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-300 font-semibold"
              >
                Enter Villain Consortium
              </button>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-orange-500">
              <h3 className="text-xl font-bold text-white mb-4">Combat Readiness</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Overall Combat Power</span>
                    <span className="text-orange-400">{(hero.stats as any).strength + (hero.stats as any).intelligence + (hero.stats as any).confidence}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-orange-500 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${Math.min(100, (((hero.stats as any).strength + (hero.stats as any).intelligence + (hero.stats as any).confidence) / 300) * 100)}%` }} 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-sm">
                  <div>
                    <div className="text-red-400 font-bold">{(hero.stats as any).strength}</div>
                    <div className="text-gray-400">STR</div>
                  </div>
                  <div>
                    <div className="text-blue-400 font-bold">{(hero.stats as any).intelligence}</div>
                    <div className="text-gray-400">INT</div>
                  </div>
                  <div>
                    <div className="text-yellow-400 font-bold">{(hero.stats as any).confidence}</div>
                    <div className="text-gray-400">CON</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg">
                <h4 className="text-white font-semibold mb-2">💡 Combat Tips</h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Use stat weaknesses for critical damage</li>
                  <li>• Build combos for bonus points</li>
                  <li>• Learn from educational hints</li>
                  <li>• Balance all stats for Tier 2 villains</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-yellow-500">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Trophy className="w-6 h-6 mr-2" />
                Hall of Fame
              </h2>
              
              {/* Empty trophy cases for now */}
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="aspect-square bg-gray-800 bg-opacity-50 rounded-lg border-2 border-dashed border-gray-600 flex items-center justify-center">
                    <div className="text-center">
                      <Trophy className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                      <p className="text-gray-500 text-xs">Locked</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-gray-300 text-center mt-4 text-sm">
                Complete missions to unlock achievements!
              </p>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-green-500">
              <h3 className="text-xl font-bold text-white mb-4">Progress Tracking</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">First Mission</span>
                    <span className="text-gray-400">0/1</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Math Master</span>
                    <span className="text-gray-400">0/10</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-300">Villain Vanquisher</span>
                    <span className="text-gray-400">0/5</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-orange-500">
              <h3 className="text-xl font-bold text-white mb-4">Hero Ranking</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">New</div>
                <p className="text-gray-300 mb-4">Current Rank</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Academy Points</span>
                    <span className="text-yellow-400">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Next Rank</span>
                    <span className="text-blue-400">Cadet (100 pts)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}