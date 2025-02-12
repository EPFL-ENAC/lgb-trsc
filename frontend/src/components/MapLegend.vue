<template>
  <div class="legend">
    <ol v-if="classColorMap">
      <li v-for="(color, className) in classColorMap" :key="className">
        <span
          class="legend-color"
          :style="{ 'background-color': color }"
        ></span>
        {{ className }}
      </li>
    </ol>
    <ol v-else>
      <li>
        <span
          class="legend-color"
          :style="{ 'background-color': legendColor }"
        ></span>
        {{ legendText }}
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

interface ClassColorMap {
  [key: string]: string;
}

const props = defineProps<{
  selectedCountry?: string;
  selectedExpedition?: string;
  classColorMap?: ClassColorMap;
}>();

const legendColor = computed(() =>
  props.selectedCountry || props.selectedExpedition ? 'blue' : 'yellow'
);

const legendText = computed(() =>
  props.selectedCountry || props.selectedExpedition
    ? 'Expedition 2023'
    : 'Countries'
);
</script>

<style scoped lang="scss">
.legend {
  position: absolute;
  top: 1.5em;
  left: 3.5em;
  background: white;
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
    ol:first-child {
      list-style-type: decimal;
      padding: 0;
      margin: 0;
    }
  }
  ol {
      list-style-type: none;
      padding: 0;
      margin: 0;
    }
}

.legend-color {
  display: inline-block;
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
</style>
