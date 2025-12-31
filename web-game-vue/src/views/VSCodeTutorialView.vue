<template>
  <div class="vscode-tutorial-view">
    <!-- 顶部导航 -->
    <div class="tutorial-header">
      <n-button text @click="goBack" style="color: #ccc;">
        <template #icon>
          <n-icon :component="ArrowLeftIcon" />
        </template>
        返回首页
      </n-button>
      <n-h2 style="margin: 0; color: #fff;">Claude Code VS Code 插件教程</n-h2>
      <div class="progress-badge">
        步骤 {{ currentStep + 1 }} / {{ totalSteps }}
      </div>
    </div>

    <!-- 主体区域 -->
    <div class="tutorial-content">
      <!-- 左侧：引导面板 -->
      <div class="guide-panel">
        <n-card>
          <template #header>
            <div class="guide-header">
              <n-icon :component="LightbulbIcon" size="24" color="#f59e0b" />
              <h3>{{ currentStepData.title }}</h3>
            </div>
          </template>

          <div class="guide-body">
            <p class="guide-description">{{ currentStepData.description }}</p>

            <!-- 步骤详情 -->
            <div v-if="currentStepData.details" class="guide-details">
              <n-collapse>
                <n-collapse-item title="查看详细说明">
                  <ul>
                    <li v-for="(detail, index) in currentStepData.details" :key="index">
                      {{ detail }}
                    </li>
                  </ul>
                </n-collapse-item>
              </n-collapse>
            </div>

            <!-- 快捷键提示 -->
            <n-alert v-if="currentStepData.shortcut" type="info" style="margin-top: 16px;">
              <template #icon>
                <n-icon :component="KeyboardIcon" />
              </template>
              <strong>快捷键：</strong> {{ currentStepData.shortcut }}
            </n-alert>

            <!-- 操作提示 -->
            <div v-if="currentStepData.action" class="action-tip">
              <n-icon :component="HandPointerIcon" />
              <span>{{ currentStepData.action }}</span>
            </div>
          </div>

          <template #footer>
            <div class="guide-footer">
              <n-button
                :disabled="currentStep === 0"
                @click="previousStep"
                quaternary
              >
                上一步
              </n-button>
              <n-space>
                <n-button
                  v-if="!isLastStep"
                  type="primary"
                  @click="nextStep"
                >
                  下一步
                </n-button>
                <n-button
                  v-else
                  type="success"
                  @click="completeTutorial"
                >
                  完成教程
                </n-button>
              </n-space>
            </div>
          </template>
        </n-card>

        <!-- 步骤列表 -->
        <n-card style="margin-top: 16px;">
          <template #header>
            <h4>教程目录</h4>
          </template>
          <div class="step-list">
            <div
              v-for="(step, index) in tutorialSteps"
              :key="index"
              :class="['step-item', {
                active: currentStep === index,
                completed: completedSteps.has(index)
              }]"
              @click="goToStep(index)"
            >
              <div class="step-number">{{ index + 1 }}</div>
              <div class="step-info">
                <div class="step-title">{{ step.title }}</div>
                <div class="step-desc">{{ step.shortDesc }}</div>
              </div>
            </div>
          </div>
        </n-card>
      </div>

      <!-- 右侧：Claude Code 面板演示 -->
      <div class="demo-panel">
        <ClaudeCodePanel :demo-mode="true" @action="handleDemoAction" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  NCard, NButton, NIcon, NSpace, NAlert, NCollapse, NCollapseItem
} from 'naive-ui'
import {
  ArrowLeft as ArrowLeftIcon,
  Lightbulb as LightbulbIcon,
  Keyboard as KeyboardIcon,
  HandPointer as HandPointerIcon
} from '@vicons/fa'
import ClaudeCodePanel from '@/components/ClaudeCodePanel.vue'

const router = useRouter()

