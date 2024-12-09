import { Map } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import { LayerManager } from 'src/layers/models';
import { fileStoreUrl } from 'src/boot/api';

const GEOJSON_URL = `${fileStoreUrl}/geojson/conduite_ec.geojson`;

export class ConduiteECLayerManager extends LayerManager {
  data: FeatureCollection | null = null;

  getId(): string {
    return 'conduite_ec';
  }

  async append(map: Map): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;

    map.addSource('conduite_ec', {
      type: 'geojson',
      data: this.data,
    });

    map.addLayer({
      id: 'conduite_ec',
      type: 'line',
      source: 'conduite_ec',
      paint: {
        'line-opacity': 0.8,
        'line-color': '#333333',
        'line-width': 2,
      },
      layout: {
        visibility: 'none',
      },
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['conduite_ec'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }
}
