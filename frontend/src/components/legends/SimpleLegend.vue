<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <ol class="legend-list-simple">
      <li v-for="(color, className) in visibleColorClasses" :key="className">
        <span class="legend-item">
          <span
            class="legend-color"
            :style="{ 'background-color': color }"
          ></span>
          <span v-if="showLegendText" class="legend-text">
            {{ className }}
          </span>
        </span>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { DiscreteLegendProps } from '@/types/legend';

const props = withDefaults(defineProps<DiscreteLegendProps>(), {
  classColorMap: () => ({}),
  showLegendText: true,
  metadata: () => ({}),
  isAbsolute: false,
  maxValue: 0,
});

const visibleColorClasses = computed(() => {
  if (!props.maxValue) return props.classColorMap;
  const keepers = Object.keys(props.classColorMap ?? {}).slice(
    0,
    props.maxValue
  );
  const result: { [key: string]: string } = {};
  for (const key of keepers) {
    result[key] = props.classColorMap?.[key] ?? 'rgba(0,0,0,0)';
  }
  return result;
});
</script>

<style scoped lang="scss">
@import '@/css/legend.scss';
</style>
