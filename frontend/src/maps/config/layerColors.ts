export const geomorphicColorMap = {
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

export const benthicColorMap = {
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

export const bathymetricColorMap = {
  type: 'categorical',
  colorMap: {
    '0-10m': 'rgb(0, 0, 255)',
    '10-20m': 'rgb(0, 255, 255)',
    '20-30m': 'rgb(0, 255, 0)',
    '30-40m': 'rgb(255, 255, 0)',
    '40-50m': 'rgb(255, 0, 0)',
  },
};

export const chlMonthlyMean1997_2024 = {
  type: 'continuous',
  colorMap: {
    '0': 'rgb(0, 0, 255)',
    '10': 'rgb(0, 255, 255)',
    '20': 'rgb(0, 255, 0)',
    '30': 'rgb(255, 255, 0)',
    '40': 'rgb(255, 0, 0)',
  },
};

export const defaultEnvironmentalColorMap = {
  type: 'continuous',
  colorMap: {
    '0.164': 'rgb(54, 25, 63)',
    '0.268': 'rgb(112, 31, 87)',
    '0.425': 'rgb(174, 23, 89)',
    '0.512': 'rgb(225, 51, 66)',
    '0.673': 'rgb(243, 120, 82)',
    '0.975': 'rgb(246, 181, 144)',
    '5.196': 'rgb(250, 235, 221)',
  },
};

export const boundaryColorMap = {
  type: 'categorical',
  colorMap: {
    boundary: 'rgba(125,201,201, 0.5)',
  },
};

export const marineProtectedAreaColorMap = {
  type: 'categorical',
  colorMap: {
    'Protected Area': 'rgba(125,201,201, 0.5)',
  },
};

export const reefExtentColorMap = {
  type: 'categorical',
  colorMap: {
    Reef: 'rgb(178, 8, 76)',
  },
};

export const samplingSiteByYearColorMap = {
  type: 'categorical',
  colorMap: {
    '2022': 'rgb(225, 255, 0)', // Very dark grey-blue
    '2023': 'rgb(3, 3, 255)', // Deep blue
  },
};

export const samplingSiteByProjectColorMap = {
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

export const samplingSiteByHardCoralCoverColorMap = {
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
export const environmentalClusterColorMap = {
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
