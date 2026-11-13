import { useState, useEffect } from 'react';
import { Download, Smartphone, Laptop, X, Zap, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function InstallPwa() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [detectedOS, setDetectedOS] = useState<"ios" | "android" | "desktop" | "samsung">("android");

  useEffect(() => {
    // Check if installed already
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
    }

    // Check if globally stashed
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
    }

    const handleBeforeInstall = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      (window as any).deferredPrompt = e;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    const openModalHandler = () => {
      setShowInstallModal(true);
    };
    window.addEventListener("open-pwa-install", openModalHandler);

    // Detect browser/OS
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua) || (ua.includes("mac") && navigator.maxTouchPoints > 1)) {
      setDetectedOS("ios");
    } else if (/samsungbrowser/.test(ua)) {
      setDetectedOS("samsung");
    } else if (/android/.test(ua)) {
      setDetectedOS("android");
    } else {
      setDetectedOS("desktop");
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
      window.removeEventListener("open-pwa-install", openModalHandler);
    };
  }, []);

  if (isStandalone) return null;

  return (
    <>
      {/* PWA INSTALLATION BANNER */}
      <div className="bg-gradient-to-r from-primary/10 via-[#00FF85]/5 to-transparent border border-[#00FF85]/30 p-6 rounded-[24px] shadow-xl relative overflow-hidden flex flex-col md:flex-row items-stretch md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 rounded-2xl bg-[#00FF85]/10 flex items-center justify-center border border-[#00FF85]/20 flex-shrink-0 animate-pulse">
            <Zap className="w-6 h-6 text-[#00FF85]" />
          </div>
          <div>
            <h3 className="text-[16px] font-black text-white tracking-tight flex items-center gap-2">
              Instale o App do Treinador no seu Celular!
              <span className="bg-primary/20 text-[#00FF85] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                Coach Premium
              </span>
            </h3>
            <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-xl">
              Tenha o controle total dos seus alunos na palma da mão! Acesse o painel ADM instantaneamente a partir da sua tela inicial do celular ou tablet.
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setShowInstallModal(true)}
          className="w-full md:w-auto bg-primary hover:bg-primary/95 text-black font-black px-6 py-4 rounded-xl text-sm transition-all transform active:scale-95 shadow-[0_10px_20px_rgba(0,255,133,0.15)] relative z-10 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Download className="w-4 h-4 shrink-0" /> Instalar Painel ADM
        </button>
      </div>

      {/* PWA INSTALL DETAILED TUTORIAL MODAL */}
      <AnimatePresence>
        {showInstallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[260] flex items-center justify-center p-4 md:p-6 text-left"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-[#0D0D0E] border border-dark-border rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  onClick={() => setShowInstallModal(false)}
                  className="p-2.5 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-full transition-all border border-white/5 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 border-b border-white/5 bg-gradient-to-b from-[#00FF85]/5 to-transparent text-center">
                <div className="w-16 h-16 bg-[#00FF85]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#00FF85]/20">
                  <Smartphone className="w-8 h-8 text-[#00FF85]" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white tracking-tight">
                  Instalar Painel do Treinador (ADM)
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-sm mx-auto">
                  Adicione o app administrativo da Academia JT Fitness à sua tela de início para gerenciar treinos e alunos.
                </p>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                {/* OS Selection Buttons */}
                <div className="grid grid-cols-3 gap-2 bg-white/5 p-1 rounded-2xl border border-white/5">
                  {[
                    { id: "ios", label: "iPhone (iOS)", icon: Smartphone },
                    { id: "android", label: "Android", icon: Smartphone },
                    { id: "desktop", label: "Computador", icon: Laptop },
                  ].map((os) => {
                    const isSelected = detectedOS === os.id || (detectedOS === "samsung" && os.id === "android");
                    return (
                      <button
                        key={os.id}
                        type="button"
                        onClick={() => setDetectedOS(os.id as any)}
                        className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-center text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-primary text-black font-extrabold"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <os.icon className="w-4 h-4" />
                        <span>{os.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Automatic Install Box for supportive clients */}
                {(detectedOS === "android" || detectedOS === "desktop" || detectedOS === "samsung") && deferredPrompt ? (
                  <div className="bg-[#00FF85]/5 border border-[#00FF85]/20 rounded-2xl p-4 text-center">
                    <p className="text-[#00FF85] text-xs font-bold mb-3">
                      Seu navegador suporta instalação automática!
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!deferredPrompt) return;
                        deferredPrompt.prompt();
                        const { outcome } = await deferredPrompt.userChoice;
                        if (outcome === "accepted") {
                          setIsStandalone(true);
                          setShowInstallModal(false);
                        }
                      }}
                      className="w-full bg-[#00FF85] text-black font-black py-4 rounded-xl text-sm transition-all transform active:scale-95 shadow-[0_4px_15px_rgba(0,255,133,0.3)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> Instalar Automaticamente
                    </button>
                  </div>
                ) : null}

                {/* Manual Instructions */}
                <div className="space-y-4">
                  <h4 className="text-white font-bold text-sm tracking-tight uppercase text-gray-500 text-[11px] tracking-wider">
                    Passo a Passo Manual:
                  </h4>

                  {detectedOS === "ios" && (
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Abra no Safari</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Acesse este link no navegador <strong className="text-white">Safari</strong> oficial do seu iPhone.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm flex items-center gap-1.5">
                            Toque no Compartilhar <Share2 className="w-4 h-4 text-primary shrink-0 inline" />
                          </p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            É o botão com o ícone de um quadrado e uma seta saindo por cima, na barra inferior do Safari.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          3
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">"Adicionar à Tela de Início"</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Role as opções de compartilhamento para baixo e toque em <strong className="text-white">"Adicionar à Tela de Início"</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          4
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm font-black">Adicionar</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Toque em <strong className="text-white">"Adicionar"</strong> no canto superior direito para finalizar. O aplicativo estará na sua tela inicial!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {(detectedOS === "android" || detectedOS === "samsung") && (
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Menu do Navegador</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Abra o menu do Chrome tocando nos <strong className="text-white">três pontinhos</strong> superiores, ou as 3 linhas se for o Samsung Internet.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Instalar Aplicativo</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Selecione a opção <strong className="text-white">"Instalar aplicativo"</strong> ou <strong className="text-white">"Adicionar à tela inicial"</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          3
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm uppercase text-[#00FF85]">Aprovar e Confirmar</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Clique em <strong className="text-white">"Instalar"</strong>. O painel ADM será adicionado com ícone próprio aos seus aplicativos de sistema!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {detectedOS === "desktop" && (
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          1
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Na barra de endereços</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            No topo do navegador (ao lado da estrela de favoritos), clique no ícone de <strong className="text-white">PC com seta de download</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Atalho de Configuração</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Se preferir, clique nos 3 pontinhos do menu, selecione <strong className="text-white">"Salvar e compartilhar"</strong> e clique em <strong className="text-white">"Instalar aplicativo"</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 bg-[#09090A] border-t border-white/5 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowInstallModal(false)}
                  className="w-full bg-primary hover:bg-primary/90 text-black font-black py-4 px-4 rounded-xl text-xs transition-all tracking-wide cursor-pointer"
                >
                  Entendido, vou fazer!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
