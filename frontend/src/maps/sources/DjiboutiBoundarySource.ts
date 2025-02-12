import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { attributions } from '@/maps/utils/attributions';

const geoFeatures = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "boundary",
        "class": "boundary",
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [43.056554, 12.784825],
              [43.247001, 12.837384],
              [43.570401, 12.339397],
              [43.437448, 11.791221],
              [43.243407, 11.89321],
              [43.290121, 11.657523],
              [43.735695, 11.477985],
              [43.272154, 11.365275],
              [42.894853, 11.516718],
              [42.682846, 11.396979],
              [42.431312, 11.506155],
              [42.503179, 11.734935],
              [42.632539, 11.646965],
              [42.790646, 11.89321],
              [43.034994, 11.89321],
              [43.286527, 12.058421],
              [43.315274, 12.272692],
              [43.056554, 12.784825]
            ]
          ]
        ]
      }
    }
  ]
};


export const createPMTilesSource = () => (new VectorSource({
    features: new GeoJSON().readFeatures(geoFeatures, {
      featureProjection: 'EPSG:3857',
    }),
    attributions: attributions.allenCoralAtlas,
  }));

// pmtiles is too big to be used in the frontend 33k vs 1.5k of the geojson above
// new PMTilesVectorSource({
//   url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti-20250115143859/boundary/boundary.pmtiles',
//   attributions: 'Your Attribution Here',
// });
