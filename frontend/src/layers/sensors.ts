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
import { SensorSpecs } from 'src/utils/options';

const GEOJSON_URL = `${fileStoreUrl}/geojson/sensors.geojson`;

export class SensorsLayerManager extends LayerManager {
  family = ''; // A, B, C or D

  data: FeatureCollection | null = null;

  constructor(family: string) {
    super();
    this.family = family;
  }

  getId(): string {
    return `sensors-${this.family.toLowerCase()}`;
  }

  getIcon() {
    return SensorSpecs.find((opt) => opt.label === this.family)?.icon || '';
  }

  async append(
    map: Map,
    selectionCallback: FeatureSelectionCallback,
  ): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;
    this.data.features = this.data.features.filter(
      (feature: Feature<Geometry, GeoJsonProperties>) => {
        return feature.properties?.name.startsWith(this.family);
      },
    ).map((feature: Feature<Geometry, GeoJsonProperties>) => {
      // include sensor specific color
      const sensorSpec = SensorSpecs.find((opt) => opt.label === this.family);
      const name = feature.properties?.name || '';
      const idx = sensorSpec?.locations.indexOf(name);
      const color = idx !== undefined && idx > -1 ? sensorSpec?.colors[idx] || '#FFFFFF' : '#FFFFFF';
      return {
        ...feature,
        properties: {
          ...feature.properties,
          color: color,
        },
      };
    });

    map.addSource(this.getId(), {
      type: 'geojson',
      data: this.data,
    });

    const color =
      SensorSpecs.find((opt) => opt.label === this.family)?.color || '#FFFFFF';
    map.addLayer({
      id: this.getId(),
      source: this.getId(),
      type: 'circle',
      paint: {
        'circle-radius': [
          'step',
          ['zoom'],
          0, // Radius at zoom levels below 10
          10,
          5, // Radius at zoom level 10 and above
          15,
          8, // Radius at zoom level 15 and above
          17,
          10, // Radius at zoom level 17 and above
        ],
        'circle-color': color,
        'circle-stroke-color': 'black',
        'circle-stroke-width': 1,
        'circle-opacity': ['case', ['get', 'selected'], 1, 0.1],
      },
    });

    map.addLayer({
      id: `${this.getId()}-labels`,
      type: 'symbol',
      source: this.getId(),
      layout: {
        'text-font': ['Roboto'],
        'text-field': ['get', 'name'], // Get the 'name' property from each feature
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

    map.on('click', this.getId(), (e) => {
      const feature = e.features ? e.features[0] : null;
      if (!feature) return;
      selectionCallback(this.getId(), feature);
      // TODO highlight the feature as being selected
    });

  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    [this.getId(), `${this.getId()}-labels`, `${this.getId()}-points`].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }

  applyState(map: Map, state: State): void {
    if (!this.data) return;
    const updatedFeatures = this.data.features.map(
      (feature: Feature<Geometry, GeoJsonProperties>) => {
        const selected =
          state.sensors.length === 0 ||
          state.sensors.includes(feature.properties?.name);
        const updatedProperties = {
          ...feature.properties,
          selected,
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
