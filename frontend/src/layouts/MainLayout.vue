<template>
  <q-layout view="hhh lpR fFf">

    <q-header elevated class="bg-white text-red APax text-weight-thin" height-hint="98">
      <q-toolbar>
        <q-toolbar-title style="display: flex; flex-direction:row">
          <q-avatar>
            <img src="/trsc.svg">
          </q-avatar>
          <div class="text-red">Transnational<br>Red Sea<br>Center</div>

        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/about" label="About" />
        <q-route-tab to="/the-red-sea" label="The Red Sea" />
        <q-route-tab to="/community" label="Community" />
        <q-route-tab to="/research-projects" label="Research Projects" />
        <q-route-tab to="/resources" label="Resources" />
        <q-route-tab to="/contact-us" label="Contact us" />
      </q-tabs>
    </q-header>

    <!-- <header class="site-header header">
      <a class="logo-block block icon-before before text-07 red-fg" href="/en/">Transnational<br>Red Sea<br>Center<span>Bridging Science<br>&amp; Diplomacy for<br>the Future of Corals</span></a>
      <a class="burger-thumb thumb" href="#navigation">Navigation</a>
    </header> -->

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.site-header {
  -webkit-text-size-adjust: 100%;
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
    text-rendering: geometricPrecision;
    --column-gap: 1rem;
    --row-gap: 1rem;
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
    justify-content: center;
    font-family: Apax,Helvetica,Arial,sans-serif;
    text-transform: none;
    font-weight: 200;
    font-size: calc(1.14691235rem + .39840637vw);
    line-height: 1em;
    --line-height: 1em;
    margin: 0;
    display: grid;
    align-content: stretch;
    grid-template-columns: min-content min-content max-content;
    margin-bottom: -.19230769em;
    color: #ff432c;
    stroke: rgb(255,67,44);
    text-decoration: none;
}
</style>
