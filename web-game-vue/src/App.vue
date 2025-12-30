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
import { computed, h } from 'vue'
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
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(24, 24, 38, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  height: 64px;
  max-width: 1400px;
  margin: 0 auto;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  color: #22d3ee;
  transition: transform 0.2s, opacity 0.2s;
  user-select: none;
}

.logo:hover {
  transform: scale(1.02);
  opacity: 0.9;
}

.footer {
  text-align: center;
  padding: 20px;
  background: rgba(24, 24, 38, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: 24px;
  color: #71717a;
  font-size: 14px;
}
</style>
