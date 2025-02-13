<template>
  <q-item-section>
    <!-- If it's a group -->
    <template v-if="isGroup">
      <q-expansion-item
        dense
        :label="title"
        :header-class="headerClass"
        :class="['layer-grid']"
      >
        <template #header>
          <div class="layer-controls">
            <div class="checkbox-wrapper">
              <template v-if="inputType === 'radio'">
                <q-radio
                  v-model="modelValue"
                  :val="true"
                  @update:model-value="onRadioChange"
                />
              </template>
              <template v-else>
                <q-checkbox
                  v-model="modelValue"
                  @update:model-value="onCheckboxChange"
                />
              </template>
            </div>
            <div class="layer-title">{{ title }}</div>
          </div>
        </template>

        <!-- Nested layers -->
        <q-list padding v-if="layers">
          <q-item v-for="(layer, idx) in layers" :key="layer.title">
            <LayerItem
              :layer="layer"
              :groupIndex="groupIndex"
              :layerIndex="idx"
              :inputType="inputType"
              :parent-visible="passVisibilityToChildren"
              @toggle="onNestedToggle"
              @radio-select="onNestedRadioSelect"
            />
          </q-item>
        </q-list>

        <!-- Legend if available -->
        <q-card v-if="hasLegend && modelValue" class="legend-card">
          <MapLegend
            :classColorMap="layerLegend?.colorMap"
            :is-continuous="layerLegend?.type === 'continuous'"
          />
        </q-card>
      </q-expansion-item>
    </template>

    <!-- If it's a single layer -->
    <template v-else>
      <div class="layer-controls">
        <div class="checkbox-wrapper">
          <template v-if="inputType === 'radio'">
            <q-radio
              v-model="modelValue"
              :val="true"
              @update:model-value="onRadioChange"
            />
          </template>
          <template v-else>
            <q-checkbox
              v-model="modelValue"
              @update:model-value="onCheckboxChange"
            />
          </template>
        </div>
        <div class="layer-title">{{ title }}</div>
        <div v-if="hasLegend" class="show-legend">
          Show legend
        </div>
      </div>

      <q-card v-if="hasLegend && modelValue" class="legend-card">
        <MapLegend
          :classColorMap="layerLegend?.colorMap"
          :is-continuous="layerLegend?.type === 'continuous'"
        />
      </q-card>
    </template>
  </q-item-section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import MapLegend from './MapLegend.vue';
import {
  geomorphicColorMap,
  benthicColorMap,
  reefExtentColorMap,
  boundaryColorMap,
  marineProtectedAreaColorMap,
  chlMonthlyMean1997_2024,
  samplingSiteByYearColorMap,
  samplingSiteByProjectColorMap,
  samplingSiteByHardCoralCoverColorMap,
} from '@/maps/config/layerColors';
import { useMapStore } from '@/stores/mapStore';

const props = defineProps<{
  layer: any;
  groupIndex: number;
  layerIndex: number;
  inputType?: 'radio' | 'checkbox';
  parentVisible?: boolean; // Add this prop for parent visibility state
}>();

const emit = defineEmits<{
  (e: 'toggle', groupIndex: number, layerIndex: number, value: boolean): void;
  (e: 'radio-select', groupIndex: number, layerIndex: number): void;
}>();

const mapStore = useMapStore();

// Update modelValue computed to handle parent visibility
const modelValue = computed({
  get: () => props.parentVisible !== false && props.layer.visible,
  set: (value) => {
    if (props.inputType === 'radio') {
      emit('radio-select', props.groupIndex, props.layerIndex);
    } else {
      emit('toggle', props.groupIndex, props.layerIndex, value);
    }
  },
});

// Add watch for parent visibility changes
watch(() => props.parentVisible, (newVal) => {
  if (newVal === false) {
    // When parent becomes invisible, ensure all children are also invisible
    emit('toggle', props.groupIndex, props.layerIndex, false);
  }
});

// Pass parent visibility to child layers
const passVisibilityToChildren = computed(() => modelValue.value);

const isGroup = computed(() => Array.isArray(props.layer.layers));
const title = computed(() => props.layer.title);
const layers = computed(() => props.layer.layers);
const headerClass = computed(() => 'text-caption text-grey-7');

const getLayerLegend = (title: string) => {
  switch (title) {
    case 'Geomorphic':
      return geomorphicColorMap;
    case 'Benthic':
      return benthicColorMap;
    case 'Reef Extent':
      return reefExtentColorMap;
    case 'Boundary':
      return boundaryColorMap;
    case 'Protected Area':
      return marineProtectedAreaColorMap;
    case 'CHL_monthly_mean_1997_2024_Mean':
      return chlMonthlyMean1997_2024;
    case 'by year':
      return samplingSiteByYearColorMap;
    case 'by project':
      return samplingSiteByProjectColorMap;
    case 'hard coral cover':
      return samplingSiteByHardCoralCoverColorMap;
    default:
      return undefined;
  }
};

const layerLegend = computed(() => getLayerLegend(title.value));
const hasLegend = computed(() => !!layerLegend.value);

const onCheckboxChange = (value: boolean) => {
  if (props.layer.title === 'Geomorphic' || props.layer.title === 'Benthic') {
    mapStore.setAllClassesVisibility(props.layer.title, value);
  }
  emit('toggle', props.groupIndex, props.layerIndex, value);
};

const onRadioChange = () => {
  emit('radio-select', props.groupIndex, props.layerIndex);
};

const onNestedToggle = (groupIndex: number, layerIndex: number, value: boolean) => {
  emit('toggle', groupIndex, layerIndex, value);
};

const onNestedRadioSelect = (groupIndex: number, layerIndex: number) => {
  emit('radio-select', groupIndex, layerIndex);
};
</script>

<style scoped>
.layer-grid {
  width: 100%;
}

.layer-controls {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px 0;
}

.show-legend {
  color: var(--q-primary);
  font-size: 0.8rem;
}

:deep(.legend-card) {
  margin-top: 8px;
  margin-left: calc(24px + 8px);
  background: transparent;
  box-shadow: none;
  width: calc(100% - 32px);
}

.layer-grid.no-expand {
  pointer-events: none;
}

.layer-grid.no-expand .checkbox-wrapper {
  pointer-events: all;
}

.layer-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.q-expansion-item {
  width: 100%;
}

:deep(.q-expansion-item__container) {
  padding-left: 16px;
}
</style>