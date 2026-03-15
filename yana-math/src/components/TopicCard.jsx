import ProgressBar from './ProgressBar';

const borderColor = {
  rose: 'border-rose-200 hover:border-rose-400',
  amber: 'border-amber-200 hover:border-amber-400',
  green: 'border-green-200 hover:border-green-400',
  purple: 'border-purple-200 hover:border-purple-400',
  sky: 'border-sky-200 hover:border-sky-400',
  orange: 'border-orange-200 hover:border-orange-400',
  teal: 'border-teal-200 hover:border-teal-400',
};

const badgeBg = {
  rose: 'bg-rose-50 text-rose-600',
  amber: 'bg-amber-50 text-amber-600',
  green: 'bg-green-50 text-green-600',
  purple: 'bg-purple-50 text-purple-600',
  sky: 'bg-sky-50 text-sky-600',
  orange: 'bg-orange-50 text-orange-600',
  teal: 'bg-teal-50 text-teal-600',
};

export default function TopicCard({ topic, progress, onClick }) {
  const { completed, total } = progress;
  const isComplete = completed === total;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left bg-white rounded-2xl border-2 p-5 transition-all duration-200 shadow-sm hover:shadow-md ${borderColor[topic.color] || 'border-gray-200 hover:border-gray-400'}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{topic.emoji}</span>
          <div>
            <h3 className="font-semibold text-gray-800 text-base">{topic.title}</h3>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${badgeBg[topic.color] || 'bg-gray-100 text-gray-600'}`}>
              {total} problems
            </span>
          </div>
        </div>
        {isComplete && <span className="text-xl">✅</span>}
      </div>
      <ProgressBar completed={completed} total={total} color={topic.color} />
    </button>
  );
}
