import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLayerController } from '@/maps/composables/useLayerController';

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

    // does this mean that layers should be in the store?
    const layerController = useLayerController();
    layerController.resetLayers();
    // coastlineLayer.value.getSource().clear();
    // expeditionsLayer.value.getSource().clear();
    // countryLayer.value.setStyle(countryStyle); // Reset style to show yellow circles
    // TODO find a way for zoomOutOFcountry to be called
    // zoomOutOfCountry();
    layerController.showCountryLayer();
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

  function onHover(properties: any, pixel: number[]) {
    if (!properties) {
      hoveredExpedition.value = null;
      hoveredExpeditionPixel.value = null;
      return;
    }
    console.log('Hovering over:', properties);
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
    selectExpedition
  };
});
