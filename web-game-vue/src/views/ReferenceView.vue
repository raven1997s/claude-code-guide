<template>
  <div class="reference-view">
    <n-space vertical :size="24">
      <div class="doc-header">
        <n-h1><n-icon :component="BookIcon" /> CLI 参数完整参考</n-h1>
        <n-text depth="3">Claude Code 支持丰富的命令行参数，用于控制会话行为</n-text>
      </div>

      <!-- 搜索组件 -->
      <SearchBox :data-source="SEARCH_DATABASE.cliParams" />

      <!-- 默认内容 -->
      <div class="doc-content">
        <n-card title="基础用法" size="small">
          <code class="code-block">claude [options] [command] [prompt]</code>
        </n-card>

        <n-card title="启动模式" size="small">
          <n-descriptions bordered :column="1">
            <n-descriptions-item label="--print, -p">
              打印模式：打印响应后退出（非交互模式）
            </n-descriptions-item>
            <n-descriptions-item label="--continue, -c">
              继续对话：继续最近的对话
            </n-descriptions-item>
            <n-descriptions-item label="--resume, -r [id]">
              恢复会话：恢复指定会话，可选指定会话 ID
            </n-descriptions-item>
            <n-descriptions-item label="--fork-session">
              分支会话：恢复时创建新会话而非复用原 ID
            </n-descriptions-item>
          </n-descriptions>
        </n-card>

        <n-card title="模型与 Agent" size="small">
          <n-descriptions bordered :column="1">
            <n-descriptions-item label="--model <name>">
              指定模型：sonnet/opus/haiku 或完整模型名称
            </n-descriptions-item>
            <n-descriptions-item label="--agent <name>">
              使用特定 Agent
            </n-descriptions-item>
            <n-descriptions-item label="--fallback-model <name>">
              当主模型过载时的备用模型
            </n-descriptions-item>
          </n-descriptions>
        </n-card>

        <n-card title="权限与安全" size="small">
          <n-descriptions bordered :column="1">
            <n-descriptions-item label="--permission-mode <mode>">
              权限模式：default/acceptEdits/bypassPermissions
            </n-descriptions-item>
            <n-descriptions-item label="--allowed-tools <list>">
              允许的工具列表
            </n-descriptions-item>
            <n-descriptions-item label="--disallowed-tools <list>">
              禁止的工具列表
            </n-descriptions-item>
          </n-descriptions>
        </n-card>

        <n-card title="更多参数" size="small">
          <n-list>
            <n-list-item>
              <n-thing title="--version, -v" description="输出版本号" />
            </n-list-item>
            <n-list-item>
              <n-thing title="--help, -h" description="显示帮助信息" />
            </n-list-item>
            <n-list-item>
              <n-thing title="--debug, -d" description="启用调试模式" />
            </n-list-item>
            <n-list-item>
              <n-thing title="--max-budget-usd <amount>" description="最大 API 调用花费" />
            </n-list-item>
            <n-list-item>
              <n-thing title="--output-format <format>" description="输出格式：text/json/stream-json" />
            </n-list-item>
          </n-list>
        </n-card>
      </div>
    </n-space>
  </div>
</template>

<script setup>
import { NCard, NSpace, NH1, NText, NDescriptions, NDescriptionsItem, NList, NListItem, NThing, NIcon } from 'naive-ui'
import { Book as BookIcon } from '@vicons/fa'
import SearchBox from '@/components/SearchBox.vue'
import { SEARCH_DATABASE } from '@/data/search-data'
</script>

<style scoped>
.reference-view {
  max-width: 1100px;
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

.doc-content {
  display: flex;
  flex-direction: column;
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

.code-block {
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%);
  color: #e4e4e7;
  padding: 16px 20px;
  border-radius: 10px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 15px;
  display: block;
  border: 1px solid rgba(102, 126, 234, 0.3);
}

/* 描述列表样式 */
:deep(.n-descriptions) {
  --n-td-text-color: #a1a1aa;
  --n-th-text-color: #fff;
  --n-border-color: rgba(255, 255, 255, 0.08);
}

:deep(.n-descriptions-table-content__label) {
  background: rgba(102, 126, 234, 0.08);
  color: #fff !important;
  font-weight: 600;
}

:deep(.n-descriptions-table-content__content) {
  color: #d4d4d8 !important;
}

/* 列表样式 */
:deep(.n-list) {
  --n-text-color: #a1a1aa;
}

:deep(.n-list-item) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

:deep(.n-thing) {
  --n-title-text-color: #fff;
  --n-description-text-color: #a1a1aa;
}

:deep(.n-thing-main__title) {
  color: #fff !important;
  font-weight: 600;
}

:deep(.n-thing-main__description) {
  color: #a1a1aa !important;
}
</style>
