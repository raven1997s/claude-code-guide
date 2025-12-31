<template>
  <div class="cheat-sheet-container">
    <div class="cheat-sheet-header">
      <h3 class="cyber-heading">
        <span class="cyber-text-cyan">></span> CLI 速查卡
      </h3>
      <button @click="downloadCard" class="download-btn">
        <n-icon :component="DownloadIcon" />
        下载
      </button>
    </div>

    <div class="cheat-sheet-grid">
      <div
        v-for="(section, index) in cheatSheetData"
        :key="index"
        class="cheat-section"
        :class="`section-color-${index % 5}`"
      >
        <h4 class="section-title">{{ section.category }}</h4>
        <div class="commands-list">
          <div
            v-for="(cmd, cmdIndex) in section.commands"
            :key="cmdIndex"
            class="command-item"
          >
            <code class="command-syntax">{{ cmd.syntax }}</code>
            <span class="command-desc">{{ cmd.description }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 隐藏的 Canvas 用于生成图像 -->
    <canvas ref="canvas" style="display: none;"></canvas>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { NIcon } from 'naive-ui'
import { Download as DownloadIcon } from '@vicons/fa'

const canvas = ref(null)

const cheatSheetData = [
  {
    category: '启动与会话',
    commands: [
      { syntax: 'claude', description: '启动交互式会话' },
      { syntax: 'claude -c', description: '继续上次对话' },
      { syntax: 'claude "prompt"', description: '快速提问' },
      { syntax: 'claude -r [id]', description: '恢复指定会话' }
    ]
  },
  {
    category: '模型选择',
    commands: [
      { syntax: '--model sonnet', description: 'Claude 3.5 Sonnet' },
      { syntax: '--model opus', description: 'Claude 3 Opus' },
      { syntax: '--model haiku', description: 'Claude 3.5 Haiku' }
    ]
  },
  {
    category: '文件引用',
    commands: [
      { syntax: '@file.txt', description: '引用单个文件' },
      { syntax: '@file.txt:10-20', description: '引用指定行' },
      { syntax: '#selection', description: '引用 IDE 选中内容' }
    ]
  },
  {
    category: '会话内命令',
    commands: [
      { syntax: '/help', description: '显示帮助信息' },
      { syntax: '/clear', description: '清除对话上下文' },
      { syntax: '/commit', description: '创建 Git 提交' },
      { syntax: '/tasks', description: '查看任务列表' }
    ]
  },
  {
    category: '高级选项',
    commands: [
      { syntax: '-p', description: '从管道读取输入' },
      { syntax: '--no-prompt', description: '非交互模式' },
      { syntax: '--output', description: '输出到文件' }
    ]
  }
]

async function downloadCard() {
  const c = canvas.value
  const ctx = c.getContext('2d')

  // 设置画布尺寸
  const width = 1200
  const height = 1600
  c.width = width
  c.height = height

  // 背景
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#0D1117')
  gradient.addColorStop(1, '#1a1a2e')
  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // 网格线
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.05)'
  ctx.lineWidth = 1
  for (let i = 0; i < width; i += 50) {
    ctx.beginPath()
    ctx.moveTo(i, 0)
    ctx.lineTo(i, height)
    ctx.stroke()
  }
  for (let i = 0; i < height; i += 50) {
    ctx.beginPath()
    ctx.moveTo(0, i)
    ctx.lineTo(width, i)
    ctx.stroke()
  }

  // 标题
  ctx.fillStyle = '#00F5FF'
  ctx.font = 'bold 48px Orbitron, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('CLAUDE CODE CLI', width / 2, 80)
  ctx.fillStyle = '#FF006E'
  ctx.fillText('速查卡', width / 2, 140)

  // 分割线
  ctx.strokeStyle = '#00F5FF'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(100, 170)
  ctx.lineTo(width - 100, 170)
  ctx.stroke()

  // 绘制命令分区
  let y = 220
  const colors = ['#00F5FF', '#FF006E', '#00FF94', '#FFD700', '#FF69B4']
  const padding = 40
  const sectionHeight = 240

  cheatSheetData.forEach((section, index) => {
    let sectionY = y + (index * sectionHeight)

    // 分区标题
    ctx.fillStyle = colors[index % colors.length]
    ctx.font = 'bold 24px JetBrains Mono, monospace'
    ctx.textAlign = 'left'
    ctx.fillText(section.category, padding, sectionY + 30)

    // 分区背景
    ctx.fillStyle = 'rgba(255, 255, 255, 0.02)'
    ctx.fillRect(padding - 10, sectionY + 40, width - padding * 2 + 20, sectionHeight - 60)

    // 命令列表
    sectionY += 60
    ctx.font = '16px JetBrains Mono, monospace'

    section.commands.forEach((cmd, cmdIndex) => {
      const cmdY = sectionY + (cmdIndex * 28)

      // 命令语法
      ctx.fillStyle = colors[index % colors.length]
      ctx.textAlign = 'left'
      ctx.fillText(cmd.syntax, padding, cmdY)

      // 描述
      ctx.fillStyle = '#8b949e'
      ctx.textAlign = 'left'
      ctx.fillText(cmd.description, padding + 250, cmdY)
    })

    y += sectionHeight
  })

  // 底部
  ctx.fillStyle = '#6e7681'
  ctx.font = '14px JetBrains Mono, monospace'
  ctx.textAlign = 'center'
  ctx.fillText('github.com/raven1997s/claude-code-guide', width / 2, height - 30)

  // 下载
  const link = window.document.createElement('a')
  link.download = 'claude-code-cli-cheatsheet.png'
  link.href = c.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.cheat-sheet-container {
  max-width: 1000px;
  margin: 0 auto;
}

.cheat-sheet-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid var(--cyber-card-border);
}

.cheat-sheet-header h3 {
  margin: 0;
  font-size: 24px;
}

.download-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: transparent;
  border: 1px solid var(--cyber-cyan);
  color: var(--cyber-cyan);
  border-radius: var(--cyber-radius-sm);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: 14px;
  transition: all 0.3s;
}

.download-btn:hover {
  background: var(--cyber-cyan);
  color: var(--cyber-dark);
  box-shadow: var(--cyber-glow-cyan);
}

.cheat-sheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.cheat-section {
  padding: 20px;
  background: var(--cyber-card-bg);
  border: 1px solid var(--cyber-card-border);
  border-radius: var(--cyber-radius-md);
  position: relative;
  overflow: hidden;
}

.cheat-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
}

.section-color-0::before { background: var(--cyber-cyan); }
.section-color-1::before { background: var(--cyber-pink); }
.section-color-2::before { background: var(--cyber-green); }
.section-color-3::before { background: #FFD700; }
.section-color-4::before { background: #FF69B4; }

.section-title {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--cyber-text-primary);
}

.commands-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.command-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.command-syntax {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--cyber-cyan);
  background: rgba(0, 245, 255, 0.05);
  padding: 4px 8px;
  border-radius: 4px;
}

.command-desc {
  font-size: 13px;
  color: var(--cyber-text-secondary);
}
</style>
