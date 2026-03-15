import { useState } from 'react';

const palette = {
  rose:   { btn: 'bg-rose-500 hover:bg-rose-600',     answer: 'bg-rose-50 border-rose-200',     badge: 'bg-rose-100 text-rose-700' },
  amber:  { btn: 'bg-amber-500 hover:bg-amber-600',   answer: 'bg-amber-50 border-amber-200',   badge: 'bg-amber-100 text-amber-700' },
  green:  { btn: 'bg-green-500 hover:bg-green-600',   answer: 'bg-green-50 border-green-200',   badge: 'bg-green-100 text-green-700' },
  purple: { btn: 'bg-purple-500 hover:bg-purple-600', answer: 'bg-purple-50 border-purple-200', badge: 'bg-purple-100 text-purple-700' },
  sky:    { btn: 'bg-sky-500 hover:bg-sky-600',       answer: 'bg-sky-50 border-sky-200',       badge: 'bg-sky-100 text-sky-700' },
  orange: { btn: 'bg-orange-500 hover:bg-orange-600', answer: 'bg-orange-50 border-orange-200', badge: 'bg-orange-100 text-orange-700' },
  teal:   { btn: 'bg-teal-500 hover:bg-teal-600',     answer: 'bg-teal-50 border-teal-200',     badge: 'bg-teal-100 text-teal-700' },
};

export default function ProblemCard({ problem, index, color, isDone, onReveal, onToggle }) {
  const [revealed, setRevealed] = useState(false);
  const [reaction, setReaction] = useState(null); // 'got-it' | 'still-learning'
  const c = palette[color] || palette.teal;

  const handleReveal = () => {
    setRevealed(true);
    onReveal();
  };

  const handleReaction = (r) => {
    setReaction(r);
    if (r === 'got-it') onReveal(); // ensure marked done
  };

  return (
    <div
      className={`bg-white rounded-2xl border-2 p-5 shadow-sm transition-all duration-300 ${
        isDone ? 'border-green-200' : 'border-gray-100'
      }`}
    >
      {/* Question row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg mt-0.5 shrink-0 ${c.badge}`}>
            Q{index + 1}
          </span>
          <p className="text-gray-800 font-medium text-base leading-relaxed">{problem.question}</p>
        </div>
        {/* manual done toggle */}
        <button
          onClick={onToggle}
          title={isDone ? 'Mark as not done' : 'Mark as done'}
          className="text-xl mt-0.5 transition-transform hover:scale-125 shrink-0"
        >
          {isDone ? '✅' : '⬜'}
        </button>
      </div>

      {/* Reveal button */}
      {!revealed && (
        <button
          onClick={handleReveal}
          className={`mt-4 px-5 py-2 text-sm text-white rounded-full font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:scale-105 ${c.btn}`}
        >
          Reveal Answer ✨
        </button>
      )}

      {/* Answer + steps */}
      {revealed && (
        <div className={`mt-4 rounded-xl border p-4 ${c.answer}`} style={{ animation: 'fadeSlideIn 0.3s ease' }}>
          <p className="text-sm font-bold text-gray-700 mb-3">
            Answer: <span className="text-lg">{problem.answer}</span>
          </p>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Step-by-step</p>
          <ol className="space-y-1.5">
            {problem.steps.map((step, i) => (
              <li key={i} className="text-sm text-gray-700 flex gap-2">
                <span className="font-bold text-gray-400 shrink-0">{i + 1}.</span>
                <span className="font-mono">{step}</span>
              </li>
            ))}
          </ol>

          {/* Got it / Still learning */}
          {!reaction ? (
            <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-2">
              <span className="text-xs text-gray-400 mr-1">How did you do?</span>
              <button
                onClick={() => handleReaction('got-it')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold rounded-full transition-colors"
              >
                👍 Got it!
              </button>
              <button
                onClick={() => handleReaction('still-learning')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs font-semibold rounded-full transition-colors"
              >
                🤔 Still learning
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-black/5">
              {reaction === 'got-it' ? (
                <p className="text-xs text-green-600 font-semibold">👍 Awesome! Marked as done.</p>
              ) : (
                <p className="text-xs text-amber-600 font-semibold">🤔 No worries — review the steps and try again later!</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
