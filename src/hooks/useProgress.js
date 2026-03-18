import { useState, useEffect, useCallback } from 'react';
import { topics } from '../data/topics';
import {
  BOSS_XP,
  PROBLEM_XP,
  getBadges,
  getDailyQuests,
  getDefaultActivityRecord,
  getLevelInfo,
  getProblemStars,
  getBossStars,
  getTodayKey,
  normalizeGameState,
} from '../utils/gameProgress';

const STORAGE_KEY   = 'yana_math_progress';
const STREAK_KEY    = 'yana_math_streak';
const SHUFFLE_KEY   = 'yana_math_shuffle';
const GAME_KEY      = 'yana_math_game';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildShuffleOrder(existingOrder = {}) {
  const order = {};
  topics.forEach((t) => {
    const currentIds = t.problems.map((p) => p.id);
    const currentIdSet = new Set(currentIds);
    const storedIds = Array.isArray(existingOrder[t.id]) ? existingOrder[t.id] : [];
    const preservedIds = storedIds.filter((id) => currentIdSet.has(id));
    const missingIds = currentIds.filter((id) => !preservedIds.includes(id));

    order[t.id] = [...preservedIds, ...shuffle(missingIds)];
  });
  return order;
}

function loadShuffleOrder() {
  try {
    const stored = JSON.parse(localStorage.getItem(SHUFFLE_KEY));
    if (stored && typeof stored === 'object') return buildShuffleOrder(stored);
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
  const [game, setGame] = useState(() => {
    try { return normalizeGameState(JSON.parse(localStorage.getItem(GAME_KEY))); }
    catch { return normalizeGameState(null); }
  });

  const [shuffleOrder, setShuffleOrder] = useState(() => {
    return loadShuffleOrder() || buildShuffleOrder();
  });

  // persist everything
  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(done)); }, [done]);
  useEffect(() => { localStorage.setItem(STREAK_KEY, String(streak)); }, [streak]);
  useEffect(() => { localStorage.setItem(SHUFFLE_KEY, JSON.stringify(shuffleOrder)); }, [shuffleOrder]);
  useEffect(() => { localStorage.setItem(GAME_KEY, JSON.stringify(game)); }, [game]);

  const markDone = (problemId, meta = {}) => {
    const topic = topics.find((entry) => entry.id === meta.topicId);
    const topicProblems = topic?.problems ?? [];
    const previousStars = game.stars[problemId] || 0;
    const earnedStars = getProblemStars({
      attempts: meta.attempts ?? 1,
      hintsUsed: meta.hintsUsed ?? 0,
    });
    const bestStars = Math.max(previousStars, earnedStars);
    const xpDelta = Math.max(0, (PROBLEM_XP[bestStars] || 0) - (PROBLEM_XP[previousStars] || 0));
    const nextDone = done[problemId] ? done : { ...done, [problemId]: true };
    const topicCompletedNow = topicProblems.length > 0 && topicProblems.every((problem) => nextDone[problem.id]);
    const todayKey = getTodayKey();
    const todayActivity = {
      ...getDefaultActivityRecord(),
      ...(game.activity[todayKey] || {}),
    };
    const nextGame = {
      ...game,
      xp: game.xp + xpDelta,
      stars: {
        ...game.stars,
        [problemId]: bestStars,
      },
      activity: {
        ...game.activity,
        [todayKey]: {
          ...todayActivity,
          solvedIds: todayActivity.solvedIds.includes(problemId) ? todayActivity.solvedIds : [...todayActivity.solvedIds, problemId],
          perfectIds: bestStars === 3 && !todayActivity.perfectIds.includes(problemId)
            ? [...todayActivity.perfectIds, problemId]
            : todayActivity.perfectIds,
          topicMasteredIds: topicCompletedNow && !todayActivity.topicMasteredIds.includes(meta.topicId)
            ? [...todayActivity.topicMasteredIds, meta.topicId]
            : todayActivity.topicMasteredIds,
          xpEarned: todayActivity.xpEarned + xpDelta,
        },
      },
    };

    setDone(nextDone);
    if (!done[problemId]) {
      setStreak((value) => value + 1);
    }
    setGame(nextGame);

    const currentBadges = getBadges(done, game, streak).filter((badge) => badge.unlocked).map((badge) => badge.id);
    const nextBadges = getBadges(nextDone, nextGame, done[problemId] ? streak : streak + 1).filter((badge) => badge.unlocked).map((badge) => badge.id);

    return {
      earnedStars,
      bestStars,
      xpDelta,
      topicCompletedNow,
      unlockedBadges: nextBadges.filter((id) => !currentBadges.includes(id)),
      dailyQuestWins: getDailyQuests(nextGame).filter((quest) => quest.completed).length,
    };
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
  const getProblemStarsFor = (problemId) => game.stars[problemId] || 0;

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
    setGame(normalizeGameState(null));
    setResetKey((k) => k + 1);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STREAK_KEY);
    localStorage.removeItem(GAME_KEY);
    localStorage.setItem(SHUFFLE_KEY, JSON.stringify(newOrder));
  };

  const completeBossBattle = (topicId, { mistakes = 0 } = {}) => {
    const previousStars = game.bossWins[topicId]?.stars || 0;
    const earnedStars = getBossStars(mistakes);
    const bestStars = Math.max(previousStars, earnedStars);
    const xpDelta = Math.max(0, (BOSS_XP[bestStars] || 0) - (BOSS_XP[previousStars] || 0));
    const todayKey = getTodayKey();
    const todayActivity = {
      ...getDefaultActivityRecord(),
      ...(game.activity[todayKey] || {}),
    };
    const nextGame = {
      ...game,
      xp: game.xp + xpDelta,
      bossWins: {
        ...game.bossWins,
        [topicId]: {
          completed: true,
          stars: bestStars,
        },
      },
      activity: {
        ...game.activity,
        [todayKey]: {
          ...todayActivity,
          bossTopicIds: todayActivity.bossTopicIds.includes(topicId) ? todayActivity.bossTopicIds : [...todayActivity.bossTopicIds, topicId],
          xpEarned: todayActivity.xpEarned + xpDelta,
        },
      },
    };

    setGame(nextGame);
    const currentBadges = getBadges(done, game, streak).filter((badge) => badge.unlocked).map((badge) => badge.id);
    const nextBadges = getBadges(done, nextGame, streak).filter((badge) => badge.unlocked).map((badge) => badge.id);

    return {
      earnedStars,
      bestStars,
      xpDelta,
      unlockedBadges: nextBadges.filter((id) => !currentBadges.includes(id)),
    };
  };

  const totalStars = Object.values(game.stars).reduce((sum, value) => sum + value, 0);
  const totalPossibleStars = topics.reduce((sum, topic) => sum + topic.problems.length * 3, 0);
  const bossWins = Object.values(game.bossWins).filter((entry) => entry.completed).length;
  const levelInfo = getLevelInfo(game.xp);
  const badges = getBadges(done, game, streak);
  const dailyQuests = getDailyQuests(game);

  const getTopicGameSummary = (topic) => ({
    stars: topic.problems.reduce((sum, problem) => sum + (game.stars[problem.id] || 0), 0),
    possibleStars: topic.problems.length * 3,
    boss: game.bossWins[topic.id] || { completed: false, stars: 0 },
  });

  return {
    markDone,
    toggleDone,
    isDone,
    topicProgress,
    getShuffledProblems,
    resetAll,
    streak,
    resetKey,
    xp: game.xp,
    levelInfo,
    totalStars,
    totalPossibleStars,
    badges,
    dailyQuests,
    bossWins,
    completeBossBattle,
    getProblemStarsFor,
    getTopicGameSummary,
  };
}
