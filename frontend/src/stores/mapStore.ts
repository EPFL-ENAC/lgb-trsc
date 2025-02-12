import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { useLayerStyles } from '@/maps/composables/useLayerStyles';

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

  const { visibleClasses, setClassVisibility, setAllClassesVisibility } = useLayerStyles();

  function closeDrawer() {
    drawer.value = false;
    selectedCountry.value = null;
    selectedExpedition.value = null;

    const layerController = useLayerController();
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
    visibleClasses,
    closeDrawer,
    closeExpedition,
    selectCountry,
    selectExpedition,
    setClassVisibility,
    setAllClassesVisibility
  };
});
