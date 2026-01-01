<template>
  <div class="vscode-tutorial-view">
    <!-- 顶部导航 -->
    <div class="tutorial-header">
      <n-button text @click="goBack" :style="{ color: 'var(--color-text-secondary)' }">
        <template #icon>
          <n-icon :component="ArrowLeftIcon" />
        </template>
        返回首页
      </n-button>
      <n-h2 style="margin: 0;">Claude Code VS Code 插件教程</n-h2>
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
        <ClaudeCodePanel
          :demo-mode="true"
          :messages="demoMessages"
          :is-typing="isTyping"
          @send-message="handleSendMessage"
          @action="handleDemoAction"
        />
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

// 教程步骤 - 基于官方文档重新设计
const tutorialSteps = [
  {
    title: '认识 Claude Code VS Code 扩展',
    shortDesc: '了解扩展功能概览',
    description: 'Claude Code VS Code 扩展让你能够通过集成在 IDE 中的原生图形界面实时查看 Claude 的更改。相比终端，它提供了更直观的可视化体验。',
    details: [
      '原生 IDE 体验：通过侧边栏的 Spark 图标访问',
      '计划模式：在接受之前查看和编辑 Claude 的计划',
      '自动接受编辑模式：在 Claude 进行更改时自动应用',
      '文件管理：使用 @-mention 或文件选择器附加文件',
      'MCP 服务器支持：使用通过 CLI 配置的 MCP 服务器',
      '对话历史：轻松访问过去的对话',
      '多会话：同时运行多个 Claude Code 会话',
      '键盘快捷键：支持 CLI 中的大多数快捷键',
      '斜杠命令：直接在扩展中访问大多数斜杠命令'
    ],
    action: '观察右侧面板，这是真实的 Claude Code 扩展界面',
    highlight: 'overview'
  },
  {
    title: '启动扩展与界面布局',
    shortDesc: '了解如何打开扩展和界面结构',
    description: '安装扩展后，点击 VS Code 编辑器侧边栏中的 Spark (⚡) 图标即可打开 Claude Code 面板。',
    details: [
      'Spark 图标位于 VS Code 左侧活动栏',
      '点击图标打开 Claude Code 侧边栏面板',
      '面板包含：对话历史区域、消息输入框、工具栏',
      '将侧边栏拖宽可以更好地查看内联差异'
    ],
    action: '点击 VS Code 侧边栏的 Spark (⚡) 图标',
    highlight: 'sidebar'
  },
  {
    title: '发送第一条消息',
    shortDesc: '学习如何与 Claude 对话',
    description: '在输入框中输入你的问题或需求，然后按 Enter 键发送（Shift+Enter 换行）。使用方式与 CLI 版本完全相同。',
    details: [
      '输入框支持多行输入',
      'Enter 发送消息，Shift+Enter 换行',
      'Claude 会记住对话的完整上下文',
      '可以发送代码、问题、需求等任何内容'
    ],
    shortcut: 'Enter 发送，Shift+Enter 换行',
    action: '在输入框中输入"你好"并点击发送',
    highlight: 'input'
  },
  {
    title: '@-mention 文件引用',
    shortDesc: '让 Claude 了解文件内容',
    description: '使用 @文件名 功能将文件内容引用到对话中。你可以通过两种方式引用文件：输入 @符号自动完成，或使用文件选择器。',
    details: [
      '输入 @ 符号会触发文件自动完成',
      '点击输入框上方的文件图标打开选择器',
      '被引用的文件会显示在输入框上方',
      'Claude 可以分析、解释和修改这些文件'
    ],
    action: '点击输入框上方的 @ 按钮或输入 @ 来选择文件',
    highlight: 'mention'
  },
  {
    title: '计划模式 (Plan Mode)',
    shortDesc: '在接受之前查看和编辑计划',
    description: '计划模式让你可以在 Claude 执行操作之前查看其计划，你可以编辑计划、添加或删除步骤，然后让 Claude 执行修改后的计划。',
    details: [
      'Claude 首先展示它计划要做的事情',
      '你可以审查计划的每个步骤',
      '可以编辑计划：添加、删除或修改步骤',
      '确认后 Claude 按照修改后的计划执行',
      '这提供了更好的可控性和透明度'
    ],
    action: '发送"重构这个组件"来查看计划模式',
    highlight: 'plan-mode'
  },
  {
    title: '查看代码差异',
    shortDesc: '理解 Claude 建议的修改',
    description: '当 Claude 建议修改代码时，会以内联差异形式展示。红色表示删除的内容，绿色表示新增的内容。',
    details: [
      '代码差异直接显示在 Claude 的回复中',
      '红色背景：被删除的代码行',
      '绿色背景：新增的代码行',
      '点击差异可以展开查看完整的上下文',
      '清晰的视觉反馈帮助理解每一处改动'
    ],
    action: '发送"优化函数性能"来查看代码差异',
    highlight: 'diff'
  },
  {
    title: '应用或拒绝修改',
    shortDesc: '控制代码变更',
    description: '对于每个文件修改，你可以选择接受或拒绝。也可以使用自动接受模式来自动应用所有修改。',
    details: [
      '单个文件：点击"应用"或"忽略"按钮',
      '批量操作：点击"全部应用"或"全部忽略"',
      '自动接受模式：在设置中启用自动应用',
      '修改会立即应用到实际文件',
      '可以在 VS Code 源代码管理中查看变更'
    ],
    action: '点击差异下方的"应用"或"忽略"按钮',
    highlight: 'diff-actions'
  },
  {
    title: '多对话管理',
    shortDesc: '同时处理多个任务',
    description: 'Claude Code 扩展支持同时进行多个独立的对话，方便你处理不同的任务或项目。',
    details: [
      '点击工具栏的加号图标创建新对话',
      '每个对话有独立的历史记录和上下文',
      '对话之间完全独立，不会相互干扰',
      '可以在对话列表中快速切换',
      '适合同时处理多个不同的功能或 bug'
    ],
    shortcut: '点击工具栏的新对话按钮',
    action: '点击工具栏的加号 (+) 图标创建新对话',
    highlight: 'new-chat'
  },
  {
    title: '访问对话历史',
    shortDesc: '查看和恢复过去的对话',
    description: 'Claude Code 会保存你的对话历史，你可以随时查看和恢复之前的对话。',
    details: [
      '点击工具栏的历史图标查看历史记录',
      '历史记录按时间排序',
      '点击历史项可以恢复该对话',
      '恢复后可以继续之前的对话',
      '所有会话历史都被持久化保存'
    ],
    action: '点击工具栏的历史记录图标',
    highlight: 'history'
  },
  {
    title: '使用斜杠命令',
    shortDesc: '快速执行常用操作',
    description: '直接在扩展中使用斜杠命令，就像在 CLI 中一样。大多数斜杠命令都受支持。',
    details: [
      '/help - 显示帮助信息',
      '/clear - 清除当前对话上下文',
      '/commit - 创建 Git 提交',
      '/tasks - 查看任务列表',
      '/model - 切换使用的模型',
      '/diff - 查看最近的文件修改差异'
    ],
    action: '在输入框中输入 /help 查看所有可用命令',
    highlight: 'slash-commands'
  },
  {
    title: '配置 MCP 服务器',
    shortDesc: '使用模型上下文协议服务器',
    description: '扩展支持使用通过 CLI 配置的 MCP 服务器，扩展 Claude 的能力。',
    details: [
      '首先通过 CLI 配置 MCP 服务器',
      '扩展会自动检测并使用已配置的服务器',
      'MCP 服务器提供额外的工具和数据源',
      '例如：GitHub 服务器可以访问仓库信息',
      '配置文件：.mcp.json'
    ],
    action: '通过 CLI 运行 claude mcp add 来配置服务器',
    highlight: 'mcp'
  },
  {
    title: '键盘快捷键',
    shortDesc: '提高操作效率',
    description: '扩展支持 CLI 中的大多数键盘快捷键，让你可以更快速地操作。',
    details: [
      'Ctrl+C - 中断当前生成',
      'Ctrl+D - 退出会话',
      'Ctrl+L - 清空屏幕',
      '↑/↓ - 浏览历史消息',
      'Tab - 自动补全',
      'Shift+Enter - 输入多行消息'
    ],
    action: '尝试使用 Ctrl+L 清空屏幕',
    highlight: 'shortcuts'
  },
  {
    title: '使用第三方提供商',
    shortDesc: '通过 Vertex AI 或 Bedrock 使用',
    description: '扩展支持通过第三方提供商（Amazon Bedrock 和 Google Vertex AI）使用 Claude Code。',
    details: [
      '在 VS Code 设置中配置环境变量',
      '搜索 "Claude Code: Environment Variables"',
      '添加必要的环境变量（如 ANTHROPIC_API_KEY）',
      '支持 AWS_REGION、CLOUD_ML_REGION 等',
      '适合企业用户和有特定合规要求的场景'
    ],
    action: '在 VS Code 设置中搜索 "Claude Code"',
    highlight: 'providers'
  },
  {
    title: '实战场景：代码重构',
    shortDesc: '综合运用所学技能',
    description: '通过一个完整的实战场景来综合运用所学技能。场景：你需要重构一个复杂的组件。',
    details: [
      '1. 创建新对话用于重构任务',
      '2. 使用 @-mention 引用需要重构的组件文件',
      '3. 发送："重构这个组件，使用 TypeScript 类型"',
      '4. 查看计划模式的步骤',
      '5. 审查并确认计划',
      '6. 查看代码差异',
      '7. 应用修改',
      '8. 使用 /commit 创建 Git 提交'
    ],
    action: '按照场景描述完成完整的重构流程',
    highlight: 'workflow'
  }
]

