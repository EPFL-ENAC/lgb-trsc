import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { useLayerStyles } from '@/maps/composables/useLayerStyles';
import DjiboutiExpeditions from '@/assets/data/Expeditions.json';

interface CountryProperties {
  name: string;
  coastline?: object;
  [key: string]: unknown;
}

interface ExpeditionProperties {
  country: string;
  country_abbr: string;
  date_iso: string;
  event_id: string;
  expe_name: string;
  experiment: string;
  geometry: object;
  hard_coral_cover: string;
  locationNameHash: string;
  latitude_start: number;
  length: number;
  longitude_start: number;
  reef_area: string;
  region_name: string;
  sampling_site_name: string;
  type: string;
  year: string;
  time: string;
  [key: string]: unknown;
}

export const useMapStore = defineStore('map', () => {
  const selectedCountry = ref<CountryProperties | null>(null);
  const selectedExpedition = ref<ExpeditionProperties | null>(null);

  const selectedEnvironmentalClusterNumber = ref<number>(3);

  const selectedEnvironmentalClusterClassName = computed(
    () => 'HCl_K' + selectedEnvironmentalClusterNumber.value.toString()
  );

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

  const selectedExpeditionYear = ref<string | null>(null);
  function setSelectedExpeditionYear(year: string) {
    selectedExpeditionYear.value = year;
  }

  const selectedExpeditionDate = ref<string | null>(null);
  function setSelectedExpeditionDate(date: string) {
    selectedExpeditionDate.value = date;
  }

  const selectedExpeditionExperiment = ref<string | null>(null);
  function setSelectedExpeditionExperiment(experiment: string) {
    selectedExpeditionExperiment.value = experiment;
  }

  const {
    visibleClasses,
    setClassVisibility: setClassVisibilityStyle,
    setAllClassesVisibility: setAllClassesVisibilityStyle,
  } = useLayerStyles();

  const selectedExpeditions = computed(() => {
    // If no expedition is selected, return an empty array
    // if expedition selected, find all expedition with same locationNameHash
    let result: any[] = [];
    if (!selectedExpedition.value) return result;
    const selectedExpeditionLocationNameHash =
      selectedExpedition.value.locationNameHash;
    result = DjiboutiExpeditions.features.filter(
      (expedition: any) =>
        expedition.properties.locationNameHash ===
        selectedExpeditionLocationNameHash
    );
    return result;
  });

  const selectedExpeditionsYears = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const years = selectedExpeditions.value.map(
      (expedition: any) => expedition.properties.year
    );
    return [...new Set(years)];
  });


  function formatExpeditionDateTime(dateIso: string, timeStr = '12:00:00 AM'): string {
    let hours = 0, minutes = 0, seconds = 0;

    // Parse the time string (format: "2:00:00 PM")
    const timeParts = timeStr.match(/(\d+):(\d+):(\d+)\s*(AM|PM)/i);
    if (timeParts) {
      hours = parseInt(timeParts[1], 10);
      minutes = parseInt(timeParts[2], 10);
      seconds = parseInt(timeParts[3], 10);
      const isPM = timeParts[4].toUpperCase() === 'PM';
      
      // Convert 12-hour to 24-hour format
      if (isPM && hours < 12) hours += 12;
      if (!isPM && hours === 12) hours = 0;
    }

    // Format as ISO time component
    const time = `T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}Z`;
    const date = new Date(dateIso + time);
    return date.toISOString();
  }

  const selectedExpeditionsDates = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const dates = selectedExpeditions.value.map(
      (expedition: any) => {
        return formatExpeditionDateTime(
          expedition.properties.date_iso, 
          expedition.properties.time || '12:00:00 AM'
        );
      }
    );
    return [...new Set(dates)];
  });



  const selectedExpeditionsExperiments = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const experiments = selectedExpeditions.value.map(
      (expedition: any) => expedition.properties.experiment
    );
    return [...new Set(experiments)];
  });


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
    const mapController = useMapController();
    mapController.zoomToCountry(selectedCountry.value);
  }

  function selectCountry(properties: CountryProperties) {
    selectedCountry.value = properties;
    const layerController = useLayerController();
    layerController.hideCountryLayer();
    drawer.value = true;
  }

  function selectExpedition(properties: ExpeditionProperties) {
    selectedExpedition.value = properties;
    // setup selectedExpeditionYear and selectedExpeditionExperiment
    setSelectedExpeditionYear(properties.year);
    setSelectedExpeditionExperiment(properties.experiment);
    setSelectedExpeditionDate(formatExpeditionDateTime(
      properties.date_iso, 
      properties.time,
    ));
    drawer.value = true;
  }

  function onHover(
    properties: ExpeditionProperties | null,
    pixel: [number, number] | null
  ) {
    if (!properties) {
      hoveredExpedition.value = null;
      hoveredExpeditionPixel.value = null;
      return;
    }
    hoveredExpedition.value = properties;
    hoveredExpeditionPixel.value = pixel;
  }

  function setClassVisibility(className: string, isVisible: boolean) {
    setClassVisibilityStyle(className, isVisible);
    // Refresh the map
    const mapController = useMapController();
    mapController?.refreshMap();
  }

  function setAllClassesVisibility(
    layerType: 'Geomorphic' | 'Benthic',
    isVisible: boolean
  ) {
    setAllClassesVisibilityStyle(layerType, isVisible);
    // Refresh the map
    const mapController = useMapController();
    mapController?.refreshMap();
  }
  function resetAll() {
    selectedCountry.value = null;
    selectedExpedition.value = null;
    selectedEnvironmentalClusterNumber.value = 3;
    hoveredExpedition.value = null;
    hoveredExpeditionPixel.value = null;
    rawTooltipContent.value = '';
    tooltipPosition.value = { x: 0, y: 0 };
    _drawer.value = false;
  }

  return {
    selectedCountry,
    selectedExpedition,
    selectedEnvironmentalClusterNumber,
    selectedEnvironmentalClusterClassName,
    hoveredExpedition,
    hoveredExpeditionPixel,
    onHover,
    drawer,
    selectedExpeditions,
    selectedExpeditionsYears,
    selectedExpeditionsDates,
    selectedExpeditionsExperiments,
    selectedExpeditionYear,
    setSelectedExpeditionYear,
    selectedExpeditionDate,
    setSelectedExpeditionDate,
    selectedExpeditionExperiment,
    setSelectedExpeditionExperiment,
    rawTooltipContent,
    tooltipPosition,
    visibleClasses,
    closeDrawer,
    closeExpedition,
    selectCountry,
    selectExpedition,
    setClassVisibility,
    setAllClassesVisibility,
    resetAll,
  };
});
