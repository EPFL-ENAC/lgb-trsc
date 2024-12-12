<template>
  <q-page class="col items-center justify-center community-page">
    <!-- <h1 class="red-bold">Community</h1> -->
    <p>The Transnational Red Sea Center (link to www.trsc.org) relies on many collaborators from the Red Sea region mainly, and beyond….</p>
    <div class="logo-row">
      <a href="url1" target="_blank"><img src="/community/Picture1.jpg" alt="Logo 1" /></a>
      <a href="url2" target="_blank"><img src="/community/Picture2.png" alt="Logo 2" /></a>
      <a href="url3" target="_blank"><img src="/community/Picture3.png" alt="Logo 3" /></a>
      <a href="url4" target="_blank"><img src="/community/Picture4.jpg" alt="Logo 4" /></a>
      <a href="url5" target="_blank"><img src="/community/Picture5.jpg" alt="Logo 5" /></a>
      <a href="url6" target="_blank"><img src="/community/Picture6.jpg" alt="Logo 6" /></a>
      <a href="url7" target="_blank"><img src="/community/Picture7.png" alt="Logo 7" /></a>
    </div>
  </q-page>
</template>

<script setup lang="ts">
</script>

<style scoped>
.red-bold {
  color: red;
  font-weight: bold;
}

.logo-row {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 1rem;
}

.logo-row img {
  max-width: 100px;
  height: auto;
}
</style>
