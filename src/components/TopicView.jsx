import { useState, useEffect, useRef } from 'react';
import ProblemCard from './ProblemCard';
import ProgressBar from './ProgressBar';
import MilestoneModal from './MilestoneModal';

const gradients = {
  rose:   'from-rose-400 to-pink-500',
  amber:  'from-amber-400 to-orange-400',
  green:  'from-green-400 to-emerald-500',
  purple: 'from-purple-400 to-violet-500',
  sky:    'from-sky-400 to-blue-500',
  orange: 'from-orange-400 to-amber-500',
  teal:   'from-teal-400 to-cyan-500',
};

export default function TopicView({ topic, isDone, markDone, toggleDone, topicProgress, getShuffledProblems, onBack, resetKey, dark, toggleDark }) {
  const [showMilestone, setShowMilestone] = useState(false);
  const problems = getShuffledProblems(topic);
  const { completed, total } = topicProgress(topic.problems);
  const prevCompleted = useRef(completed);
  const grad = gradients[topic.color] || 'from-indigo-400 to-purple-500';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (prevCompleted.current !== total && completed === total && total > 0) {
      setShowMilestone(true);
    }
    prevCompleted.current = completed;
  }, [completed, total]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-800 transition-colors duration-300" style={{ animation: 'slideInRight 0.3s ease' }}>
      {showMilestone && (
        <MilestoneModal topic={topic.title} onClose={() => setShowMilestone(false)} />
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${grad} text-white px-4 sm:px-6 pb-6`}>
        {/* Back button + dark toggle row */}
        <div className="pt-5 pb-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors group bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
            Back to Topics
          </button>
          <button
            onClick={toggleDark}
            title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="text-lg w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-manipulation"
          >
            {dark ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Topic title */}
        <div className="flex items-center gap-3 mt-3 mb-5">
          <span className="text-4xl sm:text-5xl drop-shadow">{topic.emoji}</span>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold leading-tight">{topic.title}</h1>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">{total} practice problems</p>
          </div>
        </div>
        <ProgressBar completed={completed} total={total} color="indigo" onDark={true} />
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-16 sm:pb-10 space-y-4 mt-4">
        {/* Description */}
        <div className="bg-white dark:bg-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-slate-600">
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">{topic.description}</p>
        </div>

        {/* Formulas */}
        <div className="bg-white dark:bg-slate-700 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-slate-600">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📌</span>
            <h2 className="font-extrabold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wider">Key Formulas</h2>
          </div>
          <div className="space-y-3">
            {topic.formulas.map((f, i) => (
              <div key={i} className="border-l-4 border-indigo-300 dark:border-indigo-500 pl-3 flex flex-col gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{f.name}</span>
                <code className="text-sm bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-xl px-3 py-2 text-gray-800 dark:text-gray-200 font-mono break-words">
                  {f.formula}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Problems */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">🧠</span>
            <h2 className="font-extrabold text-gray-800 dark:text-gray-100 text-sm uppercase tracking-wider">Practice Problems</h2>
          </div>
          <div className="space-y-4">
            {problems.map((problem, i) => (
              <ProblemCard
                key={`${resetKey}-${problem.id}`}
                problem={problem}
                index={i}
                color={topic.color}
                isDone={isDone(problem.id)}
                onReveal={() => markDone(problem.id)}
                onToggle={() => toggleDone(problem.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
