import WebGLTileLayer from 'ol/layer/WebGLTile';
import XYZ from 'ol/source/XYZ';
import { BaseLayerOptions } from 'ol-layerswitcher';

export const createOSMLayer = () =>
  new WebGLTileLayer({
    base: true,
    type: 'base',
    title: 'OSM',
    visible: false,
    source: new XYZ({
      url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    }),
  } as BaseLayerOptions);
