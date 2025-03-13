<template>
  <q-drawer
    v-model="drawer"
    side="right"
    :width="500"
    :breakpoint="500"
    overlay
    :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
    style="
      height: -webkit-fill-available;
      height: -moz-available;
      height: fill-available;
      height: initial;
    "
  >
    <CountryMapPopup
      v-if="selectedCountry && !selectedExpedition"
      :country="selectedCountry"
      :close-drawer="closeDrawer"
    />
    <ExpeditionMapPopup v-if="selectedExpedition" />
  </q-drawer>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';
import { useMapStore } from '@/stores/mapStore';
import { QDrawer } from 'quasar';

import { storeToRefs } from 'pinia';
import CountryMapPopup from './CountryMapPopup.vue';
import ExpeditionMapPopup from './ExpeditionMapPopup.vue';

const $q = useQuasar();
const mapStore = useMapStore();
const { selectedCountry, selectedExpedition, drawer } = storeToRefs(mapStore);
const { closeDrawer } = mapStore;

// Removed props interface and defineProps, now using mapStore directly.
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
