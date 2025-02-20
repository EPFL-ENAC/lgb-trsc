import {
  createGeoTIFFSource,
  sources,
  SourceInfo
} from '@/maps/sources/DjiboutiNOAASource';
import { BaseLayerOptions } from 'ol-layerswitcher';
import BaseLayer from 'ol/layer/Base';
import { defaultEnvironmentalColorMap, CHL_monthly_mean } from '@/maps/config/layerColors';
import WebGLTileLayer from 'ol/layer/WebGLTile';
// Define NoData value
const NODATA_VALUE = -3.4e38;
const EPSILON = 1.0e35; // This is quite large - might need adjustment

// 0.164182956620363, [54, 25, 63, 255],    // #36193f
// 0.268975944237886, [112, 31, 87, 255],   // #701f57
// 0.425914314472336, [174, 23, 89, 255],   // #ae1759
// 0.512517052339769, [225, 51, 66, 255],   // #e13342
// 0.673387456358582, [243, 120, 82, 255],  // #f37852
// 0.975529342106547, [246, 181, 144, 255], // #f6b590
// 5.19656148495697, [250, 235, 221, 255],  // #faebdd

const convertColorMapToArray = (colorMap: Record<string, string>) => {
  const colorMapArray = [];
  for (const key in colorMap) {
    if (colorMap.hasOwnProperty(key)) {
      colorMapArray.push(parseFloat(key));
      colorMapArray.push(colorMap[key]);
    }
  }
  return colorMapArray;
};

const noaaStyle4 = {
  variables: {
    min: 0,
    max: 9,
  },
  color: [
    'case',
    // Check if the value is close to NODATA_VALUE within EPSILON
    [
      'all',
      ['>', ['band', 1], NODATA_VALUE - EPSILON],
      ['<', ['band', 1], NODATA_VALUE + EPSILON],
    ],
    [0, 0, 0, 0], // Transparent for NoData
    [
      'case',
      ['<', ['band', 1], ['var', 'min']],
      [0, 0, 0, 0], // Transparent for values below min
      ['>', ['band', 1], ['var', 'max']],
      [255, 255, 255, 255], // White for values above max
      // Linear interpolation for values between min and max
      [
        'interpolate',
        ['linear'],
        ['band', 1],
        
        // 0.1,
        // ['color', 0, 0, 0, 0], // Black
        // ...convertColorMapToArray(defaultEnvironmentalColorMap.colorMap),
        ...convertColorMapToArray(CHL_monthly_mean.colorMap),
        // 0.164, 'rgba(54, 25, 63, 1)',
        // 0.268, 'rgba(112, 31, 87, 1)',
        // 0.425, 'rgba(174, 23, 89, 1)',
        // 0.512, 'rgba(225, 51, 66, 1)',
        // 0.673, 'rgba(243, 120, 82, 1)',
        // 0.975, 'rgba(246, 181, 144, 1)',
        // 5.196, 'rgba(250, 235, 221, 1)',
        // 0.17,
        // ['color', 54, 25, 63, 1], // #36193f
        // 0.268975944237886,
        // [112, 31, 87, 1], // #701f57
        // 0.425914314472336,
        // ['color', 174, 23, 89, 1], // #ae1759
        // 0.512517052339769,
        // ['color', 225, 51, 66, 1], // #e13342
        // 0.673387456358582,
        // ['color', 243, 120, 82, 1], // #f37852
        // 0.975529342106547,
        // ['color', 246, 181, 144, 1], // #f6b590
        // 5.19656148495697,
        // ['color', 250, 235, 221, 1], // #faebdd
        // 5.2,
        // ['color', 255, 255, 255, 1], // White
      ],
    ],
  ],
  opacity: 1,
};

function generateDefaultStyle(colorScale: Record<string, string>) {
  return {
    variables: {
      min: 0,
      max: 9,
    },
    color: [
      'case',
      // Check if the value is close to NODATA_VALUE within EPSILON
      [
        'all',
        ['>', ['band', 1], NODATA_VALUE - EPSILON],
        ['<', ['band', 1], NODATA_VALUE + EPSILON],
      ],
      [0, 0, 0, 0], // Transparent for NoData
      [
        'case',
        ['<', ['band', 1], ['var', 'min']],
        [0, 0, 0, 0], // Transparent for values below min
        ['>', ['band', 1], ['var', 'max']],
        [255, 255, 255, 255], // White for values above max
        // Linear interpolation for values between min and max
        [
          'interpolate',
          ['linear'],
          ['band', 1],
          // 0.001 is the cutout value, it could be stored in colorScale, but then it would be a string and we would have to convert it to a number
          // and it would be a bit more complicated for the legend
          0.001,
          ['color', 0, 0, 0, 0], // Black
          ...convertColorMapToArray(colorScale),
        ],
      ],
    ],
    opacity: 1,
  }
}

export const createEnvironmentalLayers = () => {
  const layers = sources.filter(source => source.type === 'Mean').map((source) => {
    const layer = new WebGLTileLayer({
      source: createGeoTIFFSource(source),
      title: source.name ,
      visible: false,
      baseLayer: false,
      meanOrSD: 'Mean',
      style: source.style || generateDefaultStyle(source?.colorScale?.colorMap || defaultEnvironmentalColorMap.colorMap),
      bands: [1], // Explicitly specify which band to use
      opacity: 1, // Default opacity
      properties: {
        ...source,
      },
    } as BaseLayerOptions);
    return layer;
  });
  return layers;
};
