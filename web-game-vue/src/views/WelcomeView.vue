<template>
  <div class="welcome-view">
    <!-- Hero Background -->
    <HeroBackground />

    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <!-- ASCII Logo -->
        <div class="ascii-logo">
          <pre class="cyber-mono">
   ▄████████ ███    █▄      ███      ▄██████▄
  ███    ███ ███    ███ ▀█████████▄ ███    ███
  ███    ███ ███    ███    ▀███▀▀██ ███    ███
  ███    ███ ███    ███     ███   ▀ ███    ███
▀███████████ ███    ███     ███     ███    ███
  ███    ███ ███    ███     ███     ███    ███
  ███    ███ ███    ███     ███     ███    ███
  ███    █▀  ████████▀     ▄████▀    ▀██████▀
          </pre>
        </div>

        <h1 class="hero-title cyber-heading">
          <span class="cyber-text-cyan">CLAUDE</span>
          <span class="cyber-text-pink">CODE</span>
          <span class="cyber-text-green">LEARNING</span>
        </h1>

        <div class="hero-subtitle">
          <span class="cyber-prompt">init learning_sequence</span>
          <p class="cyber-mono">掌握 Claude Code CLI 和 VS Code 插件的使用技巧</p>
        </div>

        <!-- Quick Stats -->
        <div class="hero-stats cyber-fade-in cyber-stagger-3">
          <div class="stat-item">
            <span class="stat-value cyber-text-cyan">25+</span>
            <span class="stat-label">互动关卡</span>
          </div>
          <div class="stat-item">
            <span class="stat-value cyber-text-pink">8</span>
            <span class="stat-label">教程模块</span>
          </div>
          <div class="stat-item">
            <span class="stat-value cyber-text-green">100%</span>
            <span class="stat-label">实战导向</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Learning Paths -->
    <section class="learning-paths">
      <h2 class="section-title cyber-heading">
        <span class="cyber-prompt">></span>
        <span class="cyber-glow">选择学习路径</span>
      </h2>

      <div class="path-cards">
        <!-- VS Code Extension Path -->
        <div
          class="path-card cyber-card cyber-card-holo cyber-fade-in cyber-stagger-1"
          @click="goToVSCode"
        >
          <div class="card-header">
            <div class="card-icon vscode-icon">
              <n-icon :component="VSCodeIcon" size="48" />
            </div>
            <div>
              <h3 class="cyber-heading">VS CODE 教程</h3>
              <n-tag type="success" size="small" :bordered="false">
                推荐新手
              </n-tag>
            </div>
          </div>

          <div class="card-content">
            <p class="cyber-mono">
              // 学习在 VS Code 中使用 Claude Code 插件
            </p>
            <ul class="feature-list">
              <li>
                <span class="cyber-text-cyan">▸</span>
                <span>界面布局和交互区域</span>
              </li>
              <li>
                <span class="cyber-text-cyan">▸</span>
                <span>对话功能和 @-mention 文件</span>
              </li>
              <li>
                <span class="cyber-text-cyan">▸</span>
                <span>代码差异查看和应用</span>
              </li>
              <li>
                <span class="cyber-text-cyan">▸</span>
                <span>常用工作流程实战</span>
              </li>
              <li>
                <span class="cyber-text-cyan">▸</span>
                <span>配置和快捷键</span>
              </li>
            </ul>

            <div class="card-meta">
              <span class="meta-item">
                <n-icon :component="TimeIcon" />
                <span class="cyber-mono">~30 min</span>
              </span>
              <span class="meta-item">
                <n-icon :component="ListIcon" />
                <span class="cyber-mono">8 模块</span>
              </span>
            </div>
          </div>

          <div class="card-footer">
            <button class="cyber-btn">
              开始学习
              <n-icon :component="ArrowRightIcon" />
            </button>
          </div>
        </div>

        <!-- CLI Path -->
        <div
          class="path-card cyber-card cyber-card-holo cyber-fade-in cyber-stagger-2"
          @click="goToCLI"
        >
          <div class="card-header">
            <div class="card-icon cli-icon">
              <n-icon :component="TerminalIcon" size="48" />
            </div>
            <div>
              <h3 class="cyber-heading">CLI 命令教程</h3>
              <n-tag type="info" size="small" :bordered="false">
                进阶内容
              </n-tag>
            </div>
          </div>

          <div class="card-content">
            <p class="cyber-mono">
              // 通过互动游戏学习 CLI 命令
            </p>
            <ul class="feature-list">
              <li>
                <span class="cyber-text-pink">▸</span>
                <span>基础命令操作</span>
              </li>
              <li>
                <span class="cyber-text-pink">▸</span>
                <span>会话管理技巧</span>
              </li>
              <li>
                <span class="cyber-text-pink">▸</span>
                <span>Git 集成工作流</span>
              </li>
              <li>
                <span class="cyber-text-pink">▸</span>
                <span>高级功能和配置</span>
              </li>
              <li>
                <span class="cyber-text-pink">▸</span>
                <span>实战场景演练</span>
              </li>
            </ul>

            <div class="card-meta">
              <span class="meta-item">
                <n-icon :component="TimeIcon" />
                <span class="cyber-mono">~45 min</span>
              </span>
              <span class="meta-item">
                <n-icon :component="ListIcon" />
                <span class="cyber-mono">25 关卡</span>
              </span>
            </div>
          </div>

          <div class="card-footer">
            <button class="cyber-btn cyber-btn-secondary">
              开始游戏
              <n-icon :component="ArrowRightIcon" />
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="quick-start cyber-fade-in cyber-stagger-4">
      <div class="cyber-card">
        <div class="quick-start-header">
          <n-icon :component="BoltIcon" class="cyber-text-green" size="24" />
          <h3 class="cyber-heading">快速启动</h3>
        </div>

        <div class="steps-container">
          <div
            v-for="(step, index) in quickStartSteps"
            :key="index"
            class="step-item"
          >
            <div class="step-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <div class="step-content">
              <h4 class="cyber-mono">{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Terminal Footer -->
    <footer class="terminal-footer">
      <div class="terminal-line">
        <span class="prompt">$</span>
        <span class="command cyber-mono">claude --learn</span>
        <span class="cursor cyber-pulse"></span>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NIcon, NTag } from 'naive-ui'
