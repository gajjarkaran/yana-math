import { useState } from 'react';

const checkColor = {
  rose: 'text-rose-500',
  amber: 'text-amber-500',
  green: 'text-green-500',
  purple: 'text-purple-500',
  sky: 'text-sky-500',
  orange: 'text-orange-500',
  teal: 'text-teal-500',
};

const revealBtnColor = {
  rose: 'bg-rose-500 hover:bg-rose-600',
  amber: 'bg-amber-500 hover:bg-amber-600',
  green: 'bg-green-500 hover:bg-green-600',
  purple: 'bg-purple-500 hover:bg-purple-600',
  sky: 'bg-sky-500 hover:bg-sky-600',
  orange: 'bg-orange-500 hover:bg-orange-600',
  teal: 'bg-teal-500 hover:bg-teal-600',
};

const answerBg = {
  rose: 'bg-rose-50 border-rose-200',
  amber: 'bg-amber-50 border-amber-200',
  green: 'bg-green-50 border-green-200',
  purple: 'bg-purple-50 border-purple-200',
  sky: 'bg-sky-50 border-sky-200',
  orange: 'bg-orange-50 border-orange-200',
  teal: 'bg-teal-50 border-teal-200',
};

export default function ProblemCard({ problem, index, color, isDone, onReveal, onToggle }) {
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setRevealed(true);
    onReveal();
  };

  return (
    <div className={`bg-white rounded-2xl border p-5 shadow-sm transition-all ${isDone ? 'opacity-80' : ''}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-sm font-bold text-gray-400 mt-0.5 min-w-[1.5rem]">Q{index + 1}.</span>
          <p className="text-gray-800 font-medium text-base leading-relaxed">{problem.question}</p>
        </div>
        <button
          onClick={onToggle}
          title={isDone ? 'Mark as not done' : 'Mark as done'}
          className={`text-xl mt-0.5 transition-transform hover:scale-110 ${isDone ? checkColor[color] || 'text-green-500' : 'text-gray-300'}`}
        >
          {isDone ? '✅' : '⬜'}
        </button>
      </div>

      {!revealed ? (
        <button
          onClick={handleReveal}
          className={`mt-4 px-4 py-1.5 text-sm text-white rounded-full font-medium transition-colors ${revealBtnColor[color] || 'bg-indigo-500 hover:bg-indigo-600'}`}
        >
          Reveal Answer
        </button>
      ) : (
        <div className={`mt-4 rounded-xl border p-4 ${answerBg[color] || 'bg-gray-50 border-gray-200'}`}>
          <p className="text-sm font-bold text-gray-700 mb-2">Answer: <span className="font-extrabold">{problem.answer}</span></p>
          <div className="mt-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Step-by-step</p>
            <ol className="space-y-1">
              {problem.steps.map((step, i) => (
                <li key={i} className="text-sm text-gray-700 flex gap-2">
                  <span className="text-gray-400 font-medium min-w-[1.2rem]">{i + 1}.</span>
                  <span className="font-mono">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}
