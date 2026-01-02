
import React from 'react';
import { LevelProgress } from '../types';
import { Award, Trophy, RefreshCcw, Heart, Share2, ShieldCheck, Zap } from 'lucide-react';

interface Props {
  progress: LevelProgress[];
  onRestart: () => void;
}

const FinalSummary: React.FC<Props> = ({ progress, onRestart }) => {
  const totalScore = Math.round(progress.reduce((acc, curr) => acc + curr.score, 0));

  return (
    <div className="max-w-4xl mx-auto py-12 text-center animate-in zoom-in duration-1000">
      <div className="mb-12">
        <div className="relative inline-flex items-center justify-center w-40 h-40 bg-orange-600/10 rounded-full mb-8">
            <div className="absolute inset-0 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
            <Trophy className="w-20 h-20 text-orange-500 relative" />
            <div className="absolute -top-2 -right-2 bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-[#030712] shadow-xl">
                ✓
            </div>
        </div>
        <h2 className="text-7xl font-black text-white mb-6 italic font-serif title-gradient tracking-tighter">Mission Accomplie</h2>
        <p className="text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
          Félicitations ! Tu as validé toutes les compétences de l'unité <span className="text-white font-bold">UAA4</span>.
        </p>
      </div>

      <div className="bg-white/5 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] border border-white/10 shadow-2xl mb-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="text-left">
                <span className="text-slate-500 font-black uppercase text-xs tracking-[0.4em] block mb-2">Potentiel Numérique</span>
                <span className="text-9xl font-black text-white tracking-tighter leading-none">
                  {totalScore} <span className="text-3xl text-orange-600 font-normal ml-[-15px]">pts</span>
                </span>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-auto">
                <button 
                  onClick={onRestart}
                  className="flex items-center justify-center gap-4 px-10 py-5 bg-orange-600 text-white rounded-[2rem] font-black text-2xl shadow-[0_0_50px_rgba(234,88,12,0.3)] hover:bg-orange-700 transition-all transform hover:scale-105 active:scale-95 group"
                >
                    <RefreshCcw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-700" /> 
                    Recommencer
                </button>
                <button 
                  onClick={() => window.print()} 
                  className="flex items-center justify-center gap-3 px-10 py-4 bg-white/5 text-slate-300 rounded-[2rem] font-bold border border-white/10 hover:bg-white/10 transition-colors"
                >
                    <Share2 className="w-5 h-5" /> Certifier mon score
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 group hover:border-orange-500/30 transition-all">
                <ShieldCheck className="w-10 h-10 text-emerald-500 mb-6" />
                <h4 className="font-black text-white text-xl mb-3 uppercase tracking-tight">Identité</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">Tu maîtrises désormais la distinction cruciale entre tes appartenances et ton caractère unique.</p>
            </div>
            <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 group hover:border-blue-500/30 transition-all">
                <Zap className="w-10 h-10 text-blue-500 mb-6" />
                <h4 className="font-black text-white text-xl mb-3 uppercase tracking-tight">Citoyenneté</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">Le RGPD est ton bouclier. Tu connais tes droits pour naviguer en toute sécurité.</p>
            </div>
            <div className="p-8 bg-slate-900/50 rounded-[2.5rem] border border-white/5 group hover:border-orange-500/30 transition-all">
                <Heart className="w-10 h-10 text-orange-500 mb-6" />
                <h4 className="font-black text-white text-xl mb-3 uppercase tracking-tight">Vigilance</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-light">Ton "double numérique" est protégé. Tu sais identifier les traces passives et actives.</p>
            </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pb-12">
        <blockquote className="text-3xl font-light text-slate-400 italic mb-10 leading-relaxed font-serif">
            "Le futur appartient à ceux qui comprennent l'empreinte qu'ils laissent dans le monde virtuel."
        </blockquote>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.8em]">Institut Saint-Luc Frameries • 2024-2025</p>
      </div>
      
      <style>{`
        .title-gradient {
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default FinalSummary;
