import { useState } from 'react';
import { topics } from './data/topics';
import { useProgress } from './hooks/useProgress';
import TopicCard from './components/TopicCard';
import TopicView from './components/TopicView';

export default function App() {
  const [activeTopic, setActiveTopic] = useState(null);
  const { markDone, toggleDone, isDone, topicProgress, resetAll } = useProgress();

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
        onBack={() => setActiveTopic(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white px-6 py-10 text-center">
        <p className="text-indigo-200 text-sm font-medium mb-1">Personal Math Guide</p>
        <h1 className="text-3xl font-bold mb-1">Hi, Yana Mistry! 👋</h1>
        <p className="text-indigo-100 text-base mb-6">Ready to practice some math today?</p>

        {/* Overall progress */}
        <div className="max-w-xs mx-auto bg-white/20 rounded-2xl p-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-white/80">Overall Progress</span>
            <span className="font-bold">{overallPct}%</span>
          </div>
          <div className="w-full h-3 bg-white/30 rounded-full">
            <div
              className="h-3 bg-white rounded-full transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-xs text-white/70 mt-1.5">{totalDone} of {totalProblems} problems done</p>
        </div>
      </div>

      {/* Topics grid */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-700">Topics</h2>
          {totalDone > 0 && (
            <button
              onClick={() => { if (window.confirm('Reset all progress?')) resetAll(); }}
              className="text-xs text-gray-400 hover:text-red-400 transition-colors"
            >
              Reset progress
            </button>
          )}
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

        <p className="text-center text-xs text-gray-400 mt-8">
          Made with ❤️ for Yana Mistry · Grade 6 Math
        </p>
      </div>
    </div>
  );
}
