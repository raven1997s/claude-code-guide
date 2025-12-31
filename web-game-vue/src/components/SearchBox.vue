<template>
  <div class="search-container">
    <n-input
      v-model:value="searchQuery"
      type="text"
      placeholder="搜索命令或中文描述... (支持模糊搜索)"
      clearable
      size="large"
      :input-props="{ autocomplete: 'off' }"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>

    <n-radio-group v-model:value="searchMode" class="mode-toggle">
      <n-radio-button value="auto">智能</n-radio-button>
      <n-radio-button value="command">命令</n-radio-button>
      <n-radio-button value="chinese">中文</n-radio-button>
    </n-radio-group>

    <div v-if="searchQuery && searchResults.length > 0" class="search-summary">
      <n-text>找到 <n-text type="success" strong>{{ searchResults.length }}</n-text> 个结果</n-text>
    </div>

    <div v-if="searchQuery && searchResults.length === 0" class="search-empty">
      <n-empty description="没有找到匹配的结果">
        <template #icon>
          <n-icon size="48" :component="SearchIcon" />
        </template>
        <template #extra>
          <n-text depth="3">尝试使用更简短的关键词搜索</n-text>
        </template>
      </n-empty>
    </div>

    <div v-if="searchQuery && searchResults.length > 0" class="search-results">
      <n-collapse v-for="(items, category) in groupedResults" :key="category" :default-expanded-names="Object.keys(groupedResults)[0]">
        <n-collapse-item :title="`${category} (${items.length})`" :name="category">
          <n-list hoverable clickable>
            <n-list-item v-for="item in items" :key="item.command">
              <div class="search-item">
                <div class="search-item-header">
                  <n-space align="center">
                    <code class="command-code">{{ item.command }}</code>
                    <n-tag v-if="item.short" size="small" type="default">{{ item.short }}</n-tag>
                    <n-tag v-if="item.category" size="tiny" type="info">{{ item.category }}</n-tag>
                  </n-space>
                </div>
                <n-text depth="3" class="search-item-desc">{{ item.desc }}</n-text>
                <n-text v-if="item.fullDesc" depth="2" class="search-item-full">{{ item.fullDesc }}</n-text>

                <!-- 使用示例 -->
                <div v-if="item.example" class="search-item-example">
                  <n-space align="center" justify="space-between">
                    <n-text depth="3" class="example-label">使用示例：</n-text>
                    <n-button size="tiny" @click="copyToClipboard(item.example)" :focusable="false">
                      <template #icon>
                        <n-icon :component="copiedStates[item.command] ? CheckIcon : CopyIcon" />
                      </template>
                      {{ copiedStates[item.command] ? '已复制' : '复制' }}
                    </n-button>
                  </n-space>
                  <code class="example-code">{{ item.example }}</code>
                </div>
              </div>
            </n-list-item>
          </n-list>
        </n-collapse-item>
      </n-collapse>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { NInput, NIcon, NRadioButton, NRadioGroup, NText, NEmpty, NCollapse, NCollapseItem, NList, NListItem, NSpace, NTag, NButton } from 'naive-ui'
import { Search as SearchIcon, Copy as CopyIcon, Check as CheckIcon } from '@vicons/fa'
import Fuse from 'fuse.js'
import { ALL_SEARCH_ITEMS } from '@/data/search-data'

const props = defineProps({
  dataSource: {
    type: Array,
    default: () => ALL_SEARCH_ITEMS
  }
})

const searchQuery = ref('')
const searchMode = ref('auto')
const copiedStates = ref({})

// 复制到剪贴板
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // 设置复制状态
    const command = text.split(' ')[0] // 获取命令部分作为key
    copiedStates.value[command] = true
    setTimeout(() => {
      copiedStates.value[command] = false
    }, 2000)
  }).catch(err => {
    console.error('复制失败:', err)
  })
}

// 搜索结果
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.trim().toLowerCase()

  // 根据模式决定搜索字段
  let keys = ['command', 'short', 'desc', 'fullDesc', 'keywords']
  if (searchMode.value === 'command') {
    keys = ['command', 'short', 'keywords']
  } else if (searchMode.value === 'chinese') {
    keys = ['desc', 'fullDesc', 'keywords']
  }
  // 'auto' 使用所有字段

  // 使用 Fuse.js 进行模糊搜索
  const fuse = new Fuse(props.dataSource, {
    keys,
    threshold: 0.4, // 降低阈值使搜索更宽松
    distance: 100,
    minMatchCharLength: 1,
    ignoreLocation: true,
    includeScore: true,
    useExtendedSearch: true
  })

  const results = fuse.search(query)
  return results.map(r => r.item)
})

// 按分类分组结果
const groupedResults = computed(() => {
  const groups = {}
  searchResults.value.forEach(item => {
    const category = item.category || '其他'
    if (!groups[category]) {
      groups[category] = []
    }
    groups[category].push(item)
  })
  return groups
})
</script>

<style scoped>
.search-container {
  max-width: 900px;
  margin: 0 auto 32px;
}

.mode-toggle {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.search-summary {
  margin-top: 16px;
  text-align: center;
  padding: 12px;
  background: rgba(34, 197, 94, 0.1);
  border-radius: 8px;
}

.search-empty {
  margin-top: 32px;
}

.search-results {
  margin-top: 24px;
}

.search-item {
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.search-item:last-child {
  border-bottom: none;
}

.search-item-header {
  margin-bottom: 8px;
}

.command-code {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  font-weight: 500;
}

.search-item-desc {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
  color: #d1d5db;
}

.search-item-full {
  display: block;
  font-size: 13px;
  color: #9ca3af;
  margin-top: 4px;
}

.search-item-example {
  margin-top: 12px;
  padding: 12px;
  background: rgba(102, 126, 234, 0.08);
  border-radius: 8px;
  border: 1px solid rgba(102, 126, 234, 0.2);
}

.example-label {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 500;
}

.example-code {
  display: block;
  margin-top: 8px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  color: #a5b4fc;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}

:deep(.n-button--tiny) {
  padding: 4px 10px;
  font-size: 12px;
  height: 24px;
}
</style>
