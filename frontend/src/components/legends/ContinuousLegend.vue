<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <div class="gradient-ramp horizontal-gradient">
      <div class="color-ramp" :style="{ background: gradientCSS }"></div>
      <div class="ramp-labels">
        <span class="label-left">{{ colorLabels[0] }} {{ metadata?.unit }}</span>
        <span class="label-center">
          {{ colorLabels[Math.floor(colorLabels.length / 2)] }}
          {{ metadata?.unit }}
        </span>
        <span class="label-right">{{ colorLabels[colorLabels.length - 1] }} {{ metadata?.unit }}</span>
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
  return `linear-gradient(to right, ${colorsArray.join(', ')})`;
});
</script>

<style scoped lang="scss">
@import '@/css/legend.scss';

.horizontal-gradient {
  display: grid;
  grid-template-areas:
    "color-ramp color-ramp color-ramp"
    "label1 label2 label3";
    grid-gap: 1rem;
  width: 100%;
  
  .color-ramp {
    grid-area: color-ramp;
    height: 15px;
    width: 100%;
  }
  
  .ramp-labels {
    display: contents;
    
    span {
      font-size: 0.8rem;
      white-space: nowrap;
    }
    
    .label-left {
      grid-area: label1;
      text-align: left;
    }
    
    .label-center {
      grid-area: label2;
      text-align: center;
    }
    
    .label-right {
      grid-area: label3;
      text-align: right;
    }
  }
}
</style>