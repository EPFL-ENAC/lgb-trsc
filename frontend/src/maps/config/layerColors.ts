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
    Sand: 'rgb(255, 244, 183)',
    Rock: 'rgb(161, 133, 88)',
    Seagrass: 'rgb(112, 168, 0)',
    Coral: 'rgb(255, 190, 190)',
    Rubble: 'rgb(200, 200, 200)',
    Algae: 'rgb(0, 168, 132)',
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


export const samplingSiteByYearColorMap: { [key: string]: string } = {
  "2022": "rgb(178, 8, 76)",
  "2023": "rgb(0, 0, 0)",
  "2024": "rgb(30, 185, 185)",
}

export const samplingSiteByProjectColorMap: { [key: string]: string } = {
  "3D": "rgb(178, 8, 76)",
  "MP": "rgb(0, 0, 0)",
  "Sym": "rgb(30, 185, 185)",
}

export const samplingSiteByHardCoralCoverColorMap: { [key: string]: string } = {
  "0-10%": "rgb(178, 8, 76)",
  "10-30%": "rgb(0, 0, 0)",
  "30-50%": "rgb(30, 185, 185)",
  "50-75%": "rgb(255, 255, 0)",
  "75-100%": "rgb(0, 255, 0)",
}
