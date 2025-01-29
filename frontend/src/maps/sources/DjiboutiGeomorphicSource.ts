import { PMTilesVectorSource } from 'ol-pmtiles';

export const createPMTilesSource = () =>
  new PMTilesVectorSource({
    url: './djibouti_geomorphic.pmtiles',
    attributions: 'Your Attribution Here',
  });
