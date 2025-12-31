/**
 * 游戏成就徽章数据
 * 使用算法生成的独特视觉标识
 */

export const badgeCategories = {
  // CLI 基础
  cli_basic: {
    id: 'cli_basic',
    name: 'CLI 新手',
    type: 'bronze',
    description: '完成前 5 个 CLI 基础关卡',
    seed: 'cli_basic_001'
  },
  cli_intermediate: {
    id: 'cli_intermediate',
    name: 'CLI 熟手',
    type: 'silver',
    description: '完成前 15 个 CLI 关卡',
    seed: 'cli_intermediate_002'
  },
  cli_master: {
    id: 'cli_master',
    name: 'CLI 大师',
    type: 'gold',
    description: '完成全部 25 个 CLI 关卡',
    seed: 'cli_master_003'
  },

  // Git 精通
  git_starter: {
    id: 'git_starter',
    name: 'Git 启程',
    type: 'bronze',
    description: '完成 Git 基础关卡',
    seed: 'git_starter_101'
  },
  git_expert: {
    id: 'git_expert',
    name: 'Git 专家',
    type: 'silver',
    description: '掌握所有 Git 命令',
    seed: 'git_expert_102'
  },

  // VSCode 教程
  vscode_explorer: {
    id: 'vscode_explorer',
    name: '探索者',
    type: 'default',
    description: '完成 VSCode 界面学习',
    seed: 'vscode_explorer_201'
  },
  vscode_artisan: {
    id: 'vscode_artisan',
    name: '工匠',
    type: 'silver',
    description: '掌握 VSCode 所有功能',
    seed: 'vscode_artisan_202'
  },

  // 特殊成就
  speed_runner: {
    id: 'speed_runner',
    name: '极速者',
    type: 'special',
    description: '在 30 分钟内完成所有关卡',
    seed: 'speed_runner_999'
  },
  perfectionist: {
    id: 'perfectionist',
    name: '完美主义者',
    type: 'special',
    description: '所有关卡一次通过',
    seed: 'perfectionist_998'
  },
  night_owl: {
    id: 'night_owl',
    name: '夜猫子',
    type: 'special',
    description: '在深夜时段完成学习',
    seed: 'night_owl_997'
  },

  // 统计成就
  first_steps: {
    id: 'first_steps',
    name: '第一步',
    type: 'bronze',
    description: '完成第一个关卡',
    seed: 'first_steps_001'
  },
  knowledge_seeker: {
    id: 'knowledge_seeker',
    name: '求知者',
    type: 'default',
    description: '使用搜索功能 10 次',
    seed: 'knowledge_seeker_501'
  },
  terminal_wizard: {
    id: 'terminal_wizard',
    name: '终端向导',
    type: 'gold',
    description: '在终端组件中执行 50 条命令',
    seed: 'terminal_wizard_601'
  }
}

// 关卡对应的徽章奖励
export const levelBadges = {
  // CLI 关卡 (1-25)
  1: 'first_steps',
  5: 'cli_basic',
  15: 'cli_intermediate',
  25: 'cli_master',

  // Git 专项关卡
  'git-1': 'git_starter',
  'git-5': 'git_expert',

  // VSCode 教程
  'vscode-1': 'vscode_explorer',
  'vscode-8': 'vscode_artisan'
}

// 获取关卡徽章
export function getLevelBadge(levelId) {
  const badgeId = levelBadges[levelId]
  return badgeCategories[badgeId] || null
}

// 获取所有徽章列表
export function getAllBadges() {
  return Object.values(badgeCategories)
}

// 按类型分组徽章
export function getBadgesByType(type) {
  return Object.values(badgeCategories).filter(b => b.type === type)
}
