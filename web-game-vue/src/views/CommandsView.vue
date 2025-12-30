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
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.doc-header {
  text-align: center;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}
</style>
