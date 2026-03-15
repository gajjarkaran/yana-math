import { useState, useEffect } from 'react';

const STORAGE_KEY = 'yana_math_progress';

export function useProgress() {
  const [done, setDone] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const markDone = (problemId) => {
    setDone((prev) => ({ ...prev, [problemId]: true }));
  };

  const toggleDone = (problemId) => {
    setDone((prev) => ({ ...prev, [problemId]: !prev[problemId] }));
  };

  const isDone = (problemId) => !!done[problemId];

  const topicProgress = (problems) => {
    const completed = problems.filter((p) => done[p.id]).length;
    return { completed, total: problems.length };
  };

  const resetAll = () => setDone({});

  return { markDone, toggleDone, isDone, topicProgress, resetAll };
}
