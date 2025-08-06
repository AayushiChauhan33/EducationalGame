import React, { useState } from 'react';
import { Palette, Save, User, ChevronLeft, ChevronRight } from 'lucide-react';

  interface Hero {
  id: string;
  name: string;
  archetype: {
    id: string;
    name: string;
    icon: string;
    description: string;
    baseStats: { strength: number; intelligence: number; confidence: number };
    specialAbilities: string[];
    colors: string[];
  };
  appearance: {
    colorPrimary: string;
    colorSecondary: string;
    colorAccent: string;
  };
  stats: {
    strength: number;
    intelligence: number;
    confidence: number;
  };
  level: number;
  experience: number;
}

interface CharacterCreationProps {
  onHeroCreated: (hero: Hero) => void;
}

export default function CharacterCreation({ onHeroCreated }: CharacterCreationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [heroData, setHeroData] = useState({
    name: '',
    archetype: 'superwoman' as 'superwoman' | 'superman',
    appearance: {
      colorPrimary: '#DC2626',
      colorSecondary: '#1D4ED8',
      colorAccent: '#F59E0B'
    }
  });

  const steps = [
    'Choose Hero Type',
    'Customize Colors',
    'Name Your Hero',
    'Final Review'
  ];

  const colorPalettes = [
    { name: 'Classic Red & Blue', colors: ['#DC2626', '#1D4ED8', '#F59E0B'] },
    { name: 'Emerald Guardian', colors: ['#059669', '#10B981', '#34D399'] },
    { name: 'Purple Power', colors: ['#7C3AED', '#A855F7', '#C084FC'] },
    { name: 'Fire Hero', colors: ['#EA580C', '#F97316', '#FB923C'] },
    { name: 'Ice Warrior', colors: ['#0284C7', '#0EA5E9', '#38BDF8'] },
    { name: 'Shadow Guardian', colors: ['#374151', '#6B7280', '#9CA3AF'] },
    { name: 'Golden Champion', colors: ['#D97706', '#F59E0B', '#FCD34D'] },
    { name: 'Cosmic Hero', colors: ['#6366F1', '#8B5CF6', '#A78BFA'] }
  ];

const SuperwomanCharacter = ({ colors }: { colors: any }) => (
  <div className="w-64 h-96 mx-auto relative flex flex-col items-center">
    {/* Long flowing hair behind head - BEHIND everything */}
    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-32 h-48 bg-gradient-to-b from-amber-700 to-amber-800 rounded-b-full z-0" 
         style={{ clipPath: 'polygon(15% 0%, 85% 0%, 95% 100%, 5% 100%)' }}></div>
    
    {/* Cape starting from torso */}
    <div 
      className="absolute top-24 left-1/2 transform -translate-x-1/2 w-36 h-56 opacity-90 z-0"
      style={{ 
        background: `linear-gradient(180deg, ${colors.colorAccent} 0%, ${colors.colorPrimary} 100%)`,
        clipPath: 'polygon(15% 2%, 85% 2%, 100% 100%, 0% 100%)',
        borderRadius: '0 0 24px 24px'
      }}
    />
    
    {/* Head */}
    <div className="w-20 h-24 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-full relative z-20 mb-2 shadow-lg">
      {/* Hair - only bangs on forehead */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-amber-600 to-amber-700 rounded-t-full z-10"></div>
      
      {/* Eyes */}
      <div className="absolute top-7 left-3 w-5 h-4 bg-white rounded-full flex items-center justify-center shadow-inner z-30">
        <div className="w-3 h-3 bg-blue-500 rounded-full relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
        </div>
      </div>
      <div className="absolute top-7 right-3 w-5 h-4 bg-white rounded-full flex items-center justify-center shadow-inner z-30">
        <div className="w-3 h-3 bg-blue-500 rounded-full relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
        </div>
      </div>
      
      {/* Eyebrows */}
      <div className="absolute top-5 left-3 w-5 h-1.5 bg-amber-800 rounded-full z-30"></div>
      <div className="absolute top-5 right-3 w-5 h-1.5 bg-amber-800 rounded-full z-30"></div>
      
      {/* Nose */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2 h-3 bg-yellow-300 rounded-full shadow-sm z-30"></div>
      
      {/* Mouth */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-7 h-2.5 bg-red-500 rounded-full shadow-sm z-30"></div>
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-5 h-1 bg-red-600 rounded-full z-30"></div>
    </div>
    
    {/* Neck */}
    <div className="w-7 h-4 bg-yellow-200 z-20"></div>
    
    {/* Torso */}
    <div 
      className="relative z-20"
      style={{ 
        width: '120px',
        height: '128px',
        background: colors.colorPrimary,
        clipPath: 'polygon(0% 0%, 100% 0%, 85% 100%, 15% 100%)',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Emblem */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white rounded-lg flex items-center justify-center text-xl font-bold shadow-inner z-30"
           style={{ color: colors.colorPrimary }}>
        S
      </div>
    </div>
    
    {/* LEFT UPPER ARM - rotated +45 degrees */}
    <div 
      className="absolute w-5 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '106px',
        left: '70px',
        transform: 'rotate(35deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* LEFT FOREARM - angled down toward waist */}
    <div 
      className="absolute w-4 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '150px',
        left: '30px',
        transform: 'rotate(320deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* LEFT HAND - positioned at waist */}
    <div 
      className="absolute w-5 h-4 bg-yellow-200 rounded-lg shadow-lg z-40"
      style={{ 
        top: '192px',
        left: '75px'
      }}
    ></div>
    
    {/* RIGHT UPPER ARM - rotated -45 degrees */}
    <div 
      className="absolute w-5 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '106px',
        right: '70px',
        transform: 'rotate(-35deg)',
        transformOrigin: 'top center',
        WebkitTransform: 'rotate(-35deg)'
      }}
    ></div>
    
    {/* RIGHT FOREARM - angled down toward waist */}
    <div 
      className="absolute w-4 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '150px',
        right: '30px',
        transform: 'rotate(-320deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* RIGHT HAND - positioned at waist */}
    <div 
      className="absolute w-5 h-4 bg-yellow-200 rounded-lg shadow-lg z-40"
      style={{ 
        top: '192px',
        right: '75px'
      }}
    ></div>
    
    {/* Belt */}
    <div 
      className="h-4 z-20 shadow-md"
      style={{ 
        backgroundColor: colors.colorAccent,
        width: '90px'
      }}
    ></div>
    
    {/* Legs - Same length as torso (128px) */}
    <div className="flex space-x-1 z-20">
      <div 
        className="w-9 h-32 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorPrimary }}
      ></div>
      <div 
        className="w-9 h-32 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorPrimary }}
      ></div>
    </div>
    
    {/* Boots */}
    <div className="flex space-x-1 z-20 mt-1">
      <div 
        className="w-10 h-7 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorAccent }}
      ></div>
      <div 
        className="w-10 h-7 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorAccent }}
      ></div>
    </div>
    
    {/* Power aura */}
    <div className="absolute -inset-4 pointer-events-none">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-pulse opacity-60"
          style={{
            backgroundColor: colors.colorSecondary,
            left: `${30 + Math.cos(i * Math.PI / 2) * 60}%`,
            top: `${30 + Math.sin(i * Math.PI / 2) * 60}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: '2.4s'
          }}
        />
      ))}
    </div>
  </div>
);

const SupermanCharacter = ({ colors }: { colors: any }) => (
  <div className="w-64 h-96 mx-auto relative flex flex-col items-center">
    {/* Cape - behind everything */}
    <div 
      className="absolute top-24 left-1/2 transform -translate-x-1/2 w-36 h-64 opacity-90 z-0"
      style={{ 
        background: `linear-gradient(180deg, ${colors.colorAccent} 0%, ${colors.colorPrimary} 100%)`,
        clipPath: 'polygon(13% 0%, 85% 0%, 100% 100%, 0% 100%)',
        borderRadius: '0 0 24px 24px'
      }}
    />
    
    {/* Head */}
    <div className="w-20 h-24 bg-gradient-to-b from-yellow-100 to-yellow-200 rounded-lg relative z-20 mb-2 shadow-lg">
      {/* Hair */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-gradient-to-b from-gray-800 to-gray-900 rounded-t-lg z-10"></div>
      {/* Side hair */}
      <div className="absolute -top-1 left-2 w-10 h-4 bg-gray-800 rounded-lg z-10"></div>
      <div className="absolute -top-1 right-2 w-10 h-4 bg-gray-800 rounded-lg z-10"></div>
      {/* Superman curl */}
      <div className="absolute top-2 left-8 w-6 h-4 bg-gray-800 rounded-full z-15"></div>
      
      {/* Eyes */}
      <div className="absolute top-7 left-3 w-5 h-3 bg-white rounded-sm flex items-center justify-center shadow-inner z-30">
        <div className="w-3 h-2.5 bg-blue-600 rounded-sm relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0 left-0.5"></div>
        </div>
      </div>
      <div className="absolute top-7 right-3 w-5 h-3 bg-white rounded-sm flex items-center justify-center shadow-inner z-30">
        <div className="w-3 h-2.5 bg-blue-600 rounded-sm relative">
          <div className="w-1.5 h-1.5 bg-white rounded-full absolute top-0 left-0.5"></div>
        </div>
      </div>
      
      {/* Eyebrows */}
      <div className="absolute top-5 left-3 w-5 h-1.5 bg-gray-800 rounded-full z-30"></div>
      <div className="absolute top-5 right-3 w-5 h-1.5 bg-gray-800 rounded-full z-30"></div>
      
      {/* Nose */}
      <div className="absolute top-11 left-1/2 transform -translate-x-1/2 w-2.5 h-3 bg-yellow-300 rounded-sm shadow-sm z-30"></div>
      
      {/* Mouth */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-5 h-2.5 bg-red-400 rounded-sm shadow-sm z-30"></div>
    </div>
    
    {/* Neck */}
    <div className="w-7 h-3 bg-yellow-200 z-20"></div>
    
    {/* Torso */}
    <div 
      className="relative z-20"
      style={{ 
        width: '128px',
        height: '128px',
        background: colors.colorPrimary,
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Emblem */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-14 h-14 bg-white rounded-lg flex items-center justify-center text-xl font-bold shadow-inner z-30"
           style={{ color: colors.colorPrimary }}>
        S
      </div>
    </div>
    
    {/* LEFT UPPER ARM - rotated +45 degrees */}
    <div 
      className="absolute w-6 h-20 rounded-lg shadow-lg z-50"
      style={{ 
        background: colors.colorPrimary,
        top: '106px',
        left: '64px',
        transform: 'rotate(45deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* LEFT FOREARM - angled down toward waist */}
    <div 
      className="absolute w-5 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '155px',
        left: '20px',
        transform: 'rotate(325deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* LEFT HAND - positioned at waist */}
    <div 
      className="absolute w-6 h-5 bg-yellow-200 rounded-lg shadow-lg z-40"
      style={{ 
        top: '200px',
        left: '60px'
      }}
    ></div>
    
    {/* RIGHT UPPER ARM - rotated -45 degrees */}
    <div 
      className="absolute w-6 h-20 rounded-lg shadow-lg z-50"
      style={{ 
        background: colors.colorPrimary,
        top: '106px',
        right: '64px',
        transform: 'rotate(-45deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* RIGHT FOREARM - rotated inward toward waist */}
    <div 
      className="absolute w-5 h-16 rounded-lg shadow-lg z-40"
      style={{ 
        background: colors.colorPrimary,
        top: '155px',
        right: '20px',
        transform: 'rotate(-325deg)',
        transformOrigin: 'top center'
      }}
    ></div>
    
    {/* RIGHT HAND - positioned at waist */}
    <div 
      className="absolute w-6 h-5 bg-yellow-200 rounded-lg shadow-lg z-40"
      style={{ 
        top: '200px',
        right: '60px'
      }}
    ></div>
    
    {/* Belt */}
    <div 
      className="h-4 z-20 shadow-md"
      style={{ 
        backgroundColor: colors.colorAccent,
        width: '128px'
      }}
    ></div>
    
    {/* Legs */}
    <div className="flex space-x-2 z-20">
      <div 
        className="w-12 h-32 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorPrimary }}
      ></div>
      <div 
        className="w-12 h-32 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorPrimary }}
      ></div>
    </div>
    
    {/* Boots */}
    <div className="flex space-x-2 z-20 mt-1">
      <div 
        className="w-12 h-8 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorAccent }}
      ></div>
      <div 
        className="w-12 h-8 rounded-lg shadow-md"
        style={{ backgroundColor: colors.colorAccent }}
      ></div>
    </div>
    
    {/* Power aura */}
    <div className="absolute -inset-4 pointer-events-none">
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full animate-pulse opacity-60"
          style={{
            backgroundColor: colors.colorSecondary,
            left: `${30 + Math.cos(i * Math.PI / 2) * 60}%`,
            top: `${30 + Math.sin(i * Math.PI / 2) * 60}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: '2.4s'
          }}
        />
      ))}
    </div>
  </div>
);




const createHero = () => {
  const newHero = {
    id: Date.now().toString(),
    name: heroData.name || (heroData.archetype === 'superwoman' ? 'Wonder Woman' : 'Super Man'),
    archetype: {
      id: heroData.archetype,
      name: heroData.archetype === 'superwoman' ? 'Superwoman' : 'Superman',
      icon: heroData.archetype === 'superwoman' ? '🦸‍♀️' : '🦸‍♂️',
      description: heroData.archetype === 'superwoman' ? 'Graceful and powerful hero' : 'Strong and courageous champion',
      baseStats: { strength: 50, intelligence: 50, confidence: 50 },
      specialAbilities: ['Super Strength', 'Flight', 'Hero Vision'],
      colors: [heroData.appearance.colorPrimary, heroData.appearance.colorSecondary, heroData.appearance.colorAccent]
    },
    appearance: heroData.appearance,
    stats: { 
      strength: 50, 
      intelligence: 50, 
      confidence: 50 
    },
    level: 1,
    experience: 0
  };
  onHeroCreated(newHero);
};

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      createHero();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Progress bar */}
      <div className="bg-black bg-opacity-30 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={`flex items-center ${index <= currentStep ? 'text-yellow-400' : 'text-gray-400'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm font-bold ${
                  index <= currentStep ? 'border-yellow-400 bg-yellow-400 text-black' : 'border-gray-400'
                }`}>
                  {index + 1}
                </div>
                <span className="ml-3 hidden sm:inline font-semibold">{step}</span>
                {index < steps.length - 1 && (
                  <div className={`w-12 h-1 mx-4 rounded ${index < currentStep ? 'bg-yellow-400' : 'bg-gray-400'}`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Character Preview */}
          <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-purple-500 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">Hero Preview</h3>
            <div className="relative bg-gradient-to-b from-blue-900 to-purple-900 rounded-lg p-4">
              {heroData.archetype === 'superwoman' ? 
                <SuperwomanCharacter colors={heroData.appearance} /> : 
                <SupermanCharacter colors={heroData.appearance} />
              }
              
              {/* Character info */}
              <div className="text-center mt-6 bg-black bg-opacity-40 rounded-lg p-4">
                <h4 className="text-2xl font-bold text-white">{heroData.name || (heroData.archetype === 'superwoman' ? 'Wonder Woman' : 'Super Man')}</h4>
                <p className="text-purple-300 text-lg capitalize">{heroData.archetype}</p>
                <div className="flex justify-center space-x-2 mt-3">
                  <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorPrimary }}></div>
                  <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorSecondary }}></div>
                  <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorAccent }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Creation Steps */}
          <div className="bg-black bg-opacity-50 rounded-xl p-6 border border-blue-500 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-6">{steps[currentStep]}</h3>
            
            {/* Step 0: Archetype Selection */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div
                  className={`p-6 rounded-lg border-3 cursor-pointer transition-all transform hover:scale-105 ${
                    heroData.archetype === 'superwoman'
                      ? 'border-pink-400 bg-pink-400 bg-opacity-20 shadow-lg shadow-pink-400/50'
                      : 'border-gray-600 hover:border-pink-400 bg-gray-800 bg-opacity-50'
                  }`}
                  onClick={() => setHeroData({ ...heroData, archetype: 'superwoman' })}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-6xl">🦸‍♂️</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">Superwoman</h4>
                      <p className="text-gray-300 text-lg">Graceful, powerful, and inspiring. A beacon of hope with flowing cape and elegant strength.</p>
                      <div className="flex space-x-4 mt-3 text-lg">
                        <span className="text-pink-400">💪 Strong</span>
                        <span className="text-blue-400">🧠 Wise</span>
                        <span className="text-yellow-400">✨ Inspiring</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-6 rounded-lg border-3 cursor-pointer transition-all transform hover:scale-105 ${
                    heroData.archetype === 'superman'
                      ? 'border-blue-400 bg-blue-400 bg-opacity-20 shadow-lg shadow-blue-400/50'
                      : 'border-gray-600 hover:border-blue-400 bg-gray-800 bg-opacity-50'
                  }`}
                  onClick={() => setHeroData({ ...heroData, archetype: 'superman' })}
                >
                  <div className="flex items-center space-x-6">
                    <div className="text-6xl">🦸‍♂️</div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">Superman</h4>
                      <p className="text-gray-300 text-lg">Bold, heroic, and commanding. The classic symbol of justice with unmatched courage.</p>
                      <div className="flex space-x-4 mt-3 text-lg">
                        <span className="text-red-400">💪 Mighty</span>
                        <span className="text-green-400">🛡️ Defender</span>
                        <span className="text-blue-400">⚡ Swift</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Color Customization */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Palette className="w-6 h-6 mr-3" />
                    Choose Your Heroic Colors
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {colorPalettes.map((palette) => (
                      <div
                        key={palette.name}
                        className="p-4 rounded-lg border-2 cursor-pointer hover:border-gray-400 transition-all transform hover:scale-105 bg-gray-800 bg-opacity-50"
                        onClick={() => setHeroData({
                          ...heroData,
                          appearance: {
                            colorPrimary: palette.colors[0],
                            colorSecondary: palette.colors[1],
                            colorAccent: palette.colors[2]
                          }
                        })}
                      >
                        <div className="flex space-x-2 mb-3">
                          {palette.colors.map((color, i) => (
                            <div key={i} className="w-8 h-8 rounded-lg border-2 border-white shadow-md" style={{ backgroundColor: color }} />
                          ))}
                        </div>
                        <p className="text-white font-semibold">{palette.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg">
                  <h5 className="text-white font-semibold mb-3">Current Color Scheme:</h5>
                  <div className="flex space-x-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg border-2 border-white mx-auto mb-2" style={{ backgroundColor: heroData.appearance.colorPrimary }}></div>
                      <p className="text-sm text-gray-300">Primary</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg border-2 border-white mx-auto mb-2" style={{ backgroundColor: heroData.appearance.colorSecondary }}></div>
                      <p className="text-sm text-gray-300">Secondary</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-lg border-2 border-white mx-auto mb-2" style={{ backgroundColor: heroData.appearance.colorAccent }}></div>
                      <p className="text-sm text-gray-300">Accent</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Name Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-white mb-3 text-xl font-semibold flex items-center">
                    <User className="w-6 h-6 mr-3" />
                    Hero Name
                  </label>
                  <input
                    type="text"
                    value={heroData.name}
                    onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                    placeholder={`Enter your ${heroData.archetype} name...`}
                    className="w-full bg-gray-800 text-white rounded-lg p-4 border-2 border-gray-600 focus:border-blue-400 focus:outline-none text-lg"
                  />
                </div>
                
                <div className="bg-gray-800 bg-opacity-50 p-6 rounded-lg">
                  <h4 className="text-white font-semibold mb-4 text-lg">Suggested Names:</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {heroData.archetype === 'superwoman' ? 
                      ['Wonder Woman', 'Power Girl', 'Lady Lightning', 'Cosmic Guardian', 'Star Defender', 'Phoenix Warrior'].map((name, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroData({ ...heroData, name })}
                          className="text-left p-3 text-pink-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors text-lg font-medium"
                        >
                          {name}
                        </button>
                      )) :
                      ['Super Man', 'Captain Thunder', 'Steel Guardian', 'Mighty Defender', 'Storm Warrior', 'Cosmic Champion'].map((name, i) => (
                        <button
                          key={i}
                          onClick={() => setHeroData({ ...heroData, name })}
                          className="text-left p-3 text-blue-300 hover:text-white hover:bg-gray-700 rounded-lg transition-colors text-lg font-medium"
                        >
                          {name}
                        </button>
                      ))
                    }
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Final Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-800 to-blue-800 bg-opacity-50 p-6 rounded-lg border border-purple-400">
                  <h4 className="text-2xl font-bold text-white mb-6 flex items-center">
                    🦸‍♂️ Your Hero Summary
                  </h4>
                  <div className="space-y-4 text-white">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">📛</span>
                      <span className="text-lg"><strong>Name:</strong> {heroData.name || (heroData.archetype === 'superwoman' ? 'Wonder Woman' : 'Super Man')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{heroData.archetype === 'superwoman' ? '👩‍🦸' : '🦸‍♂️'}</span>
                      <span className="text-lg"><strong>Type:</strong> {heroData.archetype === 'superwoman' ? 'Superwoman' : 'Superman'}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">🎨</span>
                      <span className="text-lg"><strong>Color Scheme:</strong></span>
                      <div className="flex space-x-2 ml-2">
                        <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorPrimary }}></div>
                        <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorSecondary }}></div>
                        <div className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: heroData.appearance.colorAccent }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-800 bg-opacity-30 border-2 border-green-500 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl mb-3">🎉</div>
                    <p className="text-green-300 text-xl font-semibold">
                      Ready to begin your heroic journey!
                    </p>
                    <p className="text-green-200 mt-2">
                      Your superhero is perfectly crafted and ready to save the world!
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="px-8 py-3 bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors flex items-center space-x-2 text-lg font-semibold"
              >
                <ChevronLeft className="w-5 h-5" />
                <span>Previous</span>
              </button>
              
              <button
                onClick={nextStep}
                className={`px-8 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center space-x-2 text-lg ${
                  currentStep === steps.length - 1
                    ? 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-500/50'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/50'
                }`}
              >
                {currentStep === steps.length - 1 ? (
                  <>
                    <Save className="w-5 h-5" />
                    <span>Create Hero!</span>
                  </>
                ) : (
                  <>
                    <span>Next</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}