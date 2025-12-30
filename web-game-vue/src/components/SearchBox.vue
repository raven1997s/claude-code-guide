<template>
  <div class="search-container">
    <n-input
      v-model:value="searchQuery"
      type="text"
      placeholder="搜索命令或中文描述..."
      clearable
      size="large"
      :input-props="{ autocomplete: 'off' }"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
    </n-input>

    <n-radio-group v-model:value="searchMode" class="mode-toggle">
      <n-radio-button value="auto">自动</n-radio-button>
      <n-radio-button value="command">命令</n-radio-button>
      <n-radio-button value="chinese">中文</n-radio-button>
      <n-radio-button value="both">全部</n-radio-button>
    </n-radio-group>

    <div v-if="searchQuery && searchResults.length > 0" class="search-summary">
      <n-text>找到 <n-text type="info" strong>{{ searchResults.length }}</n-text> 个结果</n-text>
    </div>

    <div v-if="searchQuery && searchResults.length === 0" class="search-empty">
      <n-empty description="没有找到匹配的结果">
        <template #icon>
          <n-icon size="48" :component="SearchIcon" />
        </template>
      </n-empty>
    </div>

    <div v-if="searchQuery && searchResults.length > 0" class="search-results">
      <n-collapse v-for="(items, category) in groupedResults" :key="category" :default-expanded-names="category">
        <n-collapse-item :title="category" :name="category">
          <n-list hoverable clickable>
            <n-list-item v-for="item in items" :key="item.command">
              <div class="search-item">
                <div class="search-item-main">
                  <n-space align="center">
                    <code class="command-code">{{ item.command }}</code>
                    <n-tag v-if="item.short" size="small" type="default">{{ item.short }}</n-tag>
                  </n-space>
                  <n-text depth="3">{{ item.desc }}</n-text>
                </div>
                <n-text depth="2" class="search-item-full">{{ item.fullDesc }}</n-text>
                <n-tag v-if="item.category" size="tiny" type="info">{{ item.category }}</n-tag>
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
import { NInput, NIcon, NRadioButton, NRadioGroup, NText, NEmpty, NCollapse, NCollapseItem, NList, NListItem, NSpace, NTag } from 'naive-ui'
import { Search as SearchIcon } from '@vicons/fa'
import Fuse from 'fuse.js'
import { ALL_SEARCH_ITEMS } from '@/data/search-data'

const props = defineProps({
  // 允许传入自定义数据集
  dataSource: {
    type: Array,
    default: () => ALL_SEARCH_ITEMS
  }
})

const searchQuery = ref('')
const searchMode = ref('auto')

// 搜索结果
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []

  const query = searchQuery.value.trim()

  // 根据模式决定搜索字段
  let keys = ['command', 'short', 'desc', 'fullDesc']
  if (searchMode.value === 'command') {
    keys = ['command', 'short']
  } else if (searchMode.value === 'chinese') {
    keys = ['desc', 'fullDesc']
  }
  // 'auto' 和 'both' 使用所有字段

  // 重新创建 Fuse 实例以使用不同的 keys
  const modeFuse = new Fuse(props.dataSource, {
    keys,
    threshold: searchMode.value === 'auto' ? 0.3 : 0.4,
    distance: 100,
    minMatchCharLength: 1,
    ignoreLocation: true
  })

  const results = modeFuse.search(query)
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
}

.search-empty {
  margin-top: 32px;
}

.search-results {
  margin-top: 24px;
}

.search-item {
  padding: 8px 0;
}

.search-item-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.search-item-full {
  display: block;
  margin-top: 8px;
  font-size: 13px;
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
