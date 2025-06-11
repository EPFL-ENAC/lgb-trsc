<template>
  <q-page class="row items-center justify-evenly about-page">
    <div class="image-element">
      <q-img
        loading="lazy"
        fit="cover"
        position="top"
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
        <div class="absolute-bottom-right text-subtitle2 q-pa-none text-white">
          Guilhem Banc-Prandi | TRSC
        </div>
      </q-img>
    </div>
    <div class="text-element">
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
  display: grid !important;
  grid-template-columns: 60% 40%;
  gap: 1rem;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 100%;
    grid-template-rows: 220px 1fr
  }
}

.image-element {
  height: 100%;

}

:deep(.q-img__content) div{
  padding: 0;
  padding-right: 0.2em;
  padding-left: 0.2em;
  @media screen and (min-width: 1024px) {
    padding: 0.5rem;
    
  }
}
.text-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.text-element p {
  margin-bottom: 1rem;
}
</style>
