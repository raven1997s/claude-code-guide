<template>
  <div class="search-view">
    <div class="page-container">
      <!-- 搜索区域 -->
      <div class="search-section">
        <header class="search-header">
          <h1 class="page-title">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            命令搜索
          </h1>
          <p class="page-subtitle">搜索 Claude Code CLI 和 VS Code 插件的所有命令</p>
        </header>

        <!-- 搜索输入 -->
        <div class="search-input-wrapper">
          <div class="search-input-container">
            <svg class="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="搜索命令或中文描述..."
              class="search-input"
              autocomplete="off"
              @input="handleSearch"
            >
            <button
              v-if="searchQuery"
              class="clear-btn"
              @click="clearSearch"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- 搜索模式切换 -->
          <div class="mode-tabs">
            <button
              v-for="mode in searchModes"
              :key="mode.value"
              :class="['mode-tab', { 'is-active': searchMode === mode.value }]"
              @click="searchMode = mode.value"
            >
              {{ mode.label }}
            </button>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-if="!searchQuery" class="empty-state">
          <!-- 热门搜索 -->
          <div class="popular-section">
            <div class="section-header-inline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="section-icon">
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3.5 3 4 6 .5-2.5 1.5-4 3.5-4 .5.5 1 1.5 1 2.5a2.5 2.5 0 0 0 5 0c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5-2.5 2-4.9 4-6.5 2-1.6 3.5-3 4-6 .5 2.5 1.5 4 3.5 4 .5-.5 1-1.5 1-2.5z"/>
              </svg>
              <span class="section-title">热门搜索</span>
            </div>
            <div class="tag-cloud">
              <button
                v-for="item in popularSearches"
                :key="item"
                class="search-tag"
                @click="searchFor(item)"
              >
                {{ item }}
              </button>
            </div>
          </div>

          <!-- 搜索历史 -->
          <div v-if="searchHistory.length > 0" class="history-section">
            <div class="section-header-inline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="section-icon">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <span class="section-title">搜索历史</span>
              <button class="clear-history" @click="clearHistory">清空</button>
            </div>
            <div class="tag-cloud">
              <button
                v-for="item in searchHistory"
                :key="item"
                class="search-tag has-close"
                @click="searchFor(item)"
              >
                {{ item }}
                <span class="close-icon" @click.stop="removeFromHistory(item)">×</span>
              </button>
            </div>
          </div>

          <!-- 搜索提示 -->
          <div class="search-tips">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>支持模糊搜索，可以输入命令的一部分或中文描述</span>
          </div>
        </div>
      </div>

      <!-- 搜索结果 -->
      <div v-if="searchQuery" class="results-section">
        <!-- 结果统计 -->
        <div class="results-header">
          <span class="results-count">
            找到 <strong>{{ searchResults.length }}</strong> 个结果
          </span>
        </div>

        <!-- 无结果 -->
        <div v-if="searchResults.length === 0" class="no-results">
          <div class="no-results-icon">¯\\_(ツ)_/¯</div>
          <p class="no-results-title">未找到相关命令</p>
          <p class="no-results-desc">尝试使用不同的关键词搜索</p>
          <div v-if="searchSuggestions.length > 0" class="suggestions">
            <span class="suggestions-label">建议搜索：</span>
            <button
              v-for="suggestion in searchSuggestions"
              :key="suggestion"
              class="suggestion-tag"
              @click="searchFor(suggestion)"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>

        <!-- 结果列表 -->
        <div v-else class="results-list">
          <div
            v-for="category in resultCategories"
            :key="category.name"
            class="result-category"
          >
            <div class="category-header-inline">
              <span class="category-emoji">{{ category.icon }}</span>
              <span class="category-name">{{ category.label }}</span>
              <span class="category-count">{{ category.items.length }}</span>
            </div>
            <div class="result-grid">
              <div
                v-for="(item, itemIndex) in category.items"
                :key="item.command || item.key"
                class="result-card stagger-item animate-fade-in-up"
                :style="{ animationDelay: `${itemIndex * 50}ms` }"
                @click="showDetail(item)"
              >
                <code class="result-command" v-html="highlightText(item.command || item.key)"></code>
                <p class="result-desc" v-html="highlightText(item.fullDesc || item.desc)"></p>
                <div v-if="item.example" class="result-example">
                  <code>{{ item.example }}</code>
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
              <code class="modal-command">{{ selectedItem?.command || selectedItem?.key }}</code>
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
              <h4 class="section-title">使用示例</h4>
              <pre class="example-code">{{ selectedItem.example }}</pre>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { SEARCH_DATABASE } from '@/data/search-data'
