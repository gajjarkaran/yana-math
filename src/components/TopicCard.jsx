import ProgressBar from './ProgressBar';

const gradients = {
  rose:   'from-rose-400 to-pink-500',
  amber:  'from-amber-400 to-orange-400',
  green:  'from-green-400 to-emerald-500',
  purple: 'from-purple-400 to-violet-500',
  sky:    'from-sky-400 to-blue-500',
  orange: 'from-orange-400 to-amber-500',
  teal:   'from-teal-400 to-cyan-500',
};

export default function TopicCard({ topic, progress, onClick }) {
  const { completed, total } = progress;
  const isComplete = completed === total && total > 0;
  const grad = gradients[topic.color] || 'from-indigo-400 to-purple-500';
  const summary = topic.description.split('. ')[0];

  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-[1.8rem] border border-white/70 dark:border-white/10 bg-white/80 dark:bg-slate-950/65 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.45)] hover:shadow-[0_24px_56px_rgba(79,70,229,0.2)] dark:hover:shadow-[0_24px_56px_rgba(14,165,233,0.16)] transition-all duration-300 hover:-translate-y-1.5 overflow-hidden group backdrop-blur-sm"
    >
      {/* colored header */}
      <div className={`bg-gradient-to-br ${grad} px-5 pt-5 pb-6 relative`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_32%)]" />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300 inline-block">{topic.emoji}</div>
            <h3 className="font-black text-white text-xl leading-tight">{topic.title}</h3>
            <span className="inline-flex mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">{total} challenge cards</span>
          </div>
          <span className="rounded-full bg-white/18 border border-white/20 px-3 py-1 text-xs font-black text-white shadow-sm">
            {isComplete ? 'Mastered' : `${completed}/${total}`}
          </span>
        </div>
        {isComplete && (
          <span className="absolute top-4 right-4 text-2xl">✅</span>
        )}
      </div>

      {/* progress section */}
      <div className="px-5 py-5 bg-white/85 dark:bg-slate-950/70 relative">
        <p className="text-sm text-slate-600 dark:text-slate-200 leading-relaxed min-h-[3.25rem]">
          {summary}.
        </p>
        <div className="mt-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/90 px-4 py-3">
          <div className="flex items-center justify-between mb-3 text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-300">
            <span>Progress Meter</span>
            <span>{isComplete ? 'All clear' : 'Keep going'}</span>
          </div>
          <ProgressBar completed={completed} total={total} color={topic.color} />
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wide">
            Tap to enter
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white dark:bg-gradient-to-r dark:from-sky-400 dark:to-violet-400 dark:text-slate-950 px-4 py-2 text-xs font-black uppercase tracking-wide group-hover:translate-x-1 transition-transform duration-300">
            Start
            <span>→</span>
          </span>
        </div>
      </div>
    </button>
  );
}
