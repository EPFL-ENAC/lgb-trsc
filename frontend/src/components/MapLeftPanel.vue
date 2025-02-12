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
    "
  >
    <q-list padding>
      <!-- Base maps section -->
      <q-expansion-item
        group="layers"
        icon="map"
        label="Base maps"
      >
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
          <q-item v-for="(layer, layerIndex) in group.layers" :key="layer.title">
            <q-item-section avatar>
              <template v-if="group.inputType === 'radio'">
                <q-radio
                  v-model="layer.visible"
                  :val="true"
                  @update:model-value="() => setOverlayLayerRadio(groupIndex, layerIndex)"
                />
              </template>
              <template v-else>
                <q-checkbox
                  v-model="layer.visible"
                  @update:model-value="(val) => toggleOverlayLayer(groupIndex, layerIndex, val)"
                />
              </template>
            </q-item-section>
            <q-item-section>
              {{ layer.title }}
              <q-expansion-item
                v-if="layer.visible && getLayerLegend(group.layers)"
                dense
                dense-toggle
                switch-toggle-side
                header-class="text-caption text-grey-7"
                class="legend-expansion"
                label="Show legend"
              >
                <q-card class="legend-card">
                  <MapLegend
                    :classColorMap="getLayerLegend(group.layers)"
                  />
                </q-card>
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
import { classColorMap as geomorphicColorMap } from '@/maps/styles/geomorphicLayerStyle';
import { classColorMap as benthicColorMap } from '@/maps/styles/benthicLayerStyle';

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
  toggleOverlayLayer,
  setOverlayLayerRadio
} = useLayerManager();

const getGroupIcon = (title: string) => {
  const icons: Record<string, string> = {
    'Environmental': 'eco',
    'Reef': 'water',
    'Sampling': 'location_on',
    'Default': 'layers'
  };

  return icons[title] || icons['Default'];
};

const getLayerLegend = (layers: Layer[]) => {
  const visibleLayer = layers.find(layer => layer.visible);
  if (!visibleLayer) return undefined;
  // Return the appropriate color map based on the layer title
  switch (visibleLayer.title) {
    case 'Geomorphic':
      return geomorphicColorMap;
    case 'Benthic':
      return benthicColorMap;
    default:
      return undefined;
  }
};
</script>

<style scoped>
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

:deep(.legend-expansion) {
  margin-top: 4px;
}

:deep(.legend-card) {
  background: transparent;
  box-shadow: none;
}

:deep(.q-expansion-item__content) {
  padding: 0;
}
</style>