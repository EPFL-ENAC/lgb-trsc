import { BaseLayerOptions } from 'ol-layerswitcher';
import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { createPMTilesSource } from '@/maps/sources/DjiboutiGeomorphicSource';
import VectorTileLayer from 'ol/layer/VectorTile';

const LayerTitle = 'Djibouti Geomorphic';

export const createDjiboutiGeomorphicLayer = () =>
  new VectorTileLayer({
    declutter: true,
    source: createPMTilesSource(),
    title: LayerTitle,
    visible: true,
    base: false,
    style: geoMorphicStyle,
  } as BaseLayerOptions);
