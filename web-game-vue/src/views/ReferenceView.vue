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
  max-width: 1000px;
  margin: 0 auto;
  padding: 32px 24px;
}

.doc-header {
  text-align: center;
}

.doc-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.code-block {
  background: #1e1e1e;
  color: #e4e4e7;
  padding: 12px 16px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  display: block;
}
</style>
