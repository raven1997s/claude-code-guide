# REQ-2.2: 成就系统 (Achievement System)

> **需求ID**: REQ-2.2
> **状态**: 🟢 已定义
> **优先级**: Should Have
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名正在学习 Claude Code CLI 的开发者，当我完成特定学习里程碑时，我希望获得数字徽章成就，这样我就能在社交媒体分享我的学习成果，并获得持续学习的动力。

**业务价值**:
- 提升用户留存率，目标 7 日留存率提升 40%
- 增强社交分享动力，带来自然流量增长
- 通过游戏化机制提升学习完成率

---

## 🎯 功能规格

### 1. 成就分类体系

#### 成就类型
```javascript
// src/data/achievement-data.js
export const ACHIEVEMENT_CATEGORIES = {
  MILESTONE: {
    label: '里程碑',
    icon: 'fa-flag',
    color: '#f59e0b',
    description: '完成特定数量关卡'
  },
  SKILL: {
    label: '技能',
    icon: 'fa-graduation-cap',
    color: '#3b82f6',
    description: '掌握特定技能领域'
  },
  SPEED: {
    label: '速度',
    icon: 'fa-bolt',
    color: '#ef4444',
    description: '快速完成挑战'
  },
  SOCIAL: {
    label: '社交',
    icon: 'fa-share-nodes',
    color: '#8b5cf6',
    description: '分享与传播'
  },
  SECRET: {
    label: '隐藏',
    icon: 'fa-user-secret',
    color: '#10b981',
    description: '发现特殊内容'
  }
}
```

#### 稀有度分级 (Rarity Tiers)
| 稀有度 | 比例 | 图标样式 | 解锁动画 | 示例 |
|--------|------|----------|----------|------|
| **Common** (普通) | 80% | 灰色 | 简单弹出 | 完成第 1 关 |
| **Rare** (稀有) | 15% | 蓝色 | 发光效果 | 完成 CLI 全部关卡 |
| **Epic** (史诗) | 4% | 紫色 | 粒子特效 | 30 分钟内完成所有关卡 |
| **Legendary** (传说) | 1% | 金色 + 动画 | 全屏庆祝 | 发现隐藏彩蛋 |

---

### 2. 成就定义示例

```javascript
export const ACHIEVEMENTS = [
  // === 里程碑成就 ===
  {
    id: 'first_step',
    name: '初试啼鸦',
    description: '完成你的第 1 个关卡',
    icon: 'fa-shoe-prints',
    category: 'MILESTONE',
    rarity: 'common',
    condition: (stats) => stats.completedLevels.length >= 1,
    reward: {
      type: 'badge',
      imageUrl: '/achievements/first-step.png'
    }
  },
  {
    id: 'cli_master',
    name: 'CLI 宗师',
    description: '完成所有 CLI 基础关卡 (1-25)',
    icon: 'fa-terminal',
    category: 'SKILL',
    rarity: 'rare',
    condition: (stats) => {
      const cliLevels = stats.completedLevels.filter(id => id >= 1 && id <= 25)
      return cliLevels.length === 25
    },
    reward: {
      type: 'badge',
      imageUrl: '/achievements/cli-master.png',
      shareable: true // 可生成分享卡片
    }
  },

  // === 速度成就 ===
  {
    id: 'speed_runner',
    name: '极速通关',
    description: '在 30 分钟内完成所有关卡',
    icon: 'fa-bolt',
    category: 'SPEED',
    rarity: 'epic',
    condition: (stats) => {
      const totalTime = calculateTotalTime(stats.sessionStart, stats.sessionEnd)
      return stats.completedLevels.length === 37 && totalTime < 1800 // 30分钟
    },
    reward: {
      type: 'title',
      titleText: '闪电侠',
      badgeEffect: 'lightning' // 特殊视觉效果
    }
  },

  // === 社交成就 ===
  {
    id: 'influencer',
    name: '传播大使',
    description: '分享学习成果到社交媒体',
    icon: 'fa-share-nodes',
    category: 'SOCIAL',
    rarity: 'rare',
    condition: (stats) => stats.shareCount >= 1,
    reward: {
      type: 'badge',
      imageUrl: '/achievements/influencer.png'
    }
  },

  // === 隐藏成就 ===
  {
    id: 'secret_agent',
    name: '神秘访客',
    description: '发现隐藏的终端命令',
    icon: 'fa-user-secret',
    category: 'SECRET',
    rarity: 'legendary',
    condition: (stats) => stats.secretCommands.includes('claude --secret'),
    hidden: true, // 成就本身在列表中隐藏
    reward: {
      type: 'badge',
      imageUrl: '/achievements/secret-agent.png',
      specialEffect: 'matrix' // Matrix 数字雨效果
    }
  }
]
```

