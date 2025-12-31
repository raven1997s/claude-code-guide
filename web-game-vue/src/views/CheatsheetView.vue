<template>
  <div class="cheatsheet-view">
    <n-space vertical :size="24">
      <div class="doc-header">
        <n-h1><n-icon :component="CloneIcon" /> Claude Code 速查表</n-h1>
        <n-text depth="3">快速查找常用命令和快捷键</n-text>
      </div>

      <!-- 搜索组件 -->
      <SearchBox :data-source="cheatsheetData" />

      <!-- 默认内容 -->
      <div class="cheatsheet-grid">
        <n-card v-for="section in cheatsheetSections" :key="section.title" :title="section.title" size="small">
          <n-list>
            <n-list-item v-for="item in section.items" :key="item.command">
              <div class="cheatsheet-item">
                <code class="command-code">{{ item.command }}</code>
                <n-text depth="3">{{ item.desc }}</n-text>
              </div>
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </n-space>
  </div>
</template>

<script setup>
import { NCard, NSpace, NH1, NText, NList, NListItem, NIcon } from 'naive-ui'
import { Clone as CloneIcon } from '@vicons/fa'
import SearchBox from '@/components/SearchBox.vue'
import { SEARCH_DATABASE } from '@/data/search-data'

// 合并速查表数据
const cheatsheetData = [
  ...SEARCH_DATABASE.cliParams,
  ...SEARCH_DATABASE.slashCommands,
  ...SEARCH_DATABASE.quickCommands,
  ...SEARCH_DATABASE.fileReferences,
  ...SEARCH_DATABASE.shortcuts,
  ...SEARCH_DATABASE.models,
  ...SEARCH_DATABASE.permissionModes,
  ...SEARCH_DATABASE.configFiles
]

// 速查表分类
const cheatsheetSections = [
  {
    title: 'CLI 启动',
    items: SEARCH_DATABASE.quickCommands.filter(i => i.category === 'CLI启动')
  },
  {
    title: '文件引用',
    items: SEARCH_DATABASE.fileReferences
  },
  {
    title: '会话内命令',
    items: SEARCH_DATABASE.slashCommands.slice(0, 6)
  },
  {
    title: '快捷键',
    items: SEARCH_DATABASE.shortcuts
  },
  {
    title: '模型',
    items: SEARCH_DATABASE.models
  },
  {
    title: '权限模式',
    items: SEARCH_DATABASE.permissionModes
  }
]
</script>

<style scoped>
.cheatsheet-view {
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

.cheatsheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
  gap: 24px;
}

:deep(.n-card) {
  background: rgba(30, 30, 46, 0.5);
  border: 1px solid rgba(102, 126, 234, 0.15);
  transition: all 0.3s ease;
}

:deep(.n-card:hover) {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.15);
}

:deep(.n-card__header) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

:deep(.n-card__header span) {
  color: #fff !important;
  font-weight: 700;
}

:deep(.n-list) {
  --n-text-color: #a1a1aa;
}

:deep(.n-list-item) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

:deep(.n-list-item:last-child) {
  border-bottom: none;
}

.cheatsheet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  padding: 4px 0;
}

.command-code {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
  color: #a5b4fc;
  padding: 6px 12px;
  border-radius: 8px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(102, 126, 234, 0.3);
  white-space: nowrap;
}

.cheatsheet-item :deep(.n-text) {
  color: #a1a1aa;
  text-align: right;
  flex: 1;
}
</style>
