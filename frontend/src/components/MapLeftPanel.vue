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
          <q-item v-for="layerInfo in baseMaps" :key="layerInfo.title">
            <q-item-section avatar>
              <q-radio
                :model-value="computedActivedBaseMap"
                :val="layerInfo.title"
                :label="layerInfo.title"
                @update:model-value="() => setBaseMapVisible(layerInfo.title)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- Overlay groups section -->
      <q-expansion-item
        v-for="(group, groupIndex) in computedOverlayGroups"
        :key="group.title"
        :group="`overlays${groupIndex}`"
        :icon="getGroupIcon(group.title)"
        :label="group.title"
        :model-value="
          group.layers.some((layerinfo) => layerinfo.layer.getVisible())
        "
      >
        <q-list padding>
          <q-item
            v-for="(layerinfo, layerIndex) in group.layers"
            :key="layerinfo.layer.get('title')"
            class="column"
          >
            <q-item-section
              v-if="layerinfo.layer.get('title') === 'Reef clusters'"
              class="q-px-xl"
            >
              <q-input
                type="number"
                v-model.number="mapStore.selectedEnvironmentalClusterNumber"
                label="Number of Reef Clusters"
                dense
                min="3"
                max="6"
                hide-bottom-space
              />
            </q-item-section>
            <q-item-section>
              <q-expansion-item
                v-if="layerinfo.layer.get('visible') && getLayerLegend(layerinfo.layer as BaseLayer)"
                dense
                dense-toggle
                :default-opened="layerinfo.layer.get('visible') && !!getLayerLegend(layerinfo.layer as BaseLayer)"
                header-class="text-caption text-grey-7"
                class="layer-grid"
              >
                <template #header>
                  <div
                    :class="
                      group.title !== 'Environmental Layers'
                        ? 'layer-controls'
                        : 'layer-environmental-controls'
                    "
                  >
                    <div class="checkbox-wrapper">
                      <template v-if="group.inputType === 'radio'">
                        <q-radio
                          :model-value="
                            layerinfo.layer.get('visible')
                              ? layerinfo.layer.get('title')
                              : null
                          "
                          :val="layerinfo.layer.get('title')"
                          :label="layerinfo.layer.get('title')"
                          @update:model-value="
                            () => setOverlayLayerRadio(groupIndex, layerIndex)
                          "
                        />
                      </template>
                      <template v-else>
                        <q-checkbox
                          :model-value="layerinfo.layer.get('visible')"
                          :label="layerinfo.layer.get('title')"
                          @update:model-value="
                            (val) =>
                              toggleOverlayLayer(groupIndex, layerIndex, val)
                          "
                        />
                      </template>
                    </div>
                    <div v-if="group.title === 'Environmental Layers'" class="env-controls">
                      <q-icon name="info" v-if="layerinfo.layer.get('description')">
                        <q-tooltip>
                          <q-card>
                            <q-card-section>
                              <q-card-title>
                                <span style="color: black; height: 10px; width: 10px">

                                  {{ layerinfo.layer.get('description') }}
                                </span>
                              </q-card-title>
                            </q-card-section>
                          </q-card>
                        </q-tooltip>
                      </q-icon>

                      <q-toggle
                        :label="layerinfo.layer.get('meanOrSD')"
                        color="pink"
                        false-value="SD"
                        true-value="Mean"
                        :model-value="layerinfo.layer.get('meanOrSD')"
                        @update:model-value="() => updateMeanOrSD(layerinfo.layer as BaseLayer)"
                      />
                    </div>
                  </div>
                </template>
                <q-card class="legend-card">
                  <MapLegend
                    v-if="layerinfo.layer.get('title') === 'Reef clusters'"
                    :classColorMap="getLayerLegend(layerinfo.layer as BaseLayer)?.colorMap"
                    :max-value="mapStore.selectedEnvironmentalClusterNumber"
                    :is-continuous="
                      getLayerLegend(layerinfo.layer as BaseLayer)?.type === 'continuous'
                    "
                  />
                  <MapLegend
                    v-else
                    :classColorMap="getLayerLegend(layerinfo.layer as BaseLayer)?.colorMap"
                    :metadata="{
                      title: layerinfo.layer.get('title'),
                      unit: layerinfo.layer.get('unit'),
                      variable: layerinfo.layer.get('variable'),
                    }"
                    :is-continuous="
                      getLayerLegend(layerinfo.layer as BaseLayer)?.type === 'continuous'
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
                  <div
                    :class="
                      group.title !== 'Environmental Layers'
                        ? 'layer-controls'
                        : 'layer-environmental-controls'
                    "
                  >
                    <div class="checkbox-wrapper">
                      <template v-if="group.inputType === 'radio'">
                        <q-radio
                          :model-value="
                            layerinfo.layer.get('visible')
                              ? layerinfo.layer.get('title')
                              : null
                          "
                          :val="layerinfo.layer.get('title')"
                          :label="layerinfo.layer.get('title')"
                          @update:model-value="
                            () => setOverlayLayerRadio(groupIndex, layerIndex)
                          "
                        />
                      </template>
                      <template v-else>
                        <q-checkbox
                          :model-value="layerinfo.layer.get('visible')"
                          :label="layerinfo.layer.get('title')"
                          @update:model-value="
                            (val) =>
                              toggleOverlayLayer(groupIndex, layerIndex, val)
                          "
                        />
                      </template>
                    </div>
                    <div v-if="group.title === 'Environmental Layers'" class="env-controls">
                      <q-icon name="info" v-if="layerinfo.layer.get('description')">
                        <q-tooltip>
                          <q-card>
                            <q-card-section>
                              <q-card-title>
                                <span style="color: black; height: 10px; width: 10px">

                                  {{ layerinfo.layer.get('description') }}
                                </span>
                              </q-card-title>
                            </q-card-section>
                          </q-card>
                        </q-tooltip>
                      </q-icon>
                      <q-toggle
                        :label="layerinfo.layer.get('meanOrSD')"
                        color="pink"
                        false-value="SD"
                        true-value="Mean"
                        :model-value="layerinfo.layer.get('meanOrSD')"
                        @update:model-value="() => updateMeanOrSD(layerinfo.layer as BaseLayer)"
                        @click:model-value="() => updateMeanOrSD(layerinfo.layer as BaseLayer)"
                      />
                    </div>
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
import { ref, computed, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useLayerManager } from '@/maps/composables/useLayerManager';
import MapLegend from './MapLegend.vue';
import {
  geomorphicColorMap,
  benthicColorMap,
  reefExtentColorMap,
  boundaryColorMap,
  marineProtectedAreaColorMap,
  defaultEnvironmentalColorMap,
  environmentalClusterColorMap,
  samplingSiteByYearColorMap,
  samplingSiteByProjectColorMap,
  samplingSiteByHardCoralCoverColorMap,
} from '@/maps/config/layerColors';
import {
  sources as environmentalSources,
  createGeoTIFFSource,
} from '@/maps/sources/DjiboutiNOAASource';
import { useMapStore } from '@/stores/mapStore';
import BaseLayer from 'ol/layer/Base';
import { storeToRefs } from 'pinia';
import { sourcesTitle } from '@/maps/sources/DjiboutiNOAASource';
import { generateDefaultStyle } from '@/maps/layers/overlay/EnvironmentalLayers/DjiboutiLayer';

