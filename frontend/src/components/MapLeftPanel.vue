<template>
  <q-drawer
    v-model="leftDrawerOpen"
    :mini="!leftDrawerOpen || leftMiniDrawer"
    side="left"
    show-if-above
    :width="drawerWidth"
    :breakpoint="300"
    bordered
    :class="['bg-white', 'left-panel', 'q-pa-md']"
    persistent
  >
    <div
      class="absolute"
      :style="{ top: '16px', right: leftMiniDrawer ? '12px': '-16px', zIndex: 1000 }"
    >
      <q-btn
        dense
        round
        unelevated
        color="primary"
        :icon="leftMiniDrawer ? 'chevron_right' : 'chevron_left'"
        @click="leftMiniDrawer = !leftMiniDrawer"
      />
    </div>

    <q-list v-if="!leftMiniDrawer">
      <!-- Overlay groups section -->
      <q-expansion-item
        v-for="(group, groupIndex) in computedOverlayGroups"
        :key="group.title"
        v-model="expandedGroups[groupIndex]"
        switch-toggle-side
        expand-separator
        :group="`overlays${groupIndex}`"
        :label="
          group.title === 'Environmental Layers'
            ? t('panel.environmental_layers')
            : group.title
        "
        @update:model-value="(val) => onGroupExpansionChange(group.title, val)"
      >
        <template #header="">
          <div class="layer-group">
            <div class="layer-group__title">
              {{
                group.title === 'Environmental Layers'
                  ? t('panel.environmental_layers')
                  : group.title
              }}
              <q-icon
                v-if="group.title === 'Environmental Layers'"
                name="info"
                class="q-mr-sm"
              >
                <q-tooltip
                  class="text-body2"
                  :offset="[10, 10]"
                  anchor="center right"
                  self="center left"
                >
                  {{ t('panel.environmental_layers') }}
                </q-tooltip>
              </q-icon>
            </div>
            <q-icon
              :name="
                group.group.getVisible() ? mdiEyeOutline : mdiEyeOffOutline
              "
              flat
              round
              class="q-ml-xs visibility-toggle"
              @click.prevent.stop="
                () => toggleOverlayGroupVisibility(groupIndex)
              "
            />
          </div>
        </template>
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
                v-model.number="mapStore.selectedEnvironmentalClusterNumber"
                type="number"
                :label="t('panel.number_of_reef_clusters')"
                dense
                min="3"
                max="6"
                hide-bottom-space
              />
            </q-item-section>
            <q-item-section>
              <q-expansion-item
                :model-value="isLayerVisibleWithLegend(layerinfo.layer as BaseLayer)"
                :label="layerinfo.layer.get('title')"
                dense
                dense-toggle
                expand-icon="none"
                expand-icon-class="hidden"
                header-class="text-caption text-grey-7"
                :class="{
                  'layer-grid': true,
                  'no-expand': !isLayerVisibleWithLegend(layerinfo.layer as BaseLayer),
                }"
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
                      <q-icon
                        v-if="layerinfo.layer.get('description')"
                        class="q-ml-xs"
                        name="info"
                      >
                        <q-tooltip
                          class="text-body2"
                          :offset="[10, 10]"
                          anchor="center right"
                          self="center left"
                        >
                          {{ layerinfo.layer.get('description') }}<br />
                          {{ t('panel.toggle_mean_sd') }}
                        </q-tooltip>
                      </q-icon>
                    </div>
                    <div
                      v-if="group.title === 'Environmental Layers'"
                      class="env-controls"
                    >
                      <span>{{ t('panel.mean') }}</span>
                      <q-toggle
                        color="blue"
                        :keep-color="true"
                        false-value="Mean"
                        true-value="SD"
                        :model-value="layerinfo.layer.get('meanOrSD')"
                        @update:model-value="() => updateMeanOrSD(layerinfo.layer as BaseLayer)"
                      />
                      <span>{{ t('panel.sd') }}</span>
                    </div>
                  </div>
                </template>
                <template
                  v-if="isLayerVisibleWithLegend(layerinfo.layer as BaseLayer)"
                >
                  <div class="legend-card">
                    <MapLegend
                      v-if="layerinfo.layer.get('title') === 'Reef clusters'"
                      :is-simple="true"
                      :class-color-map="getLayerLegend(layerinfo.layer as BaseLayer)?.colorMap"
                      :max-value="mapStore.selectedEnvironmentalClusterNumber"
                      :show-legend-text="false"
                      :is-continuous="
                        getLayerLegend(layerinfo.layer as BaseLayer)?.type === 'continuous'
                      "
                    />
                    <MapLegend
                      v-else
                      :class-color-map="getLayerLegend(layerinfo.layer as BaseLayer)?.colorMap"
                      :metadata="{
                        title: layerinfo.layer.get('title'),
                        unit: layerinfo.layer.get('unit'),
                        variable: layerinfo.layer.get('variable'),
                      }"
                      :is-continuous="
                        getLayerLegend(layerinfo.layer as BaseLayer)?.type === 'continuous'
                      "
                    />
                  </div>
                </template>
              </q-expansion-item>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <!-- Base maps section -->
      <q-expansion-item
        group="layers"
        :label="t('panel.base_maps')"
        icon="map"
        switch-toggle-side
        expand-separator
      >
        <template #header>
          <div class="layer-group">
            <div class="layer-group__title">{{ t('panel.base_maps') }}</div>
            <q-icon name="map" flat round class="q-ml-xs visibility-toggle" />
          </div>
        </template>
        <q-list padding>
          <q-item v-for="layerInfo in baseMaps" :key="layerInfo.title">
            <q-item-section avatar>
              <q-radio
                :model-value="computedActiveBaseMap"
                :val="layerInfo.title"
                :label="layerInfo.title"
                @update:model-value="() => setBaseMapVisible(layerInfo.title)"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>

      <div v-if="!selectedCountry" class="q-pa-md text-center">
        <hr />
        <i>{{ t('panel.click_country') }}</i>
      </div>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useLayerManager } from 'maps/composables/useLayerManager';
