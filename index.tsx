import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  ChevronRight, Award, Map, RefreshCcw, ShieldCheck, Users, Globe, 
  CheckCircle2, XCircle, Info, HelpCircle, User, MousePointer2, 
  ArrowRight, Shield, Trash2, Edit3, Search, Share2, Hand, 
  ShieldAlert, Lock, Mail, AlertTriangle, Trophy, Zap, Eye
} from 'lucide-react';

// --- DOMAIN TYPES ---
enum LevelId {
  INTRO = 'intro',
  GROUPS = 'groups',
  IDENTITY = 'identity',
  TRACES = 'traces',
  RGPD = 'rgpd',
  SECURITY = 'security',
  CONCLUSION = 'conclusion'
}

// --- COMPONENTS ---

const IntroScreen = ({ onStart }) => (
  <div className="flex flex-col items-center text-center py-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
    <div className="glass px-6 py-2 rounded-full border border-orange-500/30 text-orange-400 font-black tracking-widest text-xs uppercase mb-8">
      Unité Pédagogique : UAA4
    </div>
    <h1 className="text-6xl md:text-8xl font-black mb-8 title-gradient leading-none tracking-tight font-serif italic">
      L'Odyssée <span className="text-orange-600 not-italic">Numérique</span>
    </h1>
    <p className="text-xl text-slate-400 mb-16 max-w-2xl font-light">
      Maîtrisez votre image sociale, vos traces et vos droits citoyens dans l'écosystème numérique.
    </p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-4xl">
      <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col items-center">
        <Users className="w-10 h-10 text-blue-400 mb-4" />
        <h3 className="font-bold text-white mb-2 uppercase tracking-tighter">Sphères Sociales</h3>
      </div>
      <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col items-center">
        <Globe className="w-10 h-10 text-purple-400 mb-4" />
        <h3 className="font-bold text-white mb-2 uppercase tracking-tighter">Double Numérique</h3>
      </div>
      <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col items-center">
        <ShieldCheck className="w-10 h-10 text-orange-400 mb-4" />
        <h3 className="font-bold text-white mb-2 uppercase tracking-tighter">Défense RGPD</h3>
      </div>
    </div>
    <button onClick={onStart} className="group flex items-center gap-4 bg-orange-600 text-white px-12 py-6 rounded-full font-black text-2xl hover:bg-orange-700 transition-all shadow-[0_0_50px_rgba(234,88,12,0.3)] hover:scale-105">
      Initialiser la Mission <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
    </button>
  </div>
);

