import GeoTIFF from 'ol/source/GeoTIFF.js';
import { attributions } from '@/maps/utils/attributions';
import { Style } from 'ol/style';
import {
  CHL_monthly_mean_Mean,
  CHL_monthly_mean_SD,
  SST_monthly_max_Mean,
  SST_monthly_max_SD,
  SST_monthly_mean_Mean,
  SPM_monthly_mean_Mean,
  DHW_annual_max_Mean,
  SCV_monthly_mean_Mean,
  SWS_monthly_mean_Mean,
  SST_monthly_mean_SD,
  SPM_monthly_mean_SD,
  DHW_annual_max_SD,
  SCV_monthly_mean_SD,
  SWS_monthly_mean_SD,
  SST_monthly_min_Mean,
  SST_monthly_min_SD,
  ColorMap,
} from '@/maps/config/layerColors';

/**
 * Enum for source types
 */
export enum SourceType {
  MEAN = 'Mean',
  SD = 'SD',
}

/**
 * Interface for components within metadata that describe specific aspects of a dataset
 */
interface MetadataComponent {
  shortTitle: string;
  description: string;
}

/**
 * Variable information for legend display
 */
export interface VariableInfo {
  unit: string;
  variableTitle: string;
  variable: string;
}

/**
 * Configuration for an individual GeoTIFF source layer
 * Can include properties from both metadata and variable information
 */
export interface SourceInfo {
  type: SourceType;
  name: string;
  url: string;
  colorScale: ColorMap;
  attribution: string;
  unit?: string;
  variableTitle?: string;
  variable?: string;
  description?: string;
  shortTitle?: string;
  identifier?: string;
  datasetDescription?: string;
  dataset?: string | string[];
  date?: string | string[];
  resolution?: string;
  version?: string;
  components?: Record<string, MetadataComponent>;
  style?: Style;
  bands?: number[];
}

const legendVariables = {
  CHL: {
    unit: 'mg/m3',
    variableTitle: 'Mass concentration of chlorophyll a in sea water CHL',
    variable: 'CHL',
  },
  SST: {
    unit: 'K',
    variableTitle: 'Sea surface temperature',
    variable: 'SST',
  },
};

export const tiffsUrls = [
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_SD.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_Mean.tif',
  'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_SD.tif',
  ]

export const metadata = {
  CHL_monthly_mean: {
    description:
      'CHL chlorophyll concentration : Mass concentration of chlorophyll a in sea water CHL [mg/m3]',
    shortTitle: 'Mass concentration of chlorophyll a in sea water CHL [mg/m3]',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    datasetDescription:
      'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-plankton_my_l4-multi-4km_P1M',
    date: 'CHL_09-1997_05-2024',
    urls: [
      tiffsUrls[0], // CHL_monthly_mean_Mean
      tiffsUrls[1], // CHL_monthly_mean_SD
    ],
    attributions: attributions.copernicus,
  },
  SST_monthly: {
    description:
      'SST sea surface Temperature : Sea water temperature analysed_sst [K] 0.05°',
    shortTitle: 'Sea water temperature analysed_sst [K]',
    identifier: 'SST_GLO_SST_L4_REP_OBSERVATIONS_010_024',
    datasetDescription:
      'ESA SST CCI and C3S reprocessed sea surface temperature analyses',
    dataset: [
      'Dataset 1 ESACCI-GLO-SST-L4-REP-OBS-SST 02/09/1981→31/12/2016',
      'Dataset 2 C3S-GLO-SST-L4-REP-OBS-SST 02/01/2017→30/09/2022',
    ],
    date: ['02/09/1981→31/12/2016', '02/01/2017→30/09/2022'],
    url: [
      tiffsUrls[8], // SST_monthly_max_Mean
      tiffsUrls[9], // SST_monthly_max_SD
      tiffsUrls[10], // SST_monthly_mean_Mean
      tiffsUrls[11], // SST_monthly_mean_SD
      tiffsUrls[12], // SST_monthly_min_Mean
      tiffsUrls[13], // SST_monthly_min_SD
    ],
    attributions: attributions.copernicus,
  },
  SPM_monthly_mean: {
    description: 'SPM suspended particulate matter: Mass concentration of suspended matter in sea water SPM [g/m3]',
    shortTitle: 'Mass concentration of suspended matter in sea water SPM [g/m3]',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    datasetDescription: 'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-transp_my_l4-multi-4km_P1M',
    date: 'SPM_09-1997_05-2024',
    urls: [
      tiffsUrls[6], // SPM_monthly_mean_Mean
      tiffsUrls[7], // SPM_monthly_mean_SD
    ],
    attributions: attributions.copernicus,
  },
  DHW_annual_max: {
    description: 'DHW Degree Heating Week: The accumulation of thermal stress (i.e. temperature >1°C above the monthly maximal mean temperature) over the previous 12 weeks',
    shortTitle: 'Degree Heating Week [°C-weeks]',
    identifier: 'ct5km_dhw-max_v3.1',
    datasetDescription: 'Year-to-date Annual Composites of 5km Satellite Coral Bleaching Heat Stress Products (Version 3.1)',
    dataset: 'ct5km_dhw-max_v3.1',
    date: '1985-2023',
    urls: [
      tiffsUrls[2], // DHW_annual_max_Mean
      tiffsUrls[3], // DHW_annual_max_SD
    ],
    attributions: attributions.noaa,
  },
  SCV_monthly_mean: {
    description: 'SCV sea current velocity calculated from NWV Northward sea water velocity and EWV Eastern sea water velocity',
    shortTitle: 'Sea current velocity [m/s]',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    datasetDescription: 'Global Ocean Physics Reanalysis',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    date: '01-1993_06-2021',
    urls: [
      tiffsUrls[4], // SCV_monthly_mean_Mean
      tiffsUrls[5], // SCV_monthly_mean_SD
    ],
    attributions: attributions.copernicus,
  },
  SWS_monthly_mean: {
    description: 'SWS Sea water salinity [10-3]',
    shortTitle: 'Sea water salinity [10-3]',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    datasetDescription: 'Global Ocean Physics Reanalysis',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    date: 'SWS_01-1993_06-2021',
    urls: [
      tiffsUrls[14], // SWS_monthly_mean_Mean
      tiffsUrls[15], // SWS_monthly_mean_SD
    ],
    attributions: attributions.noaa,
  },
};


