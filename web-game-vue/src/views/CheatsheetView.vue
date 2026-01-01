<template>
  <div class="cheatsheet-view">
    <div class="page-container">
      <!-- 页头 -->
      <header class="page-header">
        <div class="header-content">
          <h1 class="page-title">
            <span class="title-icon">∞</span>
            命令速查手册
          </h1>
          <p class="page-subtitle">按分类浏览所有 Claude Code 命令</p>
        </div>
      </header>

      <!-- 手风琴折叠面板 -->
      <div class="commands-container">
        <div
          v-for="category in commandCategories"
          :key="category.name"
          class="category-block"
          :class="{ 'is-collapsed': collapsedCategories.has(category.name) }"
        >
          <!-- 分类头部 -->
          <button
            class="category-trigger"
            @click="toggleCategory(category.name)"
          >
            <span class="category-info">
              <span class="category-emoji">{{ category.icon }}</span>
              <span class="category-name">{{ category.label }}</span>
              <span class="category-count">{{ getCommandsByCategory(category.name).length }}</span>
            </span>
            <span class="collapse-icon" :class="{ 'is-rotated': !collapsedCategories.has(category.name) }">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 11L3 6h10l-5 5z"/>
              </svg>
            </span>
          </button>

          <!-- 命令列表 -->
          <div class="category-commands" v-show="!collapsedCategories.has(category.name)">
            <div class="commands-grid">
              <div
                v-for="(cmd, cmdIndex) in getCommandsByCategory(category.name)"
                :key="cmd.command"
                class="command-card stagger-item animate-fade-in-up"
                :style="{ animationDelay: `${cmdIndex * 30}ms` }"
                @click="showDetail(cmd)"
              >
                <div class="card-main">
                  <code class="command-name">{{ cmd.command }}</code>
                  <div class="card-actions">
                        <button
                          class="action-btn"
                          @click.stop="copyCommand(cmd.command, $event)"
                          :class="{ 'is-copied': copiedCommands[cmd.command] }"
                        >
                          <svg v-if="!copiedCommands[cmd.command]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                          </svg>
                          <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </button>
                  </div>
                </div>
                <p class="command-description">{{ cmd.fullDesc || cmd.desc }}</p>
                <div v-if="cmd.short || cmd.alias" class="command-tags">
                  <span v-if="cmd.short" class="tag">{{ cmd.short }}</span>
                  <span v-if="cmd.alias" class="tag tag-warn">{{ cmd.alias }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <Transition name="modal">
      <div v-if="showDetailModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close" @click="closeModal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>

          <div class="modal-header">
            <div class="modal-meta">
              <span class="modal-category">{{ selectedItem?.category || '命令' }}</span>
              <code class="modal-command">{{ selectedItem?.command }}</code>
            </div>
            <div v-if="selectedItem?.short || selectedItem?.alias" class="modal-tags">
              <span v-if="selectedItem?.short" class="tag">{{ selectedItem.short }}</span>
              <span v-if="selectedItem?.alias" class="tag tag-warn">{{ selectedItem.alias }}</span>
            </div>
          </div>

          <div class="modal-body">
            <p class="modal-description">{{ selectedItem?.fullDesc || selectedItem?.desc }}</p>

            <div v-if="selectedItem?.details" class="modal-section">
              <h4 class="section-title">详细说明</h4>
              <ul class="detail-list">
                <li v-for="(detail, index) in selectedItem.details" :key="index">{{ detail }}</li>
              </ul>
            </div>

            <div v-if="selectedItem?.example" class="modal-section">
              <div class="section-header">
                <h4 class="section-title">使用示例</h4>
                <button class="copy-btn" @click="copyExample" :class="{ 'is-copied': copied }">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                  {{ copied ? '已复制' : '复制' }}
                </button>
              </div>
              <pre class="example-code">{{ selectedItem.example }}</pre>
            </div>

            <div v-if="selectedItem?.keywords" class="modal-section">
              <h4 class="section-title">相关关键词</h4>
              <div class="keywords-list">
                <span v-for="keyword in selectedItem.keywords" :key="keyword" class="keyword-tag">
                  {{ keyword }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Toast 提示 -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
        <span>已复制到剪贴板</span>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { SEARCH_DATABASE } from '@/data/search-data'

// 状态
const showDetailModal = ref(false)
const selectedItem = ref(null)
const copied = ref(false)
const copiedCommands = ref({})
const showToast = ref(false)
const collapsedCategories = ref(new Set())

// 所有命令数据
const allCommands = [
  ...SEARCH_DATABASE.cliParams,
  ...SEARCH_DATABASE.slashCommands,
  ...SEARCH_DATABASE.fileReferences,
  ...SEARCH_DATABASE.shortcuts,
  ...SEARCH_DATABASE.models,
  ...SEARCH_DATABASE.permissionModes,
  ...(SEARCH_DATABASE.mcpCommands || []),
  ...(SEARCH_DATABASE.pluginCommands || []),
  ...(SEARCH_DATABASE.configFiles || [])
]

// 分类定义
const commandCategories = [
  { name: 'cli', label: 'CLI 参数', icon: '⚙️' },
  { name: 'slash', label: '斜杠命令', icon: '⚡' },
  { name: 'file', label: '文件引用', icon: '📁' },
  { name: 'shortcut', label: '快捷键', icon: '⌨️' },
  { name: 'model', label: '模型', icon: '🤖' },
  { name: 'permission', label: '权限模式', icon: '🔒' },
  { name: 'mcp', label: 'MCP', icon: '🔌' },
  { name: 'plugin', label: '插件', icon: '🧩' },
  { name: 'config', label: '配置', icon: '📄' }
]

// 根据分类获取命令
function getCommandsByCategory(categoryName) {
  return allCommands.filter(cmd => {
    if (categoryName === 'cli') return cmd.command?.startsWith('-')
    if (categoryName === 'slash') return cmd.command?.startsWith('/')
    if (categoryName === 'file') return cmd.command?.startsWith('@')
    if (categoryName === 'shortcut') return cmd.category === '快捷键'
    if (categoryName === 'model') return cmd.category === '模型'
    if (categoryName === 'permission') return cmd.category === '权限模式'
    if (categoryName === 'mcp') return cmd.category === 'MCP'
    if (categoryName === 'plugin') return cmd.category === '插件'
    if (categoryName === 'config') return cmd.category === '配置'
    return false
  })
}

// 切换分类折叠
function toggleCategory(name) {
  if (collapsedCategories.value.has(name)) {
    collapsedCategories.value.delete(name)
  } else {
    collapsedCategories.value.add(name)
  }
}

// 显示详情
function showDetail(item) {
  selectedItem.value = item
  showDetailModal.value = true
}

// 关闭弹窗
function closeModal() {
  showDetailModal.value = false
  copied.value = false
}

// 复制命令
function copyCommand(command, event) {
  event?.stopPropagation()
  navigator.clipboard.writeText(command).then(() => {
    copiedCommands.value[command] = true
    showToast.value = true
    setTimeout(() => {
      copiedCommands.value[command] = false
      showToast.value = false
    }, 1500)
  })
}

// 复制示例
function copyExample() {
  if (selectedItem.value?.example) {
    navigator.clipboard.writeText(selectedItem.value.example).then(() => {
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, 2000)
    })
  }
}
</script>

<style scoped>
.cheatsheet-view {
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

/* 页面容器 */
.page-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 60px 24px;
}

/* 页头 */
.page-header {
  margin-bottom: 48px;
  text-align: center;
}

.page-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  letter-spacing: -0.02em;
  font-family: var(--font-sans);
}

