export default function ProgressBar({ completed, total, color = 'indigo' }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

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

  const fillColor = {
    rose: 'bg-rose-400',
    amber: 'bg-amber-400',
    green: 'bg-green-400',
    purple: 'bg-purple-400',
    sky: 'bg-sky-400',
    orange: 'bg-orange-400',
    teal: 'bg-teal-400',
    indigo: 'bg-indigo-400',
  }[color] || 'bg-indigo-400';

  return (
    <div className="w-full">
      <div className={`w-full h-2.5 rounded-full ${trackColor}`}>
        <div
          className={`h-2.5 rounded-full transition-all duration-500 ${fillColor}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-gray-400 mt-1">{completed}/{total} done</p>
    </div>
  );
}
