# REQ-1.1: 搜索历史记录 (Search History)

> **需求ID**: REQ-1.1
> **状态**: 🟢 已定义
> **优先级**: Must Have
> **创建时间**: 2026-01-01
> **产品负责人**: PM

---

## 📋 需求概述

**用户故事**:
> 作为一名经常查询命令的开发者，当我需要再次查找之前搜索过的内容时，我希望看到搜索历史记录，这样我就能快速重复之前的查询，而不需要重新输入关键词。

**业务价值**:
- 提升搜索效率，减少重复输入成本
- 符合开发者的真实工作习惯 (参考浏览器历史、Shell 历史)
- 为后续的"个性化推荐"功能提供数据基础

---

## 🎯 功能规格

### 1. 搜索历史存储

#### 存储策略
```javascript
// LocalStorage 数据结构
const SEARCH_HISTORY_KEY = 'claude_search_history_v1'

{
  queries: [
    {
      text: 'claude --help',
      timestamp: 1735689600000, // ISO 8601
      mode: 'auto',             // 搜索模式: auto/command/chinese
      resultCount: 5            // 搜索结果数量
    },
    {
      text: '会话命令',
      timestamp: 1735689660000,
      mode: 'chinese',
      resultCount: 8
    }
  ],
  lastUpdated: '2026-01-01T00:00:00Z',
  version: 1
}
```

#### 存储规则
- **容量限制**: 最多保存最近 10 条查询
- **去重逻辑**: 相同查询文本 + 相同模式 = 视为重复，更新时间戳
- **过期时间**: 7 天未使用自动清理
- **隐私保护**: 不记录用户 IP、设备指纹等敏感信息

---

### 2. UI/UX 设计

#### 搜索框下拉历史
```vue
<template>
  <div class="search-container">
    <!-- 搜索输入框 -->
    <n-auto-complete
      v-model:value="searchQuery"
      :options="historyOptions"
      placeholder="搜索命令或中文描述... (支持模糊搜索)"
      @select="handleSelectHistory"
      @blur="saveToHistory"
    >
      <template #prefix>
        <n-icon :component="SearchIcon" />
      </template>
      <template #default="{ option }">
        <div class="history-item">
          <n-space align="center" justify="space-between">
            <n-text>{{ option.label }}</n-text>
            <n-text depth="3" style="font-size: 12px;">
              {{ getTimeAgo(option.timestamp) }}
            </n-text>
          </n-space>
          <n-tag size="tiny" :type="getModeTagType(option.mode)">
            {{ getModeLabel(option.mode) }}
          </n-tag>
        </div>
      </template>
    </n-auto-complete>

    <!-- 清除历史按钮 -->
    <n-button
      v-if="searchHistory.length > 0"
      text
      size="small"
      class="clear-history-btn"
      @click="clearHistory"
    >
      <template #icon>
        <n-icon :component="TrashIcon" />
      </template>
      清除历史
    </n-button>
  </div>
</template>
```

#### 历史记录展示位置
| 位置 | 触发条件 | 显示内容 |
|------|----------|----------|
| **下拉列表** | 点击搜索框 | 最近 10 条历史记录 |
| **侧边栏** (可选) | 输入 "?" 或 "history" | 完整历史记录 + 统计 |

---

### 3. 交互逻辑

#### 添加历史记录
```javascript
// SearchBox.vue
function saveToHistory() {
  if (!searchQuery.value.trim()) return

  const newRecord = {
    text: searchQuery.value.trim(),
    timestamp: Date.now(),
    mode: searchMode.value,
    resultCount: searchResults.value.length
  }

  // 检查是否重复
  const existingIndex = searchHistory.value.findIndex(
    item => item.text === newRecord.text && item.mode === newRecord.mode
  )

  if (existingIndex >= 0) {
    // 更新时间戳，移到最前
    searchHistory.value.splice(existingIndex, 1)
  }

  // 添加到最前
  searchHistory.value.unshift(newRecord)

  // 限制容量
  if (searchHistory.value.length > 10) {
    searchHistory.value = searchHistory.value.slice(0, 10)
  }

  // 持久化
  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify({
    queries: searchHistory.value,
    lastUpdated: new Date().toISOString(),
    version: 1
  }))
}
```

#### 删除历史记录
- **单条删除**: 鼠标悬停历史项，显示 "×" 按钮
- **全部清除**: 点击 "清除历史" 按钮，显示确认弹窗

