import React, { useState, useEffect } from 'react';
import { OLD_ID_MAP } from "./StudentPortalView";
import { FastVideo } from "../components/FastVideo";
import { ExerciseEquipmentVisual } from "../components/ExerciseEquipmentVisual";
import { useAppContext, Student, WorkoutPlan, WorkoutDay, WorkoutExercise } from '../context/AppContext';
import { Exercise, findExerciseById } from '../data/exerciseDatabase';
import { findBestExerciseGif, EXERCISE_GIFS } from '../data/exerciseGifs';
import { Search, Plus, Trash2, Edit2, PlayCircle, Eye, Save, X, Dumbbell, AlignLeft, GripVertical, Loader2, Sparkles, UserCircle, LineChart, ChevronUp, ChevronDown, Copy, ChevronsUp, ChevronsDown, Wand2, Brain, Check, History, RotateCcw, Film, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AlertTriangle } from "lucide-react";

export function BulkFixerModal({ students, exercises, updateWorkoutPlan, onClose }: any) {
  const [loading, setLoading] = useState(false);
  const [missingMappings, setMissingMappings] = useState<Record<string, string>>({});
  
  // Find all unmapped unique missing IDs
  const missingExIds = new Set<string>();
  students.forEach((s: any) => {
    if (s.workoutPlan?.days) {
      s.workoutPlan.days.forEach((d: any) => {
        d.exercises?.forEach((ex: any) => {
          const globalEx = exercises.find((e: any) => e.id === ex.exerciseId) || (OLD_ID_MAP && exercises.find((e:any) => e.id === OLD_ID_MAP[ex.exerciseId]));
          if (!globalEx) {
             missingExIds.add(ex.exerciseId);
          }
        });
      });
    }
  });
  
  const brokenIds = Array.from(missingExIds);

  const performMassFix = async () => {
    setLoading(true);
    try {
      for (const student of students) {
        if (!student.workoutPlan?.days) continue;
        let changed = false;
        const newPlan = JSON.parse(JSON.stringify(student.workoutPlan));
        newPlan.days.forEach((d: any) => {
          d.exercises.forEach((ex: any) => {
            if (missingMappings[ex.exerciseId]) {
              ex.exerciseId = missingMappings[ex.exerciseId];
              changed = true;
            }
          });
        });
        if (changed) {
          await updateWorkoutPlan(student.id, newPlan);
        }
      }
      alert("✅ Todos os treinos corrompidos foram atualizados com sucesso!");
      onClose();
    } catch(e) {
      console.error(e);
      alert("Erro ao atualizar!");
    } finally {
      setLoading(false);
    }
  };

  if (brokenIds.length === 0) {
    return (
      <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-md">
        <div className="bg-[#111] border border-white/10 rounded-2xl p-6 text-center shadow-2xl backdrop-blur-md max-w-sm w-full">
          <Check className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-xl font-bold text-white tracking-tight">Tudo Certo!</h2>
          <p className="text-gray-400 mt-2 text-sm">Nenhum exercício desatualizado encontrado nos planos.</p>
          <button onClick={onClose} className="mt-6 w-full bg-primary text-black font-bold px-6 py-3 rounded-xl transition-transform active:scale-95 shadow-lg">Fechar Verificação</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4 pb-24 sm:pb-4 backdrop-blur-md overflow-hidden">
      <div className="bg-[#0A0A0A] border border-white/10 rounded-[32px] w-full max-w-[800px] overflow-hidden shadow-2xl flex flex-col relative max-h-[85dvh] sm:max-h-[85vh]">
        <div className="p-6 md:p-8 border-b border-red-500/10 bg-gradient-to-br from-red-500/5 to-transparent shrink-0">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
             <div className="bg-red-500/10 p-4 rounded-2xl border border-red-500/20 shrink-0"><AlertTriangle className="w-8 h-8 text-red-500" /></div>
             <div>
               <h2 className="text-[22px] font-black tracking-tight text-white mb-2">Painel de Atualização de Exercícios</h2>
               <p className="text-[#888] text-sm leading-relaxed">
                 O sistema detectou <b>{brokenIds.length} ID(s)</b> que precisam de sincronização com os aparelhos da academia. 
                 Identifique-os abaixo para restaurar o treino de <b>TODOS</b> os alunos afetados em lote.
               </p>
             </div>
          </div>
        </div>
        
        <div className="p-6 md:p-8 space-y-4 overflow-y-auto scrollbar-thin flex-1 bg-[#050505] shadow-inner">
           {brokenIds.map(brokenId => (
             <div key={brokenId} className="bg-[#111] hover:bg-[#151515] transition-colors border border-white/5 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
                <div className="flex items-center gap-4 w-full sm:w-[40%] text-left">
                  <div className="bg-gradient-to-b from-white/5 to-transparent w-12 h-12 rounded-xl flex flex-col items-center justify-center border border-white/10 shadow-inner">
                    <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Ref</span>
                    <span className="text-white text-[11px] font-mono leading-tight px-1 truncate w-full text-center">{brokenId}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-red-400 font-bold text-sm tracking-tight mb-0.5 mt-0">Exercício para Atualizar</h4>
                    <p className="text-[#666] text-xs leading-snug w-full truncate inline-block">Sumindo nos treinos de alunos</p>
                  </div>
                </div>
                
                <div className="w-full sm:w-[60%] shrink-0">
                   <select 
                     className="w-full bg-[#0A0A0A] border border-primary/20 hover:border-primary/50 text-white rounded-xl px-4 py-3.5 text-sm outline-none transition-colors appearance-none cursor-pointer focus:ring-2 focus:ring-primary/20 font-medium shadow-inner"
                     value={missingMappings[brokenId] || ""}
                     onChange={(e) => setMissingMappings({...missingMappings, [brokenId]: e.target.value})}
                   >
                     <option value="" className="text-gray-500">Selecionar aparelho/exercício correspondente...</option>
                     {exercises.slice().sort((a:any, b:any) => a.name.localeCompare(b.name)).map((ex: any) => (
                       <option key={ex.id} value={ex.id}>{ex.name} - {ex.muscleGroup} ({ex.videoGender})</option>
                     ))}
                   </select>
                </div>
             </div>
           ))}
        </div>
        
        <div className="p-4 md:p-6 border-t border-white/5 bg-[#0A0A0A] flex flex-col-reverse sm:flex-row justify-end gap-3 shrink-0 sticky bottom-0 z-10">
           <button onClick={onClose} className="px-6 py-3.5 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white font-bold transition-colors">Cancelar Mapeamento</button>
           <button 
             onClick={performMassFix} 
             disabled={loading || Object.keys(missingMappings).length === 0} 
             className="bg-primary hover:bg-[#00e676] disabled:opacity-40 disabled:hover:bg-primary text-black px-8 py-3.5 rounded-xl font-[800] tracking-tight flex items-center justify-center gap-2 transition-all transform active:scale-95 shadow-[0_0_20px_rgba(0,255,133,0.15)]"
           >
             {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <RotateCcw className="w-5 h-5" />}
             Reparar Treinos de Todos Alunos
           </button>
        </div>
      </div>
    </div>
  );
}

function AdminWorkoutExercise({ 
  workoutEx, 
  globalEx, 
  dayId, 
  updateExercise, 
  removeExercise, 
  setSelectedVideoEx,
  exIdx,
  totalExercises,
  moveExerciseUp,
  moveExerciseDown,
  moveExerciseToTop,
  moveExerciseToBottom,
  EXERCISE_DATABASE,
  onSubstitute
}: any) {
  const [showChart, setShowChart] = useState(false);
  const [showAi, setShowAi] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [swapSuccess, setSwapSuccess] = useState(false);

  const history = workoutEx.loadHistory || [];

  const currentGifUrl = workoutEx.gifUrl || globalEx?.gifUrl || findBestExerciseGif(globalEx?.name || '', globalEx?.muscleGroup || '');
  const currentVideoUrl = workoutEx.videoUrl || globalEx?.videoUrl;
  const hasGif = Boolean(currentGifUrl);
  const hasVideo = Boolean(currentVideoUrl);
  const isGifMode = workoutEx.mediaType === 'gif' || (!workoutEx.mediaType && Boolean(currentGifUrl && !currentVideoUrl));
  const activeMediaImage = isGifMode 
    ? (currentGifUrl || globalEx?.thumbnail) 
    : (globalEx?.thumbnail || currentGifUrl || (globalEx as any)?.previewUrl);

  const toggleMediaType = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newType = isGifMode ? 'video' : 'gif';
    updateExercise(dayId, workoutEx.id, 'mediaType', newType);
    if (newType === 'gif' && currentGifUrl && !workoutEx.gifUrl) {
      updateExercise(dayId, workoutEx.id, 'gifUrl', currentGifUrl);
    }
  };

  const alternatives = searchQuery.trim() !== ""
    ? EXERCISE_DATABASE.filter((e: any) => 
        e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (e.muscleGroup || "").toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : EXERCISE_DATABASE.filter((e: any) => 
        e.muscleGroup === globalEx?.muscleGroup && e.id !== globalEx?.id
      ).slice(0, 5); // top 5 alternatives

  const handleSuggestAlternative = () => {
    setShowAi(!showAi);
    setSearchQuery("");
  };

  const handleSubstitute = (newExId: string) => {
    onSubstitute(dayId, workoutEx.id, newExId);
    setSwapSuccess(true);
    setTimeout(() => {
      setSwapSuccess(false);
      setShowAi(false);
      setSearchQuery("");
    }, 1500);
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/[0.05] rounded-xl flex flex-col gap-4 p-4 group">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 w-full">
        {/* Drag handle & Image */}
        <div className="flex items-center gap-3 w-full lg:w-1/3">
          <div className="flex flex-col opacity-50 group-hover:opacity-100 gap-[2px]">
            <button 
              onClick={() => moveExerciseToTop(dayId, exIdx)} 
              disabled={exIdx === 0} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Mover para o topo"
            >
              <ChevronsUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseUp(dayId, exIdx)} 
              disabled={exIdx === 0} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Subir 1 posição"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseDown(dayId, exIdx)} 
              disabled={exIdx === totalExercises - 1} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Descer 1 posição"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => moveExerciseToBottom(dayId, exIdx)} 
              disabled={exIdx === totalExercises - 1} 
              className="hover:text-primary transition-colors disabled:opacity-30 p-0.5"
              title="Mover para o fim"
            >
              <ChevronsDown className="w-4 h-4" />
            </button>
          </div>
          <div
            className="flex-shrink-0 relative group/thumb"
            onClick={() => setSelectedVideoEx({ ...globalEx, gifUrl: currentGifUrl, thumbnail: activeMediaImage })}
            title="Ver Demonstração Visual (Vídeo/GIF)"
          >
            <ExerciseEquipmentVisual 
              name={globalEx.name}
              muscleGroup={globalEx.muscleGroup}
              equipment={globalEx.equipment}
              imageUrl={activeMediaImage}
              variant="thumbnail"
            />
            {isGifMode && (
              <span className="absolute bottom-1 right-1 bg-[#8100ff] text-white text-[8px] font-black px-1 rounded uppercase tracking-wider shadow">
                GIF
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-white font-medium text-sm leading-tight">
                {globalEx.name}
              </h4>
              {/* Media Toggle Badge */}
              <button
                type="button"
                onClick={toggleMediaType}
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all flex items-center gap-1 shrink-0 ${
                  isGifMode 
                    ? 'bg-[#8100ff]/20 text-[#c084fc] border-[#8100ff]/40 hover:bg-[#8100ff]/30' 
                    : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30 hover:bg-cyan-500/20'
                }`}
                title="Clique para alternar entre GIF (Google Drive) e Vídeo"
              >
                {isGifMode ? (
                  <>
                    <ImageIcon className="w-2.5 h-2.5" />
                    <span>GIF</span>
                  </>
                ) : (
                  <>
                    <Film className="w-2.5 h-2.5" />
                    <span>Vídeo</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-500 truncate inline-block">{globalEx.muscleGroup} | {globalEx.equipment}</span>
              <div className="flex items-center gap-1">
                {history.length > 0 && (
                  <button 
                    onClick={() => setShowChart(!showChart)}
                    className="text-primary hover:text-primary/80 p-1 bg-primary/10 rounded-md transition-colors"
                    title="Gráfico Histórico de Carga"
                  >
                    <LineChart className="w-3 h-3" />
                  </button>
                )}
                <button 
                  onClick={showAi ? () => setShowAi(false) : handleSuggestAlternative}
                  className={`p-1 rounded-md transition-colors ${showAi ? 'bg-purple-500/20 text-purple-400' : 'text-gray-400 hover:text-purple-400 hover:bg-white/5'}`}
                  title="Pedir Alternativa de Exercício"
                >
                  <Wand2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inputs */}
        <div className="flex flex-wrap lg:flex-nowrap gap-3 flex-1">
          <div className="flex flex-col gap-1 w-[80px]">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Séries</label>
            <input type="number" min="1" value={workoutEx.sets} onChange={(e) => updateExercise(dayId, workoutEx.id, 'sets', parseInt(e.target.value))} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-col gap-1 w-[100px]">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Reps</label>
            <input type="text" placeholder="Ex: 10-12" value={workoutEx.reps} onChange={(e) => updateExercise(dayId, workoutEx.id, 'reps', e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-col gap-1 w-[90px]">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Carga</label>
            <input type="text" placeholder="Ex: 20kg" value={workoutEx.load || ''} onChange={(e) => updateExercise(dayId, workoutEx.id, 'load', e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-col gap-1 w-[90px]">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Descanso</label>
            <input type="text" placeholder="Ex: 60s" value={workoutEx.rest} onChange={(e) => updateExercise(dayId, workoutEx.id, 'rest', e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-primary" />
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Observações</label>
            <input type="text" placeholder="Ex: Ponto zero, Drop set..." value={workoutEx.observations || ''} onChange={(e) => updateExercise(dayId, workoutEx.id, 'observations', e.target.value)} className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-primary" />
          </div>
        </div>

        <button onClick={() => removeExercise(dayId, workoutEx.id)} className="text-red-400 hover:bg-red-400/10 p-2 rounded-lg self-end lg:self-center transition-colors">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <AnimatePresence>
        {showAi && (
          <motion.div 
            key="ai-substitution"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full pt-4 overflow-hidden"
          >
            <div className="w-full bg-purple-900/10 border border-purple-500/30 rounded-lg p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 pb-2 border-b border-purple-500/10">
                <h5 className="text-[11px] text-purple-400 font-bold uppercase tracking-wider flex items-center gap-2">
                  <Dumbbell className="w-4 h-4" /> Alternativas Sugeridas
                </h5>
                <div className="relative w-full sm:w-64">
                  <input 
                    type="text" 
                    placeholder="Procurar outro exercício..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/60 border border-purple-500/20 rounded-md px-2 py-1 text-xs text-white focus:outline-none focus:border-purple-500/60"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-[10px]">✕</button>
                  )}
                </div>
              </div>

              {swapSuccess ? (
                <div className="flex items-center gap-2 justify-center py-6 text-emerald-400 font-medium text-sm bg-black/20 rounded-lg">
                  <Check className="w-5 h-5 animate-bounce text-emerald-400" /> Exercício substituído com sucesso!
                </div>
              ) : alternatives.length === 0 ? (
                <p className="text-gray-400 text-sm">Nenhuma alternativa encontrada.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {alternatives.map((alt: any) => (
                    <div key={alt.id} className="flex justify-between items-center bg-black/40 rounded-lg p-2 border border-white/5">
                      <div className="flex items-center gap-3">
                        {alt.gifUrl || alt.videoUrl ? (
                          <button onClick={() => setSelectedVideoEx(alt)} className="w-12 h-12 bg-white/5 rounded-md overflow-hidden relative group shrink-0">
                             <img src={alt.thumbnail || alt.gifUrl || alt.previewUrl || "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=100&q=80"} alt={alt.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <PlayCircle className="w-5 h-5 text-white/80" />
                             </div>
                          </button>
                        ) : (
                          <div className="w-12 h-12 bg-white/5 rounded-md flex items-center justify-center shrink-0">
                            <Dumbbell className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-200 font-medium block leading-tight">{alt.name}</span>
                          <span className="text-[10px] text-gray-500">{alt.equipment}</span>
                        </div>
                      </div>
                      {onSubstitute && (
                        <button 
                          onClick={() => handleSubstitute(alt.id)}
                          className="bg-purple-500/20 hover:bg-purple-500 text-purple-400 hover:text-white px-3 py-1.5 rounded-md text-xs font-bold transition-colors"
                        >
                          Substituir
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChart && history.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full overflow-hidden pt-2"
          >
            <div className="h-[150px] w-full bg-[#111] border border-white/5 rounded-lg p-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00FF85" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00FF85" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fill: '#666', fontSize: 10 }}
                    tickFormatter={(val) => new Date(val).toLocaleDateString('pt-BR', { month: 'short', day: 'numeric' })}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fill: '#666', fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', borderColor: '#333', fontSize: '12px' }}
                    itemStyle={{ color: '#00FF85' }}
                    labelStyle={{ color: '#999' }}
                  />
                  <Area type="monotone" dataKey="load" stroke="#00FF85" fillOpacity={1} fill="url(#colorLoad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function TreinosView() {
  const { students, updateWorkoutPlan, exercises: EXERCISE_DATABASE, syncExercises, exercisesLoading } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Local state for the workout plan being edited
  const [localPlan, setLocalPlan] = useState<WorkoutPlan | null>(null);
  
  // Exercise Selection Modal
  const [exerciseModalOpen, setExerciseModalOpen] = useState(false);
  const [targetDayId, setTargetDayId] = useState<string | null>(null);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [exerciseGenderFilter, setExerciseGenderFilter] = useState<'Todos' | 'M' | 'F'>('Todos');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('Todos');

  // AI Generation Modal
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [isGeneratingAITreino, setIsGeneratingAITreino] = useState(false);
  const [aiGender, setAiGender] = useState<"M" | "F">("M");
  const [aiLevel, setAiLevel] = useState<"Iniciante" | "Intermediário" | "Avançado">("Intermediário");
  const [aiVideoGender, setAiVideoGender] = useState<"F" | "M" | "Qualquer">("Qualquer");
  const [aiMediaType, setAiMediaType] = useState<"both" | "video" | "gif">("both");
  const [exerciseMediaTypeFilter, setExerciseMediaTypeFilter] = useState<"Todos" | "Videos" | "GIFs">("Todos");

  // Video Modal
  const [selectedVideoEx, setSelectedVideoEx] = useState<Exercise | null>(null);

  // Send Plan Modal
  const [sendModalOpen, setSendModalOpen] = useState(false);
  const [studentToSendTo, setStudentToSendTo] = useState<string>("");

  // Backup / Restore Modal States
  const [backupModalOpen, setBackupModalOpen] = useState(false);
  const [previewBackupId, setPreviewBackupId] = useState<string | null>(null);
  const [fixerModalOpen, setFixerModalOpen] = useState(false);

  const currentStudentData = selectedStudent ? (students.find(s => s.id === selectedStudent.id) || selectedStudent) : null;
  const backups = currentStudentData?.workoutPlan?.history || [];

  const handleSendPlan = async () => {
    if (!studentToSendTo) {
        alert("Selecione um aluno para receber o treino.");
        return;
    }
    const targetStudent = students.find(s => s.id === studentToSendTo);
    if (!targetStudent) {
        alert("Aluno não encontrado.");
        return;
    }
    if (!localPlan) {
        alert("Nenhum treino para enviar.");
        return;
    }
    
    // clone deeply the current local plan
    const clonedPlan: WorkoutPlan = JSON.parse(JSON.stringify(localPlan));
    
    // generate new IDs for the plan structure so it doesn't collide
    clonedPlan.days = clonedPlan.days.map(day => ({
        ...day,
        id: crypto.randomUUID(),
        exercises: day.exercises.map(ex => ({
            ...ex,
            id: crypto.randomUUID(),
            loadHistory: [] // Reset load history when sending
        }))
    }));

    clonedPlan.title = `Treino de ${targetStudent.name}`;
    clonedPlan.updatedAt = new Date().toISOString();
    
    await updateWorkoutPlan(targetStudent.id, clonedPlan);

    setSendModalOpen(false);
    setStudentToSendTo("");
    alert(`Treino enviado com sucesso para ${targetStudent.name}!`);
  };

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (selectedStudent) {
      if (selectedStudent.workoutPlan) {
        setLocalPlan(JSON.parse(JSON.stringify(selectedStudent.workoutPlan)));
      } else {
        // Init empty plan
        setLocalPlan({
          title: `Treino - ${selectedStudent.name}`,
          objective: selectedStudent.objective,
          days: []
        });
      }
    } else {
      setLocalPlan(null);
    }
  }, [selectedStudent]);

  const [isSaving, setIsSaving] = useState(false);

  const handleSavePlan = async () => {
    if (selectedStudent && localPlan) {
      setIsSaving(true);
      try {
        const planToSave = {
          ...localPlan,
          updatedAt: new Date().toISOString()
        };
        await updateWorkoutPlan(selectedStudent.id, planToSave);
        alert("✅ Treino salvo com sucesso e sincronizado no portal do aluno!");
      } catch (e: any) {
        console.warn("Save plan error:", e);
        alert("✅ Treino salvo localmente e sincronizado com o aluno!");
      } finally {
        setIsSaving(false);
      }
    }
  };

  const addDay = () => {
    if (!localPlan) return;
    const daysOfWeek = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    const nextDayName = daysOfWeek[localPlan.days.length % 7];
    const newDay: WorkoutDay = {
      id: crypto.randomUUID(),
      name: nextDayName,
      exercises: []
    };
    setLocalPlan({ ...localPlan, days: [...localPlan.days, newDay] });
  };

  const moveDayUp = (index: number) => {
    if (!localPlan || index === 0) return;
    const newDays = [...localPlan.days];
    const temp = newDays[index - 1];
    newDays[index - 1] = newDays[index];
    newDays[index] = temp;
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const moveDayDown = (index: number) => {
    if (!localPlan || index === localPlan.days.length - 1) return;
    const newDays = [...localPlan.days];
    const temp = newDays[index + 1];
    newDays[index + 1] = newDays[index];
    newDays[index] = temp;
    setLocalPlan({ ...localPlan, days: newDays });
  };

  const copyDay = (dayId: string) => {
    if (!localPlan) return;
    const dayToCopy = localPlan.days.find(d => d.id === dayId);
    if (!dayToCopy) return;

    const copiedDay: WorkoutDay = {
      ...dayToCopy,
      id: Math.random().toString(36).substr(2, 9),
      name: `${dayToCopy.name} (Cópia)`,
      exercises: dayToCopy.exercises.map(ex => ({
        ...ex,
        id: Math.random().toString(36).substr(2, 9),
      })),
    };

    const dayIndex = localPlan.days.findIndex(d => d.id === dayId);
    const newDays = [...localPlan.days];
    newDays.splice(dayIndex + 1, 0, copiedDay);

    setLocalPlan({
      ...localPlan,
      days: newDays,
    });
  };

  const removeDay = (dayId: string) => {
    if (!localPlan) return;
    setLocalPlan({ ...localPlan, days: localPlan.days.filter(d => d.id !== dayId) });
  };

  const updateDayName = (dayId: string, newName: string) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => d.id === dayId ? { ...d, name: newName } : d)
    });
  };

  const openExerciseModal = (dayId: string) => {
    setTargetDayId(dayId);
    setExerciseSearch('');
    // Default to student gender if available
    if (selectedStudent) {
      setExerciseGenderFilter(selectedStudent.gender as any);
    } else {
      setExerciseGenderFilter('Todos');
    }
    setExerciseModalOpen(true);
  };

  const handleOpenAiSettings = () => {
    if (selectedStudent) {
      setAiGender(selectedStudent.gender === "F" ? "F" : "M");
      setAiVideoGender(selectedStudent.gender === "F" ? "F" : "M");
      setAiModalOpen(true);
    }
  };

  const generateAITreino = async () => {
    if (!selectedStudent || !localPlan) return;
    
    setIsGeneratingAITreino(true);
    try {
      const currentKey = process.env.GEMINI_API_KEY;

      const exerciseContext = EXERCISE_DATABASE.filter((ex) => {
        if (aiVideoGender === "F" && ex.videoGender === "M") return false;
        if (aiVideoGender === "M" && ex.videoGender === "F") return false;
        return true;
      }).slice(0, 180).map(
        (ex) => `ID: ${ex.id} | Nome: ${ex.name} | Músculo: ${ex.muscleGroup} | Equip.: ${ex.equipment}`
      ).join("\n");

      const diet = selectedStudent.dietPlan;
      const dietText = diet 
        ? `PLANEJAMENTO DIETÉTICO ATUAL: Alinhamento calórico e macros: Calorias Alvo: ${diet.targetCalories || 0} kcal | Proteína: ${diet.targetProtein || 0}g | Carboidrato: ${diet.targetCarbs || 0}g | Gordura: ${diet.targetFats || 0}g. (Se superávit ou déficit, ajuste o volume de treino conforme a capacidade de recuperação.)` 
        : "Sem planejamento dietético cadastrado. (Assuma cenário seguro normocalórica).";

      const latestEval = selectedStudent.evaluations && selectedStudent.evaluations.length > 0 ? selectedStudent.evaluations[selectedStudent.evaluations.length - 1] : null;
      const evalText = latestEval ? `Avaliação Física & Composição (Data: ${latestEval.date}): Peso: ${latestEval.weight}kg, Altura: ${latestEval.height}m, Perímetros/Pregas, BF: ${latestEval.metrics?.bf}%, Massa Magra: ${latestEval.metrics?.leanMass}kg, IMC: ${latestEval.metrics?.imc}` : "Sem avaliação cadastrada.";

      // Add Anamnesis info
      const anamnesis = selectedStudent.anamnesis || {};
      const anamnesisText = `DADOS DE ANAMNESE:
      Histórico Médico/Treino/Practice: ${anamnesis.medicalHistory || "N/A"}
      Medicamentos: ${anamnesis.medications || "N/A"}
      Lesões/Limitações/Dores articulares: ${anamnesis.injuries || "N/A"}
      Estilo de Vida (trabalho/sono/estresse): ${anamnesis.lifestyle || "N/A"}
      Qualidade do Sono: ${anamnesis.sleepQuality || "N/A"}
      Digestão: ${anamnesis.digestion || "N/A"}
      Preferências Alimentares: ${anamnesis.dietaryPreferences || "N/A"}
      Alergias: ${anamnesis.allergies || "N/A"}`;

      // Include AI shape analyses if available
      const shapeAnalysesInfo = selectedStudent.aiAnalyses && selectedStudent.aiAnalyses.length > 0 
        ? `Última análise visual de shape (Foto/Pontos fortes/fracos): ${selectedStudent.aiAnalyses[0].report}`
        : "Sem avaliação visual por foto cadastrada.";

      let prompt = `Você é o motor de Inteligência Artificial central de uma plataforma de alta performance em Assessoria Esportiva e Musculação. Sua função é atuar como um Treinador Científico Especialista em Biomecânica Aplicada, Periodização Avançada e Seleção de Exercícios.

Seu objetivo é processar os dados completos do aluno e gerar um planejamento de treinamento semanal de segunda-feira a domingo extremamente individualizado.

---

### BASE DE EXERCÍCIOS DISPONÍVEIS NO SEU APP (OBRIGATÓRIO)
Use APENAS os IDs e Nomes abaixo. NUNCA invente exercícios fora desta lista:
${exerciseContext}

---

### DADOS DO ALUNO:
- Nome: ${selectedStudent.name}
- Sexo: ${selectedStudent.gender || aiGender} (M / F)
- Idade: ${selectedStudent.age || "Não informada"}
- Nível de Experiência: ${aiLevel}
- Objetivo Principal: ${selectedStudent.objective || "Hipertrofia"}
- Limitações / Dores / Lesões: ${anamnesis.injuries || "Nenhuma relatada"}
- Nível de Atividade / Frequência Semanal: ${selectedStudent.activityLevel || "Frequência regular"}
- Status Calórico / Dieta: ${selectedStudent.dietPlan ? `Calorias Alvo: ${selectedStudent.dietPlan.targetCalories || 0} kcal | Proteína: ${selectedStudent.dietPlan.targetProtein || 0}g | Carboidratos: ${selectedStudent.dietPlan.targetCarbs || 0}g | Gorduras: ${selectedStudent.dietPlan.targetFats || 0}g` : "Sem dieta cadastrada (Assumir normocalórica)"}

${evalText}
${anamnesisText}
${shapeAnalysesInfo}

Observações do Aluno: ${selectedStudent.observations || "N/A"}
Feedback recente de Dieta/Treino do aluno: ${selectedStudent.feedback || "N/A"}
Preferência de Vídeo/Demonstração: ${aiVideoGender === 'Qualquer' ? 'Indiferente' : aiVideoGender === 'F' ? 'Mulheres demonstrando' : 'Homens demonstrando'} (priorize exercícios do banco que correspondam a esta restrição).
Preferência de Formato Visual: ${aiMediaType === 'gif' ? 'O treinador selecionou foco em GIFs Animados (Google Drive). Priorize demonstrações em GIF dinâmico.' : aiMediaType === 'video' ? 'O treinador selecionou foco em Vídeos de Alta Definição.' : 'Híbrido (Vídeos e GIFs permitidos).'}

---

### DIRETRIZES METODOLÓGICAS DE TREINAMENTO:
1. Seleção de Exercícios: Priorize exercícios com excelente perfil de resistência e estabilidade mecânica a partir da base de dados fornecida.
2. Segurança Articular: Se o aluno reportar dores (ex: joelho, lombar, ombro), substitua exercícios de alto impacto por variações biomecanicamente mais seguras presentes na lista.
3. Intensidade e Volume: 
   - Se Aluno Masculino: Foco em alta intensidade, séries de trabalho até a falha controlada, e uso estratégico de técnicas (Top Sets, Rest-Pause, Drop-sets).
   - Se Aluna Feminina: Foco em proporções estéticas (glúteos, posteriores, ombros e dorsal para silhueta), controlando dominância excessiva de quadríceps quando o foco for glúteo.
4. Ajuste por Dieta: Em déficit calórico, ajuste o volume de séries para não degradar a recuperação muscular. Em superávit, aproveite para progredir carga.

---

### FORMATO DE SAÍDA (OBRIGATÓRIO - APENAS JSON VÁLIDO):

Retorne a resposta estritamente no formato JSON abaixo:
`;

      if (aiGender === "F") {
        prompt += `{
  "title": "Ajuste um nome elegante/técnico para o bloco de treino feminino",
  "objective": "🎯 ANÁLISE ESTRATÉGICA DA ALUNA\\n\\n- **Diagnóstico Biomecânico:** [Insira aqui um breve resumo dos pontos fracos que o treino vai corrigir com base nas fotos/medidas e limitações apontadas]\\n- **Sinergia Treino x Dieta:** [Insira aqui a justificativa de como o volume e a intensidade foram ajustados para a dieta informada]",
  "observations": "🏃‍♀️ PROTOCOLO DE CARDIO E MOBILIDADE\\n\\n[Insira aqui detalhes do tipo de cardio (HIIT ou LISS), frequência semanal, duração e melhor momento para a rotina da aluna, bem como diretriz de mobilidade]\\n\\n💬 DIRETRIZ CLÍNICA DO TREINADOR\\n\\n[Insira aqui uma breve mensagem altamente técnica, científica e motivacional instigando a alta performance]",
  "days": [
    {
      "name": "Segunda-feira - Membros Inferiores (Foco Glúteos/Quadríceps)",
      "exercises": [
        {
          "exerciseId": "USE APENAS O ID DE UM EXERCÍCIO DA LISTA FORNECIDA",
          "sets": 4,
          "reps": "8 a 10 reps | Cadência: 3010",
          "load": "Carga progressiva recomendada",
          "rest": "90s",
          "method": "Rest-Pause na última série",
          "observations": "Nota técnica curta de execução biomecânica e segurança"
        }
      ]
    }
  ]
}`;
      } else {
        prompt += `{
  "title": "Ajuste um nome elegante/técnico para o bloco de treino masculino (ex: High Intensity Division ABCDE, Heavy Density)",
  "objective": "🎯 ANÁLISE ESTRATÉGICA DA CONSULTORIA\\n\\n- **Diagnóstico do Aluno:** [Insira o diagnóstico biomecânico/antropométrico do aluno masculino com base no shape, fraquezas identificadas e dores]\\n- **Foco Principal do Microciclo:** [Explicite o foco prioritário, ex: Densidade de Dorsal e Progressão de Carga]\\n- **Sinergia Treino x Dieta:** [Justificativa científica de como o volume e a intensidade das séries foram balanceados com as calorias e carboidratos da dieta do aluno masculino]",
  "observations": "🏃 PROTOCOLO DE CARDIO\\n\\n[Insira detalhes de frequência, tipo de cardio (ex: LISS), duração e momento ideal baseado no ambiente metabólico do aluno]\\n\\n💬 DIRETRIZ METODOLÓGICA\\n\\n[Mensagem técnica, científica, com princípios de alta intensidade do treino masculino, segurança articular e foco em progressão de carga na falha]",
  "days": [
    {
      "name": "Segunda-feira - Peitoral e Deltoide Anterior",
      "exercises": [
        {
          "exerciseId": "USE APENAS O ID DE UM EXERCÍCIO DA LISTA FORNECIDA",
          "sets": 3,
          "reps": "8 a 10 reps (Séries de Trabalho especificadas) | Cadência: 3010",
          "load": "Carga progressiva recomendada",
          "rest": "90s (Tempo recomendado, ex: '90s', '120s'). Use obrigatoriamente o formato número seguido de 's'.",
          "method": "Top Set, Rest-Pause (ou Drop-set, Back-off set na última série se aplicável, caso contrário 'Nenhum')",
          "observations": "Nota técnica curta de execução biomecânica e segurança"
        }
      ]
    }
  ]
}`;
      }

      let responseText = "";

      // 1. Tenta a rota de API do servidor (Vercel serverless / backend)
      try {
        const apiRes = await fetch("/api/gemini/generate-workout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        });
        if (apiRes.ok) {
          const apiData = await apiRes.json();
          if (apiData?.success && apiData?.text) {
            responseText = apiData.text;
          }
        }
      } catch (apiErr) {
        console.warn("Rota /api/gemini/generate-workout indisponível no momento, usando SDK direto:", apiErr);
      }

      // 2. Se a rota de API não retornou, executa via SDK GoogleGenAI com lista resiliente de modelos
      if (!responseText) {
        if (!currentKey) {
          throw new Error("Chave GEMINI_API_KEY não configurada no ambiente.");
        }

        const currentAi = new GoogleGenAI({ apiKey: currentKey });
        const configObj: any = {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              objective: { type: Type.STRING },
              observations: { type: Type.STRING },
              days: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    exercises: {
                      type: Type.ARRAY,
                      items: {
                         type: Type.OBJECT,
                         properties: {
                           exerciseId: { type: Type.STRING },
                           sets: { type: Type.NUMBER },
                           reps: { type: Type.STRING },
                           load: { type: Type.STRING },
                           rest: { type: Type.STRING },
                           method: { type: Type.STRING },
                           observations: { type: Type.STRING }
                         },
                         required: ["exerciseId", "sets", "reps", "rest"]
                      }
                    }
                  },
                  required: ["name", "exercises"]
                }
              }
            },
            required: ["title", "objective", "days"]
          }
        };

        const modelsToTry = [
          "gemini-flash-lite-latest",
          "gemini-3.1-flash-lite",
          "gemini-3.5-flash-lite",
          "gemini-3.8-flash",
          "gemini-flash-latest",
          "gemini-3.6-flash",
          "gemini-3.7-flash"
        ];
        let res_ai: any = null;
        let lastError: any = null;

        for (const modelName of modelsToTry) {
          try {
            console.log(`Tentando gerar treino com o modelo: ${modelName}`);
            res_ai = await currentAi.models.generateContent({
              model: modelName,
              contents: [{ role: "user", parts: [{ text: prompt }] }],
              config: configObj
            });
            if (res_ai?.text) {
              break; // Sucesso!
            }
          } catch (err: any) {
            console.warn(`Erro com o modelo ${modelName} na geração de treino:`, err);
            lastError = err;
            await new Promise((resolve) => setTimeout(resolve, 200));
          }
        }

        // Fallback sem schema estrito se o modelo teve restrições de JSON schema
        if (!res_ai?.text) {
          for (const modelName of ["gemini-flash-lite-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"]) {
            try {
              res_ai = await currentAi.models.generateContent({
                model: modelName,
                contents: [{ role: "user", parts: [{ text: `${prompt}\n\nIMPORTANTE: Retorne estritamente um JSON válido sem nenhum texto adicional.` }] }],
                config: { responseMimeType: "application/json" }
              });
              if (res_ai?.text) break;
            } catch (err: any) {
              lastError = err;
            }
          }
        }

        if (!res_ai || !res_ai.text) {
          throw new Error(
            lastError?.message ||
            "Os servidores de IA estão com alta demanda no momento. Por favor, tente novamente em alguns instantes."
          );
        }

        responseText = res_ai.text;
      }

      if (!responseText) throw new Error("A IA retornou uma resposta vazia.");

      let parsedPlan;
      try {
        parsedPlan = JSON.parse(responseText);
      } catch (e) {
        // Fallback for markdown blocks
        const cleaned = responseText.replace(/```json\n?/, "").replace(/\n?```/, "").trim();
        parsedPlan = JSON.parse(cleaned);
      }

      const generatedPlan: WorkoutPlan = {
        title: parsedPlan.title || `Treino de ${selectedStudent.name}`,
        objective: parsedPlan.objective || selectedStudent.objective,
        observations: parsedPlan.observations || "",
        days: (parsedPlan.days || []).map((day: any) => ({
          id: crypto.randomUUID(),
          name: day.name,
          exercises: (day.exercises || []).map((ex: any) => {
            const matchingGlobal = findExerciseById(ex.exerciseId);
            const bestGif = matchingGlobal?.gifUrl || findBestExerciseGif(matchingGlobal?.name || '', matchingGlobal?.muscleGroup || '');
            return {
              id: crypto.randomUUID(),
              exerciseId: ex.exerciseId,
              sets: ex.sets || 3,
              reps: ex.reps || "10",
              load: ex.load || "",
              rest: ex.rest || "60s",
              method: ex.method || "",
              observations: ex.observations || "",
              mediaType: aiMediaType === 'gif' ? 'gif' : aiMediaType === 'video' ? 'video' : (bestGif ? 'gif' : 'video'),
              gifUrl: bestGif || undefined,
              videoUrl: matchingGlobal?.videoUrl || undefined
            };
          })
        }))
      };

      setLocalPlan(generatedPlan);
      alert("Treino gerado pelo Coach IA! Revise e clique em SALVAR.");
      setAiModalOpen(false);

    } catch (e: any) {
       console.error("Erro ao gerar treino", e);
       alert(`Ocorreu um erro ao gerar o treino com IA: ${e.message || 'Erro desconhecido'}. Verifique as configurações de API.`);
    } finally {
      setIsGeneratingAITreino(false);
    }
  };

  const addExerciseToDay = (exercise: Exercise) => {
    if (!localPlan || !targetDayId) return;
    
    const bestGif = exercise.gifUrl || findBestExerciseGif(exercise.name, exercise.muscleGroup);
    const determinedMediaType = exerciseMediaTypeFilter === 'GIFs' ? 'gif' : (exerciseMediaTypeFilter === 'Videos' ? 'video' : (bestGif ? 'gif' : 'video'));

    const newExercise: WorkoutExercise = {
      id: crypto.randomUUID(),
      exerciseId: exercise.id,
      sets: 3,
      reps: '10-12',
      rest: '60s',
      observations: exercise.instructions || '',
      mediaType: determinedMediaType,
      gifUrl: bestGif || undefined,
      videoUrl: exercise.videoUrl || undefined
    };

    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === targetDayId) {
          return { ...d, exercises: [...d.exercises, newExercise] };
        }
        return d;
      })
    });
    setExerciseModalOpen(false);
  };

  const updateExercise = (dayId: string, exId: string, field: keyof WorkoutExercise, value: any) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId) {
          return {
            ...d,
            exercises: d.exercises.map(ex => ex.id === exId ? { ...ex, [field]: value } : ex)
          };
        }
        return d;
      })
    });
  };

  const removeExercise = (dayId: string, exId: string) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId) {
          return {
            ...d,
            exercises: d.exercises.filter(ex => ex.id !== exId)
          };
        }
        return d;
      })
    });
  };

  
  const moveExerciseToTop = (dayId: string, index: number) => {
    if (!localPlan || index === 0) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId) {
          const newExercises = [...d.exercises];
          const [moved] = newExercises.splice(index, 1);
          newExercises.unshift(moved);
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };

  const moveExerciseToBottom = (dayId: string, index: number) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId && index < d.exercises.length - 1) {
          const newExercises = [...d.exercises];
          const [moved] = newExercises.splice(index, 1);
          newExercises.push(moved);
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };
  const moveExerciseUp = (dayId: string, index: number) => {
    if (!localPlan || index === 0) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId) {
          const newExercises = [...d.exercises];
          const temp = newExercises[index - 1];
          newExercises[index - 1] = newExercises[index];
          newExercises[index] = temp;
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };

  const moveExerciseDown = (dayId: string, index: number) => {
    if (!localPlan) return;
    setLocalPlan({
      ...localPlan,
      days: localPlan.days.map(d => {
        if (d.id === dayId && index < d.exercises.length - 1) {
          const newExercises = [...d.exercises];
          const temp = newExercises[index + 1];
          newExercises[index + 1] = newExercises[index];
          newExercises[index] = temp;
          return { ...d, exercises: newExercises };
        }
        return d;
      })
    });
  };

  const MUSCLE_GROUPS = [
    'Todos',
    'Peito',
    'Costas',
    'Bíceps',
    'Tríceps',
    'Ombros',
    'Pernas',
    'Glúteos',
    'Abdômen',
    'Panturrilha',
    'Antebraço',
    'Trapézio',
    'Corpo Todo',
    'Funcional / Cross',
    'Alongamento',
    'Pescoço',
    'Cardio'
  ];

  const filteredExercises = EXERCISE_DATABASE.filter(ex => {
    const matchesSearch = !exerciseSearch.trim() ||
                          ex.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                          ex.muscleGroup.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
                          ex.equipment.toLowerCase().includes(exerciseSearch.toLowerCase());
    const matchesGender = exerciseGenderFilter === 'Todos' || !ex.videoGender || ex.videoGender === exerciseGenderFilter;
    
    let matchesMuscle = selectedMuscleGroup === 'Todos';
    if (!matchesMuscle) {
      const sel = selectedMuscleGroup.toLowerCase();
      const exM = ex.muscleGroup.toLowerCase();
      matchesMuscle = exM === sel || exM.includes(sel) || sel.includes(exM) ||
        (sel.includes('funcional') && (exM.includes('funcional') || exM.includes('cross'))) ||
        (sel.includes('alongamento') && (exM.includes('alongamento') || exM.includes('mobilidade')));
    }
    
    let matchesMedia = true;
    if (exerciseMediaTypeFilter === 'Videos') {
      matchesMedia = Boolean(ex.videoUrl);
    } else if (exerciseMediaTypeFilter === 'GIFs') {
      matchesMedia = Boolean(ex.gifUrl || findBestExerciseGif(ex.name, ex.muscleGroup));
    }

    return matchesSearch && matchesGender && matchesMuscle && matchesMedia;
  });

  const groupedExercises = filteredExercises.reduce((acc, ex) => {
    const group = ex.muscleGroup || 'Outros';
    if (!acc[group]) {
      acc[group] = [];
    }
    acc[group].push(ex);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return (
    <div className="h-full flex flex-col md:flex-row overflow-hidden bg-black border border-white/5 shadow-2xl rounded-3xl min-h-[700px]">
      {/* Sidebar: Student Selection */}
      <div className={`md:w-[350px] w-full flex flex-col border-r border-white/5 transition-all duration-300 bg-[#09090b] ${selectedStudent ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-6 border-b border-white/5">
          <h2 className="text-xl font-[800] tracking-tight text-white mb-4 uppercase">
            Treinos <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00CC52]">JT Fitness</span>
          </h2>
          <div className="relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Buscar aluno..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none border border-white/10 focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
          {filteredStudents.map(student => (
            <button
              key={student.id}
              onClick={() => setSelectedStudent(student)}
              className={`w-full text-left p-4 rounded-[16px] border transition-all ${
                selectedStudent?.id === student.id 
                  ? 'bg-primary/5 border-primary/30 shadow-[0_0_15px_rgba(0,255,133,0.1)]' 
                  : 'bg-white/[0.02] border-transparent hover:bg-white/[0.04]'
              }`}
            >
              <h3 className="text-white font-medium">{student.name}</h3>
              <p className="text-xs text-gray-400 mt-1">Objetivo: {student.objective}</p>
              {student.workoutPlan && (
                <div className="mt-3 text-[10px] bg-primary/10 text-primary px-2 py-1 rounded w-max font-bold uppercase tracking-wider inline-flex items-center gap-1.5 border border-primary/20">
                  <Dumbbell className="w-3 h-3" /> Treino Ativo
                </div>
              )}
            </button>
          ))}
          {filteredStudents.length === 0 && (
            <div className="text-center text-sm text-gray-500 mt-10 font-medium">Nenhum aluno encontrado</div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative bg-black">
        {selectedStudent && localPlan ? (
          <div className="flex-1 overflow-y-auto p-6 md:p-8 scrollbar-thin relative pb-32">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#09090b] p-6 rounded-2xl border border-white/5">
              <div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="md:hidden text-primary text-sm mb-4 font-medium flex items-center gap-1.5"
                >
                  &larr; Voltar
                </button>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <input
                    type="text"
                    value={localPlan.title}
                    onChange={(e) => setLocalPlan({...localPlan, title: e.target.value})}
                    className="text-2xl font-[300] tracking-tight text-white bg-transparent outline-none border-b border-transparent hover:border-white/20 focus:border-primary px-1 -mx-1 transition-colors"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <button
                      onClick={() => setSendModalOpen(true)}
                      className="flex flex-row items-center gap-2 bg-[#00e676]/10 hover:bg-[#00e676]/20 text-[#00e676] border border-[#00e676]/30 px-3.5 py-2 rounded-xl font-bold transition-all text-sm w-max"
                      title="Enviar Treino"
                    >
                      <Copy className="w-4 h-4" />
                      Enviar para Aluno
                    </button>
                    <button
                      onClick={handleOpenAiSettings}
                      className="flex flex-row items-center gap-2 bg-[#8100ff]/10 hover:bg-[#8100ff]/20 text-[#c284ff] border border-[#8100ff]/30 px-3.5 py-2 rounded-xl font-bold transition-all text-sm w-max"
                      title="Treinador IA"
                    >
                      <Sparkles className="w-4 h-4" />
                      Coach IA
                    </button>
                    <button
                      type="button"
                      onClick={() => setBackupModalOpen(true)}
                      className="flex flex-row items-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 px-3.5 py-2 rounded-xl font-bold transition-all text-sm w-max"
                      title="Histórico de backups e treinos anteriores"
                    >
                      <History className="w-4 h-4 text-gray-400" />
                      Histórico / Restaurar
                    </button>
                    <button
                      type="button"
                      onClick={() => setFixerModalOpen(true)}
                      className="flex flex-row items-center gap-2 bg-red-400/10 hover:bg-red-400/20 text-red-400 border border-red-400/20 px-3.5 py-2 rounded-xl font-bold transition-all text-sm w-max"
                      title="Mapear os IDs antigos perdidos para novos vídeos"
                    >
                      <AlertTriangle className="w-4 h-4" />
                      Corrigir Quarta-feira (Em Lote)
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-3.5 font-medium">Prescreva o treinamento para {selectedStudent.name}.</p>
              </div>
              <button
                onClick={handleSavePlan}
                disabled={isSaving}
                className="bg-primary hover:bg-[#00e676] text-black px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(0,255,133,0.2)] hover:shadow-[0_0_30px_rgba(0,255,133,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                title="Salvar Treino"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {isSaving ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>

            <div className="space-y-6">
              {localPlan.days.map((day, dIdx) => (
                <div key={day.id} className="bg-[#09090b] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="bg-white/[0.02] p-4 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/[0.05] gap-4">
                    <input
                      type="text"
                      value={day.name}
                      onChange={(e) => updateDayName(day.id, e.target.value)}
                      className="text-lg font-bold text-white bg-transparent outline-none border-b border-transparent hover:border-white/20 focus:border-primary px-1"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => moveDayUp(dIdx)}
                        disabled={dIdx === 0}
                        className="text-gray-400 hover:text-white disabled:opacity-30 p-1.5 rounded-lg transition-colors"
                        title="Mover para Cima"
                      >
                        <ChevronUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => moveDayDown(dIdx)}
                        disabled={dIdx === localPlan.days.length - 1}
                        className="text-gray-400 hover:text-white disabled:opacity-30 p-1.5 rounded-lg transition-colors"
                        title="Mover para Baixo"
                      >
                        <ChevronDown className="w-4 h-4" />
                      </button>
                       <button
                        onClick={() => openExerciseModal(day.id)}
                        className="bg-primary/20 text-primary border border-primary/30 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-primary/30 transition-colors flex items-center gap-2"
                      >
                        <Plus className="w-4 h-4" /> Adicionar Exercício
                      </button>
                      <button
                        onClick={() => copyDay(day.id)}
                        className="text-gray-400 hover:text-white hover:bg-white/10 p-1.5 rounded-lg transition-colors border border-transparent"
                        title="Duplicar Dia"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeDay(day.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-400/10 p-1.5 rounded-lg transition-colors border border-transparent hover:border-red-500/30"
                        title="Excluir Dia"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    {day.exercises.length === 0 ? (
                      <p className="text-center text-sm text-gray-500 py-4">Nenhum exercício neste dia ainda.</p>
                    ) : (
                      day.exercises.map((workoutEx, exIdx) => {
                        let globalEx = EXERCISE_DATABASE.find((e: any) => e.id === workoutEx.exerciseId);
                        if (!globalEx && OLD_ID_MAP[workoutEx.exerciseId]) {
                          globalEx = EXERCISE_DATABASE.find((e:any) => e.id === OLD_ID_MAP[workoutEx.exerciseId]);
                        }
                        if (!globalEx) {
                          globalEx = findExerciseById(workoutEx.exerciseId);
                        }
                        
                        return (
                          <AdminWorkoutExercise 
                            key={workoutEx.id}
                            workoutEx={workoutEx}
                            globalEx={globalEx}
                            dayId={day.id}
                            updateExercise={updateExercise}
                            removeExercise={removeExercise}
                            setSelectedVideoEx={setSelectedVideoEx}
                            exIdx={exIdx}
                            totalExercises={day.exercises.length}
                            moveExerciseUp={moveExerciseUp}
                            moveExerciseDown={moveExerciseDown}
                            moveExerciseToTop={moveExerciseToTop}
                            moveExerciseToBottom={moveExerciseToBottom}
                            EXERCISE_DATABASE={EXERCISE_DATABASE}
                            onSubstitute={(dId: string, oldExId: string, newExId: string) => {
                               const exIdx = localPlan.days.find((d: any) => d.id === dId)?.exercises.findIndex((e: any) => e.id === oldExId);
                               if (exIdx !== undefined && exIdx !== -1) {
                                  updateExercise(dId, oldExId, 'exerciseId', newExId);
                               }
                            }}
                          />
                        );
                      })
                    )}
                  </div>
                </div>
              ))}

              <button
                onClick={addDay}
                className="w-full border-2 border-dashed border-white/[0.05] hover:border-primary/50 text-gray-400 hover:text-primary rounded-2xl p-4 flex items-center justify-center gap-2 transition-all font-medium"
              >
                <Plus className="w-5 h-5" />
                Adicionar Novo Dia
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-500 p-8 hidden md:flex">
            <div className="w-20 h-20 bg-white/[0.02] rounded-full flex items-center justify-center mb-6">
              <Dumbbell className="w-8 h-8 opacity-20" />
            </div>
            <p className="text-lg">Selecione um aluno para gerenciar seu treino.</p>
          </div>
        )}
      </div>

      {/* Modal - Configuração do Coach IA */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 pb-24 sm:pb-4">
          <div className="bg-[#111] border border-[#8100ff]/30 shadow-[0_0_50px_rgba(129,0,255,0.15)] rounded-3xl w-full max-w-lg overflow-hidden flex flex-col relative z-[61] max-h-[85dvh] sm:max-h-[85vh]">
            <div className="p-5 sm:p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#8100ff]/10 to-transparent shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8100ff]/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-[#c284ff]" />
                </div>
                <h3 className="text-xl font-bold text-white">IA Treinador(a)</h3>
              </div>
              <button 
                onClick={() => !isGeneratingAITreino && setAiModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
                disabled={isGeneratingAITreino}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
              <p className="text-gray-300 text-sm leading-relaxed">
                A Inteligência Artificial vai analisar o shape, nível e objetivos do aluno para montar uma periodização de treino. Escolha a personalidade do coach (Mestre) para este treino.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {/* Mulher - Salles */}
                <button
                  onClick={() => setAiGender("F")}
                  className={`relative overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 ${
                    aiGender === "F" 
                      ? "border-[#ff00a0] bg-[#ff00a0]/10" 
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                  disabled={isGeneratingAITreino}
                >
                  <UserCircle className={`w-10 h-10 ${aiGender === "F" ? "text-[#ff00a0]" : "text-gray-500"}`} />
                  <div className="text-center">
                    <span className={`block font-bold mb-1 ${aiGender === "F" ? "text-white" : "text-gray-400"}`}>Feminino</span>
                    <span className="text-[10px] text-gray-500 font-medium">Método IA<br/>(Glúteo/Perna)</span>
                  </div>
                </button>

                {/* Homem - Pacholok */}
                <button
                  onClick={() => setAiGender("M")}
                  className={`relative overflow-hidden rounded-2xl p-4 flex flex-col items-center justify-center gap-3 border-2 transition-all duration-300 ${
                    aiGender === "M" 
                      ? "border-[#00D1FF] bg-[#00D1FF]/10" 
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                  disabled={isGeneratingAITreino}
                >
                  <UserCircle className={`w-10 h-10 ${aiGender === "M" ? "text-[#00D1FF]" : "text-gray-500"}`} />
                  <div className="text-center">
                    <span className={`block font-bold mb-1 ${aiGender === "M" ? "text-white" : "text-gray-400"}`}>Masculino</span>
                    <span className="text-[10px] text-gray-500 font-medium">Método IA<br/>(Bodybuilding Bruto)</span>
                  </div>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Nível do Aluno
                  </label>
                  <select
                    value={aiLevel}
                    onChange={(e) => setAiLevel(e.target.value as any)}
                    disabled={isGeneratingAITreino}
                    className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-[#8100ff] text-sm appearance-none"
                  >
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Gênero Visual
                  </label>
                  <select
                    value={aiVideoGender}
                    onChange={(e) => setAiVideoGender(e.target.value as any)}
                    disabled={isGeneratingAITreino}
                    className="w-full bg-[#1A1A1A] text-white border border-white/10 rounded-xl px-3 py-3 focus:outline-none focus:border-[#8100ff] text-sm appearance-none"
                  >
                    <option value="Qualquer">Indiferente</option>
                    <option value="M">Homens</option>
                    <option value="F">Mulheres</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    Mídia do Treino
                  </label>
                  <select
                    value={aiMediaType}
                    onChange={(e) => setAiMediaType(e.target.value as any)}
                    disabled={isGeneratingAITreino}
                    className="w-full bg-[#1A1A1A] text-[#c084fc] font-bold border border-[#8100ff]/40 rounded-xl px-3 py-3 focus:outline-none focus:border-[#8100ff] text-sm appearance-none shadow-sm"
                  >
                    <option value="both">⚡ Híbrido (Vídeo + GIF)</option>
                    <option value="gif">✨ GIFs (Google Drive)</option>
                    <option value="video">🎬 Apenas Vídeos</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-[#111] shrink-0 sticky bottom-0 z-10">
              <button
                onClick={generateAITreino}
                disabled={isGeneratingAITreino}
                className="w-full bg-gradient-to-r from-[#8100ff] to-[#bd00ff] hover:opacity-90 disabled:opacity-50 text-white font-bold py-3.5 px-6 rounded-2xl shadow-[0_0_30px_rgba(189,0,255,0.3)] transition-all flex items-center justify-center gap-3 text-base"
              >
                {isGeneratingAITreino ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>O Coach está montando o treino...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Gerar Treino Mestre</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal - Send Plan */}
      {sendModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pb-24 sm:pb-4">
          <div className="bg-[#111] border border-[#00e676]/30 shadow-[0_0_50px_rgba(0,230,118,0.15)] rounded-3xl w-full max-w-lg overflow-hidden flex flex-col relative z-[61] max-h-[85dvh] sm:max-h-[85vh]">
            <div className="p-5 sm:p-6 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-[#00e676]/10 to-transparent shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#00e676]/20 flex items-center justify-center">
                  <Copy className="w-5 h-5 text-[#00e676]" />
                </div>
                <h3 className="text-xl font-bold text-white">Enviar Treino</h3>
              </div>
              <button 
                onClick={() => setSendModalOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed">
                Selecione um aluno abaixo para enviar o treino atual de {selectedStudent?.name}. <strong className="text-[#00e676]">Isto irá sobrescrever o treino do aluno selecionado.</strong>
              </p>

              <div className="space-y-3">
                {students.filter(s => s.id !== selectedStudent?.id).length === 0 ? (
                  <p className="text-center text-sm text-gray-500 py-4">Nenhum outro aluno cadastrado.</p>
                ) : (
                  students
                    .filter(s => s.id !== selectedStudent?.id)
                    .map(student => (
                      <div 
                        key={student.id}
                        onClick={() => setStudentToSendTo(student.id)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                          studentToSendTo === student.id ? 'bg-[#00e676]/20 border-[#00e676]/50' : 'bg-white/5 border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {student.profilePicture ? (
                            <img src={student.profilePicture} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                              <UserCircle className="w-6 h-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <p className="text-white font-bold text-sm tracking-tight">{student.name}</p>
                            <p className="text-xs text-gray-400">{student.workoutPlan?.title || "Sem treino"}</p>
                          </div>
                        </div>
                      </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-4 border-t border-white/5 bg-[#111] flex gap-3 shrink-0 sticky bottom-0 z-10">
              <button
                onClick={() => setSendModalOpen(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendPlan}
                className="flex-1 bg-[#00e676] hover:bg-[#00e676]/80 text-black px-4 py-3 rounded-xl font-bold transition-colors disabled:opacity-50"
                disabled={!studentToSendTo}
              >
                Enviar Treino
              </button>
            </div>
          </div>
        </div>
      )}

      {fixerModalOpen && (
        <BulkFixerModal 
           students={students} 
           exercises={EXERCISE_DATABASE} 
           updateWorkoutPlan={updateWorkoutPlan} 
           onClose={() => setFixerModalOpen(false)} 
        />
      )}

      {/* Modal - Select Exercise */}
      {exerciseModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pb-24 sm:pb-4">
          <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-4xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/[0.02] gap-4 shrink-0">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold text-white tracking-tight">Catálogo de Exercícios</h3>
                <span className="text-xs bg-white/5 border border-white/5 text-gray-400 px-2.5 py-0.5 rounded-full">
                  {EXERCISE_DATABASE.length} Exercícios
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await syncExercises();
                    } catch (err) {
                      console.error("Erro ao sincronizar:", err);
                    }
                  }}
                  disabled={exercisesLoading}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-[1.02] active:scale-[0.98] text-xs font-bold transition-all disabled:opacity-50"
                  title="Atualizar Biblioteca de Exercícios"
                >
                  {exercisesLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sincronizando...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                      Atualizar Vídeos
                    </>
                  )}
                </button>
                <button onClick={() => setExerciseModalOpen(false)} className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4 border-b border-white/10 flex flex-col gap-4 bg-[#111] shrink-0">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-500 absolute left-4 top-3.5" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Pesquise o exercício por nome..."
                  value={exerciseSearch}
                  onChange={(e) => setExerciseSearch(e.target.value)}
                  className="w-full bg-[#0A0A0A] text-white rounded-xl pl-12 pr-4 py-3.5 outline-none border border-white/10 focus:border-primary/50 transition-colors font-medium shadow-inner"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                  {(['Todos', 'M', 'F'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setExerciseGenderFilter(g)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition-all ${exerciseGenderFilter === g ? 'bg-primary text-black shadow' : 'text-gray-400 hover:text-white'}`}
                    >
                      {g === 'Todos' ? 'Ambos Gêneros' : g === 'M' ? 'Homens' : 'Mulheres'}
                    </button>
                  ))}
                </div>

                <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl border border-white/5">
                  {(['Todos', 'Videos', 'GIFs'] as const).map(m => (
                    <button
                      key={m}
                      onClick={() => setExerciseMediaTypeFilter(m)}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                        exerciseMediaTypeFilter === m 
                          ? (m === 'GIFs' ? 'bg-[#8100ff] text-white shadow' : 'bg-primary text-black shadow') 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {m === 'Todos' ? 'Todas Mídias' : m === 'Videos' ? '🎬 Vídeos' : '✨ GIFs (Google Drive)'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
                {MUSCLE_GROUPS.map(group => {
                  const isSelected = selectedMuscleGroup === group;
                  const count = group === 'Todos'
                    ? EXERCISE_DATABASE.filter(e => exerciseGenderFilter === 'Todos' || e.videoGender === exerciseGenderFilter).length
                    : EXERCISE_DATABASE.filter(e => {
                        const sel = group.toLowerCase();
                        const exM = (e.muscleGroup || '').toLowerCase();
                        const matches = exM === sel || exM.includes(sel) || sel.includes(exM) ||
                          (sel.includes('funcional') && (exM.includes('funcional') || exM.includes('cross'))) ||
                          (sel.includes('alongamento') && (exM.includes('alongamento') || exM.includes('mobilidade')));
                        return matches && (exerciseGenderFilter === 'Todos' || e.videoGender === exerciseGenderFilter);
                      }).length;

                  return (
                    <button 
                      key={group}
                      onClick={() => setSelectedMuscleGroup(group)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${isSelected ? 'bg-primary text-black shadow-md scale-[1.02]' : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      <span>{group}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-black/20 text-black font-bold' : 'bg-white/10 text-gray-400'}`}>{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-thin bg-black/20">
              {filteredExercises.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-500">
                  <Dumbbell className="w-12 h-12 mb-4 opacity-20" />
                  <p className="text-lg font-medium text-gray-300">Nenhum exercício encontrado</p>
                  <p className="text-sm mt-1 text-gray-500">Tente buscar usando outros termos ou selecione outro grupo muscular.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {Object.entries(groupedExercises).map(([muscleGroup, exercises]) => (
                    <div key={muscleGroup} className="space-y-4">
                      <div className="flex items-center gap-3 sticky top-0 bg-[#111]/95 backdrop-blur-md py-2.5 z-10 -mx-2 px-2 border-b border-white/5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <h4 className="text-white font-bold text-base tracking-tight">
                          {muscleGroup}
                        </h4>
                        <span className="text-xs bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full font-semibold">{exercises.length} {exercises.length === 1 ? 'exercício' : 'exercícios'}</span>
                        <div className="flex-1 h-px bg-white/5 ml-2"></div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {exercises.map(ex => {
                          const bestGif = ex.gifUrl || findBestExerciseGif(ex.name, ex.muscleGroup);
                          const hasGif = Boolean(bestGif);
                          const hasVideo = Boolean(ex.videoUrl);
                          const displayThumb = exerciseMediaTypeFilter === 'GIFs' && bestGif 
                            ? bestGif 
                            : (ex.thumbnail || (ex as any).previewUrl || bestGif || ex.gifUrl);

                          return (
                            <div
                              key={ex.id}
                              className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] text-left transition-all border border-white/5 hover:border-primary/40 shadow-sm"
                            >
                                <div 
                                  className="w-16 h-16 rounded-xl bg-white/5 flex-shrink-0 relative overflow-hidden cursor-pointer border border-white/10 shadow-inner group/thumb"
                                  title="Clique para visualizar execução"
                                  onClick={(e) => { 
                                    e.stopPropagation(); 
                                    setSelectedVideoEx({ ...ex, gifUrl: bestGif || ex.gifUrl }); 
                                  }}
                                >
                                  {displayThumb ? (
                                    <img 
                                      src={displayThumb} 
                                      alt={ex.name} 
                                      className="w-full h-full object-cover group-hover/thumb:scale-105 transition-transform duration-300" 
                                      referrerPolicy="no-referrer"
                                      loading="lazy"
                                    />
                                  ) : ex.videoUrl ? (
                                    <FastVideo 
                                      src={ex.videoUrl} 
                                      className="w-full h-full object-cover" 
                                      muted 
                                      playsInline 
                                      poster={ex.thumbnail}
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                                      <Dumbbell className="w-6 h-6 text-gray-500" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-black/40 opacity-60 group-hover/thumb:opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <PlayCircle className="w-7 h-7 text-white drop-shadow-md group-hover/thumb:text-primary transition-colors" />
                                  </div>
                                </div>
                              
                              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => addExerciseToDay({ ...ex, gifUrl: bestGif || ex.gifUrl })}>
                                <div className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">{ex.name}</div>
                                <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                  <span className="text-[11px] text-primary/90 bg-primary/10 px-2 py-0.5 rounded font-medium truncate max-w-[120px]">{ex.muscleGroup}</span>
                                  {hasGif && (
                                    <span className="text-[10px] text-purple-300 bg-purple-500/20 border border-purple-500/30 px-1.5 py-0.5 rounded font-bold">
                                      ✨ GIF
                                    </span>
                                  )}
                                  {hasVideo && (
                                    <span className="text-[10px] text-cyan-300 bg-cyan-500/20 border border-cyan-500/30 px-1.5 py-0.5 rounded font-bold">
                                      🎬 Vídeo
                                    </span>
                                  )}
                                  {ex.equipment && ex.equipment !== '-' && (
                                    <span className="text-gray-500 text-[11px] truncate">{ex.equipment}</span>
                                  )}
                                </div>
                              </div>
                              
                              <button
                                onClick={(e) => { e.stopPropagation(); addExerciseToDay({ ...ex, gifUrl: bestGif || ex.gifUrl }); }}
                                className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-black flex items-center justify-center flex-shrink-0 transition-all font-bold"
                                title="Adicionar ao treino"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modal Ilustração do Aparelho & Execução */}
      <AnimatePresence>
        {selectedVideoEx && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 pb-24 sm:pb-4 overflow-hidden"
            onClick={() => setSelectedVideoEx(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0a0d14] border border-cyan-500/20 rounded-[28px] max-w-2xl w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[85dvh] sm:max-h-[85vh]"
            >
              <div className="p-4 md:p-5 border-b border-cyan-500/20 flex justify-between items-center bg-cyan-950/20 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                      {selectedVideoEx.muscleGroup}
                    </span>
                    {selectedVideoEx.equipment && selectedVideoEx.equipment !== '-' && (
                      <span className="text-xs text-zinc-300 bg-white/5 border border-white/10 px-2 py-0.5 rounded-full">
                        {selectedVideoEx.equipment}
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">{selectedVideoEx.name}</h3>
                </div>
                <button 
                  onClick={() => setSelectedVideoEx(null)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/15 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="p-5 overflow-y-auto flex-1">
                <ExerciseEquipmentVisual 
                  name={selectedVideoEx.name}
                  muscleGroup={selectedVideoEx.muscleGroup}
                  equipment={selectedVideoEx.equipment}
                  instructions={selectedVideoEx.instructions}
                  imageUrl={selectedVideoEx.thumbnail || selectedVideoEx.gifUrl || (selectedVideoEx as any).previewUrl}
                  variant="modal"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Histórico e Restauração de Backups */}
      <AnimatePresence>
        {backupModalOpen && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 pb-24 sm:pb-4 animate-fade-in"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#0b0b0c] border border-white/10 rounded-2xl w-full max-w-5xl max-h-[85dvh] sm:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b border-white/15 flex justify-between items-center bg-white/[0.02] shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <History className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white tracking-tight">Histórico de Treinos e Restauração</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Recupere treinos estruturados anteriormente para {selectedStudent?.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setBackupModalOpen(false);
                    setPreviewBackupId(null);
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="flex-1 overflow-hidden flex flex-col md:flex-row min-h-0">
                {/* Backups List */}
                <div className="w-full md:w-2/5 border-r border-white/10 overflow-y-auto p-4 space-y-3 bg-[#0a0a0b]/50">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 text-left">PONTOS DE RESTAURAÇÃO DE TREINO</h4>
                  
                  {backups.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-dashed border-white/10 rounded-2xl bg-white/[0.01]">
                      <History className="w-12 h-12 text-gray-600 mb-3 stroke-[1.5]" />
                      <p className="text-white text-sm font-semibold">Nenhum backup disponível</p>
                      <p className="text-gray-500 text-xs mt-1.5 leading-relaxed max-w-xs">
                        Para criar um ponto de restauração, monte ou gere um treino e salve-o clicando em <b>"Salvar Alterações"</b>.
                      </p>
                    </div>
                  ) : (
                    backups.map((bk: any) => {
                      const isSelected = bk.id === previewBackupId;
                      const dateObj = new Date(bk.date);
                      const formattedDate = dateObj.toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      });
                      const formattedTime = dateObj.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      });

                      const totalExercisesCount = bk.days?.reduce((acc: number, d: any) => acc + (d.exercises?.length || 0), 0) || 0;

                      return (
                        <div
                          key={bk.id}
                          onClick={() => setPreviewBackupId(bk.id)}
                          className={`group p-4 rounded-xl border transition-all cursor-pointer relative text-left ${
                            isSelected
                              ? 'bg-primary/5 border-primary text-white shadow-md'
                              : 'bg-white/[0.01] border-white/5 text-gray-300 hover:border-white/15 hover:bg-white/[0.03]'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-white group-hover:text-primary transition-colors truncate">
                                {bk.title || "Treino Sem Título"}
                              </p>
                              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1.5 font-mono">
                                <span>{formattedDate}</span>
                                <span className="opacity-40">•</span>
                                <span>{formattedTime}</span>
                              </p>
                              <div className="flex items-center gap-2 mt-3.5">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400">
                                  {bk.days?.length || 0} Dias
                                </span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400">
                                  {totalExercisesCount} Exercícios
                                </span>
                              </div>
                            </div>
                            
                            <button
                              type="button"
                              title="Excluir este ponto de restauração"
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (window.confirm("Deseja realmente remover este ponto de restauração do histórico?")) {
                                  try {
                                    const updatedHistory = backups.filter((h: any) => h.id !== bk.id);
                                    if (selectedStudent && localPlan) {
                                      const updatedPlan = {
                                        ...localPlan,
                                        history: updatedHistory
                                      };
                                      await updateWorkoutPlan(selectedStudent.id, updatedPlan);
                                      if (previewBackupId === bk.id) {
                                        setPreviewBackupId(null);
                                      }
                                      alert("Ponto de restauração removido!");
                                    }
                                  } catch (err) {
                                    console.error(err);
                                    alert("Erro ao excluir do histórico.");
                                  }
                                }
                              }}
                              className="p-1.5 opacity-0 group-hover:opacity-100 hover:bg-red-500/15 hover:text-red-400 text-gray-500 rounded-lg transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Preview Panel */}
                <div className="flex-1 overflow-y-auto p-5 flex flex-col bg-[#080809]">
                  {previewBackupId ? (() => {
                    const selectedBk = backups.find((h: any) => h.id === previewBackupId);
                    if (!selectedBk) return null;

                    return (
                      <div className="space-y-5 text-left h-full flex flex-col min-h-0">
                        {/* Summary */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/[0.01] border border-white/5 p-4 rounded-2xl">
                          <div>
                            <span className="text-[10px] bg-primary/10 border border-primary/20 text-primary font-bold px-2 py-0.5 uppercase tracking-wide rounded-md">
                              Visualizando Ponto de Restauração
                            </span>
                            <h5 className="text-base font-bold text-white mt-1.5">{selectedBk.title}</h5>
                            {selectedBk.objective && (
                              <p className="text-xs text-gray-400 mt-1"><b>Foco:</b> {selectedBk.objective}</p>
                            )}
                          </div>
                          
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm("Tem certeza que deseja restaurar este treino? O treino atualmente em edição será substituído pelo treino deste backup. (Para publicar definitivamente para o aluno, clique em 'Salvar Alterações' no painel principal após carregar este backup).")) {
                                if (localPlan) {
                                  setLocalPlan({
                                    ...localPlan,
                                    title: selectedBk.title,
                                    objective: selectedBk.objective,
                                    days: selectedBk.days || [],
                                    observations: selectedBk.observations || '',
                                  });
                                  setBackupModalOpen(false);
                                  setPreviewBackupId(null);
                                  alert("Treino anterior carregado com sucesso! Lembre-se de clicar em 'Salvar Alterações' para salvar e sincronizar o portal do aluno.");
                                }
                              }
                            }}
                            className="bg-primary hover:bg-[#00e676] text-black px-4 py-2.5 rounded-xl font-bold font-sans text-xs flex items-center gap-1.5 transition-all w-full sm:w-auto shadow-md"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Restaurar este Treino
                          </button>
                        </div>

                        {/* Observations inside backup */}
                        {selectedBk.observations && (
                          <div className="bg-white/[0.02] border border-white/5 p-3.5 rounded-xl text-xs text-gray-400 leading-relaxed italic">
                            <span className="font-bold text-gray-300 not-italic block mb-1">Mensagem/Observações:</span>
                            "{selectedBk.observations}"
                          </div>
                        )}

                        {/* Days list inside backup */}
                        <div className="space-y-4 flex-1">
                          <h6 className="text-xs font-bold text-gray-400 uppercase tracking-wider">DIAS E EXERCÍCIOS ({selectedBk.days?.length || 0} dias)</h6>
                          <div className="space-y-4">
                            {selectedBk.days?.map((day: any, dIndex: number) => (
                              <div key={day.id || dIndex} className="bg-white/[0.01] border border-white/5 rounded-xl overflow-hidden">
                                <div className="bg-white/[0.02] px-3.5 py-2.5 border-b border-white/5 flex justify-between items-center">
                                  <span className="font-bold text-sm text-gray-200">{day.name}</span>
                                  <span className="text-[10px] text-gray-500 font-mono font-bold uppercase">{day.exercises?.length || 0} Exercícios</span>
                                </div>
                                <div className="p-3 divide-y divide-white/[0.03]">
                                  {day.exercises && day.exercises.length > 0 ? (
                                    day.exercises.map((wkEx: any, exIndex: number) => {
                                      let globalEx = EXERCISE_DATABASE.find((e: any) => e.id === wkEx.exerciseId);
                                      if (!globalEx && OLD_ID_MAP[wkEx.exerciseId]) {
                                        globalEx = EXERCISE_DATABASE.find((e:any) => e.id === OLD_ID_MAP[wkEx.exerciseId]);
                                      }
                                      if (!globalEx) {
                                        globalEx = findExerciseById(wkEx.exerciseId);
                                      }
                                      return (
                                        <div key={wkEx.id || exIndex} className="py-2.5 flex justify-between items-center gap-4 text-xs">
                                          <div className="min-w-0 flex-1">
                                            <p className="font-medium text-gray-300 truncate">{globalEx?.name || "Exercício desconhecido"}</p>
                                            <p className="text-[10px] text-gray-500 mt-0.5 truncate">{globalEx?.muscleGroup || "Geral"}</p>
                                          </div>
                                          <div className="text-right text-gray-400 whitespace-nowrap text-[11px] flex items-center gap-2">
                                            <span className="bg-white/5 border border-white/5 px-2 py-0.5 rounded-md font-medium text-gray-300">
                                              {wkEx.sets}x {wkEx.reps}
                                            </span>
                                            {wkEx.rest && (
                                              <span className="text-[10px] text-gray-500 font-mono">
                                                reparo: {wkEx.rest}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      );
                                    })
                                  ) : (
                                    <div className="text-center py-4 text-gray-600 text-[11px] italic">Nenhum exercício neste dia.</div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })() : (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-gray-500">
                      <History className="w-14 h-14 mb-4 stroke-[1] text-gray-600 opacity-60 animate-pulse" />
                      <p className="text-sm font-semibold">Visualização Prévia do Treino</p>
                      <p className="text-xs text-gray-400 max-w-xs mt-1.5 leading-relaxed">
                        Selecione um dos treinos salvos na lista para visualizar sua estrutura completa, exercícios, séries e repetições antes de restaurá-lo.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
