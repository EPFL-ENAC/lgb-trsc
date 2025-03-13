<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h3 q-mb-md">Echinoderm Population Genetics</h1>
      <q-separator class="q-mb-md" />
      
      <div class="text-body1">
        <p>
          Our Echinoderm Population Genetics project investigates the genetic diversity, population structure, 
          and evolutionary history of sea stars, sea urchins, sea cucumbers, and other echinoderms in the Red Sea. 
          These organisms play critical ecological roles in marine ecosystems and serve as valuable indicators 
          of ecosystem health.
        </p>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Research Questions</h2>
        <ul>
          <li>What are the patterns of genetic connectivity among echinoderm populations across the Red Sea?</li>
          <li>How have historical climatic events shaped the current genetic structure of echinoderm species?</li>
          <li>What adaptive genetic variations exist in response to the Red Sea's unique environmental conditions?</li>
          <li>How resilient are echinoderm populations to environmental stressors?</li>
        </ul>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Study Species</h2>
        <p>
          Our research focuses on several key echinoderm species found throughout the Red Sea, including:
        </p>
        <ul>
          <li><i>Acanthaster planci</i> (Crown-of-thorns starfish)</li>
          <li>Various <i>Diadema</i> species (Long-spined sea urchins)</li>
          <li><i>Holothuria</i> species (Sea cucumbers)</li>
          <li>Several brittle star species</li>
        </ul>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Significance</h2>
        <p>
          This research provides insights into population resilience, genetic diversity, and the effects of 
          oceanographic features on gene flow. Our findings contribute to effective conservation strategies 
          and help predict how these ecologically important species may respond to climate change and other 
          anthropogenic pressures.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'EchinodermPopulationGeneticsPage'
});
</script>
