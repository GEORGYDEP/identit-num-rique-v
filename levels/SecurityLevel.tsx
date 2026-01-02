import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, ChevronRight, Lock, Mail, AlertTriangle } from 'lucide-react';

interface Props {
  onComplete: (score: number) => void;
}

const QUESTIONS = [
  {
    text: "Quel est le meilleur mot de passe parmi ceux-ci ?",
    options: ["123456", "MaDateDeNaissance2008", "J@m2f@F!2024", "princesse_bella"],
    correct: 2,
    explanation: "Un bon mot de passe fait au moins 12 caractères, mélange chiffres, majuscules et caractères spéciaux, et ne contient aucune info personnelle."
  },
  {
    text: "Tu reçois un mail de ta banque disant : 'Action requise : Votre compte est bloqué, cliquez ici.' C'est probablement...",
    options: ["Une urgence réelle", "Du Phishing (Hameçonnage)", "Un cadeau de fidélité", "Une simple erreur technique"],
    correct: 1,
    explanation: "C'est du Phishing. Ne clique jamais sur les liens suspects. Les banques ne demandent jamais tes codes ou actions critiques par mail."
  },
  {
    text: "Sur les réseaux sociaux, avant de publier une photo, la question cruciale est :",
    options: ["Combien de likes vais-je avoir ?", "Est-ce que je suis à mon avantage ?", "Pourrait-elle me nuire dans 5 ou 10 ans ?", "Ai-je bien identifié mes amis ?"],
    correct: 2,
    explanation: "Réfléchis à ton 'Moi futur'. Ce qui est drôle aujourd'hui pourrait être un obstacle lors d'un futur entretien d'embauche."
  },
  {
    text: "Pour sécuriser un compte de manière optimale, la meilleure étape est :",
    options: ["Changer de pseudo régulièrement", "Mettre son compte en mode privé", "Activer la 2FA (Double Authentification)", "Supprimer ses anciens messages"],
    correct: 2,
    explanation: "La Double Authentification (2FA) est la protection la plus forte. Même si un pirate a ton mot de passe, il ne pourra pas entrer sans ton téléphone."
  }
];

const SecurityLevel: React.FC<Props> = ({ onComplete }) => {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (idx: number) => {
    if (showExplanation) return;
    setSelected(idx);
    setShowExplanation(true);
    if (idx === QUESTIONS[qIndex].correct) {
      setScore(s => s + 25);
    }
  };

  const next = () => {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(prev => prev + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      onComplete(score);
    }
  };

  const current = QUESTIONS[qIndex];

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-black text-white mb-2 italic font-serif">Mission Finale : Gardien du Web</h2>
        <p className="text-slate-400">Teste ta vigilance et apprends à verrouiller ta forteresse numérique.</p>
      </div>

      <div className="glass rounded-[3rem] border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-3 mb-8">
            <div className="bg-orange-600 p-2 rounded-lg shadow-lg shadow-orange-600/20">
                <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <span className="text-slate-500 font-black uppercase tracking-[0.3em] text-[10px]">Challenge {qIndex + 1} / {QUESTIONS.length}</span>
        </div>

        <h3 className="text-3xl font-black text-white mb-10 leading-tight">{current.text}</h3>

        <div className="grid gap-4 mb-10">
          {current.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showExplanation}
              className={`p-6 rounded-2xl text-left font-bold text-lg transition-all flex justify-between items-center border-2 ${
                showExplanation 
                  ? i === current.correct 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                    : selected === i 
                        ? 'bg-red-500/20 border-red-500 text-red-400 animate-shake' 
                        : 'bg-white/5 border-white/5 text-slate-600'
                  : 'bg-white/5 border-white/5 hover:border-orange-500/50 hover:bg-white/10 text-slate-300'
              }`}
            >
              <span>{opt}</span>
              {showExplanation && i === current.correct && <CheckCircle2 className="w-6 h-6 text-emerald-500" />}
              {showExplanation && selected === i && i !== current.correct && <XCircle className="w-6 h-6 text-red-500" />}
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="bg-white/5 p-8 rounded-[2rem] border border-orange-500/30 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex gap-6 items-start">
                <div className="bg-orange-600/20 p-3 rounded-full">
                    <AlertTriangle className="w-6 h-6 text-orange-500" />
                </div>
                <div>
                    <h4 className="font-black text-white mb-2 uppercase tracking-tighter">Pourquoi c'est important ?</h4>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 italic">"{current.explanation}"</p>
                    <button 
                        onClick={next}
                        className="flex items-center gap-3 bg-orange-600 text-white px-8 py-3 rounded-xl font-black hover:bg-orange-700 transition-all ml-auto shadow-lg active:scale-95"
                    >
                        {qIndex === QUESTIONS.length - 1 ? "VOIR MON BILAN" : "SUIVANT"}
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-8 rounded-[2.5rem] flex items-center gap-6 border-blue-500/20">
            <div className="p-4 bg-blue-500/20 rounded-2xl">
                <Lock className="w-8 h-8 text-blue-400" />
            </div>
            <div>
                <h4 className="font-black text-white uppercase tracking-tighter">Zéro compromis</h4>
                <p className="text-xs text-slate-500">La 2FA est obligatoire pour tes comptes importants.</p>
            </div>
        </div>
        <div className="glass p-8 rounded-[2.5rem] flex items-center gap-6 border-emerald-500/20">
            <div className="p-4 bg-emerald-500/20 rounded-2xl">
                <Mail className="w-8 h-8 text-emerald-400" />
            </div>
            <div>
                <h4 className="font-black text-white uppercase tracking-tighter">Vigilance mail</h4>
                <p className="text-xs text-slate-500">Un doute ? Ne clique pas. Vérifie toujours l'expéditeur.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityLevel;