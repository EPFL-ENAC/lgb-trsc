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
  SPM: {
    unit: 'g/m3',
    variableTitle: 'Mass concentration of suspended matter in sea water',
    variable: 'SPM',
  },
  DHW: {
    unit: '°C-weeks',
    variableTitle: 'Degree Heating Week',
    variable: 'DHW',
  },
  SCV: {
    unit: 'm/s',
    variableTitle: 'Sea Current Velocity',
    variable: 'SCV',
  },
  SWS: {
    unit: '10-3',
    variableTitle: 'Sea water salinity',
    variable: 'SWS',
  },
};

export type TiffsUrls = {
  CHL_monthly_mean_Mean: string;
  CHL_monthly_mean_SD: string;
  DHW_annual_max_Mean: string;
  DHW_annual_max_SD: string;
  SCV_monthly_mean_Mean: string;
  SCV_monthly_mean_SD: string;
  SPM_monthly_mean_Mean: string;
  SPM_monthly_mean_SD: string;
  SST_monthly_max_Mean: string;
  SST_monthly_max_SD: string;
  SST_monthly_mean_Mean: string;
  SST_monthly_mean_SD: string;
  SST_monthly_min_Mean: string;
  SST_monthly_min_SD: string;
  SWS_monthly_mean_Mean: string;
  SWS_monthly_mean_SD: string;
};

export const tiffsUrls: TiffsUrls = {
  CHL_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_Mean.tif',
  CHL_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/CHL_monthly_mean_SD.tif',
  DHW_annual_max_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_Mean.tif',
  DHW_annual_max_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/DHW_annual_max_SD.tif',
  SCV_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_Mean.tif',
  SCV_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SCV_monthly_mean_SD.tif',
  SPM_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_Mean.tif',
  SPM_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SPM_monthly_mean_SD.tif',
  SST_monthly_max_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_Mean.tif',
  SST_monthly_max_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_max_SD.tif',
  SST_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_Mean.tif',
  SST_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_mean_SD.tif',
  SST_monthly_min_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_Mean.tif',
  SST_monthly_min_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SST_monthly_min_SD.tif',
  SWS_monthly_mean_Mean:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_Mean.tif',
  SWS_monthly_mean_SD:
    'https://enacit4r-cdn.epfl.ch/lgb-trsc/dev/processed_data/SG_MANON/env_rasters_cut/SWS_monthly_mean_SD.tif',
};

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
    urls: {Mean: tiffsUrls.CHL_monthly_mean_Mean, SD: tiffsUrls.CHL_monthly_mean_SD},
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
    urls: {
      max_Mean: tiffsUrls.SST_monthly_max_Mean,
      max_SD: tiffsUrls.SST_monthly_max_SD,
      mean_Mean: tiffsUrls.SST_monthly_mean_Mean,
      mean_SD: tiffsUrls.SST_monthly_mean_SD,
      min_Mean: tiffsUrls.SST_monthly_min_Mean,
      min_SD: tiffsUrls.SST_monthly_min_SD,
    },
    attributions: attributions.copernicus,
  },
  SPM_monthly_mean: {
    description: 'SPM suspended particulate matter',
    shortTitle:
      'Mass concentration of suspended matter in sea water SPM [g/m3]',
    identifier: 'OCEANCOLOUR_GLO_BGC_L4_MY_009_104',
    datasetDescription:
      'Global Ocean Colour (Copernicus-GlobColour), Bio-Geo-Chemical, L4 (monthly and interpolated) from Satellite Observations (1997-ongoing)',
    dataset: 'cmems_obs-oc_glo_bgc-transp_my_l4-multi-4km_P1M',
    resolution: '4km',
    date: 'SPM_09-1997_05-2024',
    attributions: attributions.copernicus,
    urls: {
      Mean: tiffsUrls.SPM_monthly_mean_Mean, SD: tiffsUrls.SPM_monthly_mean_SD},
  },
  DHW_annual_max: {
    shortTitle: 'Degree Heating Week [°C-weeks]',
    identifier: 'DWH_ct5km_dhw-max_v3.1',
    datasetDescription:
      'Year-to-date Annual Composites of 5km Satellite Coral Bleaching Heat Stress Products',
    version: '3.1',
    resolution: '5km',
    date: '1985-2023',
    description:
      'DHW is calculated as the accumulation of thermal stress (temperature >1°C above the monthly maximal mean temperature) over the previous 12 weeks',
    attributions: attributions.noaa,
    urls: {
      Mean: tiffsUrls.DHW_annual_max_Mean,
      SD: tiffsUrls.DHW_annual_max_SD,
    },
  },
  SCV_monthly_mean: {
    description:
      'Sea Current Velocity calculated from Northward and Eastern velocities',
    shortTitle: 'Sea Current Velocity [m/s]',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    datasetDescription: 'Global Ocean Physics Reanalysis',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    resolution: '0.083°',
    date: '01-1993_06-2021',
    attributions: attributions.copernicus,
    urls: {
      Mean: tiffsUrls.SCV_monthly_mean_Mean,
      SD: tiffsUrls.SCV_monthly_mean_SD,
    },
  },
  SWS_monthly_mean: {
    description: 'Sea water salinity measurement',
    shortTitle: 'Sea water salinity [10-3]',
    identifier: 'GLOBAL_MULTIYEAR_PHY_001_030',
    datasetDescription: 'Global Ocean Physics Reanalysis',
    dataset: 'cmems_mod_glo_phy_my_0.083_P1D-m',
    resolution: '0.083°',
    date: '01-1993_06-2021',
    attributions: attributions.noaa,
    urls: {
      Mean: tiffsUrls.SWS_monthly_mean_Mean,
      SD: tiffsUrls.SWS_monthly_mean_SD,
    },
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
    url: metadata.CHL_monthly_mean.urls.Mean,
  },
  {
    type: SourceType.SD,
    name: 'CHL_monthly_mean',
    ...metadata.CHL_monthly_mean,
    ...legendVariables.CHL,
    colorScale: CHL_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.CHL_monthly_mean.urls.SD,
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_max',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_max_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.max_Mean,
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_max',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_max_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.max_SD,
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_mean',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.mean_Mean,
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_mean',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.mean_SD,
  },
  {
    type: SourceType.MEAN,
    name: 'SST_monthly_min',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_min_Mean,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.min_Mean,
  },
  {
    type: SourceType.SD,
    name: 'SST_monthly_min',
    ...metadata.SST_monthly,
    ...legendVariables.SST,
    colorScale: SST_monthly_min_SD,
    attribution: attributions.copernicus,
    url: metadata.SST_monthly.urls.min_SD,
  },
  {
    name: 'SPM_monthly_mean',
    type: SourceType.MEAN,
    ...metadata.SPM_monthly_mean,
    ...legendVariables.SPM,
    colorScale: SPM_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SPM_monthly_mean.urls.Mean,
  },
  {
    name: 'SPM_monthly_mean',
    type: SourceType.SD,
    ...metadata.SPM_monthly_mean,
    ...legendVariables.SPM,
    colorScale: SPM_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SPM_monthly_mean.urls.SD,
  },

  {
    name: 'DHW_annual_max',
    type: SourceType.MEAN,
    ...metadata.DHW_annual_max,
    ...legendVariables.DHW,
    colorScale: DHW_annual_max_Mean,
    attribution: attributions.copernicus,
    url: metadata.DHW_annual_max.urls.Mean,
  },
  {
    name: 'DHW_annual_max',
    type: SourceType.SD,
    ...metadata.DHW_annual_max,
    ...legendVariables.DHW,
    colorScale: DHW_annual_max_SD,
    attribution: attributions.copernicus,
    url: metadata.DHW_annual_max.urls.SD,
  },

  {
    name: 'SCV_monthly_mean',
    type: SourceType.MEAN,
    ...metadata.SCV_monthly_mean,
    ...legendVariables.SCV,
    colorScale: SCV_monthly_mean_Mean,
    attribution: attributions.copernicus,
    url: metadata.SCV_monthly_mean.urls.Mean,
  },
  {
    name: 'SCV_monthly_mean',
    type: SourceType.SD,
    ...metadata.SCV_monthly_mean,
    ...legendVariables.SCV,
    colorScale: SCV_monthly_mean_SD,
    attribution: attributions.copernicus,
    url: metadata.SCV_monthly_mean.urls.SD,
  },

  {
    name: 'SWS_monthly_mean',
    type: SourceType.MEAN,
    ...metadata.SWS_monthly_mean,
    ...legendVariables.SWS,
    colorScale: SWS_monthly_mean_Mean,
    attribution: attributions.noaa,
    url: metadata.SWS_monthly_mean.urls.Mean,
  },
  {
    name: 'SWS_monthly_mean',
    type: SourceType.SD,
    ...metadata.SWS_monthly_mean,
    ...legendVariables.SWS,
    colorScale: SWS_monthly_mean_SD,
    attribution: attributions.noaa,
    url: metadata.SWS_monthly_mean.urls.SD,
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
