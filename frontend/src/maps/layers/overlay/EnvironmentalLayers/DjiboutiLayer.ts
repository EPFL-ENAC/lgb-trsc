import {
  createGeoTIFFSource,
  sources,
} from '@/maps/sources/DjiboutiNOAASource';
import { BaseLayerOptions } from 'ol-layerswitcher';
import {
  defaultEnvironmentalColorMap,
  ColorMap,
} from '@/maps/config/layerColors';
import WebGLTileLayer from 'ol/layer/WebGLTile';
// Define NoData value
const NODATA_VALUE = -3.4e38;
const EPSILON = 1.0e35; // This is quite large - might need adjustment

const convertColorMapToArray = (colorMap: Record<string, string>) => {
  const colorMapArray = [];
  for (const key in colorMap) {
    if (Object.hasOwn(colorMap, key)) {
      colorMapArray.push(parseFloat(key));
      colorMapArray.push(colorMap[key]);
    }
  }
  return colorMapArray;
};

export function generateDefaultStyle(colorScale: ColorMap) {
  const min = colorScale.min ?? 0.00001;
  const max = colorScale.max ?? 100;
  const nodataMinEpsilon =
    colorScale.nodata ?? NODATA_VALUE - (colorScale?.epsilon ?? EPSILON);
  const nodataMaxEpsilon =
    colorScale.nodata ?? NODATA_VALUE + (colorScale?.epsilon ?? EPSILON);
  return {
    variables: {
      min,
      max,
    },
    color: [
      'case',
      // Check if the value is close to NODATA_VALUE within EPSILON
      [
        'all',
        ['>', ['band', 1], nodataMinEpsilon],
        ['<', ['band', 1], nodataMaxEpsilon],
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
          min,
          ['color', 0, 0, 0, 0], // Black
          ...convertColorMapToArray(colorScale.colorMap),
        ],
      ],
    ],
    opacity: 1,
  };
}

export const createEnvironmentalLayers = () => {
  const layers = sources
    // .filter((source) => source.type === 'Mean')
    .map((source) => {
      const layer = new WebGLTileLayer({
        source: createGeoTIFFSource(source),
        title: source.name,
        visible: false,
        baseLayer: false,
        meanOrSD: source.type,
        style:
          source.style ||
          generateDefaultStyle(
            source?.colorScale || defaultEnvironmentalColorMap
          ),
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
