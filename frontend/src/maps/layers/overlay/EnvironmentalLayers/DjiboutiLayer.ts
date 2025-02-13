import { BaseLayerOptions } from 'ol-layerswitcher';
import {
  createSourceCHL_monthly_mean_1997_2024_Mean,
  createSourceCHL_monthly_mean_1997_2024_SD,
  createSourceDHW_annual_max_1985_2024_Mean,
  createSourceDHW_annual_max_1985_2024_SD,
  createSourceSCV_monthly_mean_1993_2021_Mean,
  createSourceSCV_monthly_mean_1993_2021_SD,
  createSourceSPM_monthly_mean_1997_2024_Mean,
  createSourceSPM_monthly_mean_1997_2024_SD,
  createSourceSST_monthly_max_1985_2024_Mean,
  createSourceSST_monthly_max_1985_2024_SD,
  createSourceSST_monthly_mean_1985_2024_Mean,
  createSourceSST_monthly_mean_1985_2024_SD,
  createSourceSST_monthly_min_1985_2024_Mean,
  createSourceSST_monthly_min_1985_2024_SD,
  createSourceSWS_monthly_mean_1993_2021_Mean,
  createSourceSWS_monthly_mean_1993_2021_SD,
  metadata,
} from '@/maps/sources/DjiboutiNOAASource';

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
        0.1,
        ['color', 0, 0, 0, 0], // Black
        0.17,
        ['color', 54, 25, 63, 1], // #36193f
        0.268975944237886,
        [112, 31, 87, 1], // #701f57
        0.425914314472336,
        ['color', 174, 23, 89, 1], // #ae1759
        0.512517052339769,
        ['color', 225, 51, 66, 1], // #e13342
        0.673387456358582,
        ['color', 243, 120, 82, 1], // #f37852
        0.975529342106547,
        ['color', 246, 181, 144, 1], // #f6b590
        5.19656148495697,
        ['color', 250, 235, 221, 1], // #faebdd
        5.2,
        ['color', 250, 235, 221, 1], // White
      ],
    ],
  ],
  opacity: 1,
};
const title = 'default';

const styles = noaaStyle4
// NOAA Layers
export const createCHL_monthly_mean_1997_2024_MeanLayer = () => {
  const title = 'CHL_monthly_mean_1997_2024_Mean';
  const layer = new WebGLTileLayer({
    source: createSourceCHL_monthly_mean_1997_2024_Mean(),
    title,
    visible: false,
    baseLayer: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  });
  return layer;
};

export const createCHL_monthly_mean_1997_2024_SD = () =>
  new WebGLTileLayer({
    source: createSourceCHL_monthly_mean_1997_2024_SD(),
    // title: metadata.OCEANCOLOUR_GLO_BGC_L4_MY_009_104.shorter_title + 'Standard Deviation (1997-2024)',
    title: metadata.OCEANCOLOUR_GLO_BGC_L4_MY_009_104.shorter_title + ' Std',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

// DHW Layers
export const createDHW_annual_max_1985_2024_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceDHW_annual_max_1985_2024_Mean(),
    title: 'Annual Maximum Mean (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createDHW_annual_max_1985_2024_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceDHW_annual_max_1985_2024_SD(),
    title: 'Annual Maximum SD (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

// SCV Layers
export const createSCV_monthly_mean_1993_2021_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSCV_monthly_mean_1993_2021_Mean(),
    title: 'Monthly Mean (1993-2021)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSCV_monthly_mean_1993_2021_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSCV_monthly_mean_1993_2021_SD(),
    title: 'Standard Deviation (1993-2021)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

// SPM Layers
export const createSPM_monthly_mean_1997_2024_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSPM_monthly_mean_1997_2024_Mean(),
    title: 'Monthly Mean (1997-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSPM_monthly_mean_1997_2024_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSPM_monthly_mean_1997_2024_SD(),
    title: 'Standard Deviation (1997-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

// SST Layers
export const createSST_monthly_max_1985_2024_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_max_1985_2024_Mean(),
    title: 'Monthly Maximum Mean (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSST_monthly_max_1985_2024_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_max_1985_2024_SD(),
    title: 'Monthly Maximum SD (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSST_monthly_mean_1985_2024_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_mean_1985_2024_Mean(),
    title: 'Monthly Mean (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSST_monthly_mean_1985_2024_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_mean_1985_2024_SD(),
    title: 'Monthly Mean SD (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSST_monthly_min_1985_2024_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_min_1985_2024_Mean(),
    title: 'Monthly Minimum Mean (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSST_monthly_min_1985_2024_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSST_monthly_min_1985_2024_SD(),
    title: 'Monthly Minimum SD (1985-2024)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

// SWS Layers
export const createSWS_monthly_mean_1993_2021_MeanLayer = () =>
  new WebGLTileLayer({
    source: createSourceSWS_monthly_mean_1993_2021_Mean(),
    title: 'Monthly Mean (1993-2021)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);

export const createSWS_monthly_mean_1993_2021_SDLayer = () =>
  new WebGLTileLayer({
    source: createSourceSWS_monthly_mean_1993_2021_SD(),
    title: 'Monthly SD (1993-2021)',
    visible: false,
    base: false,
    style: noaaStyle4,
    bands: [1], // Explicitly specify which band to use
    opacity: 1,
    properties: {
      name: title,
      type: 'overlay',
    },
  } as BaseLayerOptions);
