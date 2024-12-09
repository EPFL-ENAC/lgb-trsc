import { Map, Popup } from 'maplibre-gl';
import { FeatureCollection } from 'geojson';
import { LayerManager } from 'src/layers/models';
import { fileStoreUrl } from 'src/boot/api';

const GEOJSON_URL = `${fileStoreUrl}/geojson/rejets_ec.geojson`;

export class RejetsECLayerManager extends LayerManager {
  data: FeatureCollection | null = null;

  getId(): string {
    return 'rejets_ec';
  }

  async append(map: Map): Promise<void> {
    const response = await fetch(GEOJSON_URL);
    this.data = (await response.json()) as FeatureCollection;

    map.addSource('rejets_ec', {
      type: 'geojson',
      data: this.data,
    });

    map.addLayer({
      id: 'rejets_ec',
      type: 'circle',
      source: 'rejets_ec',
      paint: {
        'circle-opacity': 0.8,
        'circle-radius': [
          'step',
          ['zoom'],
          2, // Radius at zoom levels below 10
          10,
          5, // Radius at zoom level 10 and above
          15,
          10, // Radius at zoom level 15 and above
        ],
        'circle-color': '#7fffd4',
        'circle-stroke-color': '#318ce7',
        'circle-stroke-width': 1,
      },
      layout: {
        visibility: 'none',
      },
    });

    map.on('click', 'rejets_ec', (e) => {
      const feature = e.features ? e.features[0] : null;
      if (!feature) return;
      new Popup()
        .setLngLat(e.lngLat)
        .setHTML(`<pre>${JSON.stringify(feature.properties, null, 2)}</pre>`)
        .addTo(map);
    });

    map.on('mouseenter', 'rejets_ec', () => {
      map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'rejets_ec', () => {
      map.getCanvas().style.cursor = '';
    });
  }

  setVisible(map: Map, visible: boolean): void {
    const visibility = visible ? 'visible' : 'none';
    ['rejets_ec'].forEach((id) => {
      map.setLayoutProperty(id, 'visibility', visibility);
    });
  }
}
