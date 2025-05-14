import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useLayerStyles } from 'maps/composables/useLayerStyles';

export const reefExtentStyle = (feature: Feature<Geometry>) => {
  const { createReefExtentStyle } = useLayerStyles();
  return createReefExtentStyle(feature);
};
