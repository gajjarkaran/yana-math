import { useState } from 'react';
import { topics } from './data/topics';
import { useProgress } from './hooks/useProgress';
import { useDarkMode } from './hooks/useDarkMode';
import TopicCard from './components/TopicCard';
import TopicView from './components/TopicView';
import DailyQuestPanel from './components/DailyQuestPanel';
import BadgeShelf from './components/BadgeShelf';
import ResetConfirmModal from './components/ResetConfirmModal';

function DarkToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-lg w-11 h-11 flex items-center justify-center rounded-full border border-white/25 bg-white/15 dark:bg-slate-950/30 shadow-lg shadow-slate-900/10 backdrop-blur-md hover:bg-white/25 dark:hover:bg-slate-950/45 transition-colors touch-manipulation"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const {
    markDone,
    toggleDone,
    isDone,
    topicProgress,
    getShuffledProblems,
    resetAll,
    streak,
    resetKey,
    xp,
    levelInfo,
    totalStars,
    totalPossibleStars,
    badges,
    dailyQuests,
    bossWins,
    completeBossBattle,
    getProblemStarsFor,
    getTopicGameSummary,
  } = useProgress();
  const { dark, toggle: toggleDark } = useDarkMode();

  const totalProblems = topics.reduce((sum, t) => sum + t.problems.length, 0);
  const totalDone = topics.reduce((sum, t) => sum + topicProgress(t.problems).completed, 0);
  const overallPct = Math.round((totalDone / totalProblems) * 100);

  if (activeTopic) {
    return (
      <TopicView
        topic={activeTopic}
        isDone={isDone}
        markDone={markDone}
        toggleDone={toggleDone}
        topicProgress={topicProgress}
        getShuffledProblems={getShuffledProblems}
        getProblemStarsFor={getProblemStarsFor}
        getTopicGameSummary={getTopicGameSummary}
        completeBossBattle={completeBossBattle}
        onBack={() => { setActiveTopic(null); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        resetKey={resetKey}
        dark={dark}
        toggleDark={toggleDark}
      />
    );
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-100 transition-colors duration-300 relative overflow-hidden">
      {showResetConfirm && (
        <ResetConfirmModal
          onCancel={() => setShowResetConfirm(false)}
          onConfirm={() => {
            resetAll();
            setShowResetConfirm(false);
          }}
        />
      )}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-[-4rem] h-40 w-40 rounded-full bg-yellow-200/40 blur-3xl dark:bg-yellow-400/10" />
        <div className="absolute top-24 right-[-3rem] h-44 w-44 rounded-full bg-sky-200/40 blur-3xl dark:bg-sky-400/10" />
        <div className="absolute bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-pink-200/30 blur-3xl dark:bg-pink-400/10" />
      </div>

      {/* Hero */}
      <div className="px-4 sm:px-6 pt-6 sm:pt-8 relative">
        <div className="max-w-5xl mx-auto rounded-[1.75rem] sm:rounded-[2rem] border border-white/40 dark:border-white/10 bg-gradient-to-br from-fuchsia-500 via-violet-500 to-sky-500 dark:from-[#13233d] dark:via-[#261a46] dark:to-[#102a4c] text-white px-5 sm:px-8 pt-12 pb-8 text-center relative overflow-hidden shadow-[0_28px_80px_rgba(79,70,229,0.25)] dark:shadow-[0_28px_80px_rgba(15,23,42,0.45)]">
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />
          <div className="absolute top-16 left-8 text-yellow-200/80 text-3xl sm:text-4xl pointer-events-none" style={{ animation: 'sparklePulse 2.4s ease-in-out infinite' }}>✦</div>
          <div className="absolute top-24 right-10 text-pink-100/70 text-2xl sm:text-3xl pointer-events-none" style={{ animation: 'floatBob 3s ease-in-out infinite' }}>✸</div>
          <div className="absolute bottom-10 left-12 text-sky-100/70 text-2xl sm:text-3xl pointer-events-none" style={{ animation: 'floatBob 2.7s ease-in-out infinite' }}>✷</div>

          {/* Dark mode toggle — top right */}
          <div className="absolute top-4 right-4">
            <DarkToggle dark={dark} toggle={toggleDark} />
          </div>

          <div className="relative">
            <span className="inline-flex items-center gap-2 bg-white/18 text-white/95 text-xs font-black px-4 py-2 rounded-full mb-4 uppercase tracking-[0.22em] shadow-lg shadow-violet-900/15 border border-white/15">
              <span>Math Quest</span>
              <span className="text-sm">✨</span>
            </span>
            <h1 className="text-4xl sm:text-5xl font-black mb-3 drop-shadow-lg tracking-tight">Hi, Yana! Ready to level up?</h1>
            <p className="text-fuchsia-50/90 text-sm sm:text-base mb-8 max-w-md mx-auto leading-relaxed">Pick a topic, solve the challenge yourself, and unlock the steps like a math detective.</p>

            {/* Stats row */}
            <div className="flex justify-center gap-3 mb-8 flex-wrap">
              <div className="bg-white/18 dark:bg-slate-950/28 backdrop-blur-md rounded-[1.6rem] px-5 py-4 text-center min-w-[96px] border border-white/15 dark:border-white/10 shadow-lg shadow-violet-900/15 dark:shadow-slate-950/30">
                <p className="text-3xl font-black leading-none">{levelInfo.level}</p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wide">Level</p>
              </div>
              <div className="bg-white/18 dark:bg-slate-950/28 backdrop-blur-md rounded-[1.6rem] px-5 py-4 text-center min-w-[96px] border border-white/15 dark:border-white/10 shadow-lg shadow-violet-900/15 dark:shadow-slate-950/30">
                <p className="text-3xl font-black leading-none">{xp}</p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wide">XP</p>
              </div>
              <div className="bg-white/18 dark:bg-slate-950/28 backdrop-blur-md rounded-[1.6rem] px-5 py-4 text-center min-w-[96px] border border-white/15 dark:border-white/10 shadow-lg shadow-violet-900/15 dark:shadow-slate-950/30">
                <p className="text-3xl font-black leading-none">{streak}</p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wide">🔥 Streak</p>
              </div>
              <div className="bg-white/18 dark:bg-slate-950/28 backdrop-blur-md rounded-[1.6rem] px-5 py-4 text-center min-w-[96px] border border-white/15 dark:border-white/10 shadow-lg shadow-violet-900/15 dark:shadow-slate-950/30">
                <p className="text-3xl font-black leading-none">{bossWins}<span className="text-base text-white/70">/{topics.length}</span></p>
                <p className="text-xs text-white/80 mt-1 uppercase tracking-wide">Bosses</p>
              </div>
            </div>

            {/* Overall progress */}
            <div className="max-w-md mx-auto bg-white/16 dark:bg-slate-950/28 backdrop-blur-md rounded-[1.75rem] p-5 border border-white/15 dark:border-white/10 shadow-lg shadow-violet-900/15 dark:shadow-slate-950/30 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/85 font-bold uppercase tracking-wide">Overall Progress</span>
                <span className="font-black text-lg">{overallPct}%</span>
              </div>
              <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden border border-white/15">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out bg-[linear-gradient(90deg,#fde68a_0%,#ffffff_52%,#bfdbfe_100%)]"
                  style={{ width: `${overallPct}%` }}
                />
              </div>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-white/85">
                <p>{totalDone} of {totalProblems} challenge cards solved</p>
                <span className="rounded-full bg-slate-950/15 dark:bg-white/10 px-3 py-1 border border-white/15 dark:border-white/10">{totalStars}/{totalPossibleStars} stars</span>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-black uppercase tracking-wide text-white/80 mb-2">
                  <span>Level {levelInfo.level}</span>
                  <span>{levelInfo.xpIntoLevel}/{levelInfo.nextLevelXp} XP to next</span>
                </div>
                <div className="h-3 rounded-full bg-slate-950/20 border border-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,#fde68a_0%,#f9a8d4_45%,#7dd3fc_100%)] transition-all duration-700"
                    style={{ width: `${levelInfo.progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics section */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-16 sm:pb-12 relative">
        <div className="space-y-5 mb-6">
          <DailyQuestPanel quests={dailyQuests} />
          <BadgeShelf badges={badges} />
        </div>
        <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
          <div>
            <h2 className="font-black text-slate-900 dark:text-slate-50 text-2xl tracking-tight">Choose Your Math World</h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Each topic has its own challenge cards, hints, and progress meter.</p>
          </div>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="text-xs font-bold text-rose-500 hover:text-rose-600 border-2 border-rose-200 dark:border-rose-900/70 bg-white/80 dark:bg-slate-900/60 hover:border-rose-400 px-4 py-2 rounded-full transition-colors touch-manipulation shadow-sm"
          >
            Reset progress
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              progress={topicProgress(topic.problems)}
              gameSummary={getTopicGameSummary(topic)}
              onClick={() => setActiveTopic(topic)}
            />
          ))}
        </div>
        <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-10 font-semibold tracking-wide">
          Yana's Math Space · Grade 6 · One smart step at a time ✨
        </p>
      </div>
    </div>
  );
}
