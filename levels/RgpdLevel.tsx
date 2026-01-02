
import React, { useState } from 'react';
// Added CheckCircle2 to the imports from lucide-react
import { Shield, Trash2, Edit3, Search, Share2, Hand, CheckCircle2 } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const RIGHTS = [
  { id: 'acces', icon: Search, label: "Droit d'accès", desc: "Demander quelles données l'entreprise possède sur moi." },
  { id: 'rectification', icon: Edit3, label: "Droit de rectification", desc: "Faire corriger des informations inexactes ou incomplètes." },
  { id: 'effacement', icon: Trash2, label: "Droit à l'effacement", desc: "Demander la suppression de mes données (Droit à l'oubli numérique)." },
  { id: 'portabilite', icon: Share2, label: "Droit à la portabilité", desc: "Récupérer mes données dans un format réutilisable pour un autre service." },
  { id: 'opposition', icon: Hand, label: "Droit d'opposition", desc: "Refuser que mes données soient utilisées pour du profilage marketing." },
];

const RgpdLevel: React.FC<Props> = ({ onComplete }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);

  const handleClick = (id: string) => {
    if (completed.includes(id)) return;
    setSelected(id);
  };

  const handleConfirm = (id: string) => {
    setCompleted(prev => {
        const next = [...prev, id];
        if (next.length === RIGHTS.length) {
            setTimeout(() => onComplete(100), 1000);
        }
        return next;
    });
    setSelected(null);
  }

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black text-white mb-2 italic font-serif">Mission 4 : Le Bouclier RGPD</h2>
        <p className="text-slate-400 text-lg">Le Règlement Général sur la Protection des Données te protège. Connais-tu tes 5 droits fondamentaux ?</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {RIGHTS.map(right => (
          <button
            key={right.id}
            onClick={() => handleClick(right.id)}
            className={`group relative p-8 rounded-[2.5rem] border-2 transition-all duration-500 text-left flex flex-col items-center text-center glass ${
              completed.includes(right.id) 
                ? 'bg-emerald-500/10 border-emerald-500/50' 
                : selected === right.id 
                    ? 'bg-orange-500/20 border-orange-500 shadow-[0_0_30px_rgba(234,88,12,0.2)]' 
                    : 'border-white/5 hover:border-orange-500/30'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
              completed.includes(right.id) ? 'bg-emerald-500/20' : 'bg-white/5 group-hover:bg-orange-500/20'
            }`}>
                <right.icon className={`w-8 h-8 ${completed.includes(right.id) ? 'text-emerald-500' : 'text-slate-400 group-hover:text-orange-500'}`} />
            </div>
            
            <h3 className="font-bold text-xl text-white mb-2">{right.label}</h3>
            
            {selected === right.id && (
                <div className="animate-in fade-in slide-in-from-bottom-2 mt-4">
                    <p className="text-sm text-slate-300 mb-6 leading-relaxed italic">"{right.desc}"</p>
                    <button 
                        onClick={(e) => { e.stopPropagation(); handleConfirm(right.id); }}
                        className="w-full py-3 bg-orange-600 text-white rounded-xl font-black text-sm hover:bg-orange-700 shadow-lg transform active:scale-95"
                    >
                        J'AI COMPRIS !
                    </button>
                </div>
            )}
            
            {!selected && !completed.includes(right.id) && (
                <span className="text-xs text-orange-500/60 mt-2 font-bold uppercase tracking-widest animate-pulse">
                   Cliquer pour explorer
                </span>
            )}
            
            {completed.includes(right.id) && (
                <CheckCircle2 className="text-emerald-500 w-6 h-6 mt-4" />
            )}
          </button>
        ))}

        <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-105 transition-all">
            <Shield className="w-12 h-12 mb-4 animate-float" />
            <h3 className="font-black text-xl mb-2 tracking-tighter uppercase">Protection APD</h3>
            <p className="text-xs opacity-90 font-medium">L'Autorité de Protection des Données veille au respect de ces droits en Belgique.</p>
        </div>
      </div>

      <div className="mt-12 p-8 glass rounded-3xl border-orange-500/20 text-slate-400 text-sm text-center">
        <span className="text-orange-500 font-black tracking-widest uppercase">Info Flash :</span> En Belgique, tu peux consentir seul au traitement de tes données dès <span className="text-white font-black underline decoration-orange-500">13 ans</span>.
      </div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default RgpdLevel;