const $q = useQuasar();
const leftDrawerOpen = ref(true);

const {
  baseMaps,
  overlayGroups,
  setBaseMapVisible,
  toggleOverlayLayer: originalToggleOverlayLayer,
  setOverlayLayerRadio,
} = useLayerManager();

const mapStore = useMapStore();
const { selectedCountry } = storeToRefs(mapStore);
const computedOverlayGroups = computed(() => {
  if (selectedCountry.value === null) {
    return overlayGroups?.value.filter((layerGroup) =>
      layerGroup.group.get('visible')
    );
  } else {
    return overlayGroups?.value;
  }
});

const computedActivedBaseMap = computed(() => {
  return baseMaps.value.find((baseMap) => baseMap.layer.get('visible'))?.title;
});

// const computedActiveEnvLayer = computed(() => {
//   const envGroup = computedOverlayGroups.value.find((group) => group.title === 'Environmental Layers')
//   const visibleLayer = envGroup?.layers.find((layer) => layer.layer.get('visible'));
//   return visibleLayer?.layer.get('title');
// });

const updateMeanOrSD = (layer: BaseLayer) => {
  const meanOrSD = layer.get('meanOrSD');
  const newMeanOrSD = meanOrSD === 'Mean' ? 'SD' : 'Mean';
  // find appropriate source
  const environmentalSource = environmentalSources.find(
    (source) =>
      source.name === layer.get('title') && source.type === newMeanOrSD
  );
  // change the source of the layer!
  if (environmentalSource) {
    const newStyle = generateDefaultStyle(environmentalSource?.colorScale || defaultEnvironmentalColorMap);
    layer.set('colorScale', environmentalSource.colorScale);
    layer.set('style', newStyle)
    layer.set('properties', {
      ...environmentalSource,
    });
    layer.set('source', createGeoTIFFSource(environmentalSource));
    layer.changed()
  }
  layer.set('meanOrSD', newMeanOrSD);
};

const getGroupIcon = (title: string) => {
  const icons: Record<string, string> = {
    Environmental: 'eco',
    Reef: 'water',
    Sampling: 'location_on',
    Default: 'layers',
  };

  return icons[title] || icons['Default'];
};

const getLayerLegend = (layer: BaseLayer) => {
  // Return the appropriate color map based on the layer title
  if (sourcesTitle.includes(layer.get('title'))) {
    return layer?.get('colorScale') ?? defaultEnvironmentalColorMap;
  }
  switch (layer.get('title')) {
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
    case 'Reef clusters':
      return environmentalClusterColorMap;
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
.env-controls {
  display: flex;
    justify-content: center;
    align-items: center;
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
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 8px;
    width: 100%;
  }
  .layer-environmental-controls {
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
