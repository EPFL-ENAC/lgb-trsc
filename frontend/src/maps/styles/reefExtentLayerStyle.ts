import { Style, Fill, Stroke } from 'ol/style';

const classColorMap: { [key: string]: string } = {
  "Reef": "rgb(178, 8, 76)"
};


export const reefExtentLayerStyle = (feature: any) => {
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