import Fuse from 'fuse.js'

// 常量
const SEARCH_HISTORY_KEY = 'claude-code-search-history'
const MAX_HISTORY = 10

// 合并所有命令数据
const allCommands = [
  ...SEARCH_DATABASE.cliParams,
  ...SEARCH_DATABASE.slashCommands,
  ...SEARCH_DATABASE.fileReferences,
  ...SEARCH_DATABASE.shortcuts,
  ...SEARCH_DATABASE.models,
  ...SEARCH_DATABASE.permissionModes,
  ...SEARCH_DATABASE.mcpCommands,
  ...SEARCH_DATABASE.pluginCommands,
  ...SEARCH_DATABASE.configFiles
]

// 状态
const searchQuery = ref('')
const searchMode = ref('auto')
const searchHistory = ref([])
const showDetailModal = ref(false)
const selectedItem = ref(null)

// 搜索模式选项
const searchModes = [
  { label: '智能', value: 'auto' },
  { label: '命令', value: 'command' },
  { label: '中文', value: 'chinese' }
]

// 热门搜索
const popularSearches = [
  'help',
  '/commit',
  '@file',
  '--model',
  'diff',
  '/tasks',
  'git',
  'plugin'
]

// 搜索建议
const searchSuggestions = computed(() => {
  const suggestions = []
  if (searchQuery.value.length >= 2) {
    allCommands.forEach(cmd => {
      const command = cmd.command || cmd.key || ''
      if (command.toLowerCase().includes(searchQuery.value.toLowerCase())) {
        suggestions.push(command)
      }
    })
  }
  return suggestions.slice(0, 6)
})

// 搜索结果
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.trim().toLowerCase()

  let keys = ['command', 'short', 'desc', 'fullDesc', 'keywords']
  if (searchMode.value === 'command') {
    keys = ['command', 'short', 'keywords']
  } else if (searchMode.value === 'chinese') {
    keys = ['desc', 'fullDesc', 'keywords']
  }

  const fuse = new Fuse(allCommands, {
    keys,
    threshold: 0.4,
    distance: 100,
    minMatchCharLength: 1,
    ignoreLocation: true
  })

  const results = fuse.search(query)
  return results.map(r => r.item)
})

// 监听搜索变化
watch(searchQuery, (newVal) => {
  if (newVal.trim() && newVal.trim().length >= 2) {
    saveToHistory(newVal.trim())
  }
})

// 获取项目的主要分类
function getMainCategory(item) {
  if (item.command?.startsWith('-')) return 'cli'
  if (item.command?.startsWith('/')) return 'slash'
  if (item.command?.startsWith('@')) return 'file'
  if (item.category === '快捷键') return 'shortcut'
  if (item.category === '模型') return 'model'
  if (item.category === '权限模式') return 'permission'
  if (item.category === 'MCP') return 'mcp'
  if (item.category === '插件') return 'plugin'
  if (item.category === '配置') return 'config'
  return 'other'
}