import MapLegend from './MapLegend.vue';
import {
  mdiEyeOutline,
  mdiEyeOffOutline,
} from '@mdi/js';
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
} from 'maps/config/layerColors';
import {
  sources as environmentalSources,
  createGeoTIFFSource,
} from 'maps/sources/DjiboutiNOAASource';
import { useMapStore } from 'stores/mapStore';
import BaseLayer from 'ol/layer/Base';
import { storeToRefs } from 'pinia';
import { sourcesTitle } from 'maps/sources/DjiboutiNOAASource';
import { generateDefaultStyle } from 'maps/layers/overlay/EnvironmentalLayers/DjiboutiLayer';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'local' });
// Utility function to check layer visibility and legend availability
const isLayerVisibleWithLegend = (layer: BaseLayer): boolean => {
  return layer.get('visible') && getLayerLegend(layer) !== undefined;
};

const $q = useQuasar();
// const leftDrawerOpen = ref(true);
// const miniState = ref(false);


const {
  baseMaps,
  overlayGroups,
  setBaseMapVisible,
  toggleOverlayLayer: originalToggleOverlayLayer,
  toggleOverlayGroupVisibility,
  setOverlayLayerRadio,
} = useLayerManager();

const mapStore = useMapStore();
const { selectedCountry, leftDrawerOpen, leftMiniDrawer } = storeToRefs(mapStore);
const computedOverlayGroups = computed(() => {
  return overlayGroups?.value?.filter((layerGroup) => {
    return (
      !layerGroup.group.get('showForcountryOnly') ||
      (layerGroup.group.get('showForcountryOnly') && selectedCountry.value)
    );
  });
});

const computedActiveBaseMap = computed(() => {
  return baseMaps.value.find((baseMap) => baseMap.layer.get('visible'))?.title;
});

