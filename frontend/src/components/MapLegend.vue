<template>
  <component 
    :is="legendComponent" 
    v-bind="componentProps"
  />
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';
import DiscreteLegend from './legends/DiscreteLegend.vue';
import ContinuousLegend from './legends/ContinuousLegend.vue';
import SimpleLegend from './legends/SimpleLegend.vue';
import { MapLegendProps } from '@/types/legend';

const props = withDefaults(
  defineProps<MapLegendProps>(),
  {
    selectedCountry: '',
    selectedExpedition: '',
    classColorMap: () => ({}),
    showLegendText: true,
    metadata: () => ({}),
    isContinuous: false,
    isAbsolute: false,
    maxValue: 0,
  }
);

// Determine which legend component to use based on props
const legendComponent = computed(() => {
  if (props.isContinuous && props.classColorMap && Object.keys(props.classColorMap).length > 0) {
    return ContinuousLegend;
  } else if (props.classColorMap && Object.keys(props.classColorMap).length > 0) {
    return DiscreteLegend;
  } else {
    return SimpleLegend;
  }
});

// Determine the appropriate props for the chosen component
const componentProps = computed(() => {
  if (legendComponent.value === DiscreteLegend) {
    return {
      classColorMap: props.classColorMap,
      showLegendText: props.showLegendText,
      metadata: props.metadata,
      isAbsolute: props.isAbsolute,
      maxValue: props.maxValue
    };
  } else if (legendComponent.value === ContinuousLegend) {
    return {
      classColorMap: props.classColorMap,
      metadata: props.metadata,
      isAbsolute: props.isAbsolute
    };
  } else {
    return {
      color: props.selectedCountry || props.selectedExpedition ? 'blue' : 'yellow',
      text: props.selectedCountry || props.selectedExpedition ? 'Expedition 2023' : 'Countries',
      showLegendText: props.showLegendText,
      isAbsolute: props.isAbsolute,
      metadata: props.metadata
    };
  }
});
</script>
