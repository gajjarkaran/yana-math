export default function ProgressBar({ completed, total, color = 'indigo', onDark = false }) {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100);

  const fillColor = {
    rose:   'from-rose-400 to-pink-500',
    amber:  'from-amber-400 to-orange-400',
    green:  'from-green-400 to-emerald-500',
    purple: 'from-purple-400 to-violet-500',
    sky:    'from-sky-400 to-blue-500',
    orange: 'from-orange-400 to-amber-500',
    teal:   'from-teal-400 to-cyan-500',
    indigo: 'from-white to-white',
  }[color] || 'from-indigo-400 to-purple-500';

  const trackColor = onDark ? 'bg-white/30' : ({
    rose:   'bg-rose-100 dark:bg-rose-900/40',
    amber:  'bg-amber-100 dark:bg-amber-900/40',
    green:  'bg-green-100 dark:bg-green-900/40',
    purple: 'bg-purple-100 dark:bg-purple-900/40',
    sky:    'bg-sky-100 dark:bg-sky-900/40',
    orange: 'bg-orange-100 dark:bg-orange-900/40',
    teal:   'bg-teal-100 dark:bg-teal-900/40',
    indigo: 'bg-indigo-100 dark:bg-indigo-900/40',
  }[color] || 'bg-gray-100 dark:bg-gray-700');

  const labelColor = onDark ? 'text-white/70' : 'text-gray-500 dark:text-gray-400';

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className={`text-xs font-semibold ${labelColor}`}>
          {completed}/{total} done
        </span>
        <span className={`text-xs font-bold ${onDark ? 'text-white' : 'text-gray-700 dark:text-gray-300'}`}>
          {pct}%
        </span>
      </div>
      <div className={`w-full h-2.5 rounded-full ${trackColor} overflow-hidden`}>
        <div
          className={`h-2.5 rounded-full bg-gradient-to-r ${fillColor} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
