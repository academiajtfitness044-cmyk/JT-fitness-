import React, { useState, useMemo } from "react";
import {
  Share2,
  Copy,
  Check,
  QrCode,
  X,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Smartphone,
  ExternalLink,
  MessageCircle,
  Users,
} from "lucide-react";
import { useAppContext, Student } from "../context/AppContext";

interface SharePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedStudent?: Student | null;
}

export function SharePortalModal({
  isOpen,
  onClose,
  preselectedStudent = null,
}: SharePortalModalProps) {
  const { students } = useAppContext();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(
    preselectedStudent?.id || ""
  );
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"general" | "student">("general");
  const [showQrCode, setShowQrCode] = useState(false);

  // Generate the clean public portal URL
  const portalUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/?portal=true`;
  }, []);

  const selectedStudent = useMemo(() => {
    if (!selectedStudentId) return null;
    return students.find((s) => s.id === selectedStudentId) || null;
  }, [students, selectedStudentId]);

  // Pre-composed friendly message for General invite (for registered or new unregistered students)
  const generalMessage = useMemo(() => {
    return (
      `💪 *Academia JT Fitness - Portal do Aluno*\n\n` +
      `Olá! Segue o link de acesso exclusivo ao nosso *Portal do Aluno*:\n\n` +
      `🔗 *Link do Portal:* ${portalUrl}\n\n` +
      `📌 *Como acessar:*\n` +
      `• *Já é aluno:* Conecte com sua conta Google (ou e-mail) para acessar seus treinos e dieta na hora!\n` +
      `• *Primeiro acesso:* Conecte com sua conta Google para realizar seu cadastro inicial rapidamente!\n\n` +
      `No portal você tem acesso a:\n` +
      `✅ Ficha de Treinos completa e atualizada\n` +
      `✅ Plano Alimentar e Metas de Hidratação\n` +
      `✅ Avaliações Físicas e Gráficos de Evolução\n` +
      `✅ Registro de Cargas e Histórico\n\n` +
      `📲 *Instale o App:* Ao abrir o link no seu celular (Android ou iPhone), toque no aviso na tela ou em "Adicionar à Tela de Início" no navegador para instalar o aplicativo no seu celular!\n\n` +
      `Bons treinos! 🚀🔥`
    );
  }, [portalUrl]);

  // Pre-composed personalized message for a specific enrolled student
  const studentMessage = useMemo(() => {
    if (!selectedStudent) return generalMessage;
    const pwd = selectedStudent.accessPassword
      ? `🔑 *Senha:* ${selectedStudent.accessPassword}\n`
      : "";
    const code = selectedStudent.accessCode
      ? `🆔 *Código:* ${selectedStudent.accessCode}\n`
      : "";

    return (
      `💪 *Academia JT Fitness - Seu Acesso Oficial*\n\n` +
      `Olá, *${selectedStudent.name}*! Aqui está o seu link de acesso exclusivo ao Portal do Aluno:\n\n` +
      `🔗 *Link Direto:* ${portalUrl}\n` +
      `📧 *E-mail:* ${selectedStudent.email || "Seu e-mail cadastrado"}\n` +
      `${pwd}${code}\n` +
      `No portal você encontra seus treinos, dieta, avaliações e gráficos de evolução. Basta clicar no link acima e acessar!\n\n` +
      `📲 *Dica:* Você pode instalar o Portal do Aluno direto na tela inicial do seu celular (Android ou iPhone) tocando no aviso de instalação ao abrir o link! 🚀`
    );
  }, [selectedStudent, generalMessage, portalUrl]);

  const currentMessage = activeTab === "student" && selectedStudent ? studentMessage : generalMessage;

  const handleCopyLink = () => {
    if (!portalUrl) return;
    navigator.clipboard.writeText(portalUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyFullMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent(currentMessage);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, "_blank");
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Portal do Aluno - Academia JT Fitness",
          text: currentMessage,
          url: portalUrl,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  if (!isOpen) return null;

  // QR Code URL using high-contrast green theme
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    portalUrl
  )}&color=00FF66&bgcolor=09090b`;

  return (
    <div className="fixed inset-0 z-[120] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0e0e11] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden my-6 flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative Top Accent Bar */}
        <div className="h-1 w-full bg-gradient-to-r from-[#00FF66] via-emerald-400 to-[#00CC52]" />

        {/* Header */}
        <div className="p-6 border-b border-white/5 flex items-start justify-between relative bg-gradient-to-b from-white/[0.03] to-transparent">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#00FF66]/15 border border-[#00FF66]/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,255,102,0.2)]">
              <Share2 className="w-6 h-6 text-[#00FF66]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                Link do Portal do Aluno
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Compartilhe o acesso exclusivo para alunos cadastrados ou novos
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 overflow-y-auto max-h-[75vh]">
          
          {/* Security & Isolation Callout */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/25 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#00FF66] shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold text-[#00FF66] uppercase tracking-wider block">
                Acesso Seguro & Exclusivo para o Aluno
              </span>
              <p className="text-gray-300 leading-relaxed">
                Este link abre <strong>somente o Portal do Aluno</strong>. A área administrativa (ADM) é completamente oculta e bloqueada para qualquer visitante deste link.
              </p>
            </div>
          </div>

          {/* Mode Selector: General vs Specific Student */}
          <div className="flex items-center gap-2 p-1.5 bg-black/40 border border-white/5 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab("general")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "general"
                  ? "bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Link Geral (Qualquer Aluno)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("student")}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                activeTab === "student"
                  ? "bg-[#00FF66] text-black shadow-[0_0_15px_rgba(0,255,102,0.2)]"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              Aluno Específico
            </button>
          </div>

          {/* Student Selector if 'student' tab is chosen */}
          {activeTab === "student" && (
            <div className="space-y-2 animate-in fade-in duration-200">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-[#00FF66]" />
                Selecione o Aluno:
              </label>
              <select
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#00FF66] transition-colors"
              >
                <option value="">-- Escolha um aluno cadastrado --</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} {s.email ? `(${s.email})` : ""} {s.accessCode ? `[Cód: ${s.accessCode}]` : ""}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Direct Link Field */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-300 flex items-center justify-between">
              <span>Link Direto do Portal:</span>
              <span className="text-[10px] text-emerald-400 font-mono">Modo Aluno Automático</span>
            </label>
            <div className="flex items-center gap-2 bg-black/70 border border-white/10 rounded-2xl p-2 pl-3.5 focus-within:border-[#00FF66]/50 transition-all">
              <input
                type="text"
                readOnly
                value={portalUrl}
                className="w-full bg-transparent text-xs text-gray-200 font-mono outline-none select-all"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="shrink-0 bg-white/10 hover:bg-[#00FF66] hover:text-black text-white px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                title="Copiar Link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Explanation Badges: For enrolled and for new unregistered students */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Alunos Cadastrados
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Entram pelo código, e-mail/senha ou com a conta Google já vinculada.
              </p>
            </div>
            <div className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                Novos (Não Cadastrados)
              </div>
              <p className="text-[11px] text-gray-400 leading-tight">
                Basta clicar em <strong>"Entrar com Google"</strong> para auto-cadastro instantâneo!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <div className="grid grid-cols-2 gap-3">
              {/* WhatsApp Button */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(37,211,102,0.25)] active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-black" />
                Enviar WhatsApp
              </button>

              {/* Native Mobile Share Button */}
              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 px-4 rounded-2xl text-xs transition-all flex items-center justify-center gap-2 border border-white/10 active:scale-98"
              >
                <Smartphone className="w-4 h-4 text-[#00FF66]" />
                Compartilhar
              </button>
            </div>

            {/* Copy Full Formatted Invite Message */}
            <button
              type="button"
              onClick={handleCopyFullMessage}
              className="w-full bg-black/60 hover:bg-white/5 border border-white/15 text-gray-300 hover:text-white py-3 px-4 rounded-2xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Copy className="w-3.5 h-3.5 text-emerald-400" />
              Copiar Mensagem Completa com Instruções
            </button>

            {/* Toggle QR Code View */}
            <button
              type="button"
              onClick={() => setShowQrCode(!showQrCode)}
              className="w-full py-2.5 px-3 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
            >
              <QrCode className="w-4 h-4 text-[#00FF66]" />
              {showQrCode ? "Ocultar QR Code" : "Exibir QR Code para Aluno Escanear no Local"}
            </button>
          </div>

          {/* QR Code Container */}
          {showQrCode && (
            <div className="p-4 bg-black border border-[#00FF66]/30 rounded-3xl flex flex-col items-center justify-center text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
              <div className="p-3 bg-[#09090b] rounded-2xl border border-[#00FF66]/40 shadow-[0_0_25px_rgba(0,255,102,0.2)]">
                <img
                  src={qrCodeUrl}
                  alt="QR Code do Portal do Aluno"
                  className="w-48 h-48 rounded-xl object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-white">
                  Aponte a câmera do celular
                </p>
                <p className="text-[11px] text-gray-400">
                  O aluno é direcionado instantaneamente para o Portal do Aluno
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-black/40 flex items-center justify-between">
          <a
            href={portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#00FF66] hover:underline flex items-center gap-1 font-medium"
          >
            Testar link do portal <ExternalLink className="w-3 h-3" />
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
}
