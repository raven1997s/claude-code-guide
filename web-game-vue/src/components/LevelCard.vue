<template>
  <n-card
    hoverable
    class="level-card"
    :class="{ 'is-completed': completed }"
    @click="handleClick"
  >
    <div class="level-card-content">
      <div class="level-icon" :class="{ 'is-completed': completed }">
        <n-icon v-if="completed" :component="CheckIcon" size="28" />
        <n-icon v-else :component="PlayIcon" size="24" />
      </div>
      <div class="level-info">
        <span class="level-name">{{ level.name }}</span>
        <span class="level-id">关卡 {{ level.id }}</span>
      </div>
      <div v-if="completed" class="level-badge animate-checkmark">✓</div>
    </div>
  </n-card>
</template>

<script setup>
import { NCard, NIcon } from 'naive-ui'
import { Check as CheckIcon, Play as PlayIcon } from '@vicons/fa'

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

function handleClick() {
  emit('select', props.level)
}
</script>

<style scoped>
.level-card {
  cursor: pointer;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-lg);
  transition: all var(--duration-base) var(--ease-out);
  position: relative;
  overflow: hidden;
}

.level-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(99, 102, 241, 0.25);
  border-color: var(--color-primary-400);
}

.level-card.is-completed {
  border-color: var(--color-success);
  background: linear-gradient(
    135deg,
    var(--color-bg-elevated) 0%,
    rgba(16, 185, 129, 0.05) 100%
  );
}

.level-card.is-completed:hover {
  box-shadow: 0 12px 32px rgba(16, 185, 129, 0.2);
}

.level-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--spacing-3);
  text-align: center;
  padding: var(--spacing-2);
  position: relative;
}

.level-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: linear-gradient(
    135deg,
    var(--color-primary-500) 0%,
    var(--color-primary-600) 100%
  );
  color: #ffffff;
  transition: all var(--duration-base) var(--ease-out);
}

.level-icon.is-completed {
  background: linear-gradient(135deg, var(--color-success) 0%, #059669 100%);
}

.level-card:hover .level-icon {
  transform: scale(1.1);
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-1);
}

.level-name {
  font-size: var(--text-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.level-id {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  color: var(--color-text-tertiary);
}

.level-badge {
  position: absolute;
  top: var(--spacing-2);
  right: var(--spacing-2);
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);
  background: var(--color-success);
  color: #ffffff;
  font-size: 14px;
  font-weight: var(--font-weight-bold);
}
</style>
