<template>
  <div>
    <h3 class="q-pa-md q-ma-none" style="line-height: 2rem">
      {{ t('researchProjects.description') }}
    </h3>
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>

<style scoped lang="scss"></style>

<i18n lang="yaml">
fr:
  researchProjects:
    description: "Description du projet de recherche"
ar:
  researchProjects:
    description: "وصف مشروع البحث"
en:
  researchProjects:
    description: "Research project description"
</i18n>