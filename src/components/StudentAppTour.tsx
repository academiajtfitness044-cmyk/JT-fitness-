import { useState, useEffect } from "react";
import {
  Sparkles,
  LayoutDashboard,
  Dumbbell,
  Activity,
  TrendingUp,
  X,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Flame,
  Droplets,
  Video,
  Scale,
  MessageSquare,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface StudentAppTourProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToTab?: (tab: string) => void;
}

export function StudentAppTour({ isOpen, onClose, onNavigateToTab }: StudentAppTourProps) {
  const [currentStep, setCurrentStep] = useState(0);

  // Reset steps on open
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const steps = [
    {
      title: "Seja muito bem-vindo!",
      subtitle: "CONEXÃO ACADEMIA & TREINADOR",
      icon: Crown,
      iconColor: "text-[#00FF85]",
      bgGradient: "from-[#00FF85]/10 to-transparent",
      description: "Preparamos um guia rápido para que você saiba exatamente como funciona o seu portal de treinos, aparelhos e avaliações físicas!",
      highlight: "Acesse suas fichas e acompanhe sua evolução de perto.",
      featureList: [
        "Acesse seus treinos com ilustrações dos aparelhos",
        "Marque cada série e repetição concluída",
        "Monitore suas sessões de cardio e aeróbico",
        "Acompanhe suas avaliações físicas e evolução corporal",
      ],
      interactivePreview: (
        <div className="bg-[#121214] p-5 rounded-2xl border border-white/5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00FF85]/10 flex items-center justify-center border border-[#00FF85]/20 animate-pulse">
              <Sparkles className="w-5 h-5 text-[#00FF85]" />
            </div>
            <div>
              <p className="text-white text-xs font-black">Portal do Aluno</p>
              <p className="text-[10px] text-gray-500">Prescrito pelo seu Treinador</p>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
              className="h-full bg-gradient-to-r from-primary to-[#00FF85]"
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400">
            <span>Foco</span>
            <span className="text-[#00FF85] font-bold">Consistência 100%</span>
          </div>
        </div>
      ),
    },
    {
      title: "1. Painel Principal (Dashboard)",
      subtitle: "VISÃO GERAL DO SEU DIA",
      icon: LayoutDashboard,
      iconColor: "text-primary",
      bgGradient: "from-primary/10 to-transparent",
      description: "Sua tela principal! Aqui você vê o treino do dia, cardio acumulado e as últimas medições da sua avaliação física.",
      highlight: "Mantenha a frequência e bata suas metas de treino!",
      featureList: [
        "Acesso direto ao treino ativo do dia",
        "Histórico e peso da última avaliação",
        "Avisos rápidos e mensagens da academia",
      ],
      interactivePreview: (
        <div className="bg-[#121214] p-4 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-400">Frequência Semanal:</span>
              <span className="text-sm font-black text-primary flex items-center gap-1">
                <Flame className="w-4 h-4 text-orange-500 animate-bounce" fill="currentColor" /> 4/5 dias
              </span>
            </div>
            <span className="text-[10px] bg-emerald-400/10 text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              Ativo 💪
            </span>
          </div>
          <div className="bg-white/5 border border-white/5 p-3 rounded-xl flex items-center gap-3">
            <Scale className="w-4 h-4 text-blue-400" />
            <div className="flex-1">
              <p className="text-[10px] text-gray-400">Último Peso Registrado</p>
              <p className="text-xs text-white font-black">78.5 kg <span className="text-green-400 text-[9px] font-normal">(-1.2kg este mês)</span></p>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "2. Ficha de Treinos & Aparelhos",
      subtitle: "ACADEMIA & MUSCULAÇÃO INTEGRADA",
      icon: Dumbbell,
      iconColor: "text-[#00D1FF]",
      bgGradient: "from-[#00D1FF]/10 to-transparent",
      description: "Sua periodização de musculação completa está aqui. Cada exercício possui imagens e ilustrações do aparelho, séries, repetições, carga e tempo de descanso.",
      highlight: "Dê check na série ativa durante o treino para acompanhar sua evolução!",
      featureList: [
        "Acesso rápido às séries, repetições e cargas",
        "Ilustrações claras do aparelho e execução da máquina",
        "Seletor de treinos (Treino A, B, C, D) para o grupamento do dia",
      ],
      interactivePreview: (
        <div className="bg-[#121214] p-4 rounded-2xl border border-white/5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Dumbbell className="w-5 h-5 text-[#00D1FF]" />
            </div>
            <div>
              <p className="text-xs font-black text-white">Agachamento Livre / Leg Press</p>
              <p className="text-[9px] text-gray-500">4 Séries x 10 a 12 Reps</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-1">
            {[1, 2, 3, 4].map((serie) => (
              <div
                key={serie}
                className={`py-1.5 rounded-lg border text-center text-[10px] font-bold ${
                  serie <= 2
                    ? "bg-[#0FF]/15 border-[#0FF]/30 text-[#0FF]"
                    : "bg-white/5 border-white/5 text-gray-400"
                }`}
              >
                S{serie} {serie <= 2 ? "✓" : ""}
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      title: "3. Cardio & Registro Aeróbico",
      subtitle: "CONDICIONAMENTO & SAÚDE",
      icon: Activity,
      iconColor: "text-rose-500",
      bgGradient: "from-rose-500/10 to-transparent",
      description: "Mantenha o cardio em dia. Registre suas sessões de esteira, elíptico, bike ou escada para monitoramento contínuo.",
      highlight: "O trabalho aeróbico melhora seu condicionamento cardiovascular!",
      featureList: [
        "Prescrição de tempo e frequência definida pelo treinador",
        "Histórico e acompanhamento semanal do tempo acumulado",
        "Cronômetro e timer de suporte",
      ],
      interactivePreview: (
        <div className="bg-[#121214] p-4 rounded-2xl border border-white/5 space-y-3 text-left">
          <div className="bg-[#130E0F] border border-rose-500/20 p-2.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-rose-500" />
              <span className="text-[11px] text-rose-400 font-bold">Meta Semanal</span>
            </div>
            <span className="text-[10px] bg-rose-500/10 text-rose-400 py-0.5 px-2 rounded font-extrabold">30 MIN</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-[10px]">
              <span className="text-gray-400 block">Tempo feito</span>
              <span className="text-white font-extrabold text-sm">45 min</span>
            </div>
            <div className="bg-white/5 p-2 rounded-lg border border-white/5 text-[10px]">
              <span className="text-gray-400 block">Frequência</span>
              <span className="text-white font-extrabold text-sm">3x na sem</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "4. Fotos de Evolução & Avaliações",
      subtitle: "SEU PROGRESSO FÍSICO REAL",
      icon: TrendingUp,
      iconColor: "text-green-400",
      bgGradient: "from-green-400/10 to-transparent",
      description: "Acompanhe a transformação do seu corpo com gráficos de medidas corporais, dobras cutâneas e relatórios de avaliação física realizados pelo instrutor.",
      highlight: "Veja suas medidas e percentual de gordura diminuindo a cada reavaliação!",
      featureList: [
        "Fotos de evolução física (Frente, Lado, Costas)",
        "Gráficos de medidas (braço, tórax, coxa, abdômen)",
        "Histórico completo de laudos e bioimpedância / dobras",
      ],
      interactivePreview: (
        <div className="bg-[#121214] p-4 rounded-2xl border border-white/5 space-y-3">
          <div className="flex justify-around items-center gap-1.5">
            <div className="bg-white/5 rounded-lg p-1.5 border border-white/5 text-center flex-1">
              <div className="aspect-[4/5] bg-neutral-800 rounded flex items-center justify-center text-gray-500 font-bold text-[9px] uppercase mb-1">
                Frente
              </div>
              <span className="text-[9px] text-gray-400">Antes</span>
            </div>
            <div className="bg-[#00FF85]/10 rounded-lg p-1.5 border border-[#00FF85]/20 text-center flex-1 animate-pulse">
              <div className="aspect-[4/5] bg-[#00FF85]/20 rounded flex items-center justify-center text-[#00FF85] font-black text-[9px] uppercase mb-1">
                Depois
              </div>
              <span className="text-[9px] text-[#00FF85] font-bold">Hoje (-4% BF)</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("student_tour_completed", "true");
    onClose();
  };

  const currentTabToJump = ["dashboard", "dashboard", "treinos", "cardio", "fisico"][currentStep];

  const step = steps[currentStep];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300] flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 120 }}
          className="bg-[#0D0D0E] border border-dark-border rounded-[32px] max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col my-auto max-h-[95vh] md:max-h-[90vh]"
        >
          {/* Top Line decoration */}
          <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-[#00FF85] to-transparent`} />

          {/* Skip Button */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleComplete}
              className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-all border border-white/5 cursor-pointer flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6">
            {/* Header / Step Progress */}
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-primary/20 text-[#00FF85] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Guia do Aluno
                </span>
                <span className="text-xs text-gray-500 font-extrabold">
                  Passo {currentStep + 1} de {steps.length}
                </span>
              </div>
              
              {/* Progress Dots */}
              <div className="flex gap-1.5">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentStep ? "w-6 bg-primary" : "w-2 bg-white/10 hover:bg-white/20"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Title / Description */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-7 space-y-4 text-left">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black block">
                  {step.subtitle}
                </span>
                <h3 className="text-2xl md:text-3xl font-[900] text-white tracking-tight flex items-center gap-2">
                  <span className={`${step.iconColor}`}><step.icon className="w-8 h-8 inline" /></span>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed font-medium">
                  {step.description}
                </p>

                {step.highlight && (
                  <div className="border-l-2 border-primary/40 bg-primary/5 pl-3 py-1 text-xs text-primary font-bold">
                    💡 Tip: {step.highlight}
                  </div>
                )}

                <div className="space-y-2 pt-2">
                  <p className="text-[11px] text-gray-500 font-black uppercase tracking-wider">
                    Destaques desta seção:
                  </p>
                  <ul className="space-y-1.5">
                    {step.featureList.map((feat, i) => (
                      <li key={i} className="text-xs text-white flex items-start gap-2">
                        <span className="text-primary mt-0.5 font-bold">✓</span>
                        <span className="text-gray-300 font-medium">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Side Visual Preview (Interactive-looking mock) */}
              <div className="md:col-span-5 flex flex-col justify-center">
                <div className="relative p-1.5 bg-[#080809] border border-white/5 rounded-3xl shadow-2xl">
                  {/* Decorative notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-black rounded-full z-10 border border-white/5 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                  </div>
                  
                  <div className="pt-8 overflow-hidden rounded-2xl bg-black border border-white/5 min-h-[180px] flex flex-col justify-center">
                    {step.interactivePreview}
                  </div>
                </div>

                {onNavigateToTab && currentStep > 0 && (
                  <button
                    onClick={() => {
                      onNavigateToTab(currentTabToJump);
                      onClose();
                    }}
                    className="mt-3 text-center text-xs text-primary hover:underline font-bold focus:outline-none"
                  >
                    Ir direto para esta aba e testar →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Footer Controls */}
          <div className="p-6 md:px-10 md:py-6 bg-[#09090A] border-t border-white/5 flex justify-between items-center">
            {/* Quick close / Skip */}
            <button
              onClick={handleComplete}
              className="text-gray-500 hover:text-white text-xs font-[700] transition-colors cursor-pointer"
            >
              Pular Guia Completo
            </button>

            {/* Nav controls */}
            <div className="flex gap-2">
              {currentStep > 0 && (
                <button
                  onClick={handlePrev}
                  className="bg-white/5 hover:bg-white/10 border border-white/5 text-white font-[700] px-4 py-3 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" /> Voltar
                </button>
              )}

              <button
                onClick={handleNext}
                className="bg-primary hover:bg-primary/95 text-black font-black px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-1.5 cursor-pointer shadow-[0_4px_15px_rgba(0,255,133,0.15)] active:scale-95"
              >
                {currentStep === steps.length - 1 ? "Concluir & Começar!" : "Continuar"} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
