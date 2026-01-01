<template>
  <div class="reference-view">
    <PageBackground />

    <div class="content-wrapper">
      <n-space vertical :size="24">
        <div class="doc-header cyber-heading">
          <span class="cyber-prompt">></span>
          <n-h1><n-icon :component="BookIcon" /> CLI 参数完整参考</n-h1>
        </div>
        <n-text depth="3" class="header-desc">Claude Code 支持丰富的命令行参数，用于控制会话行为</n-text>

        <!-- 搜索组件 -->
        <SearchBox :data-source="SEARCH_DATABASE.cliParams" />

        <!-- 默认内容 -->
        <div class="doc-content">
          <n-card title="基础用法" size="small" class="cyber-card">
            <code class="code-block cyber-mono">claude [options] [command] [prompt]</code>
          </n-card>

          <n-card title="启动模式" size="small" class="cyber-card">
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

          <n-card title="模型与 Agent" size="small" class="cyber-card">
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

          <n-card title="权限与安全" size="small" class="cyber-card">
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

          <n-card title="更多参数" size="small" class="cyber-card">
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
  </div>
</template>

<script setup>
import { NCard, NSpace, NH1, NText, NDescriptions, NDescriptionsItem, NList, NListItem, NThing, NIcon } from 'naive-ui'
import { Book as BookIcon } from '@vicons/fa'
import SearchBox from '@/components/SearchBox.vue'
import PageBackground from '@/components/PageBackground.vue'
import { SEARCH_DATABASE } from '@/data/search-data'
</script>

<style scoped>
.reference-view {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

.content-wrapper {
  position: relative;
  z-index: 2;
  max-width: 1100px;
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
  color: var(--color-text-primary);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.doc-header :deep(.n-icon) {
  color: var(--color-primary-500);
}

.cyber-heading {
  font-weight: 800;
}

.cyber-prompt {
  color: var(--color-primary-500);
}

.header-desc {
  display: block;
  text-align: center;
  margin-bottom: 40px;
  color: var(--color-text-secondary);
}

.doc-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

:deep(.n-card) {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  transition: all 0.3s ease;
  box-shadow: var(--shadow-xs);
}

:deep(.n-card:hover) {
  border-color: rgba(99, 102, 241, 0.15);
  box-shadow: var(--shadow-sm);
}

:deep(.n-card__header) {
  border-bottom: 1px solid var(--color-border-default);
}

:deep(.n-card__header span) {
  color: var(--color-text-primary) !important;
  font-weight: 700;
}

.code-block {
  background: rgba(99, 102, 241, 0.08);
  color: var(--color-primary-500);
  padding: 16px 20px;
  border-radius: 8px;
  font-size: 15px;
  display: block;
  border: 1px solid rgba(99, 102, 241, 0.15);
  font-family: var(--font-mono);
}

.cyber-mono {
  font-family: var(--font-mono);
}

.cyber-card {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
}

/* 描述列表样式 */
:deep(.n-descriptions) {
  --n-td-text-color: var(--color-text-secondary);
  --n-th-text-color: var(--color-text-primary);
  --n-border-color: var(--color-border-default);
}

:deep(.n-descriptions-table-content__label) {
  background: rgba(99, 102, 241, 0.06);
  color: var(--color-text-primary) !important;
  font-weight: 600;
}

:deep(.n-descriptions-table-content__content) {
  color: var(--color-text-secondary) !important;
}

/* 列表样式 */
:deep(.n-list) {
  --n-text-color: var(--color-text-secondary);
}

:deep(.n-list-item) {
  border-bottom: 1px solid var(--color-border-default);
}

:deep(.n-thing) {
  --n-title-text-color: var(--color-text-primary);
  --n-description-text-color: var(--color-text-secondary);
}

:deep(.n-thing-main__title) {
  color: var(--color-text-primary) !important;
  font-weight: 600;
}

:deep(.n-thing-main__description) {
  color: var(--color-text-secondary) !important;
}
</style>
