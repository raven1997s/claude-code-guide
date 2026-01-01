<template>
  <div class="game-view">
    <GenerativeBackground />
    <!-- 新增动态 Mesh Gradient 背景 -->
    <PageBackground />

    <!-- 浮动分享按钮 -->
    <n-button
      v-if="!currentLevel"
      class="share-fab"
      circle
      size="large"
      type="primary"
      @click="showShareModal = true"
    >
      <template #icon>
        <n-icon :component="ShareIcon" />
      </template>
    </n-button>

    <!-- 分享卡片弹窗 -->
    <n-modal
      v-model:show="showShareModal"
      preset="card"
      title="生成分享卡片"
      style="width: 600px; max-width: 90vw;"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <ShareCard
        :completed-levels="completedLevels"
        :total-levels="LEVELS.length"
      />
    </n-modal>

    <n-space vertical :size="32" v-if="!currentLevel" class="game-content">
      <!-- 关卡选择界面 -->
      <div class="game-header glass-card">
        <div class="header-left">
          <n-button text @click="goHome" class="back-link">
            <template #icon>
              <n-icon :component="ArrowLeftIcon" />
            </template>
            返回首页
          </n-button>
          <h1 class="page-title">
            <span class="icon-wrapper">
              <n-icon :component="GameIcon" />
            </span>
            CLI 关卡挑战
          </h1>
          <p class="page-subtitle">完成关卡，点亮技能树，成为命令行专家</p>
        </div>
        
        <!-- 环形进度条 -->
        <div class="header-right">
          <div class="progress-ring-container">
            <svg class="progress-ring" width="80" height="80">
              <circle
                class="progress-ring-circle-bg"
                stroke="rgba(255, 255, 255, 0.1)"
                stroke-width="6"
                fill="transparent"
                r="36"
                cx="40"
                cy="40"
              />
              <circle
                class="progress-ring-circle"
                stroke="var(--color-success)"
                stroke-width="6"
                fill="transparent"
                r="36"
                cx="40"
                cy="40"
                :style="{ strokeDashoffset: progressOffset, strokeDasharray: circumference }"
              />
            </svg>
            <div class="progress-text">
              <span class="progress-value">{{ Math.round(progressPercent) }}%</span>
            </div>
          </div>
          <div class="progress-label">总体进度</div>
        </div>
      </div>

      <!-- 学习指南 -->
      <div class="guide-section glass-card">
        <div class="section-header">
          <n-icon :component="LightbulbIcon" />
          <span>新手指南</span>
        </div>
        <n-collapse display-directive="show" arrow-placement="right">
          <n-collapse-item title="📚 什么是 Claude Code CLI？" name="what">
            <p>Claude Code CLI 是一个命令行工具，让你在终端中直接与 Claude AI 进行交互。它可以：</p>
            <ul>
              <li>理解并编写代码</li>
              <li>执行终端命令</li>
              <li>读取和修改文件</li>
              <li>协助 Git 操作</li>
            </ul>
          </n-collapse-item>
          <n-collapse-item title="🎮 如何使用本教程？" name="how">
            <p>通过互动游戏的方式学习 CLI 命令：</p>
            <ol>
              <li>选择一个关卡开始</li>
              <li>阅读任务目标</li>
              <li>在模拟终端中输入命令</li>
              <li>查看反馈并完成关卡</li>
            </ol>
          </n-collapse-item>
        </n-collapse>
      </div>

      <!-- 分类标签页 -->
      <n-tabs v-model:value="activeCategory" type="segment" animated>
        <n-tab-pane name="all" tab="全部关卡">
          <div class="level-grid">
            <div
              v-for="level in LEVELS"
              :key="level.id"
              class="level-card-wrapper animate-fade-in-up"
            >
              <LevelCard
                :level="level"
                :completed="completedLevels.includes(level.id)"
                @select="startLevel"
              />
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane v-for="(cat, key) in LEVEL_CATEGORIES" :key="key" :name="key" :tab="cat.label">
          <div class="level-grid">
            <div
              v-for="level in LEVELS.filter(l => l.category === key)"
              :key="level.id"
              class="level-card-wrapper animate-fade-in-up"
            >
              <LevelCard
                :level="level"
                :completed="completedLevels.includes(level.id)"
                @select="startLevel"
              />
            </div>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-space>

    <!-- 关卡游戏界面 -->
    <n-space vertical :size="24" v-else class="game-content">
      <!-- 关卡信息 -->
      <div class="level-header glass-card">
        <div class="level-header-top">
          <n-button quaternary @click="exitLevel" class="back-btn">
            <template #icon>
              <n-icon :component="ArrowLeftIcon" />
            </template>
            返回列表
          </n-button>
          <div class="level-badges">
            <n-tag size="small" :type="completedLevels.includes(currentLevel.id) ? 'success' : 'default'" round>
              {{ completedLevels.includes(currentLevel.id) ? '已完成' : '挑战中' }}
            </n-tag>
            <n-tag size="small" type="info" round>
              关卡 {{ currentLevel.id }} / {{ LEVELS.length }}
            </n-tag>
          </div>
        </div>
        <h2 class="level-title">{{ currentLevel.name }}</h2>
        <p class="level-objective">{{ currentLevel.objective }}</p>
        
        <div class="task-box">
          <div class="task-label">当前任务</div>
           <!-- eslint-disable-next-line vue/no-v-html -->
          <div class="task-desc" v-html="currentLevel.task.replace(/`/g, '').replace(/\n/g, '<br>')"></div>
        </div>
      </div>

      <!-- 终端 (CLI 关卡) -->
      <div class="terminal-wrapper glass-card no-padding">
        <TerminalComponent
          v-if="currentLevel.category !== 'vscode'"
          ref="terminalRef"
          :responses="TERMINAL_RESPONSES"
          :required-commands="currentLevel.requiredCommands"
          @command-executed="handleCommand"
          @all-completed="handleAllCompleted"
        />

        <!-- VS Code 插件 (VS Code 关卡) -->
        <VSCodeComponent
          v-else
          ref="vscodeRef"
          :panel-only="true"
          :level-data="currentLevel"
          :conversations="VSCODE_CONVERSATIONS"
          :required-actions="currentLevel.requiredActions || []"
          :virtual-files="getFilesForLevel(currentLevel.id)"
          @action-completed="handleVSCodeAction"
          @all-completed="handleAllCompleted"
        />
      </div>

      <!-- 完成卡片 - 显示在任务完成后 -->
      <div v-if="showCompletionCard" class="completion-card glass-card animate-scale-in">
        <div class="completion-content">
          <div class="completion-icon">🎉</div>
          <h3 class="completion-title">挑战成功！</h3>
          <p class="completion-message">恭喜完成 "{{ currentLevel.name }}"</p>
          <p v-if="earnedBadge" class="completion-badge">
            <n-icon :component="CheckIcon" /> 获得徽章：{{ earnedBadge.name }}
          </p>
          
          <div class="completion-actions">
            <n-button
              v-if="nextLevelData"
              type="primary"
              size="large"
              class="action-btn"
              @click="goToNextLevel"
            >
              <template #icon>
                <n-icon :component="CheckIcon" />
              </template>
              下一关
            </n-button>
            <n-button size="large" class="action-btn" @click="exitLevel">
              返回列表
            </n-button>
          </div>
        </div>
      </div>

      <!-- 完成按钮 - 未完成时显示 -->
      <div v-else class="control-bar glass-card">
        <n-space justify="center">
          <n-button
            type="primary"
            size="large"
            :disabled="!allRequiredCompleted"
            @click="completeLevel"
            class="control-btn"
          >
            <template #icon>
              <n-icon :component="CheckIcon" />
            </template>
            {{ allRequiredCompleted ? '完成关卡' : `完成任务 (${completedRequired}/${totalRequired})` }}
          </n-button>
          <n-button size="large" @click="skipLevel" class="control-btn">
            <template #icon>
              <n-icon :component="SkipIcon" />
            </template>
            跳过
          </n-button>
        </n-space>
      </div>
    </n-space>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  NSpace, NIcon, NButton, NTag, NTabs, NTabPane,
  NCollapse, NCollapseItem, NModal
} from 'naive-ui'
import {
  Gamepad as GameIcon, ArrowLeft as ArrowLeftIcon, Check as CheckIcon,
  Forward as SkipIcon, Lightbulb as LightbulbIcon, ShareAlt as ShareIcon
} from '@vicons/fa'
import { LEVELS, LEVEL_CATEGORIES, TERMINAL_RESPONSES, PROGRESS_KEY } from '@/data/game-data'
import { VSCODE_CONVERSATIONS, getFilesForLevel } from '@/data/vscode-data'
import { getLevelBadge } from '@/data/badge-data'
import LevelCard from '@/components/LevelCard.vue'
import TerminalComponent from '@/components/TerminalComponent.vue'
import VSCodeComponent from '@/components/VSCodeComponent.vue'
import GenerativeBackground from '@/components/GenerativeBackground.vue'
import PageBackground from '@/components/PageBackground.vue'
import ShareCard from '@/components/ShareCard.vue'

