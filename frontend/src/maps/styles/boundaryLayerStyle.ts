import { Style, Fill, Stroke } from 'ol/style';
import { Feature } from 'ol';
import { Polygon, MultiPolygon } from 'ol/geom';

const classColorMap: Record<string, string> = {
  // Add your class colors here if needed
};

export const boundaryLayerStyle = (feature: Feature<Polygon | MultiPolygon>) => {
  return new Style({
    fill: new Fill({
      color: feature.get('class')
        ? (classColorMap[feature.get('class')] as string)
        : 'rgba(128, 128, 128, 0.5)',
    }),
    stroke: new Stroke({
      color: '#64c9c9',
      width: 2,
      lineDash: [2, 2] // This creates a dotted line
    })
  });
}
