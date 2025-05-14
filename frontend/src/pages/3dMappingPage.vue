<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-body1 markdown-container">
        <q-markdown :src="text" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import text_en from 'src/assets/i18n/research-projects/3d_mapping/en.md';
import text_fr from 'src/assets/i18n/research-projects/3d_mapping/fr.md';
import text_ar from 'src/assets/i18n/research-projects/3d_mapping/ar.md';
import { useLocalizedMarkdown } from 'src/composables/useLocalizedMarkdown';

const text = useLocalizedMarkdown({ en: text_en, fr: text_fr, ar: text_ar });
</script>
