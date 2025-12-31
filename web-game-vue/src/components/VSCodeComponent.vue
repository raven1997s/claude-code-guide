<template>
  <div class="vscode-container" :class="{ 'panel-only': panelOnly }">
    <!-- 模拟标识 -->
    <div class="simulation-banner" v-if="!panelOnly">
      <n-alert type="info" :show-icon="false">
        <template #header>
          <n-icon :component="InformationIcon" style="margin-right: 8px" />
          模拟练习模式 - 所有对话均为预设响应，不会调用真实 API
        </template>
      </n-alert>
    </div>

    <!-- 纯面板模式 - 只显示 Claude Code 面板 -->
    <div v-if="panelOnly" class="panel-only-wrapper">
      <ClaudeCodePanel
        :demo-mode="true"
        :messages="conversationHistory"
        :is-typing="isProcessing"
        @send-message="handleSendMessage"
        @action="handlePanelAction"
      />

      <!-- 任务提示 -->
      <div v-if="levelData" class="task-panel-inline">
        <n-card size="small">
          <template #header>
            <n-icon :component="ListIcon" style="margin-right: 8px" />
            任务目标
          </template>
          <p>{{ levelData.objective }}</p>
          <n-collapse v-if="levelData.requiredActions?.length > 0">
            <n-collapse-item title="查看必需操作" name="steps">
              <n-list>
                <n-list-item v-for="(action, index) in levelData.requiredActions" :key="index">
                  <n-checkbox
                    :checked="completedActions.has(action.type)"
                    :disabled="completedActions.has(action.type)"
                  >
                    {{ action.description }}
                  </n-checkbox>
                </n-list-item>
              </n-list>
            </n-collapse-item>
          </n-collapse>
          <div v-if="allCompleted" style="margin-top: 12px">
            <n-result status="success" title="所有任务完成！" size="small">
              <template #footer>
                <n-button type="primary" @click="$emit('all-completed')">
                  完成关卡
                </n-button>
              </template>
            </n-result>
          </div>
        </n-card>
      </div>
    </div>

    <!-- VS Code 界面 (只在非纯面板模式下显示) -->
    <div v-if="!panelOnly" class="vscode-window">
      <!-- 标题栏 -->
      <div class="vscode-titlebar">
        <div class="titlebar-controls">
          <span class="control close"></span>
          <span class="control minimize"></span>
          <span class="control maximize"></span>
        </div>
        <div class="titlebar-title">
          <n-icon :component="FileIcon" style="margin-right: 8px" />
          Claude Code 学习中心 - Visual Studio Code
        </div>
      </div>

      <!-- 主体区域 -->
      <div class="vscode-body">
        <!-- 活动栏 -->
        <div class="vscode-activitybar">
          <div
            v-for="item in activityItems"
            :key="item.id"
            :class="['activity-item', { active: activeActivity === item.id }]"
            @click="activeActivity = item.id"
            :title="item.tooltip"
          >
            <n-icon :component="item.icon" size="24" />
          </div>
        </div>

        <!-- 侧边栏 -->
        <div class="vscode-sidebar">
          <!-- 文件资源管理器 -->
          <div v-if="activeActivity === 'explorer'" class="sidebar-panel">
            <div class="sidebar-header">文件资源管理器</div>
            <div class="file-tree">
              <div
                v-for="file in fileTree"
                :key="file.path"
                :class="['file-item', { active: activeFile === file.path, modified: file.modified }]"
                @click="selectFile(file.path)"
              >
                <n-icon :component="FileIcon" size="16" />
                <span>{{ getFileName(file.path) }}</span>
                <span v-if="file.modified" class="modified-indicator">M</span>
              </div>
            </div>
          </div>

          <!-- Claude Code 面板 -->
          <div v-if="activeActivity === 'claude'" class="sidebar-panel claude-panel">
            <div class="sidebar-header">
              <n-icon :component="RobotIcon" style="margin-right: 8px" />
              Claude Code
            </div>

            <!-- 对话历史 -->
            <div ref="chatHistoryRef" class="chat-history">
              <div
                v-for="(msg, index) in conversationHistory"
                :key="index"
                :class="['chat-message', msg.role]"
              >
                <div class="message-content">
                  <div v-if="msg.role === 'user'" class="message-label">你</div>
                  <div v-else class="message-label">
                    <n-icon :component="RobotIcon" size="14" />
                    Claude
                  </div>
                  <div class="message-text" v-html="formatMessage(msg.content)"></div>

                  <!-- 代码高亮 -->
                  <div v-if="msg.highlightedCode" class="highlighted-code">
                    <pre><code>{{ getCodeForHighlight(msg.highlightedCode.file) }}</code></pre>
                  </div>

                  <!-- 代码差异 -->
                  <div v-if="msg.diff" class="code-diff">
                    <div class="diff-header">
                      <span>{{ msg.diff.file }}</span>
                      <n-tag type="info" size="small">Diff Preview</n-tag>
                    </div>
                    <div class="diff-content">
                      <div class="diff-removed">{{ msg.diff.original }}</div>
                      <div class="diff-added">{{ msg.diff.modified }}</div>
                    </div>
                    <div v-if="msg.actions" class="diff-actions">
                      <n-button
                        v-for="action in msg.actions"
                        :key="action.type"
                        size="small"
                        :type="action.type === 'apply-diff' || action.type === 'apply-fix' ? 'primary' : 'default'"
                        @click="handleActionClick(action, msg)"
                      >
                        {{ action.label }}
                      </n-button>
                    </div>
                  </div>

                  <!-- 动作按钮 -->
                  <div v-if="msg.actions && !msg.diff" class="message-actions">
                    <n-button
                      v-for="action in msg.actions"
                      :key="action.type"
                      size="small"
                      @click="handleActionClick(action, msg)"
                    >
                      {{ action.label }}
                    </n-button>
                  </div>
                </div>
              </div>

              <!-- 加载指示器 -->
              <div v-if="isProcessing" class="chat-message assistant">
                <div class="message-content">
                  <div class="message-label">
                    <n-icon :component="RobotIcon" size="14" />
                    Claude
                  </div>
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- 输入区域 -->
            <div class="chat-input-area">
              <div v-if="activeFile" class="file-context">
                <n-tag size="small" closable @close="activeFile = null">
                  <template #icon>
                    <n-icon :component="FileIcon" />
                  </template>
                  {{ getFileName(activeFile) }}
                </n-tag>
              </div>
              <div class="input-wrapper">
                <n-input
                  v-model="currentInput"
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 6 }"
                  placeholder="向 Claude 发送消息..."
                  @keydown.enter.ctrl="sendMessage"
                />
                <n-button
                  type="primary"
                  :disabled="!currentInput.trim() || isProcessing"
                  @click="sendMessage"
                  style="margin-top: 8px"
                >
                  发送 (Ctrl+Enter)
                </n-button>
              </div>
            </div>
          </div>

          <!-- Git 源代码管理 -->
          <div v-if="activeActivity === 'git'" class="sidebar-panel">
            <div class="sidebar-header">源代码管理</div>
            <div class="git-changes">
              <div v-if="changedFiles.length === 0" class="no-changes">
                没有检测到改动
              </div>
              <div v-else>
                <div
                  v-for="file in changedFiles"
                  :key="file"
                  class="changed-file"
                  @click="selectFile(file)"
                >
                  <n-icon :component="FileIcon" size="16" />
                  <span>{{ getFileName(file) }}</span>
                  <span class="file-status">M</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 编辑器区域 -->
        <div class="vscode-editor">
          <div v-if="!activeFile" class="editor-placeholder">
            <n-icon :component="FileIcon" size="64" color="#666" />
            <p>选择一个文件开始编辑</p>
            <p class="hint">或点击左侧活动栏的 Claude Code 图标开始对话</p>
          </div>
          <div v-else class="editor-content">
            <div class="editor-tabs">
              <div class="tab active">
                <n-icon :component="FileIcon" size="14" />
                {{ getFileName(activeFile) }}
                <span v-if="getFile(activeFile)?.modified" class="modified-dot"></span>
              </div>
            </div>
            <pre class="code-display"><code>{{ getFile(activeFile)?.content || '' }}</code></pre>
          </div>
        </div>
      </div>

      <!-- 状态栏 -->
      <div class="vscode-statusbar">
        <div class="statusbar-left">
          <span class="status-item">
            <n-icon :component="BranchIcon" size="14" />
            main
          </span>
          <span v-if="activeFile" class="status-item">{{ getFileName(activeFile) }}</span>
        </div>
        <div class="statusbar-right">
          <span class="status-item">Ln 1, Col 1</span>
          <span class="status-item">UTF-8</span>
          <span class="status-item">JavaScript</span>
        </div>
      </div>
    </div>

    <!-- 任务提示 -->
    <div v-if="levelData" class="task-panel">
      <n-card size="small">
        <template #header>
          <n-icon :component="ListIcon" style="margin-right: 8px" />
          任务目标
        </template>
        <p>{{ levelData.objective }}</p>
        <n-collapse v-if="levelData.requiredActions?.length > 0">
          <n-collapse-item title="查看必需操作" name="steps">
            <n-list>
              <n-list-item v-for="(action, index) in levelData.requiredActions" :key="index">
                <n-checkbox
                  :checked="completedActions.has(action.type)"
                  :disabled="completedActions.has(action.type)"
                >
                  {{ action.description }}
                </n-checkbox>
              </n-list-item>
            </n-list>
          </n-collapse-item>
        </n-collapse>
        <div v-if="allCompleted" style="margin-top: 12px">
          <n-result status="success" title="所有任务完成！" size="small">
            <template #footer>
              <n-button type="primary" @click="$emit('all-completed')">
                完成关卡
              </n-button>
            </template>
          </n-result>
        </div>
      </n-card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, watch, nextTick, onMounted } from 'vue'
