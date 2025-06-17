import { PMTilesVectorSource } from 'ol-pmtiles';
import { attributions } from 'maps/utils/attributions';

// use /SG_MANON/coastlines/polygon_MarineRegions_EEZv12_RedSeaAden.shp?csf=1&web=1&e=iouXZz

export const createPMTilesSource = () =>
  new PMTilesVectorSource({
    // url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti-20250115143859/boundary/boundary.pmtiles',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/COASTLINES/polygon_MarineRegions_EEZv12_RedSeaAden.pmtiles',
    attributions: attributions.allenCoralAtlas,
  });
