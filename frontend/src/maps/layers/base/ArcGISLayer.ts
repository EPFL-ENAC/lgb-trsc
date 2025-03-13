import XYZ from 'ol/source/XYZ';
import { BaseLayerOptions } from 'ol-layerswitcher';
import WebGLTileLayer from 'ol/layer/WebGLTile';

export function createArcGISLayer() {
  return new WebGLTileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
    base: true,
    type: 'base',
    title: 'ArcGIS',
    visible: true,
  } as BaseLayerOptions);
}
