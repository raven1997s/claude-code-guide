<template>
  <div class="home-view">
    <PageBackground />

    <div class="content-wrapper">
      <n-space vertical :size="32" align="center">
        <!-- Hero 区域 (Clean Minimal 风格) -->
        <div class="hero-section">
          <h1 class="hero-title">
            Claude Code
            <span class="gradient-text">CLI 学习指南</span>
          </h1>
          <p class="hero-subtitle">
            通过互动游戏和实战教程，掌握 Claude Code 命令行工具
          </p>
          <div class="hero-actions">
            <n-button type="primary" size="large" @click="navigateTo('/game')">
              <template #icon>
                <n-icon :component="GameIcon" />
              </template>
              开始学习
            </n-button>
            <n-button size="large" ghost @click="navigateTo('/reference')">
              <template #icon>
                <n-icon :component="BookIcon" />
              </template>
              查看文档
            </n-button>
          </div>
        </div>

        <!-- 特性卡片 -->
        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card stagger-item animate-fade-in-up"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="feature-icon">
              <n-icon size="32" :component="feature.icon" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
          </div>
        </div>

        <!-- 统计卡片 -->
        <div class="stats-section">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            class="stat-card animate-fade-in-up"
            :class="`stat-${index}`"
            :style="{ animationDelay: `${index * 100 + 300}ms` }"
          >
            <div class="stat-number animate-number-pop" :style="{ animationDelay: `${index * 100 + 500}ms` }">{{ stat.value }}</div>
            <div class="stat-label">{{ stat.label }}</div>
          </div>
        </div>

        <!-- 学习路径 -->
        <n-card class="learning-path-card">
          <template #header>
            <div class="card-header">
              <n-icon :component="RouteIcon" />
              <span>学习路径</span>
            </div>
          </template>
          <n-steps vertical :current="1" size="small">
            <n-step title="CLI 基础">
              <template #description>
                学习基本的 CLI 命令和参数（关卡 1-10）
              </template>
            </n-step>
            <n-step title="会话命令">
              <template #description>
                掌握交互式会话中的斜杠命令（关卡 11-17）
              </template>
            </n-step>
            <n-step title="综合应用">
              <template #description>
                综合运用所学知识完成复杂任务（关卡 18-25）
              </template>
            </n-step>
          </n-steps>
        </n-card>

        <!-- 热门搜索 -->
        <n-card class="popular-search-card">
          <template #header>
            <div class="card-header">
              <n-icon :component="BoltIcon" />
              <span>热门搜索</span>
            </div>
          </template>
          <n-space>
            <n-tag
              v-for="item in popularSearches"
              :key="item.query"
              round
              size="medium"
              class="search-tag"
              @click="handlePopularSearch(item.query)"
            >
              {{ item.query }}
            </n-tag>
          </n-space>
        </n-card>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NCard, NSpace, NButton, NIcon, NSteps, NStep, NTag } from 'naive-ui'
import {
  Gamepad as GameIcon,
  Book as BookIcon,
  Terminal as TerminalIcon,
  Bolt as BoltIcon,
  Route as RouteIcon
} from '@vicons/fa'
import PageBackground from '@/components/PageBackground.vue'

const router = useRouter()

/** 特性列表 */
const features = [
  {
    title: '互动游戏',
    desc: '25+ 关卡精心设计，模拟终端实战学习',
    icon: GameIcon
  },
  {
    title: '完整文档',
    desc: 'CLI 参数、斜杠命令、模糊搜索全覆盖',
    icon: BookIcon
  },
  {
    title: '无需安装',
    desc: '浏览器运行，随时学习，即刻上手',
    icon: TerminalIcon
  }
]

/** 统计数据 */
const stats = [
  { value: '25+', label: '互动关卡' },
  { value: '80+', label: '命令文档' },
  { value: '5', label: '学习路径' }
]

/** 热门搜索 */
const popularSearches = [
  { query: 'help' },
  { query: 'commit' },
  { query: 'claude -p' },
  { query: 'model' },
  { query: 'clear' }
]

