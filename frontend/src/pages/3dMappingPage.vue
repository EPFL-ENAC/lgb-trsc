<template>
  <q-page padding>
    <div class="q-pa-md">
      <h1 class="text-h3 q-mb-md">3D Mapping</h1>
      <q-separator class="q-mb-md" />
      
      <div class="text-body1">
        <p>
          The 3D Mapping project focuses on creating detailed three-dimensional representations of 
          Red Sea coral reef ecosystems. Using advanced photogrammetry and sonar techniques, our team maps 
          the complex structures of coral reefs to better understand their spatial characteristics and monitor changes over time.
        </p>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Research Objectives</h2>
        <ul>
          <li>Develop high-resolution 3D models of coral reef ecosystems</li>
          <li>Track morphological changes in reef structures</li>
          <li>Create digital twins of reef environments for research and conservation</li>
          <li>Analyze structural complexity as it relates to biodiversity</li>
        </ul>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Methodology</h2>
        <p>
          Our team employs underwater drones equipped with specialized cameras to capture thousands of images 
          from different angles. These images are then processed using specialized software to create accurate 
          3D models of the reef structures. Supplementary data from sonar and lidar technologies enhances the 
          precision of our models.
        </p>
        
        <h2 class="text-h5 q-mt-lg q-mb-md">Current Progress</h2>
        <p>
          To date, we have successfully mapped several key reef sites along the Saudi Arabian coastline. 
          These models serve as baseline data for long-term monitoring programs and provide valuable insights 
          into reef health and resilience factors.
        </p>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: '3dMappingPage'
});
</script>
