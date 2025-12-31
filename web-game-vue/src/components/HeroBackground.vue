<template>
  <div class="hero-background">
    <!-- Matrix Rain Canvas -->
    <canvas ref="matrixCanvas" class="matrix-canvas"></canvas>

    <!-- Scan Lines Overlay -->
    <div class="scan-lines"></div>

    <!-- Grid Background -->
    <div class="grid-overlay"></div>

    <!-- Floating Particles -->
    <div class="particles">
      <div
        v-for="i in 20"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const matrixCanvas = ref(null)
let animationFrame = null
let ctx = null
let matrixChars = []

const cyberChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*()'

const initMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return

  ctx = canvas.getContext('2d')

  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initMatrixChars()
  }

  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)

  // Start animation
  animateMatrix()
}

const initMatrixChars = () => {
  const canvas = matrixCanvas.value
  const columns = Math.floor(canvas.width / 20)
  matrixChars = Array(columns).fill(1)
}

const animateMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas || !ctx) return

  // Semi-transparent black for trail effect
  ctx.fillStyle = 'rgba(13, 17, 23, 0.05)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  // Set text style
  ctx.fillStyle = '#00F5FF'
  ctx.font = '15px "JetBrains Mono", monospace'

  // Draw characters
  for (let i = 0; i < matrixChars.length; i++) {
    const char = cyberChars[Math.floor(Math.random() * cyberChars.length)]
    const x = i * 20
    const y = matrixChars[i] * 20

    // Random colors for some characters
    const random = Math.random()
    if (random > 0.98) {
      ctx.fillStyle = '#FF006E' // Pink accent
    } else if (random > 0.95) {
      ctx.fillStyle = '#00FF94' // Green accent
    } else {
      ctx.fillStyle = `rgba(0, 245, 255, ${Math.random() * 0.5 + 0.3})` // Cyan with varying opacity
    }

    ctx.fillText(char, x, y)

    // Reset column to top randomly
    if (y > canvas.height && Math.random() > 0.975) {
      matrixChars[i] = 0
    }

    matrixChars[i]++
  }

  animationFrame = window.requestAnimationFrame(animateMatrix)
}

const getParticleStyle = (_i) => {
  const size = Math.random() * 4 + 2
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 10 + 10

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}

onMounted(() => {
  initMatrix()
})

onUnmounted(() => {
  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame)
  }
  window.removeEventListener('resize', initMatrix)
})
</script>

<style scoped>
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
}

.matrix-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.15;
}

.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.1) 0px,
    rgba(0, 0, 0, 0.1) 1px,
    transparent 1px,
    transparent 3px
  );
  animation: scanlineMove 10s linear infinite;
  pointer-events: none;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(50px); }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(rgba(0, 245, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridPulse 8s ease-in-out infinite;
  pointer-events: none;
}

@keyframes gridPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.8), transparent);
  border-radius: 50%;
  animation: particleFloat linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}
</style>
