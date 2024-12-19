<template>
  <q-layout view="hhh lpR fFf">

    <q-header  elevated style="border-bottom: 1px solid red;" class="bg-white text-red APax text-weight-thin" height-hint="98">
      <q-toolbar @click="navigateToHome" class="clickable">
        <q-toolbar-title class="toolbar-title">
          <q-avatar class="toolbar-avatar" >
            <!-- <img src="/trsc.svg"> -->
          </q-avatar>
          <!-- <q-route-tab to="/" label="Transnational Red Sea Center" /> -->
          <div class="text-red">Transnational<br>Red Sea<br>Center</div>

        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" class="q-pr-md">
        <q-route-tab to="/about" label="About" />
        <q-route-tab to="/the-red-sea" label="The Red Sea" />
        <q-route-tab to="/community" label="Community" />
        <q-route-tab to="/research-projects" label="Research Projects" />
        <q-route-tab to="/resources" label="Resources" />
        <q-route-tab to="/contact-us" label="Contact us" />
        <q-btn-toggle v-model="lang" flat :options="[
          {label: 'En', value: 'en-US'},
          {label: 'Fr', value: 'fr'},
          {label: 'العربية', value: 'ar'}
        ]" />
      </q-tabs>

    </q-header>

    <!-- <header class="site-header header">
      <a class="logo-block block icon-before before text-07 red-fg" href="/en/">Transnational<br>Red Sea<br>Center<span>Bridging Science<br>&amp; Diplomacy for<br>the Future of Corals</span></a>
      <a class="burger-thumb thumb" href="#navigation">Navigation</a>
    </header> -->

    <q-page-container style="display: inherit;">
      <q-page class="q-pa-md">
        <router-view />
      </q-page>
    </q-page-container>

    <q-footer  class="bg-white text-red q-row row align-right" style="border-top: 1px solid red;">
      <q-toolbar>
        <q-toolbar-title class="row pd-x text-red justify-end">
          <q-avatar style="border-radius: 0%; width: auto; height: auto;">
            <img style="width:auto" src="/EPFL_logo.png">
          </q-avatar>
          <!-- <div>Sponsors</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { locale } = useI18n();
const lang = ref(locale.value);
const router = useRouter();

watch(lang, (newLang) => {
  locale.value = newLang;
});

function navigateToHome() {
  router.push('/');
}
</script>

<style lang="scss" scoped>
:root {
  --info: #46789a;
    --success: #8aa231;
    --warn: #e6ba1a;
    --error: #DC0F0E;
    --size-01: calc(1.58980583rem + 3.88349515vw);
    --size-02: calc(1.58980583rem + 3.88349515vw);
    --size-03: calc(1.04308252rem + 1.6828479vw);
    --size-05: calc(.92516181rem + 1.20819849vw);
    --size-06: calc(.85012136rem + .90614887vw);
    --size-07: calc(1.14691235rem + .39840637vw);
    --size-08: calc(.81796117rem + .77669903vw);
    --size-09: calc(.8072411rem + .73354908vw);
    --size-10: calc(.72148058rem + .38834951vw);
    --line-height-05: 1.34210526em;
    --line-height-06: calc(1.14285714 * var(--size-08));
    --pad-x: calc(.52664343rem + .86321381vw);
    --pad-y: calc(.7375498rem + .5312085vw);
    --header-height: calc(4.9501992rem + 2.124834vw);
    --nav-height: calc(2.12201195rem + 1.46082337vw);
    --news-height: calc(6.31578947 * var(--size-10));
    --black: #2B2E34;
    --white: #ffffff;
    --red: rgb(255,67,44);
    --gold: #C5AE8F;
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
    padding-left: var(--pad-x);
    padding-right: var(--pad-x);
    padding-top: var(--pad-y);
    padding-bottom: var(--pad-y);
    min-height: var(--header-height);
}

.toolbar-title {
  -webkit-text-size-adjust: 100%;

    text-rendering: geometricPrecision;

    display: flex; flex-direction:row; align-items: center; justify-content: flex-start;
    box-sizing: border-box;
    background-origin: padding-box;
    background-repeat: no-repeat;
    background-color: transparent;
    -webkit-tap-highlight-color: rgba(0,0,0,.25);
    position: relative;
    height: auto;
    vertical-align: top;
    overflow: visible;
    break-inside: avoid;
    font-family: Apax,Helvetica,Arial,sans-serif;
    text-transform: none;
    // font-size 25.5219px
    font-style: normal;
    font-weight: 200;
    font-size: calc(1.14691235rem + .39840637vw);
    line-height: 1em;
    --line-height: 1em;
    margin: 0;
    display: grid;
    align-content: stretch;
    grid-template-columns: min-content min-content max-content;
    // margin-bottom: -.19230769em;
    color: #ff432c;
    stroke: rgb(255,67,44);
    text-decoration-color: rgb(255, 67, 44);
    text-decoration-line: none;
    text-decoration-style: solid;
    text-decoration-thickness: auto;
    text-rendering: geometricprecision;
    text-size-adjust: 100%;
    text-transform: none;
    .toolbar-avatar {
      border-radius:0%;
      width: 3.76923077em;
      height: 2.80769231em;
      margin-left: 0;
      margin-right: .85em;
      background-image: url('/trsc.svg');
      background-size: contain;
      background-repeat: no-repeat;
      max-height: 76px;
      :deep(.q-avatar-content) {

      }
    }
}
.clickable {
  cursor: pointer;
}
</style>
