<template>
  <div class="game-view">
    <n-space vertical :size="24" v-if="!currentLevel">
      <!-- 关卡选择界面 -->
      <div class="game-header">
        <n-h1><n-icon :component="GameIcon" /> 互动学习游戏</n-h1>
        <n-text depth="3">通过模拟终端学习 Claude Code CLI 命令</n-text>
      </div>

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
          <div v-html="currentLevel.task.replace(/`/g, '').replace(/\n/g, '<br>')"></div>
        </n-alert>
      </n-card>

      <!-- 终端 -->
      <TerminalComponent
        :responses="TERMINAL_RESPONSES"
        :required-commands="currentLevel.requiredCommands"
        @command-executed="handleCommand"
        @all-completed="handleAllCompleted"
      />

      <!-- 完成按钮 -->
      <n-card>
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
            {{ allRequiredCompleted ? '完成关卡' : `完成任务 (${completedRequired}/${currentLevel.requiredCommands.length})` }}
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
import { useDialog } from 'naive-ui'
import {
  NCard, NSpace, NH1, NH3, NText, NIcon, NButton, NTag, NTabs, NTabPane,
  NStatistic, NP, NAlert
} from 'naive-ui'
import {
  Gamepad as GameIcon, ArrowLeft as ArrowLeftIcon, Check as CheckIcon,
  Forward as SkipIcon
} from '@vicons/fa'
import { LEVELS, LEVEL_CATEGORIES, TERMINAL_RESPONSES, PROGRESS_KEY } from '@/data/game-data'
import LevelCard from '@/components/LevelCard.vue'
import TerminalComponent from '@/components/TerminalComponent.vue'

const dialog = useDialog()

const activeCategory = ref('all')
const currentLevel = ref(null)
const completedLevels = ref([])
const completedRequired = ref(0)
const allRequiredCompleted = ref(false)

const progressPercent = computed(() => {
  return (completedLevels.value.length / LEVELS.length) * 100
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
}

// 退出关卡
function exitLevel() {
  currentLevel.value = null
}

// 处理命令执行
function handleCommand({ command, wasRequired }) {
  if (wasRequired) {
    completedRequired.value++
    if (completedRequired.value >= currentLevel.value.requiredCommands.length) {
      allRequiredCompleted.value = true
    }
  }
}

// 所有必需命令完成
function handleAllCompleted() {
  allRequiredCompleted.value = true
}

// 完成关卡
function completeLevel() {
  if (!completedLevels.value.includes(currentLevel.value.id)) {
    completedLevels.value.push(currentLevel.value.id)
    saveProgress()
  }

  dialog.success({
    title: '🎉 关卡完成！',
    content: `恭喜完成 "${currentLevel.value.name}"`,
    positiveText: '继续',
    onPositiveClick: () => {
      exitLevel()
    }
  })
}

// 跳过关卡
function skipLevel() {
  dialog.warning({
    title: '跳过关卡',
    content: '跳过不会标记关卡为完成，确定吗？',
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      exitLevel()
    }
  })
}

// 保存进度
function saveProgress() {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify({
    completed: completedLevels.value
  }))
}
</script>

<style scoped>
.game-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
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
</style>