---

### 3. UI/UX 设计

#### 成就解锁动画
```vue
<template>
  <!-- 成就解锁弹窗 -->
  <n-modal
    v-model:show="showAchievementModal"
    preset="card"
    class="achievement-unlock-modal"
    :class="`rarity-${currentAchievement.rarity}`"
  >
    <template #header>
      <div class="achievement-header">
        <div class="rarity-badge">{{ rarityLabel }}</div>
        <h2>🏆 成就解锁！</h2>
      </div>
    </template>

    <div class="achievement-content">
      <!-- 成就图标 (带动画) -->
      <div class="achievement-icon-wrapper">
        <div class="glow-effect"></div>
        <n-icon
          :size="80"
          :component="getIcon(currentAchievement.icon)"
          class="achievement-icon"
        />
      </div>

      <!-- 成就信息 -->
      <div class="achievement-info">
        <h3>{{ currentAchievement.name }}</h3>
        <p>{{ currentAchievement.description }}</p>

        <!-- 稀有度标识 -->
        <n-space>
          <n-tag
            v-for="star in rarityStars"
            :key="star"
            type="warning"
            size="small"
          >
            ★
          </n-tag>
        </n-space>
      </div>

      <!-- 进度条 (如果是进度类成就) -->
      <n-progress
        v-if="showProgress"
        type="line"
        :percentage="achievementProgress"
        :color="progressColor"
      >
        <template #default="{ percentage }">
          {{ currentProgress }} / {{ targetProgress }}
        </template>
      </n-progress>
    </div>

    <template #footer>
      <n-space justify="center">
        <n-button type="primary" size="large" @click="shareAchievement">
          <template #icon>
            <n-icon :component="ShareIcon" />
          </template>
          分享成就
        </n-button>
        <n-button size="large" @click="closeModal">
          继续学习
        </n-button>
      </n-space>
    </template>
  </n-modal>
</template>

<style scoped>
/* 稀有度样式 */
.rarity-common { --achievement-color: #9ca3af; }
.rarity-rare { --achievement-color: #3b82f6; }
.rarity-epic { --achievement-color: #8b5cf6; }
.rarity-legendary {
  --achievement-color: #f59e0b;
  animation: legendary-glow 2s ease-in-out infinite;
}

/* 发光效果 */
.glow-effect {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, var(--achievement-color) 0%, transparent 70%);
  opacity: 0.3;
  animation: pulse 2s ease-in-out infinite;
}

/* 图标动画 */
.achievement-icon {
  animation: icon-reveal 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes legendary-glow {
  0%, 100% { filter: drop-shadow(0 0 10px var(--achievement-color)); }
  50% { filter: drop-shadow(0 0 30px var(--achievement-color)); }
}

@keyframes icon-reveal {
  0% { transform: scale(0) rotate(-180deg); opacity: 0; }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
</style>
```

