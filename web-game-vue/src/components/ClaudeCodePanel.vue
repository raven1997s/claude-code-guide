<template>
  <div class="claude-code-panel" :class="{ 'demo-mode': demoMode }">
    <!-- 模拟标识 -->
    <div v-if="demoMode" class="simulation-badge">
      <NTag size="small" type="info">模拟演示</NTag>
    </div>

    <!-- 顶部标题栏 -->
    <div class="panel-header">
      <div class="header-left">
        <NIcon :component="SparkIcon" size="18" color="#FF8A65" />
        <span class="panel-title">Claude Code</span>
      </div>
      <div class="header-right">
        <NButton text size="small" @click="handleNewChat" title="新对话 (Cmd+N)">
          <template #icon><NIcon :component="PlusIcon" size="14" /></template>
        </NButton>
        <NButton text size="small" @click="handleHistory" title="对话历史">
          <template #icon><NIcon :component="HistoryIcon" size="14" /></template>
        </NButton>
      </div>
    </div>

    <!-- 主内容区域 -->
    <div class="panel-content" ref="chatHistoryRef">
      <!-- 欢迎界面 -->
      <div v-if="mergedMessages.length === 0" class="welcome-screen">
        <div class="welcome-icon">
          <NIcon :component="SparkIcon" size="64" color="#FF8A65" />
        </div>
        <h3 class="welcome-title">欢迎使用 Claude Code</h3>
        <p class="welcome-desc">我可以帮助你编写、理解和改进代码</p>

        <!-- 功能菜单面板 -->
        <div class="menu-panel">
          <div class="menu-section">
            <div class="menu-label">Context</div>
            <div class="menu-item" @click="handleAttachFile">
              <NIcon :component="FileIcon" size="14" color="#666" />
              <span>Attach file...</span>
            </div>
            <div class="menu-item" @click="handleMentionFile">
              <span class="at-symbol">@</span>
              <span>Mention file from this project...</span>
            </div>
            <div class="menu-item" @click="handleClearChat">
              <NIcon :component="TrashIcon" size="14" color="#666" />
              <span>Clear conversation</span>
            </div>
          </div>

          <div class="menu-section">
            <div class="menu-label">Model</div>
            <div class="menu-item" @click="toggleModel">
              <NIcon :component="CogIcon" size="14" color="#666" />
              <span>Switch model...</span>
              <span class="model-badge">{{ currentModel }}</span>
            </div>
          </div>

          <div class="menu-section">
            <div class="menu-item" @click="thinkingEnabled = !thinkingEnabled">
              <span>Thinking</span>
              <div class="switch-toggle" :class="{ active: thinkingEnabled }">
                <div class="switch-thumb"></div>
              </div>
            </div>
          </div>

          <div class="menu-section">
            <div class="menu-label">Customize</div>
            <div class="menu-item" @click="handleSettings">
              <NIcon :component="PlugIcon" size="14" color="#666" />
              <span>Plugins</span>
            </div>
            <div class="menu-item" @click="handleSettings">
              <NIcon :component="ServerIcon" size="14" color="#666" />
              <span>Manage MCP servers</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 消息列表 -->
      <div v-else class="messages-container">
        <div
          v-for="(message, index) in mergedMessages"
          :key="index"
          :class="['message-row', message.role]"
        >
          <!-- 用户消息 -->
          <template v-if="message.role === 'user'">
            <div class="message-bubble user-bubble">
              {{ message.content }}
            </div>
          </template>

          <!-- Claude 消息 -->
          <template v-else>
            <div class="message-bubble assistant-bubble">
              <div class="message-content" v-html="formatMessage(message.content)"></div>

              <!-- 代码差异 -->
              <div v-if="message.diff" class="diff-container">
                <div class="diff-header">
                  <span>{{ message.diff.file }}</span>
                  <NTag size="small" type="warning">预览</NTag>
                </div>
                <div class="diff-body">
                  <div class="diff-removed">
                    <span class="diff-sign">-</span>
                    <code>{{ message.diff.original }}</code>
                  </div>
                  <div class="diff-added">
                    <span class="diff-sign">+</span>
                    <code>{{ message.diff.modified }}</code>
                  </div>
                </div>
                <div class="diff-actions">
                  <NButton size="small" type="primary" @click="applyDiff(message)">
                    接受
                  </NButton>
                  <NButton size="small" @click="rejectDiff(message)">
                    拒绝
                  </NButton>
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 正在输入 -->
        <div v-if="mergedIsTyping" class="message-row assistant">
          <div class="message-bubble assistant-bubble">
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部输入区域 -->
    <div class="panel-footer">
      <!-- 文件引用栏 -->
      <div v-if="mentionedFiles.length" class="mention-bar">
        <NSpace :size="8">
          <NTag
            v-for="file in mentionedFiles"
            :key="file"
            closable
            size="small"
            type="info"
            @close="removeMention(file)"
          >
            @{{ file }}
          </NTag>
        </NSpace>
      </div>

      <!-- 输入框 -->
      <div class="input-container" :class="{ focused: inputFocused }">
        <div class="input-left">
          <NCheckbox size="small" v-model="askBeforeEdits">
            Ask before edits
          </NCheckbox>
          <span v-if="activeFile" class="active-file-badge">
            <NIcon :component="FileIcon" size="12" />
            {{ activeFile }}
          </span>
        </div>

        <input
          ref="inputRef"
          v-model="inputContent"
          class="chat-input"
          placeholder="Esc to focus or unfocus Claude"
          @focus="inputFocused = true"
          @blur="inputFocused = false"
          @keydown="handleKeydown"
        />

        <div class="input-right">
          <NButton text size="small" @click="handleAttachFile">
            <template #icon><NIcon :component="PlusIcon" size="16" /></template>
          </NButton>
          <NButton text size="small" @click="handleSlashCommand">
            <template #icon><NIcon :component="SlashIcon" size="16" /></template>
          </NButton>
          <NButton
            type="primary"
            circle
            size="small"
            :disabled="!inputContent.trim() || mergedIsTyping"
            @click="sendMessage"
          >
            <template #icon><NIcon :component="SendIcon" size="14" /></template>
          </NButton>
        </div>
      </div>
    </div>

    <!-- 文件选择器 -->
    <NModal v-model:show="showFilePicker" preset="card" title="选择文件" style="width: 400px;">
      <NInput
        v-model="fileSearchQuery"
        placeholder="搜索文件..."
        style="margin-bottom: 12px;"
      />
      <NList hoverable clickable>
        <NListItem
          v-for="file in filteredFiles"
          :key="file.name"
          @click="mentionFile(file.name)"
        >
          <NIcon :component="getFileIcon(file.type)" :style="{ color: getFileColor(file.type) }" style="margin-right: 8px;" />
          {{ file.name }}
        </NListItem>
      </NList>
    </NModal>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted } from 'vue'
