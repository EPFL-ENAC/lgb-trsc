import { Map, GeoJSONSource } from 'maplibre-gl';
import {
  Feature,
  FeatureCollection,
  GeoJSON,
  GeoJsonProperties,
  Geometry,
} from 'geojson';
import { LayerManager, FeatureSelectionCallback } from 'src/layers/models';
import { fileStoreUrl } from 'src/boot/api';
import { State } from 'src/layers/models';

const GEOJSON_URL = `${fileStoreUrl}/geojson/bv.geojson`;

export class BVLayerManager extends LayerManager {
  data: FeatureCollection | null = null;

  getId(): string {
    return 'bv';
  }

  async append(
    map: Map,
    selectionCallback: FeatureSelectionCallback,
  ): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;

    map.addSource('bv', {
      type: 'geojson',
      data: this.data,
    });

    map.addLayer({
      id: 'bv',
      type: 'fill',
      source: 'bv',
      paint: {
        'fill-opacity': 0.1,
        'fill-color': [
          'case',
          ['boolean', ['has', 'scenarii'], false],
          '#ff0000',
          '#00a79f',
        ],
      },
    });

    map.addLayer({
      id: 'bv-outline',
      type: 'line',
      source: 'bv',
      paint: {
        'line-opacity': 0.8,
        'line-color': '#346EEB',
        'line-width': 1,
      },
    });

    map.addLayer({
      id: 'bv-labels',
      type: 'symbol',
      source: 'bv',
      layout: {
        'text-font': ['Roboto'],
        'text-field': ['get', 'stationName'], // Get the 'name' property from each feature
        'text-size': 14, // Text size
        'text-anchor': 'top', // Anchor text at the top of the point
        'text-offset': [0, 0.5], // Offset text slightly so it doesn't overlap the point
      },
      paint: {
        'text-color': '#000000', // Text color
        'text-halo-color': '#FFFFFF', // Halo color around text for better readability
        'text-halo-width': 2, // Width of the halo around the text
      },
    });

    map.on('click', 'bv', (e) => {
      const feature = e.features ? e.features[0] : null;
      if (!feature) return;
      selectionCallback(this.getId(), feature);
      // TODO highlight the feature as being selected
    });

    map.on('mouseenter', 'bv', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'bv', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['bv', 'bv-outline', 'bv-labels'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }

  applyState(map: Map, state: State): void {
    if (!this.data) return;
    const updatedFeatures = this.data.features.map(
      (feature: Feature<Geometry, GeoJsonProperties>) => {
        const bvScenarii = state.scenarii.filter(
          (s) => s.watershed === feature.properties?.stationName,
        );
        const updatedProperties = {
          ...feature.properties,
          scenarii: bvScenarii.length === 0 ? undefined : bvScenarii,
        };
        return {
          ...feature,
          properties: updatedProperties,
        };
      },
    );
    const updatedData = {
      ...this.data,
      features: updatedFeatures,
    } as GeoJSON;
    (map.getSource(this.getId()) as GeoJSONSource).setData(updatedData);
  }
}
