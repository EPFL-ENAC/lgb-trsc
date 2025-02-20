import GeoTIFF from 'ol/source/GeoTIFF.js';
import { attributions } from '@/maps/utils/attributions';
import { Style } from 'ol/style';
// ok source should be wrapped in a function
// documentation here: https://openlayers.org/en/latest/apidoc/module-ol_source_GeoTIFF.html#~SourceInfo

export interface SourceInfo {
  type: 'Mean' | 'SD';
  name: string;
  url: string;
  attribution?: string;
  description?: string;
  fulleTitle?: string;
  style?: Style;
}

export const sources: SourceInfo[] = [
  {
    type: 'Mean',
    name: 'CHL_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_Mean.tif',
  },
  {
    type: 'SD',
    name: 'CHL_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_max',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_max',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_mean',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_SD.tif',
  },
  {
    type: 'Mean',
    name: 'SST_monthly_min',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_Mean.tif',
  },
  {
    type: 'SD',
    name: 'SST_monthly_min',
    attribution: attributions.copernicus,
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_SD.tif',
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_Mean.tif',
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SPM_monthly_mean_1997_2024_SD.tif',
  },

  {
    name: 'DHW_annual_max',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_Mean.tif',
  },
  {
    name: 'DHW_annual_max',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/DHW_annual_max_1985_2024_SD.tif',
  },

  {
    name: 'SCV_monthly_mean',
    attribution: attributions.copernicus,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_Mean.tif',
  },
  {
    name: 'SCV_monthly_mean',
    attribution: attributions.copernicus,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SCV_monthly_mean_1993_2021_SD.tif',
  },

  {
    name: 'SWS_monthly_mean',
    attribution: attributions.noaa,
    type: 'Mean',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_Mean.tif',
  },
  {
    name: 'SWS_monthly_mean',
    attribution: attributions.noaa,
    type: 'SD',
    url: 'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/ENV_RASTERS/SWS_monthly_mean_1993_2021_SD.tif',
  },
];

export const sourcesTitle = sources.map((source) => source.name);

export const createGeoTIFFSource = (sourceInfo: SourceInfo) => {
  const source = new GeoTIFF({
    sources: [{ url: sourceInfo.url }],
    wrapX: false,
    normalize: false,
  });
  source.setAttributions(sourceInfo.attribution);
  return source;
};
