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

export default function TopicView({ topic, isDone, markDone, toggleDone, topicProgress, onBack }) {
  const [showMilestone, setShowMilestone] = useState(false);
  const { completed, total } = topicProgress(topic.problems);
  const prevCompleted = useRef(completed);
  const grad = gradients[topic.color] || 'from-indigo-400 to-purple-500';

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
      <div className={`bg-gradient-to-br ${grad} text-white px-6 pt-6 pb-10`}>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-white/80 hover:text-white text-sm mb-5 transition-colors group"
        >
          <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span> Back to Topics
        </button>
        <div className="flex items-center gap-4 mb-5">
          <span className="text-5xl drop-shadow">{topic.emoji}</span>
          <div>
            <h1 className="text-2xl font-bold leading-tight">{topic.title}</h1>
            <p className="text-white/70 text-sm mt-0.5">{total} practice problems</p>
          </div>
        </div>
        <ProgressBar completed={completed} total={total} color="indigo" />
      </div>

      <div className="max-w-2xl mx-auto px-4 -mt-4 pb-10 space-y-5">
        {/* Description card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <p className="text-gray-600 leading-relaxed text-sm">{topic.description}</p>
        </div>

        {/* Formulas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-bold text-gray-700 mb-4 text-xs uppercase tracking-widest">📌 Key Formulas</h2>
          <div className="space-y-2.5">
            {topic.formulas.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-xs text-gray-500 sm:w-52 shrink-0">{f.name}</span>
                <code className="text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 font-mono flex-1">
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
                key={problem.id}
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
