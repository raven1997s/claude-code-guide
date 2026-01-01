import { ref, readonly } from 'vue'

/**
 * 主题存储 Key
 * @constant {string}
 */
const THEME_STORAGE_KEY = 'claude_theme_preference'

/**
 * 主题类型枚举
 * @typedef {'light' | 'dark'} ThemeType
 */

/** 全局主题状态 (单例模式，避免重复初始化) */
const isDark = ref(false)
const isInitialized = ref(false)

/**
 * 应用主题到 DOM
 * @param {ThemeType} theme - 主题类型
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme)
}

/**
 * 主题管理 Composable
 *
 * @description 提供主题切换、持久化、系统偏好检测功能
 * @returns {Object} { isDark, toggleTheme, initTheme }
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTheme } from '@/composables/useTheme'
 *
 * const { isDark, toggleTheme, initTheme } = useTheme()
 *
 * onMounted(() => {
 *   initTheme()
 * })
 * </script>
 * ```
 */
export function useTheme() {
    /**
     * 初始化主题
     * 优先级: localStorage > 系统偏好 > 默认浅色
     */
    const initTheme = () => {
        if (isInitialized.value) return

        const saved = localStorage.getItem(THEME_STORAGE_KEY)

        if (saved) {
            isDark.value = saved === 'dark'
        } else {
            // 跟随系统偏好
            const prefersDark =
                window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: dark)').matches
            isDark.value = prefersDark
        }

        applyTheme(isDark.value ? 'dark' : 'light')
        isInitialized.value = true

        // 监听系统主题变化 (仅在未手动设置时生效)
        if (window.matchMedia) {
            window
                .matchMedia('(prefers-color-scheme: dark)')
                .addEventListener('change', (e) => {
                    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
                        isDark.value = e.matches
                        applyTheme(isDark.value ? 'dark' : 'light')
                    }
                })
        }
    }

    /**
     * 切换主题
     */
    const toggleTheme = () => {
        isDark.value = !isDark.value
        const theme = isDark.value ? 'dark' : 'light'
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        applyTheme(theme)
    }

    /**
     * 设置指定主题
     * @param {ThemeType} theme - 主题类型
     */
    const setTheme = (theme) => {
        isDark.value = theme === 'dark'
        localStorage.setItem(THEME_STORAGE_KEY, theme)
        applyTheme(theme)
    }

    return {
        /** 是否为深色主题 (只读) */
        isDark: readonly(isDark),
        /** 切换主题 */
        toggleTheme,
        /** 初始化主题 */
        initTheme,
        /** 设置指定主题 */
        setTheme
    }
}
