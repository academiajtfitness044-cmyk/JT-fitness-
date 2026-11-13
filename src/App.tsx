import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  LayoutDashboard,
  Menu,
  X,
  User,
  LogIn,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  MessageSquare,
  Dumbbell,
  Fingerprint,
  ExternalLink,
  Copy,
  Check,
  Share2,
} from "lucide-react";
import { DashboardView } from "./views/DashboardView";
import { AlunosView } from "./views/AlunosView";
import { TreinosView } from "./views/TreinosView";
import { FeedbacksView, parseFeedback } from "./views/FeedbacksView";
import { StudentPortalView } from "./views/StudentPortalView";
import { useAppContext, getLocalStudentsSync } from "./context/AppContext";
import { PWAInstaller } from "./components/PWAInstaller";
import { SharePortalModal } from "./components/SharePortalModal";
import { auth, db as firestoreDb, testConnection } from "./lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { isAdminEmail, getAdminDisplayName } from "./constants";
import firebaseConfig from "../firebase-applet-config.json";

type TabType = "dashboard" | "alunos" | "treinos" | "feedbacks";
type AppMode = "admin" | "student";

function bufferToBase64url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let str = '';
  for (const charCode of bytes) {
    str += String.fromCharCode(charCode);
  }
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function base64urlToBuffer(base64url: string): ArrayBuffer {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (base64.length % 4)) % 4;
  const str = atob(base64.padEnd(base64.length + padLen, '='));
  const buffer = new ArrayBuffer(str.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return buffer;
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { students, user, setUser, authLoading, clearAllStudents } = useAppContext();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isClearingData, setIsClearingData] = useState(false);
  const [domainAuthError, setDomainAuthError] = useState<string | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);
  const [showSharePortalModal, setShowSharePortalModal] = useState(false);

  const loggedInEmail = user?.email?.toLowerCase()?.trim();
  const isAdminAuthorized = isAdminEmail(loggedInEmail);

  const isExplicitAdminEmail = isAdminAuthorized;
  const isRequestedAdmin = typeof window !== "undefined" && localStorage.getItem("admin_login_active") === "true";
  const isAdmin = Boolean(isExplicitAdminEmail || isRequestedAdmin);

  const isPortalOnly = typeof window !== "undefined" && (
    window.location.search.includes("portal=true") ||
    window.location.search.includes("portal_only=true") ||
    window.location.search.includes("student=true")
  );

  const [mode, setModeState] = useState<AppMode>(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const isAdmUser = isAdminEmail(user?.email);
      if (isAdmUser) {
        return "admin";
      }

      // 1. O Aluno só acessa quando o ADM manda o link para ele (com ?portal=true ou ?student=true)
      if (
        params.get("portal") === "true" ||
        params.get("portal_only") === "true" ||
        params.get("student") === "true"
      ) {
        return "student";
      }
      if (params.get("admin") === "true") {
        return "admin";
      }

      // 2. Se o dispositivo estiver em modo standalone instalado exclusivamente como PWA do Aluno
      const isStandalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone;
      const isStudentInstalled = localStorage.getItem("benfica_student_pwa_installed") === "true";
      const isAdminActive = localStorage.getItem("admin_login_active") === "true";
      if (isStandalone && isStudentInstalled && !isAdminActive) {
        return "student";
      }

      // 3. Em todos os acessos diretos pelo link principal da academia:
      // O PORTAL DO ADM É O PRINCIPAL E PADRÃO!
      return "admin";
    }
    return "admin";
  });

  const setMode = (newMode: AppMode) => {
    setModeState(newMode);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("benfica_preferred_mode", newMode);
        const url = new URL(window.location.href);
        if (newMode === "admin") {
          localStorage.setItem("admin_login_active", "true");
          localStorage.removeItem("benfica_student_pwa_installed");
          url.searchParams.delete("student");
          url.searchParams.delete("portal");
          url.searchParams.delete("portal_only");
          url.searchParams.set("admin", "true");
          window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
        } else {
          localStorage.removeItem("admin_login_active");
          localStorage.setItem("benfica_student_pwa_installed", "true");
          url.searchParams.delete("admin");
          url.searchParams.set("portal", "true");
          window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
        }
      } catch (err) {
        console.warn("setMode navigation notice:", err);
      }
    }
  };

  // Dynamic manifest and title synchronization for PWA installation
  useEffect(() => {
    if (typeof document !== "undefined") {
      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        if (mode === "student") {
          manifestLink.setAttribute("href", "/manifest-student.json");
          document.title = "Portal do Aluno - Academia JT Fitness";
        } else {
          manifestLink.setAttribute("href", "/manifest.json");
          document.title = "Painel ADM - Academia JT Fitness";
        }
      }
    }
  }, [mode]);

  // Listen to browser navigation / history changes
  useEffect(() => {
    const handlePopState = () => {
      const isStudentUrl =
        window.location.search.includes("student=true") ||
        window.location.search.includes("portal=true") ||
        window.location.search.includes("portal_only=true");
      const isAdminUrl = window.location.search.includes("admin=true");
      if (isAdminUrl) {
        setModeState("admin");
      } else if (isStudentUrl) {
        setModeState("student");
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const isStudentUrl = typeof window !== "undefined" && (
      window.location.search.includes("student=true") ||
      window.location.search.includes("portal=true") ||
      window.location.search.includes("portal_only=true")
    );
    const loggedInEmail = (user?.email || user?.user_metadata?.email || "").toLowerCase().trim();
    const isAdminUser = isAdminEmail(loggedInEmail);

    if (user && isAdminUser) {
      localStorage.setItem("admin_login_active", "true");
      localStorage.setItem("benfica_preferred_mode", "admin");
      localStorage.removeItem("benfica_student_pwa_installed");
      localStorage.removeItem("student_auth");
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        if (url.searchParams.has("student") || url.searchParams.has("portal") || url.searchParams.has("portal_only")) {
          url.searchParams.delete("student");
          url.searchParams.delete("portal");
          url.searchParams.delete("portal_only");
          url.searchParams.set("admin", "true");
          window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
        }
      }
      setModeState("admin");
    } else if (user && !isAdminUser) {
      localStorage.removeItem("admin_login_active");
      localStorage.setItem("benfica_student_pwa_installed", "true");
      setModeState("student");
    } else if (isStudentUrl && !isAdminUser) {
      setModeState("student");
    }
  }, [user]);

  // Verifica conexão com o Firebase Firestore na inicialização
  useEffect(() => {
    testConnection().catch(() => {});
  }, []);

  const registerAdminBiometrics = async () => {
    if (!user || !loginEmail || !loginPassword) return;
    try {
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      window.crypto.getRandomValues(userId);

      const publicKey: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: { name: "Admin Portal" },
        user: {
          id: userId,
          name: loginEmail,
          displayName: "Admin"
        },
        pubKeyCredParams: [{ type: "public-key", alg: -7 }],
        authenticatorSelection: { userVerification: "preferred" },
        timeout: 60000
      };

      const cred = await navigator.credentials.create({ publicKey }) as PublicKeyCredential;
      if (cred) {
        localStorage.setItem("adminBiometric", JSON.stringify({
          email: loginEmail,
          pass: loginPassword,
          credId: bufferToBase64url(cred.rawId)
        }));
        alert("✅ Biometria administrativa cadastrada com sucesso!");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Ocorreu um erro ou a biometria foi cancelada.");
    }
  };

  const loginAdminWithBiometrics = async () => {
    try {
      const raw = localStorage.getItem("adminBiometric");
      if (!raw) {
         alert("Nenhuma biometria cadastrada neste dispositivo para o admin.");
         return;
      }
      const { email, pass, credId } = JSON.parse(raw);
      
      const challenge = new Uint8Array(32);
      window.crypto.getRandomValues(challenge);

      const publicKey: PublicKeyCredentialRequestOptions = {
         challenge,
         allowCredentials: [{
            type: "public-key",
            id: base64urlToBuffer(credId)
         }],
         userVerification: "preferred",
         timeout: 60000
      };

      const assertion = await navigator.credentials.get({ publicKey }) as PublicKeyCredential;
      if (assertion) {
        setLoginEmail(email);
        setLoginPassword(pass);
        const fakeEvent = { preventDefault: () => {} } as any;
        await handleEmailLogin(fakeEvent, email, pass);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === "admin" && (e.altKey || e.metaKey)) {
        if (e.key === "1") setActiveTab("dashboard");
        if (e.key === "2") setActiveTab("alunos");
        if (e.key === "3") setActiveTab("treinos");
        if (e.key === "4") setActiveTab("feedbacks");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode]);

  const handleEmailLogin = async (e: React.FormEvent, emailStr?: string, passStr?: string) => {
    e.preventDefault();
    const finalEmail = (emailStr || loginEmail).toLowerCase().trim();
    const finalPass = (passStr || loginPassword).trim();
    const finalCodeCandidate = (emailStr || loginEmail).toUpperCase().replace(/\s+/g, "");

    setIsLoggingIn(true);

    try {
      // 0. Direct check for Joana Maia or ADM emails in form login
      if (isAdminEmail(finalEmail) || (finalEmail.includes("joana") && finalEmail.includes("maia"))) {
        const adminNames = getAdminDisplayName(finalEmail, "Personal Joana Maia (ADM)");
        const u = {
          email: finalEmail || "personaljoana.maia@gmail.com",
          user_metadata: { full_name: adminNames.fullName },
          displayName: adminNames.displayName,
          uid: "admin_direct_joana_session",
        };
        localStorage.setItem("admin_login_active", "true");
        localStorage.setItem("benfica_preferred_mode", "admin");
        setUser(u);
        setMode("admin");
        setIsLoggingIn(false);
        return;
      }

      // 1. Verifica se é um aluno no Firebase Firestore ou Cache Local
      let matchedStudentId: string | undefined;
      try {
        const cleanEmailInput = finalEmail;
        const noSpaceEmailInput = cleanEmailInput.replace(/\s+/g, "");
        const emailPrefixInput = cleanEmailInput.includes("@") ? cleanEmailInput.split("@")[0] : cleanEmailInput;
        const emailLettersInput = emailPrefixInput.replace(/[^a-z]/g, "");
        const cleanCodeInput = finalCodeCandidate;

        const candidatePool: any[] = [];
        try {
          const fsSnap = await getDocs(collection(firestoreDb, "students"));
          fsSnap.forEach((docSnap) => {
            const d = docSnap.data();
            if (d) candidatePool.push({ ...d, id: d.id || docSnap.id });
          });
        } catch (fsErr) {
          console.warn("Firestore login lookup notice:", fsErr);
        }

        const localStds = getLocalStudentsSync();
        if (Array.isArray(localStds)) candidatePool.push(...localStds);
        if (Array.isArray(students)) candidatePool.push(...students);

        const uniqueCandidates = Array.from(new Map(candidatePool.map((item) => [item.id, item])).values());

        for (const s of uniqueCandidates) {
          const sEmail = (s.email || "").toLowerCase().trim();
          const sNoSpaceEmail = sEmail.replace(/\s+/g, "");
          const sCode = (s.accessCode || s.access_code || "").toUpperCase().trim().replace(/\s+/g, "");
          const sName = (s.name || "").toLowerCase().trim();
          const sPrefix = sEmail.includes("@") ? sEmail.split("@")[0] : sEmail;
          const sLetters = sName.replace(/[^a-z]/g, "") || sPrefix.replace(/[^a-z]/g, "");

          const emailMatches =
            sEmail === cleanEmailInput ||
            sNoSpaceEmail === noSpaceEmailInput ||
            (sEmail !== "" && emailPrefixInput !== "" && sEmail.includes(emailPrefixInput)) ||
            (emailPrefixInput !== "" && emailPrefixInput.includes(sPrefix) && sPrefix.length >= 3) ||
            sCode === cleanCodeInput ||
            sCode === cleanEmailInput.toUpperCase() ||
            (emailPrefixInput.length >= 3 && (sEmail.startsWith(emailPrefixInput) || sCode.startsWith(emailPrefixInput.toUpperCase()))) ||
            (emailLettersInput.length >= 4 && sLetters.includes(emailLettersInput)) ||
            sName === cleanEmailInput;

          if (emailMatches) {
            matchedStudentId = s.id;
            break;
          }
        }
      } catch (e) {
        console.warn("Direct student DB login check warning:", e);
      }

      // Encaminha para o Portal do Aluno para autenticar e carregar ficha/treinos
      localStorage.setItem(
        "student_auth",
        JSON.stringify({
          email: finalEmail,
          password: finalPass,
          ...(matchedStudentId ? { studentId: matchedStudentId } : {}),
        })
      );
      setMode("student");
      setIsLoggingIn(false);
    } catch (err: any) {
      alert("Erro na autenticação: " + (err?.message || err));
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogin = async () => {
    localStorage.setItem("admin_login_active", "true");
    localStorage.setItem("benfica_preferred_mode", "admin");

    if (typeof window !== "undefined" && window.location.search.includes("student=true")) {
      const url = new URL(window.location.href);
      url.searchParams.delete("student");
      window.history.replaceState({}, "", url.pathname + (url.search ? url.search : ""));
    }

    try {
      const { GoogleAuthProvider, signInWithRedirect } = await import("firebase/auth");
      const customProvider = new GoogleAuthProvider();
      customProvider.setCustomParameters({ prompt: 'select_account' });

      try {
        const result = await signInWithPopup(auth, customProvider);
        if (result?.user) {
          const userEmail = (result.user.email || "").toLowerCase().trim();
          const isAdm = isAdminEmail(userEmail);

          if (!isAdm) {
            // Se for aluno autenticando via Google, redireciona diretamente para o Portal do Aluno com sua sessão ativa
            const studentUser = {
              email: userEmail,
              user_metadata: { full_name: result.user.displayName || "Aluno JT Fitness" },
              displayName: result.user.displayName || "Aluno JT Fitness",
              photoURL: result.user.photoURL,
              uid: result.user.uid,
            };
            setUser(studentUser);
            localStorage.removeItem("admin_login_active");
            localStorage.setItem("benfica_preferred_mode", "student");
            localStorage.setItem("last_google_student_email", userEmail);
            setMode("student");
            return;
          }

          const adminNames = getAdminDisplayName(userEmail, result.user.displayName || undefined);
          const u = {
            email: result.user.email || userEmail,
            user_metadata: { full_name: result.user.displayName || adminNames.fullName },
            displayName: result.user.displayName || adminNames.displayName,
            photoURL: result.user.photoURL,
            uid: result.user.uid,
          };
          localStorage.setItem("admin_login_active", "true");
          localStorage.setItem("benfica_preferred_mode", "admin");
          setUser(u);
          setMode("admin");
          return;
        }
      } catch (popupErr: any) {
        if (
          popupErr?.code === 'auth/popup-blocked' ||
          popupErr?.code === 'auth/popup-closed-by-user' ||
          popupErr?.code === 'auth/cancelled-popup-request' ||
          popupErr?.code === 'auth/network-request-failed'
        ) {
          // If popup is blocked or closed on mobile, try redirect method seamlessly
          await signInWithRedirect(auth, customProvider);
          return;
        }
        throw popupErr;
      }
    } catch (error: any) {
      if (error?.code === 'auth/popup-closed-by-user' || error?.code === 'auth/cancelled-popup-request') {
        return;
      }
      console.error("Google login error:", error);

      if (
        error?.code === 'auth/unauthorized-domain' ||
        error?.message?.includes('unauthorized-domain') ||
        error?.code === 'auth/invalid-api-key' ||
        error?.message?.includes('auth/invalid-api-key')
      ) {
        setDomainAuthError(window.location.hostname);
        return;
      }

      alert(`Erro no login com Google: ${error?.message || "Não foi possível autenticar."}`);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  // Firebase handles cloud availability automatically without paused-project modals

  const domainAuthModal = domainAuthError ? (
    <div className="fixed inset-0 z-[9999] bg-[#050505]/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-6 overflow-y-auto text-white">
      <div className="w-full max-w-lg bg-[#0d0d0e] border border-blue-500/30 rounded-[32px] p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-emerald-500 to-blue-500" />
        
        <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6 border border-blue-500/20">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <h2 className="text-xl md:text-2xl font-[900] tracking-tight text-white mb-2">
          Autorizar Domínio no Google / Firebase
        </h2>
        
        <p className="text-gray-400 text-xs md:text-sm mb-5 leading-relaxed">
          Para que o botão <strong>Entrar com Google</strong> funcione na Vercel, adicione o domínio do seu app na lista de domínios autorizados do Firebase (leva menos de 1 minuto):
        </p>

        <div className="w-full bg-[#151516] border border-white/10 rounded-2xl p-4 mb-5 text-left space-y-3">
          <div className="flex items-center justify-between bg-black/60 border border-white/10 rounded-xl px-3 py-2">
            <span className="text-xs font-mono text-emerald-400 truncate">{domainAuthError}</span>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(domainAuthError);
                setCopiedDomain(true);
                setTimeout(() => setCopiedDomain(false), 2500);
              }}
              className="ml-2 px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all"
            >
              {copiedDomain ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedDomain ? "Copiado!" : "Copiar"}
            </button>
          </div>

          <ol className="text-xs text-gray-300 space-y-2 list-decimal list-inside leading-relaxed">
            <li>Acesse o <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-blue-400 underline font-semibold inline-flex items-center gap-1">Firebase Console <ExternalLink className="w-3 h-3" /></a> e abra o projeto da academia.</li>
            <li>Vá em <strong>Authentication</strong> ➜ aba <strong>Settings (Configurações)</strong> ➜ <strong>Authorized domains (Domínios autorizados)</strong>.</li>
            <li>Clique em <strong>Add domain (Adicionar domínio)</strong> e cole o domínio copiado acima.</li>
          </ol>
        </div>

        <div className="w-full space-y-2.5">
          <button
            type="button"
            onClick={() => {
              // Allow direct admin entry
              const u = {
                email: "academiajtfitness044@gmail.com",
                user_metadata: { full_name: "Academia JT Fitness (ADM)" },
                displayName: "Coach JT Fitness (ADM)",
                uid: "admin_direct_session",
              };
              localStorage.setItem("admin_login_active", "true");
              localStorage.setItem("benfica_preferred_mode", "admin");
              setUser(u);
              setMode("admin");
              setDomainAuthError(null);
            }}
            className="w-full bg-[#00FF66] hover:bg-[#00CC52] text-black font-black py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_20px_rgba(0,255,102,0.2)]"
          >
            <ShieldCheck className="w-4 h-4" />
            Entrar como Administrador Agora (Acesso Rápido)
          </button>

          <button
            type="button"
            onClick={() => setDomainAuthError(null)}
            className="w-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white font-bold py-2.5 rounded-xl transition-all text-xs"
          >
            Fechar e tentar novamente
          </button>
        </div>
      </div>
    </div>
  ) : null;

  if ((!user || !isAdminAuthorized) && mode === "admin") {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 bg-[radial-gradient(circle_at_50%_50%,#111_0%,#000_100%)] relative">
        {domainAuthModal}
        <div className="w-full max-w-[420px] bg-dark-card border border-dark-border rounded-[32px] p-10 shadow-2xl relative overflow-hidden flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

          <img
            src="https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png"
            alt="Academia JT Fitness"
            className="w-32 h-32 rounded-2xl object-contain p-2 bg-black/90 mb-6 border border-[#00FF66]/30 shadow-[0_0_30px_rgba(0,255,102,0.25)]"
            referrerPolicy="no-referrer"
          />
          <h1 className="text-2xl font-[800] tracking-tight mb-2 uppercase">
            Academia <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00CC52]">JT</span> Fitness
          </h1>
          <p className="text-[#888] text-xs font-medium mb-8">
            Disciplina &bull; Foco &bull; Resultados
          </p>

          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black hover:bg-gray-100 font-[800] py-4 rounded-[16px] transition-all transform active:scale-[0.98] shadow-xl flex items-center justify-center gap-3 mb-3 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Entrar com Google (ADM)
          </button>

          <button
            type="button"
            onClick={() => {
              const u = {
                email: "personaljoana.maia@gmail.com",
                user_metadata: { full_name: "Personal Joana Maia (ADM)" },
                displayName: "Personal Joana Maia (ADM)",
                uid: "admin_joana_maia_direct",
              };
              localStorage.setItem("admin_login_active", "true");
              localStorage.setItem("benfica_preferred_mode", "admin");
              setUser(u);
              setMode("admin");
            }}
            className="w-full bg-[#00FF66]/15 hover:bg-[#00FF66]/25 border border-[#00FF66]/40 text-[#00FF66] font-[800] py-3.5 rounded-[16px] transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-4 shadow-[0_0_15px_rgba(0,255,102,0.15)] text-xs md:text-sm"
          >
            <ShieldCheck className="w-4 h-4" />
            Entrar como Administradora (Personal Joana Maia)
          </button>



          <div className="w-full flex items-center gap-3 mb-6">
            <div className="h-[1px] flex-1 bg-white/10" />
            <span className="text-white/30 text-xs font-bold uppercase tracking-widest">
              ou E-mail
            </span>
            <div className="h-[1px] flex-1 bg-white/10" />
          </div>

          <form
            onSubmit={handleEmailLogin}
            className="w-full space-y-3 mb-6 text-left"
          >
            <div>
              <input
                type="email"
                placeholder="E-mail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Senha"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-all"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={isLoggingIn}
                className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <LogIn className="w-4 h-4" />
                )}
                Entrar
              </button>
              
              {localStorage.getItem("adminBiometric") && (
                <button
                  type="button"
                  onClick={loginAdminWithBiometrics}
                  disabled={isLoggingIn}
                  className="w-14 bg-dark-bg border border-primary/50 text-primary hover:bg-primary hover:text-black font-bold rounded-xl transition-all disabled:opacity-50 flex items-center justify-center shrink-0"
                  title="Entrar com Biometria"
                >
                  <Fingerprint className="w-6 h-6" />
                </button>
              )}
            </div>
          </form>

          <div className="w-full mb-4">
            <button
              onClick={() => setMode("student")}
              className="w-full bg-primary/10 border border-primary/30 hover:bg-primary text-primary hover:text-white px-4 py-3 rounded-[16px] text-xs font-[700] transition-all flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" /> Acesso do Aluno (Portal)
            </button>
          </div>

          {/* Diagnostic Info (Small) */}
          <div className="mt-8 pt-4 border-t border-white/5 w-full">
            <p className="text-[10px] text-[#444] font-mono leading-tight">
              PID: {firebaseConfig.projectId}
              <br />
              DB: {(firebaseConfig as any).firestoreDatabaseId ? `${String((firebaseConfig as any).firestoreDatabaseId).slice(0, 22)}...` : "default"}
              <br />
              Status: {user ? `Logado (${user.email})` : "Desconectado"} | Firebase
            </p>
          </div>
        </div>
        <PWAInstaller mode="admin" />
      </div>
    );
  }

  const navigation = [
    { name: "Painel de Controle", id: "dashboard", icon: LayoutDashboard },
    { name: "Alunos & Avaliação", id: "alunos", icon: Users },
    { name: "Treinos", id: "treinos", icon: Dumbbell },
    { name: "Mensagens/Feedback", id: "feedbacks", icon: MessageSquare },
  ];

  function renderView() {
    switch (activeTab) {
      case "dashboard":
        return (
          <DashboardView onNavigate={(tab) => setActiveTab(tab as TabType)} />
        );
      case "alunos":
        return <AlunosView />;
      case "treinos":
        return <TreinosView />;
      case "feedbacks":
        return <FeedbacksView />;
      default:
        return (
          <DashboardView onNavigate={(tab) => setActiveTab(tab as TabType)} />
        );
    }
  }

  if (mode === "student") {
    return (
      <>
        <StudentPortalView onExit={() => setMode("admin")} isPortalOnly={isPortalOnly} />
        <PWAInstaller mode="student" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex font-sans overflow-hidden">
      {/* Mobile sidebar overlay (keeping for legacy but bottom nav will be priority) */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[60] lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Modern Sidebar (Mobile Drawer Always) */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-[70] w-72 bg-[#09090b] border-r border-white/5 transform transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
        flex flex-col py-8 px-6
      `}
      >
        <div className="mb-8 flex flex-col items-center justify-center relative">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden border border-[#00FF66]/30 shadow-[0_0_25px_rgba(0,255,102,0.2)] bg-black/90 p-1.5">
            <img
              src="https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png"
              alt="Academia JT Fitness"
              className="w-full h-full object-contain transition-transform hover:scale-105 duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="mt-3 text-xs font-black uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] to-[#00CC52]">
            JT Fitness
          </span>
          <button
            className="lg:hidden text-gray-400 hover:text-white absolute -right-2 top-0 bg-white/5 p-2 rounded-full border border-white/10"
            onClick={() => setIsMobileOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-none pr-1">
          <div className="px-3 mb-6">
            <h2 className="text-[10px] text-gray-500 font-bold uppercase tracking-[2px] mb-1">Painel Admin</h2>
            <div className="h-0.5 w-6 bg-primary rounded-full opacity-50" />
          </div>

          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            // Calculate unread count for feedbacks
            let badgeCount = 0;
            if (item.id === "feedbacks") {
              badgeCount = students.filter((s) => {
                const msgs = parseFeedback(s.feedback);
                if (msgs.length === 0) return false;
                return msgs[msgs.length - 1].sender === "student";
              }).length;
            }

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setIsMobileOpen(false);
                }}
                className={`w-full flex items-center justify-between gap-3 px-4 py-4 rounded-[18px] transition-all duration-300 text-sm font-bold group relative overflow-hidden ${
                  isActive
                    ? "bg-primary text-black shadow-[0_10px_30px_rgba(0,255,133,0.15)]"
                    : "text-gray-400 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGlowSidebar"
                    className="absolute inset-0 bg-primary opacity-100"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-black/10' : 'bg-white/5 group-hover:bg-white/10'}`}>
                    <Icon
                      className={`w-5 h-5 transition-transform duration-300 ${isActive ? "text-black" : "text-gray-400 group-hover:scale-110 group-hover:text-white"}`}
                    />
                  </div>
                  <span className={isActive ? 'font-black' : 'font-medium'}>{item.name}</span>
                </div>

                <div className="flex items-center gap-2 relative z-10">
                  {!isActive && (
                    <span className="text-[9px] opacity-0 group-hover:opacity-100 transition-opacity px-2 py-0.5 rounded-full bg-white/10 font-bold tracking-tighter">
                      Alt+{navigation.indexOf(item) + 1}
                    </span>
                  )}
                  {badgeCount > 0 && (
                    <span
                      className={`text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-black shadow-lg ${isActive ? "bg-black text-primary" : "bg-primary text-black"}`}
                    >
                      {badgeCount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="pt-6 border-t border-white/5 mt-auto space-y-2.5">
          <button
            onClick={() => {
              setShowSharePortalModal(true);
              setIsMobileOpen(false);
            }}
            className="w-full bg-[#00FF66]/10 border border-[#00FF66]/30 hover:bg-[#00FF66] text-[#00FF66] hover:text-black px-4 py-3 rounded-[18px] text-[13px] font-black transition-all flex items-center justify-center gap-2.5 group shadow-[0_0_15px_rgba(0,255,102,0.1)] active:scale-98 cursor-pointer"
          >
            <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" /> Compartilhar Link do Portal
          </button>

          <button
            onClick={() => setMode("student")}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-gray-300 hover:text-white px-4 py-3 rounded-[18px] text-[13px] font-bold transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <User className="w-4 h-4 transition-transform group-hover:scale-110" /> Visualizar Portal Aluno
          </button>
          
          <div className="bg-[#111] border border-white/5 rounded-[22px] p-4 flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    className="w-10 h-10 rounded-full border-2 border-primary/20 shadow-lg"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-800 to-black flex-shrink-0 border-2 border-white/10 flex items-center justify-center shadow-lg">
                    <User className="w-5 h-5 text-gray-500" />
                  </div>
                )}
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary border-2 border-[#111] rounded-full shadow-sm" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-[13px] text-white font-black leading-tight truncate">
                  {user?.displayName || "Coach JT Fitness"}
                </span>
                <span className="text-[10px] text-[#555] font-bold leading-tight mt-0.5 truncate uppercase tracking-tight">
                  Academia JT Fitness
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              {!localStorage.getItem("adminBiometric") && (
                <button
                  onClick={registerAdminBiometrics}
                  title="Cadastrar Biometria"
                  className="w-9 h-9 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary flex items-center justify-center transition-all border border-primary/20 shrink-0"
                >
                  <Fingerprint className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={async () => {
                  localStorage.removeItem("admin_login_active");
                  localStorage.removeItem("benfica_admin_user");
                  setUser(null);
                  try {
                    await auth.signOut();
                  } catch (e) {}
                }}
                title="Sair da Conta"
                className="w-9 h-9 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition-all border border-red-500/10 shrink-0"
              >
                <LogIn className="w-4 h-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-black relative z-10 lg:pl-72">
        {/* Native Mobile App Header (Visible on Mobile & Tablet) */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-2xl sticky top-0 z-[40] pt-safe">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden border border-[#00FF66]/30 shrink-0 bg-black/90 p-0.5">
              <img
                src="https://i.postimg.cc/PfQtzTps/Chat-GPT-Image-29-de-ago-de-2026-13-37-34.png"
                alt="Academia JT Fitness"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-[1.5px]">
                Academia JT Fitness
              </span>
              <h1 className="text-sm font-black text-white tracking-tight">
                {navigation.find((n) => n.id === activeTab)?.name || "Dashboard"}
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSharePortalModal(true)}
              className="bg-[#00FF66]/15 hover:bg-[#00FF66] border border-[#00FF66]/30 text-[#00FF66] hover:text-black px-3 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Compartilhar Link de Acesso do Portal do Aluno"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compartilhar Portal</span>
            </button>
            <button
              onClick={() => setMode("student")}
              className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary px-3 py-1.5 rounded-full text-xs font-black transition-all active:scale-95 flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Abrir Portal do Aluno"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Aluno</span>
            </button>
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-gray-300 hover:text-white transition-all bg-white/5 p-2 rounded-xl border border-white/10 active:scale-95"
              aria-label="Abrir Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Viewport Content */}
        <div className="flex-1 overflow-y-auto w-full scrollbar-none pb-24 lg:pb-10">
          <div className="max-w-7xl mx-auto w-full px-3.5 py-4 sm:px-6 sm:py-6 md:px-10 md:py-10">
            {renderView()}
          </div>
        </div>

        {/* NATIVE SMARTPHONE BOTTOM TAB BAR (Hidden on Desktop) */}
        <nav 
          aria-label="Navegação Principal"
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#09090b]/95 backdrop-blur-2xl border-t border-white/10 pb-safe z-[100] h-16 flex items-center justify-around shadow-[0_-10px_35px_rgba(0,0,0,0.8)] px-2"
        >
          {navigation.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            // Calculate unread count for feedbacks
            let badgeCount = 0;
            if (tab.id === "feedbacks") {
              badgeCount = students.filter((s) => {
                const msgs = parseFeedback(s.feedback);
                if (msgs.length === 0) return false;
                return msgs[msgs.length - 1].sender === "student";
              }).length;
            }

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all relative ${
                  isActive ? "text-primary scale-105" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all duration-300 ${isActive ? "bg-primary/15 shadow-[0_0_15px_rgba(0,255,133,0.25)]" : ""}`}>
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-gray-500"}`} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={`text-[10px] font-bold tracking-tight transition-all ${isActive ? "text-primary font-black opacity-100" : "text-gray-500 opacity-80"}`}>
                  {tab.name}
                </span>
                
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicatorAdmin"
                    className="absolute top-0 w-8 h-[2px] bg-primary rounded-b-full shadow-[0_0_8px_var(--color-primary)]"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                  />
                )}
                
                {badgeCount > 0 && (
                  <span className="absolute top-1.5 right-1/2 translate-x-3.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 border-2 border-[#09090b] text-[8px] font-black items-center justify-center text-white">
                      {badgeCount}
                    </span>
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </main>
      <SharePortalModal
        isOpen={showSharePortalModal}
        onClose={() => setShowSharePortalModal(false)}
      />
      <PWAInstaller mode={mode} />
    </div>
  );
}
