<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h3 q-mb-md">Environmental DNA (eDNA) Research</h1>
      <q-separator class="q-mb-md" />

      <div class="text-body1">
        <p>
          Our eDNA research program uses cutting-edge molecular techniques to
          detect and monitor marine biodiversity in the Red Sea through DNA
          fragments released by organisms into the environment. This
          non-invasive approach allows us to survey biodiversity at
          unprecedented scales.
        </p>

        <h2 class="text-h5 q-mt-lg q-mb-md">Project Goals</h2>
        <ul>
          <li>
            Develop a comprehensive eDNA barcode library for Red Sea species
          </li>
          <li>
            Monitor biodiversity changes across spatial and temporal gradients
          </li>
          <li>Detect rare, elusive, or invasive species</li>
          <li>
            Establish baseline biodiversity data for conservation planning
          </li>
        </ul>

        <h2 class="text-h5 q-mt-lg q-mb-md">Methodology</h2>
        <p>
          We collect water samples from various depths and locations throughout
          the Red Sea. These samples undergo filtration to capture eDNA,
          followed by extraction, amplification using metabarcoding approaches,
          and high-throughput sequencing. Sophisticated bioinformatics pipelines
          analyze the resulting data to identify species and community patterns.
        </p>

        <h2 class="text-h5 q-mt-lg q-mb-md">Applications</h2>
        <p>
          This research supports marine management by providing rapid
          biodiversity assessments, identifying critical habitats, and
          monitoring ecosystem responses to environmental changes and human
          impacts. Our eDNA research also contributes to discovering previously
          unrecorded species in the Red Sea region.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EdnaPage',
});
</script>
