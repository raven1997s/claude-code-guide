<template>
  <n-card title="模拟终端" class="terminal-card">
    <div class="terminal">
      <div class="terminal-header">
        <n-space>
          <div class="terminal-dot" style="background: #ff5f57"></div>
          <div class="terminal-dot" style="background: #febc2e"></div>
          <div class="terminal-dot" style="background: #28c840"></div>
        </n-space>
        <n-text depth="3">terminal</n-text>
      </div>

      <div ref="outputRef" class="terminal-output">
        <div v-for="(line, index) in output" :key="index" class="terminal-line">
          <template v-if="line.type === 'command'">
            <span class="terminal-prompt">{{ line.prompt }}</span>
            <span class="terminal-command">{{ line.text }}</span>
          </template>
          <span v-else class="terminal-response">{{ line.text }}</span>
        </div>
      </div>

      <div class="terminal-input">
        <span class="terminal-prompt">{{ prompt }}</span>
        <input
          ref="inputRef"
          v-model="input"
          type="text"
          @keydown.enter="handleSubmit"
          @keydown.tab.prevent="handleTabComplete"
          placeholder="输入命令..."
          autocomplete="off"
          spellcheck="false"
        >
      </div>

      <n-text depth="3" style="font-size: 12px; margin-top: 8px;">
        提示：按 Enter 执行命令，按 Tab 自动补全
      </n-text>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed, nextTick, watch } from 'vue'
import { NCard, NSpace, NText } from 'naive-ui'

const props = defineProps({
  responses: {
    type: Object,
    required: true
  },
  requiredCommands: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['command-executed', 'all-completed'])

const input = ref('')
const output = ref([
  { type: 'response', text: 'Claude Code 终端模拟器 v1.0' },
  { type: 'response', text: '输入 "help" 查看可用命令' },
  { type: 'response', text: '' }
])

const outputRef = ref(null)
const inputRef = ref(null)

// 会话状态
const inSession = ref(false)
const executedCommands = ref(new Set())

const prompt = computed(() => inSession.value ? '>' : '$')

// 可用命令列表（用于自动补全）
const availableCommands = computed(() => {
  // 基础命令
  const commands = [
    'claude',
    'help',
    '--help',
    '-h',
    '--version',
    '-v',
    '--print',
    '-p',
    '--continue',
    '-c',
    '--resume',
    '-r',
    '--model',
    '--agent',
    'ls',
    'cd',
    'pwd',
    'cat',
    'echo',
    'git',
    'git status',
    'git diff',
    'git log',
    'git add',
    'git commit',
    'git push',
    'git pull',
    'npm',
    'npm install',
    'npm run',
    'npm test',
    'npm build',
    'node',
    'python',
    'python3'
  ]

  // 会话内命令
  if (inSession.value) {
    commands.push(
      '/help',
      '/clear',
      '/commit',
      '/tasks',
      '/exit',
      '/editor',
      '/continue',
      '/skip',
      '/accept',
      '/reject',
      '/model',
      '/diff',
      '/read',
      '/write',
      'exit',
      'help',
      'clear',
      'commit',
      'tasks'
    )
  }

  // 添加当前关卡必需的命令
  props.requiredCommands.forEach(cmd => {
    if (!commands.includes(cmd)) {
      commands.push(cmd)
    }
  })

  return commands
})

// Tab 自动补全
function handleTabComplete() {
  const currentInput = input.value.trim()
  if (!currentInput) {
    // 如果输入为空，显示第一个必需命令或常用命令
    const suggested = props.requiredCommands[0] || availableCommands.value[0]
    input.value = suggested
    return
  }

  // 查找匹配的命令
  const matches = availableCommands.value.filter(cmd =>
    cmd.startsWith(currentInput)
  )

  if (matches.length === 0) {
    // 没有匹配，尝试模糊匹配
    const fuzzyMatches = availableCommands.value.filter(cmd =>
      cmd.includes(currentInput) || currentInput.includes(cmd)
    )
    if (fuzzyMatches.length > 0) {
      input.value = fuzzyMatches[0]
    }
  } else if (matches.length === 1) {
    // 唯一匹配，直接补全
    input.value = matches[0]
  } else {
    // 多个匹配，补全到公共前缀
    const commonPrefix = getCommonPrefix(matches)
    if (commonPrefix.length > currentInput.length) {
      input.value = commonPrefix
    } else {
      // 显示所有匹配项
      output.value.push({ type: 'response', text: `可用命令: ${matches.join(', ')}` })
      output.value.push({ type: 'response', text: '' })
      nextTick(() => {
        if (outputRef.value) {
          outputRef.value.scrollTop = outputRef.value.scrollHeight
        }
      })
    }
  }
}

// 获取公共前缀
function getCommonPrefix(strings) {
  if (strings.length === 0) return ''
  if (strings.length === 1) return strings[0]

  let prefix = strings[0]
  for (let i = 1; i < strings.length; i++) {
    while (strings[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1)
      if (prefix === '') return ''
    }
  }
  return prefix
}

// 监听输入变化，自动聚焦
watch(input, () => {
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
})

// 提交命令
function handleSubmit() {
  const command = input.value.trim()
  if (!command) return

  // 添加命令到输出
  output.value.push({ type: 'command', text: command, prompt: prompt.value })

  // 处理命令
  processCommand(command)

  // 清空输入
  input.value = ''

  // 滚动到底部
  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  })
}

