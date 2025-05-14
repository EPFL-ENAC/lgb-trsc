<template>
  <div class="about-page">
    <p class="top-element q-pa-md">
      <q-markdown :src="about" />
    </p>
    <div class="bottom-element">
      <div v-for="person in people" :key="person.id" class="card">
        <a :href="person.epflPage" target="_blank">
          <q-img
            :ratio="1 / 1"
            :fit="'cover'"
            :position="'top center'"
            :src="person.image"
            alt="Picture of {{ person.name }}"
          />
        </a>
        <a class="trsc-link" :href="person.epflPage" target="_blank">
          <div class="name-function">
            <h3>{{ person.name }}</h3>
          </div>
        </a>
        <p v-if="person.function" class="two-lines">
          <em>{{ t(person.function) }}</em>
        </p>
        <!-- <p v-if="person.description" class="two-lines">
          {{ t(person.description) }}
        </p> -->
      </div>
    </div>
    <q-img
      class="fade-in-from-bottom"
      fit="cover"
      src="/background-about-cropped.webp"
      srcset="/background-about-cropped.webp 1080w, /background-about-cropped-2500.webp 2500w, /background-about-cropped-full-size.webp 9210w"
      sizes="(min-width: 2500px) 9210px,  1080px"
      alt="bg"
      style="height: 100%; width: 100%"
    >
      <div class="absolute-bottom-right text-subtitle2">
        Guilhem Banc-Prandi | TRSC
      </div>
    </q-img>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale, t } = useI18n();


import about_fr from 'src/assets/i18n/about_fr.md';
import about_en from 'src/assets/i18n/about_en.md';
import about_ar from 'src/assets/i18n/about_ar.md';

import { watch } from 'vue';

// Create a reactive reference for the current about text
const about = ref(about_en);

// Watch for locale changes and update content accordingly
watch(locale, (newLocale) => {
  switch(newLocale) {
    case 'fr':
      about.value = about_fr;
      break;
    case 'ar':
      about.value = about_ar;
      break;
    case 'en':
    default:
      about.value = about_en;
      break;
  }
}, { immediate: true });

const people = ref([
  {
    id: 1,
    name: 'Prof. Anders Meibom',
    function: 'people.1.function',
    image: 'https://people.epfl.ch/private/common/photos/links/220185.jpg?ts=1734001592',
    epflPage: 'https://people.epfl.ch/anders.meibom',
    description: 'people.1.description',
  },
  {
    id: 2,
    name: 'Samuel Gardaz',
    function: 'people.2.function',
    image: 'https://people.epfl.ch/private/common/photos/links/336212.jpg?ts=1734001629',
    epflPage: 'https://people.epfl.ch/samuel.gardaz',
    description: 'people.2.description',
  },
  {
    id: 3,
    name: 'Dr. Guilhem Banc-Prandi',
    function: 'people.3.function',
    image: '/people/guilhem_x660.webp',
    epflPage: 'https://people.epfl.ch/guilhem.banc-prandi',
    description: 'people.3.description',
  },
  {
    id: 4,
    name: 'Samuel Donck',
    function: 'people.4.function',
    image: '/people/Donck_x660.webp',
    epflPage: 'https://people.epfl.ch/samuel.donck',
    description: 'people.4.description',
  },
]);
</script>

<i18n lang="yaml">
en:
  people:
    1:
      function: "General Director"
      description: "Anders is the director of the TRSC."
    2:
      function: "Project Manager and Communication Director"
      description: "Project manager, Laboratory of Biological Geochemistry."
    3:
      function: "Scientific Director"
      description: "My work mostly focused on the impact of thermal stress on the resilience of Red Sea coral to anthropogenic heavy metal pollution. I am also interested in the mechanisms of thermal acclimatisation and adaptation in cnidarians."
    4:
      function: "Science and education officer"
      description: "Samuel is a research assistant at the TRSC."
