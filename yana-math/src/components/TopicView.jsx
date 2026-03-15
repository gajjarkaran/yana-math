import { useState, useEffect, useRef } from 'react';
import ProblemCard from './ProblemCard';
import ProgressBar from './ProgressBar';
import MilestoneModal from './MilestoneModal';

const headerBg = {
  rose: 'bg-rose-500',
  amber: 'bg-amber-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  sky: 'bg-sky-500',
  orange: 'bg-orange-500',
  teal: 'bg-teal-500',
};

export default function TopicView({ topic, isDone, markDone, toggleDone, topicProgress, onBack }) {
  const [showMilestone, setShowMilestone] = useState(false);
  const { completed, total } = topicProgress(topic.problems);
  const prevCompleted = useRef(completed);

  useEffect(() => {
    if (prevCompleted.current !== total && completed === total && total > 0) {
      setShowMilestone(true);
    }
    prevCompleted.current = completed;
  }, [completed, total]);

  const handleReveal = (problemId) => {
    markDone(problemId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showMilestone && (
        <MilestoneModal topic={topic.title} onClose={() => setShowMilestone(false)} />
      )}

      {/* Header */}
      <div className={`${headerBg[topic.color] || 'bg-indigo-500'} text-white px-6 py-6`}>
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors"
        >
          ← Back to Topics
        </button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl">{topic.emoji}</span>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
        </div>
        <ProgressBar completed={completed} total={total} color="indigo" />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Description */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <p className="text-gray-600 leading-relaxed">{topic.description}</p>
        </div>

        {/* Formulas */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border">
          <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Key Formulas</h2>
          <div className="space-y-2">
            {topic.formulas.map((f, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <span className="text-xs text-gray-500 sm:w-48 shrink-0">{f.name}</span>
                <code className="text-sm bg-gray-50 border rounded-lg px-3 py-1.5 text-gray-800 font-mono flex-1">{f.formula}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Problems */}
        <div>
          <h2 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Practice Problems</h2>
          <div className="space-y-4">
            {topic.problems.map((problem, i) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                index={i}
                color={topic.color}
                isDone={isDone(problem.id)}
                onReveal={() => handleReveal(problem.id)}
                onToggle={() => toggleDone(problem.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