const router = useRouter()

const activeCategory = ref('all')
const currentLevel = ref(null)
const completedLevels = ref([])
const completedRequired = ref(0)
const allRequiredCompleted = ref(false)
const showShareModal = ref(false)

// 组件 refs
const terminalRef = ref(null)
const vscodeRef = ref(null)

// 完成状态
const showCompletionCard = ref(false)
const earnedBadge = ref(null)
const nextLevelData = ref(null)

const progressPercent = computed(() => {
  return (completedLevels.value.length / LEVELS.length) * 100
})

// 环形进度条参数
const radius = 36
const circumference = 2 * Math.PI * radius
const progressOffset = computed(() => {
  const percent = progressPercent.value
  return circumference - (percent / 100) * circumference
})

// 获取当前关卡的总任务数（兼容 requiredCommands 和 requiredActions）
const totalRequired = computed(() => {
  if (!currentLevel.value) return 0
  return currentLevel.value.requiredCommands?.length ||
         currentLevel.value.requiredActions?.length ||
         0
})

// 加载进度
onMounted(() => {
  const saved = localStorage.getItem(PROGRESS_KEY)
  if (saved) {
    const data = JSON.parse(saved)
    completedLevels.value = data.completed || []
  }
})

// 开始关卡
function startLevel(level) {
  currentLevel.value = level
  completedRequired.value = 0
  allRequiredCompleted.value = false
  // 清除完成状态
  showCompletionCard.value = false
  earnedBadge.value = null
  nextLevelData.value = null
  // 清除终端输出
  if (terminalRef.value) {
    terminalRef.value.clear()
  }
  if (vscodeRef.value && vscodeRef.value.clear) {
    vscodeRef.value.clear()
  }
}

