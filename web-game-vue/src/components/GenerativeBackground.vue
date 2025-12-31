<template>
  <div class="generative-bg">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref(null)
let animationFrame = null
let ctx = null
let particles = []
let hue = 0

// 粒子类 - 优化版
class Particle {
  constructor(w, h) {
    this.reset(w, h)
  }

  reset(w, h) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 0.3
    this.speedY = (Math.random() - 0.5) * 0.3
    this.life = 1
    this.decay = Math.random() * 0.003 + 0.001
    this.hue = hue + Math.random() * 60 - 30
  }

  update(w, h) {
    this.x += this.speedX
    this.y += this.speedY
    this.life -= this.decay

    // 边界检测
    if (this.x < 0 || this.x > w || this.y < 0 || this.y > h || this.life <= 0) {
      this.reset(w, h)
    }
  }

  draw(ctx) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = `hsla(${this.hue}, 70%, 50%, ${this.life * 0.5})`
    ctx.fill()
  }
}

// 优化连接绘制 - 限制检查数量
function drawConnections(ctx, particles) {
  const maxConnections = 50 // 限制最大连接数
  let connectionCount = 0

  for (let i = 0; i < particles.length && connectionCount < maxConnections; i++) {
    for (let j = i + 1; j < particles.length && connectionCount < maxConnections; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 100) {
        ctx.beginPath()
        ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${(1 - distance / 100) * 0.15})`
        ctx.lineWidth = 0.5
        ctx.moveTo(particles[i].x, particles[i].y)
        ctx.lineTo(particles[j].x, particles[j].y)
        ctx.stroke()
        connectionCount++
      }
    }
  }
}

let resizeHandler = null

function init() {
  const c = canvas.value
  if (!c) return

  ctx = c.getContext('2d', { alpha: false }) // 优化：禁用透明通道

  resizeHandler = () => {
    c.width = window.innerWidth
    c.height = window.innerHeight
    initParticles()
  }

  resizeHandler()
  window.addEventListener('resize', resizeHandler)
  animate()
}

function initParticles() {
  particles = []
  // 固定粒子数量，避免大屏幕性能问题
  const count = Math.min(Math.floor((canvas.value.width * canvas.value.height) / 25000), 50)
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(canvas.value.width, canvas.value.height))
  }
}

function animate() {
  const c = canvas.value
  if (!c || !ctx) return

  // 清除背景 - 优化：直接清除而不是半透明覆盖
  ctx.fillStyle = 'rgba(13, 17, 23, 0.15)'
  ctx.fillRect(0, 0, c.width, c.height)

  // 更新色相
  hue = (hue + 0.05) % 360

  // 更新和绘制粒子 - 不使用 shadowBlur
  particles.forEach(p => {
    p.update(c.width, c.height)
    p.draw(ctx)
  })

  // 绘制连接
  drawConnections(ctx, particles)

  animationFrame = window.requestAnimationFrame(animate)
}

onMounted(() => {
  init()
})

onUnmounted(() => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
  }
  if (resizeHandler) {
    window.removeEventListener('resize', resizeHandler)
  }
})
</script>

<style scoped>
.generative-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

canvas {
  display: block;
  opacity: 0.4;
  will-change: transform; /* 性能优化提示 */
}
</style>