const GroupsLevel = ({ onComplete }) => {
  const ITEMS = [
    { id: '1', text: "Ma Famille", type: 'primaire' },
    { id: '2', text: "Passagers d'un train", type: 'agregat' },
    { id: '3', text: "Les belges de 18 ans", type: 'statistique' },
    { id: '4', text: "Cercle d'amis proches", type: 'primaire' },
    { id: '5', text: "Syndicat étudiant", type: 'secondaire' },
    { id: '6', text: "Foule dans une manif", type: 'agregat' },
  ];
  const [cur, setCur] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const select = (type) => {
    if (feedback !== null) return;
    const ok = ITEMS[cur].type === type;
    setFeedback(ok);
    setTimeout(() => {
      setFeedback(null);
      if (ok) {
        if (cur < ITEMS.length - 1) setCur(c => c + 1);
        else onComplete(100);
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in slide-in-from-right-12">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-4xl font-black italic font-serif title-gradient">Sphères Sociales</h2>
        <div className="text-xl font-mono text-slate-500">{cur + 1} / {ITEMS.length}</div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`glass p-16 rounded-[3rem] h-80 flex flex-col items-center justify-center text-center relative overflow-hidden transition-all ${feedback === false ? 'animate-shake border-red-500/50 bg-red-500/5' : ''}`}>
          {feedback !== null && (
            <div className={`absolute inset-0 flex items-center justify-center z-10 ${feedback ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              {feedback ? <CheckCircle2 className="w-24 h-24 text-emerald-500" /> : <XCircle className="w-24 h-24 text-red-500" />}
            </div>
          )}
          <HelpCircle className="w-12 h-12 text-slate-700 mb-6" />
          <span className="text-4xl font-black">{ITEMS[cur].text}</span>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {['agregat', 'statistique', 'primaire', 'secondaire'].map(id => (
            <button key={id} onClick={() => select(id)} className="glass px-8 py-6 rounded-2xl text-left hover:bg-white/5 border border-white/5 hover:border-orange-500/50 transition-all">
              <span className="font-black text-xl capitalize">{id}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const IdentityLevel = ({ onComplete }) => {
  const ELEMENTS = [
    { id: '1', text: "Mon ADN", cat: 'perso' },
    { id: '2', text: "Mon club de foot", cat: 'coll' },
    { id: '3', text: "Mon style musical", cat: 'perso' },
    { id: '4', text: "Ma nationalité", cat: 'coll' },
    { id: '5', text: "Mon mot de passe", cat: 'perso' },
    { id: '6', text: "Mon école technique", cat: 'coll' },
  ];
  const [cur, setCur] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const place = (cat) => {
    if (feedback !== null) return;
    const ok = ELEMENTS[cur].cat === cat;
    setFeedback(ok);
    setTimeout(() => {
      setFeedback(null);
      if (ok) {
        if (cur < ELEMENTS.length - 1) setCur(c => c + 1);
        else onComplete(100);
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in slide-in-from-bottom-12">
       <h2 className="text-5xl font-black text-center mb-16 title-gradient font-serif italic">Dualité de l'Être</h2>
       <div className="flex flex-col items-center gap-12">
         <div className={`glass p-16 rounded-[3rem] border-2 min-w-[400px] text-center transition-all ${feedback === false ? 'animate-shake border-red-500 bg-red-500/10' : 'border-orange-500/30'}`}>
            {feedback === true && <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-4" />}
            {feedback === false && <XCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />}
            <span className="text-4xl font-black text-white">{ELEMENTS[cur].text}</span>
         </div>
         <div className="grid grid-cols-2 gap-8 w-full">
            <button onClick={() => place('perso')} className="glass p-12 rounded-[3rem] flex flex-col items-center gap-6 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/5">
              <User className="w-12 h-12 text-blue-400" />
              <span className="font-black text-2xl uppercase tracking-tighter">Identité Personnelle</span>
            </button>
            <button onClick={() => place('coll')} className="glass p-12 rounded-[3rem] flex flex-col items-center gap-6 border border-white/5 hover:border-orange-500/50 hover:bg-orange-500/5">
              <Users className="w-12 h-12 text-orange-400" />
              <span className="font-black text-2xl uppercase tracking-tighter">Identité Collective</span>
            </button>
         </div>
       </div>
    </div>
  );
};

const TracesLevel = ({ onComplete }) => {
  const TRACES = [
    { id: '1', text: "Mon adresse IP", type: 'passif' },
    { id: '2', text: "Poster une story", type: 'actif' },
    { id: '3', text: "Pixels espions", type: 'passif' },
    { id: '4', text: "Un ami me tague", type: 'passif' },
  ];
  const [cur, setCur] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const select = (type) => {
    if (feedback !== null) return;
    const ok = TRACES[cur].type === type;
    setFeedback(ok);
    setTimeout(() => {
      setFeedback(null);
      if (ok) {
        if (cur < TRACES.length - 1) setCur(c => c + 1);
        else onComplete(100);
      }
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in">
      <h2 className="text-5xl font-black italic font-serif title-gradient mb-12">Traces & Échos</h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`glass p-16 rounded-[3rem] flex flex-col items-center justify-center text-center relative overflow-hidden ${feedback === false ? 'animate-shake border-red-500' : ''}`}>
          {feedback !== null && (
            <div className={`absolute inset-0 flex items-center justify-center z-10 ${feedback ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
              <Eye className={`w-24 h-24 ${feedback ? 'text-emerald-500' : 'text-red-500'}`} />
            </div>
          )}
          <Globe className="w-12 h-12 text-purple-400 mb-6" />
          <span className="text-4xl font-black leading-tight">{TRACES[cur].text}</span>
        </div>
        <div className="flex flex-col gap-4">
          <button onClick={() => select('actif')} className="glass p-10 rounded-[2rem] text-center border border-white/5 hover:border-emerald-500">
            <span className="text-3xl font-black text-emerald-400">Trace Active</span>
          </button>
          <button onClick={() => select('passif')} className="glass p-10 rounded-[2rem] text-center border border-white/5 hover:border-red-500">
            <span className="text-3xl font-black text-red-400">Trace Passive</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const RgpdLevel = ({ onComplete }) => {
  const [selected, setSelected] = useState([]);
  const RIGHTS = [
    { id: 'acc', icon: Search, label: "Accès" },
    { id: 'rec', icon: Edit3, label: "Rectification" },
    { id: 'eff', icon: Trash2, label: "Effacement" },
    { id: 'opp', icon: Hand, label: "Opposition" }
  ];

  const toggle = (id) => {
    if (!selected.includes(id)) {
        const next = [...selected, id];
        setSelected(next);
        if (next.length === RIGHTS.length) setTimeout(() => onComplete(100), 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in zoom-in">
       <h2 className="text-5xl font-black italic font-serif title-gradient text-center mb-16">Le Bouclier RGPD</h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {RIGHTS.map(r => (
           <button key={r.id} onClick={() => toggle(r.id)} className={`glass p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all ${selected.includes(r.id) ? 'border-orange-500 bg-orange-500/10' : 'border-white/5'}`}>
              <r.icon className={`w-12 h-12 mb-6 ${selected.includes(r.id) ? 'text-orange-500' : 'text-slate-600'}`} />
              <span className="text-xl font-black">{r.label}</span>
           </button>
         ))}
       </div>
    </div>
  );
};

const SecurityLevel = ({ onComplete }) => {
    const [q, setQ] = useState(0);
    const questions = [
        { t: "Un mot de passe sûr contient...", o: ["1234", "Mon prénom", "Mélange complexe", "Ma date de naissance"], a: 2 },
        { t: "Le Phishing est...", o: ["Un sport", "Une arnaque par mail", "Un logiciel", "Une photo"], a: 1 }
    ];

    const handleAnswer = (i) => {
        if (i === questions[q].a) {
            if (q < questions.length - 1) setQ(q + 1);
            else onComplete(100);
        } else {
            // Feedback erreur pour la sécurité aussi
            const btn = document.getElementById(`q-${i}`);
            btn.classList.add('animate-shake', 'border-red-500');
            setTimeout(() => btn.classList.remove('animate-shake', 'border-red-500'), 400);
        }
    };

    return (
        <div className="max-w-3xl mx-auto py-20 glass p-16 rounded-[3rem] border-white/10 animate-in fade-in">
            <ShieldAlert className="w-12 h-12 text-orange-600 mb-8 mx-auto" />
            <h2 className="text-4xl font-black text-center mb-12">{questions[q].t}</h2>
            <div className="grid gap-4">
                {questions[q].o.map((o, i) => (
                    <button id={`q-${i}`} key={i} onClick={() => handleAnswer(i)} className="glass py-6 px-8 rounded-2xl text-left font-bold text-xl hover:border-orange-500 transition-all border border-white/5">
                        {o}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FinalSummary = ({ score, onRestart }) => (
  <div className="max-w-4xl mx-auto py-20 text-center animate-in zoom-in duration-1000">
     <div className="relative inline-block mb-12">
        <div className="absolute -inset-12 bg-orange-600/30 rounded-full blur-3xl animate-glow"></div>
        <Trophy className="w-40 h-40 text-orange-500 relative" />
     </div>
     <h2 className="text-8xl font-black mb-6 italic font-serif title-gradient tracking-tighter">Mission Accomplie</h2>
     <div className="glass p-20 rounded-[4rem] border-white/5 mb-16 shadow-2xl">
        <span className="text-slate-500 font-bold uppercase tracking-[0.5em] block mb-4">Certificat de Citoyenneté</span>
        <span className="text-9xl font-black text-white">{score} <span className="text-3xl text-orange-600 font-normal">pts</span></span>
     </div>
     <div className="flex justify-center gap-8">
        <button onClick={onRestart} className="flex items-center gap-4 bg-orange-600 text-white px-12 py-6 rounded-full font-black text-2xl shadow-[0_0_50px_rgba(234,88,12,0.3)] hover:scale-105 active:scale-95 transition-all">
           <RefreshCcw className="w-8 h-8" /> Recommencer l'Aventure
        </button>
     </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [level, setLevel] = useState(LevelId.INTRO);
  const [score, setScore] = useState(0);

  const handleNext = (s) => {
    setScore(prev => prev + s);
    const sequence = [
        LevelId.INTRO, 
        LevelId.GROUPS, 
        LevelId.IDENTITY, 
        LevelId.TRACES, 
        LevelId.RGPD, 
        LevelId.SECURITY, 
        LevelId.CONCLUSION
    ];
    const idx = sequence.indexOf(level);
    if (idx < sequence.length - 1) setLevel(sequence[idx + 1]);
  };

  const resetGame = () => {
    setLevel(LevelId.INTRO);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col p-6 md:p-12">
      <nav className="glass sticky top-4 z-50 px-10 py-5 rounded-[2rem] flex justify-between items-center max-w-7xl mx-auto w-full border-white/10 mb-12">
        <div className="flex items-center gap-4">
          <div className="bg-orange-600 p-2.5 rounded-xl shadow-lg shadow-orange-600/20"><Zap className="text-white w-6 h-6" /></div>
          <h1 className="text-2xl font-black tracking-tighter uppercase italic text-white">UAA4 Quest</h1>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
            <Award className="text-orange-500 w-6 h-6" />
            <span className="font-mono font-black text-2xl text-white">{score}</span>
          </div>
          <button onClick={resetGame} className="p-3 glass rounded-full hover:bg-white/10 text-slate-400 transition-all">
            <RefreshCcw className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="flex-grow container mx-auto">
        {level === LevelId.INTRO && <IntroScreen onStart={() => handleNext(0)} />}
        {level === LevelId.GROUPS && <GroupsLevel onComplete={handleNext} />}
        {level === LevelId.IDENTITY && <IdentityLevel onComplete={handleNext} />}
        {level === LevelId.TRACES && <TracesLevel onComplete={handleNext} />}
        {level === LevelId.RGPD && <RgpdLevel onComplete={handleNext} />}
        {level === LevelId.SECURITY && <SecurityLevel onComplete={handleNext} />}
        {level === LevelId.CONCLUSION && <FinalSummary score={score} onRestart={resetGame} />}
      </main>

      <footer className="py-12 text-center text-slate-700 text-[10px] font-black uppercase tracking-[1em]">
        Ingénierie Pédagogique • Saint-Luc Frameries • 2025
      </footer>
    </div>
  );
};

const root = createRoot(document.getElementById('root'));
root.render(<App />);