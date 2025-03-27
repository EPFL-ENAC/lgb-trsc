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

export const CHL_monthly_mean: ColorMap = {
  type: 'continuous',
  colorMap: {
    // '0.001': 'rgba(0, 0, 0, 0)',
    '0.01': 'rgba(255, 255, 255, 1)',
    '0.10': '#fad7dd',
    '0.25': '#f58860',
    '0.50': '#cb1b4f',
    '1.00': '#611f53',
    '25.0': '#0c146a',
    '50.0': '#000000',
  },
};

export const SST_monthly_max_SD: ColorMap = {
  type: 'continuous',
  // colorMap: {
  //   '0.10': '#fff5eb',
  //   '1.00': '#fdbd83',
  //   '2.00': '#ee6511',
  //   '3.00': '#7f2704',
  // },
  // min: 0.1,
  // max: 3,
  colorMap: {
    '1.10': '#fff5eb',
    '2.00': '#fdbd83',
    '3.00': '#ee6511',
    '5.99': '#7f2704',
    // '0': 'rgba(0, 0, 0, 0)',
    // '0.164': 'rgba(54, 25, 63, 1)',
    // '0.268': 'rgba(112, 31, 87, 1)',
    // '0.425': 'rgba(174, 23, 89, 1)',
    // '0.512': 'rgba(225, 51, 66, 1)',
    // '0.673': 'rgba(243, 120, 82, 1)',
    // '0.975': 'rgba(246, 181, 144, 1)',
    // '5.196': 'rgba(250, 235, 221, 1)',
    // '5.2': 'rgba(255, 255, 255, 1)',
  },
  min: 1.1,
  max: 5.99,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

export const SST_monthly_max_Mean: ColorMap = {
  type: 'continuous',
  // colorMap: {
  //   "15": "#2c7bb6",
  //   "20": "#abd9e9",
  //   "25": "#ffffbf",
  //   "28": "#fdae61",
  //   "30": "#d7191c",
  //   "35": "#6f0005",
  // },
  // min: 15,
  // max: 35,
  colorMap: {
    '23': '#2c7bb6',
    '24': '#abd9e9',
    '27': '#ffffbf',
    '28': '#fdae61',
    '30': '#d7191c',
    '32': '#6f0005',
  },
  min: 22,
  max: 33,
  nodata: -3.4e38,
  epsilon: 1.0e35,
};

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
    boundary: 'rgba(125,201,201, 0.5)',
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

export const substrateLevelMapColor = {
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