import {
  NButton, NIcon, NTag, NSpace, NInput, NModal, NList, NListItem, NCheckbox
} from 'naive-ui'
import {
  Bolt as SparkIcon,
  Plus as PlusIcon,
  Clock as HistoryIcon,
  File as FileIcon,
  PaperPlane as SendIcon,
  Cog as CogIcon,
  Trash as TrashIcon,
  Plug as PlugIcon,
  Server as ServerIcon,
  Slash as SlashIcon,
  FileCode as FileCodeIcon
} from '@vicons/fa'

const props = defineProps({
  demoMode: {
    type: Boolean,
    default: false
  },
  messages: {
    type: Array,
    default: () => []
  },
  isTyping: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['action', 'send-message'])

// 状态 - 如果外部传入则使用外部，否则使用内部状态
const internalMessages = ref([])
const mergedMessages = computed(() => {
  return props.messages.length > 0 ? props.messages : internalMessages.value
})

const inputContent = ref('')
const internalIsTyping = ref(false)
const mergedIsTyping = computed(() => props.isTyping ?? internalIsTyping.value)
const mentionedFiles = ref([])
const showFilePicker = ref(false)
const fileSearchQuery = ref('')
const currentModel = ref('3.5 Sonnet')
const inputFocused = ref(false)
const thinkingEnabled = ref(true)
const askBeforeEdits = ref(true)
const activeFile = ref('')

// Refs
const chatHistoryRef = ref(null)
const inputRef = ref(null)

// 模拟文件列表
const availableFiles = [
  { name: 'index.js', type: 'js' },
  { name: 'App.vue', type: 'vue' },
  { name: 'utils.js', type: 'js' },
  { name: 'config.json', type: 'json' },
  { name: 'README.md', type: 'md' }
]

const filteredFiles = computed(() => {
  if (!fileSearchQuery.value) return availableFiles
  return availableFiles.filter(f =>
    f.name.toLowerCase().includes(fileSearchQuery.value.toLowerCase())
  )
})

// 格式化消息
function formatMessage(content) {
  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>')
}

// 键盘处理
function handleKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    sendMessage()
  }
  if (e.key === 'Escape') {
    if (window.document.activeElement === inputRef.value) {
      inputRef.value.blur()
    } else {
      inputRef.value.focus()
    }
  }
}

