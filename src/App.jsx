import { useState } from 'react';
import { topics } from './data/topics';
import { useProgress } from './hooks/useProgress';
import TopicCard from './components/TopicCard';
import TopicView from './components/TopicView';

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const { markDone, toggleDone, isDone, topicProgress, resetAll, streak, resetKey } = useProgress();

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
        onBack={() => { setActiveTopic(null); window.scrollTo({ top: 0, behavior: 'instant' }); }}
        resetKey={resetKey}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white px-4 sm:px-6 pt-10 pb-10 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="relative">
          <p className="text-indigo-200 text-xs sm:text-sm font-semibold mb-1 uppercase tracking-widest">Personal Math Guide</p>
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-1 drop-shadow">Hi, Yana! 👋</h1>
          <p className="text-indigo-100 text-sm sm:text-base mb-6">Your personal math space. Learn, practice, and level up. 🧠</p>

          {/* Stats row */}
          <div className="flex justify-center gap-3 mb-6 flex-wrap">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p className="text-xl sm:text-2xl font-extrabold">{totalDone}</p>
              <p className="text-xs text-white/70 mt-0.5">Done</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p className="text-xl sm:text-2xl font-extrabold">{streak}</p>
              <p className="text-xs text-white/70 mt-0.5">🔥 Streak</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 text-center min-w-[80px]">
              <p className="text-xl sm:text-2xl font-extrabold">{completedTopics}/{topics.length}</p>
              <p className="text-xs text-white/70 mt-0.5">Topics</p>
            </div>
          </div>

          {/* Overall progress */}
          <div className="max-w-xs mx-auto bg-white/20 backdrop-blur-sm rounded-2xl p-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80 font-medium">Overall Progress</span>
              <span className="font-extrabold">{overallPct}%</span>
            </div>
            <div className="w-full h-3 sm:h-4 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all duration-700 ease-out"
                style={{ width: `${overallPct}%` }}
              />
            </div>
            <p className="text-xs text-white/60 mt-1.5">{totalDone} of {totalProblems} problems done</p>
          </div>
        </div>
      </div>

      {/* Topics grid */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-16 sm:pb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-extrabold text-gray-900 text-sm sm:text-base uppercase tracking-widest">Topics</h2>
          <button
            onClick={() => { if (window.confirm('Reset all progress? This cannot be undone.')) resetAll(); }}
            className="text-xs font-semibold text-red-400 hover:text-red-600 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-full transition-colors"
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

        <p className="text-center text-xs text-gray-400 mt-10">
          Yana's Math Space · Grade 6 · Keep going, you've got this 💫
        </p>
      </div>
    </div>
  );
}
