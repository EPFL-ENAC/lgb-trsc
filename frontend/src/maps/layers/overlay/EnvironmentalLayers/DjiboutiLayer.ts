import { BaseLayerOptions } from 'ol-layerswitcher';
// import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { CHL_monthly_mean_1997_2024_Mean, CHL_monthly_mean_1997_2024_SD } from '@/maps/sources/DjiboutiNOAASource';

import TileLayer from 'ol/layer/Tile';

// NOAA Layers
export const createCHL_monthly_mean_1997_2024_MeanLayer = () =>
  new TileLayer({
    declutter: true,
    _pmtiles: true,
    source: CHL_monthly_mean_1997_2024_Mean,
    title: 'CHL_monthly_mean_1997_2024_Mean',
    visible: true,
    base: false,
    // style: geoMorphicStyle,
  } as BaseLayerOptions);

  export const createCHL_monthly_mean_1997_2024_SD= () =>
    new TileLayer({
      declutter: true,
      _pmtiles: true,
      source: CHL_monthly_mean_1997_2024_SD,
      title: 'monthly_mean_1997_2024_SD',
      visible: true,
      base: false,
      // style: geoMorphicStyle,
    } as BaseLayerOptions);