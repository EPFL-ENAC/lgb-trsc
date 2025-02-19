import { PMTilesVectorSource } from 'ol-pmtiles';
import { attributions } from '@/maps/utils/attributions';

export const createPMTilesSource = () =>
  new PMTilesVectorSource({
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/COASTLINES/centroids_grid_500m2_11varselected_4PCs_HCl_K3_K4_K5_K6.pmtiles',
    attributions: attributions.allenCoralAtlas,
  });
