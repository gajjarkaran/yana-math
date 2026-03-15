import { useEffect } from 'react';

const messages = [
  "You're on fire, Yana! 🔥 Keep it up!",
  "Nailed it, Yana! 🌟 You're a math star!",
  "Amazing work, Yana! 🎉 You crushed it!",
  "Yana, you're unstoppable! 💪 Brilliant job!",
  "Wow, Yana! 🏆 That's what we call a math champion!",
  "Fantastic, Yana! ✨ You make math look easy!",
  "Yana, you're absolutely killing it! 🚀",
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
        <p className="text-gray-500 mt-3 text-base">{msg}</p>
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