import {
  NAlert, NIcon, NButton, NInput, NTag, NCheckbox, NCard, NCollapse, NCollapseItem,
  NList, NListItem, NResult
} from 'naive-ui'
import {
  InfoCircle as InformationIcon,
  File as FileIcon,
  User as RobotIcon,
  List as ListIcon,
  Folder as ExplorerIcon,
  Comment as ChatIcon,
  CodeBranch as BranchIcon
} from '@vicons/fa'
import { matchConversation, getFilesForLevel, ACTION_TYPES } from '@/data/vscode-data'
import ClaudeCodePanel from './ClaudeCodePanel.vue'

// Props
const props = defineProps({
  levelData: {
    type: Object,
    required: true
  },
  conversations: {
    type: Object,
    default: () => ({})
  },
  requiredActions: {
    type: Array,
    default: () => []
  },
  virtualFiles: {
    type: Object,
    default: () => ({})
  },
  panelOnly: {
    type: Boolean,
    default: true
  }
})

// Emits
const emit = defineEmits(['action-completed', 'all-completed'])

// 状态管理
const state = reactive({
  activeActivity: 'explorer',
  activeFile: null,
  files: {},
  conversationHistory: [],
  currentInput: '',
  isProcessing: false,
  completedActions: new Set(),
  changedFiles: []
})

