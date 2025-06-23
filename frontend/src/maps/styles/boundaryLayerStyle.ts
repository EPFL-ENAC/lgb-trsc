import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
// import { Style, Fill, Stroke } from 'ol/style';
// import { useMapStore } from 'stores/mapStore';
import { useLayerStyles } from 'maps/composables/useLayerStyles';

export const boundaryStyle = (feature: Feature<Geometry>) => {
  const { createBoundaryStyle } = useLayerStyles();
  return createBoundaryStyle(feature);

};