// 结果分类
const resultCategories = computed(() => {
  const categories = [
    { name: 'cli', label: 'CLI 参数', icon: '⚙️', items: [] },
    { name: 'slash', label: '斜杠命令', icon: '⚡', items: [] },
    { name: 'file', label: '文件引用', icon: '📁', items: [] },
    { name: 'shortcut', label: '快捷键', icon: '⌨️', items: [] },
    { name: 'model', label: '模型', icon: '🤖', items: [] },
    { name: 'permission', label: '权限模式', icon: '🔒', items: [] },
    { name: 'mcp', label: 'MCP 命令', icon: '🔌', items: [] },
    { name: 'plugin', label: '插件命令', icon: '🧩', items: [] },
    { name: 'config', label: '配置文件', icon: '📄', items: [] }
  ]

  const usedItems = new Set()

  searchResults.value.forEach(item => {
    const mainCategory = getMainCategory(item)
    const category = categories.find(c => c.name === mainCategory)
    if (category && !usedItems.has(item)) {
      category.items.push(item)
      usedItems.add(item)
    }
  })

  return categories.filter(c => c.items.length > 0)
})

// 搜索历史管理
function loadHistory() {
  try {
    const saved = localStorage.getItem(SEARCH_HISTORY_KEY)
    if (saved) {
      searchHistory.value = JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load search history:', e)
  }
}

function saveToHistory(query) {
  const index = searchHistory.value.indexOf(query)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
  }
  searchHistory.value.unshift(query)
  if (searchHistory.value.length > MAX_HISTORY) {
    searchHistory.value = searchHistory.value.slice(0, MAX_HISTORY)
  }
  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory.value))
  } catch (e) {
    console.error('Failed to save search history:', e)
  }
}

function removeFromHistory(query) {
  const index = searchHistory.value.indexOf(query)
  if (index > -1) {
    searchHistory.value.splice(index, 1)
    try {
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(searchHistory.value))
    } catch (e) {
      console.error('Failed to update search history:', e)
    }
  }
}

function clearHistory() {
  searchHistory.value = []
  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY)
  } catch (e) {
    console.error('Failed to clear search history:', e)
  }
}

// 搜索操作
function searchFor(query) {
  searchQuery.value = query
}

function clearSearch() {
  searchQuery.value = ''
}

function handleSearch() {
  // 搜索时触发的事件处理
}

// 高亮匹配文本
function highlightText(text) {
  if (!searchQuery.value || !text) return text
  const query = searchQuery.value.trim()
  if (!query) return text

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

// 显示详情
function showDetail(item) {
  selectedItem.value = item
  showDetailModal.value = true
}

// 关闭弹窗
function closeModal() {
  showDetailModal.value = false
}

// 初始化
onMounted(() => {
  loadHistory()
})
</script>

<style scoped>
.search-view {
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 24px;
}

/* 搜索区域 */
.search-section {
  margin-bottom: 48px;
}

.search-header {
  text-align: center;
  margin-bottom: 40px;
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

.page-title svg {
  color: var(--color-primary-500);
}

.page-subtitle {
  font-size: 15px;
  color: var(--color-text-secondary);
  margin: 0;
  font-weight: 400;
}

/* 搜索输入 */
.search-input-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
  padding: 0 16px;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-xs);
}

.search-input-container:focus-within {
  background: var(--color-bg-elevated);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08), var(--shadow-sm);
}

.search-icon {
  color: var(--color-text-secondary);
  flex-shrink: 0;
}

