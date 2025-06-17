import {
  createGeoTIFFSource,
  sources,
  generateSources,
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

export const createEnvironmentalLayers = (country?: string): WebGLTileLayer[] => {
  // Generate sources based on scope
  const scopedSources = country ? generateSources(country) : sources;
  
  const layers = scopedSources
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
          // Disable smoothing to preserve pixel boundaries
          preload: 0,
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

  console.log(`Created ${layers.length} environmental layers for scope: ${country || 'Red Sea'}`);
  return layers;
};

/**
 * Updates environmental layers for a specific scope by recreating them with new sources
 * @param existingLayers - Current environmental layers to update
 * @param country - Country scope ('djibouti') or undefined for Red Sea scope
 * @returns New array of environmental layers for the specified scope
 */
export const updateEnvironmentalLayersForScope = (
  existingLayers: WebGLTileLayer[],
  country?: string
): WebGLTileLayer[] => {
  // Store visibility state of existing layers
  const layerVisibilityMap = new Map<string, boolean>();
  existingLayers.forEach((layer) => {
    layerVisibilityMap.set(layer.get('title'), layer.get('visible'));
  });

  // Create new layers for the specified scope
  const newLayers = createEnvironmentalLayers(country);
  
  // Restore visibility state
  newLayers.forEach((layer) => {
    const layerTitle = layer.get('title');
    if (layerVisibilityMap.has(layerTitle)) {
      layer.setVisible(layerVisibilityMap.get(layerTitle) || false);
    }
  });

  return newLayers;
};

/**
 * Updates environmental layers sources in place without creating new layer instances
 * @param existingLayers - Current environmental layers to update
 * @param country - Country scope ('djibouti') or undefined for Red Sea scope
 */
export const updateEnvironmentalLayersSourcesInPlace = (
  existingLayers: WebGLTileLayer[],
  country?: string
): void => {
  // Generate sources based on scope
  const scopedSources = country ? generateSources(country) : sources;
  const meanSources = scopedSources.filter((source) => source.type === 'Mean');
  
  // Update each existing layer with new source
  existingLayers.forEach((layer, index) => {
    if (index < meanSources.length) {
      const newSource = meanSources[index];
      try {
        // Update the layer's source
        layer.setSource(createGeoTIFFSource(newSource));
        
        // Update layer properties with new source metadata
        layer.setProperties({
          ...newSource,
          colorScale: newSource.colorScale,
        });
        
        // Update style if needed (optional, depends on if style needs to change)
        const newStyle = newSource.style || generateDefaultStyle(newSource.colorScale);
        layer.setStyle(newStyle);
        
      } catch (error) {
        console.error(`Failed to update layer "${layer.get('title')}" with new source:`, error);
      }
    }
  });
};
