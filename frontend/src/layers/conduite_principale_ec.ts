import { Map } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import { LayerManager } from 'src/layers/models';
import { fileStoreUrl } from 'src/boot/api';

const GEOJSON_URL = `${fileStoreUrl}/geojson/conduite_principale_ec.geojson`;

export class ConduitePrincipaleECLayerManager extends LayerManager {
  data: FeatureCollection | null = null;

  getId(): string {
    return 'conduite_principale_ec';
  }

  async append(map: Map): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;

    map.addSource('conduite_principale_ec', {
      type: 'geojson',
      data: this.data,
    });

    map.addLayer({
      id: 'conduite_principale_ec',
      type: 'line',
      source: 'conduite_principale_ec',
      paint: {
        'line-opacity': 0.8,
        'line-color': 'red',
        'line-width': 5,
      },
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['conduite_principale_ec'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }
}
