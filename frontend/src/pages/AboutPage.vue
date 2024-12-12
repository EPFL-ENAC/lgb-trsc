<template>
  <div class="about-page">
    <div class="top-element">
      The Transnational Red Sea Center (link to www.trsc.org) was created...
    </div>
    <div class="bottom-element">
      <div class="card" v-for="person in people" :key="person.id">
        <h3>{{ person.name }}</h3>
        <p v-if="person.function"><em>{{ person.function }}</em></p>
        <a :href="person.epflPage" target="_blank">
          <img :src="person.image" alt="Picture of {{ person.name }}" />
        </a>
        <p>{{ person.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();

const people = ref([
  {
    id: 1,
    name: 'Anders Meibom',
    function: 'Director',
    image: 'https://people.epfl.ch/private/common/photos/links/220185.jpg?ts=1734001592',
    epflPage: 'https://people.epfl.ch/anders.meibom',
    description: 'Anders is the director of the TRSC'
  },
  {
    id: 2,
    name: 'Samuel Gardaz',
    function: 'Director',
    image: 'https://people.epfl.ch/private/common/photos/links/336212.jpg?ts=1734001629',
    epflPage: 'https://people.epfl.ch/samuel.gardaz',
    description: 'Chef de projet, Laboratoire de géochimie biologique'
  },
  {
    id: 3,
    name: 'Guilhem Banc-Prandi',
    function: 'Researcher',
    image: 'https://people.epfl.ch/private/common/photos/links/348498.jpg?ts=1734001660',
    epflPage: 'https://people.epfl.ch/guilhem.banc-prandi',
    description: 'My work mostly focused on the impact of thermal stress on the resilience of Red Sea coral to anthropogenic heavy metal pollution. I am also interested in the mechanisms of thermal acclimatisation and adaptation in cnidarians. '
  },
  {
    id: 4,
    name: 'Samuel Alain C.Donck',
    function: 'Research Assistant',
    image: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTYgMjU2Ij48cGF0aCBkPSJNMTAyLjQzIDEyNC41M1MxMDUuNSAxNTIgMTI4IDE1MnMyNS41Ny0yNy40NiAyNS41Ny0yNy40NiA0Ljg1IDEgNy4xOS05LjI4YzEuNS02LjctLjUtOC40OS0xLjc2LTguNDloLTEuMkMxNjMuNjggNzQuMjggMTQwIDY0IDEyOCA2NHMtMzUuNjggMTAuMjgtMjkuOCA0Mi43Nkg5N2MtMS4yNiAwLTMuMjYgMS43OS0xLjc2IDguNDkgMi4zNCAxMC4zMyA3LjE5IDkuMjggNy4xOSA5LjI4ek0xNzAuMzYgMTY0Yy0yMC4yNi0zLjg5LTI0LjM0LTgtMjUuMS0xMS42NGEyOS4xNSAyOS4xNSAwIDAgMS0zNC41MiAwYy0uNzQgMy42NC00Ljg0IDcuNzItMjUuMSAxMS42NC0yMC44NSA0LTIwLjU3IDIxLjE4LTIwLjU3IDI0aDEyNS44NmMwLTIuODUuMjgtMjAtMjAuNTctMjR6Ii8+PC9zdmc+Cg==',
    epflPage: 'https://people.epfl.ch/samuel.donck',
    description: 'Samuel is a research assistant at the TRSC...'
  }
]);
</script>

<style scoped>
.about-page {
  display: grid;
  grid-auto-rows: 10% 90%;
  gap: 1rem;
}

.top-element {
  display:flex;
  justify-content: center;
  align-items: center;
}

.bottom-element {
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  gap: 1rem;
}

.card {
  border: 1px solid #ccc;
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
</style>
