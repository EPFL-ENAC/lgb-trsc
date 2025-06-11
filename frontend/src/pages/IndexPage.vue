<template>
  <q-page class="row items-center justify-evenly about-page">
    <div class="left-element">
      <q-img
        loading="lazy"
        fit="cover"
        position="center"
        spinner-color="white"
        placeholder-color="blue-grey-2"
        src="/splash-about-800w.webp"
        srcset="/splash-about-400w.webp 400w,
          /splash-about-800w.webp 800w,
          /splash-about-1200w.webp 1200w,
          /splash-about-1600w.webp 1600w,
          /splash-about-2400w.webp 2400w,
          /splash-about-3200w.webp 3200w"
        sizes="(max-width: 480px) 400px,
         (max-width: 768px) 800px,
         (max-width: 1024px) 1200px,
         (max-width: 1440px) 1600px,
         (max-width: 2048px) 2400px,
         3200px"
        alt="Guilhem Banc-Prandi | TRSC"
        style="height: 100%"
      >
        <div class="absolute-bottom-right text-subtitle2">
          Guilhem Banc-Prandi | TRSC
        </div>
      </q-img>
    </div>
    <div class="right-element">
      <div class="markdown-container q-pl-md q-pr-md">
        <q-markdown :src="welcome" />
      </div>
      <q-btn
        class="q-ml-md q-mr-md text-h6 text-weight-bolder"
        width="100%"
        color="primary"
        elevation="2"
        :to="{ path: '/map' }"
        :target="'_self'"
        :replace="true"
        :aria-label="$t('aboutPage.diveIntoData')"
        :title="$t('aboutPage.diveIntoData')"
        :text-color="'white'"
        :ripple="true"
        :no-caps="true"
        :no-wrap="true"
        :disable="false"
        :disable-ripple="false"
        :label="$t('aboutPage.diveIntoData')"
      />
      <p class="q-pa-md">
        {{ $t('aboutPage.contactUs') }}
      </p>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import welcome_en from 'src/assets/i18n/welcome_en.md';
import welcome_fr from 'src/assets/i18n/welcome_fr.md';
import welcome_ar from 'src/assets/i18n/welcome_ar.md';
import { useLocalizedMarkdown } from 'src/composables/useLocalizedMarkdown';
import { useI18n } from 'vue-i18n';
const welcome = useLocalizedMarkdown({
  en: welcome_en,
  fr: welcome_fr,
  ar: welcome_ar,
});

const { t: $t } = useI18n({
  useScope: 'local',
});
</script>

<i18n lang="yaml">
en:
  aboutPage:
    contactUs:
      'If you wish to collaborate with us, feel free to contact us and we will
      do our best to come back to you shortly!'
    diveIntoData: 'Dive into the data'
fr:
  aboutPage:
    contactUs: "Si vous souhaitez collaborer avec nous, n'hésitez pas à nous
      contacter et nous ferons de notre mieux pour vous répondre rapidement !"
    diveIntoData: 'Plongez dans les données'
ar:
  aboutPage:
    contactUs: 'إذا كنت ترغب في التعاون معنا، فلا تتردد في الاتصال بنا وسنبذل قصارى جهدنا للرد عليك في أقرب وقت ممكن!'
    diveIntoData: 'الغوص في البيانات'
</i18n>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 1rem;
}

.left-element {
  /* background-image: url('/splash-about.webp');
  background-size: cover;
  background-position: center; */
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
