import React, { useState, useEffect, useRef } from 'react';
import { Villain, CombatSession, CombatAction } from '../types/villain';
import { Hero } from '../types';
import { 
  Sword, 
  Shield, 
  Zap, 
  Brain, 
  Heart, 
  Clock, 
  Trophy,
  Volume2,
  VolumeX,
  Pause,
  Play,
  RotateCcw,
  Home,
  Target,
  Flame,
  Star
} from 'lucide-react';

interface VillainEncounterProps {
  hero: Hero;
  villain: Villain;
  onVictory: (session: CombatSession) => void;
  onDefeat: () => void;
  onEscape: () => void;
}

export default function VillainEncounter({ hero, villain, onVictory, onDefeat, onEscape }: VillainEncounterProps) {
  const [combatState, setCombatState] = useState<'intro' | 'combat' | 'victory' | 'defeat'>('intro');
  const [villainHealth, setVillainHealth] = useState(villain.maxHealth);
  const [heroHealth, setHeroHealth] = useState(1000);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [combatLog, setCombatLog] = useState<CombatAction[]>([]);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [comboCount, setComboCount] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [battleTimer, setBattleTimer] = useState(0);
  const [showEducationalHint, setShowEducationalHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [environmentalEffects, setEnvironmentalEffects] = useState<any[]>([]);
  const [villainAnimation, setVillainAnimation] = useState('idle');
  const [heroAnimation, setHeroAnimation] = useState('idle');
  
  const combatSessionRef = useRef<CombatSession>({
    villainId: villain.id,
    startTime: new Date(),
    heroStats: hero.stats,
    damageDealt: 0,
    damageTaken: 0,
    attacksUsed: [],
    educationalSkillsUsed: [],
    comboCount: 0,
    maxCombo: 0,
    criticalHits: 0,
    perfectDodges: 0,
    environmentalInteractions: 0,
    finalScore: 0,
    victory: false,
    defeatMethod: ''
  });

  // Battle timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (combatState === 'combat' && !isPaused) {
      interval = setInterval(() => {
        setBattleTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [combatState, isPaused]);

  // Phase transitions
  useEffect(() => {
    const healthPercentage = (villainHealth / villain.maxHealth) * 100;
    const newPhase = villain.phases.find(phase => healthPercentage <= phase.healthThreshold);
    if (newPhase && newPhase.id !== currentPhase) {
      setCurrentPhase(newPhase.id);
      triggerPhaseTransition(newPhase);
    }
  }, [villainHealth]);

  // Victory/Defeat conditions
  useEffect(() => {
    if (villainHealth <= 0 && combatState === 'combat') {
      handleVictory();
    } else if (heroHealth <= 0 && combatState === 'combat') {
      handleDefeat();
    }
  }, [villainHealth, heroHealth]);

  const triggerPhaseTransition = (phase: any) => {
    setVillainAnimation('phase-transition');
    
    // Apply environment changes
    phase.environmentChanges.forEach((change: any) => {
      setEnvironmentalEffects(prev => [...prev, {
        type: change.type,
        description: change.description,
        effect: change.effect,
        timestamp: Date.now()
      }]);
    });

    // Show phase dialogue
    if (phase.dialogue.length > 0) {
      showVillainDialogue(phase.dialogue[Math.floor(Math.random() * phase.dialogue.length)]);
    }

    setTimeout(() => setVillainAnimation('idle'), 2000);
  };

  const showVillainDialogue = (dialogue: string) => {
    // Create speech bubble effect
    const speechBubble = document.createElement('div');
    speechBubble.className = 'villain-speech-bubble';
    speechBubble.textContent = dialogue;
    document.body.appendChild(speechBubble);
    
    setTimeout(() => {
      document.body.removeChild(speechBubble);
    }, 3000);
  };

  const executeAttack = (attackId: string, statUsed: 'strength' | 'intelligence' | 'confidence') => {
    const attack = villain.attacks.find(a => a.id === attackId);
    if (!attack) return;

    setSelectedAction(attackId);
    setHeroAnimation('attack');

    // Calculate damage based on hero stats and attack effectiveness
    const baseDamage = 100;
    const statMultiplier = hero.stats[statUsed] / 50; // Normalize to ~2x at max stat
    const weaknessBonus = villain.weaknesses.includes(statUsed) ? 2 : 1;
    const resistancePenalty = villain.resistances.includes(statUsed) ? 0.5 : 1;
    
    const finalDamage = Math.round(baseDamage * statMultiplier * weaknessBonus * resistancePenalty);
    const isCritical = Math.random() < 0.2; // 20% crit chance
    const actualDamage = isCritical ? finalDamage * 2 : finalDamage;

    // Apply damage
    setVillainHealth(prev => Math.max(0, prev - actualDamage));
    
    // Update combo
    setComboCount(prev => prev + 1);
    combatSessionRef.current.maxCombo = Math.max(combatSessionRef.current.maxCombo, comboCount + 1);
    
    if (isCritical) {
      combatSessionRef.current.criticalHits++;
    }

    // Log the action
    const combatAction: CombatAction = {
      id: Date.now().toString(),
      type: 'attack',
      name: `${statUsed.charAt(0).toUpperCase() + statUsed.slice(1)} Attack`,
      damage: actualDamage,
      statUsed,
      educationalConcept: attack.educationalHint,
      timestamp: Date.now(),
      success: true,
      critical: isCritical
    };

    setCombatLog(prev => [...prev, combatAction]);
    combatSessionRef.current.attacksUsed.push(combatAction);
    combatSessionRef.current.damageDealt += actualDamage;

    // Show educational hint
    setCurrentHint(attack.educationalHint);
    setShowEducationalHint(true);
    setTimeout(() => setShowEducationalHint(false), 3000);

    // Villain counter-attack
    setTimeout(() => {
      villainCounterAttack();
    }, 1500);

    setTimeout(() => {
      setHeroAnimation('idle');
      setSelectedAction(null);
    }, 2000);
  };

  const villainCounterAttack = () => {
    const availableAttacks = villain.attacks.filter(attack => 
      !attack.requiredPhase || attack.requiredPhase <= currentPhase
    );
    
    const randomAttack = availableAttacks[Math.floor(Math.random() * availableAttacks.length)];
    
    setVillainAnimation('attack');
    
    // Calculate villain damage (reduced by hero's defensive stats)
    const baseDamage = randomAttack.damage;
    const defense = (hero.stats.strength + hero.stats.intelligence + hero.stats.confidence) / 3;
    const damageReduction = Math.min(0.8, defense / 100); // Max 80% reduction
    const finalDamage = Math.round(baseDamage * (1 - damageReduction));
    
    setHeroHealth(prev => Math.max(0, prev - finalDamage));
    combatSessionRef.current.damageTaken += finalDamage;

    // Show attack animation and effects
    createAttackEffect(randomAttack.animation, randomAttack.element);
    
    setTimeout(() => setVillainAnimation('idle'), 1500);
  };

  const createAttackEffect = (animation: string, element: string) => {
    // Create visual effect based on attack type
    const effectColors = {
      math: '#FFD700',
      science: '#00FF00',
      english: '#FF69B4',
      chaos: '#800080',
      neutral: '#FFFFFF'
    };

    const color = effectColors[element as keyof typeof effectColors] || '#FFFFFF';
    
    // Add particle effect
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'combat-particle';
      particle.style.backgroundColor = color;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 2000);
    }
  };

  const handleVictory = () => {
    setCombatState('victory');
    combatSessionRef.current.endTime = new Date();
    combatSessionRef.current.victory = true;
    combatSessionRef.current.finalScore = calculateFinalScore();
    
    // Trigger victory celebration
    createVictoryCelebration();
    
    setTimeout(() => {
      onVictory(combatSessionRef.current);
    }, 3000);
  };

  const handleDefeat = () => {
    setCombatState('defeat');
    combatSessionRef.current.endTime = new Date();
    combatSessionRef.current.victory = false;
    
    setTimeout(() => {
      onDefeat();
    }, 2000);
  };

  const calculateFinalScore = () => {
    const baseScore = combatSessionRef.current.damageDealt;
    const timeBonus = Math.max(0, 300 - battleTimer) * 10; // Bonus for quick victory
    const comboBonus = combatSessionRef.current.maxCombo * 50;
    const criticalBonus = combatSessionRef.current.criticalHits * 100;
    const educationalBonus = combatSessionRef.current.educationalSkillsUsed.length * 25;
    
    return baseScore + timeBonus + comboBonus + criticalBonus + educationalBonus;
  };

  const createVictoryCelebration = () => {
    // Create celebration particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'victory-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = ['#FFD700', '#FF6347', '#32CD32', '#1E90FF'][Math.floor(Math.random() * 4)];
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (document.body.contains(particle)) {
          document.body.removeChild(particle);
        }
      }, 5000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getStatColor = (stat: string) => {
    switch (stat) {
      case 'strength': return 'text-red-400';
      case 'intelligence': return 'text-blue-400';
      case 'confidence': return 'text-yellow-400';
      default: return 'text-white';
    }
  };

  const getStatIcon = (stat: string) => {
    switch (stat) {
      case 'strength': return <Zap className="w-5 h-5" />;
      case 'intelligence': return <Brain className="w-5 h-5" />;
      case 'confidence': return <Heart className="w-5 h-5" />;
      default: return <Star className="w-5 h-5" />;
    }
  };

  if (combatState === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-purple-900 to-black relative overflow-hidden">
        {/* Villain Lair Background */}
        <div className="absolute inset-0 opacity-30">
          {villain.lair.atmosphericEffects.map((effect, index) => (
            <div
              key={index}
              className={`absolute inset-0 ${effect.animation}`}
              style={{ 
                backgroundColor: effect.color,
                opacity: effect.intensity / 100
              }}
            />
          ))}
        </div>

        {/* Villain Introduction */}
        <div className="flex items-center justify-center min-h-screen">
          <div className="max-w-4xl mx-auto p-8">
            <div className="bg-black bg-opacity-80 rounded-2xl p-8 border-2 border-red-500 shadow-2xl">
              <div className="text-center mb-8">
                <div className="text-8xl mb-4 animate-pulse">{villain.avatar}</div>
                <h1 className="text-4xl font-bold text-red-400 mb-2">{villain.name}</h1>
                <h2 className="text-2xl text-purple-300 mb-4">{villain.title}</h2>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">{villain.description}</p>
              </div>

              {/* Villain Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-red-900 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">{villain.maxHealth}</div>
                  <div className="text-sm text-gray-300">Health</div>
                </div>
                <div className="bg-gray-900 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-400">{villain.armor}</div>
                  <div className="text-sm text-gray-300">Armor</div>
                </div>
                <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-400">{villain.speed}</div>
                  <div className="text-sm text-gray-300">Speed</div>
                </div>
                <div className="bg-purple-900 bg-opacity-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{villain.tier}</div>
                  <div className="text-sm text-gray-300">Tier</div>
                </div>
              </div>

              {/* Weaknesses and Resistances */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-900 bg-opacity-30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-green-400 mb-2">Weaknesses</h3>
                  <div className="flex flex-wrap gap-2">
                    {villain.weaknesses.map(weakness => (
                      <span key={weakness} className={`px-3 py-1 rounded-full text-sm font-medium bg-green-600 text-white flex items-center space-x-1`}>
                        {getStatIcon(weakness)}
                        <span className="capitalize">{weakness}</span>
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-red-900 bg-opacity-30 rounded-lg p-4">
                  <h3 className="text-lg font-bold text-red-400 mb-2">Resistances</h3>
                  <div className="flex flex-wrap gap-2">
                    {villain.resistances.map(resistance => (
                      <span key={resistance} className={`px-3 py-1 rounded-full text-sm font-medium bg-red-600 text-white flex items-center space-x-1`}>
                        {getStatIcon(resistance)}
                        <span className="capitalize">{resistance}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Backstory */}
              <div className="bg-gray-900 bg-opacity-50 rounded-lg p-6 mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Villain's Origin</h3>
                <p className="text-gray-300 mb-4">{villain.backstory}</p>
                <p className="text-purple-300 italic">"{villain.motivation}"</p>
              </div>

              {/* Battle Button */}
              <div className="text-center">
                <button
                  onClick={() => setCombatState('combat')}
                  className="px-12 py-4 bg-gradient-to-r from-red-600 to-purple-600 text-white text-xl font-bold rounded-xl hover:from-red-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-yellow-400"
                >
                  ⚔️ Begin Battle!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (combatState === 'combat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-purple-900 relative overflow-hidden">
        {/* Combat HUD */}
        <div className="absolute top-0 left-0 right-0 z-10 bg-black bg-opacity-70 border-b border-red-500">
          <div className="max-w-7xl mx-auto p-4">
            <div className="flex items-center justify-between">
              {/* Hero Status */}
              <div className="flex items-center space-x-4">
                <div className="text-white">
                  <div className="font-bold">{hero.name}</div>
                  <div className="w-48 bg-red-900 rounded-full h-3">
                    <div 
                      className="bg-green-500 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${(heroHealth / 1000) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-300">{heroHealth}/1000 HP</div>
                </div>
              </div>

              {/* Battle Info */}
              <div className="text-center text-white">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(battleTimer)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span>{comboCount}x</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>Phase {currentPhase}</span>
                  </div>
                </div>
              </div>

              {/* Villain Status */}
              <div className="flex items-center space-x-4">
                <div className="text-white text-right">
                  <div className="font-bold">{villain.name}</div>
                  <div className="w-48 bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-red-500 h-3 rounded-full transition-all duration-300" 
                      style={{ width: `${(villainHealth / villain.maxHealth) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-300">{villainHealth}/{villain.maxHealth} HP</div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-5 h-5 text-white" /> : <VolumeX className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  {isPaused ? <Play className="w-5 h-5 text-white" /> : <Pause className="w-5 h-5 text-white" />}
                </button>
                <button
                  onClick={onEscape}
                  className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Home className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Battle Arena */}
        <div className="pt-24 h-screen flex">
          {/* Left Side - Hero */}
          <div className="w-1/2 flex items-center justify-center relative">
            <div className={`text-8xl transition-transform duration-500 ${heroAnimation === 'attack' ? 'scale-125 animate-pulse' : ''}`}>
              {hero.archetype.icon}
            </div>
            
            {/* Hero Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full animate-pulse"
                  style={{
                    backgroundColor: hero.appearance.colorPrimary,
                    left: `${30 + Math.cos(i * Math.PI / 3) * 40}%`,
                    top: `${30 + Math.sin(i * Math.PI / 3) * 40}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Villain */}
          <div className="w-1/2 flex items-center justify-center relative">
            <div className={`text-8xl transition-transform duration-500 ${villainAnimation === 'attack' ? 'scale-125 animate-bounce' : villainAnimation === 'phase-transition' ? 'scale-150 animate-spin' : ''}`}>
              {villain.avatar}
            </div>
            
            {/* Villain Effects */}
            <div className="absolute inset-0 pointer-events-none">
              {villain.lair.atmosphericEffects.map((effect, index) => (
                <div
                  key={index}
                  className={`absolute w-4 h-4 rounded-full ${effect.animation}`}
                  style={{
                    backgroundColor: effect.color,
                    left: `${Math.random() * 80 + 10}%`,
                    top: `${Math.random() * 80 + 10}%`,
                    opacity: effect.intensity / 200
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Combat Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-80 border-t border-purple-500">
          <div className="max-w-7xl mx-auto p-6">
            <div className="grid grid-cols-3 gap-6">
              {/* Strength Attack */}
              <button
                onClick={() => executeAttack('strength-attack', 'strength')}
                disabled={selectedAction !== null || isPaused}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedAction === 'strength-attack' 
                    ? 'border-red-400 bg-red-600 scale-105' 
                    : 'border-red-600 bg-red-900 bg-opacity-50 hover:bg-red-800 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-center">
                  <Zap className="w-8 h-8 text-red-400 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-white mb-2">Strength Attack</h3>
                  <p className="text-red-300 text-sm mb-2">Physical power and determination</p>
                  <div className="text-2xl font-bold text-red-400">{hero.stats.strength}</div>
                  {villain.weaknesses.includes('strength') && (
                    <div className="text-green-400 text-xs mt-1">⚡ SUPER EFFECTIVE!</div>
                  )}
                  {villain.resistances.includes('strength') && (
                    <div className="text-red-400 text-xs mt-1">🛡️ Not very effective...</div>
                  )}
                </div>
              </button>

              {/* Intelligence Attack */}
              <button
                onClick={() => executeAttack('intelligence-attack', 'intelligence')}
                disabled={selectedAction !== null || isPaused}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedAction === 'intelligence-attack' 
                    ? 'border-blue-400 bg-blue-600 scale-105' 
                    : 'border-blue-600 bg-blue-900 bg-opacity-50 hover:bg-blue-800 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-center">
                  <Brain className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-white mb-2">Intelligence Attack</h3>
                  <p className="text-blue-300 text-sm mb-2">Knowledge and strategy</p>
                  <div className="text-2xl font-bold text-blue-400">{hero.stats.intelligence}</div>
                  {villain.weaknesses.includes('intelligence') && (
                    <div className="text-green-400 text-xs mt-1">⚡ SUPER EFFECTIVE!</div>
                  )}
                  {villain.resistances.includes('intelligence') && (
                    <div className="text-red-400 text-xs mt-1">🛡️ Not very effective...</div>
                  )}
                </div>
              </button>

              {/* Confidence Attack */}
              <button
                onClick={() => executeAttack('confidence-attack', 'confidence')}
                disabled={selectedAction !== null || isPaused}
                className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                  selectedAction === 'confidence-attack' 
                    ? 'border-yellow-400 bg-yellow-600 scale-105' 
                    : 'border-yellow-600 bg-yellow-900 bg-opacity-50 hover:bg-yellow-800 hover:scale-105'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-center">
                  <Heart className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-xl font-bold text-white mb-2">Confidence Attack</h3>
                  <p className="text-yellow-300 text-sm mb-2">Self-belief and courage</p>
                  <div className="text-2xl font-bold text-yellow-400">{hero.stats.confidence}</div>
                  {villain.weaknesses.includes('confidence') && (
                    <div className="text-green-400 text-xs mt-1">⚡ SUPER EFFECTIVE!</div>
                  )}
                  {villain.resistances.includes('confidence') && (
                    <div className="text-red-400 text-xs mt-1">🛡️ Not very effective...</div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Educational Hint Overlay */}
        {showEducationalHint && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="bg-blue-900 bg-opacity-90 rounded-xl p-6 border-2 border-blue-400 max-w-md">
              <h3 className="text-xl font-bold text-blue-300 mb-2">💡 Educational Tip</h3>
              <p className="text-white">{currentHint}</p>
            </div>
          </div>
        )}

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-30">
            <div className="text-center">
              <Pause className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Battle Paused</h2>
              <button
                onClick={() => setIsPaused(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Resume Battle
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (combatState === 'victory') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Victory Particles */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 50 }, (_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-yellow-400 rounded-full animate-bounce opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            />
          ))}
        </div>

        <div className="text-center bg-black bg-opacity-70 rounded-2xl p-8 border-2 border-yellow-400 max-w-2xl mx-auto">
          <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
          <h1 className="text-4xl font-bold text-yellow-400 mb-4">🎉 VICTORY! 🎉</h1>
          <h2 className="text-2xl text-white mb-6">{villain.name} Defeated!</h2>
          
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-green-900 bg-opacity-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-400">{formatTime(battleTimer)}</div>
              <div className="text-sm text-gray-300">Battle Time</div>
            </div>
            <div className="bg-blue-900 bg-opacity-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-400">{combatSessionRef.current.finalScore}</div>
              <div className="text-sm text-gray-300">Final Score</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xl font-bold text-white mb-3">Rewards Earned:</h3>
            <div className="space-y-2">
              <div className="text-yellow-400">+{villain.rewards.experience} Experience</div>
              {Object.entries(villain.rewards.statBoosts).map(([stat, boost]) => (
                <div key={stat} className={getStatColor(stat)}>
                  +{boost} {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </div>
              ))}
            </div>
          </div>

          <div className="text-green-300 animate-pulse">
            ⭐ Returning to headquarters... ⭐
          </div>
        </div>
      </div>
    );
  }

  if (combatState === 'defeat') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center bg-black bg-opacity-70 rounded-2xl p-8 border-2 border-red-500 max-w-2xl mx-auto">
          <div className="text-6xl mb-4">💀</div>
          <h1 className="text-4xl font-bold text-red-400 mb-4">Defeat...</h1>
          <h2 className="text-2xl text-white mb-6">{villain.name} was too powerful!</h2>
          
          <div className="mb-6">
            <p className="text-gray-300 mb-4">
              Don't give up, hero! Train harder and return stronger!
            </p>
            <div className="text-blue-300">
              💡 Tip: Focus on improving your {villain.weaknesses.join(' and ')} stats!
            </div>
          </div>

          <div className="text-orange-300 animate-pulse">
            🔄 Returning to training... 🔄
          </div>
        </div>
      </div>
    );
  }

  return null;
}