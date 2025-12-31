/**
 * VS Code 插件模拟模块专用数据
 * 包含虚拟文件系统、预设对话响应和动作类型定义
 */

// ============ 虚拟文件系统 ============
export const VIRTUAL_FILES = {
  'src/App.vue': `<template>
  <n-config-provider :theme="darkTheme">
    <n-dialog-provider>
      <n-message-provider>
        <n-layout>
          <!-- 导航栏 -->
          <n-layout-header bordered class="header">
            <div class="header-content">
              <div class="logo" @click="router.push('/')">
                <n-icon size="28" :component="TerminalIcon" />
                <span>Claude Code 学习中心</span>
              </div>
              <n-space :size="8">
                <n-button
                  v-for="item in menuItems"
                  :key="item.key"
                  :type="activeKey === item.key ? 'primary' : 'default'"
                  @click="router.push(item.key)"
                >
                  {{ item.label }}
                </n-button>
              </n-space>
            </div>
          </n-layout-header>
          <router-view />
        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NConfigProvider, NLayout, NButton, NIcon } from 'naive-ui'

const router = useRouter()
const route = useRoute()
const activeKey = computed(() => route.path)
</script>`,

  'src/components/TerminalComponent.vue': `<template>
  <n-card title="模拟终端">
    <div class="terminal">
      <div class="terminal-output">
        <div v-for="(line, index) in output" :key="index" class="terminal-line">
          <span v-if="line.type === 'command'" class="terminal-prompt">
            {{ line.prompt }}
          </span>
          <span v-else class="terminal-response">{{ line.text }}</span>
        </div>
      </div>
      <div class="terminal-input">
        <span class="terminal-prompt">{{ prompt }}</span>
        <input
          v-model="input"
          type="text"
          @keydown.enter="handleSubmit"
          placeholder="输入命令..."
        />
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const input = ref('')
const output = ref([])
const inSession = ref(false)

const prompt = computed(() => inSession.value ? '>' : '$')

function handleSubmit() {
  const command = input.value.trim()
  if (!command) return

  output.value.push({ type: 'command', text: command, prompt: prompt.value })

  // 处理命令...
  input.value = ''
}
</script>`,

  'src/data/game-data.js': `/**
 * 游戏数据文件
 * 包含所有关卡和终端响应
 */

// 关卡数据结构
export const LEVELS = [
  {
    id: 1,
    category: "cli",
    name: "初出茅庐",
    icon: "fa-terminal",
    objective: "了解 Claude Code 并查看版本信息",
    requiredCommands: ["claude --version"],
    task: "在模拟终端中输入：claude --version"
  },
  // ... 更多关卡
]

// 终端响应映射
export const TERMINAL_RESPONSES = {
  'claude --version': \`Claude Code version 1.0.0
Build: 2024.12.30
Protocol: v2\`,
  // ... 更多响应
}

// 关卡分类
export const LEVEL_CATEGORIES = {
  cli: { label: 'CLI 命令', icon: 'fa-terminal', color: '#22d3ee' },
  session: { label: '会话命令', icon: 'fa-comments', color: '#a78bfa' },
  vscode: { label: 'VS Code 插件', icon: 'fa-code', color: '#60a5fa' }
}`,

  'src/buggy-file.js': `/**
 * 有 bug 的计算函数
 * 任务：找出并修复这个函数的问题
 */
function calculateTotal(items) {
  let sum = 0
  // Bug: 这里应该是 < 而不是 <=，会导致访问 undefined
  for (let i = 0; i <= items.length; i++) {
    sum += items[i].price
  }
  return sum
}

// 测试用例
const cart = [
  { name: 'Apple', price: 5 },
  { name: 'Banana', price: 3 }
]

console.log(calculateTotal(cart)) // 应该输出 8，但会报错`,

  'src/utils/calculator.js': `/**
 * 简单的计算工具
 */
function sum(items) {
  let total = 0
  for (let item of items) {
    total += item.value
  }
  return total
}

function average(items) {
  if (items.length === 0) return 0
  return sum(items) / items.length
}

export { sum, average }`,

  'src/components/SearchBox.vue': `<template>
  <div class="search-box">
    <n-input
      v-model:value="searchQuery"
      placeholder="搜索命令、功能..."
      @input="handleSearch"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>
    <div v-if="results.length > 0" class="search-results">
      <div v-for="result in results" :key="result.command" class="result-item">
        <code>{{ result.command }}</code>
        <span>{{ result.desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Fuse from 'fuse.js'

const searchQuery = ref('')
const results = ref([])

function handleSearch() {
  // 使用 Fuse.js 进行模糊搜索
}
</script>`
}

