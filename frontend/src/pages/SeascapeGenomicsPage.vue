<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h3 q-mb-md">Seascape Genomics</h1>
      <q-separator class="q-mb-md" />

      <div class="text-body1">
        <p>
          Our Seascape Genomics project investigates the relationship between
          environmental conditions in the Red Sea and the genetic adaptations of
          marine organisms. By linking genomic data with oceanographic
          parameters, we aim to understand how marine life has adapted to the
          unique conditions of the Red Sea ecosystem.
        </p>

        <h2 class="text-h5 q-mt-lg q-mb-md">Research Focus</h2>
        <p>
          We analyze the genomes of various Red Sea species, with particular
          emphasis on:
        </p>
        <ul>
          <li>Coral species and their symbiotic relationships</li>
          <li>Fish populations across temperature gradients</li>
          <li>Invertebrate adaptations to high salinity</li>
          <li>Genetic connectivity between populations</li>
        </ul>

        <h2 class="text-h5 q-mt-lg q-mb-md">Methodology</h2>
        <p>
          Our research combines next-generation sequencing technologies with
          environmental data collection. We employ population genomics
          approaches, genome-wide association studies, and environmental
          association analysis to identify adaptive genetic variants and their
          relationships to specific environmental conditions.
        </p>

        <h2 class="text-h5 q-mt-lg q-mb-md">Significance</h2>
        <p>
          This research provides insights into how marine organisms may respond
          to climate change and identifies genetic resources that could be
          valuable for conservation efforts and biotechnological applications.
          The Red Sea's naturally high temperatures and salinity make it an
          ideal natural laboratory for studying adaptation to extreme
          conditions.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SeascapeGenomicsPage',
});
</script>
