import { useState } from 'react';
import { isAnswerCorrect } from '../utils/answerCheck';
import { getAnswerFormatHint } from '../utils/answerFormatHint';
import StarMeter from './StarMeter';

export default function BossBattlePanel({ topic, problems, bossState, onWin }) {
  const [battleState, setBattleState] = useState({
    active: false,
    round: 0,
    hearts: 3,
    answer: '',
    feedback: null,
    result: null,
  });

  const currentProblem = problems[battleState.round];
  const answerFormatHint = currentProblem ? getAnswerFormatHint(currentProblem.answer) : '';

  const startBattle = () => {
    setBattleState({
      active: true,
      round: 0,
      hearts: 3,
      answer: '',
      feedback: null,
      result: null,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const guess = battleState.answer.trim();
    if (!guess) {
      setBattleState((current) => ({ ...current, feedback: 'Type an answer first.' }));
      return;
    }

    if (isAnswerCorrect(guess, currentProblem.answer)) {
      if (battleState.round === problems.length - 1) {
        const mistakes = 3 - battleState.hearts;
        const reward = onWin({ mistakes });
        setBattleState({
          active: false,
          round: 0,
          hearts: 3,
          answer: '',
          feedback: null,
          result: reward,
        });
        return;
      }

      setBattleState((current) => ({
        ...current,
        round: current.round + 1,
        answer: '',
        feedback: 'Correct! Next round.',
      }));
      return;
    }

    const remainingHearts = battleState.hearts - 1;
    if (remainingHearts <= 0) {
      setBattleState({
        active: false,
        round: 0,
        hearts: 3,
        answer: '',
        feedback: null,
        result: { failed: true },
      });
      return;
    }

    setBattleState((current) => ({
      ...current,
      hearts: remainingHearts,
      answer: '',
      feedback: 'Oops. One heart lost. Try again.',
    }));
  };

  const displayState = battleState.result?.failed
    ? { title: 'Boss battle failed', body: 'You ran out of hearts. Recharge and try again.', cta: 'Retry Boss Battle' }
    : bossState.completed
      ? { title: 'Boss defeated', body: 'This topic is officially mastered. Replay anytime to improve your star rank.', cta: 'Replay Boss Battle' }
      : { title: 'Boss battle locked in', body: 'Finish every challenge card in this topic to unlock the final boss.', cta: 'Boss Locked' };

  return (
    <div className="rounded-[1.8rem] border border-white/80 dark:border-slate-800 bg-gradient-to-br from-slate-900 via-violet-900 to-sky-900 dark:from-[#111827] dark:via-[#1b1636] dark:to-[#10243d] p-5 sm:p-6 shadow-[0_24px_60px_rgba(15,23,42,0.28)] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_30%)] pointer-events-none" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/12 border border-white/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.18em] text-white/85">
              <span>👑</span>
              <span>Boss Battle</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight mt-3">{topic.title} Guardian</h2>
            <p className="text-sm text-white/75 mt-1">Three rounds. No hints. Keep at least one heart to win the badge.</p>
          </div>
          <div className="rounded-2xl bg-black/20 border border-white/10 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 font-black">Best Boss Stars</p>
            <div className="mt-2">
              <StarMeter count={bossState.stars} size="lg" dimmed={true} />
            </div>
          </div>
        </div>

        {!battleState.active ? (
          <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <div>
                <p className="text-lg font-black">{displayState.title}</p>
                <p className="text-sm text-white/75 mt-2 max-w-xl">{displayState.body}</p>
                {battleState.result && !battleState.result.failed && (
                  <div className="mt-4 flex items-center gap-3 flex-wrap">
                    <StarMeter count={battleState.result.bestStars} size="lg" dimmed={true} />
                    <span className="rounded-full bg-amber-300 text-slate-950 px-3 py-1 text-xs font-black uppercase tracking-wide">
                      +{battleState.result.xpDelta} XP
                    </span>
                  </div>
                )}
              </div>
              <button
                onClick={bossState.unlocked ? startBattle : undefined}
                disabled={!bossState.unlocked}
                className="w-full sm:w-auto rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 text-slate-950 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {bossState.unlocked ? displayState.cta : 'Finish Topic First'}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-[1.5rem] bg-white/10 border border-white/10 p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between gap-3 flex-wrap mb-4">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-white/70">Round {battleState.round + 1} of {problems.length}</p>
              <p className="text-xl">{Array.from({ length: battleState.hearts }, (_, index) => <span key={index}>❤️</span>)}</p>
            </div>
            <div className="rounded-2xl bg-slate-950/30 border border-white/10 px-4 py-4">
              <p className="text-lg font-bold leading-relaxed">{currentProblem.question}</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <input
                type="text"
                value={battleState.answer}
                onChange={(event) => setBattleState((current) => ({ ...current, answer: event.target.value }))}
                placeholder="Type your boss answer"
                autoComplete="off"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <div className="rounded-2xl border border-white/10 bg-slate-950/25 px-4 py-3">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-white/60">Boss Tip</p>
                <p className="mt-2 text-sm text-white/80">
                  No hints in boss battles, so make sure your final answer uses the expected format.
                </p>
                <p className="mt-1 text-xs text-white/65">
                  {answerFormatHint}
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide bg-gradient-to-r from-amber-300 via-yellow-300 to-orange-300 text-slate-950 shadow-lg"
                >
                  Attack
                </button>
                <button
                  type="button"
                  onClick={() => setBattleState((current) => ({ ...current, active: false, answer: '', feedback: null }))}
                  className="w-full sm:w-auto rounded-full px-5 py-3 text-sm font-black uppercase tracking-wide border border-white/15 bg-white/10 text-white"
                >
                  Retreat
                </button>
              </div>
              {battleState.feedback && (
                <p className="text-sm font-bold text-amber-100">{battleState.feedback}</p>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
