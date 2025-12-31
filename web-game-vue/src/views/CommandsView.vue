<template>
  <div class="commands-view">
    <n-space vertical :size="24">
      <div class="doc-header">
        <n-h1><n-icon :component="CodeIcon" /> 内置斜杠命令</n-h1>
        <n-text depth="3">在 Claude Code 交互式会话中使用的命令</n-text>
      </div>

      <!-- 搜索组件 -->
      <SearchBox :data-source="SEARCH_DATABASE.slashCommands" />

      <!-- 默认内容 - 命令卡片网格 -->
      <div class="commands-grid">
        <n-card v-for="cmd in SEARCH_DATABASE.slashCommands" :key="cmd.command" size="small" hoverable>
          <template #header>
            <n-space align="center" justify="space-between">
              <n-text strong>{{ cmd.command }}</n-text>
              <n-tag size="small" type="info">{{ cmd.category }}</n-tag>
            </n-space>
          </template>
          <n-text depth="3">{{ cmd.fullDesc }}</n-text>
        </n-card>
      </div>

      <!-- 快捷键参考 -->
      <n-card title="快捷键参考">
        <n-data-table
          :columns="shortcutColumns"
          :data="SEARCH_DATABASE.shortcuts"
          :bordered="false"
        />
      </n-card>
    </n-space>
  </div>
</template>

<script setup>
import { NCard, NSpace, NH1, NText, NTag, NIcon, NDataTable } from 'naive-ui'
import { Code as CodeIcon } from '@vicons/fa'
import SearchBox from '@/components/SearchBox.vue'
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
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px;
}

.doc-header {
  text-align: center;
  margin-bottom: 40px;
}

.doc-header :deep(.n-h1) {
  font-size: 36px;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.doc-header :deep(.n-icon) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 32px;
}

:deep(.commands-grid .n-card) {
  background: rgba(30, 30, 46, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

:deep(.commands-grid .n-card:hover) {
  border-color: rgba(102, 126, 234, 0.4);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
  transform: translateY(-4px);
}

:deep(.commands-grid .n-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 20px;
}

:deep(.commands-grid .n-card__content) {
  flex: 1;
  padding: 16px 20px;
}

:deep(.n-text strong) {
  color: #fff !important;
  font-weight: 700;
  font-size: 16px;
}

:deep(.n-text[depth='3']) {
  color: #a1a1aa !important;
  line-height: 1.6;
}

:deep(.n-card[title='快捷键参考']) {
  background: rgba(30, 30, 46, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.15);
}

:deep(.n-card[title='快捷键参考'] .n-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

:deep(.n-card[title='快捷键参考'] .n-card__header span) {
  color: #fff !important;
  font-weight: 700;
}

/* 数据表格样式 */
:deep(.n-data-table) {
  --n-td-text-color: #a1a1aa;
  --n-th-text-color: #fff;
  --n-border-color: rgba(255, 255, 255, 0.08);
  --n-tr-hover-color: rgba(102, 126, 234, 0.05);
}

:deep(.n-data-table-th) {
  color: #fff !important;
  font-weight: 700;
  background: rgba(102, 126, 234, 0.08) !important;
}

:deep(.n-data-table-td) {
  color: #d4d4d8 !important;
}

:deep(.n-data-table-tr:hover) {
  background: rgba(102, 126, 234, 0.08) !important;
}
</style>
