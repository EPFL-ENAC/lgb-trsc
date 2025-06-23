export interface ColorMap {
  type: 'categorical' | 'continuous';
  colorMap: Record<string, string>;
  min?: number;
  max?: number;
  nodata?: number;
  epsilon?: number;
}

export const geomorphicColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    'Reef Slope': 'rgb(40, 132, 113)',
    'Sheltered Reef Slope': 'rgb(16, 189, 166)',
    'Reef Crest': 'rgb(97, 66, 114)',
    'Outer Reef Flat': 'rgb(146, 115, 157)',
    'Inner Reef Flat': 'rgb(197, 167, 203)',
    'Terrestrial Reef Flat': 'rgb(251, 222, 251)',
    Plateau: 'rgb(205, 104, 18)',
    'Small Reef': 'rgb(230, 145, 19)',
    'Patch Reefs': 'rgb(255, 186, 21)',
    'Back Reef Slope': 'rgb(190, 251, 255)',
    'Shallow Lagoon': 'rgb(119, 208, 252)',
    'Deep Lagoon': 'rgb(44, 162, 249)',
  },
};

export const benthicColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    'Coral/Algae': 'rgb(255, 97, 97)',
    Seagrass: 'rgb(102, 132, 57)',
    'Microalgal Mats': 'rgb(156, 204, 78)',
    Rock: 'rgb(161, 133, 88)',
    Rubble: 'rgb(224, 208, 93)',
    Sand: 'rgb(255, 255, 190)',
  },
};

export const bathymetricColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    '0-10m': 'rgb(0, 0, 255)',
    '10-20m': 'rgb(0, 255, 255)',
    '20-30m': 'rgb(0, 255, 0)',
    '30-40m': 'rgb(255, 255, 0)',
    '40-50m': 'rgb(255, 0, 0)',
  },
};
// START OF ENVIRONMENTAL LAYERS

export const SST_monthly_max_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '1.2436': '#ffffff',
    '1.8333': '#28bceb',
    '2.4229': '#a4fc3c',
    '3.0126': '#fb7e21',
    '3.6023': '#7a0403',
  },
  min: 1.24,
  max: 3.6,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};
export const SST_monthly_max_Mean: ColorMap = {
  type: 'continuous',

  colorMap: {
    '21.3': '#2c7bb6',
    '23.75': '#abd9e9',
    '26.20': '#ffffbf',
    '28.65': '#fdae61',
    '31.1': '#d7191c',
    // '32': '#6f0005',
  },
  min: 21.3,
  max: 31.1,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SST_monthly_min_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '21.3': '#2c7bb6',
    '23.75': '#abd9e9',
    '26.20': '#ffffbf',
    '28.65': '#fdae61',
    '31.1': '#d7191c',
  },
  min: 21.3,
  max: 31.1,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SST_monthly_min_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '1.03': '#ffffff',
    '1.68': '#28bceb',
    '2.33': '#a4fc3c',
    '2.98': '#fb7e21',
    '3.63': '#7a0403',
  },
  min: 1.03,
  max: 3.63,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SST_monthly_mean_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '21.3': '#2c7bb6',
    '23.75': '#abd9e9',
    '26.20': '#ffffbf',
    '28.65': '#fdae61',
    '31.1': '#d7191c',
  },
  min: 21.3,
  max: 31.1,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SST_monthly_mean_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '1.10': '#ffffff',
    '1.73': '#28bceb',
    '2.36': '#a4fc3c',
    '2.99': '#fb7e21',
    '3.62': '#7a0403',
  },
  min: 1.1,
  max: 3.62,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};



// RED SEA
// export const CHL_monthly_mean_Mean: ColorMap = {
//   type: 'continuous',
//   colorMap: {
//     '0.13': '#f7fcf5',
//     '0.79': '#c5e8be',
//     '1.45': '#9ed899',
//     '2.11': '#73c476',
//     '2.77': '#4cb062',
//     '3.42': '#329b51',
//     '4.08': '#1b8540',
//     '4.69': '#05712f',
//     '5.20': '#00441b',
//   },
//   min: 0.13,
//   max: 5.2,
//   nodata: -3.4e38,
//   epsilon: 1.0e35,
// };

// <MDI key="STATISTICS_MINIMUM">0.1310852766037</MDI>
// <MDI key="STATISTICS_MAXIMUM">5.1965737342834</MDI>
// <MDI key="STATISTICS_MEAN">0.57692993133414</MDI>
// <MDI key="STATISTICS_STDDEV">0.45746119299034</MDI>
// <MDI key="STATISTICS_VALID_PERCENT">16.74</MDI>


