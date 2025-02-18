<template>
  <q-page class="col items-center justify-center community-page">
    <!-- <h1 class="red-bold">Community</h1> -->
    <p class="q-pa-md">
      <a class="trsc-link" href="https://trsc.org" target="_blank"
        >The Transnational Red Sea Center</a
      >
      relies on many collaborators from the Red Sea region and Gulf of Aden
    </p>
    <div class="logo-row">
      <div
        class="logo-item"
        v-for="community in communities"
        :key="community.name"
      >
        <a :href="community.url" target="_blank" class="logo-item-link">
          <q-img
            :src="community.logo"
            :alt="community.name"
            fit="contain"
            style="height: 150px; width: 150px"
          >
          </q-img>
          <p>{{ community.name}}</p>
        </a>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import communities from '@/assets/communities';
</script>

<style scoped>
.trsc-link {
  color: red;
  font-weight: bold;
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
.red-bold {
  color: red;
  font-weight: bold;
}

.logo-item-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;

  p {
    margin-top: 1rem;
    text-align: center;
    transition: all 0.2s ease;
  }

  &:hover {
    text-decoration: none;

    p {
      text-decoration: underline;
    }
  }
}

.logo-row {
  display: grid;
  grid-auto-flow: row;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 3rem;
  width: 100%;
  justify-content: space-around;
  margin-top: 3rem;
  padding: 0 2rem;
}

.logo-item {
  display: flex;
  justify-content: center;
}
</style>