// 发送消息
function sendMessage(quickText = null) {
  const content = quickText || inputContent.value.trim()
  if (!content || mergedIsTyping.value) return

  // 如果是外部控制模式（外部传入了 messages），则发送事件
  if (props.messages.length > 0) {
    emit('send-message', content)
    if (!quickText) {
      inputContent.value = ''
    }
    return
  }

  // 内部模式：使用内部状态管理
  internalMessages.value.push({
    role: 'user',
    content,
    timestamp: Date.now()
  })

  if (!quickText) {
    inputContent.value = ''
  }

  internalIsTyping.value = true
  scrollToBottom()

  // 模拟响应
  setTimeout(() => {
    internalIsTyping.value = false

    const responses = [
      {
        content: '我理解你的需求。这是一个演示响应。在实际使用中，我会分析你的代码并提供帮助。'
      },
      {
        content: '我发现了一些可以改进的地方：',
        diff: {
          file: 'index.js',
          original: 'console.log("Hello");',
          modified: 'console.log("Hello, Claude!");'
        }
      }
    ]

    const response = responses[Math.floor(Math.random() * responses.length)]
    internalMessages.value.push({
      role: 'assistant',
      ...response,
      timestamp: Date.now()
    })

    scrollToBottom()
    emit('action', 'message-sent')
  }, 1000)
}

// 应用差异
function applyDiff(message) {
  message.diff = null
  message.content = '✅ 已应用修改！'
  emit('action', 'diff-applied')
}

// 拒绝差异
function rejectDiff(message) {
  message.diff = null
  emit('action', 'diff-rejected')
}

// 提及文件
function mentionFile(filename) {
  if (!mentionedFiles.value.includes(filename)) {
    mentionedFiles.value.push(filename)
  }
  showFilePicker.value = false
  inputContent.value += `@${filename} `
  inputRef.value?.focus()
}

function removeMention(filename) {
  mentionedFiles.value = mentionedFiles.value.filter(f => f !== filename)
}

// 滚动到底部
function scrollToBottom() {
  nextTick(() => {
    if (chatHistoryRef.value) {
      chatHistoryRef.value.scrollTop = chatHistoryRef.value.scrollHeight
    }
  })
}

// 切换模型
function toggleModel() {
  const models = ['3.5 Sonnet', '3 Opus', '3.5 Haiku']
  const currentIndex = models.indexOf(currentModel.value)
  currentModel.value = models[(currentIndex + 1) % models.length]
}

// 获取文件图标
function getFileIcon(_type) {
  return FileCodeIcon
}

function getFileColor(_type) {
  const colors = {
    js: '#f7df1e',
    vue: '#42b883',
    json: '#cbcb41',
    md: '#083fa1'
  }
  return colors[_type] || '#888'
}

// 处理函数
function handleNewChat() {
  internalMessages.value = []
  mentionedFiles.value = []
  emit('action', 'new-chat')
}

function handleHistory() {
  emit('action', 'show-history')
}

function handleAttachFile() {
  showFilePicker.value = true
}

function handleMentionFile() {
  showFilePicker.value = true
}

function handleClearChat() {
  internalMessages.value = []
}

function handleSlashCommand() {
  inputContent.value += '/'
  inputRef.value?.focus()
}

function handleSettings() {
  emit('action', 'open-settings')
}

// 初始化
onMounted(() => {
  if (props.demoMode) {
    internalMessages.value.push({
      role: 'assistant',
      content: '欢迎使用 Claude Code！这是一个交互式演示，你可以尝试发送消息来体验界面功能。',
      timestamp: Date.now()
    })
  }
})
</script>

