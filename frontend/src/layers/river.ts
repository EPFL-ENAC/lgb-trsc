import { Map } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import { LayerManager } from 'src/layers/models';
import { fileStoreUrl } from 'src/boot/api';

const GEOJSON_URL = `${fileStoreUrl}/geojson/river.geojson`;

export class RiverLayerManager extends LayerManager {
  data: FeatureCollection | null = null;

  getId(): string {
    return 'river';
  }

  async append(map: Map): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;

    map.addSource('river', {
      type: 'geojson',
      data: this.data,
    });

    map.addLayer({
      id: 'river',
      type: 'line',
      source: 'river',
      paint: {
        'line-opacity': 0.8,
        'line-color': '#33C9EB',
        'line-width': 5,
      },
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['river'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }
}