import {
  WindowMaximize as VSCodeIcon,
  Terminal as TerminalIcon,
  Clock as TimeIcon,
  List as ListIcon,
  ArrowRight as ArrowRightIcon,
  Bolt as BoltIcon
} from '@vicons/fa'
import HeroBackground from '@/components/HeroBackground.vue'

const router = useRouter()

const quickStartSteps = [
  {
    title: '选择学习路径',
    description: '根据需求选择 VS Code 插件或 CLI 命令教程'
  },
  {
    title: '跟随引导学习',
    description: '按步骤指引了解各功能的使用方法'
  },
  {
    title: '动手实践',
    description: '通过互动演示和游戏巩固所学知识'
  },
  {
    title: '掌握技巧',
    description: '在实际项目中使用 Claude Code 提升效率'
  }
]

function goToVSCode() {
  router.push('/vscode-tutorial')
}

function goToCLI() {
  router.push('/game')
}
</script>

<style scoped>
.welcome-view {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

/* Hero Section */
.hero {
  position: relative;
  text-align: center;
  padding: 80px 40px 60px;
  border-radius: 16px;
  margin-bottom: 56px;
  color: var(--color-text-primary);
  overflow: hidden;
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-md);
}

.hero-content {
  position: relative;
  z-index: 2;
}

/* ASCII Logo */
.ascii-logo {
  margin-bottom: 30px;
  opacity: 0.7;
}

.ascii-logo pre {
  font-size: 10px;
  line-height: 1.2;
  color: #6366f1;
  margin: 0;
  letter-spacing: 0.1em;
}

