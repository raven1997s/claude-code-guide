<template>
  <n-config-provider>
    <n-dialog-provider>
      <n-message-provider>
        <n-layout>
          <!-- 导航栏 -->
          <n-layout-header bordered class="header">
            <div class="header-content">
              <div class="logo" @click="router.push('/')">
                <n-icon size="28" :component="TerminalIcon" />
                <span>Claude Code 学习中心</span>
              </div>
              <n-space :size="8">
                <n-button
                  v-for="item in menuItems"
                  :key="item.key"
                  :type="activeKey === item.key ? 'primary' : 'default'"
                  :ghost="activeKey !== item.key"
                  size="medium"
                  @click="router.push(item.key)"
                >
                  <template #icon>
                    <n-icon :component="item.icon" />
                  </template>
                  {{ item.label }}
                </n-button>
              </n-space>
            </div>
          </n-layout-header>

          <!-- 主内容区 -->
          <n-layout-content>
            <router-view />
          </n-layout-content>

          <!-- 页脚 -->
          <n-layout-footer bordered class="footer">
            <div class="footer-content">
              <span>Claude Code 学习中心 v2.0</span>
              <span>用 Vue 3 构建</span>
            </div>
          </n-layout-footer>
        </n-layout>
      </n-message-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { NConfigProvider, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NSpace, NButton, NIcon, NDialogProvider, NMessageProvider } from 'naive-ui'
import { Home as HomeIcon, Gamepad as GameIcon, Clone as CloneIcon, Search as SearchIcon, Terminal as TerminalIcon } from '@vicons/fa'

const router = useRouter()
const route = useRoute()

const activeKey = () => route.path

const menuItems = [
  { label: '首页', key: '/', icon: HomeIcon },
  { label: '互动游戏', key: '/game', icon: GameIcon },
  { label: '命令搜索', key: '/search', icon: SearchIcon },
  { label: '速查表', key: '/cheatsheet', icon: CloneIcon }
]
</script>

<style scoped>
/* 全局背景 */
:deep(.n-layout) {
  background: linear-gradient(135deg, #f8f9fc 0%, #f0f2f5 100%);
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 70px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 22px;
  font-weight: 700;
  cursor: pointer;
  color: #1a1a2e;
  transition: all 0.3s ease;
  user-select: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.logo:hover {
  transform: translateX(4px);
}

.logo :deep(.n-icon) {
  color: #6366f1;
}

/* 导航按钮样式优化 */
:deep(.n-button) {
  transition: all 0.3s ease;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
  font-weight: 500;
  letter-spacing: 0.05em;
}

:deep(.n-button--primary-type) {
  background: #6366f1 !important;
  border: 1px solid #6366f1 !important;
  color: #ffffff !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.25);
}

:deep(.n-button--primary-type:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.35);
}

:deep(.n-button--ghost-type) {
  background: rgba(99, 102, 241, 0.05) !important;
  border: 1px solid rgba(0, 0, 0, 0.06) !important;
  color: #6b7280 !important;
}

:deep(.n-button--ghost-type:hover) {
  background: rgba(99, 102, 241, 0.1) !important;
  border-color: #6366f1 !important;
  color: #6366f1 !important;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.15);
}

/* 内容区域 */
:deep(.n-layout-content) {
  padding: 0;
}

.footer {
  text-align: center;
  padding: 24px;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 32px;
  color: #6b7280;
  font-size: 14px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', monospace;
}

.footer-content span {
  position: relative;
}

.footer-content span:not(:last-child)::after {
  content: '';
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #6366f1;
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}
</style>
