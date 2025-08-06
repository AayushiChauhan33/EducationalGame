import React, { useState, useEffect } from 'react';
import { Zap, Shield, Star, Sparkles, Skull, Flame, Eye, Swords } from 'lucide-react';

interface OpeningSequenceProps {
  onComplete: () => void;
}

export default function OpeningSequence({ onComplete }: OpeningSequenceProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentScene(1), 2000);
    const timer2 = setTimeout(() => setCurrentScene(2), 5000);
    const timer3 = setTimeout(() => setCurrentScene(3), 7500);
    const timer4 = setTimeout(() => setShowTitle(true), 10000);
    const timer5 = setTimeout(() => setShowContinue(true), 12000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // Enhanced sparkling stars
  const sparklingStars = Array.from({ length: 40 }, (_, i) => (
    <div
      key={`star-${i}`}
      className="absolute"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 80}%`,
        animationDelay: `${Math.random() * 3}s`,
        animation: `starSparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
      }}
    >
      <div className="relative">
        <div className="w-1 h-1 bg-white rounded-full"></div>
        <div className="absolute top-0 left-0 w-1 h-4 bg-gradient-to-t from-transparent via-white to-transparent opacity-80 transform -translate-y-1.5 -translate-x-0.5"></div>
        <div className="absolute top-0 left-0 w-4 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-80 transform -translate-x-1.5 -translate-y-0.5"></div>
        <div className="absolute top-0 left-0 w-3 h-3 bg-white rounded-full opacity-20 blur-sm transform -translate-x-1 -translate-y-1"></div>
      </div>
    </div>
  ));

  // Flying heroes on hero side
  const flyingHeroes = Array.from({ length: 4 }, (_, i) => (
    <div
      key={`flying-hero-${i}`}
      className="absolute"
      style={{
        left: `${-20}%`,
        top: `${25 + i * 15}%`,
        animation: `flyHeroSide ${5 + i * 0.5}s linear infinite`,
        animationDelay: `${i * 1.5}s`,
      }}
    >
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-300 rounded-full flex items-center justify-center shadow-lg border border-blue-200">
          {i % 4 === 0 && <Zap className="w-4 h-4 text-white" />}
          {i % 4 === 1 && <Shield className="w-4 h-4 text-white" />}
          {i % 4 === 2 && <Flame className="w-4 h-4 text-white" />}
          {i % 4 === 3 && <Star className="w-4 h-4 text-white" />}
        </div>
        <div className="absolute top-2 -left-12 w-12 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full opacity-70"></div>
        <div className="absolute top-3 -left-8 w-8 h-0.5 bg-gradient-to-r from-cyan-300 to-transparent rounded-full opacity-50"></div>
      </div>
    </div>
  ));

  // Flying villains on villain side
  const flyingVillains = Array.from({ length: 3 }, (_, i) => (
    <div
      key={`flying-villain-${i}`}
      className="absolute"
      style={{
        right: `${-20}%`,
        top: `${30 + i * 20}%`,
        animation: `flyVillainSide ${6 + i * 0.5}s linear infinite`,
        animationDelay: `${i * 2}s`,
      }}
    >
      <div className="relative">
        <div className="w-7 h-7 bg-gradient-to-br from-red-600 to-purple-800 rounded-full flex items-center justify-center shadow-lg border border-red-400">
          {i % 3 === 0 && <Skull className="w-3 h-3 text-red-200" />}
          {i % 3 === 1 && <Eye className="w-3 h-3 text-red-200" />}
          {i % 3 === 2 && <Swords className="w-3 h-3 text-red-200" />}
        </div>
        <div className="absolute top-2 right-0 w-10 h-1 bg-gradient-to-l from-red-600 to-transparent rounded-full opacity-70"></div>
      </div>
    </div>
  ));

  // Enhanced hero buildings with better depth and detail
  const heroBuildingsLeft = Array.from({ length: 12 }, (_, i) => {
    const height = 140 + Math.random() * 80;
    const width = 30 + Math.random() * 15;
    return (
      <div
        key={`hero-building-${i}`}
        className="relative group"
        style={{ height: `${height}px`, width: `${width}px` }}
      >
        {/* Main building with enhanced depth layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800 to-blue-600 border-r border-blue-500/40 shadow-2xl rounded-t-sm">
          {/* Enhanced building depth shadow - multiple layers */}
          <div className="absolute -right-3 top-3 bottom-1 w-3 bg-gradient-to-b from-blue-950 to-blue-900 opacity-90 skew-y-2 rounded-r-sm"></div>
          <div className="absolute -right-1.5 top-1.5 bottom-0.5 w-1.5 bg-gradient-to-b from-blue-800 to-blue-950 opacity-60 skew-y-1"></div>
          
          {/* Side panel for depth */}
          <div className="absolute -left-1 top-2 bottom-0 w-1 bg-gradient-to-b from-blue-700 to-blue-900 opacity-70 -skew-y-1"></div>
          
          {/* Perfect glowing windows in organized rows */}
          {Array.from({ length: Math.floor(height / 28) }, (_, row) => (
            <div key={row} className="flex justify-center gap-3 absolute w-full" style={{ top: `${22 + row * 28}px` }}>
              {Array.from({ length: 2 }, (_, col) => (
                <div
                  key={col}
                  className="w-3 h-5 bg-gradient-to-b from-cyan-100 to-cyan-300 rounded-sm animate-pulse shadow-lg border border-cyan-200 relative"
                  style={{
                    boxShadow: '0 0 18px rgba(103, 232, 249, 1), inset 0 0 10px rgba(255, 255, 255, 0.4)',
                    animationDelay: `${(row + col) * 0.3}s`,
                    animationDuration: `${2 + Math.random() * 1}s`,
                  }}
                >
                  {/* Window frame */}
                  <div className="absolute inset-0.5 border border-white/30 rounded-sm"></div>
                  {/* Inner glow */}
                  <div className="absolute inset-1 bg-gradient-to-b from-white/40 to-cyan-200/40 rounded-sm"></div>
                </div>
              ))}
            </div>
          ))}
          
          {/* Enhanced rooftop details */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-3">
            <div className="w-5 h-7 bg-gradient-to-t from-blue-600 via-blue-500 to-cyan-300 rounded-t-lg border border-cyan-200 shadow-xl relative">
              <div className="w-2.5 h-2.5 bg-gradient-to-b from-white to-cyan-200 rounded-full mx-auto mt-1.5 animate-pulse border border-white/50" style={{ boxShadow: '0 0 10px rgba(103, 232, 249, 0.8)' }}></div>
              {/* Antenna */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 w-0.5 h-4 bg-gradient-to-t from-cyan-400 to-white"></div>
            </div>
          </div>
          
          {/* Enhanced building glow and energy */}
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-400/25 via-blue-400/15 to-blue-300/5 rounded-t-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent animate-pulse"></div>
          
          {/* Building highlights */}
          <div className="absolute top-0 left-1 right-1 h-2 bg-gradient-to-r from-transparent via-cyan-300/30 to-transparent rounded-t-sm"></div>
          <div className="absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b from-cyan-400/20 to-transparent"></div>
        </div>
      </div>
    );
  });

  // Enhanced villain buildings with damage and destruction
  const villainBuildingsRight = Array.from({ length: 12 }, (_, i) => {
    const height = 100 + Math.random() * 120;
    const width = 25 + Math.random() * 20;
    const isDamaged = Math.random() > 0.4;
    const isCollapsed = Math.random() > 0.7;
    
    return (
      <div
        key={`villain-building-${i}`}
        className="relative"
        style={{ 
          height: `${height}px`, 
          width: `${width}px`,
          transform: i % 3 === 0 ? 'skew(-3deg)' : i % 4 === 0 ? 'skew(2deg)' : 'none',
        }}
      >
        {/* Main damaged building */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-gray-900 via-red-900 to-gray-800 border-l border-red-900/50 shadow-2xl"
          style={{
            clipPath: isCollapsed ? 'polygon(0 0, 100% 0, 85% 60%, 70% 100%, 0 100%)' : 'none'
          }}
        >
          {/* Building depth shadow (darker for villains) */}
          <div className="absolute -left-2 top-2 bottom-0 w-2 bg-gradient-to-b from-black to-gray-900 opacity-90 -skew-y-1"></div>
          
          {/* Broken/flickering windows - fewer and more scattered */}
          {Array.from({ length: Math.floor(Math.random() * 6) + 2 }, (_, j) => {
            const isWorking = Math.random() > 0.6;
            return (
              <div
                key={j}
                className={`absolute rounded-sm shadow-lg ${isWorking ? 'bg-red-400' : 'bg-gray-800'}`}
                style={{
                  width: Math.random() > 0.5 ? '8px' : '6px',
                  height: Math.random() > 0.5 ? '10px' : '12px',
                  left: `${15 + (j % 2) * 40 + Math.random() * 10}%`,
                  top: `${25 + Math.floor(j / 2) * 35 + Math.random() * 10}%`,
                  boxShadow: isWorking ? '0 0 12px rgba(248, 113, 113, 0.8)' : '0 0 3px rgba(0, 0, 0, 0.5)',
                  animation: isWorking ? `flicker ${1 + Math.random() * 2}s ease-in-out infinite` : 'none',
                  animationDelay: `${Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 10 - 5}deg)`,
                }}
              />
            );
          })}
          
          {/* Major damage effects */}
          {isDamaged && (
            <>
              <div 
                className="absolute bg-black rounded-lg opacity-90 border border-gray-700"
                style={{
                  width: `${20 + Math.random() * 25}px`,
                  height: `${15 + Math.random() * 20}px`,
                  left: `${Math.random() * 50}%`,
                  top: `${20 + Math.random() * 50}%`,
                }}
              />
              {/* Cracks */}
              <div 
                className="absolute bg-gray-600 opacity-70"
                style={{
                  width: '2px',
                  height: `${30 + Math.random() * 40}px`,
                  left: `${Math.random() * 80}%`,
                  top: `${Math.random() * 60}%`,
                  transform: `rotate(${Math.random() * 45}deg)`,
                }}
              />
            </>
          )}
          
          {/* Villain building darkness and evil energy */}
          <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 via-purple-900/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-600/10 to-transparent animate-pulse"></div>
        </div>
      </div>
    );
  });

  // Smoke effects for villain side
  const smokeEffects = Array.from({ length: 8 }, (_, i) => (
    <div
      key={`smoke-${i}`}
      className="absolute"
      style={{
        right: `${Math.random() * 40}%`,
        bottom: `${100 + Math.random() * 80}px`,
        animation: `smokeRise ${4 + Math.random() * 3}s ease-out infinite`,
        animationDelay: `${Math.random() * 5}s`,
      }}
    >
      <div 
        className="w-6 h-6 bg-gray-700 rounded-full opacity-60 blur-sm"
        style={{
          background: `radial-gradient(circle, rgba(75, 85, 99, 0.8) 0%, rgba(31, 41, 55, 0.4) 70%, transparent 100%)`,
        }}
      />
    </div>
  ));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Split gradient background - blue to red */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-purple-900 to-red-900"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/50 to-black/80"></div>

      {/* Background fade overlay when title shows - optimized for readability */}
      <div className={`absolute inset-0 transition-all duration-3000 z-35 ${showTitle ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-black/85"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40"></div>
        <div className="absolute inset-0 backdrop-blur-sm"></div>
      </div>

      {/* Enhanced CSS animations */}
      <style>
        {`
          @keyframes starSparkle {
            0%, 100% { 
              opacity: 0.3;
              transform: scale(0.8);
            }
            50% { 
              opacity: 1;
              transform: scale(1.2);
            }
          }
          
          @keyframes flyHeroSide {
            0% { 
              transform: translateX(-50px); 
              opacity: 0;
            }
            20% { 
              opacity: 1;
            }
            80% { 
              opacity: 1;
            }
            100% { 
              transform: translateX(60vw); 
              opacity: 0;
            }
          }
          
          @keyframes flyVillainSide {
            0% { 
              transform: translateX(50px); 
              opacity: 0;
            }
            20% { 
              opacity: 1;
            }
            80% { 
              opacity: 1;
            }
            100% { 
              transform: translateX(-60vw); 
              opacity: 0;
            }
          }
          
          @keyframes flicker {
            0%, 100% { opacity: 0.2; }
            15% { opacity: 0.9; }
            30% { opacity: 0.1; }
            45% { opacity: 0.8; }
            60% { opacity: 0.05; }
            75% { opacity: 0.95; }
            90% { opacity: 0.3; }
          }
          
          @keyframes smokeRise {
            0% {
              transform: translateY(0) scale(0.5);
              opacity: 0.8;
            }
            50% {
              transform: translateY(-40px) scale(1);
              opacity: 0.6;
            }
            100% {
              transform: translateY(-80px) scale(1.5);
              opacity: 0;
            }
          }
          
          @keyframes heroGlow {
            0%, 100% { 
              box-shadow: 0 0 30px rgba(59, 130, 246, 0.6);
            }
            50% { 
              box-shadow: 0 0 50px rgba(59, 130, 246, 0.9), 0 0 80px rgba(103, 232, 249, 0.4);
            }
          }
          
          @keyframes villainPulse {
            0%, 100% { 
              box-shadow: 0 0 30px rgba(220, 38, 38, 0.6);
            }
            50% { 
              box-shadow: 0 0 50px rgba(220, 38, 38, 0.9), 0 0 80px rgba(147, 51, 234, 0.4);
            }
          }
          
          @keyframes titleAppear {
            0% {
              opacity: 0;
              transform: scale(0.5) translateY(50px);
              filter: blur(20px);
            }
            50% {
              opacity: 0.8;
              transform: scale(1.1) translateY(-10px);
              filter: blur(5px);
            }
            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
              filter: blur(0px);
            }
          }
          
          @keyframes subtitleSlide {
            0% {
              opacity: 0;
              transform: translateY(30px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Enhanced sparkling stars */}
      <div className="absolute inset-0 z-10">{sparklingStars}</div>
      
      {/* Flying heroes and villains */}
      <div className="absolute inset-0 z-20">{flyingHeroes}</div>
      <div className="absolute inset-0 z-20">{flyingVillains}</div>

      {/* Smoke effects on villain side */}
      <div className="absolute inset-0 z-25">{smokeEffects}</div>

      {/* Split city skyline */}
      <div className="absolute bottom-0 left-0 right-0 z-30">
        <div className="flex">
          {/* Hero side - left half */}
          <div className="w-1/2 flex items-end justify-end">
            {heroBuildingsLeft}
          </div>
          {/* Villain side - right half */}
          <div className="w-1/2 flex items-end justify-start">
            {villainBuildingsRight}
          </div>
        </div>
        
        {/* Enhanced split base glow */}
        <div className="absolute bottom-0 left-0 w-1/2 h-32 bg-gradient-to-t from-cyan-400/40 via-blue-400/25 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-32 bg-gradient-to-t from-red-500/40 via-purple-600/20 to-transparent"></div>
        
        {/* Ground reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-cyan-900/30 via-purple-900/20 to-red-900/30"></div>
      </div>

      {/* Scene 2: Villain on right side - shifted more right */}
      <div className={`absolute inset-0 z-40 transition-opacity duration-1000 ${currentScene >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/3" style={{ right: '15%' }}>
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-red-600 to-purple-800 rounded-full flex items-center justify-center shadow-2xl border-2 border-red-400" style={{ animation: 'villainPulse 2s ease-in-out infinite' }}>
              <Skull className="w-14 h-14 text-red-200" />
            </div>
            <div className="absolute -inset-6 bg-red-600 rounded-full opacity-20 animate-pulse blur-xl"></div>
            <div className="absolute -inset-3 bg-purple-600 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Scene 3: Hero on left side - shifted more left */}
      <div className={`absolute inset-0 z-40 transition-opacity duration-1000 ${currentScene >= 3 ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute top-1/3" style={{ left: '15%' }}>
          <div className="relative">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-2xl border-2 border-blue-300" style={{ animation: 'heroGlow 2s ease-in-out infinite' }}>
              <Zap className="w-14 h-14 text-white" />
            </div>
            <div className="absolute -inset-6 bg-blue-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
            <div className="absolute -inset-3 bg-cyan-400 rounded-full opacity-30 animate-ping"></div>
          </div>
        </div>
      </div>

      {/* Epic title in center with enhanced visibility and animation */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center z-50 transition-all duration-3000 ${showTitle ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
        <div className="text-center relative">
          {/* Enhanced title background glow - optimized for readability */}
          <div className="absolute -inset-40 bg-gradient-to-r from-blue-400/20 via-white/25 to-red-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -inset-24 bg-black/60 rounded-full blur-2xl"></div>
          <div className="absolute -inset-16 bg-gradient-to-r from-cyan-300/15 via-white/30 to-red-300/15 rounded-full blur-xl"></div>
          
          {/* Main title with enhanced contrast */}
          <h1 className={`relative text-9xl font-black mb-4 ${showTitle ? '' : ''}`}
              style={{ 
                color: '#ffffff',
                textShadow: `
                  0 0 40px rgba(255,255,255,0.9),
                  0 0 80px rgba(255,255,255,0.6),
                  0 0 120px rgba(255,255,255,0.3),
                  0 0 5px rgba(0,0,0,0.8),
                  2px 2px 4px rgba(0,0,0,0.9)
                `,
                fontWeight: '900',
                letterSpacing: '0.05em',
                animation: showTitle ? 'titleAppear 2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards' : 'none',
                WebkitTextStroke: '1px rgba(255,255,255,0.3)'
              }}>
            HERO
          </h1>
          <h2 className={`relative text-6xl font-bold mb-12 ${showTitle ? '' : ''}`}
              style={{ 
                color: '#ffffff',
                textShadow: `
                  0 0 30px rgba(255,255,255,0.8),
                  0 0 60px rgba(255,255,255,0.5),
                  0 0 3px rgba(0,0,0,0.8),
                  2px 2px 4px rgba(0,0,0,0.9)
                `,
                fontWeight: '800',
                letterSpacing: '0.1em',
                animation: showTitle ? 'subtitleSlide 1.5s ease-out forwards' : 'none',
                animationDelay: '0.5s',
                opacity: showTitle ? '1' : '0',
                WebkitTextStroke: '0.5px rgba(255,255,255,0.2)'
              }}>
            ACADEMY
          </h2>
          
          {/* Subtitle with enhanced contrast */}
          <p className={`relative text-2xl text-white mb-6 font-light ${showTitle ? '' : ''}`} 
             style={{ 
               textShadow: `
                 0 0 20px rgba(255,255,255,0.9),
                 0 0 40px rgba(255,255,255,0.6),
                 1px 1px 3px rgba(0,0,0,0.8)
               `,
               animation: showTitle ? 'subtitleSlide 1.5s ease-out forwards' : 'none',
               animationDelay: '1s',
               opacity: showTitle ? '1' : '0'
             }}>
            Where Heroes Rise to Face the Darkness
          </p>
          <p className={`relative text-lg text-gray-100 mb-16 max-w-2xl mx-auto leading-relaxed ${showTitle ? '' : ''}`} 
             style={{ 
               textShadow: `
                 0 0 15px rgba(255,255,255,0.8),
                 0 0 30px rgba(255,255,255,0.5),
                 1px 1px 2px rgba(0,0,0,0.7)
               `,
               animation: showTitle ? 'subtitleSlide 1.5s ease-out forwards' : 'none',
               animationDelay: '1.5s',
               opacity: showTitle ? '1' : '0'
             }}>
            Choose your side. Master your destiny. The fate of the world hangs in the balance.
          </p>
        </div>
      </div>

      {/* Epic continue button */}
      {showContinue && (
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-50">
          <button
            onClick={onComplete}
            className="group px-12 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white font-bold text-xl rounded-full shadow-2xl hover:shadow-white/30 transition-all duration-300 hover:scale-110 border-2 border-white/40 relative overflow-hidden"
            style={{ textShadow: '0 0 10px rgba(0,0,0,0.5)' }}
          >
            <span className="relative z-10">Join the Academy</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-800"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-red-600 rounded-full opacity-0 group-hover:opacity-40 blur-lg transition-opacity duration-300"></div>
          </button>
        </div>
      )}

      {/* Narrative text */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className={`bg-black/70 backdrop-blur-md rounded-xl px-10 py-6 text-white text-center transition-all duration-1500 border border-white/30 ${currentScene >= 1 && currentScene < 3 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          {currentScene === 1 && (
            <p className="text-xl font-medium" style={{ textShadow: '0 0 15px rgba(255,255,255,0.4)' }}>
              A world divided between light and shadow...
            </p>
          )}
          {currentScene === 2 && (
            <p className="text-xl font-medium text-red-300" style={{ textShadow: '0 0 15px rgba(248, 113, 113, 0.6)' }}>
              Where ancient darkness seeks to consume all hope...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}