import { useState, useEffect } from "react";
import { Download, X, Smartphone, Laptop, Share2, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAInstallerProps {
  mode?: "admin" | "student";
}

export function PWAInstaller({ mode }: PWAInstallerProps = {}) {
  const isStudent =
    mode === "student" ||
    (typeof window !== "undefined" && (
      window.location.search.includes("portal=true") ||
      window.location.search.includes("student=true") ||
      window.location.search.includes("portal_only=true")
    ));

  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [detectedOS, setDetectedOS] = useState<"ios" | "android" | "desktop" | "samsung">("android");

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone) {
      setIsStandalone(true);
      return;
    }

    // Check if user dismissed it in this browser session
    const dismissed = localStorage.getItem("pwa_prompt_dismissed_v3");
    
    // Check if we captured it globally already
    if ((window as any).deferredPrompt) {
      setDeferredPrompt((window as any).deferredPrompt);
      if (!dismissed) {
        setIsVisible(true);
      }
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      (window as any).deferredPrompt = e;
      if (!dismissed) {
        setIsVisible(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handler);

    const openModalHandler = () => {
      setShowTutorialModal(true);
      setIsVisible(true);
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

    // Fallback: Show a helpful floating banner after 4 seconds on mobile browsers that don't support beforeinstallprompt
    const timer = setTimeout(() => {
      if (!dismissed && !window.matchMedia("(display-mode: standalone)").matches) {
        setIsVisible(true);
      }
    }, 4000);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("open-pwa-install", openModalHandler);
      clearTimeout(timer);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
          setIsStandalone(true);
          setIsVisible(false);
        }
      } catch (err) {
        console.warn("Prompt failed, opening tutorial:", err);
        setShowTutorialModal(true);
      }
    } else {
      setShowTutorialModal(true);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("pwa_prompt_dismissed_v3", "true");
    setIsVisible(false);
  };

  if (isStandalone) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -120, opacity: 0 }}
            transition={{ type: "spring", damping: 18, stiffness: 120 }}
            className="fixed top-4 left-4 right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-[250] max-w-lg w-auto"
          >
            <div className="bg-[#0B0B0C]/95 backdrop-blur-xl border-2 border-[#00FF85]/40 rounded-[28px] p-5 shadow-[0_25px_50px_rgba(0,255,133,0.15)] relative overflow-hidden group">
              {/* Top light effect line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF85] to-transparent animate-pulse" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-12 h-12 bg-[#00FF85]/10 rounded-2xl flex items-center justify-center flex-shrink-0 border border-[#00FF85]/20 shadow-[0_2px_12px_rgba(0,255,133,0.1)]">
                  <Smartphone className="w-6 h-6 text-[#00FF85] animate-bounce" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-[#00FF85]/15 text-[#00FF85] text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-widest border border-[#00FF85]/20">
                      {isStudent ? "App do Aluno" : "Instalar App"}
                    </span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF85] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF85]"></span>
                    </span>
                  </div>
                  
                  <h4 className="text-white font-[900] text-[15px] tracking-tight leading-snug">
                    {isStudent ? "Instalar Portal do Aluno no Celular" : "Instalar JT Fitness no Celular"}
                  </h4>
                  <p className="text-gray-400 text-[11px] md:text-[12px] leading-relaxed mt-1 mb-4">
                    {isStudent
                      ? "Acesse seus treinos, dieta e evolução direto da tela inicial do seu celular (Android ou iPhone)!"
                      : "Acesse o app oficial da Academia JT Fitness pela tela inicial de forma rápida e otimizada."}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleInstallClick}
                      className="flex-1 bg-[#00FF85] hover:bg-[#00FF85]/90 text-black font-black py-3 px-5 rounded-xl text-[12px] md:text-[13px] transition-all transform active:scale-95 shadow-[0_8px_20px_rgba(0,255,133,0.2)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Download className="w-4 h-4" /> {isStudent ? "Instalar Portal do Aluno" : "Instalar Agora"}
                    </button>
                    <button
                      onClick={handleDismiss}
                      className="p-3 bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white rounded-xl transition-all border border-white/5 flex items-center justify-center cursor-pointer"
                      title="Fechar"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DETAILED INSTRUCTIONS MODAL */}
      <AnimatePresence>
        {showTutorialModal && (
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
              className="bg-[#0D0D0E] border border-[#222] rounded-[32px] max-w-lg w-full overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="absolute top-4 right-4 z-10">
                <button
                  type="button"
                  onClick={() => setShowTutorialModal(false)}
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
                  {isStudent ? "Instalar Portal do Aluno" : "Instalar JT Fitness"}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm mt-1 max-w-sm mx-auto">
                  {isStudent
                    ? "Tenha sua ficha de treinos, dieta e evolução física instalados no seu celular (Android ou iPhone) como um aplicativo!"
                    : "Transforme o site no app da Academia JT Fitness e acesse com um toque da sua tela inicial."}
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
                      Seu navegador suporta instalação rápida!
                    </p>
                    <button
                      type="button"
                      onClick={async () => {
                        if (!deferredPrompt) return;
                        try {
                          await deferredPrompt.prompt();
                          const { outcome } = await deferredPrompt.userChoice;
                          if (outcome === "accepted") {
                            setIsStandalone(true);
                            setShowTutorialModal(false);
                            setIsVisible(false);
                          }
                        } catch (err) {
                          console.error(err);
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
                            Certifique-se de que está usando o navegador <strong className="text-white">Safari</strong> oficial do iPhone.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm flex items-center gap-1.5">
                            Toque no botão Compartilhar <Share2 className="w-4 h-4 text-primary shrink-0 inline" />
                          </p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Toque no botão de compartilhar na barra inferior do Safari (ícone de um quadrado com uma seta para cima).
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
                            Role as opções de compartilhamento para baixo até encontrar <strong className="text-white">"Adicionar à Tela de Início"</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          4
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm font-black">Confirme</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Toque em <strong className="text-white">"Adicionar"</strong> no canto superior direito para fixar o app à sua tela de início!
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
                            Abra o menu tocando nos <strong className="text-white">três pontinhos</strong> superiores no Google Chrome ou no menu inferior se usar outro navegador.
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
                            Toque na opção <strong className="text-white">"Instalar aplicativo"</strong> ou <strong className="text-white">"Adicionar à tela inicial"</strong>.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          3
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm uppercase text-[#00FF85]">Aprovar</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Confirme a instalação para colocar um lindo atalho oficial da Academia JT Fitness no seu smartphone!
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
                          <p className="text-white font-bold text-sm">Barra de Endereço</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            No topo do seu navegador, procure pelo ícone de um computador com uma seta de download localizado no campo de navegação URL.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-white/5 p-4 rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-primary font-black text-sm shrink-0">
                          2
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">Salvar e Compartilhar</p>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            Se não encontrar, clique nos 3 pontinhos do menu, escolha <strong className="text-white">"Salvar e compartilhar"</strong> e clique em <strong className="text-white">"Instalar aplicativo"</strong>.
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
                  onClick={() => setShowTutorialModal(false)}
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

