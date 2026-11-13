import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AppProvider } from './context/AppContext.tsx';
import { ErrorBoundary } from "./components/ErrorBoundary";
import { registerSW } from 'virtual:pwa-register';

const APP_CACHE_VERSION = 'jt_firebase_v3_20261113';

// Purge legacy Supabase-era browser caches once when upgrading to the Firebase build
if (typeof window !== 'undefined') {
  try {
    const storedVersion = localStorage.getItem('jt_app_cache_version');
    if (storedVersion !== APP_CACHE_VERSION) {
      localStorage.setItem('jt_app_cache_version', APP_CACHE_VERSION);
      if ('caches' in window) {
        caches.keys().then((names) => {
          if (names.length > 0) {
            Promise.all(names.map((name) => caches.delete(name))).then(() => {
              navigator.serviceWorker?.getRegistrations().then((regs) => {
                Promise.all(regs.map((r) => r.update().catch(() => {}))).finally(() => {
                  window.location.reload();
                });
              });
            });
          }
        }).catch(() => {});
      }
    }
  } catch {
    // Ignore storage errors in restricted contexts
  }

  // Reload automatically whenever a new Service Worker activates and claims control
  if ('serviceWorker' in navigator) {
    let swRefreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (swRefreshing) return;
      swRefreshing = true;
      window.location.reload();
    });
  }
}

// Auto-update service worker immediately on new deployments
const updateSW = registerSW({
  immediate: true,
  onNeedRefresh() {
    updateSW(true);
  },
  onRegisteredSW(_swUrl, registration) {
    if (registration) {
      registration.update().catch(() => {});
      setInterval(() => {
        registration.update().catch(() => {});
      }, 60 * 1000);
    }
  },
  onOfflineReady() {
    console.log('[PWA] Pronto para funcionamento online/offline.');
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
