<template>
  <q-page class="row items-center justify-evenly about-page">
    <div class="left-element">
      <!-- <q-img
        loading="lazy"
        spinner-color="white"
        src="/splash-about.jpg"
        srcset="/splash-about.webp 300w,
                /splash-about-full-size.webp 2x,
                /splash-about-full-size.webp 2x"
        style="background-position: cover; background-position: center;"
      >
        <div class="absolute-bottom text-body1 text-center">
          https://www.guilhembanc-prandi.com/
        </div>
      </q-img> -->
    </div>
    <div class="right-element">
      <p>Welcome to our Red Sea Reef data navigator</p>
      <p>On this online platform, you will be able to learn about our work and about the specific research projects we have in collaboration with our many Red Sea partners. You will also be able to learn about the new coral reef monitoring technologies that we are developing and implementing to support science-based conservation in the Red Sea.</p>
      <p>This tool will also allow you to visualise the various data associated with the work conducted by the TRSC in the Red Sea:</p>
      <q-btn label="Dive into the data" @click="navigateToResearchProjects" />
      <p>If you wish to collaborate with us, feel free to contact us and we will do our best to come back to you shortly!</p>
    </div>
  </q-page>
</template>


<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

function navigateToResearchProjects() {
  router.push('/research-projects');
}
</script>

<style scoped>
.about-page {
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 1rem;
}

.left-element {
  background-image: url('/splash-about.webp');
  background-size: cover;
  background-position: center;
  height: 100%;
}

.right-element {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
}

.right-element p {
  margin-bottom: 1rem;
}
</style>
