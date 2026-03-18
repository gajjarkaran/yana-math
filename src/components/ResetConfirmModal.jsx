import { useEffect } from 'react';

export default function ResetConfirmModal({ onCancel, onConfirm }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onCancel();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-[2rem] border border-white/80 dark:border-white/10 bg-gradient-to-br from-white via-rose-50 to-orange-50 dark:from-[#0d1627] dark:via-[#1b1529] dark:to-[#22161a] p-6 sm:p-7 shadow-[0_32px_90px_rgba(15,23,42,0.28)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reset-progress-title"
      >
        <div className="text-4xl mb-3">🧹</div>
        <p className="inline-flex rounded-full bg-rose-100 text-rose-700 dark:bg-white/10 dark:text-rose-200 border border-rose-200 dark:border-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em]">
          Reset Progress
        </p>
        <h2 id="reset-progress-title" className="mt-3 text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
          Start fresh?
        </h2>
        <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
          This clears solved cards, stars, XP, badges, boss wins, and today&apos;s streak progress for this browser.
        </p>
        <div className="mt-6 flex gap-3 flex-wrap-reverse sm:flex-nowrap">
          <button
            onClick={onCancel}
            className="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white/85 dark:bg-slate-950/72 px-5 py-3 text-sm font-black uppercase tracking-wide text-slate-700 dark:text-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full rounded-full bg-gradient-to-r from-rose-500 to-orange-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-lg"
          >
            Yes, Reset Everything
          </button>
        </div>
      </div>
    </div>
  );
}