const currentStep = ref(0)
const completedSteps = ref(new Set())

const totalSteps = computed(() => tutorialSteps.length)
const currentStepData = computed(() => tutorialSteps[currentStep.value])
const isLastStep = computed(() => currentStep.value === totalSteps.value - 1)

// Demo 消息状态
const demoMessages = ref([])
const isTyping = ref(false)

// 根据输入内容生成响应
function handleSendMessage(content) {
  // 添加用户消息
  demoMessages.value.push({
    role: 'user',
    content,
    timestamp: Date.now()
  })

  // 模拟思考状态
  isTyping.value = true

  // 根据输入内容返回特定响应
  setTimeout(() => {
    isTyping.value = false

    let response = null

    // 根据用户输入返回对应响应
    if (content.includes('你好') || content.includes('hello') || content.includes('hi')) {
      response = {
        role: 'assistant',
        content: '你好！我是 Claude，很高兴帮助你。我可以帮助你编写、理解和改进代码。有什么我可以帮助你的吗？',
        timestamp: Date.now()
      }
    } else if (content.includes('重构') || content.includes('优化') || content.includes('改进')) {
      // 计划模式响应
      response = {
        role: 'assistant',
        content: '**[模拟]** 我理解你想要重构这个组件。以下是我计划执行的操作：\n\n1. 分析当前组件结构\n2. 添加 TypeScript 类型定义\n3. 重构 props 接口\n4. 优化组件性能\n\n这是我的计划，你可以编辑、添加或删除步骤，然后让我继续执行。',
        timestamp: Date.now(),
        diff: {
          file: 'App.vue',
          original: '// 原代码\nconst props = defineProps(["title", "count"])',
          modified: '// TypeScript 重构后\ninterface Props {\n  title: string\n  count: number\n}\nconst props = defineProps<Props>()'
        }
      }
    } else if (content.includes('性能') || content.includes('优化函数')) {
      // 代码差异响应
      response = {
        role: 'assistant',
        content: '我发现了可以优化的地方。这个函数可以通过缓存计算结果来提升性能：',
        timestamp: Date.now(),
        diff: {
          file: 'utils.js',
          original: 'function processData(items) {\n  return items.map(x => x * 2).filter(x => x > 10)\n}',
          modified: 'function processData(items) {\n  const doubled = items.map(x => x * 2)\n  return doubled.filter(x => x > 10)\n}'
        }
      }
    } else if (content.startsWith('/')) {
      // 斜杠命令响应
      const command = content.split(' ')[0]
      if (command === '/help') {
        response = {
          role: 'assistant',
          content: '**可用命令：**\n\n`/help` - 显示此帮助信息\n`/clear` - 清除对话历史\n`/commit` - 创建 Git 提交\n`/tasks` - 查看任务列表\n`/model` - 切换模型\n`/diff` - 查看文件差异',
          timestamp: Date.now()
        }
      } else if (command === '/clear') {
        demoMessages.value = []
        return
      } else if (command === '/commit') {
        response = {
          role: 'assistant',
          content: '**[模拟]** 我已分析你的更改，建议以下提交信息：\n\n```\nfeat: refactor component with TypeScript types\n\n- Add TypeScript interface for props\n- Improve type safety\n- Optimize component performance\n```',
          timestamp: Date.now()
        }
      } else {
        response = {
          role: 'assistant',
          content: `命令 ${command} 已执行（模拟模式）`,
          timestamp: Date.now()
        }
      }
    } else if (content.includes('@')) {
      // 文件引用响应
      const files = content.match(/@(\S+)/g)
      if (files && files.length > 0) {
        response = {
          role: 'assistant',
          content: `我已注意到你引用了这些文件：${files.join(', ')}。在实际使用中，我会读取这些文件的内容并进行分析。这是一个演示，所以我没有实际访问这些文件。`,
          timestamp: Date.now()
        }
      }
    }

    // 如果没有匹配的响应，返回通用响应
    if (!response) {
      response = {
        role: 'assistant',
        content: '我理解你的需求。在演示模式下，我可以展示界面功能。尝试输入 "你好"、"/help"、或者 "重构这个组件" 来查看不同的响应类型。',
        timestamp: Date.now()
      }
    }

    demoMessages.value.push(response)
  }, 800)
}