fr:
  people:
    1:
      function: "Directeur général"
      description: "Anders est le directeur du TRSC."
    2:
      function: "Chef de projet et directeur de la communication"
      description: "Chef de projet, Laboratoire de géochimie biologique."
    3:
      function: "Directeur scientifique"
      description: "Mon travail porte principalement sur l'impact du stress thermique sur la résilience des coraux de la mer Rouge à la pollution anthropique par les métaux lourds. Je m'intéresse également aux mécanismes d'acclimatation et d'adaptation thermique chez les cnidaires."
    4:
      function: "Responsable scientifique et pédagogique"
      description: "Samuel est assistant de recherche au TRSC."
ar:
  people:
    1:
      function: "المدير العام"
      description: "أندرس هو مدير مركز TRSC."
    2:
      function: "مدير المشروع ومدير الاتصالات"
      description: "مدير المشروع، مختبر الكيمياء الجيولوجية الحيوية."
    3:
      function: "المدير العلمي"
      description: "تركز عملي في الغالب على تأثير الإجهاد الحراري على قدرة الشعاب المرجانية في البحر الأحمر على مقاومة التلوث البشري بالمعادن الثقيلة. كما أنني مهتم بآليات التكيف والتأقلم الحراري لدى الكائنات اللاسعة."
    4:
      function: "مسؤول العلوم والتعليم"
      description: "صموئيل هو مساعد بحث في مركز TRSC."
</i18n>


<style scoped>
.about-page .card .q-img {
  border-radius: 50%;
  overflow: hidden;
}

/* This targets the inner container of q-img */
.about-page .card :deep(.q-img__content) {
  border-radius: 50%;
}

/* This targets the actual image inside q-img */
.about-page .card :deep(.q-img__image) {
  border-radius: 50%;
}

.about-page .q-img.fade-in-from-bottom,
.about-page .q-img.fade-in-from-bottom :deep(.q-img__content),
.about-page .q-img.fade-in-from-bottom :deep(.q-img__image) {
  border-radius: 0 !important;
  overflow: hidden;
}

.q-img.fade-in-from-bottom {
  border-radius: 0 !important;
  overflow: hidden;
}
.fade-in-from-bottom {
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: linear-gradient(to bottom, white, transparent);
    z-index: 1;
  }
}
.trsc-link, :deep(.q-markdown--link-external) {
  color: red;
  font-weight: bold;
  &:after {
    /* override default styles content: '\e895'*/
    content: none;
    font-family: Material Icons;
    font-size: 1.2rem;
    margin-left: 0.5rem;
  }
  &:hover {
    text-decoration: underline;
  }
  &:visited {
    color: red;
  }
  &:active {
    color: red;
  }
}

.about-page {
  gap: 1rem;
  display: grid;
  grid-template-rows: auto auto 200px;
  height: calc(100vh - 163px);
  align-content: space-between;
  align-items: center;
}

.top-element {
  display: inline-block;
  justify-content: center;
  align-items: center;
  max-width: 1400px;
}
.two-lines {
  display: -webkit-box;
  height: 3rem;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.bottom-element {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 300px));
  justify-content: center;
  gap: 1rem;
  align-items: self-end;
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, minmax(200px, 300px));
  }
  @media screen and (max-width: 850px) {
    grid-template-columns: repeat(1, minmax(200px, 300px));
  }
}

.card {
  /* border: 1px solid #ccc; */
  padding: 1rem;
  text-align: center;
}

.card h3 {
  font-weight: bold;
  height: 2.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: larger;
}

.card p {
  margin-bottom: 0.5rem;
}

.right-element p {
  margin-bottom: 1rem;
}

.name-function {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card .q-img {
  border-radius: 50%;
  overflow: hidden;
}

/* This targets the inner container of q-img */
.card :deep(.q-img__content) {
  border-radius: 50%;
}

/* This targets the actual image inside q-img */
.card :deep(.q-img__image) {
  border-radius: 50%;
}
</style>