// DJIBOUTI
export const CHL_monthly_mean_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.00': '#f7fcf5',
    // '0.79': '#c5e8be',
    // '1.45': '#9ed899',
    // '2.11': '#73c476',
    '2.00': '#4cb062',
    // '3.42': '#329b51',
    // '3.58': '#1b8540',
    // '3.69': '#05712f',
    '4.00': '#00441b',
  },
  min: 0.00,
  max: 4.00,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};



export const CHL_monthly_mean_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.04': '#ffffff',
    '0.98': '#28bceb',
    '1.92': '#a4fc3c',
    '2.86': '#fb7e21',
    '3.81': '#7a0403',
  },
  min: 0.04,
  max: 3.81,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SPM_monthly_mean_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.25': '#fffff4',
    '2.23': '#9bd8b5',
    '11.57': '#4cbac2',
    '22.07': '#2c7db7',
    '42.53': '#253494',
  },
  min: 0.25,
  max: 42.53,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SPM_monthly_mean_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.04': '#ffffff',
    '5.92': '#28bceb',
    '11.81': '#a4fc3c',
    '17.69': '#fb7e21',
    '23.57': '#7a0403',
  },
  min: 0.04,
  max: 23.57,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SWV_monthly_mean_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.02': '#fcfbfd',
    '0.10': '#e5e4f0',
    '0.18': '#cccce4',
    '0.26': '#afaed3',
    '0.34': '#918dc2',
    '0.42': '#786db1',
    '0.50': '#66499f',
    '0.57': '#54278f',
    '0.63': '#3f007d',
  },
  min: 0.02,
  max: 0.63,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SWV_monthly_mean_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.01': '#ffffff',
    '0.10': '#28bceb',
    '0.18': '#a4fc3c',
    '0.27': '#fb7e21',
    '0.36': '#7a0403',
  },
  min: 0.01,
  max: 0.36,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SWS_monthly_mean_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '34.40': '#f7fbff',
    '35.31': '#d5e5f4',
    '36.21': '#c6dbef',
    '37.12': '#7eb3d9',
    '38.02': '#3f8fc4',
    '38.93': '#2c7cbb',
    '39.84': '#1b6aaf',
    '40.67': '#0e58a2',
    '41.37': '#08306b',
  },
  min: 34.4,
  max: 41.37,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SWS_monthly_mean_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.20': '#ffffff',
    '0.80': '#28bceb',
    '1.39': '#a4fc3c',
    '1.98': '#fb7e21',
    '2.58': '#7a0403',
  },
  min: 0.2,
  max: 2.58,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const DHW_annual_max_Mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.10': '#fff5f0',
    '0.23': '#fee0d2',
    '0.57': '#fcbba1',
    '1.68': '#fb6a4a',
    '3.03': '#ef3b2c',
    '4.19': '#cb181d',
    '5.62': '#75030f',
    '6.35': '#67000d',
  },
  min: 0.1,
  max: 6.35,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const DHW_annual_max_SD: ColorMap = {
  type: 'continuous',
  colorMap: {
    '0.19': '#ffffff',
    '2.08': '#28bceb',
    '3.98': '#a4fc3c',
    '5.87': '#fb7e21',
    '7.76': '#7a0403',
  },
  min: 0.19,
  max: 7.76,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

// END OF ENVIRONMENTAL LAYERS
export const defaultEnvironmentalColorMap: ColorMap = {
  type: 'continuous',
  colorMap: {
    // '0': 'rgba(0, 0, 0, 0)',
    '0.164': 'rgba(54, 25, 63, 1)',
    '0.268': 'rgba(112, 31, 87, 1)',
    '0.425': 'rgba(174, 23, 89, 1)',
    '0.512': 'rgba(225, 51, 66, 1)',
    '0.673': 'rgba(243, 120, 82, 1)',
    '0.975': 'rgba(246, 181, 144, 1)',
    '5.196': 'rgba(250, 235, 221, 1)',
    '5.2': 'rgba(255, 255, 255, 1)',
  },
};

export const boundaryColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    // 'Maritime boundaries': 'rgba(125,201,201, 0.5)',
    'polygon_MarineRegions_EEZv12_RedSeaAden': 'rgba(125,201,201, 0.5)',
  },
};

export const marineProtectedAreaColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    'Protected Area': 'rgba(125,201,201, 0.5)',
  },
};

export const reefExtentColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    Reef: 'rgb(178, 8, 76)',
  },
};

export const samplingSiteByYearColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    '2022': 'rgb(225, 255, 0)', // Very dark grey-blue
    '2023': 'rgb(3, 3, 255)', // Deep blue
  },
};

