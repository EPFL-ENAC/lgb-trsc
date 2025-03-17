<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <div class="gradient-ramp">
      <div class="color-ramp" :style="{ background: gradientCSS }"></div>
      <div class="ramp-labels">
        <span>{{ colorLabels[0] }} {{ metadata?.unit }}</span>
        <span>
          {{ colorLabels[Math.floor(colorLabels.length / 2)] }}
          {{ metadata?.unit }}
        </span>
        <span>{{ colorLabels[colorLabels.length - 1] }} {{ metadata?.unit }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import { ContinuousLegendProps } from '@/types/legend';

const props = withDefaults(
  defineProps<ContinuousLegendProps>(),
  {
    classColorMap: () => ({}),
    metadata: () => ({}),
    isAbsolute: false,
  }
);

const colorLabels = computed(() => {
  if (!props.classColorMap) return [];
  return Object.keys(props.classColorMap);
});

const gradientCSS = computed(() => {
  if (!props.classColorMap) return '';
  const colorsArray = Object.values(props.classColorMap);
  return `linear-gradient(to bottom, ${colorsArray.join(', ')})`;
});
</script>

<style scoped lang="scss">
@import '@/css/legend.scss';
</style>