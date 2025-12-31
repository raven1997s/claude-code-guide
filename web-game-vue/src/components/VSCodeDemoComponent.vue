<template>
  <div class="vscode-demo">
    <n-card class="demo-card">
      <!-- 模拟 VS Code 窗口 -->
      <div class="vscode-window">
        <!-- 标题栏 -->
        <div class="vscode-titlebar">
          <div class="titlebar-controls">
            <span class="control close"></span>
            <span class="control minimize"></span>
            <span class="control maximize"></span>
          </div>
          <div class="titlebar-title">index.js - MyProject</div>
          <div class="titlebar-actions">
            <n-icon :component="SyncIcon" size="14" />
          </div>
        </div>

        <!-- 主体 -->
        <div class="vscode-body">
          <!-- 侧边栏 -->
          <div class="vscode-sidebar">
            <div class="sidebar-icons">
              <div
                v-for="item in sidebarItems"
                :key="item.id"
                :class="['sidebar-icon', {
                  active: activeSidebar === item.id,
                  highlight: shouldHighlight(item.id)
                }]"
                :title="item.tooltip"
                @click="handleSidebarClick(item)"
              >
                <n-icon :component="item.icon" size="24" />
                <div v-if="shouldHighlight(item.id)" class="pulse-ring"></div>
              </div>
            </div>

            <!-- Claude 面板 -->
            <div
              v-show="activeSidebar === 'claude'"
              :class="['claude-panel', { highlight: shouldHighlight('claude-panel') }]"
            >
              <!-- 面板头部 -->
              <div class="claude-header">
                <n-icon :component="SparkIcon" />
                <span>Claude Code</span>
                <div class="header-actions">
                  <n-icon :component="PlusIcon" size="16" @click="handleAction('new-chat')" />
                  <n-icon :component="CogIcon" size="16" @click="handleAction('settings')" />
                </div>
              </div>

              <!-- 对话历史 -->
              <div class="chat-history">
                <div
                  v-for="(msg, index) in chatMessages"
                  :key="index"
                  :class="['chat-message', msg.role]"
                >
                  <div class="message-avatar">
                    <n-icon v-if="msg.role === 'user'" :component="UserIcon" />
                    <n-icon v-else :component="SparkIcon" />
                  </div>
                  <div class="message-content">{{ msg.content }}</div>
                </div>

                <!-- 打字指示器 -->
                <div v-if="isTyping" class="chat-message assistant typing">
                  <div class="message-avatar">
                    <n-icon :component="SparkIcon" />
                  </div>
                  <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>

              <!-- 输入区域 -->
              <div
                :class="['chat-input-area', { highlight: shouldHighlight('input-box') }]"
              >
                <div class="input-wrapper">
                  <n-input
                    v-model="inputValue"
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4 }"
                    placeholder="向 Claude 发送消息... (@文件名来引用文件)"
                    @keydown.enter="handleInputKeydown"
                  />
                  <n-button
                    type="primary"
                    size="small"
                    :disabled="!inputValue.trim()"
                    @click="sendMessage"
                  >
                    发送
                  </n-button>
                </div>
              </div>
            </div>

            <!-- 文件浏览器 -->
            <div
              v-show="activeSidebar === 'explorer'"
              :class="['file-explorer', { highlight: shouldHighlight('file-list') }]"
            >
              <div class="explorer-header">资源管理器</div>
              <div class="file-tree">
                <div
                  v-for="file in projectFiles"
                  :key="file.name"
                  :class="['file-item', { active: selectedFile === file.name }]"
                  @click="selectFile(file)"
                >
                  <n-icon :component="FileIcon" size="14" />
                  <span>{{ file.name }}</span>
                  <span
                    class="mention-btn"
                    title="引用此文件"
                    @click.stop="mentionFile(file)"
                  >
                    @
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- 编辑器区域 -->
          <div class="vscode-editor">
            <!-- 编辑器标签 -->
            <div class="editor-tabs">
              <div
                v-for="tab in openTabs"
                :key="tab.name"
                :class="['editor-tab', { active: activeTab === tab.name }]"
                @click="activeTab = tab.name"
              >
                <n-icon :component="FileIcon" size="14" />
                <span>{{ tab.name }}</span>
              </div>
            </div>

            <!-- 代码内容 -->
            <div class="editor-content">
              <pre v-if="activeTab" class="code-content"><code>{{ getFileContent(activeTab) }}</code></pre>
              <div v-else class="editor-placeholder">选择一个文件开始编辑</div>
            </div>

            <!-- 差异视图覆盖层 -->
            <div
              v-if="showDiffView"
              :class="['diff-overlay', { highlight: shouldHighlight('diff-view') }]"
            >
              <div class="diff-header">
                <span>代码差异预览</span>
                <n-button size="tiny" @click="showDiffView = false">关闭</n-button>
              </div>
              <div class="diff-content">
                <div class="diff-removed">
                  <span class="diff-marker">-</span>
                  <code>{{ diffContent.original }}</code>
                </div>
                <div class="diff-added">
                  <span class="diff-marker">+</span>
                  <code>{{ diffContent.modified }}</code>
                </div>
              </div>
              <div :class="['diff-actions', { highlight: shouldHighlight('diff-actions') }]">
                <n-button size="small" type="success" @click="applyDiff">
                  <template #icon>
                    <n-icon :component="CheckIcon" />
                  </template>
                  接受
                </n-button>
                <n-button size="small" @click="showDiffView = false">
                  <template #icon>
                    <n-icon :component="XIcon" />
                  </template>
                  拒绝
                </n-button>
              </div>
            </div>
          </div>
        </div>

        <!-- 状态栏 -->
        <div class="vscode-statusbar">
          <div class="status-left">
            <span class="status-item"><n-icon :component="BranchIcon" size="12" /> main</span>
            <span class="status-item" v-if="selectedFile">{{ selectedFile }}</span>
          </div>
          <div class="status-right">
            <span class="status-item">Ln 1, Col 1</span>
            <span class="status-item">UTF-8</span>
            <span class="status-item">JavaScript</span>
          </div>
        </div>
      </div>
    </n-card>

    <!-- 操作提示 -->
    <div v-if="showHint" class="demo-hint">
      <n-alert type="info" closable @close="showHint = false">
        <template #icon>
          <n-icon :component="HandPointerIcon" />
        </template>
        {{ hintMessage }}
      </n-alert>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import {
  NCard, NIcon, NButton, NInput, NAlert
} from 'naive-ui'
import {
  Files as ExplorerIcon,
  Comment as ChatIcon,
  Search as SearchIcon,
  Sync as SyncIcon,
  Bolt as SparkIcon,
  Plus as PlusIcon,
  Cog as CogIcon,
  File as FileIcon,
  User as UserIcon,
  Check as CheckIcon,
  X as XIcon,
  CodeBranch as BranchIcon,
  HandPointer as HandPointerIcon
} from '@vicons/fa'

