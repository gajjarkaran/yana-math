export default function BadgeShelf({ badges }) {
  return (
    <div className="rounded-[1.8rem] border border-white/80 dark:border-slate-800 bg-white/85 dark:bg-slate-950/72 p-5 sm:p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.4)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-800 dark:text-slate-100">Badge Shelf</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Collect badges by solving smart, clearing bosses, and finishing quests.</p>
        </div>
        <span className="rounded-full bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-2 text-xs font-black uppercase tracking-wide">
          {badges.filter((badge) => badge.unlocked).length}/{badges.length} unlocked
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-2xl border px-4 py-4 text-center transition-colors ${
              badge.unlocked
                ? 'border-amber-200 dark:border-amber-700 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/40 dark:to-slate-950'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80 opacity-70'
            }`}
          >
            <div className="text-3xl mb-2">{badge.emoji}</div>
            <p className="text-sm font-black text-slate-800 dark:text-slate-100">{badge.title}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