#### 成就展示页面
```vue
<template>
  <div class="achievements-page">
    <!-- 统计卡片 -->
    <n-grid :cols="4" :x-gap="16" class="stats-grid">
      <n-gi>
        <n-statistic label="已解锁" :value="unlockedCount">
          <template #suffix>/ {{ totalAchievements }}</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="解锁率" :value="unlockRate">
          <template #suffix>%</template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="最高稀有度" :value="highestRarity">
          <template #prefix>
            <n-icon :component="getRarityIcon(highestRarity)" />
          </template>
        </n-statistic>
      </n-gi>
      <n-gi>
        <n-statistic label="总积分" :value="totalPoints" />
      </n-gi>
    </n-grid>

    <!-- 成就分类标签页 -->
    <n-tabs v-model:value="activeCategory" type="segment">
      <n-tab-pane name="all" tab="全部">
        <AchievementGrid :achievements="allAchievements" />
      </n-tab-pane>
      <n-tab-pane
        v-for="(cat, key) in ACHIEVEMENT_CATEGORIES"
        :key="key"
        :name="key"
        :tab="cat.label"
      >
        <AchievementGrid :achievements="filterByCategory(key)" />
      </n-tab-pane>
      <n-tab-pane name="locked" tab="未解锁">
        <AchievementGrid :achievements="lockedAchievements" :show-hint="true" />
      </n-tab-pane>
    </n-tabs>

    <!-- 隐藏成就提示 -->
    <n-alert v-if="hasHiddenAchievements" type="warning" class="hidden-hint">
      还有 <strong>{{ hiddenCount }}</strong> 个隐藏成就等待发现...
    </n-alert>
  </div>
</template>
```

---

### 4. 数据模型

#### 用户成就数据
```javascript
// LocalStorage 结构
const ACHIEVEMENT_DATA_KEY = 'claude_achievements_v1'

{
  userId: 'anonymous',
  unlockedAchievements: [
    {
      id: 'first_step',
      unlockedAt: '2026-01-01T00:00:00Z',
      progress: 1 // 进度类成就的当前进度
    }
  ],
  stats: {
    completedLevels: [1, 2, 3],
    totalPlayTime: 3600, // 秒
    shareCount: 2,
    secretCommands: []
  },
  points: 100, // 总积分
  lastUpdated: '2026-01-01T00:00:00Z'
}
```

#### 成就检测触发时机
| 事件 | 触发位置 | 检测频率 |
|------|----------|----------|
| **关卡完成** | `GameView.vue:completeLevel()` | 每次完成 |
| **分享动作** | `ShareCard.vue` | 每次分享 |
| **搜索命令** | `TerminalComponent.vue` | 实时检测 |
| **页面加载** | `App.vue:onMounted()` | 每次启动 |

---

### 5. 成就积分系统

#### 积分规则
```javascript
const POINTS_PER_RARITY = {
  common: 10,
  rare: 50,
  epic: 200,
  legendary: 1000
}

// 计算总积分
function calculateTotalPoints(unlockedAchievements) {
  return unlockedAchievements.reduce((total, achievement) => {
    return total + POINTS_PER_RARITY[achievement.rarity]
  }, 0)
}

// 排行榜 (未来功能)
function getLeaderboard() {
  // 基于积分排序
  return allUsers.sort((a, b) => b.points - a.points)
}
```

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 成就解锁检测
- **Given** 用户完成第 1 个关卡
- **When** 关卡完成事件触发
- **Then** 应该检测到 `first_step` 成就条件满足
- **And** 显示成就解锁弹窗
- **And** 播放解锁动画
- **And** 保存到 LocalStorage

### AC2: 稀有度显示
- **Given** 用户解锁一个 "rare" 成就
- **When** 成就解锁弹窗显示
- **Then** 应该显示蓝色主题
- **And** 显示发光效果
- **And** 显示 2 星稀有度标识

### AC3: 进度类成就
- **Given** 成就需要完成 10 个关卡
- **When** 用户完成 5 个关卡
- **Then** 应该显示进度条 50%
- **And** 成就状态为 "进行中"
- **When** 用户完成第 10 个关卡
- **Then** 应该解锁成就