// ============ 预设对话响应 ============
export const VSCODE_CONVERSATIONS = {
  // 基础对话
  'hello': {
    role: 'assistant',
    content: `[模拟] 你好！我是 Claude，可以在 VS Code 中帮助你编写和理解代码。

我还可以：
- 解释代码的工作原理
- 帮助发现和修复 bug
- 提供重构建议
- 生成提交信息

这是一个模拟练习环境，所有对话都是预设的响应。`,
    actions: []
  },

  '你好': {
    role: 'assistant',
    content: `[模拟] 你好！很高兴见到你。我是 Claude，已准备好在 VS Code 中帮助你。

你可以：
• 让我解释代码
• 请求代码审查
• 寻求重构建议
• 生成 Git 提交信息

试试向我提问吧！`,
    actions: []
  },

  // 代码解释 - LEVELS 数据结构
  'explain_LEVELS': {
    role: 'assistant',
    content: `[模拟] LEVELS 是一个包含所有关卡数据的数组。每个关卡对象的结构如下：

\`\`\`javascript
{
  id: 1,                    // 关卡唯一标识
  category: "cli",          // 分类：cli/session/git/mixed/master
  name: "初出茅庐",          // 关卡名称
  icon: "fa-terminal",      // Font Awesome 图标类名
  objective: "了解 Claude Code 并查看版本信息",  // 学习目标
  requiredCommands: ["claude --version"],  // 必需执行的命令列表
  task: "任务描述..."        // 详细任务说明
}
\`\`\`

关卡数据被 GameView.vue 组件使用，用于渲染关卡卡片和验证完成条件。`,
    highlightedCode: {
      file: 'src/data/game-data.js',
      startLine: 5,
      endLine: 20
    },
    actions: []
  },

  // 代码解释 - processCommand 函数
  'explain_processCommand': {
    role: 'assistant',
    content: `[模拟] processCommand 函数是 TerminalComponent 的核心，负责处理用户输入的命令：

**工作流程：**

1. **会话管理** - 检测 \`claude\` 命令进入会话模式
2. **别名处理** - 会话内将 \`help\` 转换为 \`/help\`
3. **响应匹配** - 精确匹配或模糊匹配预设响应
4. **默认响应** - 未匹配时返回提示信息

**关键逻辑：**
\`\`\`javascript
// 精确匹配
let response = props.responses[command]

// 模糊匹配（部分匹配）
if (!response) {
  for (const key in props.responses) {
    if (command.includes(key) || key.includes(command)) {
      response = props.responses[key]
      break
    }
  }
}
\`\`\`

这个设计让终端既支持精确命令，也支持自然语言输入。`,
    highlightedCode: {
      file: 'src/components/TerminalComponent.vue',
      startLine: 42,
      endLine: 82
    },
    actions: []
  },

  // 问题诊断 - buggy-file.js
  'find_bug': {
    role: 'assistant',
    content: `[模拟] 我发现了 buggy-file.js 中的问题！

**Bug 位置：** 第 11 行
\`\`\`javascript
for (let i = 0; i <= items.length; i++) {
                 ^^^ 这里应该是 < 而不是 <=
\`\`\`

**问题分析：**
- 数组索引从 0 开始，最大有效索引是 \`items.length - 1\`
- 使用 \`<=\` 会导致访问 \`items[items.length]\`，即 \`undefined\`
- 尝试访问 \`undefined.price\` 会报错

**修复方案：**
\`\`\`javascript
for (let i = 0; i < items.length; i++) {  // 改为 <
  sum += items[i].price
}
\`\`\``,
    highlightedCode: {
      file: 'src/buggy-file.js',
      startLine: 10,
      endLine: 15
    },
    actions: [
      { type: 'apply-fix', label: '应用修复', file: 'src/buggy-file.js' }
    ]
  },

  // 重构建议
  'refactor_suggestion': {
    role: 'assistant',
    content: `[模拟] 我注意到 calculator.js 中的 sum 函数可以优化。

**当前实现：**
\`\`\`javascript
function sum(items) {
  let total = 0
  for (let item of items) {
    total += item.value
  }
  return total
}
\`\`\`

**建议使用 reduce 方法：**
\`\`\`javascript
function sum(items) {
  return items.reduce((acc, item) => acc + item.value, 0)
}
\`\`\`

**优化理由：**
- 更简洁，从 5 行减少到 1 行
- 使用函数式编程风格
- 性能相同（都是 O(n)）
- 更符合现代 JavaScript 习惯`,
    diff: {
      file: 'src/utils/calculator.js',
      original: `function sum(items) {
  let total = 0
  for (let item of items) {
    total += item.value
  }
  return total
}`,
      modified: `function sum(items) {
  return items.reduce((acc, item) => acc + item.value, 0)
}`
    },
    actions: [
      { type: 'apply-diff', label: '应用修改' },
      { type: 'discard', label: '忽略建议' }
    ]
  },

  // Git 提交信息生成
  'commit_message': {
    role: 'assistant',
    content: `[模拟] 根据当前的代码改动，建议的提交信息：

\`\`\`
refactor: optimize sum function using reduce

- Replace loop with reduce method for better readability
- Maintain same functionality and performance
\`\`\`

**改动摘要：**
- 修改文件: src/utils/calculator.js
- 删除行数: 4 行
- 新增行数: 1 行
- 净减少: 3 行代码

**提交类型说明：**
- \`refactor\` - 代码重构，不改变功能
- \`feat\` - 新功能
- \`fix\` - 修复 bug
- \`docs\` - 文档更新
- \`style\` - 代码格式调整`,
    actions: [
      { type: 'copy-commit', label: '复制提交信息' }
    ]
  },

  // 多文件编辑
  'multi_file_edit': {
    role: 'assistant',
    content: `[模拟] 我可以同时修改多个文件来完善这个功能。

**需要修改的文件：**

1. **src/utils/calculator.js** - 添加新的乘法函数
2. **src/components/SearchBox.vue** - 导入并使用新函数

这种跨文件编辑能力让我能够：
- 在一个文件中定义新功能
- 在另一个文件中使用它
- 保持代码的一致性

在实际使用中，我会先展示所有预览，等你确认后再一起应用。`,
    actions: [
      { type: 'preview-changes', label: '预览所有改动' },
      { type: 'apply-all', label: '全部应用' }
    ]
  },

  // 默认响应
  'default': {
    role: 'assistant',
    content: `[模拟] 我收到了你的消息。

这是一个模拟练习环境，我只会响应预设的对话内容。在实际使用 VS Code 插件时，你的消息会被发送到 Claude API 进行处理。

试试这些预设的对话：
• "你好" - 基础问候
• "解释 LEVELS 数据结构" - 代码解释
• "找出这个函数的 bug" - 问题诊断
• "如何优化这段代码" - 重构建议`,
    actions: []
  }
}

