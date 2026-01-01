<template>
  <div class="home-view">
    <PageBackground />

    <div class="content-wrapper">
      <n-space vertical :size="64" align="center">
        <!-- Hero 区域 (Premium Experience) -->
        <div class="hero-section glass-card">
          <div class="hero-badge animate-pulse">
            <n-icon :component="SparkleIcon" />
            <span>全新升级 Grade 2.2</span>
          </div>
          <h1 class="hero-title">
            <span class="gradient-text-animated">Claude Code CLI</span>
            <br>
            <span class="subtitle-text">学习指南</span>
          </h1>
          <p class="hero-subtitle">
            通过沉浸式互动游戏和实战教程，掌握 Claude Code 命令行工具的高级用法
          </p>
          <div class="hero-actions">
            <n-button type="primary" size="large" class="btn-shine" @click="navigateTo('/game')">
              <template #icon>
                <n-icon :component="GameIcon" />
              </template>
              开始学习
            </n-button>
            <n-button size="large" ghost class="btn-shine" @click="navigateTo('/reference')">
              <template #icon>
                <n-icon :component="BookIcon" />
              </template>
              查看文档
            </n-button>
          </div>
        </div>

        <!-- 特性卡片 (Glassmorphism) -->
        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card card card-hover stagger-item animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="feature-icon-wrapper">
              <div class="feature-icon" :class="`icon-${index}`">
                <n-icon size="32" :component="feature.icon" />
              </div>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
            <div class="feature-arrow">
              <n-icon :component="ArrowIcon" />
            </div>
          </div>
        </div>

        <!-- 统计卡片 (Gradient Style) -->
        <div class="stats-section">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-card card card-hover animate-fade-in-up"
            :class="`stat-${index}`"
            :style="{ animationDelay: `${index * 100 + 300}ms` }"
          >
            <div class="stat-number animate-number-pop" :style="{ animationDelay: `${index * 100 + 500}ms` }">
              {{ stat.value }}
            </div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NCard, NSpace, NButton, NIcon } from 'naive-ui'
import {
  Gamepad as GameIcon,
  Book as BookIcon,
  Terminal as TerminalIcon,
  ArrowRight as ArrowIcon,
  Star as SparkleIcon
} from '@vicons/fa'
import PageBackground from '@/components/PageBackground.vue'

const router = useRouter()

/** 特性列表 */
const features = [
  {
    title: '互动闯关',
    desc: '25+ 精心设计的关卡，在模拟终端中实战演练，建立肌肉记忆',
    icon: GameIcon
  },
  {
    title: '完整文档',
    desc: '收录所有 CLI 参数、快捷键与斜杠命令，支持模糊搜索',
    icon: BookIcon
  },
  {
    title: '无需安装',
    desc: '纯浏览器运行环境，零配置即刻上手，随时随地学习',
    icon: TerminalIcon
  }
]

/** 统计数据 */
const stats = [
  { value: '25+', label: '实战关卡' },
  { value: '100%', label: '覆盖率' },
  { value: 'Pro', label: '进阶技巧' }
]

function navigateTo(path) {
  router.push(path)
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  /* 背景由 PageBackground 接管 */
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--spacing-12) var(--spacing-8);
}

/* ========================================
   Hero 区域
   ======================================== */
.hero-section {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-8);
  margin-bottom: var(--spacing-8);
  /* 使用全局 .glass-card 样式，此处仅做布局调整 */
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-2) var(--spacing-4);
  background: var(--gradient-primary);
  color: #ffffff;
  border-radius: var(--radius-full);
  font-size: var(--font-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--spacing-6);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: var(--font-weight-bold);
  line-height: 1.1;
  margin: 0 0 var(--spacing-6) 0;
  letter-spacing: -0.02em;
}

.gradient-text-animated {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 5s ease infinite;
  background-size: 200% 200%;
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.subtitle-text {
  font-size: 0.6em;
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.hero-subtitle {
  font-size: clamp(1rem, 1.5vw, 1.25rem);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto var(--spacing-10);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: var(--spacing-4);
  justify-content: center;
  flex-wrap: wrap;
}

/* 按钮光效 */
.btn-shine {
  position: relative;
  overflow: hidden;
}

.btn-shine::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s;
}

.btn-shine:hover::after {
  left: 100%;
}

/* ========================================
   特性卡片
   ======================================== */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-8);
  width: 100%;
}

.feature-card {
  padding: var(--spacing-8);
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.feature-icon-wrapper {
  margin-bottom: var(--spacing-6);
}

.feature-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-xl);
  background: var(--color-bg-secondary);
  transition: all 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.icon-0 { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; }
.icon-1 { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: #ffffff; }
.icon-2 { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: #ffffff; }

.feature-title {
  font-size: var(--font-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-3) 0;
}

.feature-desc {
  font-size: var(--font-base);
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
  flex-grow: 1;
}

.feature-arrow {
  margin-top: var(--spacing-6);
  color: var(--color-primary-500);
  transition: transform 0.3s ease;
  align-self: flex-start;
}

.feature-card:hover .feature-arrow {
  transform: translateX(8px);
}

/* ========================================
   统计卡片
   ======================================== */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--spacing-8);
  width: 100%;
}

.stat-card {
  padding: var(--spacing-8);
  text-align: center;
  min-height: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.stat-0 { background: var(--gradient-primary); color: #ffffff; border: none; }
.stat-1 { background: var(--gradient-accent); color: #ffffff; border: none; }
.stat-2 { background: var(--gradient-ocean); color: #ffffff; border: none; }

.stat-number {
  font-size: var(--font-4xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-2);
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.stat-label {
  font-size: var(--font-sm);
  font-weight: var(--font-weight-medium);
  opacity: 0.9;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .features-grid {
    grid-template-columns: 1fr;
  }
  .stats-section {
    grid-template-columns: 1fr;
  }
}
</style>