const updateMeanOrSD = (layer: WebGLTileLayer) => {
  const meanOrSD = layer.get('meanOrSD');
  const newMeanOrSD = meanOrSD === 'Mean' ? 'SD' : 'Mean';

  // find appropriate source
  const environmentalSource = environmentalSources.find(
    (source) =>
      source.name === layer.get('title') && source.type === newMeanOrSD
  );
  // Only update if we found a matching source
  if (environmentalSource) {
    const newStyle = generateDefaultStyle(environmentalSource?.colorScale);
    layer.setStyle(newStyle);
    layer.set('meanOrSD', newMeanOrSD);
    layer.set('source', createGeoTIFFSource(environmentalSource));
    layer.set('colorScale', environmentalSource?.colorScale);
  } else {
    // Show notification that this type isn't available
    $q.notify({
      color: 'warning',
      message: t('panel.not_available', {
        type: newMeanOrSD,
        title: layer.get('title'),
      }),
      timeout: 2000,
    });
  }
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

// Track expansion state of groups
const expandedGroups = ref<Record<number, boolean>>({});
const isEnvironmentalLayersExpanded = ref(false);

// Computed property for drawer width
const drawerWidth = computed(() => {
  return isEnvironmentalLayersExpanded.value ? 500 : 300;
});

// Handle group expansion changes
const onGroupExpansionChange = (groupTitle: string, isExpanded: boolean) => {
  if (groupTitle === 'Environmental Layers') {
    isEnvironmentalLayersExpanded.value = isExpanded;
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

<style scoped lang="scss">
:deep(.q-toggle__thumb) {
  &:after {
    background: blue !important;
  }
}
.visibility-toggle {
  // position: absolute;
  // right: 0;
  // top: 0;
  opacity: 0.6;
  transition: opacity 0.2s ease, transform 0.2s ease;

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
  &:active {
    transform: scale(0.9);
  }
}

:root {
  --checkbox-cursor: default !important;
  --left-panel-height: -webkit-fill-available;
  --left-panel-height: -moz-available;
  --left-panel-height: fill-available;
  --left-panel-height: initial;
  --left-panel-padding: 10px;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 500;
  color: #ff432c;
  text-align: center;
  border-bottom: 1px solid #ff432c;
  margin-bottom: 10px;
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
    // grid-template-columns: auto 90px;
    grid-template-columns: auto auto;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
  }

  .show-legend {
    color: var(--q-primary);
    font-size: 0.8rem;
  }

  :deep(.legend-card) {
    margin-top: 8px;
    background: transparent;
    box-shadow: none;
    width: calc(100% - 32px);
  }

  /* // Apply margin-left only to discrete legends, not continuous legends */
  :deep(.legend-card:has(.legend:not(:has(.gradient-ramp)))) {
    margin-left: calc(24px + 8px);
  }

  :deep(.q-expansion-item__content) {
    padding: 0;
  }
}

.layer-grid.no-expand {
  pointer-events: none;

  .checkbox-wrapper,
  .env-controls {
    pointer-events: all;
  }

  :deep(.q-expansion-item__toggle-icon) {
    display: none;
  }
}

.layer-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 8px;
  padding-left: 0px;
  margin-left: -32px;
}
.layer-group__title:hover {
  cursor: pointer;
}
.layer-title,
.layer-group__title {
  overflow: hidden;
  font-size: 1rem;
  font-weight: 500;
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

<i18n lang="yaml">
en:
  panel:
    title: The Red Sea
    overlays: Overlays
    base_maps: Base maps
    environmental_layers: Environmental Layers
    mean: Mean
    sd: SD
    number_of_reef_clusters: Number of Reef Clusters
    click_country: Click on a country flag to access detailed country data
    toggle_mean_sd: Toggle the button, to switch from Mean to Standard deviation (SD)
    not_available: '{type} data not available for {title}'
fr:
  panel:
    title: La Mer Rouge
    overlays: Couches
    base_maps: Cartes de base
    environmental_layers: Couches environnementales
    mean: Moyenne
    sd: Écart-type
    number_of_reef_clusters: Nombre de groupes de récifs
    click_country: Cliquez sur un drapeau pour accéder aux données détaillées du pays
    toggle_mean_sd: Activez le bouton rose pour passer de la moyenne à l'écart-type (SD)
    not_available: 'Données {type} non disponibles pour {title}'
ar:
  panel:
    title: البحر الأحمر
    overlays: الطبقات
    base_maps: الخرائط الأساسية
    environmental_layers: الطبقات البيئية
    mean: المتوسط
    sd: الانحراف المعياري
    number_of_reef_clusters: عدد مجموعات الشعاب المرجانية
    click_country: انقر على علم الدولة للوصول إلى بيانات الدولة التفصيلية
    toggle_mean_sd: قم بتبديل الزر الوردي للتبديل بين المتوسط والانحراف المعياري (SD)
    not_available: 'بيانات {type} غير متوفرة لـ {title}'
</i18n>