// 计算属性
const activeActivity = computed(() => state.activeActivity)
const activeFile = computed({
  get: () => state.activeFile,
  set: (val) => {
    state.activeFile = val
    if (val) {
      checkActionCompletion(ACTION_TYPES.SELECT_FILE, val)
    }
  }
})
const conversationHistory = computed(() => state.conversationHistory)
const currentInput = computed({
  get: () => state.currentInput,
  set: (val) => { state.currentInput = val }
})
const isProcessing = computed(() => state.isProcessing)
const completedActions = computed(() => state.completedActions)
const changedFiles = computed(() => state.changedFiles)
const allCompleted = computed(() => {
  return props.requiredActions.length > 0 &&
    props.requiredActions.every(action => state.completedActions.has(action.type))
})

// Refs
const chatHistoryRef = ref(null)

// 活动栏项
const activityItems = [
  { id: 'explorer', icon: ExplorerIcon, tooltip: '文件资源管理器' },
  { id: 'claude', icon: ChatIcon, tooltip: 'Claude Code' },
  { id: 'git', icon: BranchIcon, tooltip: '源代码管理' }
]

// 文件树
const fileTree = computed(() => {
  return Object.values(state.files).map(file => ({
    path: file.path,
    name: getFileName(file.path),
    modified: file.modified
  }))
})

