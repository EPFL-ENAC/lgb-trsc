<template>
  <div class="resources-container">
    <div class="q-pa-md resources-text markdown-container">
      <p> The following text is a placeholder </p>
      <q-markdown :src="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

const scrollToRef = (refId: string) => {
  const element = document.getElementById(refId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

onMounted(() => {
  // Assume the clickable elements have the class "trsc-link" and a data-ref attribute
  const container = document.querySelector('.markdown-container');
  if (container) {
    container.addEventListener('click', event => {
      const target = event.target as HTMLElement;
      if (target.classList.contains('trsc-link')) {
        const refId = target.getAttribute('data-ref');
        if (refId) {
          scrollToRef(refId);
        }
      }
    });
  }
});

import text_fr from 'src/assets/i18n/resourcespage_fr.md';
import text_en from 'src/assets/i18n/resourcespage_en.md';
import text_ar from 'src/assets/i18n/resourcespage_ar.md';

import { useLocalizedMarkdown } from 'src/composables/useLocalizedMarkdown';

const text = useLocalizedMarkdown({ en: text_en, fr: text_fr, ar: text_ar });
</script>

<style scoped lang="scss">
.ref-link {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
</style>
