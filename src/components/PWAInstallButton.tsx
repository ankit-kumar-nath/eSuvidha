import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        onClick={async () => {
          if (isInstallable) {
            await install();
          } else {
            setShowGuide(true);
          }
        }}
        className="min-h-[40px] px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-medium text-slate-700 dark:text-slate-200 hover:border-[#0B2A5B] dark:hover:border-[#FF9933] transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
        aria-label="Install eSuvidha App on your device"
      >
        <Download className="w-3.5 h-3.5 text-[#FF9933]" />
        <span>{isIOS ? 'Install on iOS' : 'Install App'}</span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pwa-install-title"
        >
          <div className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B2A5B] text-white flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-[#FF9933]" />
                </div>
                <div>
                  <h3 id="pwa-install-title" className="text-base font-semibold text-slate-900 dark:text-white">
                    Add eSuvidha to Home Screen
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Offline checklists · Instant status tracking
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="min-h-[40px] min-w-[40px] rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                aria-label="Close install instructions"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              {isIOS ? (
                <>
                  <p>
                    1. Tap the <strong className="text-slate-900 dark:text-white">Share</strong> icon in your Safari toolbar.
                  </p>
                  <p>
                    2. Scroll down and select <strong className="text-slate-900 dark:text-white">Add to Home Screen</strong>.
                  </p>
                  <p>
                    3. Tap <strong className="text-slate-900 dark:text-white">Add</strong> in the top-right corner to launch eSuvidha like a native mobile app.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    1. Open your browser menu (<strong className="text-slate-900 dark:text-white">⋮</strong> in Chrome/Edge) or look for the install icon in the address bar.
                  </p>
                  <p>
                    2. Select <strong className="text-slate-900 dark:text-white">Install app</strong> or <strong className="text-slate-900 dark:text-white">Add to Home screen</strong>.
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
                    Note: If browsing inside an embedded preview frame, open the app in a standalone browser tab to trigger one-tap installation.
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-[#0B2A5B] text-white text-sm font-medium hover:bg-[#0B2A5B]/90 transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
