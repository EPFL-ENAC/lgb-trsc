import { BaseLayerOptions } from 'ol-layerswitcher';
import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { createPMTilesSource as createGeomorphicSource } from '@/maps/sources/DjiboutiGeomorphicSource';
import { createPMTilesSource as createBenthicSource } from '@/maps/sources/DjiboutiBenthicSource';
import { createPMTilesSource as createBoundarySource } from '@/maps/sources/DjiboutiBoundarySource';
import { createPMTilesSource as createReefExtentSource } from '@/maps/sources/DjiboutiReefExtentSource';

import VectorTileLayer from 'ol/layer/VectorTile';

const LayerTitle = 'Geomorphic';

export const createDjiboutiGeomorphicLayer = () =>
  new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createGeomorphicSource(),
    title: LayerTitle,
    visible: true,
    base: false,
    style: geoMorphicStyle,
  } as BaseLayerOptions);

  export const createDjiboutiBenthicLayer = () =>
    new VectorTileLayer({
      declutter: true,
      _pmtiles: true,
      source: createBenthicSource(),
      title: 'Benthic',
      visible: false,
      base: false,
      style: geoMorphicStyle,
    } as BaseLayerOptions);

  export const createDjiboutiBoundaryLayer = () =>
    new VectorTileLayer({
      declutter: true,
      _pmtiles: true,
      source: createBoundarySource(),
      title: 'Boundary',
      visible: false,
      base: false,
      style: geoMorphicStyle,
    } as BaseLayerOptions);

  export const createDjiboutiReefExtentLayer = () =>
    new VectorTileLayer({
      declutter: true,
      _pmtiles: true,
      source: createReefExtentSource(),
      title: 'Reef Extent',
      visible: false,
      base: false,
      style: geoMorphicStyle,
    } as BaseLayerOptions);
