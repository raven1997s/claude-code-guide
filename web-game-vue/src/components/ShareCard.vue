<template>
  <div class="share-card-container">
    <div class="preview-section">
      <h3 class="cyber-heading">
        <span class="cyber-text-pink">></span> 分享卡片
      </h3>
      <p class="preview-desc">生成精美的学习进度分享图</p>

      <div class="card-options">
        <div class="option-group">
          <label>卡片主题</label>
          <select v-model="cardTheme">
            <option value="cyber">赛博朋克</option>
            <option value="minimal">极简风格</option>
            <option value="gradient">渐变美学</option>
          </select>
        </div>

        <div class="option-group">
          <label>显示内容</label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="showStats" />
            <span>进度统计</span>
          </label>
          <label class="checkbox-label">
            <input type="checkbox" v-model="showBadges" />
            <span>获得徽章</span>
          </label>
        </div>

        <button @click="generateShareCard" class="generate-btn cyber-btn">
          生成卡片
        </button>
      </div>
    </div>

    <canvas ref="shareCanvas" style="display: none;"></canvas>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  completedLevels: {
    type: Array,
    default: () => []
  },
  totalLevels: {
    type: Number,
    default: 25
  }
})

const shareCanvas = ref(null)
const cardTheme = ref('cyber')
const showStats = ref(true)
const showBadges = ref(true)

const progressPercent = computed(() => {
  return Math.round((props.completedLevels.length / props.totalLevels) * 100)
})

const themeColors = {
  cyber: {
    bg: ['#0D1117', '#1a1a2e'],
    primary: '#00F5FF',
    secondary: '#FF006E',
    accent: '#00FF94',
    text: '#e6edf3'
  },
  minimal: {
    bg: ['#ffffff', '#f5f5f5'],
    primary: '#000000',
    secondary: '#333333',
    accent: '#666666',
    text: '#000000'
  },
  gradient: {
    bg: ['#667eea', '#764ba2'],
    primary: '#ffffff',
    secondary: '#f0f0f0',
    accent: '#ffffff',
    text: '#ffffff'
  }
}

async function generateShareCard() {
  const canvas = shareCanvas.value
  const ctx = canvas.getContext('2d')

  // 设置画布尺寸（适合社交媒体分享）
  const width = 1080
  const height = 1080
  canvas.width = width
  canvas.height = height

  const theme = themeColors[cardTheme.value]

  // 背景渐变
  const bgGradient = ctx.createLinearGradient(0, 0, width, height)
  bgGradient.addColorStop(0, theme.bg[0])
  bgGradient.addColorStop(1, theme.bg[1])
  ctx.fillStyle = bgGradient
  ctx.fillRect(0, 0, width, height)

  // 装饰元素
  if (cardTheme.value === 'cyber') {
    // 网格线
    ctx.strokeStyle = 'rgba(0, 245, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < width; i += 60) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i, height)
      ctx.stroke()
    }
    for (let i = 0; i < height; i += 60) {
      ctx.beginPath()
      ctx.moveTo(0, i)
      ctx.lineTo(width, i)
      ctx.stroke()
    }
  }

  // 标题区域
  const titleY = 180
  ctx.fillStyle = theme.text
  ctx.font = 'bold 56px Orbitron, sans-serif'
  ctx.textAlign = 'center'
  ctx.fillText('CLAUDE CODE', width / 2, titleY)

  ctx.font = 'bold 42px Orbitron, sans-serif'
  ctx.fillStyle = theme.secondary
  ctx.fillText('LEARNING PROGRESS', width / 2, titleY + 60)

  // 进度圆环
  const centerX = width / 2
  const centerY = 500
  const radius = 150

  // 背景圆环
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.strokeStyle = cardTheme.value === 'minimal' ? '#e0e0e0' : 'rgba(255, 255, 255, 0.1)'
  ctx.lineWidth = 20
  ctx.stroke()

  // 进度圆环
  const progressAngle = (progressPercent.value / 100) * Math.PI * 2 - Math.PI / 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, -Math.PI / 2, progressAngle)
  ctx.strokeStyle = theme.primary
  ctx.lineWidth = 20
  ctx.lineCap = 'round'
  ctx.stroke()

  // 进度百分比
  ctx.fillStyle = theme.text
  ctx.font = 'bold 72px Orbitron, sans-serif'
  ctx.fillText(`${progressPercent.value}%`, centerX, centerY + 20)

  ctx.font = '24px JetBrains Mono, monospace'
  ctx.fillStyle = theme.accent
  ctx.fillText(`${props.completedLevels.length} / ${props.totalLevels} 完成`, centerX, centerY + 60)

  // 统计信息
  if (showStats.value) {
    const statsY = 780
    ctx.font = '20px JetBrains Mono, monospace'
    ctx.fillStyle = theme.text

    const stats = [
      { label: '已完成关卡', value: `${props.completedLevels.length} 个` },
      { label: '完成率', value: `${progressPercent.value}%` },
      { label: '剩余', value: `${props.totalLevels - props.completedLevels.length} 个` }
    ]

    const statWidth = width / stats.length
    stats.forEach((stat, index) => {
      const x = statWidth * index + statWidth / 2
      ctx.fillText(stat.label, x, statsY)
      ctx.fillStyle = theme.primary
      ctx.font = 'bold 28px JetBrains Mono, monospace'
      ctx.fillText(stat.value, x, statsY + 40)
      ctx.fillStyle = theme.text
      ctx.font = '20px JetBrains Mono, monospace'
    })
  }

  // 底部信息
  const footerY = height - 80
  ctx.font = '18px JetBrains Mono, monospace'
  ctx.fillStyle = cardTheme.value === 'gradient' ? 'rgba(255,255,255,0.8)' : theme.accent
  ctx.fillText('github.com/raven1997s/claude-code-guide', width / 2, footerY)

  // 下载图片
  const link = window.document.createElement('a')
  link.download = `claude-code-progress-${Date.now()}.png`
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.share-card-container {
  max-width: 600px;
  margin: 0 auto;
}

.preview-section {
  padding: 30px;
  background: var(--cyber-card-bg);
  border: 1px solid var(--cyber-card-border);
  border-radius: var(--cyber-radius-md);
}

.preview-section h3 {
  margin: 0 0 10px 0;
  font-size: 24px;
}

.preview-desc {
  color: var(--cyber-text-secondary);
  margin: 0 0 25px 0;
}

.card-options {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.option-group label {
  font-family: var(--font-display);
  font-size: 14px;
  color: var(--cyber-text-secondary);
}

.option-group select {
  padding: 10px;
  background: var(--cyber-darker);
  border: 1px solid var(--cyber-card-border);
  border-radius: var(--cyber-radius-sm);
  color: var(--cyber-text-primary);
  font-family: var(--font-mono);
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  accent-color: var(--cyber-cyan);
}

.checkbox-label span {
  font-family: var(--font-mono);
  color: var(--cyber-text-primary);
}

.generate-btn {
  width: 100%;
  padding: 14px;
  margin-top: 10px;
}
</style>