.title-icon {
  font-size: 28px;
  opacity: 0.8;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 400;
}

/* 命令容器 */
.commands-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* 分类块 */
.category-block {
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-xs);
}

.category-block:hover {
  border-color: rgba(99, 102, 241, 0.15);
  box-shadow: var(--shadow-sm);
}

/* 分类触发器 */
.category-trigger {
  width: 100%;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;
}

.category-trigger:hover {
  background: rgba(99, 102, 241, 0.04);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.category-emoji {
  font-size: 20px;
}

.category-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.category-count {
  font-size: 12px;
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
  padding: 2px 8px;
  border-radius: 12px;
}

.collapse-icon {
  color: var(--color-text-secondary);
  transition: transform 0.2s ease;
}

.collapse-icon.is-rotated {
  transform: rotate(180deg);
}

/* 命令列表 */
.category-commands {
  padding: 8px 12px 12px;
}

.commands-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 8px;
}

/* 命令卡片 */
.command-card {
  padding: 14px 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.command-card:hover {
  background: var(--color-bg-elevated);
  border-color: rgba(99, 102, 241, 0.25);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.card-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
}

.command-name {
  font-size: 14px;
  font-weight: 500;
  color: #6366f1;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
}

.card-actions {
  opacity: 0;
  transition: opacity 0.15s ease;
}

.command-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-tertiary);
}

