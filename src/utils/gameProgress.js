import { GLOBAL_BADGES, QUEST_POOL } from '../data/gameData';
import { topics } from '../data/topics';

export const PROBLEM_XP = { 1: 15, 2: 25, 3: 40 };
export const BOSS_XP = { 1: 50, 2: 80, 3: 120 };

export function getTodayKey() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

export function getDefaultActivityRecord() {
  return {
    solvedIds: [],
    perfectIds: [],
    bossTopicIds: [],
    topicMasteredIds: [],
    xpEarned: 0,
  };
}

export function normalizeGameState(stored) {
  if (!stored || typeof stored !== 'object') {
    return {
      stars: {},
      xp: 0,
      activity: {},
      bossWins: {},
    };
  }

  return {
    stars: stored.stars && typeof stored.stars === 'object' ? stored.stars : {},
    xp: Number.isFinite(stored.xp) ? stored.xp : 0,
    activity: stored.activity && typeof stored.activity === 'object' ? stored.activity : {},
    bossWins: stored.bossWins && typeof stored.bossWins === 'object' ? stored.bossWins : {},
  };
}

export function getLevelInfo(xp) {
  let level = 1;
  let spent = 0;
  let nextLevelXp = 100;

  while (xp >= spent + nextLevelXp) {
    spent += nextLevelXp;
    level += 1;
    nextLevelXp = 100 + (level - 1) * 35;
  }

  const xpIntoLevel = xp - spent;
  const progressPct = Math.round((xpIntoLevel / nextLevelXp) * 100);

  return { level, xpIntoLevel, nextLevelXp, progressPct };
}

export function getProblemStars({ attempts, hintsUsed }) {
  if (attempts <= 1 && hintsUsed === 0) return 3;
  if (attempts <= 2 && hintsUsed <= 1) return 2;
  return 1;
}

export function getBossStars(mistakes) {
  if (mistakes === 0) return 3;
  if (mistakes === 1) return 2;
  return 1;
}

function getQuestSeed(todayKey) {
  return todayKey.split('').reduce((sum, char, index) => sum + char.charCodeAt(0) * (index + 3), 0);
}

export function getDailyQuests(gameState, dayKey = getTodayKey()) {
  const todayActivity = {
    ...getDefaultActivityRecord(),
    ...(gameState.activity[dayKey] || {}),
  };
  const seed = getQuestSeed(dayKey);
  const count = 3;
  const selected = [];

  for (let index = 0; index < count; index += 1) {
    selected.push(QUEST_POOL[(seed + index * 2) % QUEST_POOL.length]);
  }

  return selected.map((quest) => {
    const progress = quest.getProgress(todayActivity);
    return {
      ...quest,
      progress,
      completed: progress >= quest.target,
    };
  });
}

function allQuestDaysCompleted(activity) {
  return Object.keys(activity).some((dayKey) => getDailyQuests({ activity }, dayKey).every((quest) => quest.completed));
}

export function getBadges(doneMap, gameState, streak) {
  const totalSolved = Object.keys(doneMap).filter((id) => doneMap[id]).length;
  const perfectSolveCount = Object.values(gameState.stars).filter((stars) => stars === 3).length;
  const bossWins = Object.entries(gameState.bossWins).filter(([, data]) => data.completed);
  const badgeIds = new Set();

  if (totalSolved > 0) badgeIds.add('first-win');
  if (streak >= 10) badgeIds.add('streak-spark');
  if (perfectSolveCount >= 10) badgeIds.add('triple-star-10');
  if (getLevelInfo(gameState.xp).level >= 5) badgeIds.add('level-5');
  if (bossWins.length >= 1) badgeIds.add('boss-blaster');
  if (bossWins.length >= 3) badgeIds.add('world-tour');
  if (allQuestDaysCompleted(gameState.activity)) badgeIds.add('quest-crusher');
  bossWins.forEach(([topicId]) => badgeIds.add(`topic-${topicId}`));

  return [
    ...GLOBAL_BADGES.map((badge) => ({
      ...badge,
      unlocked: badgeIds.has(badge.id),
    })),
    ...topics.map((topic) => ({
      id: `topic-${topic.id}`,
      emoji: topic.emoji,
      title: `${topic.title} Master`,
      description: `Beat the ${topic.title} boss battle.`,
      unlocked: badgeIds.has(`topic-${topic.id}`),
    })),
  ];
}

