<template>
  <div class="about-page">
    <p class="top-element q-pa-md">
     <a class="trsc-link" href="https://trsc.org" target="_blank">The Transnational Red Sea</a>, established in 2019 at <a target="_blank" class="trsc-link" href="https://www.epfl.ch/">the Ecole Polytechnique Federale de Lausanne</a> with support from the Swiss Foreign Ministry, is an independent non-profit organisation dedicated to coral reef conservation in the Red Sea. By drawing on Switzerland's neutrality and scientific expertise, the Center promotes scientific collaboration among Red Sea countries to better understand how the region's corals have developed resilience to climate change. It also develops innovative, cost-effective technologies to enhance coral reef monitoring with higher resolution, standardisation, and scalability. The Center advocates for environmental protection policies by sharing these solutions with Red Sea nations and beyond, supporting science-based efforts to conserve coral reefs globally.
    </p>
    <div class="bottom-element">
      <div class="card" v-for="person in people" :key="person.id">
        <a :href="person.epflPage" target="_blank">
          <q-img :src="person.image" alt="Picture of {{ person.name }}" />
        </a>
        <a class="trsc-link" :href="person.epflPage" target="_blank">
          <div class="name-function">
            <h3>{{ person.name }}</h3>
          </div>
        </a>
        <p class="two-lines" v-if="person.function"><em>{{ person.function }}</em></p>
        <!-- <p>{{ person.description }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const people = ref([
  {
    id: 1,
    name: 'Prof. Anders Meibom',
    function: 'General Director',
    image: 'https://people.epfl.ch/private/common/photos/links/220185.jpg?ts=1734001592',
    epflPage: 'https://people.epfl.ch/anders.meibom',
    description: 'Anders is the director of the TRSC'
  },
  {
    id: 2,
    name: 'Samuel Gardaz',
    function: 'Project Manager',
    image: 'https://people.epfl.ch/private/common/photos/links/336212.jpg?ts=1734001629',
    epflPage: 'https://people.epfl.ch/samuel.gardaz',
    description: 'Chef de projet, Laboratoire de géochimie biologique'
  },
  {
    id: 3,
    name: 'Dr. Guilhem Banc-Prandi',
    function: 'Scientific Director',
    image: '/people/guilhem_x660.webp',
    epflPage: 'https://people.epfl.ch/guilhem.banc-prandi',
    description: 'My work mostly focused on the impact of thermal stress on the resilience of Red Sea coral to anthropogenic heavy metal pollution. I am also interested in the mechanisms of thermal acclimatisation and adaptation in cnidarians. '
  },
  {
    id: 4,
    name: 'Samuel Donck',
    function: 'Science and education officer',
    image: '/people/Donck_x660.webp',
    epflPage: 'https://people.epfl.ch/samuel.donck',
    description: 'Samuel is a research assistant at the TRSC...'
  }
]);
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
.about-page {
  display: grid;
  grid-auto-rows: auto 1fr;
  gap: 1rem;
  /* max-width: 1200px; */
}

.top-element {
  display:inline-block;
  justify-content: center;
  align-items: center;
}
/* .two-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */
.bottom-element {
  display: grid;
    grid-template-columns: repeat(4, minmax(200px, 300px));
    justify-content: center;
    gap: 1rem;
    align-items: self-end;
}

.card {
  /* border: 1px solid #ccc; */
  padding: 1rem;
  text-align: center;
}

.card h3 {
  font-weight: bold;
  height: 2.5rem; /* Adjust this value as needed */
  overflow: hidden;
  text-overflow: ellipsis;
}

.card img {
  width: 100%;
  height: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  margin-bottom: 1rem;
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
</style>
