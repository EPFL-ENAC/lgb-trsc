import XYZ from 'ol/source/XYZ';
import { BaseLayerOptions } from 'ol-layerswitcher';
import WebGLTileLayer from 'ol/layer/WebGLTile';

export function createArcGISLayer(saturationFactor = 0.3) {
  return new WebGLTileLayer({
    source: new XYZ({
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    }),
    // style: {
    //   color: [
    //     'array',
    //     // Blend original R with grayscale
    //     [
    //       '+',
    //       ['*', ['band', 1], saturationFactor],
    //       [
    //         '*',
    //         ['/', ['+', ['+', ['band', 1], ['band', 2]], ['band', 3]], 3],
    //         1 - saturationFactor,
    //       ],
    //     ],
    //     // Blend original G with grayscale
    //     [
    //       '+',
    //       ['*', ['band', 2], saturationFactor],
    //       [
    //         '*',
    //         ['/', ['+', ['+', ['band', 1], ['band', 2]], ['band', 3]], 3],
    //         1 - saturationFactor,
    //       ],
    //     ],
    //     // Blend original B with grayscale
    //     [
    //       '+',
    //       ['*', ['band', 3], saturationFactor],
    //       [
    //         '*',
    //         ['/', ['+', ['+', ['band', 1], ['band', 2]], ['band', 3]], 3],
    //         1 - saturationFactor,
    //       ],
    //     ],
    //     ['band', 4], // Alpha channel remains unchanged
    //   ],
    // },
    base: true,
    type: 'base',
    title: 'ArcGIS',
    visible: true,
  } as BaseLayerOptions);
}