export const sources: SourceInfo[] = [
  {
    type: SourceType.MEAN,
    name: 'CHL_monthly_mean',
    ...metadata.CHL_monthly_mean,
    ...legendVariables.CHL,
    colorScale: CHL_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.CHL_monthly_mean.urls[0],
  },
  {
    type: SourceType.SD,
    name: 'CHL_monthly_mean',
    ...metadata.CHL_monthly_mean,
    ...legendVariables.CHL,
    colorScale: CHL_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.CHL_monthly_mean.urls[1],
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_max',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_max_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[0],
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_max',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_max_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[1],
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_mean',
    colorScale: SST_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[2],
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_mean',
    colorScale: SST_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[3],
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_min',
    colorScale: SST_monthly_min_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[4],
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_min',
    colorScale: SST_monthly_min_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.url[5],
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    colorScale: SPM_monthly_mean_Mean,
    type: SourceType.MEAN,
    url: metadata.SPM_monthly_mean.urls[0],
  },
  {
    name: 'SPM_monthly_mean',
    attribution: attributions.copernicus,
    colorScale: SPM_monthly_mean_SD,
    type: SourceType.SD,
    url: metadata.SPM_monthly_mean.urls[1],
  },

  {
    name: 'DHW_annual_max',
    colorScale: DHW_annual_max_Mean,
    attribution: attributions.copernicus,
    type: SourceType.MEAN,
    url: metadata.DHW_annual_max.urls[0],
  },
  {
    name: 'DHW_annual_max',
    colorScale: DHW_annual_max_SD,
    attribution: attributions.copernicus,
    type: SourceType.SD,
    url: metadata.DHW_annual_max.urls[1],
  },

  {
    name: 'SCV_monthly_mean',
    colorScale: SCV_monthly_mean_Mean,
    attribution: attributions.copernicus,
    type: SourceType.MEAN,
    url: metadata.SCV_monthly_mean.urls[0],
  },
  {
    name: 'SCV_monthly_mean',
    colorScale: SCV_monthly_mean_SD,
    attribution: attributions.copernicus,
    type: SourceType.SD,
    url: metadata.SCV_monthly_mean.urls[1],
  },

  {
    name: 'SWS_monthly_mean',
    colorScale: SWS_monthly_mean_Mean,
    attribution: attributions.noaa,
    type: SourceType.MEAN,
    url: metadata.SWS_monthly_mean.urls[0],
  },
  {
    name: 'SWS_monthly_mean',
    colorScale: SWS_monthly_mean_SD,
    attribution: attributions.noaa,
    type: SourceType.SD,
    url: metadata.SWS_monthly_mean.urls[1],
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
