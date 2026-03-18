import { useState, useEffect } from 'react';
import ProblemCard from './ProblemCard';
import ProgressBar from './ProgressBar';
import MilestoneModal from './MilestoneModal';
import StarMeter from './StarMeter';
import BossBattlePanel from './BossBattlePanel';

const gradients = {
  rose:   'from-rose-400 to-pink-500',
  amber:  'from-amber-400 to-orange-400',
  green:  'from-green-400 to-emerald-500',
  purple: 'from-purple-400 to-violet-500',
  sky:    'from-sky-400 to-blue-500',
  orange: 'from-orange-400 to-amber-500',
  teal:   'from-teal-400 to-cyan-500',
};

function getBossProblems(problems) {
  const indexes = [1, Math.floor(problems.length / 2), problems.length - 2];
  const uniqueIndexes = [...new Set(indexes)].filter((index) => index >= 0 && index < problems.length);
  return uniqueIndexes.map((index) => problems[index]);
}

export default function TopicView({ topic, isDone, markDone, toggleDone, topicProgress, getShuffledProblems, getProblemStarsFor, getTopicGameSummary, completeBossBattle, onBack, resetKey, dark, toggleDark }) {
  const [showMilestone, setShowMilestone] = useState(false);
  const problems = getShuffledProblems(topic);
  const bossProblems = getBossProblems(problems);
  const { completed, total } = topicProgress(topic.problems);
  const gameSummary = getTopicGameSummary(topic);
  const grad = gradients[topic.color] || 'from-indigo-400 to-purple-500';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleMarkGotIt = (problemId, meta) => {
    if (!isDone(problemId) && completed + 1 === total && total > 0) {
      setShowMilestone(true);
    }
    return markDone(problemId, { ...meta, topicId: topic.id });
  };

  const handleMarkUndone = (problemId) => {
    if (isDone(problemId) && completed === total) {
      setShowMilestone(false);
    }
    toggleDone(problemId);
  };

  return (
    <div className="min-h-screen transition-colors duration-300 relative overflow-hidden" style={{ animation: 'slideInRight 0.3s ease' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-[-3rem] h-40 w-40 rounded-full bg-white/35 blur-3xl dark:bg-white/5" />
        <div className="absolute top-8 right-[-2rem] h-40 w-40 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-400/10" />
      </div>
      {showMilestone && (
        <MilestoneModal topic={topic.title} onClose={() => setShowMilestone(false)} />
      )}

      {/* Header */}
      <div className="px-4 sm:px-6 pt-5">
        <div className={`max-w-5xl mx-auto bg-gradient-to-br ${grad} text-white px-4 sm:px-6 pb-6 rounded-[1.75rem] sm:rounded-[2rem] border border-white/30 dark:border-white/10 overflow-hidden relative shadow-[0_26px_70px_rgba(59,130,246,0.2)] dark:shadow-[0_26px_70px_rgba(2,6,23,0.42)]`}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_30%)]" />
        {/* Back button + dark toggle row */}
          <div className="pt-5 pb-2 flex items-center justify-between relative">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-bold transition-colors group bg-white/15 dark:bg-slate-950/28 hover:bg-white/25 dark:hover:bg-slate-950/40 px-4 py-2 rounded-full border border-white/15 dark:border-white/10 backdrop-blur-sm shadow-lg shadow-slate-900/10"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
              Back to Topics
            </button>
            <button
              onClick={toggleDark}
              title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="text-lg w-11 h-11 flex items-center justify-center rounded-full bg-white/15 dark:bg-slate-950/28 border border-white/15 dark:border-white/10 hover:bg-white/25 dark:hover:bg-slate-950/40 transition-colors touch-manipulation shadow-lg shadow-slate-900/10"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>

        {/* Topic title */}
          <div className="relative flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mt-4 mb-5">
            <div className="flex items-center gap-4">
              <span className="text-5xl sm:text-6xl drop-shadow" style={{ animation: 'floatBob 3s ease-in-out infinite' }}>{topic.emoji}</span>
              <div>
                <span className="inline-flex mb-2 rounded-full bg-white/15 border border-white/15 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/90">
                  Topic Quest
                </span>
                <h1 className="text-3xl sm:text-4xl font-black leading-tight tracking-tight">{topic.title}</h1>
                <p className="text-white/80 text-sm sm:text-base mt-1">{total} practice problems to unlock and solve</p>
              </div>
            </div>
            <div className="rounded-[1.4rem] bg-slate-950/15 dark:bg-slate-950/28 border border-white/15 dark:border-white/10 px-4 py-3 backdrop-blur-sm">
              <p className="text-[11px] uppercase tracking-[0.18em] text-white/70 font-black">Progress</p>
              <p className="text-2xl font-black">{completed}<span className="text-base text-white/70">/{total}</span></p>
              <div className="mt-2">
                <StarMeter count={Math.min(3, Math.round((gameSummary.stars / gameSummary.possibleStars) * 3))} size="sm" dimmed={true} />
              </div>
            </div>
          </div>
          <div className="relative rounded-[1.5rem] bg-white/14 dark:bg-slate-950/24 border border-white/15 dark:border-white/10 backdrop-blur-sm px-4 py-4">
            <ProgressBar completed={completed} total={total} color="indigo" onDark={true} />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pb-16 sm:pb-10 space-y-5 mt-5">
        {/* Description */}
        <div className="bg-white/85 dark:bg-slate-950/72 rounded-[1.8rem] p-5 sm:p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.4)] border border-white/80 dark:border-slate-800 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg">🌈</span>
            <h2 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-[0.18em]">What You&apos;ll Practice</h2>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">{topic.description}</p>
        </div>

        {/* Formulas */}
        <div className="bg-white/85 dark:bg-slate-950/72 rounded-[1.8rem] p-5 sm:p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.4)] border border-white/80 dark:border-slate-800 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📌</span>
            <h2 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-[0.18em]">Power Tools</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {topic.formulas.map((f, i) => (
              <div key={i} className="rounded-2xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 px-4 py-4 flex flex-col gap-2 shadow-sm">
                <span className="text-xs text-slate-500 dark:text-slate-300 font-black uppercase tracking-wide">{f.name}</span>
                <code className="text-sm bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-800 dark:text-slate-100 font-mono break-words">
                  {f.formula}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Problems */}
        <div>
          <div className="flex items-end justify-between gap-3 mb-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧠</span>
              <div>
                <h2 className="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-[0.18em]">Challenge Cards</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Type your answer first, then unlock the solution.</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-900 text-white dark:bg-gradient-to-r dark:from-sky-400 dark:to-violet-400 dark:text-slate-950 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] shadow-sm">
              Solve, don&apos;t peek
            </span>
          </div>
          <div className="space-y-4">
            {problems.map((problem, i) => (
              <ProblemCard
                key={`${resetKey}-${problem.id}`}
                problem={problem}
                index={i}
                color={topic.color}
                isDone={isDone(problem.id)}
                bestStars={getProblemStarsFor(problem.id)}
                onMarkGotIt={(meta) => handleMarkGotIt(problem.id, meta)}
                onMarkUndone={() => handleMarkUndone(problem.id)}
              />
            ))}
          </div>
        </div>

        <BossBattlePanel
          topic={topic}
          problems={bossProblems}
          bossState={{
            ...gameSummary.boss,
            unlocked: completed === total && total > 0,
          }}
          onWin={(meta) => completeBossBattle(topic.id, meta)}
        />
      </div>
    </div>
  );
}
