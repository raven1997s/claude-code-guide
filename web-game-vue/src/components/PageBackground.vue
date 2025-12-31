<template>
  <div class="page-background">
    <!-- 网格背景 -->
    <div class="cyber-grid-bg"></div>

    <!-- 粒子效果 -->
    <div class="particles">
      <div
        v-for="i in 15"
        :key="i"
        class="particle"
        :style="getParticleStyle(i)"
      ></div>
    </div>

    <!-- 扫描线 -->
    <div class="scan-lines"></div>

    <!-- 光晕装饰 -->
    <div class="glow-orbs">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
    </div>
  </div>
</template>

<script setup>
const getParticleStyle = (_i) => {
  const size = Math.random() * 3 + 1
  const left = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 15 + 10

  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`
  }
}
</script>

<style scoped>
.page-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.cyber-grid-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    linear-gradient(rgba(0, 245, 255, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 245, 255, 0.02) 1px, transparent 1px),
    linear-gradient(135deg, var(--cyber-darker) 0%, var(--cyber-dark) 100%);
  background-size: 60px 60px, 60px 60px, 100% 100%;
  animation: gridPulse 10s ease-in-out infinite;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.particle {
  position: absolute;
  background: radial-gradient(circle, rgba(0, 245, 255, 0.6), transparent);
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
    opacity: 0.5;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

.scan-lines {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.05) 0px,
    rgba(0, 0, 0, 0.05) 1px,
    transparent 1px,
    transparent 4px
  );
  animation: scanlineMove 12s linear infinite;
  pointer-events: none;
}

@keyframes scanlineMove {
  0% { transform: translateY(0); }
  100% { transform: translateY(60px); }
}

.glow-orbs {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, var(--cyber-cyan), transparent);
  top: -200px;
  right: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, var(--cyber-pink), transparent);
  bottom: -150px;
  left: -150px;
  animation-delay: -10s;
}

@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(50px, 30px) scale(1.1);
  }
  66% {
    transform: translate(-30px, 50px) scale(0.9);
  }
}
</style>
