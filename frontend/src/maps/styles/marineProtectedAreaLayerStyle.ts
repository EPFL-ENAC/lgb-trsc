import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useLayerStyles } from 'maps/composables/useLayerStyles';

export const marineProtectedAreaStyle = (feature: Feature<Geometry>) => {
  const { createMarineProtectedStyle } = useLayerStyles();
  return createMarineProtectedStyle(feature);
};
