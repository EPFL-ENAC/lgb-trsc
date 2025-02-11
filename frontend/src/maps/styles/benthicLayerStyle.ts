import { Style, Fill, Stroke } from 'ol/style';

const classColorMap: { [key: string]: string } = {
  "Coral/Algae": "rgb(255, 97, 97)",
  "Seagrass": "rgb(102, 132, 56)",
  "Microalgal Mats": "rgb(155, 204, 79)",
  "Rock": "rgb(177, 156, 58)",
  "Rubble": "rgb(224, 208, 94)",
  "Sand": "rgb(255, 255, 190)"
};


export const benthicStyle = (feature: any) => {
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
