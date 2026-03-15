import { useState } from 'react';

const palette = {
  rose:   { btn: 'bg-rose-500 hover:bg-rose-600',     answer: 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800',     badge: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300' },
  amber:  { btn: 'bg-amber-500 hover:bg-amber-600',   answer: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300' },
  green:  { btn: 'bg-green-500 hover:bg-green-600',   answer: 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800', badge: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' },
  purple: { btn: 'bg-purple-500 hover:bg-purple-600', answer: 'bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' },
  sky:    { btn: 'bg-sky-500 hover:bg-sky-600',       answer: 'bg-sky-50 dark:bg-sky-950 border-sky-200 dark:border-sky-800',         badge: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300' },
  orange: { btn: 'bg-orange-500 hover:bg-orange-600', answer: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300' },
  teal:   { btn: 'bg-teal-500 hover:bg-teal-600',     answer: 'bg-teal-50 dark:bg-teal-950 border-teal-200 dark:border-teal-800',     badge: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300' },
};

export default function ProblemCard({ problem, index, color, isDone, onReveal, onToggle }) {
  const [revealed, setRevealed] = useState(false);
  const [reaction, setReaction] = useState(null);
  const c = palette[color] || palette.teal;

  const handleReveal = () => {
    setRevealed(true);
    onReveal();
  };

  const handleReaction = (r) => {
    setReaction(r);
    if (r === 'got-it') onReveal();
  };

  return (
    <div className={`bg-white dark:bg-slate-700 rounded-2xl border-2 p-4 sm:p-5 shadow-sm transition-all duration-300 ${isDone ? 'border-green-200 dark:border-green-700' : 'border-gray-100 dark:border-slate-600'}`}>

      {/* Question row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className={`text-xs font-bold px-2 py-1 rounded-lg mt-0.5 shrink-0 ${c.badge}`}>
            Q{index + 1}
          </span>
          <p className="text-gray-800 dark:text-gray-100 font-medium text-sm sm:text-base leading-relaxed break-words">{problem.question}</p>
        </div>
        <button
          onClick={onToggle}
          title={isDone ? 'Mark as not done' : 'Mark as done'}
          className="text-xl p-2 -mr-1 transition-transform active:scale-110 shrink-0 touch-manipulation rounded-xl hover:bg-gray-100 dark:hover:bg-slate-600"
        >
          {isDone ? '✅' : '⬜'}
        </button>
      </div>

      {/* Reveal button */}
      {!revealed && (
        <button
          onClick={handleReveal}
          className={`mt-4 w-full sm:w-auto px-5 py-2.5 text-sm text-white rounded-full font-semibold transition-all duration-200 shadow-sm active:scale-95 touch-manipulation ${c.btn}`}
        >
          Reveal Answer ✨
        </button>
      )}

      {/* Answer + steps */}
      {revealed && (
        <div className={`mt-4 rounded-xl border p-3 sm:p-4 ${c.answer}`} style={{ animation: 'fadeSlideIn 0.3s ease' }}>
          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
            Answer: <span className="text-base sm:text-lg text-gray-900 dark:text-white">{problem.answer}</span>
          </p>
          <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">How to solve it</p>
          <ol className="space-y-1.5">
            {problem.steps.map((step, i) => (
              <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex gap-2">
                <span className="font-bold text-gray-600 dark:text-gray-400 shrink-0">{i + 1}.</span>
                <span className="font-mono text-xs sm:text-sm break-words min-w-0">{step}</span>
              </li>
            ))}
          </ol>

          {/* Got it / Still learning */}
          {!reaction ? (
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">How did you do?</p>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleReaction('got-it')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-green-100 dark:bg-green-900 active:bg-green-200 text-green-700 dark:text-green-300 text-xs font-semibold rounded-full transition-colors touch-manipulation"
                >
                  👍 Got it!
                </button>
                <button
                  onClick={() => handleReaction('still-learning')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-100 dark:bg-amber-900 active:bg-amber-200 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full transition-colors touch-manipulation"
                >
                  🤔 Still learning
                </button>
              </div>
            </div>
          ) : (
            <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10">
              {reaction === 'got-it' ? (
                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">👍 Awesome! Marked as done.</p>
              ) : (
                <p className="text-xs text-amber-600 dark:text-amber-400 font-semibold">🤔 No worries! Review the steps and try again later.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
