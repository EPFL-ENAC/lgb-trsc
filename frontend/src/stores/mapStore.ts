import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useLayerController } from '@/maps/composables/useLayerController';
import { useMapController } from '@/maps/composables/useMapController';
import { useLayerStyles } from '@/maps/composables/useLayerStyles';
import DjiboutiExpeditions from '@/assets/data/Expeditions.json';
import Djibouti3DMapping from '@/assets/data/dji_3d_mapping_all_results.json';

interface CountryProperties {
  name: string;
  coastline?: object;
  [key: string]: unknown;
}

interface ExpeditionProperties {
  country: string;
  country_abbr: string;
  event_id: string;
  expe_name: string;
  experiment: string;
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
  time?: string | undefined;
  date_iso: string;
  full_date_iso: string;
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

  const selectedExpeditionSubstrateLevel = ref<string>('Substrate_coarse');
  function setSelectedExpeditionSubstrateLevel(substrateLevel: string) {
    selectedExpeditionSubstrateLevel.value = substrateLevel;
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

  const selectedExpeditionsYearsByExperiment = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const years = selectedExpeditions.value
      .filter(
        (expedition: any) =>
          expedition.properties.experiment ===
          selectedExpeditionExperiment.value
      )
      .map((expedition: any) => expedition.properties.year);
    return [...new Set(years)];
  });

  const selectedExpeditionsDatesByExperiment = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const dates = selectedExpeditions.value
      .filter(
        (expedition: any) =>
          expedition.properties.experiment ===
          selectedExpeditionExperiment.value
      )
      .map((expedition: any) => expedition.properties.full_date_iso);
    return [...new Set(dates)];
  });

  const selectedExpeditionsExperimentsByYears = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    const experiments = selectedExpeditions.value
      .filter(
        (expedition: any) =>
          expedition.properties.year === selectedExpeditionYear.value
      )
      .map((expedition: any) => expedition.properties.experiment);
    return [...new Set(experiments)];
  });

  const selectedExpeditionsDates = computed(() => {
    // should be unique years
    if (!selectedExpeditions.value) return [];

    return [...new Set(selectedExpeditions.value.map((expedition: any) => expedition.properties.full_date_iso))];
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

  // function updateSelectedExpeditionDate(index: number, properties: ExpeditionProperties) {
  //   const date = selectedExpeditionsDatesByExperiment.value[index]
  //   selectedExpeditionDate.value = date;
  //   // find the expedition with the same date and properties experiment
  //   const selectedExpedition = DjiboutiExpeditions.features.find(
  //     (expedition: any) =>
  //       expedition.properties.full_date_iso === date &&
  //       expedition.properties.experiment === properties.experiment
  //   );
  //   if (selectedExpedition) {
  //     selectExpedition(selectedExpedition.properties as ExpeditionProperties);
  //   }
  // };

  const dateSliderIndex = computed({
    get: () =>  selectedExpeditionsDatesByExperiment.value.indexOf(selectedExpeditionDate.value),
    set: (index: number) => {
      const date = selectedExpeditionsDatesByExperiment.value[index]
      selectedExpeditionDate.value = date;
      // find the expedition with the same date and properties experiment
      const selectedExpedition = DjiboutiExpeditions.features.find(
        (expedition: any) =>
          expedition.properties.full_date_iso === date &&
          expedition.properties.experiment === selectedExpeditionExperiment.value
      );
      if (selectedExpedition) {
        selectExpedition(selectedExpedition.properties as ExpeditionProperties);
      }
    },
  });

  function selectExpedition(properties: ExpeditionProperties) {
    selectedExpedition.value = properties;
    // setup selectedExpeditionYear and selectedExpeditionExperiment
    setSelectedExpeditionYear(properties.year);
    setSelectedExpeditionExperiment(properties.experiment);
    setSelectedExpeditionDate(properties.full_date_iso);
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



  const sampleSet = computed(() => {
    try {
      const eventID = selectedExpedition.value?.event_id;
      const sampleByIds =
        Djibouti3DMapping?.filter(
          (d3Mapping) => d3Mapping.event_id === eventID
        ) || [];
  
      const result = sampleByIds.filter(
        (d3Mapping) => d3Mapping.date_iso === selectedExpedition.value?.date_iso
      );
      return result.map((x) => ({
        [selectedExpeditionSubstrateLevel.value]: String((x as any)[selectedExpeditionSubstrateLevel.value]),
        mean: Number(x.mean),
      }));
    } catch (error) {
      console.error('Error processing sample set:', error);
      return [];
    }
  });
  
  const isValidSampleSet = computed(() => {
    return sampleSet.value.every(
      (sample) =>
        typeof sample === 'object' &&
        sample !== null &&
        selectedExpeditionSubstrateLevel.value in sample &&
        'mean' in sample &&
        typeof sample.mean === 'number'
    );
  });

  return {
    isValidSampleSet,
    sampleSet,
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
    selectedExpeditionsYearsByExperiment,
    selectedExpeditionsDatesByExperiment,
    // updateSelectedExpeditionDate,
    selectedExpeditionsExperimentsByYears,
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
    selectedExpeditionSubstrateLevel,
    setSelectedExpeditionSubstrateLevel,
    dateSliderIndex,
  };
});
