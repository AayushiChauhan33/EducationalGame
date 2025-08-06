import React, { useState } from 'react';
import { Hero } from '../types';
import { Villain, CombatSession } from '../types/villain';
import { villains, cityAreas } from '../data/villainData';
import VillainEncounter from './VillainEncounter';
import { 
  Skull, 
  Crown, 
  Zap, 
  Brain, 
  Heart, 
  Trophy, 
  Lock, 
  Star,
  Sword,
  Shield,
  Target,
  Clock,
  Award,
  Map,
  ChevronRight,
  Home
} from 'lucide-react';

interface VillainHubProps {
  hero: Hero;
  onBackToHQ: () => void;
  onHeroUpdate: (updatedHero: Hero) => void;
}

export default function VillainHub({ hero, onBackToHQ, onHeroUpdate }: VillainHubProps) {
  const [selectedVillain, setSelectedVillain] = useState<Villain | null>(null);
  const [activeTab, setActiveTab] = useState('villains');
  const [showEncounter, setShowEncounter] = useState(false);

  const handleVillainSelect = (villain: Villain) => {
    // Check if hero meets requirements
    const meetsRequirements = Object.entries(villain.requiredStats).every(([stat, required]) => {
      return hero.stats[stat as keyof typeof hero.stats] >= required;
    });

    if (!meetsRequirements) {
      alert(`You need higher stats to challenge ${villain.name}! Required: ${Object.entries(villain.requiredStats).map(([stat, req]) => `${stat}: ${req}`).join(', ')}`);
      return;
    }

    setSelectedVillain(villain);
    setShowEncounter(true);
  };

  const handleVictory = (session: CombatSession) => {
    if (!selectedVillain) return;

    // Update villain as defeated
    const villainIndex = villains.findIndex(v => v.id === selectedVillain.id);
    if (villainIndex !== -1) {
      villains[villainIndex].defeated = true;
      villains[villainIndex].timesDefeated++;
      if (villains[villainIndex].bestDefeatTime === 0 || session.endTime && session.startTime) {
        const battleTime = (session.endTime.getTime() - session.startTime.getTime()) / 1000;
        villains[villainIndex].bestDefeatTime = battleTime;
      }
    }

    // Update hero with rewards
    const updatedHero = { ...hero };
    updatedHero.experience += selectedVillain.rewards.experience;
    
    // Apply stat boosts
    Object.entries(selectedVillain.rewards.statBoosts).forEach(([stat, boost]) => {
      if (boost && stat in updatedHero.stats) {
        updatedHero.stats[stat as keyof typeof updatedHero.stats] += boost;
      }
    });

    // Level up if enough experience
    const expForNextLevel = updatedHero.level * 1000;
    if (updatedHero.experience >= expForNextLevel) {
      updatedHero.level++;
      updatedHero.experience -= expForNextLevel;
    }

    onHeroUpdate(updatedHero);
    setShowEncounter(false);
    setSelectedVillain(null);
  };

  const handleDefeat = () => {
    setShowEncounter(false);
    setSelectedVillain(null);
  };

  const handleEscape = () => {
    setShowEncounter(false);
    setSelectedVillain(null);
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'strength': return <Zap className="w-4 h-4 text-red-400" />;
      case 'intelligence': return <Brain className="w-4 h-4 text-blue-400" />;
      case 'confidence': return <Heart className="w-4 h-4 text-yellow-400" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const getTierBadge = (tier: number) => {
    return tier === 1 ? (
      <span className="px-2 py-1 bg-orange-600 text-white rounded text-xs font-bold">TIER 1</span>
    ) : (
      <span className="px-2 py-1 bg-red-600 text-white rounded text-xs font-bold">TIER 2</span>
    );
  };

  const canChallenge = (villain: Villain) => {
    return Object.entries(villain.requiredStats).every(([stat, required]) => {
      return hero.stats[stat as keyof typeof hero.stats] >= required;
    });
  };

  if (showEncounter && selectedVillain) {
    return (
      <VillainEncounter
        hero={hero}
        villain={selectedVillain}
        onVictory={handleVictory}
        onDefeat={handleDefeat}
        onEscape={handleEscape}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black">
      {/* Header */}
      <div className="bg-black bg-opacity-40 border-b border-red-500">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToHQ}
                className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
              >
                <Home className="w-6 h-6 text-white" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white flex items-center">
                  <Skull className="w-8 h-8 mr-3 text-red-400" />
                  Villain Consortium
                </h1>
                <p className="text-red-300">Face the ultimate educational challenges</p>
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

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex space-x-1 mb-6 bg-black bg-opacity-30 rounded-lg p-1">
          {[
            { id: 'villains', label: 'Villains', icon: Skull },
            { id: 'city', label: 'City Areas', icon: Map },
            { id: 'achievements', label: 'Combat Records', icon: Award }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Villains Tab */}
        {activeTab === 'villains' && (
          <div>
            {/* Tier 1 Villains */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Crown className="w-6 h-6 mr-2 text-orange-400" />
                Tier 1 - Stat Specialists
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {villains.filter(v => v.tier === 1).map((villain) => (
                  <div
                    key={villain.id}
                    className={`bg-black bg-opacity-50 rounded-xl p-6 border-2 transition-all duration-300 ${
                      villain.defeated 
                        ? 'border-green-500 opacity-75' 
                        : canChallenge(villain)
                          ? 'border-red-500 hover:border-red-400 hover:shadow-lg hover:shadow-red-400/20 cursor-pointer'
                          : 'border-gray-600 opacity-60'
                    }`}
                    onClick={() => canChallenge(villain) && !villain.defeated && handleVillainSelect(villain)}
                  >
                    {/* Villain Header */}
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{villain.avatar}</div>
                      <h3 className="text-lg font-bold text-white">{villain.name}</h3>
                      <p className="text-red-300 text-sm">{villain.title}</p>
                      <div className="mt-2">
                        {getTierBadge(villain.tier)}
                      </div>
                    </div>

                    {/* Health Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-300">Health</span>
                        <span className="text-red-400">{villain.maxHealth}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>

                    {/* Weaknesses */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Weaknesses:</h4>
                      <div className="flex flex-wrap gap-1">
                        {villain.weaknesses.map(weakness => (
                          <div key={weakness} className="flex items-center space-x-1 bg-green-600 px-2 py-1 rounded text-xs">
                            {getStatIcon(weakness)}
                            <span className="text-white capitalize">{weakness}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-blue-400 mb-2">Requirements:</h4>
                      <div className="space-y-1">
                        {Object.entries(villain.requiredStats).map(([stat, required]) => (
                          <div key={stat} className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-1">
                              {getStatIcon(stat)}
                              <span className="text-gray-300 capitalize">{stat}</span>
                            </div>
                            <span className={hero.stats[stat as keyof typeof hero.stats] >= required ? 'text-green-400' : 'text-red-400'}>
                              {hero.stats[stat as keyof typeof hero.stats]}/{required}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      {villain.defeated ? (
                        <div className="text-green-400 font-semibold flex items-center justify-center space-x-1">
                          <Trophy className="w-4 h-4" />
                          <span>DEFEATED</span>
                        </div>
                      ) : canChallenge(villain) ? (
                        <button className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                          Challenge!
                        </button>
                      ) : (
                        <div className="text-gray-400 font-semibold flex items-center justify-center space-x-1">
                          <Lock className="w-4 h-4" />
                          <span>LOCKED</span>
                        </div>
                      )}
                    </div>

                    {/* Defeat Count */}
                    {villain.timesDefeated > 0 && (
                      <div className="text-center mt-2 text-xs text-yellow-400">
                        Defeated {villain.timesDefeated} time{villain.timesDefeated !== 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 2 Villains */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <Crown className="w-6 h-6 mr-2 text-red-400" />
                Tier 2 - Ultimate Challenges
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {villains.filter(v => v.tier === 2).map((villain) => (
                  <div
                    key={villain.id}
                    className={`bg-black bg-opacity-50 rounded-xl p-8 border-2 transition-all duration-300 ${
                      villain.defeated 
                        ? 'border-green-500 opacity-75' 
                        : canChallenge(villain)
                          ? 'border-purple-500 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-400/20 cursor-pointer'
                          : 'border-gray-600 opacity-60'
                    }`}
                    onClick={() => canChallenge(villain) && !villain.defeated && handleVillainSelect(villain)}
                  >
                    {/* Villain Header */}
                    <div className="text-center mb-6">
                      <div className="text-6xl mb-3">{villain.avatar}</div>
                      <h3 className="text-2xl font-bold text-white">{villain.name}</h3>
                      <p className="text-purple-300 text-lg">{villain.title}</p>
                      <div className="mt-3">
                        {getTierBadge(villain.tier)}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-center mb-6">{villain.description}</p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-red-900 bg-opacity-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-red-400">{villain.maxHealth}</div>
                        <div className="text-sm text-gray-300">Health</div>
                      </div>
                      <div className="bg-gray-900 bg-opacity-50 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-gray-400">{villain.armor}</div>
                        <div className="text-sm text-gray-300">Armor</div>
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-purple-400 mb-3">Requirements:</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(villain.requiredStats).map(([stat, required]) => (
                          <div key={stat} className="bg-gray-800 rounded-lg p-2 text-center">
                            <div className="flex items-center justify-center mb-1">
                              {getStatIcon(stat)}
                            </div>
                            <div className={`text-sm font-bold ${hero.stats[stat as keyof typeof hero.stats] >= required ? 'text-green-400' : 'text-red-400'}`}>
                              {hero.stats[stat as keyof typeof hero.stats]}/{required}
                            </div>
                            <div className="text-xs text-gray-400 capitalize">{stat}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      {villain.defeated ? (
                        <div className="text-green-400 font-semibold flex items-center justify-center space-x-2 text-lg">
                          <Trophy className="w-6 h-6" />
                          <span>CONQUERED</span>
                        </div>
                      ) : canChallenge(villain) ? (
                        <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-bold text-lg">
                          Face the Challenge!
                        </button>
                      ) : (
                        <div className="text-gray-400 font-semibold flex items-center justify-center space-x-2 text-lg">
                          <Lock className="w-6 h-6" />
                          <span>SEALED</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* City Areas Tab */}
        {activeTab === 'city' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cityAreas.map((area) => {
              const isUnlocked = villains.find(v => v.id === area.unlockedBy)?.defeated || false;
              
              return (
                <div
                  key={area.id}
                  className={`bg-black bg-opacity-50 rounded-xl p-6 border-2 ${
                    isUnlocked ? 'border-green-500' : 'border-gray-600 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{area.name}</h3>
                    {isUnlocked ? (
                      <div className="text-green-400 flex items-center space-x-1">
                        <Star className="w-5 h-5" />
                        <span className="text-sm">LIBERATED</span>
                      </div>
                    ) : (
                      <div className="text-gray-400 flex items-center space-x-1">
                        <Lock className="w-5 h-5" />
                        <span className="text-sm">LOCKED</span>
                      </div>
                    )}
                  </div>

                  <p className="text-gray-300 mb-4">{area.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{area.citizens.toLocaleString()}</div>
                      <div className="text-sm text-gray-300">Citizens</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">{area.buildings.length}</div>
                      <div className="text-sm text-gray-300">Buildings</div>
                    </div>
                  </div>

                  {isUnlocked && (
                    <div>
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Key Buildings:</h4>
                      <div className="flex flex-wrap gap-1">
                        {area.buildings.slice(0, 3).map(building => (
                          <span key={building} className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                            {building}
                          </span>
                        ))}
                        {area.buildings.length > 3 && (
                          <span className="text-gray-400 text-xs">+{area.buildings.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {!isUnlocked && (
                    <div className="text-center text-gray-400 text-sm">
                      Defeat {villains.find(v => v.id === area.unlockedBy)?.name} to unlock
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Combat Records Tab */}
        {activeTab === 'achievements' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-yellow-500">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Combat Statistics
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300">Villains Defeated</span>
                  <span className="text-yellow-400 font-bold">
                    {villains.filter(v => v.defeated).length}/{villains.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tier 1 Cleared</span>
                  <span className="text-green-400 font-bold">
                    {villains.filter(v => v.tier === 1 && v.defeated).length}/{villains.filter(v => v.tier === 1).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tier 2 Cleared</span>
                  <span className="text-purple-400 font-bold">
                    {villains.filter(v => v.tier === 2 && v.defeated).length}/{villains.filter(v => v.tier === 2).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">City Areas Liberated</span>
                  <span className="text-blue-400 font-bold">
                    {cityAreas.filter(area => villains.find(v => v.id === area.unlockedBy)?.defeated).length}/{cityAreas.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-red-500">
              <h3 className="text-xl font-bold text-white mb-4">Battle Records</h3>
              
              <div className="space-y-3">
                {villains.filter(v => v.defeated).map(villain => (
                  <div key={villain.id} className="flex items-center justify-between p-2 bg-gray-800 rounded">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{villain.avatar}</span>
                      <span className="text-white text-sm">{villain.name}</span>
                    </div>
                    <div className="text-green-400 text-xs">
                      ✓ {villain.timesDefeated}x
                    </div>
                  </div>
                ))}
                
                {villains.filter(v => v.defeated).length === 0 && (
                  <p className="text-gray-400 text-center">No victories yet. Start your journey!</p>
                )}
              </div>
            </div>

            <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-500">
              <h3 className="text-xl font-bold text-white mb-4">Next Challenges</h3>
              
              <div className="space-y-3">
                {villains.filter(v => !v.defeated && canChallenge(v)).slice(0, 3).map(villain => (
                  <div key={villain.id} className="p-3 bg-blue-900 bg-opacity-30 rounded">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl">{villain.avatar}</span>
                      <div>
                        <div className="text-white font-semibold">{villain.name}</div>
                        <div className="text-blue-300 text-sm">{villain.title}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleVillainSelect(villain)}
                      className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
                    >
                      Challenge Now
                    </button>
                  </div>
                ))}
                
                {villains.filter(v => !v.defeated && canChallenge(v)).length === 0 && (
                  <p className="text-gray-400 text-center">Train harder to unlock new challenges!</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}