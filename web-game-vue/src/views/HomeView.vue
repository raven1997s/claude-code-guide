<template>
  <div class="home-view">
    <n-space vertical :size="32" align="center">
      <!-- Hero 区域 -->
      <div class="hero">
        <n-h1>
          <n-gradient-text type="info">Claude Code 学习中心</n-gradient-text>
        </n-h1>
        <n-text depth="3" class="hero-subtitle">
          在浏览器中学习 Claude Code CLI 命令，无需安装即可体验
        </n-text>
        <n-space :size="16" class="hero-actions">
          <n-button type="primary" size="large" @click="navigateTo('/game')">
            <template #icon>
              <n-icon :component="GameIcon" />
            </template>
            开始游戏学习
          </n-button>
          <n-button size="large" @click="navigateTo('/reference')">
            <template #icon>
              <n-icon :component="BookIcon" />
            </template>
            查看命令参考
          </n-button>
        </n-space>
      </div>

      <!-- 特性卡片 -->
      <div class="features-grid">
        <n-card hoverable>
          <template #header>
            <n-space align="center">
              <n-icon size="28" color="#22d3ee" :component="GameIcon" />
              <span>互动游戏</span>
            </n-space>
          </template>
          <n-text depth="3">
            25个精心设计的关卡，通过模拟终端学习 CLI 命令，从基础到高级逐步进阶
          </n-text>
        </n-card>
        <n-card hoverable>
          <template #header>
            <n-space align="center">
              <n-icon size="28" color="#a78bfa" :component="BookIcon" />
              <span>完整文档</span>
            </n-space>
          </template>
          <n-text depth="3">
            CLI 参数、斜杠命令、速查表等完整文档，支持模糊搜索快速查找
          </n-text>
        </n-card>
        <n-card hoverable>
          <template #header>
            <n-space align="center">
              <n-icon size="28" color="#34d399" :component="TerminalIcon" />
              <span>无需安装</span>
            </n-space>
          </template>
          <n-text depth="3">
            所有功能在浏览器中运行，无需安装 Claude Code，随时学习
          </n-text>
        </n-card>
      </div>

      <!-- 统计数据 -->
      <n-card class="stats-card">
        <n-space :size="32" justify="center">
          <n-statistic label="关卡数量" :value="25" />
          <n-statistic label="命令文档" :value="60" />
          <n-statistic label="学习路径" :value="5" />
        </n-space>
      </n-card>

      <!-- 学习路径 -->
      <div class="learning-path">
        <n-h2 align="center">学习路径</n-h2>
        <n-steps vertical :current="1">
          <n-step title="CLI 基础" description="学习基本的 CLI 命令和参数（关卡 1-10）" />
          <n-step title="会话命令" description="掌握交互式会话中的斜杠命令（关卡 11-17）" />
          <n-step title="综合应用" description="综合运用所学知识完成复杂任务（关卡 18-25）" />
        </n-steps>
      </div>

      <!-- 热门搜索 -->
      <n-card title="热门搜索">
        <n-space>
          <n-tag v-for="item in popularSearches" :key="item.query" checkable @click="handlePopularSearch(item.query)">
            {{ item.query }}
          </n-tag>
        </n-space>
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { NCard, NSpace, NH1, NH2, NText, NButton, NIcon, NStatistic, NSteps, NStep, NTag, NGradientText } from 'naive-ui'
import { Gamepad as GameIcon, Book as BookIcon, Terminal as TerminalIcon } from '@vicons/fa'

const router = useRouter()

const popularSearches = [
  { query: 'help', desc: '查看帮助命令' },
  { query: '提交', desc: 'Git 提交代码' },
  { query: 'claude -p', desc: '快速提问' },
  { query: '模型', desc: '选择 AI 模型' },
  { query: 'clear', desc: '清除对话' }
]

function navigateTo(path) {
  router.push(path)
}

function handlePopularSearch(query) {
  console.log('搜索:', query)
}
</script>

<style scoped>
.home-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.hero {
  text-align: center;
  padding: 60px 20px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 16px;
}

.hero-subtitle {
  font-size: 18px;
  margin-bottom: 32px;
}

.hero-actions {
  justify-content: center;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  width: 100%;
}

.stats-card {
  width: 100%;
  margin: 32px 0;
}

.learning-path {
  width: 100%;
  padding: 32px;
}
</style>
