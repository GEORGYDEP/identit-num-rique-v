import React, { useState } from 'react';
import { User, Users, CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const ELEMENTS = [
  { id: '1', text: "Mon ADN", category: 'personnelle' },
  { id: '2', text: "Mon club de scouts", category: 'collective' },
  { id: '3', text: "Ma photo de profil", category: 'personnelle' },
  { id: '4', text: "Ma nationalité belge", category: 'collective' },
  { id: '5', text: "Mon mot de passe", category: 'personnelle' },
  { id: '6', text: "Ma passion pour le gaming", category: 'collective' },
  { id: '7', text: "Mon école (Saint-Luc)", category: 'collective' },
  { id: '8', text: "Ma taille et mon poids", category: 'personnelle' },
];

const IdentityLevel: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [placed, setPlaced] = useState<Record<string, 'personnelle' | 'collective'>>({});
  const [feedback, setFeedback] = useState<'success' | 'error' | null>(null);
  const [lastClicked, setLastClicked] = useState<'personnelle' | 'collective' | null>(null);
  const [score, setScore] = useState(0);

  const currentItem = ELEMENTS[currentIndex];

  const handlePlace = (category: 'personnelle' | 'collective') => {
    if (feedback !== null) return;
    setLastClicked(category);

    const isCorrect = currentItem.category === category;
    
    if (isCorrect) {
      setFeedback('success');
      setScore(s => s + 12.5);
      setPlaced(prev => ({ ...prev, [currentItem.id]: category }));
      
      setTimeout(() => {
        setFeedback(null);
        setLastClicked(null);
        if (currentIndex < ELEMENTS.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else {
          onComplete(score + 12.5);
        }
      }, 800);
    } else {
      setFeedback('error');
      setTimeout(() => {
        setFeedback(null);
        setLastClicked(null);
      }, 1000);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 animate-in fade-in duration-700">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-3 italic font-serif">Mission 2 : Ton Portrait Chinois</h2>
        <p className="text-slate-400 text-lg">L'identité sociale est la combinaison de qui tu es (personnel) et à quoi tu appartiens (collectif).</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className={`p-10 rounded-[3rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center shadow-inner ${feedback === 'error' && lastClicked === 'personnelle' ? 'border-red-500 bg-red-500/10 animate-shake' : 'border-blue-500/20 bg-blue-500/5'}`}>
            <User className={`w-12 h-12 mb-6 ${feedback === 'error' && lastClicked === 'personnelle' ? 'text-red-500' : 'text-blue-400'}`} />
            <h3 className="text-2xl font-black text-blue-400 mb-8 tracking-wider uppercase">Personnelle</h3>
            <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
                {ELEMENTS.filter(i => placed[i.id] === 'personnelle').map(i => (
                    <div key={i.id} className="bg-white/5 px-4 py-2 rounded-xl border border-blue-500/30 text-sm font-bold text-blue-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {i.text}
                    </div>
                ))}
            </div>
        </div>

        <div className={`p-10 rounded-[3rem] border-2 border-dashed transition-all duration-300 flex flex-col items-center shadow-inner ${feedback === 'error' && lastClicked === 'collective' ? 'border-red-500 bg-red-500/10 animate-shake' : 'border-orange-500/20 bg-orange-500/5'}`}>
            <Users className={`w-12 h-12 mb-6 ${feedback === 'error' && lastClicked === 'collective' ? 'text-red-500' : 'text-orange-400'}`} />
            <h3 className="text-2xl font-black text-orange-400 mb-8 tracking-wider uppercase">Collective</h3>
            <div className="flex flex-wrap gap-2 justify-center min-h-[40px]">
                {ELEMENTS.filter(i => placed[i.id] === 'collective').map(i => (
                    <div key={i.id} className="bg-white/5 px-4 py-2 rounded-xl border border-orange-500/30 text-sm font-bold text-orange-300 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {i.text}
                    </div>
                ))}
            </div>
        </div>
      </div>

      {currentIndex < ELEMENTS.length && (
        <div className={`glass p-12 rounded-[3rem] border-white/10 flex flex-col items-center transform transition-all ${feedback === 'error' ? 'animate-shake border-red-500/50' : ''}`}>
            <div className="mb-8 relative text-center">
              {feedback === 'success' && <CheckCircle2 className="w-16 h-16 text-emerald-500 absolute -top-20 left-1/2 -translate-x-1/2 animate-bounce" />}
              {feedback === 'error' && <XCircle className="w-16 h-16 text-red-500 absolute -top-20 left-1/2 -translate-x-1/2 animate-bounce" />}
              <HelpCircle className="w-12 h-12 text-slate-700 mx-auto mb-4" />
              <span className="text-4xl font-black text-white block">{currentItem.text}</span>
            </div>
            
            <div className="flex gap-6 w-full max-w-md">
              <button 
                onClick={() => handlePlace('personnelle')}
                className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95 ${feedback === 'error' && lastClicked === 'personnelle' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
              >
                Personnel
              </button>
              <button 
                onClick={() => handlePlace('collective')}
                className={`flex-1 py-5 rounded-2xl font-black text-xl transition-all shadow-lg active:scale-95 ${feedback === 'error' && lastClicked === 'collective' ? 'bg-red-600 text-white' : 'bg-orange-600 text-white hover:bg-orange-700'}`}
              >
                Collectif
              </button>
            </div>
            {feedback === 'error' && <p className="mt-6 text-red-400 font-bold animate-pulse">Mauvaise catégorie ! Analyse bien l'élément.</p>}
        </div>
      )}
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake { animation: shake 0.4s ease-in-out; }
      `}</style>
    </div>
  );
};

export default IdentityLevel;