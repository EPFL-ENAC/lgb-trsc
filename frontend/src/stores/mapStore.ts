import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', () => {
  const selectedCountry = ref<any>(undefined);
  const selectedExpedition = ref<any>(undefined);

  const hoveredExpedition = ref<any>(undefined);
  const hoveredExpeditionPixel = ref<any>(undefined);
  const rawTooltipContent = ref<string>('');
  const tooltipPosition = ref({ x: 0, y: 0 });
  const _drawer = ref<boolean>(false);
  const drawer = computed({
    get: () => _drawer.value,
    set: (value: boolean) => {
      _drawer.value = value;
    },
  });

  function closeDrawer() {
    drawer.value = false;
    selectedCountry.value = null;
    selectedExpedition.value = null;

    coastlineLayer.value.getSource().clear();
    expeditionsLayer.value.getSource().clear();
    countryLayer.value.setStyle(countryStyle); // Reset style to show yellow circles
    zoomOutOfCountry();
  }

  function closeExpedition() {
    selectedExpedition.value = undefined;
  }

  function selectCountry(properties: any) {
    selectedCountry.value = properties;
    drawer.value = true;
  }

  function selectExpedition(properties: any) {
    selectedExpedition.value = properties;
    drawer.value = true;
  }

  function zoomToCountry() {
    // zoom to current SelectedCountry
    console.log(`Zooming to country ${selectedCountry.value.name}`);
    // Additional zoom logic can be added here.
  }

  function zoomToExpedition() {
    console.log(`Zooming to expedition ${selectExpedition}`);
    // Additional zoom logic can be added here.
  }

  function onHover(properties: any, pixel: number[]) {
    hoveredExpedition.value = properties;
    hoveredExpeditionPixel.value = pixel;
  }

  return {
    selectedCountry,
    selectedExpedition,
    hoveredExpedition,
    hoveredExpeditionPixel,
    onHover,
    drawer,
    rawTooltipContent,
    tooltipPosition,
    closeDrawer,
    closeExpedition,
    selectCountry,
    selectExpedition,
    zoomToCountry,
    zoomToExpedition,
  };
});