// 初始化
onMounted(() => {
  // 加载虚拟文件
  const files = getFilesForLevel(props.levelData?.id || 26)
  state.files = files

  // 欢迎消息
  if (props.levelData?.id === 26) {
    addAssistantMessage(`欢迎使用 Claude Code VS Code 插件模拟！

这是你的第一个关卡：${props.levelData.objective}

请点击左侧活动栏的 Claude Code 图标（💬）开始使用。`)
  }

  // 检查是否需要自动打开 Claude 面板
  const needsPanel = props.requiredActions.find(a => a.type === ACTION_TYPES.CLICK_PANEL)
  if (needsPanel) {
    state.activeActivity = 'explorer' // 从 explorer 开始，让用户点击
  }
})

// 方法
function getFileName(path) {
  return path.split('/').pop()
}

function getFile(path) {
  return state.files[path]
}

function selectFile(path) {
  activeFile.value = path
}

function formatMessage(content) {
  // 简单的 Markdown 格式化
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`{3}(\w+)?\n([\s\S]*?)`{3}/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

function getCodeForHighlight(filePath) {
  const file = state.files[filePath]
  return file ? file.content : ''
}

function addAssistantMessage(content, extras = {}) {
  state.conversationHistory.push({
    role: 'assistant',
    content,
    timestamp: Date.now(),
    ...extras
  })
  scrollToBottom()
}

function addUserMessage(content) {
  state.conversationHistory.push({
    role: 'user',
    content,
    timestamp: Date.now()
  })
  scrollToBottom()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatHistoryRef.value) {
      chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
    }
  })
}

async function sendMessage() {
  const message = currentInput.value.trim()
  if (!message || isProcessing.value) return

  addUserMessage(message)
  currentInput.value = ''
  state.isProcessing = true

  // 检查是否是必需的发送消息动作
  checkActionCompletion(ACTION_TYPES.SEND_MESSAGE, message)

  // 模拟 AI 思考延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  // 匹配响应
  const response = matchConversation(message, activeFile.value)

  state.conversationHistory.push({
    ...response,
    timestamp: Date.now()
  })

  state.isProcessing = false
  scrollToBottom()

  // 如果有代码差异，提示用户
  if (response.diff) {
    selectFile(response.diff.file)
  }
}

function handleActionClick(action, message) {
  switch (action.type) {
    case 'apply-diff':
    case 'apply-fix':
      if (message.diff) {
        applyDiff(message.diff)
        checkActionCompletion(ACTION_TYPES.APPLY_DIFF, message.diff.file)
      }
      break
    case 'discard':
      // 忽略建议
      break
    case 'apply-all':
      // 应用所有改动
      break
    case 'preview-changes':
      // 预览改动
      break
    case 'copy-commit':
      navigator.clipboard?.writeText(message.content.match(/```[\s\S]*?```/)?.[0] || '')
      break
  }

  // 移除动作按钮，避免重复点击
  if (message.actions) {
    message.actions = []
  }
}

