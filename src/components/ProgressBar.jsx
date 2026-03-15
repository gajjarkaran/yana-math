export default function ProgressBar({ completed, total, color = 'indigo', large = false }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const fillColor = {
    rose: 'from-rose-400 to-pink-500',
    amber: 'from-amber-400 to-orange-400',
    green: 'from-green-400 to-emerald-500',
    purple: 'from-purple-400 to-violet-500',
    sky: 'from-sky-400 to-blue-500',
    orange: 'from-orange-400 to-amber-500',
    teal: 'from-teal-400 to-cyan-500',
    indigo: 'from-indigo-400 to-purple-500',
  }[color] || 'from-indigo-400 to-purple-500';

  const trackColor = {
    rose: 'bg-rose-100',
    amber: 'bg-amber-100',
    green: 'bg-green-100',
    purple: 'bg-purple-100',
    sky: 'bg-sky-100',
    orange: 'bg-orange-100',
    teal: 'bg-teal-100',
    indigo: 'bg-indigo-100',
  }[color] || 'bg-gray-100';

  const height = large ? 'h-4' : 'h-2.5';

  return (
    <div className="w-full">
      <div className={`w-full ${height} rounded-full ${trackColor} overflow-hidden`}>
        <div
          className={`${height} rounded-full bg-gradient-to-r ${fillColor} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{completed}/{total} done · {pct}%</p>
    </div>
  );
}
