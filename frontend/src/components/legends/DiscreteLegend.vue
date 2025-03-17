<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <ol>
      <li v-for="(color, className) in visibleColorClasses" :key="className">
        <q-checkbox
          :model-value="visibleClasses[className]"
          dense
          @update:model-value="() => toggleClassVisibility(String(className))"
        >
          <template #default>
            <span class="legend-item">
              <span
                class="legend-color"
                :style="{ 'background-color': color }"
              ></span>
              <span v-if="showLegendText" class="legend-text">
                {{ className }}
              </span>
            </span>
          </template>
        </q-checkbox>
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import { DiscreteLegendProps } from '@/types/legend';

const props = withDefaults(
  defineProps<DiscreteLegendProps>(),
  {
    classColorMap: () => ({}),
    showLegendText: true,
    metadata: () => ({}),
    isAbsolute: false,
    maxValue: 0,
  }
);

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

const mapStore = useMapStore();
const visibleClasses = computed(() => mapStore.visibleClasses);

const toggleClassVisibility = (className: string) => {
  mapStore.setClassVisibility(className, !visibleClasses.value[className]);
};
</script>

<style scoped lang="scss">
@import '@/css/legend.scss';
</style>