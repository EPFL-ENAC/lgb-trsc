<template>
  <q-drawer
    side="left"
    v-model="leftDrawerOpen"
    :width="300"
    :breakpoint="300"
    bordered
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    persistent
    style="
      height: -webkit-fill-available;
      height: -moz-available;
      height: fill-available;
      height: initial;
      padding-left: 10px;
      padding-right: 10px;
    "
  >
    <q-list padding>
      <!-- Base maps section -->
      <q-expansion-item group="layers" icon="map" label="Base maps">
        <q-list padding>
          <q-item v-for="layer in baseMaps" :key="layer.title">
            <q-item-section avatar>
              <q-radio
                v-model="activeBaseMap"
                :val="layer.title"
                @update:model-value="() => setBaseMapVisible(layer.title)"
              />
            </q-item-section>
            <q-item-section>{{ layer.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- Overlay groups section -->
      <q-expansion-item
        v-for="(group, groupIndex) in overlayGroups"
        :key="group.title"
        group="overlays"
        :icon="getGroupIcon(group.title)"
        :label="group.title"
        default-open
      >
        <q-list padding>
          <q-item
            v-for="(layer, layerIndex) in group.layers"
            :key="layer.title"
          >
            <q-item-section>
              <q-expansion-item
                v-if="layer.visible && getLayerLegend(layer)"
                dense
                dense-toggle
                header-class="text-caption text-grey-7"
                class="layer-grid"
              >
                <template #header>
                  <div class="layer-controls">
                    <div class="checkbox-wrapper">
                      <template v-if="group.inputType === 'radio'">
                        <q-radio
                          v-model="layer.visible"
                          :val="true"
                          @update:model-value="
                            () => setOverlayLayerRadio(groupIndex, layerIndex)
                          "
                        />
                      </template>
                      <template v-else>
                        <q-checkbox
                          v-model="layer.visible"
                          @update:model-value="
                            (val) =>
                              toggleOverlayLayer(groupIndex, layerIndex, val)
                          "
                        />
                      </template>
                    </div>
                    <div class="layer-title">{{ layer.title }}</div>
                    <div v-if="getLayerLegend(layer)" class="show-legend">
                      Show legend
                    </div>
                  </div>
                </template>
                <q-card class="legend-card">
                  <MapLegend
                    :classColorMap="getLayerLegend(layer)?.colorMap"
                    :is-continuous="
                      getLayerLegend(layer)?.type === 'continuous'
                    "
                  />
                </q-card>
              </q-expansion-item>

              <!-- Non-expandable version when no legend is available -->
              <q-expansion-item
                v-else
                dense
                dense-toggle
                header-class="text-caption text-grey-7"
                class="layer-grid no-expand"
              >
                <template #header>
                  <div class="layer-controls">
                    <div class="checkbox-wrapper">
                      <template v-if="group.inputType === 'radio'">
                        <q-radio
                          v-model="layer.visible"
                          :val="true"
                          @update:model-value="
                            () => setOverlayLayerRadio(groupIndex, layerIndex)
                          "
                        />
                      </template>
                      <template v-else>
                        <q-checkbox
                          v-model="layer.visible"
                          @update:model-value="
                            (val) =>
                              toggleOverlayLayer(groupIndex, layerIndex, val)
                          "
                        />
                      </template>
                    </div>
                    <div class="layer-title">{{ layer.title }}</div>
                  </div>
                </template>
              </q-expansion-item>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useLayerManager } from '@/maps/composables/useLayerManager';
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

interface Layer {
  title: string;
  visible: boolean;
}

const $q = useQuasar();
const leftDrawerOpen = ref(true);
const activeBaseMap = ref('OpenStreetMap');

const {
  baseMaps,
  overlayGroups,
  setBaseMapVisible,
  toggleOverlayLayer: originalToggleOverlayLayer,
  setOverlayLayerRadio,
} = useLayerManager();

const mapStore = useMapStore();

const getGroupIcon = (title: string) => {
  const icons: Record<string, string> = {
    Environmental: 'eco',
    Reef: 'water',
    Sampling: 'location_on',
    Default: 'layers',
  };

  return icons[title] || icons['Default'];
};

const getLayerLegend = (layer: Layer) => {
  // Return the appropriate color map based on the layer title
  switch (layer.title) {
    case 'Geomorphic':
      return geomorphicColorMap;
    case 'Benthic':
      return benthicColorMap;
    case 'Environmental':
      return undefined;
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

const toggleOverlayLayer = (
  groupIndex: number,
  layerIndex: number,
  val: boolean
) => {
  const layer = overlayGroups.value[groupIndex].layers[layerIndex];

  // Set visibility for all classes when toggling Geomorphic or Benthic layers
  if (layer.title === 'Geomorphic' || layer.title === 'Benthic') {
    mapStore.setAllClassesVisibility(layer.title, val);
  }

  originalToggleOverlayLayer(groupIndex, layerIndex, val);
};
</script>

<style>
.q-item.disabled .q-checkbox__bg,
.q-item[aria-disabled='true'] .q-checkbox__bg {
  cursor: default !important;
}
</style>

<style scoped>
:root {
  --checkbox-cursor: default !important;
}

:deep(.q-drawer--left.q-drawer--bordered.q-drawer--standard) {
  background: rgba(255, 255, 255, 0.9) !important;
  transform: translateX(-300px) !important;
  scroll-behavior: smooth !important;
  top: 0px !important;
  bottom: 0px !important;
  width: 300px !important;
}

.q-drawer--dark {
  background: rgba(33, 33, 33, 0.9) !important;
}

.q-drawer {
  :deep(.q-checkbox__bg) {
    cursor: var(--checkbox-cursor);
  }

  .layer-grid {
    width: 100%;
  }

  .layer-controls {
    display: grid;
    grid-template-columns: auto 1fr 0.5fr;
    align-items: center;
    gap: 8px;
    width: 100%;
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

  :deep(.q-expansion-item__content) {
    padding: 0;
  }
}

.layer-grid.no-expand {
  pointer-events: none;

  .checkbox-wrapper {
    pointer-events: all;
  }

  :deep(.q-expansion-item__toggle-icon) {
    display: none;
  }
}

.layer-title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

:deep(.q-list .q-item.q-item-type.row) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

:deep(.q-item.q-item-type) {
  padding-left: 0;
  padding-right: 0;
}
</style>