/**
 * 导航到指定路由
 * @param {string} path - 路由路径
 */
function navigateTo(path) {
  router.push(path)
}

/**
 * 处理热门搜索点击
 * @param {string} _query - 搜索关键词 (未使用，保留参数)
 */
function handlePopularSearch(_query) {
  router.push('/search')
}
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  margin: 0 auto;
  padding: var(--spacing-12) var(--spacing-6);
}

/* ========================================
   Hero 区域 - Premium Experience
   ======================================== */
.hero-section {
  text-align: center;
  padding: var(--spacing-16) var(--spacing-6);
  background: linear-gradient(
    135deg,
    var(--color-bg-secondary) 0%,
    var(--color-primary-50) 50%,
    var(--color-bg-secondary) 100%
  );
  background-size: 200% 200%;
  animation: gradientShift 10s ease infinite;
  border-radius: var(--radius-xl);
  margin-bottom: var(--spacing-8);
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.hero-title {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-4) 0;
  line-height: var(--leading-tight);
  font-family: var(--font-sans);
}

.gradient-text {
  display: block;
  background: linear-gradient(
    135deg,
    var(--color-primary-500),
    var(--color-primary-700)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: var(--text-lg);
  color: var(--color-text-secondary);
  margin: 0 0 var(--spacing-8) 0;
  max-width: 480px;
  margin-left: auto;
  margin-right: auto;
  line-height: var(--leading-relaxed);
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: var(--spacing-4);
  flex-wrap: wrap;
}

/* ========================================
   特性卡片
   ======================================== */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-6);
  width: 100%;
}

.feature-card {
  padding: var(--spacing-8);
  text-align: center;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all var(--duration-slow) var(--ease-out);
  transform-style: preserve-3d;
  opacity: 0;
}

.feature-card:hover {
  border-color: var(--color-primary-300);
  box-shadow: 0 16px 40px rgba(99, 102, 241, 0.2);
  transform: perspective(1000px) rotateX(2deg) rotateY(2deg) translateY(-6px);
}

.feature-icon {
  width: 64px;
  height: 64px;
  margin: 0 auto var(--spacing-4);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-primary-50);
  border-radius: var(--radius-md);
  color: var(--color-primary-600);
}

.feature-title {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--spacing-2) 0;
}

.feature-desc {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--leading-relaxed);
}

/* ========================================
   统计卡片 - 渐变风格
   ======================================== */
.stats-section {
  display: flex;
  gap: var(--spacing-6);
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
}

.stat-card {
  flex: 1;
  min-width: 160px;
  max-width: 200px;
  padding: var(--spacing-6);
  border-radius: var(--radius-lg);
  text-align: center;
  color: #ffffff;
}

.stat-0 {
  background: linear-gradient(
    135deg,
    var(--color-primary-500) 0%,
    var(--color-primary-700) 100%
  );
}

.stat-1 {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.stat-2 {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.stat-number {
  font-size: var(--text-4xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--leading-tight);
  margin-bottom: var(--spacing-1);
}

.stat-label {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  opacity: 0.9;
}

/* ========================================
   学习路径卡片
   ======================================== */
.learning-path-card {
  width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.card-header .n-icon {
  color: var(--color-primary-500);
}

/* ========================================
   热门搜索卡片
   ======================================== */
.popular-search-card {
  width: 100%;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
}

.search-tag {
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all var(--duration-base) var(--ease-out);
}

.search-tag:hover {
  background: var(--color-primary-500) !important;
  color: #ffffff !important;
  border-color: var(--color-primary-500) !important;
}

/* ========================================
   响应式
   ======================================== */
@media (max-width: 768px) {
  .content-wrapper {
    padding: var(--spacing-8) var(--spacing-4);
  }

  .hero-section {
    padding: var(--spacing-8) var(--spacing-4);
  }

  .hero-title {
    font-size: var(--text-3xl);
  }

  .hero-subtitle {
    font-size: var(--text-base);
  }

  .stats-section {
    flex-direction: column;
    align-items: center;
  }

  .stat-card {
    max-width: 100%;
    width: 100%;
  }
}
</style>
