import { useState } from 'react';
import { isAnswerCorrect } from '../utils/answerCheck';

const palette = {
  rose:   { btn: 'bg-rose-500 hover:bg-rose-600 shadow-rose-300/50',     answer: 'bg-rose-50/95 dark:bg-rose-950 border-rose-200 dark:border-rose-800',     badge: 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300', shell: 'from-rose-100/80 via-white to-pink-50/90 dark:from-rose-950/40 dark:via-slate-900 dark:to-pink-950/30', accent: 'text-rose-500 dark:text-rose-300', ring: 'border-rose-200/90 dark:border-rose-800/80' },
  amber:  { btn: 'bg-amber-500 hover:bg-amber-600 shadow-amber-300/50',   answer: 'bg-amber-50/95 dark:bg-amber-950 border-amber-200 dark:border-amber-800', badge: 'bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300', shell: 'from-amber-100/80 via-white to-orange-50/90 dark:from-amber-950/40 dark:via-slate-900 dark:to-orange-950/30', accent: 'text-amber-500 dark:text-amber-300', ring: 'border-amber-200/90 dark:border-amber-800/80' },
  green:  { btn: 'bg-green-500 hover:bg-green-600 shadow-green-300/50',   answer: 'bg-green-50/95 dark:bg-green-950 border-green-200 dark:border-green-800', badge: 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300', shell: 'from-green-100/80 via-white to-emerald-50/90 dark:from-green-950/40 dark:via-slate-900 dark:to-emerald-950/30', accent: 'text-green-500 dark:text-green-300', ring: 'border-green-200/90 dark:border-green-800/80' },
  purple: { btn: 'bg-purple-500 hover:bg-purple-600 shadow-purple-300/50', answer: 'bg-purple-50/95 dark:bg-purple-950 border-purple-200 dark:border-purple-800', badge: 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300', shell: 'from-purple-100/80 via-white to-violet-50/90 dark:from-purple-950/40 dark:via-slate-900 dark:to-violet-950/30', accent: 'text-purple-500 dark:text-purple-300', ring: 'border-purple-200/90 dark:border-purple-800/80' },
  sky:    { btn: 'bg-sky-500 hover:bg-sky-600 shadow-sky-300/50',       answer: 'bg-sky-50/95 dark:bg-sky-950 border-sky-200 dark:border-sky-800',         badge: 'bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300', shell: 'from-sky-100/80 via-white to-blue-50/90 dark:from-sky-950/40 dark:via-slate-900 dark:to-blue-950/30', accent: 'text-sky-500 dark:text-sky-300', ring: 'border-sky-200/90 dark:border-sky-800/80' },
  orange: { btn: 'bg-orange-500 hover:bg-orange-600 shadow-orange-300/50', answer: 'bg-orange-50/95 dark:bg-orange-950 border-orange-200 dark:border-orange-800', badge: 'bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300', shell: 'from-orange-100/80 via-white to-amber-50/90 dark:from-orange-950/40 dark:via-slate-900 dark:to-amber-950/30', accent: 'text-orange-500 dark:text-orange-300', ring: 'border-orange-200/90 dark:border-orange-800/80' },
  teal:   { btn: 'bg-teal-500 hover:bg-teal-600 shadow-teal-300/50',     answer: 'bg-teal-50/95 dark:bg-teal-950 border-teal-200 dark:border-teal-800',     badge: 'bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300', shell: 'from-teal-100/80 via-white to-cyan-50/90 dark:from-teal-950/40 dark:via-slate-900 dark:to-cyan-950/30', accent: 'text-teal-500 dark:text-teal-300', ring: 'border-teal-200/90 dark:border-teal-800/80' },
};

function getAnswerFormatHint(problem) {
  const answer = problem.answer;

  if (answer.includes(',') && !answer.includes('Area =')) {
    return 'Keep the items in order and separate them with commas.';
  }

  if (answer.includes(';') || /area\s*=|perimeter\s*=|d\s*=|x\s*[<>]=?/.test(answer.toLowerCase())) {
    return 'Include every part of the final answer, not just one piece of it.';
  }

  if (/[$]|cm|ft|m²|cm²|ft²|cm³|m³|units|liters|miles|inches|cups|girls|lawns|servings|questions|hamburger|ticket|marbles|feet|°c/i.test(answer)) {
    return 'Include units if the question asks for them.';
  }

  if (answer.includes(':')) {
    return 'Use ratio form with a colon and simplify if needed.';
  }

  if (answer.includes('/')) {
    return 'Fractions can be typed with a slash, like 3/4.';
  }

  return 'Use the final answer format the question is asking for.';
}

export default function ProblemCard({ problem, index, color, isDone, onMarkGotIt, onMarkUndone }) {
  const [answerInput, setAnswerInput] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintCount, setHintCount] = useState(0);
  const c = palette[color] || palette.teal;
  const hints = problem.steps.slice(0, -1);
  const visibleHints = hints.slice(0, hintCount);
  const solutionUnlocked = isDone || feedback === 'correct';
  const hasMoreHints = hintCount < hints.length;
  const answerFormatHint = getAnswerFormatHint(problem);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedAnswer = answerInput.trim();
    if (!trimmedAnswer) {
      setFeedback('empty');
      return;
    }

    if (isAnswerCorrect(trimmedAnswer, problem.answer)) {
      setFeedback('correct');
      onMarkGotIt();
      return;
    }

    setFeedback('incorrect');
  };

  const handleRevealHint = () => {
    if (!hints.length) return;
    setHintCount((count) => Math.min(count + 1, hints.length));
    setFeedback((current) => (current === 'correct' ? current : 'hint'));
  };

  const handleMarkUndone = () => {
    setAnswerInput('');
    setFeedback(null);
    setHintCount(0);
    onMarkUndone();
  };

  return (
    <div className={`rounded-[1.8rem] border-2 p-4 sm:p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_46px_rgba(2,6,23,0.42)] transition-all duration-300 bg-gradient-to-br ${c.shell} ${isDone ? 'border-green-300 dark:border-green-700' : c.ring}`}>

      {/* Question row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 flex-1 min-w-0">
          <span className={`text-xs font-black px-3 py-1.5 rounded-xl mt-0.5 shrink-0 shadow-sm ${c.badge}`}>
            Q{index + 1}
          </span>
          <div>
            <p className={`text-[11px] uppercase tracking-[0.18em] font-black mb-1 ${c.accent}`}>Challenge</p>
            <p className="text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base leading-relaxed break-words">{problem.question}</p>
          </div>
        </div>
        {isDone ? (
          <button
            onClick={handleMarkUndone}
            title="Mark as not done"
            className="text-xl p-2 -mr-1 transition-transform active:scale-110 shrink-0 touch-manipulation rounded-2xl bg-white/70 dark:bg-slate-950/72 border border-white/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900"
          >
            ✅
          </button>
        ) : (
          <span
            title="Solve it correctly to mark it done"
            className="text-lg p-2 -mr-1 shrink-0 rounded-2xl bg-white/60 dark:bg-slate-950/72 border border-white/80 dark:border-slate-800 text-slate-400 dark:text-slate-500"
          >
            🔒
          </span>
        )}
      </div>

      {!solutionUnlocked && (
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="rounded-[1.5rem] border border-white/90 dark:border-slate-800 bg-white/70 dark:bg-slate-950/76 p-4 shadow-sm">
            <label htmlFor={`answer-${problem.id}`} className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em] mb-2">
              Your Answer
            </label>
            <input
              id={`answer-${problem.id}`}
              type="text"
              value={answerInput}
              onChange={(event) => setAnswerInput(event.target.value)}
              placeholder="Type your final answer"
              autoComplete="off"
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0b1220] px-4 py-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-sky-400 shadow-inner"
            />
            <div className="mt-3 space-y-1">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Solve it correctly to unlock the full answer and mark this problem done.
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {answerFormatHint}
              </p>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              type="submit"
              className={`w-full sm:w-auto px-5 py-3 text-sm text-white rounded-full font-black uppercase tracking-wide transition-all duration-200 shadow-lg active:scale-95 touch-manipulation ${c.btn}`}
            >
              Check Answer
            </button>
            <button
              type="button"
              onClick={handleRevealHint}
              disabled={!hasMoreHints}
              className="w-full sm:w-auto px-5 py-3 text-sm rounded-full font-black uppercase tracking-wide border border-slate-200 dark:border-slate-700 bg-white/70 dark:bg-slate-950/72 text-slate-700 dark:text-slate-100 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {hintCount === 0 ? 'Reveal Hint' : hasMoreHints ? 'Another Hint' : 'All Hints Shown'}
            </button>
          </div>

          {feedback === 'empty' && (
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Type an answer first.</p>
          )}
          {feedback === 'incorrect' && (
            <p className="text-xs font-bold text-amber-600 dark:text-amber-400">Not quite. Try again, and make sure your answer uses the expected format. Use a hint if you need one.</p>
          )}
          {hintCount > 0 && (
            <div className={`rounded-[1.5rem] border p-4 sm:p-5 shadow-sm ${c.answer}`} style={{ animation: 'fadeSlideIn 0.3s ease' }}>
              <div className="flex items-center justify-between gap-2 mb-3">
                <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em]">Hints</p>
                <span className={`text-xs font-black uppercase tracking-wide ${c.accent}`}>{hintCount}/{hints.length || 1} shown</span>
              </div>
              {visibleHints.length > 0 ? (
                <ol className="space-y-1.5">
                  {visibleHints.map((hint, i) => (
                    <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex gap-2">
                      <span className={`font-black shrink-0 ${c.accent}`}>{i + 1}.</span>
                      <span className="font-mono text-xs sm:text-sm break-words min-w-0">{hint}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-sm text-slate-700 dark:text-slate-300">Start by picking the right formula or operation, then work through it step by step.</p>
              )}
            </div>
          )}
        </form>
      )}

      {solutionUnlocked && (
        <div className={`mt-5 rounded-[1.6rem] border p-4 sm:p-5 shadow-sm ${c.answer}`} style={{ animation: 'fadeSlideIn 0.3s ease' }}>
          <div className="flex items-center justify-between gap-3 mb-3">
            <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-[0.18em]">Solved</p>
            <span className="rounded-full bg-green-500 text-white px-3 py-1 text-[11px] font-black uppercase tracking-wide shadow-sm">Unlocked</span>
          </div>
          <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
            Answer: <span className="text-base sm:text-lg text-slate-900 dark:text-white">{problem.answer}</span>
          </p>
          <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.18em] mb-2">How to solve it</p>
          <ol className="space-y-1.5">
            {problem.steps.map((step, i) => (
              <li key={i} className="text-sm text-slate-700 dark:text-slate-300 flex gap-2">
                <span className={`font-black shrink-0 ${c.accent}`}>{i + 1}.</span>
                <span className="font-mono text-xs sm:text-sm break-words min-w-0">{step}</span>
              </li>
            ))}
          </ol>
          <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2 flex-wrap">
            <p className="text-xs text-green-600 dark:text-green-400 font-bold">Nice work. This one is marked as done.</p>
            <span className="text-xs font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">Math power-up earned ✨</span>
          </div>
        </div>
      )}
    </div>
  );
}