const props = defineProps({
  currentStep: {
    type: Number,
    default: 0
  },
  highlightArea: {
    type: String,
    default: ''
  },
  demoState: {
    type: String,
    default: 'waiting'
  }
})

const emit = defineEmits(['demo-action'])

// 状态
const activeSidebar = ref('explorer')
const selectedFile = ref(null)
const activeTab = ref(null)
const inputValue = ref('')
const isTyping = ref(false)
const showDiffView = ref(false)
const showHint = ref(true)
const chatMessages = ref([
  {
    role: 'assistant',
    content: '你好！我是 Claude，可以在 VS Code 中帮助你编写和理解代码。有什么我可以帮助的吗？'
  }
])

// 项目文件
const projectFiles = ref([
  { name: 'index.js', content: '// 主入口文件\nconsole.log("Hello, World!");' },
  { name: 'App.vue', content: '<template>\n  <div>Hello</div>\n</template>' },
  { name: 'utils.js', content: 'export function add(a, b) {\n  return a + b;\n}' }
])

// 打开的标签页
const openTabs = ref([])

// 差异内容
const diffContent = ref({
  original: 'console.log("Hello, World!");',
  modified: 'console.log("Hello, Claude Code!");'
})

// 侧边栏项目
const sidebarItems = [
  { id: 'explorer', icon: ExplorerIcon, tooltip: '资源管理器' },
  { id: 'search', icon: SearchIcon, tooltip: '搜索' },
  { id: 'claude', icon: ChatIcon, tooltip: 'Claude Code' }
]

