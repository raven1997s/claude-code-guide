<template>
  <n-config-provider :theme="isDark ? darkTheme : null">
    <n-dialog-provider>
      <n-message-provider>
        <!-- 跳过链接 - 可访问性增强 -->
        <a href="#main-content" class="skip-link">跳到主内容</a>

        <n-layout class="app-layout">
          <!-- 导航栏 (Glassmorphism) -->
          <n-layout-header bordered class="header">
            <div class="header-content">
              <!-- Logo -->
              <div class="logo" @click="router.push('/')">
                <div class="logo-icon animate-pulse">
                  <n-icon size="24" :component="TerminalIcon" />
                </div>
                <span class="logo-text">
                  Claude <span class="logo-accent">Code</span>
                </span>
              </div>

              <!-- 桌面端导航 -->
              <div class="nav-desktop">
                <n-space :size="4">
                  <n-button
                    v-for="item in menuItems"
                    :key="item.key"
                    quaternary
                    :type="activeKey === item.key ? 'primary' : 'default'"
                    size="medium"
                    class="nav-item"
                    :class="{ 'nav-item-active': activeKey === item.key }"
                    @click="router.push(item.key)"
                  >
                    <template #icon>
                      <n-icon :component="item.icon" />
                    </template>
                    {{ item.label }}
                  </n-button>
                  
                  <div class="divider"></div>

                  <!-- 主题切换按钮 -->
                  <n-button
                    circle
                    quaternary
                    size="medium"
                    :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
                    @click="toggleTheme"
                    class="theme-toggle"
                  >
                    <template #icon>
                      <div class="theme-icon-wrapper">
                        <n-icon :component="isDark ? SunIcon : MoonIcon" />
                      </div>
                    </template>
                  </n-button>
                </n-space>
              </div>

              <!-- 移动端汉堡菜单 -->
              <div class="nav-mobile">
                <n-button circle quaternary size="medium" :aria-label="isDark ? '切换到浅色主题' : '切换到深色主题'"
                  @click="toggleTheme">
                  <template #icon>
                    <n-icon :component="isDark ? SunIcon : MoonIcon" />
                  </template>
                </n-button>
                <n-button circle quaternary size="medium" aria-label="菜单" @click="showMobileMenu = true">
                  <template #icon>
                    <n-icon :component="BarsIcon" />
                  </template>
                </n-button>
              </div>
            </div>
          </n-layout-header>

          <!-- 移动端菜单抽屉 -->
          <n-drawer v-model:show="showMobileMenu" placement="right" :width="280">
            <n-drawer-content title="导航菜单" closable>
              <n-space vertical :size="8">
                <n-button v-for="item in menuItems" :key="item.key"
                  :type="activeKey === item.key ? 'primary' : 'default'" block size="large"
                  @click="handleMobileNav(item.key)">
                  <template #icon>
                    <n-icon :component="item.icon" />
                  </template>
                  {{ item.label }}
                </n-button>
              </n-space>
            </n-drawer-content>
          </n-drawer>

          <!-- 主内容区 -->
          <n-layout-content id="main-content" class="main-content">
            <router-view v-slot="{ Component }">
              <transition name="page" mode="out-in">
                <component :is="Component" />
              </transition>
            </router-view>
          </n-layout-content>

          <!-- 页脚 -->
          <n-layout-footer bordered class="footer glass-card">
            <div class="footer-content">
              <span>Claude Code 学习中心 v2.2</span>
              <span>Made with Vue 3 & Naive UI</span>
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
  { label: '互动闯关', key: '/game', icon: GameIcon },
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
  /* 移除线性渐变，让背景透出 */
  background: transparent;
}

/* 导航栏 (Glassmorphism) */
.header {
  position: sticky;
  top: 0;
  z-index: var(--z-sticky);
  background: var(--glass-bg); /* 使用毛玻璃变量 */
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: var(--shadow-sm);
  transition: all 0.3s ease;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-8);
  height: 64px;
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
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-lg);
  transition: all 0.3s ease;
}

.logo:hover {
  background: rgba(99, 102, 241, 0.05);
}

.logo-icon {
  color: var(--color-primary-500);
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.4));
}

.logo-text {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  letter-spacing: -0.02em;
}

.logo-accent {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* 桌面端导航 */
.nav-desktop {
  display: flex;
  align-items: center;
}

.nav-item {
  font-weight: var(--font-weight-medium);
  transition: all 0.3s ease;
}

.nav-item-active {
  background: rgba(99, 102, 241, 0.1) !important;
  color: var(--color-primary-600) !important;
}

.nav-item:hover {
  color: var(--color-primary-500);
}

.divider {
  width: 1px;
  height: 20px;
  background: var(--color-border-default);
  margin: 0 var(--spacing-2);
}

/* 主题切换按钮 */
.theme-toggle .theme-icon-wrapper {
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.theme-toggle:hover .theme-icon-wrapper {
  transform: rotate(180deg);
}

/* 主内容区 */
.main-content {
  background: transparent; /* 重要：让背景透出 */
}

:deep(.n-layout-content) {
  background: transparent;
}

/* 移动端导航 */
.nav-mobile {
  display: none;
  align-items: center;
  gap: var(--spacing-2);
}

/* 页脚 */
.footer {
  text-align: center;
  padding: var(--spacing-8);
  background: var(--glass-bg); /* 毛玻璃 */
  backdrop-filter: var(--glass-blur);
  border-top: 1px solid var(--glass-border);
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
  opacity: 0.8;
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
  opacity: 0.5;
}

/* 响应式 */
@media (max-width: 768px) {
  .header-content {
    padding: 0 var(--spacing-4);
    height: 60px;
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
</style>
