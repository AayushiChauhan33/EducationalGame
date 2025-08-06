import React, { useState } from 'react';
import { Hero, Mission, GameScreen } from './types';
import { Academy, AcademyGame, GameSession, Achievement } from './types/academy';
import { academies, academyAchievements } from './data/academyData';
import OpeningSequence from './components/OpeningSequence';
import CharacterCreation from './components/CharacterCreation';
import Headquarters from './components/Headquarters';
import AcademyHub from './components/AcademyHub';
import GameInterface from './components/GameInterface';
import GameResults from './components/GameResults';
import VillainHub from './components/VillainHub';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('opening');
  const [hero, setHero] = useState<Hero | null>(null);
  const [selectedAcademy, setSelectedAcademy] = useState<Academy | null>(null);
  const [selectedGame, setSelectedGame] = useState<AcademyGame | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);

  const handleOpeningComplete = () => {
    setCurrentScreen('characterCreation');
  };

  const handleHeroCreated = (newHero: Hero) => {
    setHero(newHero);
    setCurrentScreen('headquarters');
  };

  const handleMissionSelect = (mission: Mission) => {
    console.log('Mission selected:', mission);
  };

  const handleTrainingSelect = () => {
    setCurrentScreen('academies');
  };

  const handleVillainsSelect = () => {
    setCurrentScreen('villains');
  };

  const handleAcademiesSelect = () => {
    setCurrentScreen('academies');
  };

  const handleGameSelect = (academy: Academy, game: AcademyGame) => {
    setSelectedAcademy(academy);
    setSelectedGame(game);
    setCurrentScreen('game');
  };

  const handleGameComplete = (session: GameSession) => {
    setGameSession(session);

    if (hero && selectedGame) {
      const updatedHero = { ...hero };
      const statType = selectedAcademy?.statType;
      if (statType && updatedHero.stats[statType] !== undefined) {
        updatedHero.stats[statType] += selectedGame.statReward;
        updatedHero.experience += session.score;
      }
      setHero(updatedHero);
    }

    const achievements = checkForNewAchievements(session);
    setNewAchievements(achievements);

    setCurrentScreen('results');
  };

  const checkForNewAchievements = (session: GameSession): Achievement[] => {
    const newAchievements: Achievement[] = [];

    if (session.accuracy === 100) {
      const perfectionist = academyAchievements.find(a => a.id === 'perfectionist');
      if (perfectionist && !perfectionist.unlocked) {
        newAchievements.push({ ...perfectionist, unlocked: true });
      }
    }

    if (session.timeElapsed < 30) {
      const speedDemon = academyAchievements.find(a => a.id === 'speed-demon');
      if (speedDemon && !speedDemon.unlocked) {
        newAchievements.push({ ...speedDemon, unlocked: true });
      }
    }

    return newAchievements;
  };

  const handleBackToHQ = () => {
    setCurrentScreen('headquarters');
  };

  const handleHeroUpdate = (updatedHero: Hero) => {
    setHero(updatedHero);
  };

  return (
    <div className="App">
      {currentScreen === 'opening' && (
        <OpeningSequence onComplete={handleOpeningComplete} />
      )}

      {currentScreen === 'characterCreation' && (
        <CharacterCreation onHeroCreated={handleHeroCreated} />
      )}

      {currentScreen === 'headquarters' && hero && (
        <Headquarters
          hero={hero}
          onMissionSelect={handleMissionSelect}
          onTrainingSelect={handleTrainingSelect}
          onVillainsSelect={handleVillainsSelect}
        />
      )}

      {currentScreen === 'academies' && hero && (
        <AcademyHub
          hero={hero}
          onGameSelect={handleGameSelect}
          onBackToHQ={handleBackToHQ}
        />
      )}

      {currentScreen === 'villains' && hero && (
        <VillainHub
          hero={hero}
          onBackToHQ={handleBackToHQ}
          onHeroUpdate={handleHeroUpdate}
        />
      )}

      {currentScreen === 'game' && hero && selectedAcademy && (
        <GameInterface subject={selectedAcademy.name as 'Math' | 'Science' | 'English'} 
          onGameComplete={handleGameComplete}
          />
      )}

      {currentScreen === 'results' && hero && selectedAcademy && selectedGame && gameSession && (
        <GameResults
          hero={hero}
          academy={selectedAcademy}
          game={selectedGame}
          session={gameSession}
          newAchievements={newAchievements}
          onPlayAgain={() => setCurrentScreen('game')}
          onBackToAcademy={() => setCurrentScreen('academies')}
          onBackToHQ={handleBackToHQ}
        />
      )}
    </div>
  );
}

export default App;