// 教程步骤
const tutorialSteps = [
  {
    title: '认识 Claude Code 面板',
    shortDesc: '了解面板界面布局',
    description: 'Claude Code 面板是你与 Claude 交互的主要界面。面板包含工具栏、对话历史和输入区域。',
    details: [
      '顶部工具栏：新对话、历史记录、设置等功能',
      '对话历史：显示你与 Claude 的所有对话',
      '输入区域：底部输入框，支持 @文件名 引用文件',
      '消息气泡：用户消息显示在右侧，Claude 回复显示在左侧'
    ],
    action: '观察面板布局，点击各个按钮查看功能',
    highlight: 'toolbar'
  },
  {
    title: '发送第一条消息',
    shortDesc: '学习如何与 Claude 对话',
    description: '在输入框中输入你的问题或需求，然后按 Enter 键发送（Shift+Enter 换行）。',
    details: [
      '输入框支持多行输入',
      'Enter 发送，Shift+Enter 换行',
      'Claude 会记住对话上下文',
      '可以发送代码、问题、需求等任何内容'
    ],
    shortcut: 'Enter 发送，Shift+Enter 换行',
    action: '在输入框中输入"你好"并点击发送按钮',
    highlight: 'input'
  },
  {
    title: '@-mention 文件引用',
    shortDesc: '让 Claude 了解文件内容',
    description: '@文件名 功能让你将文件内容引用到对话中，Claude 可以看到并分析这些文件。',
    details: [
      '点击输入框上方的"引用文件"按钮',
      '在弹出的文件列表中选择文件',
      '或在输入框中直接输入 @文件名',
      '被引用的文件会显示在输入框上方'
    ],
    action: '点击"引用文件"按钮，选择一个文件',
    highlight: 'mention'
  },
  {
    title: '查看代码差异',
    shortDesc: '理解 Claude 建议的修改',
    description: '当 Claude 建议修改代码时，会以 diff 形式展示。红色表示删除，绿色表示新增。',
    details: [
      '代码差异会显示在消息中',
      '红色背景：被删除的内容',
      '绿色背景：新增的内容',
      '可以清晰看到每一处改动'
    ],
    action: '发送"优化这段代码"来查看代码差异',
    highlight: 'diff'
  },
  {
    title: '应用或拒绝修改',
    shortDesc: '控制代码变更',
    description: '对于 Claude 建议的修改，你可以选择接受或拒绝。',
    details: [
      '点击"接受"按钮应用修改',
      '点击"拒绝"按钮忽略建议',
      '修改会被应用到实际文件',
      '可以在 VS Code 源代码管理中查看'
    ],
    action: '在代码差异下方点击"接受"或"拒绝"按钮',
    highlight: 'diff-actions'
  },
  {
    title: '多对话管理',
    shortDesc: '同时处理多个任务',
    description: 'Claude Code 支持同时进行多个独立的对话，方便你处理不同的任务。',
    details: [
      '点击工具栏的新对话图标',
      '每个对话有独立的历史记录',
      '对话之间不会相互干扰',
      '可以在不同对话间切换'
    ],
    shortcut: 'Cmd+N (Mac) 或 Ctrl+N (Windows)',
    action: '点击工具栏的新对话图标',
    highlight: 'new-chat'
  },
  {
    title: '其他功能',
    shortDesc: '了解更多实用功能',
    description: 'Claude Code 还有许多其他实用功能，如图片识别、文件附件等。',
    details: [
      '插入图片：让 Claude 分析截图',
      '附加文件：发送文件给 Claude',
      '切换模型：在不同 Claude 模型间切换',
      '复制消息：快速复制 Claude 的回复'
    ],
    action: '尝试使用输入框上方的其他功能按钮',
    highlight: 'toolbar'
  },
  {
    title: '实战场景',
    shortDesc: '综合运用所学技能',
    description: '通过一个完整的实战场景来综合运用所学技能。',
    details: [
      '场景：你有一个 index.js 文件需要优化',
      '步骤：1. 引用文件 → 2. 描述需求 → 3. 查看差异 → 4. 应用修改',
      '可以尝试发送："帮我优化 @index.js 中的代码"'
    ],
    action: '按照场景描述完成操作流程',
    highlight: 'workflow'
  }
]

const currentStep = ref(0)
const completedSteps = ref(new Set())

const totalSteps = computed(() => tutorialSteps.length)
const currentStepData = computed(() => tutorialSteps[currentStep.value])
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)

function nextStep() {
  if (currentStep.value < totalSteps.value - 1) {
    completedSteps.value.add(currentStep.value)
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function goToStep(index) {
  currentStep.value = index
}

function handleDemoAction(action) {
  console.log('Demo action:', action)
  // 可以根据动作执行特定逻辑
}

function completeTutorial() {
  completedSteps.value.add(currentStep.value)
  router.push('/')
}

function goBack() {
  router.push('/')
}
</script>

<style scoped>
.vscode-tutorial-view {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
}

/* 顶部导航 */
.tutorial-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.progress-badge {
  padding: 8px 16px;
  background: rgba(99, 102, 241, 0.2);
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: 20px;
  color: #a5b4fc;
  font-size: 14px;
  font-weight: 500;
}

/* 主体区域 */
.tutorial-content {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px 32px;
  overflow: hidden;
}

/* 引导面板 */
.guide-panel {
  width: 400px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.guide-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.guide-header h3 {
  margin: 0;
  font-size: 18px;
  color: #fff;
}

.guide-body {
  margin-bottom: 16px;
}

.guide-description {
  font-size: 15px;
  line-height: 1.7;
  color: #d1d5db;
  margin-bottom: 16px;
}

.guide-details ul {
  margin: 0;
  padding-left: 20px;
}

.guide-details li {
  font-size: 14px;
  line-height: 1.8;
  color: #9ca3af;
  margin: 8px 0;
}

.action-tip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 16px;
  background: rgba(251, 191, 36, 0.1);
  border: 1px solid rgba(251, 191, 36, 0.2);
  border-radius: 8px;
  color: #fcd34d;
  font-size: 14px;
}

.guide-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 步骤列表 */
.step-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.step-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.step-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.step-item.active {
  background: rgba(99, 102, 241, 0.1);
  border-left: 3px solid #6366f1;
}

.step-item.completed {
  opacity: 0.7;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: #9ca3af;
  flex-shrink: 0;
}

.step-item.active .step-number {
  background: #6366f1;
  color: #fff;
}

.step-item.completed .step-number {
  background: #10b981;
  color: #fff;
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 14px;
  font-weight: 500;
  color: #e5e7eb;
}

.step-desc {
  font-size: 12px;
  color: #6b7280;
  margin-top: 2px;
}

/* 演示面板 */
.demo-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  padding: 16px;
  overflow: hidden;
}

@media (max-width: 1024px) {
  .tutorial-content {
    flex-direction: column;
    overflow-y: auto;
  }

  .guide-panel {
    width: 100%;
  }

  .demo-panel {
    min-height: 500px;
  }
}
</style>