// 提示消息
const hintMessage = computed(() => {
  const hints = {
    'claude-panel': '点击 Claude Code 图标打开面板',
    'input-box': '在输入框中输入消息',
    'file-list': '点击文件名前的 @ 引用文件',
    'diff-view': '查看代码差异（红色删除，绿色新增）',
    'diff-actions': '点击"接受"按钮应用修改',
    'new-chat': '点击 + 图标创建新对话',
    'settings': '点击齿轮图标打开设置',
    'workflow': '按照左侧引导完成操作'
  }
  return hints[props.highlightArea] || '按照提示完成操作'
})

// 方法
function shouldHighlight(area) {
  return props.highlightArea === area && props.demoState === 'waiting'
}

function handleSidebarClick(item) {
  activeSidebar.value = item.id
  if (item.id === 'claude') {
    emit('demo-action', 'click-panel')
  }
}

function selectFile(file) {
  selectedFile.value = file.name
  if (!openTabs.value.find(t => t.name === file.name)) {
    openTabs.value.push(file)
  }
  activeTab.value = file.name
}

function mentionFile(file) {
  inputValue.value += `@${file.name} `
  activeSidebar.value = 'claude'
}

function getFileContent(filename) {
  const file = projectFiles.value.find(f => f.name === filename)
  return file?.content || ''
}

function handleInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
}

function sendMessage() {
  const message = inputValue.value.trim()
  if (!message) return

  chatMessages.value.push({ role: 'user', content: message })
  inputValue.value = ''
  isTyping.value = true

  emit('demo-action', 'send-message')

  setTimeout(() => {
    isTyping.value = false
    chatMessages.value.push({
      role: 'assistant',
      content: '我收到你的消息了！这是一个演示，实际使用时我会提供真正的 AI 回复。'
    })

    // 模拟显示代码差异
    if (message.includes('修改') || message.includes('优化')) {
      setTimeout(() => {
        showDiffView.value = true
      }, 500)
    }
  }, 1000)
}

function applyDiff() {
  showDiffView.value = false
  emit('demo-action', 'apply-diff')
  chatMessages.value.push({
    role: 'assistant',
    content: '✅ 代码修改已应用！你可以在 VS Code 的源代码管理中看到改动。'
  })
}

function handleAction(action) {
  emit('demo-action', action)
  if (action === 'new-chat') {
    chatMessages.value = [
      {
        role: 'assistant',
        content: '开始新对话！这是一个独立的对话窗口。'
      }
    ]
  }
}

// 监听步骤变化，显示提示
watch(() => props.currentStep, () => {
  showHint.value = true
  // 重置状态
  if (props.currentStep === 0) {
    activeSidebar.value = 'explorer'
  }
})

// 监听 demo 状态
watch(() => props.demoState, (newVal) => {
  if (newVal === 'completed') {
    showHint.value = false
  }
})
</script>

<style scoped>
.vscode-demo {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.demo-card {
  height: 100%;
}

.demo-card :deep(.n-card__content) {
  height: 100%;
  padding: 0;
}

/* VS Code 窗口 */
.vscode-window {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  border-radius: 8px;
  overflow: hidden;
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
  flex: 1;
  color: #ccc;
  font-size: 12px;
}

.titlebar-actions {
  color: #858585;
  cursor: pointer;
}

/* 主体 */
.vscode-body {
  flex: 1;
  display: flex;
  overflow: hidden;
}

/* 侧边栏 */
.vscode-sidebar {
  display: flex;
  background: #252526;
}

.sidebar-icons {
  width: 48px;
  display: flex;
  flex-direction: column;
  padding-top: 8px;
  gap: 8px;
}

.sidebar-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #858585;
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.sidebar-icon:hover {
  color: #fff;
}

.sidebar-icon.active {
  color: #fff;
}

.sidebar-icon.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #fff;
}

/* 高亮动画 */
.sidebar-icon.highlight {
  color: #4f46e5;
}

