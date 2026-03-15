import { useEffect } from 'react';

const messages = [
  { line1: "You're on fire, Yana! 🔥", line2: "One more topic down — nothing can stop you now." },
  { line1: "Math star alert! 🌟", line2: "Yana Mistry just owned this topic. Seriously impressive." },
  { line1: "That's what I'm talking about! 🎉", line2: "Every problem you solve makes the next one easier." },
  { line1: "Unstoppable. 💪", line2: "Yana, your brain is getting stronger with every answer." },
  { line1: "Champion energy! 🏆", line2: "You didn't just finish — you understood it. Big difference." },
  { line1: "Look at you go, Yana! ✨", line2: "This is exactly how math gets easier — one topic at a time." },
  { line1: "Boom! Another one done. 🚀", line2: "Keep this up and there's nothing in Grade 6 you can't handle." },
];

export default function MilestoneModal({ topic, onClose }) {
  const msg = messages[Math.floor(Math.random() * messages.length)];

  useEffect(() => {
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full mx-4 text-center animate-bounce-in">
        <div className="text-6xl mb-4">🎊</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Topic Complete!</h2>
        <p className="text-lg text-gray-600 mb-1 font-medium">{topic}</p>
        <p className="text-gray-500 mt-3 text-base font-medium">{msg.line1}</p>
        <p className="text-gray-400 mt-1 text-sm">{msg.line2}</p>
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-indigo-500 text-white rounded-full text-sm font-semibold hover:bg-indigo-600 transition-colors"
        >
          Keep Going!
        </button>
      </div>
    </div>
  );
}
