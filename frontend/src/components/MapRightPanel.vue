<template>
  <q-drawer
    v-model="drawer"
    :mini="!drawer || miniState"
    :mini-to-overlay="!drawer || miniState"
    side="right"
    :width="500"
    :breakpoint="500"
    :class="'bg-white text-black'"
  >
        <div
      class="absolute"
      :style="{ top: '16px', left: miniState ? '12px': '-16px', zIndex: 1000 }"
    >
      <q-btn
        dense
        round
        unelevated
        color="primary"
        :icon="miniState ? 'chevron_left' : 'chevron_right'"
        @click="miniState = !miniState"
      />
    </div>

    <CountryMapPopup
      v-if="selectedCountry && !selectedExpedition && !miniState"
      :country="selectedCountry"
      :close-drawer="closeDrawer"
      :mini-state="miniState"
    />
    <ExpeditionMapPopup v-if="selectedExpedition && !miniState" />
  </q-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMapStore } from 'stores/mapStore';
import { QDrawer } from 'quasar';

import { storeToRefs } from 'pinia';
import CountryMapPopup from './CountryMapPopup.vue';
import ExpeditionMapPopup from './ExpeditionMapPopup.vue';

const mapStore = useMapStore();
const { selectedCountry, selectedExpedition, drawer } = storeToRefs(mapStore);
const { closeDrawer } = mapStore;
const miniState = ref(false);
</script>

<style scoped>
/* Add any specific styles here if needed */
</style>
