import { PMTilesVectorSource } from 'ol-pmtiles';
import { attributions } from '@/maps/utils/attributions';

export const createPMTilesSource = () =>
  new PMTilesVectorSource({
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti-20250115143859/Reef-Extent/reef-extent.pmtiles',
    attributions: attributions.allenCoralAtlas,
  });