.sidebar-icon.highlight .pulse-ring {
  position: absolute;
  inset: 4px;
  border: 2px solid #4f46e5;
  border-radius: 4px;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
  100% { opacity: 1; transform: scale(1); }
}

/* Claude 面板 */
.claude-panel {
  width: 320px;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #3c3c3c;
}

.claude-panel.highlight {
  box-shadow: inset 0 0 0 2px #4f46e5;
}

.claude-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  border-bottom: 1px solid #3c3c3c;
  color: #fff;
  font-size: 13px;
}

.header-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
  color: #858585;
  cursor: pointer;
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
  gap: 8px;
}

.chat-message.user {
  flex-direction: row-reverse;
}

.message-avatar {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: #3c3c3c;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.chat-message.user .message-avatar {
  background: #0e639c;
}

.chat-message.assistant .message-content {
  background: #3c3c3c;
  color: #ccc;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
}

.chat-message.user .message-content {
  background: #0e639c;
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 13px;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
  background: #3c3c3c;
  border-radius: 8px;
}

.typing-indicator span {
  width: 6px;
  height: 6px;
  background: #858585;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

.chat-input-area {
  padding: 12px;
  border-top: 1px solid #3c3c3c;
}

.chat-input-area.highlight {
  box-shadow: inset 0 0 0 2px #4f46e5;
}

.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 文件浏览器 */
.file-explorer {
  width: 200px;
  border-left: 1px solid #3c3c3c;
}

.file-explorer.highlight {
  box-shadow: inset 0 0 0 2px #4f46e5;
}

.explorer-header {
  padding: 12px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: #bbb;
  border-bottom: 1px solid #3c3c3c;
}

.file-tree {
  padding: 8px 0;
}

.file-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  cursor: pointer;
  color: #ccc;
  font-size: 13px;
  position: relative;
}

.file-item:hover {
  background: #2a2d2e;
}

.file-item.active {
  background: #37373d;
}

.mention-btn {
  margin-left: auto;
  color: #4f46e5;
  font-weight: bold;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.file-item:hover .mention-btn {
  opacity: 1;
}

/* 编辑器 */
.vscode-editor {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #1e1e1e;
  overflow: hidden;
}

.editor-tabs {
  display: flex;
  background: #252526;
  border-bottom: 1px solid #3c3c3c;
}

.editor-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  font-size: 13px;
  color: #969696;
  cursor: pointer;
  border-right: 1px solid #3c3c3c;
}

.editor-tab.active {
  background: #1e1e1e;
  color: #fff;
}

.editor-content {
  flex: 1;
  overflow: auto;
  padding: 16px;
}

.code-content {
  margin: 0;
  color: #d4d4d4;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
}

.editor-placeholder {
  color: #666;
  text-align: center;
  padding: 40px;
}

/* 差异视图 */
.diff-overlay {
  position: absolute;
  bottom: 80px;
  right: 20px;
  width: 400px;
  background: #1e1e1e;
  border: 1px solid #3c3c3c;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.diff-overlay.highlight {
  border-color: #4f46e5;
  box-shadow: 0 0 0 2px #4f46e5, 0 8px 24px rgba(0, 0, 0, 0.5);
}

.diff-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #3c3c3c;
  color: #fff;
  font-size: 13px;
}

.diff-content {
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.diff-removed,
.diff-added {
  padding: 8px;
  margin-bottom: 4px;
  border-radius: 4px;
  display: flex;
  gap: 8px;
}

.diff-removed {
  background: #3c1f1e;
  color: #f48771;
}

.diff-added {
  background: #1d3a1d;
  color: #89d185;
}

.diff-marker {
  flex-shrink: 0;
}

.diff-actions {
  display: flex;
  gap: 8px;
  padding: 12px;
  border-top: 1px solid #3c3c3c;
}

.diff-actions.highlight {
  background: rgba(79, 70, 229, 0.1);
}

/* 状态栏 */
.vscode-statusbar {
  display: flex;
  justify-content: space-between;
  background: #007acc;
  color: #fff;
  font-size: 12px;
  padding: 0 12px;
  height: 22px;
  align-items: center;
}

.status-left,
.status-right {
  display: flex;
  gap: 16px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 操作提示 */
.demo-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  max-width: 400px;
}
</style>
