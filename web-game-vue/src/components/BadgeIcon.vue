<template>
  <div class="badge-icon" :class="badgeClass">
    <canvas ref="badgeCanvas" :width="size" :height="size"></canvas>
    <span v-if="showLabel" class="badge-label">{{ label }}</span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'default', // default, gold, silver, bronze, special
    validator: (value) => ['default', 'gold', 'silver', 'bronze', 'special'].includes(value)
  },
  size: {
    type: Number,
    default: 64
  },
  showLabel: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  seed: {
    type: [String, Number],
    default: Math.random()
  }
})

const badgeCanvas = ref(null)

const badgeClass = computed(() => `badge-${props.type}`)

// 颜色配置
const colors = {
  default: { primary: '#00F5FF', secondary: '#0891b2', glow: 'rgba(0, 245, 255, 0.5)' },
  gold: { primary: '#FFD700', secondary: '#FFA500', glow: 'rgba(255, 215, 0, 0.5)' },
  silver: { primary: '#C0C0C0', secondary: '#A8A8A8', glow: 'rgba(192, 192, 192, 0.5)' },
  bronze: { primary: '#CD7F32', secondary: '#A0522D', glow: 'rgba(205, 127, 50, 0.5)' },
  special: { primary: '#FF006E', secondary: '#FF1493', glow: 'rgba(255, 0, 110, 0.5)' }
}

// 伪随机数生成器（基于种子）
function seededRandom(seed) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

// 绘制徽章
function drawBadge() {
  const canvas = badgeCanvas.value
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  const centerX = props.size / 2
  const centerY = props.size / 2
  const radius = props.size / 2 - 4

  const color = colors[props.type]
  let seedValue = typeof props.seed === 'string'
    ? props.seed.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    : props.seed

  // 清除画布
  ctx.clearRect(0, 0, props.size, props.size)

  // 绘制发光效果
  ctx.shadowBlur = 20
  ctx.shadowColor = color.glow

  // 绘制外圈
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
  ctx.strokeStyle = color.primary
  ctx.lineWidth = 3
  ctx.stroke()

  // 绘制内圈
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2)
  ctx.strokeStyle = color.secondary
  ctx.lineWidth = 2
  ctx.stroke()

  // 绘制几何图案（基于种子生成）
  ctx.shadowBlur = 0
  const points = 6 + Math.floor(seededRandom(seedValue) * 6) // 6-12 个点

  for (let i = 0; i < points; i++) {
    const angle = (i / points) * Math.PI * 2
    const innerR = radius * 0.3
    const outerR = radius * 0.6

    ctx.beginPath()
    ctx.moveTo(
      centerX + Math.cos(angle) * innerR,
      centerY + Math.sin(angle) * innerR
    )
    ctx.lineTo(
      centerX + Math.cos(angle) * outerR,
      centerY + Math.sin(angle) * outerR
    )
    ctx.strokeStyle = color.primary
    ctx.lineWidth = 2
    ctx.stroke()

    // 在端点画小圆
    ctx.beginPath()
    ctx.arc(
      centerX + Math.cos(angle) * outerR,
      centerY + Math.sin(angle) * outerR,
      2, 0, Math.PI * 2
    )
    ctx.fillStyle = color.secondary
    ctx.fill()
  }

  // 中心图标
  drawCenterIcon(ctx, centerX, centerY, color, seedValue)
}

function drawCenterIcon(ctx, cx, cy, color, seed) {
  const size = props.size * 0.2
  const iconType = Math.floor(seededRandom(seed + 1) * 4)

  ctx.fillStyle = color.primary
  ctx.shadowBlur = 10
  ctx.shadowColor = color.glow

  switch (iconType) {
    case 0: // 星形
      drawStar(ctx, cx, cy, 5, size, size / 2)
      break
    case 1: // 菱形
      ctx.beginPath()
      ctx.moveTo(cx, cy - size)
      ctx.lineTo(cx + size * 0.7, cy)
      ctx.lineTo(cx, cy + size)
      ctx.lineTo(cx - size * 0.7, cy)
      ctx.closePath()
      ctx.fill()
      break
    case 2: // 六边形
      drawPolygon(ctx, cx, cy, 6, size)
      break
    case 3: // 闪电
      drawLightning(ctx, cx, cy, size)
      break
  }
}

function drawStar(ctx, cx, cy, points, outerR, innerR) {
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2
    const x = cx + Math.cos(angle) * r
    const y = cy + Math.sin(angle) * r
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

function drawPolygon(ctx, cx, cy, sides, radius) {
  ctx.beginPath()
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * Math.PI * 2 - Math.PI / 2
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

function drawLightning(ctx, cx, cy, size) {
  ctx.beginPath()
  ctx.moveTo(cx + size * 0.2, cy - size)
  ctx.lineTo(cx - size * 0.3, cy)
  ctx.lineTo(cx, cy)
  ctx.lineTo(cx - size * 0.2, cy + size)
  ctx.lineTo(cx + size * 0.3, cy)
  ctx.lineTo(cx, cy)
  ctx.closePath()
  ctx.fill()
}

onMounted(() => {
  drawBadge()
})

watch(() => [props.type, props.seed], () => {
  drawBadge()
})
</script>

<style scoped>
.badge-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  position: relative;
}

canvas {
  border-radius: 50%;
  background: rgba(13, 17, 23, 0.8);
  border: 2px solid currentColor;
}

.badge-default canvas { border-color: #00F5FF; }
.badge-gold canvas { border-color: #FFD700; }
.badge-silver canvas { border-color: #C0C0C0; }
.badge-bronze canvas { border-color: #CD7F32; }
.badge-special canvas { border-color: #FF006E; }

.badge-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--cyber-text-secondary);
  text-align: center;
}
</style>
