<template>
  <div class="game-view">
    <GenerativeBackground />

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

    <n-space vertical :size="24" v-if="!currentLevel" class="game-content">
      <!-- 关卡选择界面 -->
      <div class="game-header">
        <n-button text @click="goHome" style="margin-bottom: 16px;">
          <template #icon>
            <n-icon :component="ArrowLeftIcon" />
          </template>
          返回首页
        </n-button>
        <n-h1><n-icon :component="GameIcon" /> CLI 命令互动学习</n-h1>
        <n-text depth="3">通过模拟终端学习 Claude Code CLI 命令的使用技巧</n-text>
      </div>

      <!-- 学习指南 -->
      <n-card type="info">
        <template #header>
          <div style="display: flex; align-items: center; gap: 8px;">
            <n-icon :component="LightbulbIcon" />
            <span>新手指南</span>
          </div>
        </template>
        <n-collapse>
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
          <n-collapse-item title="💡 学习建议" name="tips">
            <ul>
              <li>按顺序学习，从"基础命令"开始</li>
              <li>每个关卡都有提示，不确定时可以查看</li>
              <li>完成所有关卡后会自动保存进度</li>
              <li>建议在真实终端中练习学到的命令</li>
            </ul>
          </n-collapse-item>
        </n-collapse>
      </n-card>

      <!-- 进度统计 -->
      <n-card>
        <n-space :size="32" justify="center">
          <n-statistic label="已完成" :value="completedLevels.length">
            <template #suffix>/ {{ LEVELS.length }}</template>
          </n-statistic>
          <n-statistic label="完成率" :value="Math.round(progressPercent)">
            <template #suffix>%</template>
          </n-statistic>
        </n-space>
      </n-card>

      <!-- 分类标签页 -->
      <n-tabs v-model:value="activeCategory" type="segment">
        <n-tab-pane name="all" tab="全部关卡">
          <div class="level-grid">
            <LevelCard
              v-for="level in LEVELS"
              :key="level.id"
              :level="level"
              :completed="completedLevels.includes(level.id)"
              @select="startLevel"
            />
          </div>
        </n-tab-pane>
        <n-tab-pane v-for="(cat, key) in LEVEL_CATEGORIES" :key="key" :name="key" :tab="cat.label">
          <div class="level-grid">
            <LevelCard
              v-for="level in LEVELS.filter(l => l.category === key)"
              :key="level.id"
              :level="level"
              :completed="completedLevels.includes(level.id)"
              @select="startLevel"
            />
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-space>

    <!-- 关卡游戏界面 -->
    <n-space vertical :size="16" v-else>
      <!-- 关卡信息 -->
      <n-card>
        <n-space align="center" justify="space-between">
          <n-space align="center">
            <n-button quaternary @click="exitLevel">
              <template #icon>
                <n-icon :component="ArrowLeftIcon" />
              </template>
              返回
            </n-button>
            <n-h3>{{ currentLevel.name }}</n-h3>
            <n-tag size="small" :type="completedLevels.includes(currentLevel.id) ? 'success' : 'default'">
              {{ completedLevels.includes(currentLevel.id) ? '已完成' : '未完成' }}
            </n-tag>
          </n-space>
          <n-tag>关卡 {{ currentLevel.id }} / {{ LEVELS.length }}</n-tag>
        </n-space>
      </n-card>

      <!-- 任务说明 -->
      <n-card title="任务目标">
        <n-p>{{ currentLevel.objective }}</n-p>
        <n-alert type="info" style="margin-top: 12px;">
          <!-- eslint-disable-next-line vue/no-v-html -- 内容来自静态数据，XSS 风险可控 -->
          <div v-html="currentLevel.task.replace(/`/g, '').replace(/\n/g, '<br>')"></div>
        </n-alert>
      </n-card>

      <!-- 终端 (CLI 关卡) -->
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

      <!-- 完成卡片 - 显示在任务完成后 -->
      <n-card v-if="showCompletionCard" class="completion-card" type="success">
        <template #header>
          <div class="completion-header">
            <span class="completion-icon">🎉</span>
            <span class="completion-title">关卡完成！</span>
          </div>
        </template>
        <div class="completion-content">
          <p class="completion-message">恭喜完成 "{{ currentLevel.name }}"</p>
          <p v-if="earnedBadge" class="completion-badge">获得徽章：{{ earnedBadge.name }}</p>
        </div>
        <template #footer>
          <n-space justify="center">
            <n-button
              v-if="nextLevelData"
              type="primary"
              size="large"
              @click="goToNextLevel"
            >
              <template #icon>
                <n-icon :component="CheckIcon" />
              </template>
              下一关
            </n-button>
            <n-button size="large" @click="exitLevel">
              返回列表
            </n-button>
          </n-space>
        </template>
      </n-card>

      <!-- 完成按钮 - 未完成时显示 -->
      <n-card v-else>
        <n-space justify="center">
          <n-button
            type="primary"
            size="large"
            :disabled="!allRequiredCompleted"
            @click="completeLevel"
          >
            <template #icon>
              <n-icon :component="CheckIcon" />
            </template>
            {{ allRequiredCompleted ? '完成关卡' : `完成任务 (${completedRequired}/${totalRequired})` }}
          </n-button>
          <n-button size="large" @click="skipLevel">
            <template #icon>
              <n-icon :component="SkipIcon" />
            </template>
            跳过
          </n-button>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  NCard, NSpace, NH1, NH3, NText, NIcon, NButton, NTag, NTabs, NTabPane,
  NStatistic, NP, NAlert, NCollapse, NCollapseItem, NModal
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
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fc 0%, #f0f2f5 100%);
}

.game-content {
  position: relative;
  z-index: 2;
}

.game-header {
  text-align: center;
  padding: 20px;
}

.level-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

/* 浮动分享按钮 */
.share-fab {
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 100;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.share-fab:hover {
  animation: none;
  transform: scale(1.1);
}

/* Modal 样式覆盖 */
:deep(.n-card) {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

/* 完成卡片样式 */
.completion-card {
  animation: slideIn 0.3s ease-out;
}

.completion-header {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}

.completion-icon {
  font-size: 28px;
  animation: bounce 0.5s ease-out;
}

.completion-title {
  color: #10b981;
}

.completion-content {
  text-align: center;
  padding: 12px 0;
}

.completion-message {
  font-size: 16px;
  color: #1a1a2e;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.completion-badge {
  font-size: 14px;
  color: #ec4899;
  margin: 0;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  padding: 8px 16px;
  background: rgba(236, 72, 153, 0.1);
  border-radius: 8px;
  display: inline-block;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}
</style>
