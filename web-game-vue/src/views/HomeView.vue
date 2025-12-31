<template>
  <div class="home-view">
    <PageBackground />

    <div class="content-wrapper">
      <n-space vertical :size="32" align="center">
        <!-- Hero 区域 -->
        <div class="hero">
          <div class="ascii-logo cyber-mono cyber-fade-in">
            <pre>
   ▄████████ ███    █▄      ███      ▄██████▄
  ███    ███ ███    ███ ▀█████████▄ ███    ███
  ███    ███ ███    ███    ▀███▀▀██ ███    ███
  ███    ███ ███    ███     ███   ▀ ███    ███
▀███████████ ███    ███     ███     ▀██████▀
            </pre>
          </div>
          <n-h1 class="cyber-heading">
            <span class="cyber-text-cyan">CLAUDE</span>
            <span class="cyber-text-pink">CODE</span>
            <span class="cyber-text-green">LEARNING</span>
          </n-h1>
          <n-text depth="3" class="hero-subtitle">
            在浏览器中学习 Claude Code CLI 命令，无需安装即可体验
          </n-text>
          <n-space :size="16" class="hero-actions">
            <button class="cyber-btn" @click="navigateTo('/game')">
              <n-icon :component="GameIcon" />
              开始游戏学习
            </button>
            <button class="cyber-btn cyber-btn-secondary" @click="navigateTo('/reference')">
              <n-icon :component="BookIcon" />
              查看命令参考
            </button>
          </n-space>
        </div>

        <!-- 特性卡片 -->
        <div class="features-grid">
          <div class="feature-card cyber-card cyber-fade-in cyber-stagger-1">
            <div class="feature-icon">
              <n-icon size="36" :component="GameIcon" />
            </div>
            <h3 class="cyber-heading">互动游戏</h3>
            <p class="cyber-mono">
              25+ 关卡精心设计，模拟终端实战学习
            </p>
          </div>
          <div class="feature-card cyber-card cyber-fade-in cyber-stagger-2">
            <div class="feature-icon">
              <n-icon size="36" :component="BookIcon" />
            </div>
            <h3 class="cyber-heading">完整文档</h3>
            <p class="cyber-mono">
              CLI 参数、斜杠命令、模糊搜索全覆盖
            </p>
          </div>
          <div class="feature-card cyber-card cyber-fade-in cyber-stagger-3">
            <div class="feature-icon">
              <n-icon size="36" :component="TerminalIcon" />
            </div>
            <h3 class="cyber-heading">无需安装</h3>
            <p class="cyber-mono">
              浏览器运行，随时学习，即刻上手
            </p>
          </div>
        </div>

        <!-- 统计数据 -->
        <n-card class="stats-card cyber-card">
          <n-space :size="40" justify="center">
            <div class="stat-item">
              <div class="stat-value cyber-text-cyan">25+</div>
              <div class="stat-label">互动关卡</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value cyber-text-pink">80+</div>
              <div class="stat-label">命令文档</div>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <div class="stat-value cyber-text-green">5</div>
              <div class="stat-label">学习路径</div>
            </div>
          </n-space>
        </n-card>

        <!-- 学习路径 -->
        <div class="learning-path cyber-card">
          <h2 class="cyber-heading" style="text-align: center; margin-bottom: 24px;">
            <span class="cyber-prompt">></span>
            学习路径
          </h2>
          <n-steps vertical :current="1" class="cyber-steps">
            <n-step title="CLI 基础" description="学习基本的 CLI 命令和参数（关卡 1-10）" />
            <n-step title="会话命令" description="掌握交互式会话中的斜杠命令（关卡 11-17）" />
            <n-step title="综合应用" description="综合运用所学知识完成复杂任务（关卡 18-25）" />
          </n-steps>
        </div>

        <!-- 热门搜索 -->
        <n-card class="cyber-card">
          <template #header>
            <div class="card-header">
              <n-icon :component="BoltIcon" class="cyber-text-green" />
              <span class="cyber-heading">热门搜索</span>
            </div>
          </template>
          <n-space>
            <n-tag
              v-for="item in popularSearches"
              :key="item.query"
              checkable
              round
              size="medium"
              @click="handlePopularSearch(item.query)"
              class="search-tag"
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
import { NCard, NSpace, NH1, NText, NIcon, NSteps, NStep, NTag } from 'naive-ui'
import { Gamepad as GameIcon, Book as BookIcon, Terminal as TerminalIcon, Bolt as BoltIcon } from '@vicons/fa'
import PageBackground from '@/components/PageBackground.vue'

const router = useRouter()

const popularSearches = [
  { query: 'help', desc: '查看帮助命令' },
  { query: 'commit', desc: 'Git 提交代码' },
  { query: 'claude -p', desc: '快速提问' },
  { query: 'model', desc: '选择 AI 模型' },
  { query: 'clear', desc: '清除对话' }
]

function navigateTo(path) {
  router.push(path)
}

function handlePopularSearch(query) {
  router.push('/reference')
}
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fc 0%, #f0f2f5 100%);
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

/* Hero */
.hero {
  text-align: center;
  padding: 60px 20px;
}

.ascii-logo {
  margin-bottom: 24px;
  opacity: 0.7;
}

.ascii-logo pre {
  font-size: 10px;
  line-height: 1.2;
  color: #6366f1;
  margin: 0;
}

.cyber-mono {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

.hero :deep(.n-h1) {
  font-size: 42px;
  margin: 0 0 24px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  color: #1a1a2e;
  font-weight: 700;
}

.cyber-text-cyan {
  color: #6366f1;
}

.cyber-text-pink {
  color: #ec4899;
}

.cyber-text-green {
  color: #10b981;
}

.cyber-heading {
  font-weight: 700;
}

.hero-subtitle {
  display: block;
  font-size: 18px;
  margin-bottom: 32px;
  color: #6b7280;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.hero-actions button {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cyber-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cyber-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.cyber-btn-secondary {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.cyber-btn-secondary:hover {
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
}

/* 特性卡片 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
}

.feature-card {
  padding: 32px;
  text-align: center;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.feature-card:hover {
  border-color: rgba(99, 102, 241, 0.15);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.feature-icon {
  color: #6366f1;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin: 0 0 12px 0;
  font-size: 20px;
  color: #1a1a2e;
}

.feature-card p {
  margin: 0;
  color: #6b7280;
  line-height: 1.6;
}

/* 统计卡片 */
.stats-card {
  width: 100%;
  margin: 24px 0;
  padding: 32px;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.stat-value {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 36px;
  font-weight: 800;
}

.stat-label {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  font-size: 14px;
  color: #6b7280;
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(0, 0, 0, 0.08);
}

/* 学习路径 */
.learning-path {
  width: 100%;
  padding: 32px;
  margin: 24px 0;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.cyber-prompt {
  color: #6366f1;
  margin-right: 8px;
}

:deep(.cyber-steps) {
  --n-text-color: #6b7280;
}

:deep(.n-steps) {
  cursor: default;
}

/* 搜索标签 */
.search-tag {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  cursor: pointer;
  transition: all 0.2s;
}

.search-tag:hover {
  background: #6366f1 !important;
  color: #ffffff !important;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.cyber-card {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
}
</style>