function applyDiff(diff) {
  const file = state.files[diff.file]
  if (file) {
    file.content = diff.modified
    file.modified = true
    if (!state.changedFiles.includes(diff.file)) {
      state.changedFiles.push(diff.file)
    }
  }
}

function checkActionCompletion(type, value) {
  // 查找匹配的必需动作
  const requiredAction = props.requiredActions.find(a => {
    if (a.type === type) {
      if (a.target) {
        return value === a.target || value?.includes(a.target)
      }
      return true
    }
    return false
  })

  if (requiredAction && !state.completedActions.has(type)) {
    state.completedActions.add(type)
    emit('action-completed', {
      action: requiredAction,
      wasRequired: true
    })

    // 检查是否全部完成
    if (allCompleted.value) {
      emit('all-completed')
    }
  }

  // 特殊处理：点击 Claude 面板
  if (type === ACTION_TYPES.CLICK_PANEL && !state.completedActions.has(ACTION_TYPES.CLICK_PANEL)) {
    state.completedActions.add(ACTION_TYPES.CLICK_PANEL)
    emit('action-completed', {
      action: requiredAction,
      wasRequired: true
    })
  }
}

// 监听活动栏变化
watch(activeActivity, (newVal) => {
  if (newVal === 'claude') {
    checkActionCompletion(ACTION_TYPES.CLICK_PANEL, 'claude')
  }
})

// ========== 纯面板模式专用方法 ==========

// 处理来自 ClaudeCodePanel 的消息发送
async function handleSendMessage(message) {
  if (!message || isProcessing.value) return

  addUserMessage(message)
  state.isProcessing = true

  // 检查是否是必需的发送消息动作
  checkActionCompletion(ACTION_TYPES.SEND_MESSAGE, message)

  // 模拟 AI 思考延迟
  await new Promise(resolve => setTimeout(resolve, 800))

  // 匹配响应
  const response = matchConversation(message, activeFile.value)

  state.conversationHistory.push({
    ...response,
    timestamp: Date.now()
  })

  state.isProcessing = false
}

// 处理来自 ClaudeCodePanel 的其他动作
function handlePanelAction(actionType) {
  checkActionCompletion(actionType, actionType)

  // 根据动作类型执行相应操作
  switch (actionType) {
    case 'click-panel':
      // 已在上面通过 checkActionCompletion 处理
      break
    case 'select-file':
      // 文件选择操作
      break
    case 'apply-diff':
      // 应用代码差异
      break
    default:
      // 记录动作完成
      break
  }
}
</script>

<style scoped>
.vscode-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  background: #1e1e1e;
  min-height: 600px;
}

.simulation-banner {
  flex-shrink: 0;
}

.vscode-window {
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
}

/* 标题栏 */
.vscode-titlebar {
  display: flex;
  align-items: center;
  background: #323233;
  height: 32px;
  padding: 0 12px;
  gap: 12px;
}

.titlebar-controls {
  display: flex;
  gap: 8px;
}

