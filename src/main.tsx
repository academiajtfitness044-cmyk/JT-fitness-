import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './context/AppContext.tsx';
import { ErrorBoundary } from "./components/ErrorBoundary";
import { registerSW } from 'virtual:pwa-register';

// Auto-update service worker immediately on new Vercel/GitHub deployments
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    // Instantly claim and activate newest version without prompt
    updateSW(true);
  },
  onOfflineReady() {
    console.log('[PWA] Pronto para funcionamento ultra-rápido offline/online.');
  }
});

// Check for new build versions when user returns or opens app
if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.serviceWorker?.getRegistration().then(reg => reg?.update().catch(() => {}));
    }
  });
  window.addEventListener('focus', () => {
    navigator.serviceWorker?.getRegistration().then(reg => reg?.update().catch(() => {}));
  });
}

window.addEventListener('vite:preloadError', () => {
    window.location.reload();
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    (window as any).deferredPrompt = e;
});

window.addEventListener('error', (e) => {
    if (e.message && e.message.includes('fetch dynamically imported module') || e.error?.message?.includes('import')) {
        window.location.reload();
    }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <AppProvider>
        <App />
      </AppProvider>
    </ErrorBoundary>
  </StrictMode>,
);

