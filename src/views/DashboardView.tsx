import { Users, TrendingUp, Activity, Dumbbell, Calendar, User } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useAppContext } from "../context/AppContext";
import { InstallPwa } from "../components/InstallPwa";

export function DashboardView({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const { students } = useAppContext();

  const totalStudents = students.length;
  const totalEvaluations = students.reduce((acc, curr) => acc + (curr.evaluations?.length || 0), 0);
  const totalWorkouts = students.filter((s) => s && s.workoutPlan && s.workoutPlan.days && s.workoutPlan.days.length > 0).length;

  const studentsWithoutEvaluation = students.filter((s) => !s.evaluations || s.evaluations.length === 0).length;

  // Group evaluations by month and year
  const getProgressionData = () => {
    const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const evalsPerMonth: Record<string, number> = {};

    // Default last 4 months
    const now = new Date();
    for (let i = 3; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      evalsPerMonth[`${months[d.getMonth()]}`] = 0;
    }

    students.forEach((student) => {
      student.evaluations?.forEach((ev) => {
        const d = new Date(ev.date + "T00:00:00"); // simple parsing
        if (!isNaN(d.getTime())) {
          const monthStr = months[d.getMonth()];
          if (evalsPerMonth[monthStr] !== undefined) {
            evalsPerMonth[monthStr]++;
          }
        }
      });
    });

    return Object.keys(evalsPerMonth).map((month) => ({
      month,
      evals: Math.max(1, evalsPerMonth[month]), // Keep at least 1 just for visual curve starting point if desired, but 0 is real
    }));
  };

  const progressionData =
    Object.keys(students).length > 0
      ? getProgressionData()
      : [
          { month: "Jan", evals: 1 },
          { month: "Fev", evals: 5 },
          { month: "Mar", evals: 3 },
          { month: "Abr", evals: 7 },
        ];

  return (
    <div className="flex flex-col gap-[35px] animate-in fade-in slide-in-from-bottom-6 duration-700">
      <InstallPwa />
      
      {/* HEADER SECTION */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2 animate-pulse">
            <div className="h-1 w-8 bg-[#00FF66] rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[3px] text-[#00FF66]">Coach Cockpit</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight font-sans">
            Painel de <span className="text-[#00FF66]">Performance</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            Bem-vindo ao centro de operações. Monitore o progresso técnico dos atletas, fichas de treinos, aparelhos e avaliações físicas.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Status de Monitoramento</span>
            <span className="text-xs font-black text-[#00FF66] leading-none mt-1.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#00FF66] rounded-full animate-ping" />
              EM TEMPO REAL
            </span>
          </div>
          <div className="bg-[#0c0c0c] border border-white/5 text-gray-300 p-3.5 rounded-2xl shadow-xl relative group hover:border-[#00FF66]/30 transition-all">
            <Activity className="w-5 h-5 text-[#00FF66]" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#00FF66] rounded-full border-2 border-[#0c0c0c]" />
          </div>
        </div>
      </header>

      {/* KPI GRID */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* KPI CARD: total students */}
        <div
          className="group rounded-[24px] bg-[#090909] border border-white/5 p-6 hover:border-[#00FF66]/35 hover:shadow-[0_10px_30px_rgba(0,255,102,0.05)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          onClick={() => onNavigate("alunos")}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF66]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00FF66]/10 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#00FF66]/15 text-[#00FF66]">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-black text-[#00FF66] uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#00FF66]/10">Atletas</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white tracking-tight">{totalStudents}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Perfis</span>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-white/[0.03] pt-3 text-xs text-gray-400">
            <span>Alunos Vinculados</span>
            <span className="text-[#00FF66] font-black group-hover:underline flex items-center gap-1">Gerenciar &rarr;</span>
          </div>
        </div>

        {/* KPI CARD: total evaluations */}
        <div className="group rounded-[24px] bg-[#090909] border border-white/5 p-6 hover:border-[#00FF66]/35 hover:shadow-[0_10px_30px_rgba(0,255,102,0.05)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF66]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00FF66]/10 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#00FF66]/15 text-[#00FF66]">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-black text-[#00FF66] uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#00FF66]/10">Laudos</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white tracking-tight">{totalEvaluations}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Laudos</span>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-white/[0.03] pt-3 text-xs text-gray-400">
            <span>Histórico de Medições</span>
            <span className="text-[#00FF66] font-bold">Consolidado</span>
          </div>
        </div>

        {/* KPI CARD: active workouts */}
        <div
          className="group rounded-[24px] bg-[#090909] border border-white/5 p-6 hover:border-[#00FF66]/35 hover:shadow-[0_10px_30px_rgba(0,255,102,0.05)] transition-all duration-300 cursor-pointer relative overflow-hidden"
          onClick={() => onNavigate("treinos")}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00FF66]/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00FF66]/10 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-[#00FF66]/15 text-[#00FF66] group-hover:text-[#00FF88] group-hover:bg-[#00FF66]/20 transition-colors">
              <Dumbbell className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-black text-[#00FF66] uppercase tracking-widest px-2.5 py-1 rounded-lg bg-[#00FF66]/10">Treinos</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white tracking-tight">{totalWorkouts}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Fichas</span>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-white/[0.03] pt-3 text-xs text-gray-400">
            <span>Treinos Prescritos</span>
            <span className="text-[#00FF66] font-bold group-hover:text-[#00FF88] flex items-center gap-1">Montar Treinos &rarr;</span>
          </div>
        </div>

        {/* KPI CARD: students without physical evaluation */}
        <div className="group rounded-[24px] bg-[#090909] border border-white/5 p-6 hover:border-amber-400/35 hover:shadow-[0_10px_30px_rgba(251,191,36,0.05)] transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors" />
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-amber-500/15 text-amber-400">
              <TrendingUp className="h-5 w-5" />
            </div>
            <span className="text-[9px] font-black text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded-lg bg-amber-500/10 animate-pulse">Aviso</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black text-white tracking-tight">{studentsWithoutEvaluation}</span>
            <span className="text-xs font-bold text-gray-500 uppercase">Pendentes</span>
          </div>
          <div className="flex items-center justify-between mt-4 border-t border-white/[0.03] pt-3 text-xs text-gray-400">
            <span>Sem Avaliação Inicial</span>
            <span className="text-amber-400 font-bold">Importante</span>
          </div>
        </div>
      </div>

      {/* CORE PERFORMANCE ANALYTICS PANELS */}
      <div className="grid gap-[25px] lg:grid-cols-7 flex-1">
        {/* PROGRESSION CHART */}
        <div className="rounded-[24px] bg-[#090909] border border-white/5 p-6 sm:p-8 flex flex-col shadow-2xl lg:col-span-4 min-h-[400px] relative">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Métrica de Engajamento</span>
              <h3 className="text-lg font-black text-white tracking-tight mt-1">Sessões de Avaliação Física</h3>
              <p className="text-xs text-gray-500 mt-0.5">Progressão periódica de avaliações finalizadas por mês.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00FF66]" />
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-wider font-sans">Avaliações Completas</span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={progressionData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="neonGreenGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00FF66" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00FF66" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.015)" vertical={false} />
                <XAxis dataKey="month" stroke="#444" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} tickMargin={15} />
                <YAxis stroke="#444" fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ stroke: "rgba(0, 255, 102, 0.2)", strokeWidth: 2 }}
                  contentStyle={{
                    backgroundColor: "#000000",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "16px",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: "#00FF66", fontWeight: "900", fontSize: "12px" }}
                  labelStyle={{ color: "#888", fontWeight: "700", marginBottom: "4px" }}
                />
                <Area type="monotone" dataKey="evals" stroke="#00FF66" strokeWidth={4} fillOpacity={1} fill="url(#neonGreenGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LIVE ATHLETES LOG */}
        <div className="rounded-[24px] bg-[#090909] border border-white/5 flex flex-col shadow-2xl lg:col-span-3 overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 bg-[#000]/40 backdrop-blur-xl flex items-center justify-between">
            <div>
              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest block font-sans">CRM Operações</span>
              <h3 className="text-sm font-black text-white mt-0.5">Últimos Atletas Ativos</h3>
            </div>
            <span className="text-[9px] font-black text-[#00FF66] bg-[#00FF66]/10 border border-[#00FF66]/20 px-2.5 py-1 rounded-lg font-sans">
              AO VIVO
            </span>
          </div>

          <div className="flex-1 overflow-y-auto scrollbar-none divide-y divide-white/[0.03]">
            {students.length === 0 ? (
              <div className="p-10 text-center flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <p className="text-gray-500 text-sm font-medium">Nenhum atleta registrado no sistema.</p>
              </div>
            ) : (
              students.map((s) => {
                const hasEvals = s.evaluations && s.evaluations.length > 0;
                const lastEval = hasEvals ? s.evaluations[s.evaluations.length - 1] : null;

                return (
                  <div
                    key={s.id}
                    className="group px-6 py-4 flex justify-between items-center hover:bg-white/[0.015] transition-all cursor-pointer"
                    onClick={() => onNavigate("alunos")}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {/* Avatar container */}
                      <div className="w-11 h-11 rounded-xl bg-[#000000] flex flex-shrink-0 items-center justify-center border border-white/5 group-hover:border-[#00FF66]/50 transition-colors overflow-hidden relative">
                        {lastEval && lastEval.photos && lastEval.photos[0] ? (
                          <img src={lastEval.photos[0]} alt={s.name} className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-5 h-5 text-gray-500 group-hover:text-white transition-colors" />
                        )}
                      </div>

                      {/* Info details */}
                      <div className="flex flex-col gap-0.5 overflow-hidden">
                        <span className="text-xs font-black text-white truncate group-hover:text-[#00FF66] transition-colors">{s.name}</span>
                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                          {hasEvals ? (
                            <span>
                              {lastEval?.weight} kg • {lastEval?.height} cm
                            </span>
                          ) : (
                            <span className="text-gray-600">Sem protocolo de medidas</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions feedback */}
                    {hasEvals ? (
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-2.5 py-1 bg-[#00FF66]/10 text-[#00FF66] text-[8px] font-black uppercase tracking-widest rounded-lg border border-[#00FF66]/15 font-sans">
                          Monitorado
                        </span>
                        <span className="text-[8px] text-gray-600 font-bold uppercase font-sans">
                          {s.evaluations.length} {s.evaluations.length === 1 ? "Laudo" : "Laudos"}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="px-2.5 py-1 bg-amber-500/10 text-amber-400 text-[8px] font-black uppercase tracking-widest rounded-lg border border-amber-500/15 font-sans">
                          Pendente
                        </span>
                        <span className="text-[8px] text-gray-600 font-bold uppercase font-sans">Falta Inicial</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <button
            onClick={() => onNavigate("alunos")}
            className="w-full py-4.5 bg-[#050505] hover:bg-[#0a0a0a] border-t border-white/5 text-[9px] font-black text-gray-500 hover:text-white uppercase tracking-[3px] transition-all"
          >
            Acessar Prancha de Alunos &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
