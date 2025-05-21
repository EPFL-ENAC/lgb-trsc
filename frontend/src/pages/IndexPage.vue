<template>
  <q-page class="row items-center justify-evenly about-page">
    <div class="left-element">
      <!-- <q-img
        loading="lazy"
        spinner-color="white"
        src="/splash-about.jpg"
        srcset="/splash-about.webp 300w,
                /splash-about-full-size.webp 2x,
                /splash-about-full-size.webp 2x"
        style="background-position: cover; background-position: center;"
      >
        <div class="absolute-bottom text-body1 text-center">
          https://www.guilhembanc-prandi.com/
        </div>
      </q-img> -->
    </div>
    <div class="right-element">
      <div class="markdown-container q-pa-md">
        <q-markdown :src="welcome" />
      </div>
      <q-btn
        class="q-ma-md"
        label="Dive into the data"
        @click="navigateToMap"
      />
      <p class="q-pa-md">
        {{ $t('aboutPage.contactUs') }}
      </p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import welcome_en from 'src/assets/i18n/welcome_en.md';
import welcome_fr from 'src/assets/i18n/welcome_fr.md';
import welcome_ar from 'src/assets/i18n/welcome_ar.md';
import { useLocalizedMarkdown } from 'src/composables/useLocalizedMarkdown';
import { useI18n } from 'vue-i18n';
const welcome = useLocalizedMarkdown({ en: welcome_en, fr: welcome_fr, ar: welcome_ar });

const { t: $t } = useI18n({
  useScope: 'local',
});
const router = useRouter();

function navigateToMap() {
  router.push('/map');
}
</script>

<i18n lang="yaml">
en:
  aboutPage:
    contactUs: "If you wish to collaborate with us, feel free to contact us and we will
        do our best to come back to you shortly!"
fr:
  aboutPage:
    contactUs: "Si vous souhaitez collaborer avec nous, n'hésitez pas à nous
        contacter et nous ferons de notre mieux pour vous répondre rapidement !"
ar:
  aboutPage:
    contactUs: "إذا كنت ترغب في التعاون معنا، فلا تتردد في الاتصال بنا وسنبذل قصارى جهدنا للرد عليك في أقرب وقت ممكن!"
</i18n>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 1rem;
}

.left-element {
  background-image: url('/splash-about.webp');
  background-size: cover;
  background-position: center;
  height: 100%;
}

.right-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.right-element p {
  margin-bottom: 1rem;
}
</style>
