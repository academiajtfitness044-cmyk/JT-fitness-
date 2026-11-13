import React from 'react';
import {
  Sparkles,
  Users,
  Dumbbell,
  Utensils,
  Activity,
  UserCheck,
  Wand2,
  Bot,
  Download,
} from 'lucide-react';

export type ActiveTab =
  | 'alunos'
  | 'image_studio'
  | 'avaliacoes'
  | 'dietas'
  | 'treinos'
  | 'portal_aluno';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAIChat: () => void;
  onOpenCoachProfile: () => void;
  coachName: string;
  isStudentMode?: boolean;
  onToggleStudentMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIChat,
  onOpenCoachProfile,
  coachName,
  isStudentMode = false,
  onToggleStudentMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div
            id="brand-logo"
            onClick={() => setActiveTab('alunos')}
            className="group flex cursor-pointer items-center gap-3"
          >
            <div className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-[#00FF66]/30 bg-black/90 shadow-lg shadow-[#00FF66]/10 transition-transform group-hover:scale-105 p-0.5">
              <img
                src="https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png"
                alt="Academia JT Fitness"
                className="h-full w-full object-contain"
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-black tracking-tight text-white uppercase">
                  ACADEMIA <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00CC52]">JT</span> FITNESS
                </span>
                <span className="rounded-full bg-[#00FF66]/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-[#00FF66] border border-[#00FF66]/20">
                  GYM
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-medium text-zinc-400">
                Disciplina &bull; Foco &bull; Resultados
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 rounded-xl bg-zinc-950 p-1 border border-zinc-900">
          <button
            id="nav-tab-alunos"
            onClick={() => setActiveTab('alunos')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'alunos'
                ? 'bg-[#00FF66] text-black shadow-md font-bold shadow-[#00FF66]/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Users className="h-4 w-4" />
            Alunos & Atletas
          </button>

          <button
            id="nav-tab-image-studio"
            onClick={() => setActiveTab('image_studio')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'image_studio'
                ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-black shadow-md font-bold shadow-[#00FF66]/20'
                : 'text-[#00FF66]/90 hover:text-[#00FF66] hover:bg-[#00FF66]/10'
            }`}
          >
            <Wand2 className="h-4 w-4 text-[#00FF66] group-hover:animate-spin" />
            <span>Estúdio IA (Criar & Editar)</span>
            <span className="flex h-2 w-2 rounded-full bg-[#00FF66] animate-pulse" />
          </button>

          <button
            id="nav-tab-avaliacoes"
            onClick={() => setActiveTab('avaliacoes')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'avaliacoes'
                ? 'bg-[#00FF66] text-black shadow-md font-bold shadow-[#00FF66]/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Activity className="h-4 w-4" />
            Avaliação & Shape IA
          </button>

          <button
            id="nav-tab-dietas"
            onClick={() => setActiveTab('dietas')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'dietas'
                ? 'bg-[#00FF66] text-black shadow-md font-bold shadow-[#00FF66]/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Utensils className="h-4 w-4" />
            Dietas TBCA
          </button>

          <button
            id="nav-tab-treinos"
            onClick={() => setActiveTab('treinos')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'treinos'
                ? 'bg-[#00FF66] text-black shadow-md font-bold shadow-[#00FF66]/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
            }`}
          >
            <Dumbbell className="h-4 w-4" />
            Treinos & Vídeos
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* PWA Install Trigger */}
          <button
            id="btn-install-app-navbar"
            onClick={() => window.dispatchEvent(new CustomEvent('open-pwa-install'))}
            className="flex items-center gap-1.5 rounded-lg border border-[#00FF66]/30 bg-[#00FF66]/10 px-3 py-1.5 text-xs font-semibold text-[#00FF66] transition-all hover:bg-[#00FF66]/20 hover:border-[#00FF66]/50 cursor-pointer"
            title="Instalar App no Celular ou PC"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Instalar App</span>
          </button>

          {/* AI Chat Assistant Trigger */}
          <button
            id="btn-open-ai-chat"
            onClick={onOpenAIChat}
            className="flex items-center gap-1.5 rounded-lg border border-[#00FF66]/30 bg-[#00FF66]/10 px-3 py-1.5 text-xs font-semibold text-[#00FF66] transition-all hover:bg-[#00FF66]/20 hover:border-[#00FF66]/50"
            title="Assistente IA do Treinador"
          >
            <Bot className="h-4 w-4 animate-bounce" />
            <span className="hidden sm:inline">Treinador IA</span>
          </button>

          {/* Student Portal Quick Switch */}
          <button
            id="btn-toggle-student-portal"
            onClick={() => setActiveTab('portal_aluno')}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
              activeTab === 'portal_aluno'
                ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-black font-bold shadow-md shadow-[#00FF66]/20'
                : 'border border-[#00FF66]/30 bg-[#00FF66]/10 text-[#00FF66] hover:bg-[#00FF66]/20'
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span className="hidden md:inline">Portal do Aluno</span>
          </button>

          {/* Coach Profile Avatar */}
          <button
            id="btn-coach-profile"
            onClick={onOpenCoachProfile}
            className="flex items-center gap-2 rounded-xl border border-zinc-900 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-300 hover:border-zinc-800 hover:text-white"
            title="Perfil do Treinador"
          >
            <div className="h-6 w-6 overflow-hidden rounded-full bg-[#00FF66]/20 border border-[#00FF66]/40">
              <img
                src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80"
                alt="Coach"
                className="h-full w-full object-cover"
              />
            </div>
            <span className="hidden xl:inline font-semibold">{coachName}</span>
          </button>
        </div>
      </div>

      {/* Subnav for Mobile */}
      <div className="flex lg:hidden overflow-x-auto border-t border-zinc-900 bg-black px-3 py-2 scrollbar-none gap-1.5">
        <button
          onClick={() => setActiveTab('alunos')}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === 'alunos'
              ? 'bg-[#00FF66] text-black font-bold'
              : 'text-zinc-400 bg-zinc-950'
          }`}
        >
          <Users className="h-3.5 w-3.5" />
          Alunos
        </button>
        <button
          onClick={() => setActiveTab('image_studio')}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === 'image_studio'
              ? 'bg-gradient-to-r from-[#00FF66] to-[#00CC52] text-black font-bold'
              : 'text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/30'
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          Estúdio IA
        </button>
        <button
          onClick={() => setActiveTab('avaliacoes')}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === 'avaliacoes'
              ? 'bg-[#00FF66] text-black font-bold'
              : 'text-zinc-400 bg-zinc-950'
          }`}
        >
          <Activity className="h-3.5 w-3.5" />
          Avaliações
        </button>
        <button
          onClick={() => setActiveTab('dietas')}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === 'dietas'
              ? 'bg-[#00FF66] text-black font-bold'
              : 'text-zinc-400 bg-zinc-950'
          }`}
        >
          <Utensils className="h-3.5 w-3.5" />
          Dietas
        </button>
        <button
          onClick={() => setActiveTab('treinos')}
          className={`flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium ${
            activeTab === 'treinos'
              ? 'bg-[#00FF66] text-black font-bold'
              : 'text-zinc-400 bg-zinc-950'
          }`}
        >
          <Dumbbell className="h-3.5 w-3.5" />
          Treinos
        </button>
      </div>
    </header>
  );
};
