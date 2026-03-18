export default function DailyQuestPanel({ quests }) {
  return (
    <div className="rounded-[1.8rem] border border-white/80 dark:border-slate-800 bg-white/85 dark:bg-slate-950/72 p-5 sm:p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.4)] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div>
          <h2 className="text-sm font-black uppercase tracking-[0.18em] text-slate-800 dark:text-slate-100">Daily Quests</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Fresh mini-goals that reset each day to keep the momentum going.</p>
        </div>
        <span className="rounded-full bg-gradient-to-r from-fuchsia-500 to-sky-500 text-white px-4 py-2 text-xs font-black uppercase tracking-wide shadow-sm">
          {quests.filter((quest) => quest.completed).length}/{quests.length} complete
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        {quests.map((quest) => (
          <div
            key={quest.id}
            className={`rounded-2xl border px-4 py-4 ${
              quest.completed
                ? 'border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-slate-950'
                : 'border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-2xl mb-2">{quest.emoji}</div>
                <p className="text-sm font-black text-slate-800 dark:text-slate-100">{quest.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{quest.description}</p>
              </div>
              <span className="text-lg">{quest.completed ? '✅' : '🎮'}</span>
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide">
                <span>Progress</span>
                <span>{quest.progress}/{quest.target}</span>
              </div>
              <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden border border-white/80 dark:border-slate-700">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${quest.completed ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 'bg-gradient-to-r from-fuchsia-500 to-sky-500'}`}
                  style={{ width: `${Math.min(100, Math.round((quest.progress / quest.target) * 100))}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

