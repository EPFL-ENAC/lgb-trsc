import { Style, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Geometry } from 'ol/geom';

export const classColorMap: { [key: string]: string } = {
  'Sand': 'rgb(255, 244, 183)',
  'Rock': 'rgb(161, 133, 88)',
  'Seagrass': 'rgb(112, 168, 0)',
  'Coral': 'rgb(255, 190, 190)',
  'Rubble': 'rgb(200, 200, 200)',
  'Algae': 'rgb(0, 168, 132)',
};

export const benthicStyle = (feature: Feature<Geometry>) => {
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
