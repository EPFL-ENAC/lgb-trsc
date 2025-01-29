<template>
  <div
    class="map-tooltip"
    :style="{
      '--display-tooltip': content ? 'inline-block' : 'none',
      '--left-tooltip': `${position?.[0] || 0}px`,
      '--top-tooltip': `${position?.[1] || 0}px`,
    }"
  >
    {{ content }}
  </div>
</template>

<script setup lang="ts">
interface Position {
  0: number;
  1: number;
}

defineProps<{
  content?: string;
  position?: Position;
}>();
</script>

<style scoped lang="scss">
.map-tooltip {
  position: absolute;
  top: calc(var(--top-tooltip) - 10px);
  left: calc(var(--left-tooltip) + 40px);
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  display: var(--display-tooltip, inline-block);
}
</style>