import React, { useState, useMemo } from "react";
import {
  Activity,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Minus,
  Brain,
  Target,
  Flame,
  Droplets,
  Heart,
  Scale,
  Sparkles,
  Info,
  Camera,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  Printer,
  Share2,
  ArrowRight,
  Maximize2,
  Eye,
  HelpCircle,
  Check,
  Zap,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";
import { Student, PhysicalEvaluation } from "../types";

interface DetailedEvaluationViewProps {
  student: any;
  onRefresh?: () => void;
}

// Helpers for Classification & Health Metrics
export function getBfClassification(bf: number, gender: "M" | "F", age: number = 25): {
  category: string;
  color: string;
  badgeBg: string;
  description: string;
  zoneIndex: number; // 0 to 4
} {
  const isMale = gender === "M";

  if (isMale) {
    if (bf < 6) {
      return {
        category: "Gordura Essencial / Competição",
        color: "#00D4FF",
        badgeBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
        description: "Nível extremamente baixo de gordura, típico de atletas em final de preparação de palco.",
        zoneIndex: 0,
      };
    } else if (bf <= 13) {
      return {
        category: "Excelente (Atleta / Alta Definição)",
        color: "#00FF88",
        badgeBg: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30",
        description: "Excelente definição muscular, corte profundo e percentual atlético de elite com ótima saúde metabólica.",
        zoneIndex: 1,
      };
    } else if (bf <= 17) {
      return {
        category: "Bom (Saudável / Fitness)",
        color: "#10B981",
        badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        description: "Faixa padrão ouro para saúde geral e condicionamento físico. Músculos aparentes e sem excesso adiposo.",
        zoneIndex: 2,
      };
    } else if (bf <= 24) {
      return {
        category: "Médio / Aceitável",
        color: "#FBBF24",
        badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        description: "Faixa média populacional. Bom momento para focar em recomposição corporal e ganho de massa muscular com dieta balanceada.",
        zoneIndex: 3,
      };
    } else {
      return {
        category: "Elevado (Foco em Queima)",
        color: "#EF4444",
        badgeBg: "bg-red-500/15 text-red-400 border-red-500/30",
        description: "Acima da média recomendada. O plano de treino e déficit calórico controlado acelerarão a redução da gordura corporal com segurança.",
        zoneIndex: 4,
      };
    }
  } else {
    // Female
    if (bf < 14) {
      return {
        category: "Gordura Essencial / Competição",
        color: "#00D4FF",
        badgeBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
        description: "Nível muito baixo para o organismo feminino, com musculatura hiper definida.",
        zoneIndex: 0,
      };
    } else if (bf <= 20) {
      return {
        category: "Excelente (Atlética / Alta Definição)",
        color: "#00FF88",
        badgeBg: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30",
        description: "Excelente composição atlética, tônus muscular evidente e abdômen trabalhado.",
        zoneIndex: 1,
      };
    } else if (bf <= 24) {
      return {
        category: "Bom (Saudável / Fitness)",
        color: "#10B981",
        badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        description: "Faixa de referência ideal para saúde e estética feminina com equilíbrio hormonal excelente.",
        zoneIndex: 2,
      };
    } else if (bf <= 31) {
      return {
        category: "Médio / Aceitável",
        color: "#FBBF24",
        badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        description: "Média aceitável. O trabalho de hipertrofia e cardio vai afinar a cintura e queimar tecido adiposo.",
        zoneIndex: 3,
      };
    } else {
      return {
        category: "Elevada (Foco em Queima)",
        color: "#EF4444",
        badgeBg: "bg-red-500/15 text-red-400 border-red-500/30",
        description: "Acima da faixa recomendada. O plano estruturado trará perda consistente de gordura e mais disposição.",
        zoneIndex: 4,
      };
    }
  }
}

export function getImcClassification(imc: number): {
  category: string;
  color: string;
  badgeBg: string;
  description: string;
} {
  if (imc < 18.5) {
    return {
      category: "Abaixo do Peso",
      color: "#00D4FF",
      badgeBg: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
      description: "Peso abaixo da faixa padrão para a estatura. Foco em superávit calórico limpo e ganho de massa magra.",
    };
  } else if (imc < 25) {
    return {
      category: "Peso Adequado / Normal",
      color: "#00FF88",
      badgeBg: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30",
      description: "Relação peso/estatura ideal de acordo com a Organização Mundial da Saúde.",
    };
  } else if (imc < 30) {
    return {
      category: "Sobrepeso (ou Alta Musculatura)",
      color: "#FBBF24",
      badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      description: "Nota importante: Para praticantes de musculação com boa massa muscular, o IMC pode marcar sobrepeso mesmo com baixo percentual de gordura. O % BF é a métrica mais precisa.",
    };
  } else {
    return {
      category: "Obesidade",
      color: "#EF4444",
      badgeBg: "bg-red-500/15 text-red-400 border-red-500/30",
      description: "Indicador acima da faixa. Os treinos de força combinados com cardio aceleram a queima de gordura e protegem a saúde cardiovascular.",
    };
  }
}

export function getWHRClassification(waist?: number, hip?: number, gender: "M" | "F" = "M") {
  if (!waist || !hip || hip <= 0) return null;
  const ratio = Number((waist / hip).toFixed(2));
  const isMale = gender === "M";

  if (isMale) {
    if (ratio < 0.90) {
      return {
        ratio,
        risk: "Baixo Risco",
        color: "#00FF88",
        badgeBg: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30",
        desc: "Excelente distribuição de gordura corporal, sem acúmulo excessivo na região intra-abdominal.",
      };
    } else if (ratio <= 0.95) {
      return {
        ratio,
        risk: "Risco Moderado",
        color: "#FBBF24",
        badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        desc: "Distribuição aceitável. Reduzir a linha de cintura ajudará na estética e na saúde cardiovascular.",
      };
    } else {
      return {
        ratio,
        risk: "Risco Aumentado",
        color: "#EF4444",
        badgeBg: "bg-red-500/15 text-red-400 border-red-500/30",
        desc: "Concentração de gordura na região abdominal. Foco prioritário em queima de gordura visceral com treinos e dieta.",
      };
    }
  } else {
    if (ratio < 0.80) {
      return {
        ratio,
        risk: "Baixo Risco",
        color: "#00FF88",
        badgeBg: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/30",
        desc: "Formato ginecóide saudável e harmonioso com excelente relação cintura-quadril.",
      };
    } else if (ratio <= 0.85) {
      return {
        ratio,
        risk: "Risco Moderado",
        color: "#FBBF24",
        badgeBg: "bg-amber-500/15 text-amber-400 border-amber-500/30",
        desc: "Distribuição moderada de gordura abdominal.",
      };
    } else {
      return {
        ratio,
        risk: "Risco Aumentado",
        color: "#EF4444",
        badgeBg: "bg-red-500/15 text-red-400 border-red-500/30",
        desc: "Acúmulo de gordura no tronco. A perda de medidas na cintura protegerá o metabolismo.",
      };
    }
  }
}

export const DetailedEvaluationView: React.FC<DetailedEvaluationViewProps> = ({ student }) => {
  const [activeViewMode, setActiveViewMode] = useState<"laudo" | "medidas" | "dobras" | "comparativo" | "fotos">("laudo");
  const [selectedEvalId, setSelectedEvalId] = useState<string | null>(null);
  const [compareTargetEvalId, setCompareTargetEvalId] = useState<string | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState<string | null>(null);

  // Parse and sort all evaluations by date descending
  const sortedEvaluations = useMemo(() => {
    if (!student.evaluations || student.evaluations.length === 0) return [];
    return [...student.evaluations].sort(
      (a: any, b: any) =>
        new Date(b.evalDate || b.date || 0).getTime() - new Date(a.evalDate || a.date || 0).getTime()
    );
  }, [student.evaluations]);

  // Selected current evaluation (defaults to latest)
  const currentEval = useMemo(() => {
    if (sortedEvaluations.length === 0) return null;
    if (selectedEvalId) {
      const found = sortedEvaluations.find((e) => e.id === selectedEvalId);
      if (found) return found;
    }
    return sortedEvaluations[0];
  }, [sortedEvaluations, selectedEvalId]);

  // Previous or target comparison evaluation
  const previousEval = useMemo(() => {
    if (sortedEvaluations.length <= 1) return null;
    if (compareTargetEvalId) {
      const found = sortedEvaluations.find((e) => e.id === compareTargetEvalId);
      if (found) return found;
    }
    // Default to the one chronologically right before currentEval
    const currentIndex = sortedEvaluations.findIndex((e) => e.id === currentEval?.id);
    if (currentIndex !== -1 && currentIndex < sortedEvaluations.length - 1) {
      return sortedEvaluations[currentIndex + 1];
    }
    return sortedEvaluations[sortedEvaluations.length - 1]; // initial
  }, [sortedEvaluations, currentEval, compareTargetEvalId]);

  // Initial evaluation (first ever)
  const initialEval = useMemo(() => {
    if (sortedEvaluations.length === 0) return null;
    return sortedEvaluations[sortedEvaluations.length - 1];
  }, [sortedEvaluations]);

  if (!currentEval) {
    return (
      <div className="rounded-[32px] border border-white/5 bg-[#151515] p-8 text-center sm:p-12 shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0A0A0A] border border-white/5">
          <Activity className="h-8 w-8 text-gray-500 opacity-40" />
        </div>
        <h3 className="text-xl font-black text-white">Nenhuma Avaliação Cadastrada Ainda</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-gray-400">
          Assim que seu treinador realizar sua primeira avaliação física (dobras, perímetros ou bioimpedância),
          você receberá aqui um relatório interativo e detalhado explicando cada indicador do seu corpo.
        </p>
      </div>
    );
  }

  // Calculated metrics
  const weight = Number(currentEval.weight || 0);
  const height = Number(currentEval.height || 0);
  const heightInMeters = height > 3 ? height / 100 : height || 1.70;
  const bf = Number(currentEval.metrics?.bf || 0);
  const imc = Number(
    currentEval.metrics?.imc || (heightInMeters > 0 ? (weight / (heightInMeters * heightInMeters)).toFixed(1) : 0)
  );
  const fatMass = Number(currentEval.metrics?.fatMass || (weight * (bf / 100)).toFixed(1));
  const leanMass = Number(currentEval.metrics?.leanMass || (weight - fatMass).toFixed(1));

  // TMB & GET
  const age = student.age || 25;
  const gender = student.gender || "M";
  const activityLevel = Number(student.activityLevel || 1.55);

  // Katch-McArdle using Lean Mass (most accurate for gym athletes)
  const tmb = leanMass > 0 ? Math.round(370 + 21.6 * leanMass) : Math.round(
    gender === "M"
      ? 66.5 + 13.75 * weight + 5.003 * (heightInMeters * 100) - 6.75 * age
      : 655.1 + 9.563 * weight + 1.85 * (heightInMeters * 100) - 4.676 * age
  );
  const getDailyExpenditure = Math.round(tmb * activityLevel);

  // Target water intake in Liters
  const dailyWaterLiters = Number(((weight * 35) / 1000).toFixed(1));

  // Classifications
  const bfInfo = getBfClassification(bf, gender, age);
  const imcInfo = getImcClassification(imc);

  // Circumferences & Symmetry
  const circumferences = currentEval.circumferences || {};
  const prevCircumferences = previousEval?.circumferences || {};
  const folds = (currentEval.folds as any) || {};
  const prevFolds = (previousEval?.folds as any) || {};

  // Waist to Hip Ratio (RCQ)
  const whrInfo = getWHRClassification(circumferences.waist, circumferences.hip, gender);

  // Symmetries (Right vs Left)
  const armRight = circumferences.rightArm || circumferences.armRightRelaxed || circumferences.armRightContracted || 0;
  const armLeft = circumferences.leftArm || circumferences.armLeftRelaxed || circumferences.armLeftContracted || 0;
  const armDiff = Number(Math.abs(armRight - armLeft).toFixed(1));

  const thighRight = circumferences.rightThigh || circumferences.thighRightProximal || 0;
  const thighLeft = circumferences.leftThigh || circumferences.thighLeftProximal || 0;
  const thighDiff = Number(Math.abs(thighRight - thighLeft).toFixed(1));

  const calfRight = circumferences.rightCalf || 0;
  const calfLeft = circumferences.leftCalf || 0;
  const calfDiff = Number(Math.abs(calfRight - calfLeft).toFixed(1));

  // Sum of skinfolds
  const sumFolds = Number(
    (
      (folds.peitoral || 0) +
      (folds.axilar || folds.axilarMedia || 0) +
      (folds.triciptal || folds.triceps || 0) +
      (folds.subescapular || 0) +
      (folds.abdominal || 0) +
      (folds.suprailiaca || 0) +
      (folds.coxa || 0) +
      (folds.bicipital || 0)
    ).toFixed(1)
  );

  const prevSumFolds = previousEval
    ? Number(
        (
          ((previousEval.folds as any)?.peitoral || 0) +
          ((previousEval.folds as any)?.axilar || (previousEval.folds as any)?.axilarMedia || 0) +
          ((previousEval.folds as any)?.triciptal || (previousEval.folds as any)?.triceps || 0) +
          ((previousEval.folds as any)?.subescapular || 0) +
          ((previousEval.folds as any)?.abdominal || 0) +
          ((previousEval.folds as any)?.suprailiaca || 0) +
          ((previousEval.folds as any)?.coxa || 0) +
          ((previousEval.folds as any)?.bicipital || 0)
        ).toFixed(1)
      )
    : 0;

  // Comparison deltas against previous
  const prevWeight = Number(previousEval?.weight || 0);
  const prevBf = Number(previousEval?.metrics?.bf || 0);
  const prevLean = Number(
    previousEval?.metrics?.leanMass || (prevWeight > 0 ? (prevWeight * (1 - prevBf / 100)).toFixed(1) : 0)
  );
  const prevFat = Number(
    previousEval?.metrics?.fatMass || (prevWeight > 0 ? (prevWeight * (prevBf / 100)).toFixed(1) : 0)
  );

  const deltaWeight = previousEval ? Number((weight - prevWeight).toFixed(1)) : 0;
  const deltaBf = previousEval ? Number((bf - prevBf).toFixed(1)) : 0;
  const deltaLean = previousEval ? Number((leanMass - prevLean).toFixed(1)) : 0;
  const deltaFat = previousEval ? Number((fatMass - prevFat).toFixed(1)) : 0;

  // Pie chart data for body composition
  const bodyCompPieData = [
    { name: "Massa Magra (Músculo/Água/Ossos)", value: leanMass, color: "#00FF88" },
    { name: "Gordura Corporal", value: fatMass, color: "#FF5555" },
  ];

  // Symmetry bar chart data
  const symmetryChartData = [
    {
      name: "Braço",
      Direito: armRight,
      Esquerdo: armLeft,
      diff: armDiff,
    },
    {
      name: "Coxa",
      Direito: thighRight,
      Esquerdo: thighLeft,
      diff: thighDiff,
    },
    {
      name: "Panturrilha",
      Direito: calfRight,
      Esquerdo: calfLeft,
      diff: calfDiff,
    },
  ].filter((item) => item.Direito > 0 || item.Esquerdo > 0);

  // Format evaluation date
  const evalFormattedDate = new Date(currentEval.evalDate || currentEval.date || "").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8 print:space-y-4">
      {/* 1. TOP HEADER WITH SELECTOR, ACTIONS & EXPLANATION BANNER */}
      <section className="relative overflow-hidden rounded-[32px] border border-white/5 bg-[#151515] p-6 shadow-2xl sm:p-8">
        <div className="absolute right-0 top-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-[#00FF88]/5 blur-3xl"></div>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="rounded-full border border-[#00FF88]/30 bg-[#00FF88]/10 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-[#00FF88]">
                Laudo Fisiológico & Físico
              </span>
              <span className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                {currentEval.method === "bioimpedance"
                  ? "Bioimpedância Elétrica"
                  : currentEval.method === "pollock7"
                  ? "Protocolo Jackson-Pollock 7 Dobras"
                  : currentEval.method === "pollock3"
                  ? "Protocolo Jackson-Pollock 3 Dobras"
                  : currentEval.method === "durnin4"
                  ? "Protocolo Durnin-Womersley 4 Dobras"
                  : "Avaliação Antropométrica"}
              </span>
            </div>
            <h2 className="text-2xl font-black text-white sm:text-3xl tracking-tight">
              Avaliação Física de {student.name}
            </h2>
            <p className="text-xs text-gray-400 flex items-center gap-1.5 font-medium">
              <Calendar className="h-3.5 w-3.5 text-[#00FF88]" /> Realizada em {evalFormattedDate} • {student.age} anos •{" "}
              {student.gender === "M" ? "Masculino" : "Feminino"} • {height} cm
            </p>
          </div>

          {/* Evaluation Selector Dropdown (if multiple evals exist) */}
          <div className="flex flex-wrap items-center gap-3">
            {sortedEvaluations.length > 1 && (
              <div className="relative">
                <select
                  value={currentEval.id}
                  onChange={(e) => setSelectedEvalId(e.target.value)}
                  className="appearance-none rounded-2xl border border-white/10 bg-[#0A0A0A] py-2.5 pl-4 pr-10 text-xs font-black tracking-wider text-white shadow-inner focus:border-[#00FF88] focus:outline-none cursor-pointer"
                >
                  {sortedEvaluations.map((ev: any, idx) => (
                    <option key={ev.id || idx} value={ev.id}>
                      {idx === 0 ? "⭐️ Mais Recente: " : "📅 "}
                      {new Date(ev.evalDate || ev.date || "").toLocaleDateString("pt-BR")} ({ev.weight} kg •{" "}
                      {ev.metrics?.bf || "--"}% BF)
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            )}

            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0A0A0A] px-4 py-2.5 text-xs font-black uppercase tracking-wider text-gray-300 hover:border-white/20 hover:text-white transition-all shadow-md active:scale-95 print:hidden"
            >
              <Printer className="h-4 w-4 text-[#00FF88]" />
              Imprimir / PDF
            </button>
          </div>
        </div>

        {/* Visual View Navigation Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-white/5 pt-6 print:hidden">
          {[
            { id: "laudo", label: "Laudo & Diagnóstico Completo", icon: Brain },
            { id: "medidas", label: "Perímetros & Simetria", icon: Target },
            { id: "dobras", label: "Dobras Cutâneas (Adipometria)", icon: Layers },
            { id: "comparativo", label: "Comparativo Evolutivo", icon: TrendingUp },
            { id: "fotos", label: "Fotos Antes & Depois", icon: Camera },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeViewMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveViewMode(tab.id as any)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#00FF88] text-black shadow-[0_0_20px_rgba(0,255,136,0.3)]"
                    : "bg-[#0A0A0A] text-gray-400 hover:bg-[#111] hover:text-white border border-white/5"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-black" : "text-[#00FF88]"}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. TAB: LAUDO & DIAGNÓSTICO COMPLETO */}
      {(activeViewMode === "laudo" || typeof window === "undefined") && (
        <div className="space-y-8">
          {/* Main 4 Metric Cards with Educational Interpretation */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card 1: Percentual de Gordura (BF) */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#151515] p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Gordura Corporal (% BF)
                </span>
                <button
                  onClick={() =>
                    setShowExplanationModal(
                      "O percentual de gordura (% BF) indica a porcentagem exata do seu peso corporal que é composta por tecido adiposo. Quanto mais massa muscular e menos gordura você tiver, mais definido e atlético o corpo se apresenta."
                    )
                  }
                  className="rounded-full p-1 text-gray-500 hover:text-white"
                  title="Saiba mais"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{bf}</span>
                <span className="text-lg font-bold text-gray-500">%</span>
                {previousEval && deltaBf !== 0 && (
                  <span
                    className={`ml-auto flex items-center text-xs font-black ${
                      deltaBf < 0 ? "text-[#00FF88]" : "text-red-400"
                    }`}
                  >
                    {deltaBf < 0 ? <TrendingDown className="mr-0.5 h-3.5 w-3.5" /> : <TrendingUp className="mr-0.5 h-3.5 w-3.5" />}
                    {deltaBf > 0 ? `+${deltaBf}` : deltaBf}%
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${bfInfo.badgeBg}`}>
                  {bfInfo.category}
                </span>
              </div>

              {/* Progress Zone Gauge */}
              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[9px] font-bold text-gray-500 uppercase">
                  <span>Atleta</span>
                  <span>Fitness</span>
                  <span>Médio</span>
                  <span>Elevado</span>
                </div>
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-[#0A0A0A] p-0.5 border border-white/5">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, Math.max(5, (bf / 35) * 100))}%`,
                      backgroundColor: bfInfo.color,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Massa Magra Ativa */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#151515] p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Massa Magra Ativa
                </span>
                <button
                  onClick={() =>
                    setShowExplanationModal(
                      "Massa Magra corresponde a tudo no seu corpo que NÃO é gordura: músculos esqueléticos, ossos, órgãos internos e água corporal. É o seu motor metabólico que consome calorias 24h por dia."
                    )
                  }
                  className="rounded-full p-1 text-gray-500 hover:text-white"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#00FF88]">{leanMass}</span>
                <span className="text-lg font-bold text-gray-500">kg</span>
                {previousEval && deltaLean !== 0 && (
                  <span
                    className={`ml-auto flex items-center text-xs font-black ${
                      deltaLean > 0 ? "text-[#00FF88]" : "text-red-400"
                    }`}
                  >
                    {deltaLean > 0 ? <TrendingUp className="mr-0.5 h-3.5 w-3.5" /> : <TrendingDown className="mr-0.5 h-3.5 w-3.5" />}
                    {deltaLean > 0 ? `+${deltaLean}` : deltaLean} kg
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className="text-xs font-bold text-gray-400">
                  {((leanMass / weight) * 100).toFixed(1)}% do seu peso corporal total
                </span>
              </div>

              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#0A0A0A] border border-white/5">
                  <div
                    className="h-full rounded-full bg-[#00FF88]"
                    style={{ width: `${Math.min(100, (leanMass / weight) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: Massa Gorda Total */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#151515] p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Massa Gorda (Gordura)
                </span>
                <button
                  onClick={() =>
                    setShowExplanationModal(
                      "Massa Gorda é o peso real em quilogramas de todo o tecido adiposo presente no corpo. Acompanhar a perda de kg de gordura é muito mais importante do que apenas olhar a balança comum."
                    )
                  }
                  className="rounded-full p-1 text-gray-500 hover:text-white"
                >
                  <Info className="h-3.5 w-3.5" />
                </button>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#FF5555]">{fatMass}</span>
                <span className="text-lg font-bold text-gray-500">kg</span>
                {previousEval && deltaFat !== 0 && (
                  <span
                    className={`ml-auto flex items-center text-xs font-black ${
                      deltaFat < 0 ? "text-[#00FF88]" : "text-red-400"
                    }`}
                  >
                    {deltaFat < 0 ? <TrendingDown className="mr-0.5 h-3.5 w-3.5" /> : <TrendingUp className="mr-0.5 h-3.5 w-3.5" />}
                    {deltaFat > 0 ? `+${deltaFat}` : deltaFat} kg
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className="text-xs font-bold text-gray-400">
                  {((fatMass / weight) * 100).toFixed(1)}% do seu peso corporal total
                </span>
              </div>

              <div className="mt-4">
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#0A0A0A] border border-white/5">
                  <div
                    className="h-full rounded-full bg-[#FF5555]"
                    style={{ width: `${Math.min(100, (fatMass / weight) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Card 4: Peso Total na Balança */}
            <div className="relative overflow-hidden rounded-[24px] border border-white/5 bg-[#151515] p-5 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">
                  Peso Total
                </span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  IMC: {imc}
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-black text-white">{weight}</span>
                <span className="text-lg font-bold text-gray-500">kg</span>
                {previousEval && deltaWeight !== 0 && (
                  <span
                    className={`ml-auto flex items-center text-xs font-black ${
                      deltaWeight <= 0 ? "text-cyan-400" : "text-amber-400"
                    }`}
                  >
                    {deltaWeight > 0 ? `+${deltaWeight}` : deltaWeight} kg
                  </span>
                )}
              </div>

              <div className="mt-3">
                <span className={`inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${imcInfo.badgeBg}`}>
                  {imcInfo.category}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-gray-500 font-bold">
                <span>Estatura: {height} cm</span>
                <span>{heightInMeters > 0 ? `${(weight / (heightInMeters * heightInMeters)).toFixed(1)} kg/m²` : ""}</span>
              </div>
            </div>
          </div>

          {/* Educational Body Composition Balance & Metabolism Breakdown */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Box 1: Composição Corporal Visual Didática */}
            <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-[#00FF88]">
                    <Layers className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Divisão da Composição Corporal</h3>
                    <p className="text-xs text-gray-500">Entenda exatamente o que compõe o seu peso</p>
                  </div>
                </div>

                {/* Visual Ratio Bar */}
                <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span className="text-[#00FF88] flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#00FF88]" />
                      Massa Magra: {leanMass} kg ({(100 - bf).toFixed(1)}%)
                    </span>
                    <span className="text-[#FF5555] flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5555]" />
                      Gordura: {fatMass} kg ({bf}%)
                    </span>
                  </div>

                  <div className="h-5 w-full flex overflow-hidden rounded-xl border border-white/10 p-0.5 bg-[#151515]">
                    <div
                      style={{ width: `${100 - bf}%` }}
                      className="h-full bg-gradient-to-r from-emerald-600 to-[#00FF88] rounded-l-lg transition-all duration-1000"
                      title={`Massa Magra: ${leanMass} kg`}
                    />
                    <div
                      style={{ width: `${bf}%` }}
                      className="h-full bg-gradient-to-r from-[#FF5555] to-red-600 rounded-r-lg transition-all duration-1000"
                      title={`Gordura: ${fatMass} kg`}
                    />
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium">
                    💡 <strong className="text-white">Explicação Prática:</strong> Para cada 10 kg de peso total, você carrega cerca de{" "}
                    <strong className="text-[#00FF88]">{((100 - bf) / 10).toFixed(1)} kg</strong> de massa funcional e muscular e{" "}
                    <strong className="text-[#FF5555]">{(bf / 10).toFixed(1)} kg</strong> de gordura. O objetivo do treino é expandir a massa magra
                    e otimizar o uso da gordura como fonte de energia.
                  </p>
                </div>
              </div>

              {/* Bioimpedance Additional Stats if Present */}
              {currentEval.bioimpedance && (
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-white/5 pt-6">
                  {currentEval.bioimpedance.visceralFat !== undefined && (
                    <div className="rounded-xl bg-[#0A0A0A] p-3 border border-white/5">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider block">Gordura Visceral</span>
                      <span className="text-lg font-black text-white mt-1 block">Nível {currentEval.bioimpedance.visceralFat}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {currentEval.bioimpedance.visceralFat <= 5 ? "Excelente (Baixo Risco)" : "Moderado"}
                      </span>
                    </div>
                  )}
                  {currentEval.bioimpedance.bodyWater !== undefined && (
                    <div className="rounded-xl bg-[#0A0A0A] p-3 border border-white/5">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider block">Água Corporal</span>
                      <span className="text-lg font-black text-cyan-400 mt-1 block">{currentEval.bioimpedance.bodyWater}%</span>
                      <span className="text-[10px] text-gray-500 font-bold">Hidratação celular</span>
                    </div>
                  )}
                  {currentEval.bioimpedance.boneMass !== undefined && (
                    <div className="rounded-xl bg-[#0A0A0A] p-3 border border-white/5">
                      <span className="text-[9px] uppercase font-black text-gray-500 tracking-wider block">Massa Óssea</span>
                      <span className="text-lg font-black text-white mt-1 block">{currentEval.bioimpedance.boneMass} kg</span>
                      <span className="text-[10px] text-gray-500 font-bold">Estrutura mineral</span>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Box 2: Gasto Energético & Metabolismo Explicado */}
            <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-amber-400">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Metabolismo & Gasto Calórico</h3>
                    <p className="text-xs text-gray-500">Cálculo de demanda energética personalizada</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* TMB Card */}
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-amber-400">TMB (Basal)</span>
                      <Flame className="h-4 w-4 text-amber-400" />
                    </div>
                    <p className="text-3xl font-black text-white">{tmb} <span className="text-xs font-normal text-gray-500">kcal/dia</span></p>
                    <p className="text-[11px] text-gray-400 font-medium leading-tight pt-1">
                      Calorias que seus órgãos queimam <strong>em repouso absoluto</strong> só para manter você vivo e saudável.
                    </p>
                  </div>

                  {/* GET Card */}
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#00FF88]">GET (Gasto Total)</span>
                      <Zap className="h-4 w-4 text-[#00FF88]" />
                    </div>
                    <p className="text-3xl font-black text-white">{getDailyExpenditure} <span className="text-xs font-normal text-gray-500">kcal/dia</span></p>
                    <p className="text-[11px] text-gray-400 font-medium leading-tight pt-1">
                      Gasto energético total somando seu metabolismo basal, rotina diária e intensidade dos treinos na academia.
                    </p>
                  </div>
                </div>

                {/* Practical Targets */}
                <div className="mt-4 rounded-2xl border border-white/5 bg-[#0A0A0A] p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300">
                    <span className="flex items-center gap-2 text-cyan-400">
                      <Droplets className="h-4 w-4" /> Meta de Hidratação Diária
                    </span>
                    <span className="text-white font-black text-sm">{dailyWaterLiters} Litros / dia</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Calculado na regra de 35ml de água por kg de peso corporal ({weight} kg × 35ml).
                  </p>
                </div>
              </div>

              {/* Trainer Advice/Notes if present */}
              {currentEval.notes && (
                <div className="mt-6 rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-4">
                  <span className="text-[10px] uppercase font-black tracking-widest text-[#00FF88] block mb-1">
                    📝 Observações & Orientações do Treinador
                  </span>
                  <p className="text-xs text-gray-300 italic leading-relaxed">{currentEval.notes}</p>
                </div>
              )}
            </section>
          </div>

          {/* Cardiovascular Health: WHR & Symmetry Summary */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* WHR Ratio */}
            {whrInfo && (
              <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-red-400">
                    <Heart className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white tracking-tight">Relação Cintura-Quadril (RCQ)</h3>
                    <p className="text-xs text-gray-500">Indicador de risco cardiometabólico e distribuição de gordura</p>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 space-y-4">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Índice RCQ</span>
                      <p className="text-3xl font-black text-white mt-1">{whrInfo.ratio}</p>
                    </div>
                    <span className={`rounded-xl border px-3 py-1 text-xs font-black uppercase tracking-wider ${whrInfo.badgeBg}`}>
                      {whrInfo.risk}
                    </span>
                  </div>

                  <div className="flex justify-between text-xs text-gray-400 font-medium border-t border-white/5 pt-3">
                    <span>Cintura: <strong className="text-white">{circumferences.waist || "--"} cm</strong></span>
                    <span>Quadril: <strong className="text-white">{circumferences.hip || "--"} cm</strong></span>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed font-medium">{whrInfo.desc}</p>
                </div>
              </section>
            )}

            {/* Symmetry Snapshot */}
            <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-cyan-400">
                  <Scale className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Simetria Muscular (D vs E)</h3>
                  <p className="text-xs text-gray-500">Equilíbrio de volume entre lado direito e esquerdo</p>
                </div>
              </div>

              <div className="space-y-3">
                {armRight > 0 && armLeft > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400">Braços</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        Dir: {armRight} cm • Esq: {armLeft} cm
                      </p>
                    </div>
                    <span className={`rounded-lg px-2.5 py-1 text-[11px] font-black ${armDiff <= 1.0 ? "bg-[#00FF88]/15 text-[#00FF88]" : "bg-amber-500/15 text-amber-400"}`}>
                      {armDiff <= 1.0 ? `✅ Ótima Simetria (Δ ${armDiff}cm)` : `⚠️ Atenção (Δ ${armDiff}cm)`}
                    </span>
                  </div>
                )}

                {thighRight > 0 && thighLeft > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400">Coxas</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        Dir: {thighRight} cm • Esq: {thighLeft} cm
                      </p>
                    </div>
                    <span className={`rounded-lg px-2.5 py-1 text-[11px] font-black ${thighDiff <= 1.5 ? "bg-[#00FF88]/15 text-[#00FF88]" : "bg-amber-500/15 text-amber-400"}`}>
                      {thighDiff <= 1.5 ? `✅ Ótima Simetria (Δ ${thighDiff}cm)` : `⚠️ Atenção (Δ ${thighDiff}cm)`}
                    </span>
                  </div>
                )}

                {calfRight > 0 && calfLeft > 0 && (
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-gray-400">Panturrilhas</p>
                      <p className="text-sm font-black text-white mt-0.5">
                        Dir: {calfRight} cm • Esq: {calfLeft} cm
                      </p>
                    </div>
                    <span className={`rounded-lg px-2.5 py-1 text-[11px] font-black ${calfDiff <= 1.0 ? "bg-[#00FF88]/15 text-[#00FF88]" : "bg-amber-500/15 text-amber-400"}`}>
                      {calfDiff <= 1.0 ? `✅ Ótima Simetria (Δ ${calfDiff}cm)` : `⚠️ Atenção (Δ ${calfDiff}cm)`}
                    </span>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* 3. TAB: PERÍMETROS & CIRCUNFERÊNCIAS */}
      {activeViewMode === "medidas" && (
        <div className="space-y-8">
          <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-[#00FF88]">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Medições de Perímetros Anatômicos</h3>
                <p className="text-xs text-gray-500">
                  Circunferências corporais em centímetros (cm) aferidas pelo treinador
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Coluna 1: Membros Superiores */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-[#00FF88]">
                    💪 Membros Superiores
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Ombros", key: "shoulder", val: circumferences.shoulder, prev: prevCircumferences.shoulder },
                    { label: "Tórax / Peitoral", key: "chest", val: circumferences.chest, prev: prevCircumferences.chest },
                    { label: "Braço Direito Relaxado", key: "rightArm", val: circumferences.rightArm || circumferences.armRightRelaxed, prev: prevCircumferences.rightArm || prevCircumferences.armRightRelaxed },
                    { label: "Braço Esquerdo Relaxado", key: "leftArm", val: circumferences.leftArm || circumferences.armLeftRelaxed, prev: prevCircumferences.leftArm || prevCircumferences.armLeftRelaxed },
                    { label: "Braço Dir. Contraído", key: "armRightContracted", val: circumferences.armRightContracted, prev: prevCircumferences.armRightContracted },
                    { label: "Braço Esq. Contraído", key: "armLeftContracted", val: circumferences.armLeftContracted, prev: prevCircumferences.armLeftContracted },
                    { label: "Antebraço Direito", key: "forearmRight", val: circumferences.forearmRight, prev: prevCircumferences.forearmRight },
                    { label: "Antebraço Esquerdo", key: "forearmLeft", val: circumferences.forearmLeft, prev: prevCircumferences.forearmLeft },
                  ].map((item, i) => {
                    const diff = item.val && item.prev ? Number((item.val - item.prev).toFixed(1)) : null;
                    return (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0A0A0A] p-3.5">
                        <div>
                          <span className="text-xs font-bold text-gray-400 block">{item.label}</span>
                          {diff !== null && diff !== 0 && (
                            <span className={`text-[10px] font-bold ${diff > 0 ? "text-[#00FF88]" : "text-cyan-400"}`}>
                              {diff > 0 ? `+${diff}` : diff} cm vs anterior
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-black text-white">
                          {item.val ? `${item.val} cm` : "--"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coluna 2: Tronco & Cintura */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-cyan-400">
                    📐 Tronco & Linha Central
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Pescoço", key: "neck", val: circumferences.neck, prev: prevCircumferences.neck },
                    { label: "Cintura (Linha Mínima)", key: "waist", val: circumferences.waist, prev: prevCircumferences.waist },
                    { label: "Abdômen (Cicatriz Umbilical)", key: "abdomen", val: circumferences.abdomen, prev: prevCircumferences.abdomen },
                    { label: "Quadril / Glúteos", key: "hip", val: circumferences.hip, prev: prevCircumferences.hip },
                  ].map((item, i) => {
                    const diff = item.val && item.prev ? Number((item.val - item.prev).toFixed(1)) : null;
                    return (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0A0A0A] p-3.5">
                        <div>
                          <span className="text-xs font-bold text-gray-400 block">{item.label}</span>
                          {diff !== null && diff !== 0 && (
                            <span className={`text-[10px] font-bold ${diff < 0 ? "text-[#00FF88]" : "text-amber-400"}`}>
                              {diff > 0 ? `+${diff}` : diff} cm vs anterior
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-black text-white">
                          {item.val ? `${item.val} cm` : "--"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Coluna 3: Membros Inferiores */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                    🦵 Membros Inferiores
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { label: "Coxa Direita Proximal", key: "rightThigh", val: circumferences.rightThigh || circumferences.thighRightProximal, prev: prevCircumferences.rightThigh || prevCircumferences.thighRightProximal },
                    { label: "Coxa Esquerda Proximal", key: "leftThigh", val: circumferences.leftThigh || circumferences.thighLeftProximal, prev: prevCircumferences.leftThigh || prevCircumferences.thighLeftProximal },
                    { label: "Coxa Direita Medial", key: "thighRightMedial", val: circumferences.thighRightMedial, prev: prevCircumferences.thighRightMedial },
                    { label: "Coxa Esquerda Medial", key: "thighLeftMedial", val: circumferences.thighLeftMedial, prev: prevCircumferences.thighLeftMedial },
                    { label: "Panturrilha Direita", key: "rightCalf", val: circumferences.rightCalf || circumferences.calfRight, prev: prevCircumferences.rightCalf || prevCircumferences.calfRight },
                    { label: "Panturrilha Esquerda", key: "leftCalf", val: circumferences.leftCalf || circumferences.calfLeft, prev: prevCircumferences.leftCalf || prevCircumferences.calfLeft },
                  ].map((item, i) => {
                    const diff = item.val && item.prev ? Number((item.val - item.prev).toFixed(1)) : null;
                    return (
                      <div key={i} className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0A0A0A] p-3.5">
                        <div>
                          <span className="text-xs font-bold text-gray-400 block">{item.label}</span>
                          {diff !== null && diff !== 0 && (
                            <span className={`text-[10px] font-bold ${diff > 0 ? "text-[#00FF88]" : "text-cyan-400"}`}>
                              {diff > 0 ? `+${diff}` : diff} cm vs anterior
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-black text-white">
                          {item.val ? `${item.val} cm` : "--"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* 4. TAB: DOBRAS CUTÂNEAS (ADIPOMETRIA) */}
      {activeViewMode === "dobras" && (
        <div className="space-y-8">
          <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-cyan-400">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Dobras Cutâneas (Adipômetro)</h3>
                  <p className="text-xs text-gray-500">Espessura do tecido adiposo subcutâneo medida em milímetros (mm)</p>
                </div>
              </div>

              {sumFolds > 0 && (
                <div className="rounded-2xl border border-white/10 bg-[#0A0A0A] p-4 text-right">
                  <span className="text-[10px] uppercase font-bold text-gray-500 tracking-wider block">Somatório (Σ Dobras)</span>
                  <p className="text-2xl font-black text-cyan-400 mt-0.5">{sumFolds} mm</p>
                  {prevSumFolds > 0 && (
                    <span className={`text-[10px] font-bold ${sumFolds < prevSumFolds ? "text-[#00FF88]" : "text-red-400"}`}>
                      {sumFolds < prevSumFolds ? `↓ Reduziu ${(prevSumFolds - sumFolds).toFixed(1)} mm` : `↑ Aumentou ${(sumFolds - prevSumFolds).toFixed(1)} mm`}
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: "Peitoral",
                  key: "peitoral",
                  val: folds.peitoral,
                  prev: prevFolds.peitoral,
                  desc: "Gordura do tórax superior.",
                },
                {
                  name: "Axilar Média",
                  key: "axilar",
                  val: folds.axilar || folds.axilarMedia,
                  prev: prevFolds.axilar || prevFolds.axilarMedia,
                  desc: "Lateral do tronco / linha dorsal.",
                },
                {
                  name: "Tríceps",
                  key: "triciptal",
                  val: folds.triciptal || folds.triceps,
                  prev: prevFolds.triciptal || prevFolds.triceps,
                  desc: "Região posterior do braço.",
                },
                {
                  name: "Subescapular",
                  key: "subescapular",
                  val: folds.subescapular,
                  prev: prevFolds.subescapular,
                  desc: "Região abaixo da escápula (costas).",
                },
                {
                  name: "Abdominal",
                  key: "abdominal",
                  val: folds.abdominal,
                  prev: prevFolds.abdominal,
                  desc: "Ao lado da cicatriz umbilical.",
                },
                {
                  name: "Supra-ilíaca",
                  key: "suprailiaca",
                  val: folds.suprailiaca,
                  prev: prevFolds.suprailiaca,
                  desc: "Flancos / linha acima do quadril.",
                },
                {
                  name: "Coxa",
                  key: "coxa",
                  val: folds.coxa,
                  prev: prevFolds.coxa,
                  desc: "Face anterior da coxa.",
                },
                {
                  name: "Bíceps",
                  key: "bicipital",
                  val: folds.bicipital || folds.biceps,
                  prev: prevFolds.bicipital || prevFolds.biceps,
                  desc: "Face anterior do braço.",
                },
              ].map((fold, idx) => {
                const diff = fold.val && fold.prev ? Number((fold.val - fold.prev).toFixed(1)) : null;
                const valueNum = fold.val || 0;
                return (
                  <div key={idx} className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-5 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-black text-white block">{fold.name}</span>
                        <span className="text-[10px] text-gray-500 font-medium block mt-0.5">{fold.desc}</span>
                      </div>
                      <span className="text-lg font-black text-cyan-400">
                        {fold.val !== undefined ? `${fold.val} mm` : "--"}
                      </span>
                    </div>

                    {/* Progress Thickness Bar */}
                    <div className="h-1.5 w-full bg-[#151515] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min(100, (valueNum / 35) * 100)}%` }}
                      />
                    </div>

                    {diff !== null && diff !== 0 && (
                      <div className="flex items-center justify-between text-[10px] pt-1">
                        <span className="text-gray-500">Variação:</span>
                        <span className={`font-bold ${diff < 0 ? "text-[#00FF88]" : "text-amber-400"}`}>
                          {diff < 0 ? `↓ ${Math.abs(diff)} mm` : `↑ +${diff} mm`}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* 5. TAB: COMPARATIVO EVOLUTIVO */}
      {activeViewMode === "comparativo" && (
        <div className="space-y-8">
          <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-[#00FF88]">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">Comparativo Entre Avaliações</h3>
                  <p className="text-xs text-gray-500">Selecione duas datas para analisar o progresso detalhado lado a lado</p>
                </div>
              </div>

              {/* Compare Selectors */}
              {sortedEvaluations.length > 1 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs text-gray-400 font-bold">Comparar:</span>
                  <select
                    value={currentEval.id}
                    onChange={(e) => setSelectedEvalId(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#0A0A0A] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    {sortedEvaluations.map((e) => (
                      <option key={e.id} value={e.id}>
                        {new Date(e.evalDate || e.date || "").toLocaleDateString("pt-BR")} ({e.weight}kg)
                      </option>
                    ))}
                  </select>

                  <span className="text-xs text-gray-500 font-bold">com</span>

                  <select
                    value={compareTargetEvalId || previousEval?.id || ""}
                    onChange={(e) => setCompareTargetEvalId(e.target.value)}
                    className="rounded-xl border border-white/10 bg-[#0A0A0A] px-3 py-1.5 text-xs font-bold text-white"
                  >
                    {sortedEvaluations.map((e) => (
                      <option key={e.id} value={e.id}>
                        {new Date(e.evalDate || e.date || "").toLocaleDateString("pt-BR")} ({e.weight}kg)
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {previousEval ? (
              <div className="space-y-6">
                {/* Result Summary Banner */}
                <div className="rounded-2xl border border-[#00FF88]/20 bg-[#00FF88]/5 p-6">
                  <h4 className="text-base font-black text-white flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-[#00FF88]" /> Resumo da Transformação Corporal
                  </h4>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Peso Total</span>
                      <p className="text-xl font-black text-white mt-1">
                        {deltaWeight > 0 ? `+${deltaWeight}` : deltaWeight} kg
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Gordura (% BF)</span>
                      <p className={`text-xl font-black mt-1 ${deltaBf <= 0 ? "text-[#00FF88]" : "text-red-400"}`}>
                        {deltaBf > 0 ? `+${deltaBf}` : deltaBf}%
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Massa Magra</span>
                      <p className={`text-xl font-black mt-1 ${deltaLean >= 0 ? "text-[#00FF88]" : "text-amber-400"}`}>
                        {deltaLean > 0 ? `+${deltaLean}` : deltaLean} kg
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400">Gordura Pura</span>
                      <p className={`text-xl font-black mt-1 ${deltaFat <= 0 ? "text-[#00FF88]" : "text-red-400"}`}>
                        {deltaFat > 0 ? `+${deltaFat}` : deltaFat} kg
                      </p>
                    </div>
                  </div>
                </div>

                {/* Side-by-side Table of Measurements */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-gray-500 font-bold uppercase tracking-wider">
                        <th className="py-3 px-4">Indicador / Medida</th>
                        <th className="py-3 px-4 text-center">
                          {new Date(previousEval.evalDate || previousEval.date || "").toLocaleDateString("pt-BR")}
                        </th>
                        <th className="py-3 px-4 text-center text-[#00FF88]">
                          {new Date(currentEval.evalDate || currentEval.date || "").toLocaleDateString("pt-BR")}
                        </th>
                        <th className="py-3 px-4 text-right">Variação Real (Δ)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {[
                        { label: "Peso Corporal (kg)", a: prevWeight, b: weight, unit: "kg", isGoodWhenNegative: true },
                        { label: "Percentual de Gordura (% BF)", a: prevBf, b: bf, unit: "%", isGoodWhenNegative: true },
                        { label: "Massa Magra Ativa (kg)", a: prevLean, b: leanMass, unit: "kg", isGoodWhenNegative: false },
                        { label: "Massa Gorda (kg)", a: prevFat, b: fatMass, unit: "kg", isGoodWhenNegative: true },
                        { label: "Tórax / Peitoral (cm)", a: prevCircumferences.chest, b: circumferences.chest, unit: "cm", isGoodWhenNegative: false },
                        { label: "Cintura (cm)", a: prevCircumferences.waist, b: circumferences.waist, unit: "cm", isGoodWhenNegative: true },
                        { label: "Abdômen (cm)", a: prevCircumferences.abdomen, b: circumferences.abdomen, unit: "cm", isGoodWhenNegative: true },
                        { label: "Quadril (cm)", a: prevCircumferences.hip, b: circumferences.hip, unit: "cm", isGoodWhenNegative: false },
                        { label: "Braço Direito (cm)", a: prevCircumferences.rightArm, b: circumferences.rightArm, unit: "cm", isGoodWhenNegative: false },
                        { label: "Braço Esquerdo (cm)", a: prevCircumferences.leftArm, b: circumferences.leftArm, unit: "cm", isGoodWhenNegative: false },
                        { label: "Coxa Direita (cm)", a: prevCircumferences.rightThigh, b: circumferences.rightThigh, unit: "cm", isGoodWhenNegative: false },
                        { label: "Coxa Esquerda (cm)", a: prevCircumferences.leftThigh, b: circumferences.leftThigh, unit: "cm", isGoodWhenNegative: false },
                      ].map((row, idx) => {
                        if (row.a === undefined && row.b === undefined) return null;
                        const numA = Number(row.a || 0);
                        const numB = Number(row.b || 0);
                        const diff = Number((numB - numA).toFixed(1));
                        const isPositiveChange = row.isGoodWhenNegative ? diff <= 0 : diff >= 0;

                        return (
                          <tr key={idx} className="hover:bg-white/[0.02]">
                            <td className="py-3 px-4 font-bold text-gray-300">{row.label}</td>
                            <td className="py-3 px-4 text-center text-gray-400 font-medium">{numA > 0 ? `${numA} ${row.unit}` : "--"}</td>
                            <td className="py-3 px-4 text-center font-black text-white">{numB > 0 ? `${numB} ${row.unit}` : "--"}</td>
                            <td className="py-3 px-4 text-right font-black">
                              {numA > 0 && numB > 0 ? (
                                <span className={`inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-[11px] ${
                                  diff === 0 ? "text-gray-500" : isPositiveChange ? "bg-[#00FF88]/15 text-[#00FF88]" : "bg-red-500/15 text-red-400"
                                }`}>
                                  {diff > 0 ? `+${diff}` : diff} {row.unit}
                                </span>
                              ) : (
                                "--"
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">Você possui apenas uma avaliação registrada até o momento.</p>
                <p className="text-xs text-gray-500 mt-1">Na sua próxima avaliação física, esta tela gerará automaticamente o comparativo completo de ganhos de massa e perda de gordura!</p>
              </div>
            )}
          </section>
        </div>
      )}

      {/* 6. TAB: FOTOS ANTES & DEPOIS */}
      {activeViewMode === "fotos" && (
        <div className="space-y-8">
          <section className="rounded-[32px] border border-white/5 bg-[#151515] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="rounded-xl border border-white/5 bg-[#0A0A0A] p-3 text-secondary">
                <Camera className="h-6 w-6 text-[#00FF88]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white tracking-tight">Galeria Fotográfica de Evolução</h3>
                <p className="text-xs text-gray-500">Registros visuais de postura e definição muscular</p>
              </div>
            </div>

            {(() => {
              const initialPhotos = initialEval?.photos || [];
              const latestPhotos = currentEval?.photos || [];

              if (initialPhotos.length === 0 && latestPhotos.length === 0) {
                return (
                  <div className="rounded-2xl border border-white/5 bg-[#0A0A0A] p-12 text-center">
                    <Camera className="h-12 w-12 text-gray-600 mx-auto opacity-30 mb-3" />
                    <p className="text-sm font-bold text-gray-400">Nenhuma Foto Anexada a Esta Avaliação</p>
                    <p className="text-xs text-gray-600 mt-1">O treinador pode anexar fotos de frente, costas e perfil nas avaliações físicas.</p>
                  </div>
                );
              }

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Foto Inicial */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-red-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-red-400 border border-red-500/30">
                        Foto Inicial ({new Date(initialEval?.evalDate || initialEval?.date || "").toLocaleDateString("pt-BR")})
                      </span>
                      <span className="text-xs text-gray-400 font-bold">{initialEval?.weight} kg</span>
                    </div>

                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl">
                      {initialPhotos[0] ? (
                        <img src={initialPhotos[0]} alt="Antes" className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-600 text-xs font-bold uppercase">Sem Foto Inicial</div>
                      )}
                    </div>
                  </div>

                  {/* Foto Recente */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-[#00FF88]/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-[#00FF88] border border-[#00FF88]/30">
                        Foto Atual ({new Date(currentEval.evalDate || currentEval.date || "").toLocaleDateString("pt-BR")})
                      </span>
                      <span className="text-xs text-[#00FF88] font-bold">{currentEval.weight} kg</span>
                    </div>

                    <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-[#0A0A0A] border border-white/5 shadow-2xl">
                      {latestPhotos[0] ? (
                        <img src={latestPhotos[0]} alt="Depois" className="w-full h-full object-cover" />
                      ) : (
                        <div className="h-full flex items-center justify-center text-gray-600 text-xs font-bold uppercase">Sem Foto Atual</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}
          </section>
        </div>
      )}

      {/* Explanation Modal */}
      {showExplanationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-[#151515] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <h4 className="text-base font-black text-white flex items-center gap-2">
                <Info className="h-5 w-5 text-[#00FF88]" /> Explicação Técnica Didática
              </h4>
              <button
                onClick={() => setShowExplanationModal(null)}
                className="rounded-full p-1 text-gray-500 hover:text-white"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed font-medium">{showExplanationModal}</p>
            <button
              onClick={() => setShowExplanationModal(null)}
              className="w-full rounded-xl bg-[#00FF88] py-2.5 text-xs font-black uppercase text-black hover:bg-[#00FF88]/90 transition-all shadow-md"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