.control {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.control.close { background: #ff5f57; }
.control.minimize { background: #febc2e; }
.control.maximize { background: #28c840; }

.titlebar-title {
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #cccccc;
}

/* 主体区域 */
.vscode-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 活动栏 */
.vscode-activitybar {
  width: 48px;
  background: #333333;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 8px;
  gap: 8px;
}

.activity-item {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #858585;
  position: relative;
}

.activity-item:hover {
  color: #ffffff;
}

.activity-item.active {
  color: #ffffff;
}

.activity-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ffffff;
}

/* 侧边栏 */
.vscode-sidebar {
  width: 320px;
  background: #252526;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.sidebar-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar-header {
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #bbbbbb;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #3c3c3c;
}

/* 文件树 */
.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  cursor: pointer;
  color: #cccccc;
  font-size: 13px;
}

.file-item:hover {
  background: #2a2d2e;
}

.file-item.active {
  background: #37373d;
  color: #ffffff;
}

.file-item.modified {
  color: #e2c08d;
}

.modified-indicator {
  margin-left: auto;
  color: #e2c08d;
  font-size: 11px;
  font-weight: bold;
}

/* Claude 面板 */
.claude-panel {
  background: #252526;
}

.chat-history {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.chat-message {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-message.user {
  align-items: flex-end;
}

.chat-message.assistant {
  align-items: flex-start;
}

.message-content {
  max-width: 85%;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.5;
}

.chat-message.user .message-content {
  background: #0e639c;
  color: #ffffff;
}

.chat-message.assistant .message-content {
  background: #3c3c3c;
  color: #cccccc;
  border: 1px solid #454545;
}

.message-label {
  font-size: 11px;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 4px;
  opacity: 0.8;
}

.message-text {
  white-space: pre-wrap;
  word-break: break-word;
}

.message-actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.highlighted-code {
  margin-top: 8px;
  background: #1e1e1e;
  border-radius: 4px;
  padding: 8px;
  overflow-x: auto;
}

.code-diff {
  margin-top: 8px;
  background: #1e1e1e;
  border-radius: 4px;
  overflow: hidden;
}

.diff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #2d2d2d;
  font-size: 12px;
}

.diff-content {
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.diff-removed {
  background: #3c1f1e;
  color: #f48771;
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 2px;
}

.diff-added {
  background: #1d3a1d;
  color: #89d185;
  padding: 8px;
  border-radius: 2px;
}

.diff-actions {
  padding: 8px 12px;
  display: flex;
  gap: 8px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #858585;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
.typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

.chat-input-area {
  border-top: 1px solid #3c3c3c;
  padding: 12px;
}

.file-context {
  margin-bottom: 8px;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
}

/* Git 面板 */
.git-changes {
  flex: 1;
  padding: 12px;
}

.no-changes {
  color: #858585;
  font-size: 13px;
  text-align: center;
  padding: 20px;
}

.changed-file {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  cursor: pointer;
  color: #cccccc;
  font-size: 13px;
}

.changed-file:hover {
  background: #2a2d2e;
}

.file-status {
  margin-left: auto;
  color: #e2c08d;
  font-size: 11px;
  font-weight: bold;
}

/* 编辑器区域 */
.vscode-editor {
  flex: 1;
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-placeholder {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #666;
}

.editor-placeholder p {
  margin: 8px 0;
}

.hint {
  font-size: 13px;
  opacity: 0.7;
}

.editor-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.editor-tabs {
  display: flex;
  background: #252526;
  border-bottom: 1px solid #3c3c3c;
}

.tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #969696;
  border-right: 1px solid #3c3c3c;
  position: relative;
}

.tab.active {
  background: #1e1e1e;
  color: #ffffff;
}

.modified-dot {
  width: 8px;
  height: 8px;
  background: #e2c08d;
  border-radius: 50%;
}

.code-display {
  flex: 1;
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  overflow: auto;
}

/* 状态栏 */
.vscode-statusbar {
  display: flex;
  justify-content: space-between;
  background: #007acc;
  color: #ffffff;
  font-size: 12px;
  padding: 0 12px;
  height: 22px;
  align-items: center;
}

.statusbar-left,
.statusbar-right {
  display: flex;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 任务面板 */
.task-panel {
  flex-shrink: 0;
  max-width: 400px;
}

/* ========== 纯面板模式样式 ========== */
.vscode-container.panel-only {
  background: #f5f5f5;
  padding: 20px;
  min-height: 600px;
}

.panel-only-wrapper {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 900px;
  margin: 0 auto;
}

.task-panel-inline {
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e5e5;
}

.task-panel-inline :deep(.n-card) {
  background: transparent;
  border: none;
}
</style>
