<template>
  <component 
    :is="legendComponent" 
    v-bind="componentProps"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue';
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
    isSimple: false,
    isContinuous: false,
    isAbsolute: false,
    maxValue: 0,
  }
);

// Determine which legend component to use based on props
const legendComponent = computed(() => {
  if (props.isSimple) {
    return SimpleLegend;
  } else if (props.isContinuous && props.classColorMap && Object.keys(props.classColorMap).length > 0) {
    return ContinuousLegend;
  } else if (props.classColorMap && Object.keys(props.classColorMap).length > 0) {
    return DiscreteLegend;
  } else {
    return SimpleLegend;
  }
});

// Determine the appropriate props for the chosen component
const componentProps = computed(() => {
  const commonProps = {
    classColorMap: props.classColorMap,
    metadata: props.metadata,
    isAbsolute: props.isAbsolute,
    showLegendText: props.showLegendText
  };

  switch (legendComponent.value) {
    case DiscreteLegend:
      return {
        ...commonProps,
        maxValue: props.maxValue
      };
    case ContinuousLegend:
      return commonProps;
    default:
      return {
        ...commonProps,
        color: props.selectedCountry || props.selectedExpedition ? 'blue' : 'yellow',
        text: props.selectedCountry || props.selectedExpedition ? 'Expedition 2023' : 'Countries',
        isSimple: props.isSimple
      };
  }
});
</script>
