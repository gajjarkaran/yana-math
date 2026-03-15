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

export default function TopicView({ topic, isDone, markDone, toggleDone, topicProgress, onBack, resetKey }) {
  const [showMilestone, setShowMilestone] = useState(false);
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
    <div className="min-h-screen bg-gray-50" style={{ animation: 'slideInRight 0.3s ease' }}>
      {showMilestone && (
        <MilestoneModal topic={topic.title} onClose={() => setShowMilestone(false)} />
      )}

      {/* Header */}
      <div className={`bg-gradient-to-br ${grad} text-white px-4 sm:px-6 pt-safe pt-6 pb-6`}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-4 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Back
        </button>
        <div className="flex items-center gap-3 mb-5">
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
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <p className="text-gray-600 leading-relaxed text-sm">{topic.description}</p>
        </div>

        {/* Formulas */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-widest">📌 Key Formulas</h2>
          <div className="space-y-2.5">
            {topic.formulas.map((f, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-xs text-gray-500 font-medium">{f.name}</span>
                <code className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-mono break-words">
                  {f.formula}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Problems */}
        <div>
          <h2 className="font-bold text-gray-700 mb-3 text-xs uppercase tracking-widest">🧠 Practice Problems</h2>
          <div className="space-y-4">
            {topic.problems.map((problem, i) => (
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
