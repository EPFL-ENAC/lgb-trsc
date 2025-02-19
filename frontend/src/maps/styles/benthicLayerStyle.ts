import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useLayerStyles } from '@/maps/composables/useLayerStyles';

export const benthicStyle = (feature: Feature<Geometry>) => {
  const { createBenthicStyle } = useLayerStyles();
  return createBenthicStyle(feature);
};
