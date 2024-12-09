<template>
  <q-page class="q-pa-md">
    <div class="text-h6 q-mb-md">About</div>
    <div>
      <q-markdown :src="AboutMd" no-heading-anchor-links />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import AboutMd from 'src/assets/about.md';
</script>
