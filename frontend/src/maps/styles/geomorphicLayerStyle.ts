import { Style, Fill, Stroke } from 'ol/style';

export const classColorMap: { [key: string]: string } = {
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
};

export const geoMorphicStyle = (feature: any) => {
  // Debug: log feature properties
  
  return new Style({
    fill: new Fill({
      color: feature.get('class')
        ? (classColorMap[feature.get('class')] as string)
        : 'rgba(128, 128, 128, 0.5)',
    }),
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.3)',
      width: 1
    })
  });
}
