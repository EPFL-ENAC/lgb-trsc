import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useLayerStyles } from 'maps/composables/useLayerStyles';

export const geoMorphicStyle = (feature: Feature<Geometry>) => {
  const { createGeomorphicStyle } = useLayerStyles();
  return createGeomorphicStyle(feature);
};
