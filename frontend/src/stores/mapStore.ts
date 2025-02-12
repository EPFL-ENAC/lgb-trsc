import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { classColorMap as geomorphicColorMap } from '@/maps/styles/geomorphicLayerStyle';
import { classColorMap as benthicColorMap } from '@/maps/styles/benthicLayerStyle';

interface CountryProperties {
  name: string;
  coastline?: object;
  [key: string]: unknown;
}

interface ExpeditionProperties {
  country: string;
  date_iso: string;
  reef_area: string;
  sampling_site_name: string;
  [key: string]: unknown;
}

export const useMapStore = defineStore('map', () => {
  const selectedCountry = ref<CountryProperties | null>(null);
  const selectedExpedition = ref<ExpeditionProperties | null>(null);

  const hoveredExpedition = ref<ExpeditionProperties | null>(null);
  const hoveredExpeditionPixel = ref<[number, number] | null>(null);
  const rawTooltipContent = ref<string>('');
  const tooltipPosition = ref({ x: 0, y: 0 });
  const _drawer = ref<boolean>(false);
  const drawer = computed({
    get: () => _drawer.value,
    set: (value: boolean) => {
      _drawer.value = value;
    },
  });

  // Add state for class visibility
  const visibleClasses = ref<{ [key: string]: boolean }>({});

  function closeDrawer() {
    drawer.value = false;
    selectedCountry.value = null;
    selectedExpedition.value = null;

    // does this mean that layers should be in the store?
    const layerController = useLayerController();
    // layerController.resetLayers();
    // coastlineLayer.value.getSource().clear();
    // expeditionsLayer.value.getSource().clear();
    // countryLayer.value.setStyle(countryStyle); // Reset style to show yellow circles
    // TODO find a way for zoomOutOFcountry to be called
    // zoomOutOfCountry();
    layerController.showCountryLayer();
    const mapController = useMapController();
    mapController.zoomOutOfCountry();
  }

  function closeExpedition() {
    selectedExpedition.value = null;
  }

  function selectCountry(properties: CountryProperties) {
    selectedCountry.value = properties;
    drawer.value = true;
  }

  function selectExpedition(properties: ExpeditionProperties) {
    selectedExpedition.value = properties;
    drawer.value = true;
  }

  function onHover(properties: ExpeditionProperties | null, pixel: [number, number] | null) {
    if (!properties) {
      hoveredExpedition.value = null;
      hoveredExpeditionPixel.value = null;
      return;
    }
    console.log('Hovering over:', properties);
    hoveredExpedition.value = properties;
    hoveredExpeditionPixel.value = pixel;
  }
  
  function setClassVisibility(className: string, isVisible: boolean) {
    visibleClasses.value[className] = isVisible;
    const layerController = useLayerController();
    layerController.updateLayerVisibility();
  }

  function setAllClassesVisibility(layerType: 'Geomorphic' | 'Benthic', isVisible: boolean) {
    const colorMap = layerType === 'Geomorphic' ? geomorphicColorMap : benthicColorMap;
    // Set visibility for all classes in the color map
    Object.keys(colorMap).forEach(className => {
      visibleClasses.value[className] = isVisible;
    });
    const layerController = useLayerController();
    layerController.updateLayerVisibility();
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
    visibleClasses,
    closeDrawer,
    closeExpedition,
    selectCountry,
    selectExpedition,
    setClassVisibility,
    setAllClassesVisibility
  };
});
