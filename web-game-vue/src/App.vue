<template>
  <n-config-provider :theme="darkTheme">
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
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { NConfigProvider, darkTheme, NLayout, NLayoutHeader, NLayoutContent, NLayoutFooter, NSpace, NButton, NIcon, NDialogProvider, NMessageProvider } from 'naive-ui'
import { Home as HomeIcon, Gamepad as GameIcon, Book as BookIcon, Clone as CloneIcon, Code as CodeIcon, Terminal as TerminalIcon } from '@vicons/fa'

const router = useRouter()
const route = useRoute()

const activeKey = computed(() => route.path)

const menuItems = [
  { label: '首页', key: '/', icon: HomeIcon },
  { label: '互动游戏', key: '/game', icon: GameIcon },
  { label: '命令参考', key: '/reference', icon: BookIcon },
  { label: '速查表', key: '/cheatsheet', icon: CloneIcon },
  { label: '斜杠命令', key: '/commands', icon: CodeIcon }
]
</script>

<style scoped>
/* 全局背景 */
:deep(.n-layout) {
  background: linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #16213e 100%);
  min-height: 100vh;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 15, 26, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.2);
  box-shadow: 0 4px 30px rgba(102, 126, 234, 0.1);
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
  color: #fff;
  transition: all 0.3s ease;
  user-select: none;
}

.logo:hover {
  transform: translateX(4px);
}

.logo :deep(.n-icon) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 导航按钮样式优化 */
:deep(.n-button) {
  transition: all 0.3s ease;
}

:deep(.n-button--primary-type) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

:deep(.n-button--primary-type:hover) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

:deep(.n-button--ghost-type) {
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  color: #a1a1aa !important;
}

:deep(.n-button--ghost-type:hover) {
  background: rgba(102, 126, 234, 0.15) !important;
  border-color: rgba(102, 126, 234, 0.4) !important;
  color: #fff !important;
}

/* 内容区域 */
:deep(.n-layout-content) {
  padding: 0;
}

.footer {
  text-align: center;
  padding: 24px;
  background: rgba(15, 15, 26, 0.8);
  border-top: 1px solid rgba(102, 126, 234, 0.15);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 32px;
  color: #71717a;
  font-size: 14px;
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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
