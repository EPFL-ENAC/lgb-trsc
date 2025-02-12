import { BaseLayerOptions } from 'ol-layerswitcher';
import { geoMorphicStyle } from '@/maps/styles/geomorphicLayerStyle';
import { benthicStyle  } from '@/maps/styles/benthicLayerStyle';
import { reefExtentLayerStyle } from '@/maps/styles/reefExtentLayerStyle';
import { boundaryLayerStyle } from '@/maps/styles/boundaryLayerStyle';
import { marineProtectedAreaLayerStyle } from '@/maps/styles/marineProtectedAreaLayerStyle';
import VectorLayer from 'ol/layer/Vector';
import { createPMTilesSource as createGeomorphicSource } from '@/maps/sources/DjiboutiGeomorphicSource';
import { createPMTilesSource as createBenthicSource } from '@/maps/sources/DjiboutiBenthicSource';
import { createPMTilesSource as createBoundarySource } from '@/maps/sources/DjiboutiBoundarySource';
import { createPMTilesSource as createReefExtentSource } from '@/maps/sources/DjiboutiReefExtentSource';

import VectorTileLayer from 'ol/layer/VectorTile';
import { createPMTilesSource as createMarineProtectedAreaSource } from '@/maps/sources/DjiboutiMarineProtectedAreaSource';

const LayerTitle = 'Geomorphic';

export const createDjiboutiGeomorphicLayer = () =>
  new VectorTileLayer({
    declutter: true,
    _pmtiles: true,
    source: createGeomorphicSource(),
    title: LayerTitle,
    visible: false,
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
      style: benthicStyle,
    } as BaseLayerOptions);

export const createDjiboutiMarineProtectedAreaLayer = () =>
  new VectorLayer({
    declutter: true,
    _pmtiles: true,
    source: createMarineProtectedAreaSource(),
    title: 'Marine Protected Area',
    visible: false,
    base: false,
    style: marineProtectedAreaLayerStyle,
  } as BaseLayerOptions);

  export const createDjiboutiBoundaryLayer = () =>
    new VectorLayer({
      declutter: true,
      _pmtiles: true,
      source: createBoundarySource(),
      title: 'Boundary',
      visible: false,
      base: false,
      style: boundaryLayerStyle,
    } as BaseLayerOptions);

  export const createDjiboutiReefExtentLayer = () =>
    new VectorTileLayer({
      declutter: true,
      _pmtiles: true,
      source: createReefExtentSource(),
      title: 'Reef Extent',
      visible: false,
      base: false,
      style: reefExtentLayerStyle,
    } as BaseLayerOptions);

