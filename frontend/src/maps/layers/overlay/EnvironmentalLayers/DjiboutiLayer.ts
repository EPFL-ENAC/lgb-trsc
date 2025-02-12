import { BaseLayerOptions } from 'ol-layerswitcher';
// import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { createSourceCHL_monthly_mean_1997_2024_Mean, createSourceCHL_monthly_mean_1997_2024_SD } from '@/maps/sources/DjiboutiNOAASource';

import WebGLTileLayer from 'ol/layer/WebGLTile';

const noaaStyle = {
  variables: {
      // Adjust these min/max values based on your data range
      min: 0,
      max: 1
  },
  color: [
    'interpolate',
    ['linear'],
    ['band', 1],
    0, [255, 255, 0, 0.8], // yellow with alpha
    0.5, [255, 128, 0, 0.9], // orange with alpha
    1, [255, 0, 0, 0.8] // red with alpha
  ],
  opacity: 0.3
};

// NOAA Layers
export const createCHL_monthly_mean_1997_2024_MeanLayer = () => {
  const source = createSourceCHL_monthly_mean_1997_2024_Mean();
  const title ='CHL_monthly_mean_1997_2024_Mean';
  const layer = new WebGLTileLayer({
    source: source,
    title,
    visible: false,

    attributions: 'Your Attribution Here',
    base: false,
    opacity: 1, // Layer-level opacity
    style: noaaStyle,
  } as BaseLayerOptions);
  return layer;
}

  export const createCHL_monthly_mean_1997_2024_SD= () =>
    new WebGLTileLayer({
      source: createSourceCHL_monthly_mean_1997_2024_SD(),
      title: 'monthly_mean_1997_2024_SD',
      visible: false,
      base: false,
      style: noaaStyle,
    } as BaseLayerOptions);