// 退出关卡
function exitLevel() {
  currentLevel.value = null
}

// 处理命令执行
function handleCommand({ command: _command, wasRequired }) {
  if (wasRequired) {
    completedRequired.value++
    const total = currentLevel.value.requiredCommands?.length || 0
    if (total > 0 && completedRequired.value >= total) {
      allRequiredCompleted.value = true
    }
  }
}

// 处理 VS Code 动作
function handleVSCodeAction({ wasRequired }) {
  if (wasRequired) {
    completedRequired.value++
    const total = currentLevel.value.requiredActions?.length || 0
    if (total > 0 && completedRequired.value >= total) {
      allRequiredCompleted.value = true
    }
  }
}

// 所有必需命令完成
function handleAllCompleted() {
  allRequiredCompleted.value = true
}

// 获取下一关
function getNextLevel() {
  const currentIndex = LEVELS.findIndex(l => l.id === currentLevel.value.id)
  if (currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1]
  }
  return null
}

// 完成关卡
function completeLevel() {
  const isNewCompletion = !completedLevels.value.includes(currentLevel.value.id)
  if (isNewCompletion) {
    completedLevels.value.push(currentLevel.value.id)
    saveProgress()
  }

  // 获取关卡徽章和下一关
  const badge = getLevelBadge(currentLevel.value.id)
  const nextLevel = getNextLevel()

  // 设置完成状态
  showCompletionCard.value = true
  earnedBadge.value = isNewCompletion ? badge : null
  nextLevelData.value = nextLevel
}

