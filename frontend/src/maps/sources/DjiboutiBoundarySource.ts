import { PMTilesVectorSource } from 'ol-pmtiles';

export const createPMTilesSource = () =>
  new PMTilesVectorSource({
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/djibouti-20250115143859/boundary/boundary.pmtiles',
    attributions: 'Your Attribution Here',
  });
