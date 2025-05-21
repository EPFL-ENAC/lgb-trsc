import {
  createGeoTIFFSource,
  sources,
  // SourceMetadata, // Assuming SourceMetadata is defined in DjiboutiNOAASource.ts
} from 'maps/sources/DjiboutiNOAASource';
import { BaseLayerOptions } from 'ol-layerswitcher';
import {
  defaultEnvironmentalColorMap,
  ColorMap,
} from 'maps/config/layerColors';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import * as olColor from 'ol/color';
// import { Style } from 'ol/style'; // Import Style type if needed for source.style

// Define NoData value
const NODATA_VALUE = -3.4e38;
// Adjusted EPSILON: Use a smaller tolerance, e.g., 1.0, adjust if needed based on data precision
const EPSILON = 1.0;

const convertColorMapToArray = (
  colorMap: Record<string, string>
): (number | string)[] => {
  const colorMapArray: (number | string)[] = [];
  // Sort keys numerically to ensure correct interpolation order
  const sortedKeys = Object.keys(colorMap).sort(
    (a, b) => parseFloat(a) - parseFloat(b)
  );
  for (const key of sortedKeys) {
    colorMapArray.push(parseFloat(key));
    colorMapArray.push(colorMap[key]);
  }
  return colorMapArray;
};

export function generateDefaultStyle(colorScale: ColorMap): any {
  // Consider defining a more specific return type for OL Style
  const min = colorScale.min ?? 0.00001;
  const max = colorScale.max ?? 100;
  // Use the provided nodata value or the default
  const nodata = colorScale.nodata ?? NODATA_VALUE;
  // Use the provided epsilon or the default constant
  const epsilon = colorScale.epsilon ?? EPSILON;
  const nodataMinEpsilon = nodata - epsilon;
  const nodataMaxEpsilon = nodata + epsilon;

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
        ['>=', ['band', 1], nodataMinEpsilon], // Use >= and <= for inclusive range check
        ['<=', ['band', 1], nodataMaxEpsilon],
      ],
      [0, 0, 0, 0], // Transparent for NoData
      [
        'case',
        ['<', ['band', 1], ['var', 'min']],
        [0, 0, 0, 0], // Transparent for values below min
        ['>', ['band', 1], ['var', 'max']],
        // Use the color defined for the max value instead of plain white
        // Find the color associated with the max value in the color map
        // This requires colorScale.colorMap to be available here or passed differently
        // For simplicity, keeping white, but ideally, use the max color stop.
        [
          'color',
          ...olColor
            .asArray(colorScale.colorMap[max.toString()] || '#ffffff')
            .slice(0, 3),
          255,
        ], // Use max color stop or default white
        // Linear interpolation for values between min and max
        [
          'interpolate',
          ['linear'],
          ['band', 1],
          // Note: Interpolation starts at 'min' with transparent color.
          // Ensure the first color stop in colorScale.colorMap matches 'min'
          // if you don't want transparency right at the minimum value.
          min,
          ['color', 0, 0, 0, 0], // Transparent below the first defined stop
          ...convertColorMapToArray(colorScale.colorMap),
        ],
      ],
    ],
    opacity: 1, // Default opacity for the style itself
  };
}

export const createEnvironmentalLayers = (): WebGLTileLayer[] => {
  const layers = sources
    .filter((source) => source.type === 'Mean') // Filter sources for environmental layers
    .map((source) => {
      try {
        let effectiveColorScale = source.colorScale;
        if (!effectiveColorScale) {
          console.warn(
            `Source "${source.name}" is missing colorScale. Using default.`
          );
          effectiveColorScale = defaultEnvironmentalColorMap;
        }

        const layer = new WebGLTileLayer({
          source: createGeoTIFFSource(source), // Assuming this can throw errors
          title: source.name,
          visible: false,
          baseLayer: false,
          meanOrSD: source.type,
          style:
            source.style || // Use pre-defined style if available
            generateDefaultStyle(effectiveColorScale),
          bands: source.bands || [1], // Use bands from source or default to [1]
          opacity: 1, // Layer's initial opacity
          properties: {
            ...source, // Store original source metadata
            // Ensure colorScale in properties reflects the one used for the style
            colorScale: effectiveColorScale,
          },
        } as BaseLayerOptions); // Type assertion might still be needed depending on BaseLayerOptions definition
        return layer;
      } catch (error) {
        console.error(
          `Failed to create layer for source "${source?.name || 'unknown'}":`,
          error
        );
        return null; // Return null for sources that failed
      }
    })
    .filter((layer): layer is WebGLTileLayer => layer !== null); // Filter out nulls (failed layers)

  return layers;
};
