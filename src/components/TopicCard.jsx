import ProgressBar from './ProgressBar';

const gradients = {
  rose:   'from-rose-400 to-pink-500',
  amber:  'from-amber-400 to-orange-400',
  green:  'from-green-400 to-emerald-500',
  purple: 'from-purple-400 to-violet-500',
  sky:    'from-sky-400 to-blue-500',
  orange: 'from-orange-400 to-amber-500',
  teal:   'from-teal-400 to-cyan-500',
};

export default function TopicCard({ topic, progress, onClick }) {
  const { completed, total } = progress;
  const isComplete = completed === total && total > 0;
  const grad = gradients[topic.color] || 'from-indigo-400 to-purple-500';

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden group"
    >
      {/* colored header */}
      <div className={`bg-gradient-to-br ${grad} px-5 pt-5 pb-5 relative`}>
        <div className="text-4xl mb-1">{topic.emoji}</div>
        <h3 className="font-bold text-white text-lg leading-tight">{topic.title}</h3>
        <span className="text-xs text-white/70">{total} problems</span>
        {isComplete && (
          <span className="absolute top-4 right-4 text-2xl">✅</span>
        )}
      </div>

      {/* progress section */}
      <div className="px-5 py-4 bg-white relative">
        <ProgressBar completed={completed} total={total} color={topic.color} />
      </div>
    </button>
  );
}
