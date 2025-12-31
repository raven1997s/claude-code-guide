<template>
  <div class="game-view">
    <n-space vertical :size="24" v-if="!currentLevel">
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
        :responses="TERMINAL_RESPONSES"
        :required-commands="currentLevel.requiredCommands"
        @command-executed="handleCommand"
        @all-completed="handleAllCompleted"
      />

      <!-- VS Code 插件 (VS Code 关卡) -->
      <VSCodeComponent
        v-else
        :panel-only="true"
        :level-data="currentLevel"
        :conversations="VSCODE_CONVERSATIONS"
        :required-actions="currentLevel.requiredActions || []"
        :virtual-files="getFilesForLevel(currentLevel.id)"
        @action-completed="handleVSCodeAction"
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
import { useDialog } from 'naive-ui'
import {
  NCard, NSpace, NH1, NH3, NText, NIcon, NButton, NTag, NTabs, NTabPane,
  NStatistic, NP, NAlert, NCollapse, NCollapseItem
} from 'naive-ui'
import {
  Gamepad as GameIcon, ArrowLeft as ArrowLeftIcon, Check as CheckIcon,
  Forward as SkipIcon, Lightbulb as LightbulbIcon
} from '@vicons/fa'
import { LEVELS, LEVEL_CATEGORIES, TERMINAL_RESPONSES, PROGRESS_KEY } from '@/data/game-data'
import { VSCODE_CONVERSATIONS, getFilesForLevel } from '@/data/vscode-data'
import LevelCard from '@/components/LevelCard.vue'
import TerminalComponent from '@/components/TerminalComponent.vue'
import VSCodeComponent from '@/components/VSCodeComponent.vue'

const dialog = useDialog()
const router = useRouter()

const activeCategory = ref('all')
const currentLevel = ref(null)
const completedLevels = ref([])
const completedRequired = ref(0)
const allRequiredCompleted = ref(false)

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
  if (!completedLevels.value.includes(currentLevel.value.id)) {
    completedLevels.value.push(currentLevel.value.id)
    saveProgress()
  }

  const nextLevel = getNextLevel()

  if (nextLevel) {
    // 有下一关，显示对话框并提供继续下一关选项
    dialog.success({
      title: '🎉 关卡完成！',
      content: `恭喜完成 "${currentLevel.value.name}"`,
      positiveText: '下一关',
      negativeText: '返回列表',
      onPositiveClick: () => {
        startLevel(nextLevel)
      },
      onNegativeClick: () => {
        exitLevel()
      }
    })
  } else {
    // 已完成所有关卡
    dialog.success({
      title: '🏆 恭喜通关！',
      content: '你已经完成了所有关卡！',
      positiveText: '返回列表',
      onPositiveClick: () => {
        exitLevel()
      }
    })
  }
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

// 返回首页
function goHome() {
  router.push('/')
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