// 进入下一关
function goToNextLevel() {
  if (nextLevelData.value) {
    startLevel(nextLevelData.value)
  }
}

// 跳过关卡
function skipLevel() {
  // 直接退出，跳过不标记为完成
  exitLevel()
}

// 保存进度
function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({
    completed: completedLevels.value
  }))
}

// 返回首页
function goHome() {
  router.push('/')
}
</script>

<style scoped>
.game-view {
  min-height: 100vh;
  /* 背景由 PageBackground 接管 */
}

.game-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-8) var(--spacing-6);
}

/* ========================================
   Game Header (Glassmorphism)
   ======================================== */
.game-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-8);
  /* .glass-card 样式在全局 */
}

.header-left {
  flex: 1;
}

.back-link {
  margin-bottom: var(--spacing-4);
  color: var(--color-text-secondary);
}

.page-title {
  font-size: var(--text-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.icon-wrapper {
  color: var(--color-primary-500);
  background: rgba(99, 102, 241, 0.1);
  padding: 8px;
  border-radius: var(--radius-md);
  display: flex;
}

.page-subtitle {
  color: var(--color-text-secondary);
  font-size: var(--text-base);
  margin: 0;
}

/* ========================================
   Progress Ring
   ======================================== */
.header-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-2);
}

.progress-ring-container {
  position: relative;
  width: 80px;
  height: 80px;
}

.progress-ring {
  transform: rotate(-90deg);
}

.progress-ring-circle-bg {
  transition: stroke 0.3s;
}

.progress-ring-circle {
  transition: stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  stroke-linecap: round;
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-value {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.progress-label {
  font-size: var(--text-xs);
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-medium);
}

/* ========================================
   Guide Section
   ======================================== */
.guide-section {
  padding: var(--spacing-6);
  margin-bottom: var(--spacing-8);
}

.section-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-4);
  color: var(--color-primary-600);
}

/* ========================================
   Level Grid
   ======================================== */
.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-6);
  padding: var(--spacing-2);
}

.level-card-wrapper {
  height: 100%;
}

/* ========================================
   Level Header
   ======================================== */
.level-header {
  padding: var(--spacing-6);
}

.level-header-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--spacing-4);
}

.level-badges {
  display: flex;
  gap: var(--spacing-2);
}

.level-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--spacing-2) 0;
  color: var(--color-text-primary);
}

.level-objective {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-6) 0;
}

.task-box {
  background: var(--color-bg-tertiary);
  border-radius: var(--radius-md);
  padding: var(--spacing-4);
  border-left: 4px solid var(--color-primary-500);
}

.task-label {
  font-size: var(--text-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  text-transform: uppercase;
  margin-bottom: var(--spacing-2);
}

.task-desc {
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--color-text-primary);
}

/* ========================================
   Completion Card
   ======================================== */
.completion-card {
  text-align: center;
  padding: var(--spacing-8);
  border: 1px solid var(--color-success);
  background: linear-gradient(
    135deg,
    rgba(16, 185, 129, 0.1) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
}

.completion-icon {
  font-size: 48px;
  margin-bottom: var(--spacing-4);
  animation: bounce 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.completion-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-success);
  margin: 0 0 var(--spacing-2) 0;
}

.completion-message {
  font-size: var(--text-lg);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-4) 0;
}

.completion-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: rgba(16, 185, 129, 0.1);
  color: var(--color-success);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
}

.completion-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  margin-top: var(--spacing-6);
}

/* ========================================
   Control Bar
   ======================================== */
.control-bar {
  padding: var(--spacing-6);
}

/* ========================================
   Utilities
   ======================================== */
.no-padding {
  padding: 0 !important;
  overflow: hidden;
}

.share-fab {
  position: fixed;
  bottom: var(--spacing-8);
  right: var(--spacing-8);
  z-index: var(--z-fixed);
  box-shadow: var(--shadow-primary);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* 响应式 */
@media (max-width: 768px) {
  .game-header {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-6);
  }

  .level-grid {
    grid-template-columns: 1fr;
  }

  .completion-actions {
    flex-direction: column;
  }

  .action-btn, .control-btn {
    width: 100%;
  }
}
</style>