function nextStep() {
  if (currentStep.value < totalSteps.value - 1) {
    completedSteps.value.add(currentStep.value)
    currentStep.value++
    // 切换步骤时清空演示消息
    demoMessages.value = []
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
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

/* 顶部导航 */
.tutorial-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 32px;
  background: var(--color-bg-elevated);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border-default);
  box-shadow: var(--shadow-xs);
}

.progress-badge {
  padding: 8px 16px;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 20px;
  color: #6366f1;
  font-size: 14px;
  font-weight: 600;
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
  color: var(--color-text-primary);
}

.guide-body {
  margin-bottom: 16px;
}

.guide-description {
  font-size: 15px;
  line-height: 1.7;
  color: var(--color-text-secondary);
  margin-bottom: 16px;
}

.guide-details ul {
  margin: 0;
  padding-left: 20px;
}

.guide-details li {
  font-size: 14px;
  line-height: 1.8;
  color: var(--color-text-secondary);
  margin: 8px 0;
}

.action-tip {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  margin-top: 16px;
  background: var(--color-warning-light);
  border: 1px solid var(--color-warning);
  border-radius: 8px;
  color: var(--color-warning);
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
  background: rgba(99, 102, 241, 0.05);
}

.step-item.active {
  background: rgba(99, 102, 241, 0.1);
  border-left: 3px solid var(--color-primary-500);
}

.step-item.completed {
  opacity: 0.7;
}

.step-number {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.step-item.active .step-number {
  background: var(--color-primary-500);
  color: #fff;
}

.step-item.completed .step-number {
  background: var(--color-success);
  color: #fff;
}

.step-info {
  flex: 1;
}

.step-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.step-desc {
  font-size: 12px;
  color: var(--color-text-secondary);
  margin-top: 2px;
}

/* 演示面板 */
.demo-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-elevated);
  border-radius: var(--radius-md);
  padding: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-xs);
  border: 1px solid var(--color-border-default);
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