.search-input {
  flex: 1;
  padding: 16px 12px;
  font-size: 16px;
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  outline: none;
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.clear-btn {
  padding: 6px;
  background: transparent;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: var(--color-bg-tertiary);
  color: var(--color-text-secondary);
}

/* 模式切换 */
.mode-tabs {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 16px;
  padding: 4px;
  background: var(--color-bg-tertiary);
  border-radius: 10px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid var(--color-border-default);
}

.mode-tab {
  padding: 8px 16px;
  font-size: 13px;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.mode-tab:hover {
  color: var(--color-text-primary);
}

.mode-tab.is-active {
  color: var(--color-text-primary);
  background: var(--color-bg-elevated);
  box-shadow: var(--shadow-xs);
}

/* 空状态 */
.empty-state {
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 20px 0;
}

.section-header-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.section-icon {
  color: var(--color-primary-500);
  flex-shrink: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.clear-history {
  margin-left: auto;
  padding: 4px 10px;
  font-size: 12px;
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.clear-history:hover {
  color: var(--color-text-primary);
  background: var(--color-bg-tertiary);
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.search-tag {
  padding: 8px 14px;
  font-size: 13px;
  color: var(--color-text-secondary);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.search-tag:hover {
  background: rgba(99, 102, 241, 0.06);
  border-color: rgba(99, 102, 241, 0.2);
  color: var(--color-primary-500);
  transform: translateY(-1px);
  box-shadow: var(--shadow-xs);
}

.search-tag.has-close {
  position: relative;
  padding-right: 28px;
}

.close-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  line-height: 1;
  color: var(--color-text-tertiary);
  transition: color 0.15s ease;
}

.search-tag:hover .close-icon {
  color: var(--color-primary-500);
}

.search-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  background: rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.1);
  border-radius: 10px;
  font-size: 13px;
  color: var(--color-text-secondary);
}

.search-tips svg {
  color: var(--color-primary-500);
  flex-shrink: 0;
}

/* 搜索结果 */
.results-section {
  max-width: 900px;
  margin: 0 auto;
}

.results-header {
  padding: 12px 16px;
  background: rgba(16, 185, 129, 0.08);
  border: 1px solid rgba(16, 185, 129, 0.15);
  border-radius: 10px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.results-count {
  font-size: 14px;
  color: #059669;
}

.results-count strong {
  font-weight: 600;
}

/* 无结果 */
.no-results {
  text-align: center;
  padding: 80px 40px;
}

.no-results-icon {
  font-size: 48px;
  opacity: 0.5;
  margin-bottom: 16px;
}

.no-results-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin: 0 0 8px 0;
}

.no-results-desc {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0 0 24px 0;
}

.suggestions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex-wrap: wrap;
}

.suggestions-label {
  font-size: 13px;
  color: var(--color-text-secondary);
}

.suggestion-tag {
  padding: 6px 12px;
  font-size: 12px;
  color: var(--color-text-secondary);
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.suggestion-tag:hover {
  background: rgba(99, 102, 241, 0.06);
  border-color: rgba(99, 102, 241, 0.2);
  color: var(--color-primary-500);
}

/* 结果列表 */
.results-list {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.result-category {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.category-header-inline {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.category-emoji {
  font-size: 18px;
}

.category-name {
  font-size: 15px;
  font-weight: 500;
  color: var(--color-text-primary);
}

.category-count {
  margin-left: auto;
  font-size: 12px;
  color: var(--color-text-secondary);
  background: var(--color-bg-tertiary);
  padding: 2px 8px;
  border-radius: 12px;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 10px;
}

.result-card {
  padding: 16px;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: var(--shadow-xs);
}

.result-card:hover {
  background: var(--color-bg-secondary);
  border-color: rgba(99, 102, 241, 0.2);
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}

.result-command {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--color-primary-500);
  font-family: var(--font-mono);
  background: rgba(99, 102, 241, 0.1);
  padding: 4px 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}

.result-desc {
  font-size: 13px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0 0 10px 0;
}

.result-example {
  margin-top: 10px;
  padding: 10px;
  background: var(--color-bg-secondary);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--color-border-subtle);
}

.result-example code {
  display: block;
  font-size: 11px;
  color: var(--color-text-secondary);
  font-family: var(--font-mono);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 高亮 */
:deep(mark) {
  background: rgba(99, 102, 241, 0.2);
  color: var(--color-primary-600);
  padding: 0 2px;
  border-radius: 2px;
}

/* 弹窗样式（复用） */
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

/* 响应式 */
@media (max-width: 768px) {
  .page-container {
    padding: 40px 16px;
  }

  .page-title {
    font-size: 24px;
  }

  .result-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    max-width: calc(100vw - 32px);
  }
}
</style>
