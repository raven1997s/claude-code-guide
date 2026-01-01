import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Naive UI
import naive from 'naive-ui'

// Design Tokens (CSS 变量系统)
import './styles/design-tokens.css'

// 全局动画系统
import './styles/animations.css'

// 可访问性样式
import './styles/accessibility.css'

const app = createApp(App)

app.use(router)
app.use(naive)
app.mount('#app')
