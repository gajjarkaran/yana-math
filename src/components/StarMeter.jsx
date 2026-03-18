export default function StarMeter({ count = 0, total = 3, size = 'md', dimmed = false }) {
  const sizeClass = {
    sm: 'text-sm gap-0.5',
    md: 'text-base gap-1',
    lg: 'text-lg gap-1',
  }[size] || 'text-base gap-1';

  return (
    <div className={`inline-flex items-center ${sizeClass}`} aria-label={`${count} of ${total} stars`}>
      {Array.from({ length: total }, (_, index) => {
        const filled = index < count;
        return (
          <span
            key={index}
            className={filled ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.45)]' : dimmed ? 'text-white/30' : 'text-slate-300 dark:text-slate-600'}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

