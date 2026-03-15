import { useState } from 'react';
import { topics } from './data/topics';
import { useProgress } from './hooks/useProgress';
import { useDarkMode } from './hooks/useDarkMode';
import TopicCard from './components/TopicCard';
import TopicView from './components/TopicView';

function DarkToggle({ dark, toggle }) {
  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="text-lg w-9 h-9 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors touch-manipulation"
    >
      {dark ? '☀️' : '🌙'}
    </button>
  );
}

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const { markDone, toggleDone, isDone, topicProgress, getShuffledProblems, resetAll, streak, resetKey } = useProgress();
  const { dark, toggle: toggleDark } = useDarkMode();

  const totalProblems = topics.reduce((sum, t) => sum + t.problems.length, 0);
  const totalDone = topics.reduce((sum, t) => sum + topicProgress(t.problems).completed, 0);
  const overallPct = Math.round((totalDone / totalProblems) * 100);
  const completedTopics = topics.filter(t => {
    const { completed, total } = topicProgress(t.problems);
    return completed === total && total > 0;
  }).length;

  if (activeTopic) {
    return (
      <TopicView
        topic={activeTopic}
        isDone={isDone}
        markDone={markDone}
        toggleDone={toggleDone}
        topicProgress={topicProgress}
        getShuffledProblems={getShuffledProblems}
        onBack={() => { setActiveTopic(null); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        resetKey={resetKey}
        dark={dark}
        toggleDark={toggleDark}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 text-white px-4 sm:px-6 pt-12 pb-8 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-56 h-56 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

        {/* Dark mode toggle — top right */}
        <div className="absolute top-4 right-4">
          <DarkToggle dark={dark} toggle={toggleDark} />
        </div>

        <div className="relative">
          <span className="inline-block bg-white/20 text-white/90 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
            Personal Math Guide
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 drop-shadow">Hi, Yana! 👋</h1>
          <p className="text-indigo-100 text-sm sm:text-base mb-8 max-w-xs mx-auto">Your personal math space. Learn, practice, and level up. 🧠</p>

          {/* Stats row */}
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[85px]">
              <p className="text-2xl font-extrabold leading-none">{totalDone}</p>
              <p className="text-xs text-white/70 mt-1">Problems Done</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[85px]">
              <p className="text-2xl font-extrabold leading-none">{streak}</p>
              <p className="text-xs text-white/70 mt-1">🔥 Streak</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-5 py-3 text-center min-w-[85px]">
              <p className="text-2xl font-extrabold leading-none">{completedTopics}<span className="text-base text-white/60">/{topics.length}</span></p>
              <p className="text-xs text-white/70 mt-1">Topics Done</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="max-w-xs mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-semibold">Overall Progress</span>
              <span className="font-extrabold">{overallPct}%</span>
            </div>
            <div className="w-full h-3 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-2">{totalDone} of {totalProblems} problems done</p>
          </div>
        </div>
      </div>

      {/* Topics section */}
      <div className="max-w-2xl mx-auto px-4 pt-7 pb-16 sm:pb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-gray-900 dark:text-gray-100 text-base tracking-tight">Choose a Topic</h2>
          <button
            onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetAll(); }}
            className="text-xs font-semibold text-red-400 hover:text-red-500 border border-red-200 dark:border-red-800 hover:border-red-400 px-3 py-1.5 rounded-full transition-colors touch-manipulation"
          >
            Reset progress
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topics.map((topic) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              progress={topicProgress(topic.problems)}
              onClick={() => setActiveTopic(topic)}
            />
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-10">
          Yana's Math Space · Grade 6 · Keep going, you've got this 💫
        </p>
      </div>
    </div>
  );
}
