import { useState, useEffect } from 'react';

const STORAGE_KEY = 'yana_math_progress';
const STREAK_KEY = 'yana_math_streak';

export function useProgress() {
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  });

  const [streak, setStreak] = useState(() => {
    try { return parseInt(localStorage.getItem(STREAK_KEY)) || 0; }
    catch { return 0; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    localStorage.setItem(STREAK_KEY, String(streak));
  }, [streak]);

  const markDone = (problemId) => {
    setDone((prev) => {
      if (prev[problemId]) return prev; // already done, no streak bump
      setStreak((s) => s + 1);
      return { ...prev, [problemId]: true };
    });
  };

  const toggleDone = (problemId) => {
    setDone((prev) => {
      const nowDone = !prev[problemId];
      if (nowDone) setStreak((s) => s + 1);
      else setStreak((s) => Math.max(0, s - 1));
      return { ...prev, [problemId]: nowDone };
    });
  };

  const isDone = (problemId) => !!done[problemId];

  const topicProgress = (problems) => {
    const completed = problems.filter((p) => done[p.id]).length;
    return { completed, total: problems.length };
  };

  const resetAll = () => {
    setDone({});
    setStreak(0);
  };

  return { markDone, toggleDone, isDone, topicProgress, resetAll, streak };
}
