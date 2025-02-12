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
        default-opened
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
        default-opened
      >
        <q-list padding>
          <q-item v-for="(layer, layerIndex) in group.layers" :key="layer.title">
            <q-item-section avatar>
              <q-checkbox
                v-model="layer.visible"
                @update:model-value="(val) => toggleOverlayLayer(groupIndex, layerIndex, val)"
              />
            </q-item-section>
            <q-item-section>{{ layer.title }}</q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
    </q-list>
  </q-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useLayerManager } from '@/maps/composables/useLayerManager';

const $q = useQuasar();
const leftDrawerOpen = ref(true);
const activeBaseMap = ref('OpenStreetMap');

const {
  baseMaps,
  overlayGroups,
  setBaseMapVisible,
  toggleOverlayLayer
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
</script>

<style scoped>
.q-drawer {
  background: rgba(255, 255, 255, 0.9) !important;
}

.q-drawer--dark {
  background: rgba(33, 33, 33, 0.9) !important;
}
</style>