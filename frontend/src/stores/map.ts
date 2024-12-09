import { defineStore } from 'pinia';
import { BVLayerManager } from 'src/layers/bv';
import { RiverLayerManager } from 'src/layers/river';
import { ConduiteECLayerManager } from 'src/layers/conduite_ec';
import { ConduitePrincipaleECLayerManager } from 'src/layers/conduite_principale_ec';
import { DebitVHVLayerManager } from 'src/layers/debit_vhv';
import { RejetsECLayerManager } from 'src/layers/rejets_ec';
import { RejetsEULayerManager } from 'src/layers/rejets_eu';
import { MeteoLayerManager } from 'src/layers/meteo';
import { SensorsLayerManager } from 'src/layers/sensors';
import { Map, MapGeoJSONFeature } from 'maplibre-gl';

export type LayerSelection = {
  id: string;
  visible: boolean;
};

const filtersStore = useFiltersStore();
const scenariiStore = useScenariiStore();

export const useMapStore = defineStore('map', () => {
  const showDrawer = ref(false);
  const map = ref<Map>();
  const bvSelected = ref<MapGeoJSONFeature>();
  const sensorSelected = ref<MapGeoJSONFeature>();

  const layerManagers = [
    new RiverLayerManager(),
    new ConduitePrincipaleECLayerManager(),
    new BVLayerManager(),
    new ConduiteECLayerManager(),
    new DebitVHVLayerManager(),
    new RejetsECLayerManager(),
    new RejetsEULayerManager(),
    new MeteoLayerManager(),
    new SensorsLayerManager('A'),
    new SensorsLayerManager('B'),
    new SensorsLayerManager('C'),
  ];

  const layerSelections = ref<LayerSelection[]>(
    layerManagers.map((lm) => ({
      id: lm.getId(),
      visible: [
        'river',
        'sensors-a',
        'sensors-b',
        'sensors-c',
        'conduite_principale_ec',
        'bv',
      ].includes(lm.getId()),
    })),
  );

  /**
   * Find a layer selection state by its identifier.
   * @param id the layer selection state
   * @returns
   */
  function findLayer(id: string) {
    return layerSelections.value.find((l) => l.id === id);
  }

  /**
   * Toggle and apply the visibility of a layer.
   * @param id the layer identifier
   */
  function toggleLayerVisibility(id: string) {
    if (!map.value) return;
    const manager = getLayerManager(id);
    const layer = findLayer(id);
    if (manager && layer) {
      layer.visible = !layer.visible;
      manager.setVisible(map.value, layer.visible);
    }
  }

  /**
   * Apply the visibility of a layer.
   * @param id the layer identifier
   */
  function applyLayerVisibility(id: string) {
    if (!map.value) return;
    const manager = getLayerManager(id);
    const layer = findLayer(id);
    if (manager && layer) {
      manager.setVisible(map.value, layer.visible);
    }
  }

  /**
   * Register the current map and initialize the layers for that map.
   * @param mapInstance the map instance
   * @returns
   */
  async function initLayers(mapInstance: Map) {
    map.value = mapInstance;
    for (const manager of layerSelections.value.map((l) =>
      getLayerManager(l.id),
    )) {
      if (manager) {
        await manager.append(mapInstance, onFeaturesSelected);
      }
    }
    return;
  }

  /**
   * Get the layer manager by its identifier.
   * @param id the layer identifier
   * @returns
   */
  function getLayerManager(id: string) {
    return layerManagers.find((lm) => lm.getId() === id);
  }

  function onFeaturesSelected(name: string, feature: MapGeoJSONFeature) {
    // console.log(name);
    // console.log(feature);
    if (name === 'bv') {
      bvSelected.value = feature;
    } else if (name.startsWith('sensors')) {
      sensorSelected.value = feature;
    }
  }

  /**
   * Apply the application state to the layers.
   *
   * @returns
   */
  function applyState() {
    if (!map.value) return;
    layerSelections.value.map((layer) => {
      if (map.value && layer.visible) {
        const manager = getLayerManager(layer.id);
        if (manager) {
          manager.applyState(map.value, {
            sensors: filtersStore.sensors,
            scenarii: scenariiStore.scenarii,
          });
        }
      }
    });
  }

  return {
    showDrawer,
    map,
    layerSelections,
    bvSelected,
    sensorSelected,
    toggleLayerVisibility,
    applyLayerVisibility,
    initLayers,
    applyState,
  };
});
