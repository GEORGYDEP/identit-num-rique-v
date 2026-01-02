import React, { useState, useCallback } from 'react';
import { LevelId, LevelProgress } from './types';
import IntroScreen from './components/IntroScreen';
import GroupsLevel from './levels/GroupsLevel';
import IdentityLevel from './levels/IdentityLevel';
import TracesLevel from './levels/TracesLevel';
import RgpdLevel from './levels/RgpdLevel';
import SecurityLevel from './levels/SecurityLevel';
import FinalSummary from './components/FinalSummary';
import { Award, Map, RefreshCcw, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<LevelId>(LevelId.INTRO);
  const [progress, setProgress] = useState<LevelProgress[]>([
    { id: LevelId.INTRO, completed: true, score: 0 },
    { id: LevelId.GROUPS, completed: false, score: 0 },
    { id: LevelId.IDENTITY, completed: false, score: 0 },
    { id: LevelId.TRACES, completed: false, score: 0 },
    { id: LevelId.RGPD, completed: false, score: 0 },
    { id: LevelId.SECURITY, completed: false, score: 0 },
  ]);

  const updateProgress = (levelId: LevelId, score: number) => {
    setProgress(prev => prev.map(p => 
      p.id === levelId ? { ...p, completed: true, score } : p
    ));
  };

  const nextLevel = () => {
    const sequence = [
      LevelId.INTRO, 
      LevelId.GROUPS, 
      LevelId.IDENTITY, 
      LevelId.TRACES, 
      LevelId.RGPD, 
      LevelId.SECURITY, 
      LevelId.CONCLUSION
    ];
    const currentIndex = sequence.indexOf(currentLevel);
    if (currentIndex < sequence.length - 1) {
      setCurrentLevel(sequence[currentIndex + 1]);
    }
  };

  const resetGame = useCallback(() => {
    setCurrentLevel(LevelId.INTRO);
    setProgress([
      { id: LevelId.INTRO, completed: true, score: 0 },
      { id: LevelId.GROUPS, completed: false, score: 0 },
      { id: LevelId.IDENTITY, completed: false, score: 0 },
      { id: LevelId.TRACES, completed: false, score: 0 },
      { id: LevelId.RGPD, completed: false, score: 0 },
      { id: LevelId.SECURITY, completed: false, score: 0 },
    ]);
  }, []);

  const renderLevel = () => {
    switch (currentLevel) {
      case LevelId.INTRO:
        return <IntroScreen onStart={nextLevel} />;
      case LevelId.GROUPS:
        return <GroupsLevel onComplete={(score) => { updateProgress(LevelId.GROUPS, score); nextLevel(); }} />;
      case LevelId.IDENTITY:
        return <IdentityLevel onComplete={(score) => { updateProgress(LevelId.IDENTITY, score); nextLevel(); }} />;
      case LevelId.TRACES:
        return <TracesLevel onComplete={(score) => { updateProgress(LevelId.TRACES, score); nextLevel(); }} />;
      case LevelId.RGPD:
        return <RgpdLevel onComplete={(score) => { updateProgress(LevelId.RGPD, score); nextLevel(); }} />;
      case LevelId.SECURITY:
        return <SecurityLevel onComplete={(score) => { updateProgress(LevelId.SECURITY, score); nextLevel(); }} />;
      case LevelId.CONCLUSION:
        return <FinalSummary progress={progress} onRestart={resetGame} />;
      default:
        return <IntroScreen onStart={nextLevel} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col transition-all duration-700 bg-[#030712] text-white overflow-x-hidden">
      {/* Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" 
             style={{ background: 'radial-gradient(circle at 15% 50%, #3b82f6 0%, transparent 25%), radial-gradient(circle at 85% 30%, #ea580c 0%, transparent 25%)' }}>
        </div>
      </div>

      <header className="relative z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex justify-between items-center sticky top-0">
        <div className="flex items-center gap-4">
            <div className="bg-orange-600 p-2 rounded-xl shadow-[0_0_20px_rgba(234,88,12,0.3)]">
                <Zap className="text-white w-6 h-6" />
            </div>
            <div>
                <h1 className="text-xl font-black text-white leading-none tracking-tighter uppercase italic">UAA4 Quest</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Technique Secondaire</p>
            </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 px-5 py-2.5 rounded-2xl border border-white/10">
            <Award className="w-5 h-5 text-orange-500" />
            <span className="font-black text-white text-xl leading-none">
              {progress.reduce((acc, curr) => acc + curr.score, 0)}
            </span>
          </div>
          <button 
            onClick={resetGame}
            className="p-2 hover:bg-white/10 rounded-full text-slate-400 transition-colors transform active:rotate-180 duration-500"
            title="Réinitialiser"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="relative z-10 flex-grow flex flex-col max-w-6xl mx-auto w-full p-8 pb-24">
        {renderLevel()}
      </main>

      <footer className="fixed bottom-8 left-0 right-0 flex justify-center pointer-events-none z-40">
        <div className="bg-slate-900/80 backdrop-blur-xl px-10 py-5 rounded-[2.5rem] flex gap-4 pointer-events-auto shadow-2xl border border-white/10">
          {progress.slice(1).map(p => (
            <div 
              key={p.id} 
              className={`w-4 h-4 rounded-full transition-all duration-500 ${
                p.completed ? 'bg-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.5)]' : 
                currentLevel === p.id ? 'bg-orange-300 w-10 animate-pulse' : 'bg-slate-800'
              }`} 
            />
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;