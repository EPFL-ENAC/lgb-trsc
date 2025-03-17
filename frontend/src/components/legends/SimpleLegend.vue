<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <ol>
      <li>
        <span class="legend-color" :style="{ 'background-color': color }"></span>
        <span v-if="showLegendText" class="legend-text">
          {{ text }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue';
import { SimpleLegendProps } from '@/types/legend';

withDefaults(
  defineProps<SimpleLegendProps>(),
  {
    color: 'yellow',
    text: 'Legend Item',
    showLegendText: true,
    isAbsolute: false,
    metadata: () => ({}),
  }
);
</script>

<style scoped lang="scss">
@import '@/css/legend.scss';
</style>