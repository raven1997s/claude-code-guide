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
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 24px;
}

.doc-header {
  text-align: center;
}

.cheatsheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 16px;
}

.cheatsheet-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.command-code {
  background: #1e1e1e;
  color: #22d3ee;
  padding: 4px 8px;
  border-radius: 4px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
}
</style>