/* Hero Title */
.hero-title {
  font-size: 56px;
  font-weight: 900;
  margin: 0 0 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
  letter-spacing: 0.05em;
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

/* Hero Subtitle */
.hero-subtitle {
  margin-bottom: 40px;
}

.hero-subtitle .cyber-prompt {
  display: block;
  font-size: 16px;
  margin-bottom: 15px;
  opacity: 0.7;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
}

.hero-subtitle p {
  font-size: 18px;
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
}

.cyber-mono {
  font-family: var(--font-mono);
}

/* Hero Stats */
.hero-stats {
  display: flex;
  justify-content: center;
  gap: 60px;
  margin-top: 50px;
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
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--color-text-secondary);
}

/* Section Title */
.section-title {
  font-size: 36px;
  text-align: center;
  margin: 0 0 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  color: var(--color-text-primary);
  font-weight: 700;
}

.section-title .cyber-prompt {
  font-size: 42px;
  font-weight: 300;
  color: var(--color-primary-500);
}

.cyber-glow {
  color: var(--color-text-primary);
}

.cyber-heading {
  font-weight: 700;
}

/* Learning Paths */
.learning-paths {
  position: relative;
  z-index: 2;
  margin-bottom: 56px;
}

.path-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 32px;
}

/* Path Card */
.path-card {
  cursor: pointer;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 16px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-xs);
}

.path-card:hover {
  border-color: rgba(99, 102, 241, 0.15);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.12);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  align-items: flex-start;
  gap: 18px;
}

.card-icon {
  width: 72px;
  height: 72px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.vscode-icon {
  background: linear-gradient(135deg, #007acc 0%, #005a9e 100%);
  box-shadow: 0 0 20px rgba(0, 122, 204, 0.4);
}

.cli-icon {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.card-header h3 {
  margin: 0 0 8px 0;
  font-size: 22px;
  color: var(--color-text-primary);
}

.card-content p {
  color: var(--color-text-secondary);
  margin-bottom: 20px;
  font-size: 14px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  color: var(--color-text-secondary);
  font-size: 15px;
  font-family: var(--font-mono);
}

.card-meta {
  display: flex;
  gap: 28px;
  padding-top: 20px;
  border-top: 1px solid var(--color-border-default);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-text-secondary);
  font-size: 14px;
}

.card-footer {
  margin-top: auto;
}

/* Quick Start */
.quick-start {
  position: relative;
  z-index: 2;
  margin-bottom: 40px;
}

.quick-start .cyber-card {
  padding: 32px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 16px;
  box-shadow: var(--shadow-xs);
}

.quick-start-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
}

.quick-start-header h3 {
  margin: 0;
  font-size: 24px;
  color: var(--color-text-primary);
}

.steps-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.step-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.step-number {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 28px;
  font-weight: 800;
  color: #6366f1;
  line-height: 1;
}

.step-content h4 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--color-text-primary);
}

.step-content p {
  margin: 0;
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

/* Terminal Footer */
.terminal-footer {
  position: relative;
  z-index: 2;
  margin-top: 60px;
  padding: 20px;
  background: #1e293b;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 10px;
}

.prompt {
  color: #10b981;
  font-weight: 600;
}

.command {
  color: #6366f1;
  flex: 1;
}

.cursor {
  width: 10px;
  height: 18px;
  background: #6366f1;
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

/* Additional utility classes */
.cyber-btn {
  padding: 12px 24px;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.cyber-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.3);
}

.cyber-btn-secondary {
  background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
}

.cyber-btn-secondary:hover {
  box-shadow: 0 4px 16px rgba(236, 72, 153, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  .welcome-view {
    padding: 32px 16px 60px;
  }

  .hero {
    padding: 50px 24px 40px;
  }

  .ascii-logo pre {
    font-size: 7px;
  }

  .hero-title {
    font-size: 36px;
    flex-direction: column;
    gap: 10px;
  }

  .hero-subtitle p {
    font-size: 15px;
  }

  .hero-stats {
    gap: 30px;
  }

  .stat-value {
    font-size: 28px;
  }

  .section-title {
    font-size: 24px;
    flex-direction: column;
    gap: 10px;
  }

  .path-cards {
    grid-template-columns: 1fr;
  }

  .steps-container {
    grid-template-columns: 1fr;
  }
}
</style>
