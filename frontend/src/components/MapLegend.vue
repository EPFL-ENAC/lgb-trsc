<template>
  <div class="legend" :class="{ 'legend-absolute': isAbsolute }">
    <ol v-if="visibleColorClasses && !isContinuous">
      <li v-for="(color, className) in visibleColorClasses" :key="className">
        <q-checkbox
          :model-value="visibleClasses[className]"
          @update:model-value="() => toggleClassVisibility(className as string)"
          dense
        >
          <template v-slot:default>
            <span class="legend-item">
              <span
                class="legend-color"
                :style="{ 'background-color': color }"
              ></span>
              {{ className }}
            </span>
          </template>
        </q-checkbox>
      </li>
    </ol>
    <!-- Continuous legend -->
    <ol
      v-else-if="isContinuous && classColorMap && colorLabels.length"
      class="gradient-ramp"
    >
      <div class="color-ramp" :style="{ background: gradientCSS }"></div>
      <div class="ramp-labels">
        <span>{{ colorLabels[0] }} {{ metadata?.unit}}</span>
        <span>
          {{ colorLabels[Math.floor(colorLabels.length / 2)] }}  {{ metadata?.unit}}
        </span>
        <span>{{ colorLabels[colorLabels.length - 1] }}  {{ metadata?.unit}}</span>
      </div>
    </ol>
    <ol v-else>
      <li>
        <span
          class="legend-color"
          :style="{ 'background-color': legendColor }"
        ></span>
        {{ legendText }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, ref, watch, onMounted } from 'vue';
import { useMapStore } from '@/stores/mapStore';
import { useMapController } from '@/maps/composables/useMapController';

interface ClassColorMap {
  [key: string]: string;
}

interface LegendInfo {
  title ?:string;
  unit?: string;
  variable?: string;
}

const props = defineProps<{
  selectedCountry?: string;
  selectedExpedition?: string;
  classColorMap?: ClassColorMap;
  metadata?: LegendInfo;
  isContinuous?: boolean;
  isAbsolute?: boolean;
  maxValue?: number;
}>();


const visibleColorClasses = computed(() => {
  if (!props.maxValue) return props.classColorMap;
  const keepers = Object.keys(props.classColorMap ?? {}).slice(0, props.maxValue);
  const result = {} as ClassColorMap;
  for (const key of keepers) {
    result[key] = props.classColorMap?.[key] ?? 'rgba(0,0,0,0)';
  }
  return result;
});

const mapStore = useMapStore();
// Use the store's visibleClasses directly instead of local state
const visibleClasses = computed(() => mapStore.visibleClasses);

const toggleClassVisibility = (className: string) => {
  mapStore.setClassVisibility(className, !visibleClasses.value[className]);
};

const legendColor = computed(() =>
  props.selectedCountry || props.selectedExpedition ? 'blue' : 'yellow'
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

const legendText = computed(() =>
  props.selectedCountry || props.selectedExpedition
    ? 'Expedition 2023'
    : 'Countries'
);
</script>

<style scoped lang="scss">
.legend {
  position: relative;
  background: inherit;
  padding: 0.5rem;
  margin: 0.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.legend-absolute {
    position: absolute;
    top: 1.5em;
    left: 3.5em;
    background: white;
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    margin: 0;

    li {
      color: #333;
    }
  }

  ol {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: flex;
      align-items: center;
      padding: 0.25rem 0;
      font-size: 0.9rem;
      color: #333;
    }
  }
}

.legend-color {
  display: inline-block;
  width: 12px;
  height: 12px;
  margin-right: 8px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.gradient-ramp {
  display: flex; /* Set display to flex */
  align-items: center; /* Align items vertically */
  width: 100%; /* Full width to accommodate labels next to the ramp */
  height: 150px; /* Adjust height for better gradient visualization */
}

.color-ramp {
  width: 40px; /* Fixed width for the color ramp */
  height: 100%;
  background: v-bind('gradientCSS');
}

.ramp-labels {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-left: 10px; /* Add some spacing between ramp and labels */
}
</style>
