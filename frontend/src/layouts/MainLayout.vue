<template>
  <q-layout view="hHh lpr fFf">
    <q-header  style="height: var(--header-height); border-bottom: 1px solid red;" class="bg-white text-red APax text-weight-thin">
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

    <q-footer class="bg-white text-red q-row row align-right" style="border-top: 1px solid red;">
      <q-toolbar>
        <q-toolbar-title class="row pd-x text-red toolbar-footer">
          <span class="footer-text">
            Developed by the Transnational Red Sea Center at the Ecole Polytechnique Fédérale of Lausanne, Switzerland
          </span>
          <q-avatar style="border-radius: 0%; width: auto; height: auto;">
            <img style="width:auto" src="/EPFL_logo.png">
          </q-avatar>
          <q-avatar style="border-radius: 0%; width: 118px; height: auto; margin-left:1rem;">

            <q-img fit="scale-down" src="/fdfa.png" />
          </q-avatar>
          <!-- <div>Sponsors</div> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-page-container >
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>

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
    font-style: normal;
    font-weight: 200;
    font-size: calc(1.14691235rem + .39840637vw);
    line-height: 1em;
    --line-height: 1em;
    margin: 0;
    display: grid;
    align-content: stretch;
    grid-template-columns: min-content min-content max-content;
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
    }
}
.clickable {
  cursor: pointer;
}
</style>
