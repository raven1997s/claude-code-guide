<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-dialog-provider>
      <n-message-provider>
        <n-layout class="app-layout">
          <!-- 导航栏 -->
          <n-layout-header bordered class="header">
            <div class="header-content">
              <!-- Logo -->
              <div class="logo" @click="router.push('/')">
                <n-icon size="28" :component="TerminalIcon" />
                <span class="logo-text">Claude Code 学习中心</span>
              </div>

              <!-- 桌面端导航 -->
              <div class="nav-desktop">
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

                  <!-- 主题切换按钮 -->
                  <n-button
                    circle
                    quaternary
                    size="medium"
                    :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
                    @click="toggleTheme"
                  >
                    <template #icon>
                      <n-icon :component="isDark ? SunIcon : MoonIcon" />
                    </template>
                  </n-button>
                </n-space>
              </div>

              <!-- 移动端汉堡菜单 -->
              <div class="nav-mobile">
                <n-button
                  circle
                  quaternary
                  size="medium"
                  :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
                  @click="toggleTheme"
                >
                  <template #icon>
                    <n-icon :component="isDark ? SunIcon : MoonIcon" />
                  </template>
                </n-button>
                <n-button
                  circle
                  quaternary
                  size="medium"
                  aria-label="菜单"
                  @click="showMobileMenu = true"
                >
                  <template #icon>
                    <n-icon :component="BarsIcon" />
                  </template>
                </n-button>
              </div>
            </div>
          </n-layout-header>

          <!-- 移动端菜单抽屉 -->
          <n-drawer
            v-model:show="showMobileMenu"
            placement="right"
            :width="280"
          >
            <n-drawer-content title="导航菜单" closable>
              <n-space vertical :size="8">
                <n-button
                  v-for="item in menuItems"
                  :key="item.key"
                  :type="activeKey === item.key ? 'primary' : 'default'"
                  block
                  size="large"
                  @click="handleMobileNav(item.key)"
                >
                  <template #icon>
                    <n-icon :component="item.icon" />
                  </template>
                  {{ item.label }}
                </n-button>
              </n-space>
            </n-drawer-content>
          </n-drawer>

          <!-- 主内容区 -->
          <n-layout-content>
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
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
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  NConfigProvider,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NSpace,
  NButton,
  NIcon,
  NDialogProvider,
  NMessageProvider,
  NDrawer,
  NDrawerContent,
  darkTheme
} from 'naive-ui'
import {
  Home as HomeIcon,
  Gamepad as GameIcon,
  Clone as CloneIcon,
  Search as SearchIcon,
  Terminal as TerminalIcon,
  Sun as SunIcon,
  Moon as MoonIcon,
  Bars as BarsIcon
} from '@vicons/fa'
import { useTheme } from '@/composables/useTheme'

const router = useRouter()
const route = useRoute()

// 主题
const { isDark, toggleTheme, initTheme } = useTheme()

// 移动端菜单
const showMobileMenu = ref(false)

// 当前激活的路由
const activeKey = computed(() => route.path)

// 菜单项
const menuItems = [
  { label: '首页', key: '/', icon: HomeIcon },
  { label: '互动游戏', key: '/game', icon: GameIcon },
  { label: '命令搜索', key: '/search', icon: SearchIcon },
  { label: '速查表', key: '/cheatsheet', icon: CloneIcon }
]

/**
 * 处理移动端导航
 * @param {string} key - 路由路径
 */
function handleMobileNav(key) {
  router.push(key)
  showMobileMenu.value = false
}

// 初始化主题
onMounted(() => {
  initTheme()
})
</script>

<style scoped>
/* 应用布局 */
.app-layout {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-bg-secondary) 0%,
    var(--color-bg-tertiary) 100%
  );
}

/* 导航栏 */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--color-bg-base);
  opacity: 0.95;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-border-default);
  box-shadow: var(--shadow-xs);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-8);
  height: 70px;
  max-width: 1400px;
  margin: 0 auto;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  cursor: pointer;
  user-select: none;
  transition: transform var(--duration-base) var(--ease-out);
}

.logo:hover {
  transform: translateX(4px);
}

.logo :deep(.n-icon) {
  color: var(--color-primary-500);
}

.logo-text {
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
}

/* 桌面端导航 */
.nav-desktop {
  display: flex;
  align-items: center;
}

/* 移动端导航 - 默认隐藏 */
.nav-mobile {
  display: none;
  align-items: center;
  gap: var(--spacing-2);
}

/* 导航按钮样式 */
:deep(.n-button) {
  transition: all var(--duration-base) var(--ease-out);
  font-family: var(--font-mono);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
}

:deep(.n-button--primary-type) {
  background: var(--color-primary-500) !important;
  border: 1px solid var(--color-primary-500) !important;
  color: #ffffff !important;
  box-shadow: var(--shadow-primary);
}

:deep(.n-button--primary-type:hover) {
  background: var(--color-primary-600) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.35);
}

:deep(.n-button--ghost-type) {
  background: var(--color-primary-50) !important;
  border: 1px solid var(--color-border-subtle) !important;
  color: var(--color-text-secondary) !important;
}

:deep(.n-button--ghost-type:hover) {
  background: var(--color-primary-100) !important;
  border-color: var(--color-primary-300) !important;
  color: var(--color-primary-600) !important;
  box-shadow: var(--shadow-sm);
}

/* 主题切换按钮 */
:deep(.n-button--quaternary-type:hover) {
  background: var(--color-bg-tertiary) !important;
  transform: rotate(15deg);
}

/* 内容区域 */
:deep(.n-layout-content) {
  padding: 0;
}

/* 页脚 */
.footer {
  text-align: center;
  padding: var(--spacing-6);
  background: var(--color-bg-base);
  border-top: 1px solid var(--color-border-default);
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  gap: var(--spacing-8);
  color: var(--color-text-secondary);
  font-size: var(--text-sm);
  font-family: var(--font-mono);
}

.footer-content span {
  position: relative;
}

.footer-content span:not(:last-child)::after {
  content: '';
  position: absolute;
  right: calc(-1 * var(--spacing-4) - 2px);
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
  background: var(--color-primary-500);
  box-shadow: 0 0 8px rgba(99, 102, 241, 0.4);
}

/* ========================================
   响应式断点
   ======================================== */

/* 移动端 ≤768px */
@media (max-width: 768px) {
  .header-content {
    padding: 0 var(--spacing-4);
    height: 60px;
  }

  .logo-text {
    font-size: var(--text-lg);
  }

  .nav-desktop {
    display: none;
  }

  .nav-mobile {
    display: flex;
  }

  .footer-content {
    flex-direction: column;
    gap: var(--spacing-2);
  }

  .footer-content span:not(:last-child)::after {
    display: none;
  }
}

/* 小屏幕手机 ≤480px */
@media (max-width: 480px) {
  .logo-text {
    font-size: var(--text-base);
  }

  .logo :deep(.n-icon) {
    font-size: 22px !important;
  }
}
</style>
