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

/**
 * Interface for the colormap JSON structure
 */
interface ColormapResponse {
  type: string;
  variable: string;
  measurementType: string;
  colorMap: Array<{
    value: number | string; // Can be either number or string
    color: string;
  }>;
  min: number;
  max: number;
  nodata: number;
  epsilon: number;
  filename: string;
  directory: string;
  statistics: {
    min: number;
    max: number;
    mean: number;
    stddev: number;
  };
}

/**
 * Generates colormap URL for a given source and country scope
 * @param sourceName - Source name (e.g., 'CHL_monthly_mean_Mean')
 * @param country - Country scope ('djibouti') or undefined for Red Sea scope
 * @returns URL to fetch the colormap JSON
 */
export function generateColormapUrl(sourceName: string, country?: string): string {
  const baseUrl = 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/colormaps';
  const directory = country ? `env_rasters_cut_64x_${country.toLowerCase()}` : 'env_rasters_cut';
  
  // Determine the colormap filename based on whether it's SD or Mean
  const colormapFilename = sourceName.endsWith('_SD') ? 'colormap_colorful.json' : 'colormap.json';
  
  console.log(`Generating colormap URL for source: ${sourceName}, country: ${country}, filename: ${colormapFilename}`);

  return `${baseUrl}/${directory}/${sourceName}_${colormapFilename}`;
}


export const colorMapArrayToRecord = (
  colorMapArray: (number | string)[]
): Record<string, string> => {
  const colorMapRecord: Record<string, string> = {};
  for (let i = 0; i < colorMapArray.length; i += 2) { // Iterate in steps of 2  
    const value = colorMapArray[i];
    const color = colorMapArray[i + 1];
    if (typeof value === 'number' && typeof color === 'string') {
      colorMapRecord[value.toString()] = color;
    }
  }
  return colorMapRecord;
};
/**
 * Fetches colormap from URL and converts it to ColorMap format
 * @param url - URL to fetch colormap JSON from
 * @returns Promise<ColorMap> - Converted colormap
 */
export async function fetchColormap(url: string): Promise<ColorMap> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch colormap: ${response.status} ${response.statusText}`);
    }
    
    const colormapData: ColormapResponse = await response.json();
    
    // Convert the colorMap array to the expected Record<string, string> format
    const colorMapRecord: Record<string, string> = {};
    colormapData.colorMap.forEach(item => {
      // Handle both string and number values
      const valueKey = typeof item.value === 'string' ? item.value : item.value.toString();
      colorMapRecord[valueKey] = item.color;
    });
    
    const result: ColorMap = {
      type: 'continuous' as const,
      colorMap: colorMapRecord,
      min: colormapData.min,
      max: colormapData.max,
      nodata: colormapData.nodata,
      epsilon: colormapData.epsilon,
    };

    return result;
  } catch (error) {
    console.error(`Failed to fetch colormap from ${url}:`, error);
    // Fallback to default colormap
    return defaultEnvironmentalColorMap;
  }
}

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

export const createEnvironmentalLayers = async (country?: string): Promise<WebGLTileLayer[]> => {
  // Generate sources based on scope
  const scopedSources = country ? generateSources(country) : sources;
  
  const layers = await Promise.all(
    scopedSources
      .filter((source) => source.type === 'Mean') // Filter sources for environmental layers
      .map(async (source) => {
        try {
          // Fetch dynamic colorScale from JSON using the key field
          const colormapUrl = generateColormapUrl(source.key, country);
          const effectiveColorScale = await fetchColormap(colormapUrl);

          const style = generateDefaultStyle(effectiveColorScale);

          
          const layer = new WebGLTileLayer({
            source: createGeoTIFFSource(source), // Assuming this can throw errors
            title: source.name,
            visible: false,
            baseLayer: false,
            // Disable smoothing to preserve pixel boundaries
            preload: 0,
            meanOrSD: source.type,
            key: source.key, // Store the key for colormap URL generation
            style,
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
  );

  const validLayers = layers.filter((layer): layer is WebGLTileLayer => layer !== null); // Filter out nulls (failed layers)

  console.log(`Created ${validLayers.length} environmental layers for scope: ${country || 'Red Sea'}`);
  return validLayers;
};

/**
 * Updates environmental layers for a specific scope by recreating them with new sources
 * @param existingLayers - Current environmental layers to update
 * @param country - Country scope ('djibouti') or undefined for Red Sea scope
 * @returns New array of environmental layers for the specified scope
 */
export const updateEnvironmentalLayersForScope = async (
  existingLayers: WebGLTileLayer[],
  country?: string
): Promise<WebGLTileLayer[]> => {
  // Store visibility state of existing layers
  const layerVisibilityMap = new Map<string, boolean>();
  existingLayers.forEach((layer) => {
    layerVisibilityMap.set(layer.get('title'), layer.get('visible'));
  });

  // Create new layers for the specified scope
  const newLayers = await createEnvironmentalLayers(country);
  
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
export const updateEnvironmentalLayersSourcesInPlace = async (
  existingLayers: WebGLTileLayer[],
  country?: string
): Promise<void> => {
  // Generate sources based on scope
  const scopedSources = country ? generateSources(country) : sources;
  const meanSources = scopedSources.filter((source) => source.type === 'Mean');
  
  // Update each existing layer with new source
  await Promise.all(
    existingLayers.map(async (layer, index) => {
      if (index < meanSources.length) {
        const newSource = meanSources[index];
        try {
          // Fetch dynamic colorScale from JSON using the key field
          const colormapUrl = generateColormapUrl(newSource.key, country);
          const effectiveColorScale = await fetchColormap(colormapUrl);
          
          // Update the layer's source
          layer.setSource(createGeoTIFFSource(newSource));
          
          // Update layer properties with new source metadata
          layer.setProperties({
            ...newSource,
            colorScale: effectiveColorScale,
          });
          
          // Update style with the fetched colormap
          const newStyle = newSource.style || generateDefaultStyle(effectiveColorScale);
          layer.setStyle(newStyle);
          
        } catch (error) {
          console.error(`Failed to update layer "${layer.get('title')}" with new source:`, error);
        }
      }
    })
  );
};
