export const QUEST_POOL = [
  {
    id: 'solve-3',
    emoji: '⚡',
    title: 'Quick Quest',
    description: 'Solve 3 challenge cards today.',
    target: 3,
    getProgress: (activity) => activity.solvedIds.length,
  },
  {
    id: 'solve-5',
    emoji: '🚀',
    title: 'Power Session',
    description: 'Solve 5 challenge cards today.',
    target: 5,
    getProgress: (activity) => activity.solvedIds.length,
  },
  {
    id: 'perfect-2',
    emoji: '🌟',
    title: 'Perfect Pair',
    description: 'Earn 2 perfect 3-star solves today.',
    target: 2,
    getProgress: (activity) => activity.perfectIds.length,
  },
  {
    id: 'xp-80',
    emoji: '💎',
    title: 'XP Hunt',
    description: 'Earn 80 XP today.',
    target: 80,
    getProgress: (activity) => activity.xpEarned,
  },
  {
    id: 'topic-1',
    emoji: '🏁',
    title: 'Topic Sprint',
    description: 'Master 1 topic today.',
    target: 1,
    getProgress: (activity) => activity.topicMasteredIds.length,
  },
  {
    id: 'boss-1',
    emoji: '👑',
    title: 'Boss Hunter',
    description: 'Beat 1 boss battle today.',
    target: 1,
    getProgress: (activity) => activity.bossTopicIds.length,
  },
];

export const GLOBAL_BADGES = [
  { id: 'first-win', emoji: '🎯', title: 'First Win', description: 'Solve your first challenge card.' },
  { id: 'streak-spark', emoji: '🔥', title: 'Streak Spark', description: 'Reach a solve streak of 10.' },
  { id: 'triple-star-10', emoji: '🌠', title: 'Star Collector', description: 'Earn 10 perfect 3-star solves.' },
  { id: 'level-5', emoji: '🧪', title: 'Level 5 Hero', description: 'Reach Level 5.' },
  { id: 'boss-blaster', emoji: '🛡️', title: 'Boss Blaster', description: 'Beat your first boss battle.' },
  { id: 'world-tour', emoji: '🗺️', title: 'World Tour', description: 'Beat 3 topic bosses.' },
  { id: 'quest-crusher', emoji: '📜', title: 'Quest Crusher', description: 'Complete every daily quest in one day.' },
];