// 处理命令
function processCommand(command) {
  // 会话管理
  if (command === 'claude' && !inSession.value) {
    inSession.value = true
    output.value.push({ type: 'response', text: 'Starting Claude Code session...' })
    output.value.push({ type: 'response', text: 'Type your message or /help for commands.' })
    output.value.push({ type: 'response', text: '' })
    return
  }

  if ((command === '/exit' || command === 'exit') && inSession.value) {
    inSession.value = false
    output.value.push({ type: 'response', text: 'Exiting session...' })
    output.value.push({ type: 'response', text: '' })
    checkRequiredCommands(command, true)
    return
  }

  // 会话内的别名处理
  if (inSession.value) {
    const aliasMap = {
      'help': '/help',
      'clear': '/clear',
      'tasks': '/tasks',
      'commit': '/commit'
    }
    if (aliasMap[command]) {
      command = aliasMap[command]
    }
  }

  // 获取响应
  let response = props.responses[command]

  // 如果没有完全匹配，尝试部分匹配
  if (!response) {
    for (const key in props.responses) {
      if (command.includes(key) || key.includes(command)) {
        response = props.responses[key]
        break
      }
    }
  }

  // 默认响应
  if (!response) {
    if (inSession.value) {
      response = `I received: "${command}"\n\nThis is a simulated response.`
    } else {
      response = `Command not found: ${command}\nType --help for available commands.`
    }
  }

  // 添加响应
  output.value.push({ type: 'response', text: response })
  output.value.push({ type: 'response', text: '' })

  // 检查是否是必需命令
  checkRequiredCommands(command)
}

// 检查必需命令
function checkRequiredCommands(command, _force = false) {
  const wasRequired = props.requiredCommands.includes(command) && !executedCommands.value.has(command)

  if (wasRequired) {
    executedCommands.value.add(command)
    emit('command-executed', { command, wasRequired })

    // 检查是否全部完成
    if (executedCommands.value.size >= props.requiredCommands.length) {
      emit('all-completed')
    }
  } else if (props.requiredCommands.includes(command)) {
    emit('command-executed', { command, wasRequired: false })
  }
}

// 自动聚焦
nextTick(() => {
  if (inputRef.value) {
    inputRef.value.focus()
  }
})

// 暴露方法
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<style scoped>
.terminal-card {
  background: #1e1e1e;
}

.terminal {
  background: #000;
  border-radius: 8px;
  padding: 16px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
}

.terminal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #333;
}

.terminal-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-output {
  min-height: 200px;
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 12px;
  white-space: pre-wrap;
  word-break: break-word;
}

.terminal-line {
  margin-bottom: 4px;
}

.terminal-prompt {
  color: #22d3ee;
  margin-right: 8px;
}

.terminal-command {
  color: #a5b4fc;
  font-weight: 500;
}

.terminal-response {
  color: #e4e4e7;
}

.terminal-input {
  display: flex;
  align-items: center;
  background: #111;
  border-radius: 4px;
  padding: 8px 12px;
}

.terminal-input input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e4e4e7;
  font-family: inherit;
  font-size: inherit;
  outline: none;
}

.terminal-input input::placeholder {
  color: #71717a;
}
</style>
