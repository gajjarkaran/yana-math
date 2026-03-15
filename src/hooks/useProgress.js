import { useState, useEffect, useCallback } from 'react';
import { topics } from '../data/topics';

const STORAGE_KEY   = 'yana_math_progress';
const STREAK_KEY    = 'yana_math_streak';
const SHUFFLE_KEY   = 'yana_math_shuffle';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffleOrder() {
  const order = {};
  topics.forEach((t) => {
    order[t.id] = shuffle(t.problems.map((p) => p.id));
  });
  return order;
}

function loadShuffleOrder() {
  try {
    const stored = JSON.parse(localStorage.getItem(SHUFFLE_KEY));
    // validate: must have all topic ids
    if (stored && topics.every((t) => Array.isArray(stored[t.id]))) return stored;
  } catch { /* fall through */ }
  return null;
}

export function useProgress() {
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch { return {}; }
  });

  const [streak, setStreak] = useState(() => {
    try { return parseInt(localStorage.getItem(STREAK_KEY)) || 0; }
    catch { return 0; }
  });

  const [resetKey, setResetKey] = useState(0);

  const [shuffleOrder, setShuffleOrder] = useState(() => {
    return loadShuffleOrder() || buildShuffleOrder();
  });

  // persist everything
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); }, [done]);
  useEffect(() => { localStorage.setItem(STREAK_KEY, String(streak)); }, [streak]);
  useEffect(() => { localStorage.setItem(SHUFFLE_KEY, JSON.stringify(shuffleOrder)); }, [shuffleOrder]);

  const markDone = (problemId) => {
    setDone((prev) => {
      if (prev[problemId]) return prev;
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

  // returns problems for a topic in the current shuffled order
  const getShuffledProblems = useCallback((topic) => {
    const order = shuffleOrder[topic.id];
    if (!order) return topic.problems;
    return order.map((id) => topic.problems.find((p) => p.id === id)).filter(Boolean);
  }, [shuffleOrder]);

  const resetAll = () => {
    const newOrder = buildShuffleOrder();
    setDone({});
    setStreak(0);
    setShuffleOrder(newOrder);
    setResetKey((k) => k + 1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STREAK_KEY);
    localStorage.setItem(SHUFFLE_KEY, JSON.stringify(newOrder));
  };

  return { markDone, toggleDone, isDone, topicProgress, getShuffledProblems, resetAll, streak, resetKey };
}
