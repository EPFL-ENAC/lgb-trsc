import { Feature } from 'ol';
import { Geometry } from 'ol/geom';
import { useLayerStyles } from '@/maps/composables/useLayerStyles';

export const environmentalClusterStyle = (
  feature: Feature<Geometry>,
  className: string,
  resolution: number
) => {
  const { createEnvironmentalClustersStyle } = useLayerStyles();
  return createEnvironmentalClustersStyle(feature, className, resolution);
};
