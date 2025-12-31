<template>
  <div class="commands-view">
    <PageBackground />

    <div class="content-wrapper">
      <n-space vertical :size="24">
        <div class="doc-header cyber-heading">
          <span class="cyber-prompt">></span>
          <n-h1><n-icon :component="CodeIcon" /> 内置斜杠命令</n-h1>
        </div>
        <n-text depth="3" class="header-desc">在 Claude Code 交互式会话中使用的命令</n-text>

        <!-- 搜索组件 -->
        <SearchBox :data-source="SEARCH_DATABASE.slashCommands" />

        <!-- 默认内容 - 命令卡片网格 -->
        <div class="commands-grid">
          <div
            v-for="cmd in SEARCH_DATABASE.slashCommands"
            :key="cmd.command"
            class="command-card cyber-card cyber-card-holo"
          >
            <div class="card-header">
              <code class="command-name cyber-mono">{{ cmd.command }}</code>
              <n-tag size="small" type="info" :bordered="false">{{ cmd.category }}</n-tag>
            </div>
            <n-text depth="3">{{ cmd.fullDesc }}</n-text>
          </div>
        </div>

        <!-- 快捷键参考 -->
        <n-card title="快捷键参考" class="cyber-card">
          <n-data-table
            :columns="shortcutColumns"
            :data="SEARCH_DATABASE.shortcuts"
            :bordered="false"
          />
        </n-card>
      </n-space>
    </div>
  </div>
</template>

<script setup>
import { NCard, NSpace, NH1, NText, NTag, NIcon, NDataTable } from 'naive-ui'
import { Code as CodeIcon } from '@vicons/fa'
import SearchBox from '@/components/SearchBox.vue'
import PageBackground from '@/components/PageBackground.vue'
import { SEARCH_DATABASE } from '@/data/search-data'

const shortcutColumns = [
  {
    title: '快捷键',
    key: 'command',
    render: (row) => row.command
  },
  {
    title: '功能',
    key: 'desc'
  }
]
</script>

<style scoped>
.commands-view {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(180deg, #f8f9fc 0%, #f0f2f5 100%);
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px;
}

.doc-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 10px;
}

.doc-header :deep(.n-h1) {
  font-size: 36px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.doc-header :deep(.n-icon) {
  color: #6366f1;
}

.cyber-heading {
  font-weight: 800;
}

.cyber-prompt {
  color: #6366f1;
}

.header-desc {
  display: block;
  text-align: center;
  margin-bottom: 40px;
  color: #6b7280;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

.command-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: all 0.3s ease;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.command-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.2);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.15);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.command-name {
  color: #6366f1;
  font-size: 16px;
  font-weight: 700;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

.cyber-mono {
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

:deep(.n-card) {
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.n-card__header) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.n-card__header span) {
  color: #1a1a2e !important;
  font-weight: 700;
}

:deep(.n-text[depth='3']) {
  color: #6b7280 !important;
  line-height: 1.6;
}

/* 数据表格样式 */
:deep(.n-data-table) {
  --n-td-text-color: #4b5563;
  --n-th-text-color: #1a1a2e;
  --n-border-color: rgba(0, 0, 0, 0.06);
  --n-tr-hover-color: rgba(99, 102, 241, 0.04);
}

:deep(.n-data-table-th) {
  color: #1a1a2e !important;
  font-weight: 700;
  background: rgba(99, 102, 241, 0.06) !important;
}

:deep(.n-data-table-td) {
  color: #4b5563 !important;
}

:deep(.n-data-table-tr:hover) {
  background: rgba(99, 102, 241, 0.04) !important;
}
</style>