#### 时间格式化
```javascript
function getTimeAgo(timestamp) {
  const now = Date.now()
  const diff = now - timestamp

  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes} 分钟前`
  if (hours < 24) return `${hours} 小时前`
  if (days < 7) return `${days} 天前`
  return formatDate(timestamp) // 超过 7 天显示日期
}
```

---

### 4. 隐私与安全

#### 数据最小化
- ✅ 记录: 查询文本、时间戳、搜索模式
- ❌ 不记录: 用户 IP、设备 ID、地理位置

#### 用户控制
- 用户可随时清除历史记录
- 提供隐私模式开关 (不记录历史)
- 导出/导入功能 (便于跨设备同步)

#### 合规性
- 符合 GDPR 数据最小化原则
- 明确告知用户数据存储位置 (LocalStorage)

---

## ✅ 验收标准 (Acceptance Criteria)

### AC1: 基本存储功能
- **Given** 用户在搜索框输入 "claude --help" 并执行搜索
- **When** 搜索完成
- **Then** 应该将该查询添加到历史记录
- **And** 历史记录保存在 LocalStorage 中
- **And** 记录包含: 文本、时间戳、搜索模式

### AC2: 去重功能
- **Given** 用户之前已搜索过 "help" (auto 模式)
- **When** 用户再次搜索 "help" (auto 模式)
- **Then** 应该更新该记录的时间戳
- **And** 将该记录移到历史记录最前面
- **And** 历史记录总数不增加

### AC3: 容量限制
- **Given** 用户已有 10 条历史记录
- **When** 用户执行第 11 次搜索
- **Then** 应该删除最早的记录
- **And** 保持最多 10 条记录

### AC4: 自动清除过期记录
- **Given** 历史记录中有 7 天前的记录
- **When** 用户打开搜索页面
- **Then** 应该自动删除超过 7 天的记录
- **And** 显示剩余的有效记录

### AC5: 点击历史项快速搜索
- **Given** 搜索框有历史记录
- **When** 用户点击某条历史记录
- **Then** 应该自动填充该查询文本
- **And** 立即执行搜索
- **And** 使用该记录的搜索模式

### AC6: 清除历史功能
- **Given** 用户有搜索历史记录
- **When** 用户点击 "清除历史" 按钮并确认
- **Then** 应该清空所有历史记录
- **And** 更新 LocalStorage
- **And** 显示成功提示

---

## 🎨 UI/UX 要求

### Empty State (无历史时)
- 不显示 "清除历史" 按钮
- 点击搜索框时，显示 "暂无搜索历史" 提示

### Loading State (加载历史时)
- 显示骨架屏 `n-skeleton`
- 延迟 ≤ 50ms (LocalStorage 读取很快)

### Error State (LocalStorage 不可用时)
- 显示降级提示: "历史记录功能不可用"
- 搜索功能正常工作

### Hover State (鼠标悬停历史项)
- 显示 "×" 删除按钮
- 高亮背景色

---

## 🔧 技术约束

### 必须使用
- Vue 3 Composition API
- Naive UI `n-auto-complete` 组件
- LocalStorage API

### 性能要求
- 历史记录加载延迟 ≤ 50ms
- 不影响搜索输入性能 (防抖 300ms)

### 兼容性
- 支持 Chrome, Firefox, Safari, Edge
- 移动端响应式 (历史记录列表适配触摸)

---

## 📊 数据模型

### LocalStorage Schema
```typescript
interface SearchHistoryRecord {
  text: string           // 查询文本
  timestamp: number      // Unix 时间戳 (毫秒)
  mode: 'auto' | 'command' | 'chinese'  // 搜索模式
  resultCount: number    // 搜索结果数量
}

interface SearchHistoryData {
  queries: SearchHistoryRecord[]
  lastUpdated: string    // ISO 8601 格式
  version: number        // 数据版本号
}
```

### 配置参数
```javascript
const SEARCH_HISTORY_CONFIG = {
  MAX_RECORDS: 10,        // 最大记录数
  EXPIRY_DAYS: 7,         // 过期天数
  DEBOUNCE_MS: 300,       // 防抖延迟
  STORAGE_KEY: 'claude_search_history_v1'
}
```

---

## 📈 成功指标

| 指标 | 基准值 | 目标值 | 测量方式 |
|------|--------|--------|----------|
| **历史记录使用率** | N/A | ≥ 40% | 点击历史项的搜索占比 |
| **重复查询率** | ~30% | - | 历史记录中重复查询占比 |
| **搜索效率提升** | - | +25% | 平均搜索时长减少 |

---

## 🚧 依赖项

### 前置需求
- 无 (独立功能)

### 需要协调
- **@前端开发**: 确认 `n-auto-complete` 组件是否支持自定义模板
- **@功能测试**: 测试 LocalStorage 容量限制 (通常 5MB)

---

## 🔄 迭代计划

### Phase 1: MVP (本次迭代)
- [ ] 实现基本历史记录存储
- [ ] 实现 10 条记录限制
- [ ] 实现下拉历史列表

### Phase 2: 优化
- [ ] 添加去重逻辑
- [ ] 实现过期自动清理
- [ ] 添加隐私模式开关

### Phase 3: 高级功能
- [ ] 跨设备同步 (使用 Gist 或云存储)
- [ ] 智能推荐 (基于历史频率)
- [ ] 搜索统计分析

---

## 📚 参考资料

### 竞品分析
- **Google 搜索**: 显示最近 3 条搜索历史，悬停显示 "×" 删除
- **GitHub**: 搜索历史保存在侧边栏，支持删除单条
- **VS Code**: 命令面板历史 (Cmd+Shift+P)，上下键切换

### 最佳实践
- **即时保存**: 每次搜索后立即保存，防止数据丢失
- **去重优化**: 相同查询更新时间戳，避免列表污染
- **隐私优先**: 提供隐私模式，不记录敏感查询

---

**最后更新**: 2026-01-01
**产品负责人**: PM
**下一步**: @前端开发 请评估技术可行性，确认 `n-auto-complete` 组件是否满足需求