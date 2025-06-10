<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      style="height: var(--header-height); border-bottom: 1px solid red"
      class="bg-white text-red APax text-weight-thin"
    >
      <q-toolbar class="clickable" @click="navigateToHome">
        <q-toolbar-title class="toolbar-title">
          <q-avatar class="toolbar-avatar">
          </q-avatar>
          <!-- <q-route-tab to="/" label="Transnational Red Sea Center" /> -->
          <div class="text-red">
            {{ titleLines[0] }}<br />{{ titleLines[1] }}<br />{{
              titleLines[2]
            }}
          </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-tabs align="left" class="q-pr-sm gt-sm" dense  :mobile-arrows="true" :shrink="true" active-color="red" >
        <!-- // start dropping tab progressively starting at lt.1280px -->
        <q-route-tab to="/about" :label="t('layout.header.menu.about')" />
        <q-route-tab
          to="/the-red-sea"
          :label="t('layout.header.menu.theRedSea')"
        />
        <q-route-tab
          to="/community"
          :label="t('layout.header.menu.community')"
        />
        <q-btn-dropdown
          flat
          :label="t('layout.header.menu.researchProjects')"
          no-caps
          class="q-ml-md research-projects-dropdown"
        >
          <q-list>
            <q-item
              v-for="project in researchProjects"
              :key="project.page"
              @click="() => navigateToProject(project.page)"
            >
              <q-item-section>
                <q-route-tab
                  :to="{ name: project.page }"
                  :label="t(`layout.header.projects.${project.translationKey}`)"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-route-tab to="/map" :label="t('layout.header.menu.map')" />
        <q-route-tab
          to="/resources"
          :label="t('layout.header.menu.resources')"
        />
        <q-route-tab
          to="/contact-us"
          :label="t('layout.header.menu.contactUs')"
        />
      <q-btn
        v-if="$q.screen.lt.lg"
        flat
        round
        icon="more_vert"
        class="q-ml-md"
        :aria-controls="'navbar-menu'"
      >
        <q-menu>
          <q-item clickable @click="$router.push('/about')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.about') }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-item clickable @click="$router.push('/the-red-sea')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.theRedSea') }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-item clickable @click="$router.push('/community')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.community') }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <!-- Replace nested dropdown with expansion item -->
          <q-expansion-item
            :label="t('layout.header.menu.researchProjects')"
            dense
          >
            <q-item
              v-for="project in researchProjects"
              :key="project.page"
              clickable
              @click="navigateToProject(project.page)"
              class="q-pl-md"
            >
              <q-item-section>
                <q-item-label>{{ t(`layout.header.projects.${project.translationKey}`) }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-expansion-item>
          
          <q-item clickable @click="$router.push('/map')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.map') }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-item clickable @click="$router.push('/resources')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.resources') }}</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-item clickable @click="$router.push('/contact-us')">
            <q-item-section>
              <q-item-label>{{ t('layout.header.menu.contactUs') }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-menu>
      </q-btn>
      <q-btn v-if="$q.screen.lt.lg" flat round icon="translate">
        <q-menu>
          <q-list>
            <q-item v-close-popup clickable @click="lang = 'en-US'">
              <q-item-section>
          <q-item-label>En</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="lang = 'fr'">
              <q-item-section>
          <q-item-label>Fr</q-item-label>
              </q-item-section>
            </q-item>
            <q-item v-close-popup clickable @click="lang = 'ar'">
              <q-item-section>
          <q-item-label>العربية</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>  
        <q-btn-toggle v-if="$q.screen.gt.md"
          v-model="lang"
          :aria-label="t('layout.header.menu.language')"
          :aria-haspopup="true"
          :aria-expanded="false"
          :aria-controls="'language-menu'"
          flat
          dense
          :options="[
            { label: 'En', value: 'en-US' },
            { label: 'Fr', value: 'fr' },
            { label: 'العربية', value: 'ar' },
          ]"
        />
      </q-tabs>

      <q-btn-dropdown class="lt-md" flat icon="menu" dropdown-icon="none">
        <q-list>
          <q-item v-close-popup clickable @click="selectTab('home')">
            <q-item-section>
              <q-item-label>Home</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup clickable @click="selectTab('about')">
            <q-item-section>
              <q-item-label>About</q-item-label>
            </q-item-section>
          </q-item>
          <!-- Add other menu items -->
        </q-list>
      </q-btn-dropdown>
    </q-header>

    <q-footer
      class="bg-white text-red q-row row align-right"
      style="border-top: 1px solid red"
    >
      <q-toolbar>
        <q-toolbar-title class="row pd-x text-red toolbar-footer">
          <span class="footer-text">
            {{ t('layout.footer.developedBy') }}
          </span>
          <q-avatar style="border-radius: 0%; width: auto; height: auto">
            <img style="width: auto" src="/EPFL_logo.png" />
          </q-avatar>
          <q-avatar
            style="
              border-radius: 0%;
              width: 118px;
              height: auto;
              margin-left: 1rem;
            "
          >
            <q-img fit="scale-down" src="/fdfa.png" />
          </q-avatar>
          <!-- <div>Sponsors</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
    <transition name="slide-left" mode="out-in">
      <MapLeftPanel
        v-if="$route.name === 'map' && !leftMiniDrawer"
        class="layer-selector-panel"
      />
    </transition>

    <MapRightPanel v-if="$route.name === 'map'" class="info-panel" />
    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { locale, t } = useI18n();
const lang = ref(locale.value);
const router = useRouter();
import { Quasar } from 'quasar';
import { useMapStore } from 'stores/mapStore';
import { storeToRefs } from 'pinia';
import langEn from 'quasar/lang/en-US';
import langFr from 'quasar/lang/fr';
import langAr from 'quasar/lang/ar';

import MapRightPanel from 'components/MapRightPanel.vue';
import MapLeftPanel from 'components/MapLeftPanel.vue';

const { leftDrawerOpen, leftMiniDrawer } = storeToRefs(useMapStore());
// Split the title into three lines for display
const titleLines = computed(() => {
  const title = t('layout.header.title');
  const words = title.split(' ');

  // For Arabic, handle the title differently
  if (locale.value === 'ar') {
    // Simple approach for Arabic - split by spaces into 3 roughly equal parts
    const third = Math.ceil(words.length / 3);
    return [
      words.slice(0, third).join(' '),
      words.slice(third, third * 2).join(' '),
      words.slice(third * 2).join(' '),
    ];
  }

  // For English and French, hardcode the splits for better appearance
  if (title === 'Transnational Red Sea Center') {
    return ['Transnational', 'Red Sea', 'Center'];
  } else if (title === 'Centre Transnational de la Mer Rouge') {
    return ['Centre', 'Transnational', 'de la Mer Rouge'];
  } else {
    // Fallback logic for other languages - split evenly
    const third = Math.ceil(words.length / 3);
    return [
      words.slice(0, third).join(' '),
      words.slice(third, third * 2).join(' '),
      words.slice(third * 2).join(' '),
    ];
  }
});

watch(lang, (newLang) => {
  locale.value = newLang;
  if (newLang.includes('ar')) {
    document.documentElement.setAttribute('dir', 'rtl');
    Quasar.lang.set(langAr);
  } else {
    document.documentElement.removeAttribute('dir');
    if (newLang.includes('fr')) {
      Quasar.lang.set(langFr);
    } else {
      Quasar.lang.set(langEn);
    }
  }
});

function navigateToHome() {
  router.push('/');
}

function navigateToProject(page: string) {
  router.push(`/research-projects/${page}`);
}

const researchProjects = ref([
  { name: '3D mapping', page: '3d_mapping', translationKey: '3dMapping' },
  {
    name: 'Seascape Genomics',
    page: 'seascape_genomics',
    translationKey: 'seascapeGenomics',
  },
  { name: 'eDNA', page: 'edna', translationKey: 'edna' },
  {
    name: 'echinoderm population genetics',
    page: 'echinoderm_population_genetics',
    translationKey: 'echinodermPopulationGenetics',
  },
  {
    name: 'marine pollution',
    page: 'marine_pollution',
    translationKey: 'marinePollution',
  },
  {
    name: 'socio economics',
    page: 'socio_economics',
    translationKey: 'socioEconomics',
  },
]);
</script>

<style lang="scss" scoped>
/* Slide animation for MapLeftPanel */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.1s ease-in-out, opacity 0.1s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-to,
.slide-left-leave-from {
  transform: translateX(0);
  opacity: 1;
}

.toolbar-footer {
  display: flex;
  flex-direction: row;
  justify-content: right;
  align-items: center;
  gap: 1rem;
}
.footer-text {
  font-size: 0.8rem;
}
:root {
  --info: #46789a;
  --success: #8aa231;
  --warn: #e6ba1a;
  --error: #dc0f0e;
  --size-01: calc(1.58980583rem + 3.88349515vw);
  --size-02: calc(1.58980583rem + 3.88349515vw);
  --size-03: calc(1.04308252rem + 1.6828479vw);
  --size-05: calc(0.92516181rem + 1.20819849vw);
  --size-06: calc(0.85012136rem + 0.90614887vw);
  --size-07: calc(1.14691235rem + 0.39840637vw);
  --size-08: calc(0.81796117rem + 0.77669903vw);
  --size-09: calc(0.8072411rem + 0.73354908vw);
  --size-10: calc(0.72148058rem + 0.38834951vw);
  --line-height-05: 1.34210526em;
  --line-height-06: calc(1.14285714 * var(--size-08));
  --pad-x: calc(0.52664343rem + 0.86321381vw);
  --pad-y: calc(0.7375498rem + 0.5312085vw);
  --black: #2b2e34;
  --white: #ffffff;
  --red: rgb(255, 67, 44);
  --gold: #c5ae8f;
  --gold2: #a69176;
  --blue: #567888;
  --column-gap: 1rem;
  --row-gap: 1rem;
}
:deep(.q-header) {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.research-projects-dropdown {
  text-transform: uppercase;
  white-space: nowrap;
}
.toolbar-title {
  -webkit-text-size-adjust: 100%;

  text-rendering: geometricPrecision;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  background-origin: padding-box;
  background-repeat: no-repeat;
  background-color: transparent;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.25);
  position: relative;
  height: auto;
  vertical-align: top;
  overflow: visible;
  break-inside: avoid;
  font-family: Apax, Helvetica, Arial, sans-serif;
  text-transform: none;
  font-style: normal;
  font-weight: 200;
  font-size: calc(1.14691235rem + 0.39840637vw);
  line-height: 1em;
  --line-height: 1em;
  margin: 0;
  display: grid;
  align-content: stretch;
  grid-template-columns: min-content min-content max-content;
  color: #ff432c;
  stroke: rgb(255, 67, 44);
  text-decoration-color: rgb(255, 67, 44);
  text-decoration-line: none;
  text-decoration-style: solid;
  text-decoration-thickness: auto;
  text-rendering: geometricprecision;
  text-size-adjust: 100%;
  text-transform: none;
  .toolbar-avatar {
    border-radius: 0%;
    width: 3.76923077em;
    height: 2.80769231em;
    margin-left: 0;
    margin-right: 0.25em;
    @media screen and (max-width: 600px) {
      width: 3em;
      height: 2em;
      margin-left: 0;
      margin-right: 0.2em;
    }
    background-image: url('/trsc.svg');
    background-size: contain;
    background-repeat: no-repeat;
    max-height: 76px;
    max-width:min-content
  }
}
.clickable {
  cursor: pointer;
}

/* i18n-specific styles */
[dir='rtl'] .toolbar-title {
  /* Adjust title for RTL languages */
  text-align: right;
}

[dir='rtl'] .toolbar-footer {
  flex-direction: row-reverse;
}

[dir='rtl'] .q-tabs {
  justify-content: flex-end;
}

/* Dark mode adjustments can be added here if needed */
.dark-mode .text-red {
  color: #ff6b6b;
}
</style>
