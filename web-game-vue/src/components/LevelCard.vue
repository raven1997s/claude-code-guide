<template>
  <n-card
    hoverable
    class="level-card"
    :class="{ completed, locked }"
    @click="handleClick"
  >
    <div class="level-card-content">
      <div class="level-icon">
        <i :class="['fas', level.icon]"></i>
      </div>
      <div class="level-info">
        <n-text strong>{{ level.name }}</n-text>
        <n-text depth="3" style="font-size: 12px">
          关卡 {{ level.id }}
        </n-text>
      </div>
      <div class="level-status">
        <n-tag v-if="completed" type="success" size="small">
          <template #icon>
            <n-icon :component="CheckIcon" />
          </template>
          完成
        </n-tag>
        <n-tag v-else type="default" size="small">
          <template #icon>
            <n-icon :component="LockIcon" />
          </template>
          未完成
        </n-tag>
      </div>
    </div>
  </n-card>
</template>

<script setup>
import { computed } from 'vue'
import { NCard, NIcon, NText, NTag } from 'naive-ui'
import { Check as CheckIcon, Lock as LockIcon } from '@vicons/fa'

const props = defineProps({
  level: {
    type: Object,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const locked = computed(() => !props.completed)

function handleClick() {
  emit('select', props.level)
}
</script>

<style scoped>
@import '@/styles/cyber-terminal.css';

.level-card {
  cursor: pointer;
  transition: all 0.3s ease;
}

.level-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 245, 255, 0.2);
}

.level-card.completed {
  border-color: var(--cyber-green);
}

.level-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
}

.level-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--cyber-cyan) 0%, var(--cyber-pink) 100%);
}

.level-icon i {
  font-size: 24px;
  color: white;
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.level-status {
  margin-top: 4px;
}
</style>