// ============ 动作类型定义 ============
export const ACTION_TYPES = {
  // 界面交互
  CLICK_PANEL: 'click-panel',        // 点击 Claude Code 面板
  SELECT_FILE: 'select-file',        // 选择文件
  SWITCH_TAB: 'switch-tab',          // 切换标签页

  // 对话交互
  SEND_MESSAGE: 'send-message',      // 发送消息
  SELECT_QUICK_ACTION: 'quick-action', // 选择快捷操作

  // 代码操作
  APPLY_DIFF: 'apply-diff',          // 应用代码差异
  APPLY_FIX: 'apply-fix',            // 应用 bug 修复
  DISCARD_DIFF: 'discard-diff',      // 忽略差异
  VIEW_DIFF: 'view-diff',            // 查看差异

  // Git 操作
  VIEW_CHANGES: 'view-changes',      // 查看改动
  GENERATE_COMMIT: 'generate-commit', // 生成提交信息
  COPY_COMMIT: 'copy-commit'         // 复制提交信息
}

// ============ 关卡辅助函数 ============

/**
 * 根据关卡 ID 获取所需的虚拟文件
 */
export function getFilesForLevel(levelId) {
  const fileMap = {
    26: ['src/App.vue'],
    27: [],
    28: ['src/App.vue', 'src/components/TerminalComponent.vue'],
    29: ['src/data/game-data.js'],
    30: ['src/components/TerminalComponent.vue'],
    31: ['src/buggy-file.js'],
    32: ['src/utils/calculator.js'],
    33: ['src/utils/calculator.js'],
    34: ['src/utils/calculator.js', 'src/components/SearchBox.vue'],
    35: ['src/utils/calculator.js'],
    36: ['src/utils/calculator.js'],
    37: ['src/App.vue', 'src/data/game-data.js', 'src/components/TerminalComponent.vue']
  }

  const files = fileMap[levelId] || []
  const result = {}

  files.forEach(path => {
    if (VIRTUAL_FILES[path]) {
      result[path] = {
        path,
        content: VIRTUAL_FILES[path],
        modified: false
      }
    }
  })

  return result
}

/**
 * 匹配对话响应
 */
export function matchConversation(message, contextFile) {
  const msg = message.toLowerCase().trim()

  // 精确匹配
  for (const [key, response] of Object.entries(VSCODE_CONVERSATIONS)) {
    if (msg.includes(key.toLowerCase()) || msg === key.toLowerCase()) {
      return response
    }
  }

  // 上下文相关匹配
  if (contextFile) {
    if (msg.includes('解释') || msg.includes('explain')) {
      if (contextFile.includes('game-data.js')) return VSCODE_CONVERSATIONS['explain_LEVELS']
      if (contextFile.includes('TerminalComponent')) return VSCODE_CONVERSATIONS['explain_processCommand']
    }
  }

  // 特殊关键词匹配
  if (msg.includes('bug') || msg.includes('问题') || msg.includes('错误')) {
    return VSCODE_CONVERSATIONS['find_bug']
  }
  if (msg.includes('优化') || msg.includes('重构') || msg.includes('改进')) {
    return VSCODE_CONVERSATIONS['refactor_suggestion']
  }
  if (msg.includes('提交') || msg.includes('commit')) {
    return VSCODE_CONVERSATIONS['commit_message']
  }
  if (msg.includes('多文件') || msg.includes('同时')) {
    return VSCODE_CONVERSATIONS['multi_file_edit']
  }

  // 默认响应
  return VSCODE_CONVERSATIONS['default']
}