.action-btn.is-copied {
  color: var(--color-success);
}

.command-description {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 10px 0;
}

.command-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  font-size: 11px;
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
  padding: 3px 8px;
  border-radius: 4px;
}

.tag-warn {
  color: var(--color-warning);
  background: var(--color-warning-light);
}

/* 弹窗 */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  width: 100%;
  max-width: 580px;
  max-height: 85vh;
  overflow-y: auto;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-xl);
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 8px;
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all 0.15s ease;
}

.modal-close:hover {
  background: var(--color-bg-secondary);
  color: var(--color-text-primary);
}

.modal-header {
  padding: 24px 24px 20px;
  border-bottom: 1px solid var(--color-border-default);
}

.modal-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.modal-category {
  font-size: 12px;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 500;
}

.modal-command {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text-primary);
  font-family: var(--font-mono);
}

.modal-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.modal-body {
  padding: 24px;
}

.modal-description {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.7;
  margin: 0 0 24px 0;
}

.modal-section {
  margin-bottom: 24px;
}

.modal-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0 0 12px 0;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.copy-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: var(--color-bg-tertiary);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  color: var(--color-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.copy-btn:hover {
  background: var(--color-bg-secondary);
  border-color: var(--color-border-strong);
  color: var(--color-text-primary);
}

.copy-btn.is-copied {
  color: var(--color-success);
  border-color: rgba(16, 185, 129, 0.2);
  background: rgba(16, 185, 129, 0.08);
}

.detail-list {
  margin: 0;
  padding-left: 20px;
  list-style: none;
}

.detail-list li {
  font-size: 14px;
  color: var(--color-text-secondary);
  line-height: 1.8;
  margin-bottom: 6px;
  position: relative;
}

.detail-list li::before {
  content: '•';
  position: absolute;
  left: -16px;
  color: var(--color-text-tertiary);
}

.example-code {
  margin: 0;
  padding: 16px;
  background: var(--color-bg-secondary);
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  line-height: 1.6;
  overflow-x: auto;
}

.keywords-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.keyword-tag {
  font-size: 12px;
  color: var(--color-success);
  background: var(--color-success-light);
  padding: 5px 10px;
  border-radius: 6px;
}

/* Toast */
.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-bg-elevated);
  border: 1px solid rgba(16, 185, 129, 0.2);
  border-radius: 10px;
  box-shadow: var(--shadow-lg);
  font-size: 14px;
  color: var(--color-text-primary);
  z-index: 1001;
}

.toast svg {
  color: var(--color-success);
}

/* 过渡动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.2s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(10px);
}

/* 响应式 */
@media (max-width: 768px) {
  .page-container {
    padding: 40px 16px;
  }

  .page-title {
    font-size: 24px;
    flex-direction: column;
    gap: 8px;
  }

  .commands-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    max-width: calc(100vw - 32px);
  }

  .card-actions {
    opacity: 1;
  }
}
</style>
