import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const messages = [
  { line1: "You're on fire, Yana! 🔥", line2: "One more topic down. Nothing can stop you now." },
  { line1: "Math star alert! 🌟", line2: "Yana Mistry just owned this topic. Seriously impressive." },
  { line1: "That's what I'm talking about! 🎉", line2: "Every problem you solve makes the next one easier." },
  { line1: "Unstoppable. 💪", line2: "Yana, your brain is getting stronger with every answer." },
  { line1: "Champion energy! 🏆", line2: "You didn't just finish. You understood it. Big difference." },
  { line1: "Look at you go, Yana! ✨", line2: "This is exactly how math gets easier. One topic at a time." },
  { line1: "Boom! Another one done. 🚀", line2: "Keep this up and there's nothing in Grade 6 you can't handle." },
];

export default function MilestoneModal({ topic, onClose }) {
  const msg = messages[topic.length % messages.length];

  useEffect(() => {
    confetti({ particleCount: 80, angle: 60, spread: 70, origin: { x: 0, y: 0.6 } });
    confetti({ particleCount: 80, angle: 120, spread: 70, origin: { x: 1, y: 0.6 } });
    const t = setTimeout(onClose, 5000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-white via-yellow-50 to-pink-50 dark:from-[#0d1627] dark:via-[#16182d] dark:to-[#25153c] rounded-[2rem] shadow-2xl p-8 max-w-sm w-full text-center border border-white/80 dark:border-white/10 relative overflow-hidden"
        style={{ animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(250,204,21,0.25),transparent_30%)] pointer-events-none" />
        <div className="relative text-6xl sm:text-7xl mb-3 animate-bounce">🎊</div>
        <div className="inline-block bg-indigo-100 text-indigo-700 dark:bg-white/10 dark:text-sky-100 text-xs font-black px-4 py-1.5 rounded-full mb-3 uppercase tracking-[0.18em] shadow-sm border border-indigo-100 dark:border-white/10">
          Topic Complete!
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-gray-100 mb-1 tracking-tight">{topic}</h2>
        <p className="text-slate-700 dark:text-gray-300 mt-3 text-sm sm:text-base font-bold">{msg.line1}</p>
        <p className="text-slate-500 dark:text-gray-400 mt-1 text-xs sm:text-sm">Topic mastered. More challenge cards are waiting.</p>
        <p className="text-slate-500 dark:text-gray-500 mt-3 text-xs sm:text-sm">{msg.line2}</p>
        <button
          onClick={onClose}
          className="mt-6 px-8 py-3 bg-gradient-to-r from-fuchsia-500 via-violet-500 to-sky-500 text-white rounded-full text-sm font-black uppercase tracking-wide active:opacity-80 transition-opacity shadow-lg touch-manipulation w-full sm:w-auto"
        >
          Keep Going! →
        </button>
      </div>
    </div>
  );
}
