import React from 'react';
import {
  Dumbbell,
  Shield,
  Activity,
  Layers,
  Zap,
  Maximize2,
  CheckCircle2,
  AlertCircle,
  Wind,
  Info,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { getEquipmentVisualInfo, EquipmentVisualInfo } from '../utils/exerciseEquipmentVisuals';

interface ExerciseEquipmentVisualProps {
  name: string;
  muscleGroup?: string;
  equipment?: string;
  instructions?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  variant?: 'thumbnail' | 'card' | 'modal';
  className?: string;
  onClick?: () => void;
}

export function ExerciseEquipmentVisual({
  name,
  muscleGroup,
  equipment,
  instructions,
  imageUrl,
  thumbnailUrl,
  variant = 'card',
  className = '',
  onClick,
}: ExerciseEquipmentVisualProps) {
  const info: EquipmentVisualInfo = getEquipmentVisualInfo(name, muscleGroup, equipment);
  const displayImage = imageUrl || thumbnailUrl;

  // 1. Render schematic visual illustration based on machine/apparatus type
  const renderMachineDiagram = (isLarge: boolean = false) => {
    return (
      <div className={`relative w-full ${isLarge ? 'h-52 sm:h-64' : 'h-36 sm:h-44'} bg-gradient-to-br from-[#060a07] via-[#080808] to-[#040806] rounded-2xl overflow-hidden border border-[#00FF66]/20 flex items-center justify-center p-4 group select-none shadow-inner`}>
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none" 
          style={{ 
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0, 255, 102, 0.4) 1px, transparent 0)', 
            backgroundSize: '16px 16px' 
          }} 
        />

        {/* Ambient glow light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-[#00FF66]/10 to-[#00FF88]/10 blur-3xl pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/80 backdrop-blur-md border border-[#00FF66]/30 text-[#00FF66] flex items-center gap-1 shadow-lg">
            <Sliders className="w-3 h-3 text-[#00FF66]" />
            {info.type}
          </span>
        </div>

        <div className="absolute top-3 right-3 z-10">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66]">
            {info.apparatusType === 'machine' ? 'Aparelho Guiado' : info.apparatusType === 'pulley' ? 'Polia / Cabos' : info.apparatusType === 'dumbbell' ? 'Halteres Livres' : info.apparatusType === 'barbell' ? 'Barra / Anilhas' : 'Peso do Corpo'}
          </span>
        </div>

        {/* Custom gym equipment schematic SVG illustration */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className={`relative ${isLarge ? 'w-24 h-24' : 'w-16 h-16'} rounded-2xl bg-gradient-to-br from-[#00FF66]/10 to-[#00FF88]/10 border border-[#00FF66]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,102,0.15)] group-hover:scale-105 transition-transform duration-300`}>
            {info.apparatusType === 'machine' ? (
              <Layers className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]`} />
            ) : info.apparatusType === 'pulley' ? (
              <Zap className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-[#00FF88] drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]`} />
            ) : info.apparatusType === 'dumbbell' ? (
              <Dumbbell className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]`} />
            ) : info.apparatusType === 'barbell' ? (
              <Activity className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-[#00FF88] drop-shadow-[0_0_8px_rgba(0,255,136,0.6)]`} />
            ) : (
              <Shield className={`${isLarge ? 'w-12 h-12' : 'w-8 h-8'} text-[#00FF66] drop-shadow-[0_0_8px_rgba(0,255,102,0.6)]`} />
            )}
            
            {/* Corner accents */}
            <span className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-[#00FF66]" />
            <span className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-[#00FF88]" />
          </div>

          <div className="mt-3">
            <h5 className="text-xs sm:text-sm font-black text-white tracking-tight drop-shadow truncate max-w-[220px] sm:max-w-xs">
              {info.machineName}
            </h5>
            <p className="text-[10px] text-[#00FF66]/80 font-mono mt-0.5">
              Foco: {info.primaryMuscles.join(', ')}
            </p>
          </div>
        </div>

        {/* Bottom banner */}
        <div className="absolute bottom-2 inset-x-3 flex items-center justify-between text-[9px] text-zinc-400 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-white/5">
          <span className="flex items-center gap-1 text-[#00FF66] font-bold">
            <Sparkles className="w-2.5 h-2.5 text-[#00FF66]" /> JT Fitness
          </span>
          <span className="truncate max-w-[150px]">Ilustração do Equipamento</span>
        </div>
      </div>
    );
  };

  // Variant 1: THUMBNAIL (For lists and compact item rows)
  if (variant === 'thumbnail') {
    return (
      <div 
        onClick={onClick}
        className={`w-16 h-16 rounded-xl bg-[#090909] border border-[#00FF66]/20 flex flex-col items-center justify-center p-1 relative overflow-hidden flex-shrink-0 cursor-pointer group hover:border-[#00FF66] transition-all ${className}`}
        title={`Ver aparelho: ${name}`}
      >
        {displayImage ? (
          <img 
            src={displayImage} 
            alt={name} 
            className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" 
            referrerPolicy="no-referrer"
          />
        ) : (
          <>
            <div className="w-8 h-8 rounded-lg bg-[#00FF66]/10 flex items-center justify-center text-[#00FF66] group-hover:bg-[#00FF66]/20 transition-colors">
              {info.apparatusType === 'dumbbell' ? (
                <Dumbbell className="w-4 h-4" />
              ) : info.apparatusType === 'pulley' ? (
                <Zap className="w-4 h-4" />
              ) : info.apparatusType === 'barbell' ? (
                <Activity className="w-4 h-4" />
              ) : (
                <Layers className="w-4 h-4" />
              )}
            </div>
            <span className="text-[8px] text-[#00FF66] font-black tracking-tighter truncate w-full text-center mt-1">
              APARELHO
            </span>
          </>
        )}
      </div>
    );
  }

  // Variant 2: CARD (Standard exercise view inside workout builder & student execution)
  if (variant === 'card') {
    return (
      <div 
        onClick={onClick}
        className={`bg-[#080808] border border-[#00FF66]/20 rounded-2xl p-4 flex flex-col gap-3 cursor-pointer hover:border-[#00FF66]/50 hover:shadow-[0_0_20px_rgba(0,255,102,0.1)] transition-all ${className}`}
      >
        {displayImage ? (
          <div className="relative w-full h-44 rounded-xl overflow-hidden border border-white/10">
            <img 
              src={displayImage} 
              alt={name} 
              className="w-full h-full object-cover" 
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-black/80 text-[#00FF66] border border-[#00FF66]/30">
              {info.type}
            </div>
          </div>
        ) : (
          renderMachineDiagram(false)
        )}

        <div>
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm sm:text-base font-black text-white tracking-tight truncate">
              {name}
            </h4>
            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 shrink-0">
              {muscleGroup || info.category}
            </span>
          </div>

          {/* Quick muscle tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2">
            {info.primaryMuscles.map((m, idx) => (
              <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-zinc-300">
                🎯 {m}
              </span>
            ))}
            {info.apparatusType && (
              <span className="text-[10px] bg-[#00FF66]/10 border border-[#00FF66]/20 px-2 py-0.5 rounded-full text-[#00FF66]">
                ⚙️ {info.type}
              </span>
            )}
          </div>
        </div>

        {/* Quick execution instruction preview */}
        <div className="text-xs text-zinc-400 bg-black/60 p-2.5 rounded-xl border border-white/5 flex items-start gap-2">
          <Info className="w-3.5 h-3.5 text-[#00FF66] shrink-0 mt-0.5" />
          <p className="line-clamp-2 leading-relaxed text-[11px]">
            {instructions || info.executionTips[0] || 'Mantenha a postura estabilizada, respiração controlada e amplitude completa.'}
          </p>
        </div>
      </div>
    );
  }

  // Variant 3: MODAL (Full expanded modal with complete machine settings & biomechanics)
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {/* Top Machine Schematic Visual Banner */}
      {displayImage ? (
        <div className="w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#00FF66]/30 relative">
          <img 
            src={displayImage} 
            alt={name} 
            className="w-full h-full object-cover" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-black bg-black/80 text-[#00FF66] border border-[#00FF66]/30">
            {info.type}
          </div>
        </div>
      ) : (
        renderMachineDiagram(true)
      )}

      {/* Muscle Focus and Category */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Primary Muscles */}
        <div className="bg-[#0a0f0c] border border-[#00FF66]/20 rounded-2xl p-4">
          <h5 className="text-xs font-black uppercase tracking-wider text-[#00FF66] flex items-center gap-1.5 mb-2">
            <Activity className="w-4 h-4 text-[#00FF66]" />
            Músculos Primários (Alvo Principal)
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {info.primaryMuscles.map((m, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-[#00FF66]/10 border border-[#00FF66]/30 text-white font-bold text-xs">
                {m}
              </span>
            ))}
          </div>
        </div>

        {/* Secondary Muscles */}
        <div className="bg-[#080c09] border border-[#00FF88]/20 rounded-2xl p-4">
          <h5 className="text-xs font-black uppercase tracking-wider text-[#00FF88] flex items-center gap-1.5 mb-2">
            <Zap className="w-4 h-4 text-[#00FF88]" />
            Músculos Secundários & Sinergistas
          </h5>
          <div className="flex flex-wrap gap-1.5">
            {info.secondaryMuscles.map((m, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-[#00FF88]/10 border border-[#00FF88]/30 text-zinc-300 text-xs">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Machine Adjustment & Setup Guide */}
      <div className="bg-[#090909] border border-white/10 rounded-2xl p-5 shadow-lg">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 mb-3">
          <Sliders className="w-4 h-4 text-[#00FF66]" />
          Guia de Regulagem do Aparelho / Equipamento
        </h4>
        <div className="space-y-2.5">
          {info.setupGuide.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-zinc-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
              <span className="w-5 h-5 rounded-full bg-[#00FF66]/20 text-[#00FF66] font-black text-xs flex items-center justify-center shrink-0 mt-0.5 border border-[#00FF66]/30">
                {idx + 1}
              </span>
              <p className="leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Execution Tips & Biomechanics */}
      <div className="bg-[#090909] border border-white/10 rounded-2xl p-5 shadow-lg">
        <h4 className="text-sm font-black uppercase tracking-wider text-white flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
          Postura & Biomecânica de Execução
        </h4>
        
        {instructions ? (
          <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed bg-white/[0.02] p-3.5 rounded-xl border border-white/5 mb-3">
            {instructions}
          </p>
        ) : null}

        <div className="space-y-2">
          {info.executionTips.map((tip, idx) => (
            <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00FF66] mt-1.5 shrink-0" />
              <p className="leading-relaxed">{tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Breathing & Safety Tips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Breathing */}
        <div className="bg-gradient-to-br from-[#00FF66]/10 to-transparent border border-[#00FF66]/20 rounded-2xl p-4 flex items-start gap-3">
          <Wind className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-black uppercase text-[#00FF66] mb-1">Dica de Respiração</h5>
            <p className="text-xs text-zinc-300 leading-relaxed">{info.breathingTip}</p>
          </div>
        </div>

        {/* Safety */}
        <div className="bg-gradient-to-br from-amber-950/30 to-red-950/20 border border-amber-500/20 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-black uppercase text-amber-400 mb-1">Segurança Articular</h5>
            <p className="text-xs text-zinc-300 leading-relaxed">{info.safetyTip}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
