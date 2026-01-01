<template>
  <div class="gradient-mesh-background">
    <div class="gradient-orb orb-1"></div>
    <div class="gradient-orb orb-2"></div>
    <div class="gradient-orb orb-3"></div>
    <div class="gradient-orb orb-4"></div>
    <div class="noise-overlay"></div>
  </div>
</template>

<style scoped>
.gradient-mesh-background {
  position: fixed;
  inset: 0;
  z-index: -1;
  background: var(--color-bg-base);
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  pointer-events: none;
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: rgba(99, 102, 241, 0.3);
  top: -200px;
  left: -200px;
  animation-delay: 0s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: rgba(139, 92, 246, 0.25);
  top: 50%;
  right: -150px;
  animation-delay: -5s;
}

.orb-3 {
  width: 400px;
  height: 400px;
  background: rgba(16, 185, 129, 0.2);
  bottom: -100px;
  left: 30%;
  animation-delay: -10s;
}

.orb-4 {
  width: 300px;
  height: 300px;
  background: rgba(245, 158, 11, 0.15);
  top: 30%;
  left: 20%;
  animation-delay: -15s;
}

@keyframes orbFloat {
  0%, 100% { transform: translate(0, 0) scale(1); }
  25% { transform: translate(30px, -30px) scale(1.05); }
  50% { transform: translate(-20px, 20px) scale(0.95); }
  75% { transform: translate(20px, 10px) scale(1.02); }
}

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .orb-1 { background: rgba(99, 102, 241, 0.15); }
  .orb-2 { background: rgba(139, 92, 246, 0.12); }
  .orb-3 { background: rgba(16, 185, 129, 0.1); }
  .orb-4 { background: rgba(245, 158, 11, 0.08); }
}
</style>