export const samplingSiteByProjectColorMap: ColorMap = {
  type: 'categorical',
  // all of the projects:
  // ['MP', '3D', 'SG', 'Sym', 'eDNA', 'echi']
  colorMap: {
    '3D': 'rgb(255, 140, 0)', // Dark Orange
    MP: 'rgb(138, 43, 226)', // Blue Violet
    Sym: 'rgb(220, 20, 60)', // Crimson
    SG: 'rgb(34, 139, 34)', // Forest Green
    eDNA: 'rgb(139, 206, 225)', // Midnight Blue
    echi: 'rgb(218, 165, 32)', // Goldenrod
  },
};

export const samplingSiteByHardCoralCoverColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    '0-10%': 'rgba(255, 0, 0, 1)',
    '10-30%': 'rgba(255, 165, 0, 1)',
    '30-50%': 'rgba(255, 255, 0, 1)',
    '50-75%': 'rgba(144, 238, 144, 1)',
    '75-100%': 'rgba(0, 255, 0, 1)',
  },
};

// d3MappingColorSubstrate1 and d3MappingColorSubstrate2 are used in the substrate map
// https://github.com/EPFL-ENAC/lgb-trsc/issues/1 for reference

export const d3MappingColorSubstrate1 = [
  'rgb(205, 127, 50)', // goldenrod3 - sand
  'rgb(153, 153, 153)', // gray60 - rubble
  'rgb(102, 102, 102)', // gray40 - unknown_hard_substrate
  'rgb(46, 139, 87)', // seagreen - algae_covered_substrate
  'rgb(255, 250, 240)', // floralwhite - coral_bleached
  'rgb(205, 85, 85)', // indianred3 - coral_dead
  'rgb(79, 148, 205)', // steelblue3 - coral_alive
  'rgb(205, 150, 205)', // plum3 - other_invertebrates
  'rgb(238, 162, 173)', // lightpink2 - anemone
  'rgb(205, 104, 137)', // palevioletred3 - other_animal
  'rgb(139, 129, 76)', // lightgoldenrod4 - trash
];

export const d3MappingColorSubstrate2 = [
  'rgb(205, 127, 50)', // goldenrod3 - sand
  'rgb(102, 102, 102)', // gray40 - unknown_hard_substrate
  'rgb(153, 153, 153)', // gray60 - rubble
  'rgb(139, 129, 76)', // khaki4 - trash
  'rgb(46, 139, 87)', // seagreen4 - algae_covered_substrate
  'rgb(205, 104, 137)', // palevioletred3 - other_animal
  'rgb(193, 255, 193)', // seagreen1 - seagrass
  'rgb(139, 115, 85)', // burlywood4 - clam
  'rgb(188, 238, 188)', // darkseagreen2 - sea_cucumber
  'rgb(255, 140, 0)', // darkorange - sea_urchin
  'rgb(145, 44, 238)', // purple2 - sponge
  'rgb(255, 182, 193)', // lightpink1 - anemone
  'rgb(139, 0, 0)', // red4 - other_coral_dead
  'rgb(205, 0, 0)', // red3 - branching_dead
  'rgb(205, 132, 63)', // brown3 - meandering_dead
  'rgb(255, 48, 48)', // firebrick1 - massive/meandering_dead
  'rgb(205, 183, 158)', // bisque3 - branching_bleached
  'rgb(238, 213, 183)', // bisque2 - meandering_bleached
  'rgb(255, 228, 196)', // bisque1 - massive/meandering_bleached
  'rgb(255, 228, 196)', // bisque - other_coral_bleached
  'rgb(0, 0, 139)', // blue4 - other_coral_alive
  'rgb(135, 206, 255)', // skyblue1 - branching_alive
  'rgb(79, 148, 205)', // steelblue3 - meandering_alive
  'rgb(54, 100, 139)', // steelblue4 - massive/meandering_alive
];

export const substrateLevelMapColor: Record<string, string[]> = {
  Substrate_coarse: d3MappingColorSubstrate1,
  Substrate_intermediate: d3MappingColorSubstrate2,
};

export const environmentalClusterColorMap: ColorMap = {
  type: 'categorical',
  colorMap: {
    '1': 'rgb(81, 115, 207)',
    '2': 'rgb(177, 128, 236)',
    '3': 'rgb(92, 172, 108)',
    '4': 'rgb(255, 157, 142)',
    '5': 'rgb(129, 196, 180)',
    '6': 'rgb(255, 96, 96)',
    // '7': 'rgb(230, 185, 72)',
    // '8': 'rgb(255,138,183)',
    // '9': 'rgb(156,107,78)',
    // '10': 'rgb(148,152,160)',
  },
};