<style scoped>
.claude-code-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  border: 1px solid #e5e5e5;
}

.claude-code-panel.demo-mode {
  border: 2px solid #FF8A65;
}

.simulation-badge {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
}

/* 顶部标题栏 */
.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 6px;
}

.panel-title {
  font-size: 13px;
  font-weight: 600;
  color: #333;
}

.header-right {
  display: flex;
  gap: 4px;
}

/* 主内容区域 */
.panel-content {
  flex: 1;
  overflow-y: auto;
  background: #ffffff;
}

/* 欢迎界面 */
.welcome-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
  min-height: 400px;
}

.welcome-icon {
  margin-bottom: 16px;
  opacity: 0.9;
}

.welcome-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.welcome-desc {
  margin: 0 0 32px 0;
  font-size: 14px;
  color: #666;
}

/* 功能菜单面板 */
.menu-panel {
  width: 100%;
  max-width: 360px;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.menu-section {
  border-bottom: 1px solid #f0f0f0;
}

.menu-section:last-child {
  border-bottom: none;
}

.menu-label {
  padding: 8px 12px;
  font-size: 11px;
  font-weight: 600;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: #fafafa;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  transition: background 0.15s;
}

.menu-item:hover {
  background: #f5f5f5;
}

.menu-item span {
  flex: 1;
}

.at-symbol {
  font-size: 14px;
  font-weight: 600;
  color: #666;
}

.model-badge {
  font-size: 11px;
  color: #999;
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
}

/* 开关按钮 */
.switch-toggle {
  width: 36px;
  height: 20px;
  background: #ccc;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  transition: background 0.2s;
}

.switch-toggle.active {
  background: #FF8A65;
}

.switch-thumb {
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 2px;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.switch-toggle.active .switch-thumb {
  transform: translateX(16px);
}

/* 消息容器 */
.messages-container {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.message-row {
  display: flex;
}

.message-row.user {
  justify-content: flex-end;
}

.message-row.assistant {
  justify-content: flex-start;
}

.message-bubble {
  max-width: 80%;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.user-bubble {
  background: #FF8A65;
  color: white;
}

.assistant-bubble {
  background: #f5f5f5;
  color: #333;
  border: 1px solid #e5e5e5;
}

.message-content :deep(code) {
  background: rgba(255, 138, 101, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 13px;
  color: #e83e8c;
}

/* 代码差异 */
.diff-container {
  margin-top: 12px;
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  overflow: hidden;
}

.diff-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #fafafa;
  font-size: 12px;
  border-bottom: 1px solid #e5e5e5;
}

.diff-body {
  padding: 12px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.diff-removed,
.diff-added {
  display: flex;
  gap: 8px;
  padding: 6px;
  margin-bottom: 4px;
  border-radius: 4px;
}

.diff-removed {
  background: #fee2e2;
  color: #dc2626;
}

.diff-added {
  background: #dcfce7;
  color: #16a34a;
}

.diff-sign {
  flex-shrink: 0;
  font-weight: bold;
}

.diff-actions {
  display: flex;
  gap: 8px;
  padding: 8px 12px;
  background: #fafafa;
  border-top: 1px solid #e5e5e5;
}

/* 打字指示器 */
.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 4px 0;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #999;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}

.typing-indicator span:nth-child(2) { animation-delay: 0.2s; }
.typing-indicator span:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* 底部输入区域 */
.panel-footer {
  background: #ffffff;
  border-top: 1px solid #e5e5e5;
}

.mention-bar {
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
}

.input-container {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  gap: 8px;
  border: 2px solid #e5e5e5;
  margin: 8px;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.input-container.focused {
  border-color: #FF8A65;
}

.input-left {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}

.active-file-badge {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 11px;
  color: #666;
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 14px;
  color: #333;
  background: transparent;
  min-height: 24px;
}

.chat-input::placeholder {
  color: #999;
}

.input-right {
  display: flex;
  gap: 4px;
}

/* 滚动条 */
.panel-content::-webkit-scrollbar {
  width: 6px;
}

.panel-content::-webkit-scrollbar-track {
  background: transparent;
}

.panel-content::-webkit-scrollbar-thumb {
  background: #e5e5e5;
  border-radius: 3px;
}

.panel-content::-webkit-scrollbar-thumb:hover {
  background: #d0d0d0;
}
</style>
