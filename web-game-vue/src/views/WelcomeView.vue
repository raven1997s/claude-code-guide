<template>
  <div class="welcome-view">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">
          <n-icon :component="CodeIcon" size="48" />
          Claude Code 学习中心
        </h1>
        <p class="hero-subtitle">掌握 Claude Code CLI 和 VS Code 插件的使用技巧</p>
      </div>
    </section>

    <!-- Learning Paths -->
    <section class="learning-paths">
      <h2 class="section-title">选择你的学习路径</h2>

      <div class="path-cards">
        <!-- VS Code Extension Path -->
        <n-card class="path-card vscode-card" hoverable @click="goToVSCode">
          <template #header>
            <div class="card-header">
              <div class="card-icon vscode-icon">
                <n-icon :component="VSCodeIcon" size="48" />
              </div>
              <div>
                <h3>VS Code 插件教程</h3>
                <n-tag type="success" size="small">推荐新手</n-tag>
              </div>
            </div>
          </template>

          <div class="card-content">
            <p>学习如何在 VS Code 中使用 Claude Code 插件，通过交互式演示掌握：</p>
            <ul class="feature-list">
              <li><n-icon :component="CheckIcon" /> 界面布局和各个区域</li>
              <li><n-icon :component="CheckIcon" /> 对话功能和 @-mention 文件</li>
              <li><n-icon :component="CheckIcon" /> 代码差异查看和应用</li>
              <li><n-icon :component="CheckIcon" /> 常用工作流程实战</li>
              <li><n-icon :component="CheckIcon" /> 配置和快捷键</li>
            </ul>

            <div class="card-meta">
              <span class="meta-item">
                <n-icon :component="TimeIcon" />
                预计 30 分钟
              </span>
              <span class="meta-item">
                <n-icon :component="ListIcon" />
                8 个教程模块
              </span>
            </div>
          </div>

          <template #footer>
            <n-button type="primary" size="large" block>
              开始学习
              <template #icon>
                <n-icon :component="ArrowRightIcon" />
              </template>
            </n-button>
          </template>
        </n-card>

        <!-- CLI Path -->
        <n-card class="path-card cli-card" hoverable @click="goToCLI">
          <template #header>
            <div class="card-header">
              <div class="card-icon cli-icon">
                <n-icon :component="TerminalIcon" size="48" />
              </div>
              <div>
                <h3>CLI 命令教程</h3>
                <n-tag type="info" size="small">进阶内容</n-tag>
              </div>
            </div>
          </template>

          <div class="card-content">
            <p>通过互动游戏学习 Claude Code CLI 命令的使用：</p>
            <ul class="feature-list">
              <li><n-icon :component="CheckIcon" /> 基础命令操作</li>
              <li><n-icon :component="CheckIcon" /> 会话管理技巧</li>
              <li><n-icon :component="CheckIcon" /> Git 集成工作流</li>
              <li><n-icon :component="CheckIcon" /> 高级功能和配置</li>
              <li><n-icon :component="CheckIcon" /> 实战场景演练</li>
            </ul>

            <div class="card-meta">
              <span class="meta-item">
                <n-icon :component="TimeIcon" />
                预计 45 分钟
              </span>
              <span class="meta-item">
                <n-icon :component="ListIcon" />
                25 个互动关卡
              </span>
            </div>
          </div>

          <template #footer>
            <n-button size="large" block>
              开始游戏
              <template #icon>
                <n-icon :component="ArrowRightIcon" />
              </template>
            </n-button>
          </template>
        </n-card>
      </div>
    </section>

    <!-- Quick Start -->
    <section class="quick-start">
      <n-card>
        <template #header>
          <h3><n-icon :component="BoltIcon" /> 快速开始</h3>
        </template>
        <n-steps>
          <n-step
            v-for="(step, index) in quickStartSteps"
            :key="index"
            :title="step.title"
            :description="step.description"
          />
        </n-steps>
      </n-card>
    </section>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import {
  NCard, NButton, NIcon, NTag, NSteps, NStep
} from 'naive-ui'
import {
  Code as CodeIcon,
  WindowMaximize as VSCodeIcon,
  Terminal as TerminalIcon,
  Check as CheckIcon,
  Clock as TimeIcon,
  List as ListIcon,
  ArrowRight as ArrowRightIcon,
  Bolt as BoltIcon
} from '@vicons/fa'

const router = useRouter()

const quickStartSteps = [
  {
    title: '选择学习路径',
    description: '根据你的需求选择 VS Code 插件或 CLI 命令教程'
  },
  {
    title: '跟随引导学习',
    description: '按照步骤指引，了解各个功能的使用方法'
  },
  {
    title: '动手实践',
    description: '通过互动演示和游戏巩固所学知识'
  },
  {
    title: '掌握技巧',
    description: '完成学习后，在实际项目中使用 Claude Code'
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
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
}

/* Hero Section - 优化渐变和效果 */
.hero {
  text-align: center;
  padding: 80px 40px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%);
  border-radius: 24px;
  margin-bottom: 56px;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(102, 126, 234, 0.3);
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: heroShine 15s linear infinite;
}

@keyframes heroShine {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  font-size: 20px;
  opacity: 0.95;
  margin: 0;
  font-weight: 300;
}

/* Section Title - 适配暗色主题 */
.section-title {
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Path Cards - 优化卡片样式 */
.learning-paths {
  margin-bottom: 56px;
}

.path-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
  gap: 28px;
}

:deep(.path-card.n-card) {
  background: rgba(30, 30, 46, 0.6);
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

:deep(.path-card.n-card:hover) {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(102, 126, 234, 0.2);
  border-color: rgba(102, 126, 234, 0.4);
}

:deep(.path-card .n-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 18px;
}

.card-icon {
  width: 72px;
  height: 72px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.vscode-icon {
  background: linear-gradient(135deg, #007acc 0%, #005a9e 100%);
}

.cli-icon {
  background: linear-gradient(135deg, #22d3ee 0%, #0891b2 100%);
}

.card-header h3 {
  margin: 0 0 10px 0;
  font-size: 22px;
  font-weight: 700;
  color: #fff;
}

.card-content p {
  color: #a1a1aa;
  margin-bottom: 20px;
  line-height: 1.7;
  font-size: 15px;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0 0 24px 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  color: #d4d4d8;
  font-size: 14px;
}

.feature-list li :deep(.n-icon) {
  color: #667eea;
}

.card-meta {
  display: flex;
  gap: 28px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #71717a;
  font-size: 14px;
}

.meta-item :deep(.n-icon) {
  color: #667eea;
}

/* Quick Start - 优化卡片样式 */
.quick-start {
  margin-bottom: 40px;
}

:deep(.quick-start .n-card) {
  background: rgba(30, 30, 46, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.15);
}

:deep(.quick-start h3) {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
}

:deep(.quick-start .n-icon) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

:deep(.n-steps) {
  --n-text-color: #a1a1aa;
}

:deep(.n-step) {
  --n-header-text-color: #fff;
}

@media (max-width: 768px) {
  .welcome-view {
    padding: 32px 16px;
  }

  .hero {
    padding: 50px 24px;
  }

  .hero-title {
    font-size: 32px;
    flex-direction: column;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .section-title {
    font-size: 24px;
  }

  .path-cards {
    grid-template-columns: 1fr;
  }
}
</style>