### AC4: 隐藏成就
- **Given** 存在隐藏成就 `secret_agent`
- **When** 用户在成就列表中查看
- **Then** 应该不显示该成就 (或显示为 "???")
- **When** 用户触发隐藏条件 (输入特殊命令)
- **Then** 应该解锁该成就
- **And** 显示特殊的 "Matrix" 效果

### AC5: 社交分享
- **Given** 用户解锁一个可分享的成就
- **When** 用户点击 "分享成就" 按钮
- **Then** 应该生成成就分享卡片
- **And** 卡片包含: 成就图标、名称、稀有度
- **And** 支持下载图片或复制链接

### AC6: 成就页面统计
- **Given** 用户访问成就页面
- **When** 页面加载完成
- **Then** 应该显示已解锁数量、解锁率、总积分
- **And** 数据与 LocalStorage 一致

---

## 🎨 UI/UX 要求

### Empty State (无成就时)
- 显示 "开始你的学习之旅，解锁第一个成就吧！"
- 显示一个锁定的成就预览

### Loading State (加载成就时)
- 显示骨架屏 `n-skeleton`

### Error State (成就数据损坏时)
- 显示 "成就数据异常，已重置"
- 自动重建数据结构

### Success State (解锁成就时)
- 全屏庆祝动画 (Legendary 成就)
- 播放音效 (可选，需用户同意)

---

## 🔧 技术约束

### 必须使用
- Vue 3 Composition API
- Naive UI (`n-modal`, `n-progress`, `n-grid`)
- LocalStorage API
- Canvas API (生成分享卡片)

### 性能要求
- 成就检测延迟 ≤ 100ms
- 动画帧率 ≥ 60fps
- 不影响游戏主流程性能

### 兼容性
- 支持所有现代浏览器
- 移动端适配 (成就弹窗响应式)

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **成就解锁率** | N/A | ≥ 80% | 完成所有基础成就的用户比例 |
| **社交分享率** | < 1% | ≥ 10% | 分享成就的用户比例 |
| **7 日留存率** | 未知 | +40% | 解锁 ≥ 3 个成就的用户留存 |
| **平均完成关卡数** | ~5 关 | ≥ 15 关 | 有成就系统的用户平均进度 |

---

## 🚧 依赖项

### 前置需求
- REQ-2.1 (提示系统) - 可选，成就可独立于提示系统

### 需要协调
- **@前端开发**: 评估动画性能，确认 60fps 可行性
- **@功能测试**: 测试成就解锁的各种触发场景

---

## 🔄 迭代计划

### Phase 1: MVP (本次迭代)
- [ ] 实现基础成就系统 (10 个成就)
- [ ] 实现解锁弹窗和动画
- [ ] 实现成就展示页面

### Phase 2: 扩展
- [ ] 添加更多成就 (总计 30+ 个)
- [ ] 实现进度类成就
- [ ] 添加隐藏成就

### Phase 3: 社交功能
- [ ] 实现成就排行榜
- [ ] 实现跨设备成就同步
- [ ] 社区成就贡献 (用户自定义成就)

---

## 📚 参考资料

### 竞品分析
- **Duolingo**: 成就系统极其成熟，有每日任务、连续打卡、技能树
- **Stack Overflow**: 奖牌系统 (Bronze, Silver, Gold) 非常简洁
- **GitHub**:Achievements (Arctic Code Vault Contributor) 激发贡献动力
- **PlayStation**: Trophy 系统 (Platinum 顶级) 诱导全收集

### 游戏化设计原则
- **PBL System**: Points (积分), Badges (徽章), Leaderboards (排行榜)
- **Intrinsic Motivation**: 内在动机 > 外在奖励
- **Flow Channel**: 难度与能力匹配，保持心流状态

### 心理学研究
- **目标梯度效应**: 接近目标时努力程度增加
- **社交证明**: 他人的成就激发竞争欲
- **完型需求**: 未完成的成就产生心理张力

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 请评估动画性能，确认是否需要使用 `canvas-confetti` 库